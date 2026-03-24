from fastapi import FastAPI, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uuid
import os
import logging

from scanner import run_scan

# Configure basic logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(title="Sanjay's Vision - Autonomous QA Inspector V2")

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("screenshots", exist_ok=True)
os.makedirs("reports", exist_ok=True)

# In-memory database
scans_db = {}

class ScanRequest(BaseModel):
    url: str

@app.post("/scan")
async def start_scan(request: ScanRequest, background_tasks: BackgroundTasks):
    scan_id = str(uuid.uuid4())
    logger.info(f"Initializing V2 Smart Scan: {scan_id} for {request.url}")
    
    # Upgraded state schema
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
    
    background_tasks.add_task(run_scan, scan_id, request.url, scans_db)
    return {"scan_id": scan_id, "status": "started"}

@app.get("/results/{scan_id}")
async def get_results(scan_id: str):
    if scan_id not in scans_db:
        raise HTTPException(status_code=404, detail="Scan ID not found")
    return scans_db[scan_id]

@app.get("/report/{scan_id}")
async def get_report(scan_id: str):
    pdf_path = f"reports/{scan_id}.pdf"
    if not os.path.exists(pdf_path):
        if scan_id in scans_db and scans_db[scan_id]["status"] != "completed":
            raise HTTPException(status_code=400, detail="Scan is still processing. Report not ready.")
        raise HTTPException(status_code=404, detail="Report PDF not found on server.")
        
    return FileResponse(pdf_path, media_type='application/pdf', filename=f"SanjayVision_Report_{scan_id}.pdf")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
