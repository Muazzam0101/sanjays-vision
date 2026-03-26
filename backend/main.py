import asyncio
from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import uuid
import os
import logging

from scanner import run_scan

# ---------------- LOGGING ----------------
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# ---------------- APP ----------------
app = FastAPI(title="Sanjay's Vision - Autonomous QA Inspector V2")

# ---------------- CORS ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- FOLDERS ----------------
os.makedirs("screenshots", exist_ok=True)
os.makedirs("reports", exist_ok=True)

app.mount("/screenshots", StaticFiles(directory="screenshots"), name="screenshots")

# ---------------- DB ----------------
scans_db = {}

# ---------------- REQUEST MODEL ----------------
class ScanRequest(BaseModel):
    url: str

# ---------------- CONNECTION MANAGER ----------------
class ConnectionManager:
    def __init__(self):
        self.active_connections = {}

    async def connect(self, scan_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[scan_id] = websocket
        logger.info(f"WebSocket connected: {scan_id}")

    async def send(self, scan_id: str, data: dict):
        if scan_id in self.active_connections:
            try:
                await self.active_connections[scan_id].send_json(data)
            except Exception as e:
                logger.error(f"Send failed: {e}")
                self.disconnect(scan_id)

    def disconnect(self, scan_id: str):
        if scan_id in self.active_connections:
            logger.info(f"WebSocket disconnected: {scan_id}")
            del self.active_connections[scan_id]

manager = ConnectionManager()

# ---------------- ROOT (OPTIONAL) ----------------
@app.get("/")
def root():
    return {"message": "Backend is running"}

# ---------------- START SCAN ----------------
@app.post("/scan")
async def start_scan(request: ScanRequest):
    scan_id = str(uuid.uuid4())

    logger.info(f"Starting Scan: {scan_id} for {request.url}")

    scans_db[scan_id] = {
        "status": "started",
        "broken_links": 0,
        "ui_issues": 0,
        "form_errors": 0,
        "js_errors": 0,
        "performance_issues": 0,
        "health_score": 100,
        "issues": [],
        "suggestions": []
    }

    # Run scan in background
    asyncio.create_task(run_scan_wrapper(scan_id, request.url))

    return {"scan_id": scan_id, "status": "started"}

# ---------------- SCAN WRAPPER ----------------
async def run_scan_wrapper(scan_id, url):
    # Wait for WebSocket connection (IMPORTANT)
    for _ in range(20):
        if scan_id in manager.active_connections:
            break
        await asyncio.sleep(0.5)

    await manager.send(scan_id, {
        "type": "log",
        "message": "Scan started"
    })

    try:
        await run_scan(scan_id, url, scans_db, manager)

        scans_db[scan_id]["status"] = "completed"

        await manager.send(scan_id, {
            "type": "complete"
        })

    except Exception as e:
        logger.error(f"Scan error: {e}")
        scans_db[scan_id]["status"] = "failed"

        await manager.send(scan_id, {
            "type": "error",
            "message": str(e)
        })

# ---------------- RESULTS ----------------
@app.get("/results/{scan_id}")
async def get_results(scan_id: str):
    if scan_id not in scans_db:
        raise HTTPException(status_code=404, detail="Scan ID not found")
    return scans_db[scan_id]

# ---------------- REPORT ----------------
@app.get("/report/{scan_id}")
async def get_report(scan_id: str):
    pdf_path = f"reports/{scan_id}.pdf"

    if not os.path.exists(pdf_path):
        if scan_id in scans_db and scans_db[scan_id]["status"] != "completed":
            raise HTTPException(status_code=400, detail="Scan is still processing")
        raise HTTPException(status_code=404, detail="Report not found")

    return FileResponse(
        pdf_path,
        media_type='application/pdf',
        filename=f"SanjayVision_Report_{scan_id}.pdf"
    )

# ---------------- WEBSOCKET ----------------
@app.websocket("/ws/{scan_id}")
async def websocket_endpoint(websocket: WebSocket, scan_id: str):
    await manager.connect(scan_id, websocket)

    try:
        while True:
            await asyncio.sleep(1)  # keep alive (NON-BLOCKING)
    except WebSocketDisconnect:
        manager.disconnect(scan_id)

# ---------------- RUN LOCAL ----------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)