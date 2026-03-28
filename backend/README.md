# Sanjay's Vision - Autonomous QA Backend

A production-ready Python backend built for the Sanjay's Vision platform. It utilizes FastAPI, Playwright, and ReportLab to autonomously crawl target websites, identify UI and Security bugs, capture photographic evidence, and compile cryptographic PDF reports.

## Architecture Stack
- **API Framework**: FastAPI
- **Web Automation**: Playwright (Async Python)
- **DOM Parsing**: BeautifulSoup4
- **PDF Engine**: Jinja2 + Playwright (PDF Rendering)

## Core Endpoints
### 1. Start a New Scan
```http
POST /scan
Content-Type: application/json

{
  "url": "https://example.com"
}
```
**Response**: `{"scan_id": "ab12-cd34-...", "status": "started"}`

### 2. Poll Results
```http
GET /results/{scan_id}
```
**Response**: Complete JSON payload comprising total broken links, UI issues, Form validation failures, specific detected endpoints, severities, and local paths to captured screenshot evidence. Includes the calculated `health_score`.

### 3. Download the PDF Report
```http
GET /report/{scan_id}
```
**Response**: Downloads `SanjayVision_Report_{scan_id}.pdf` containing a formatted executive summary and full screenshot evidence.

## Instructions to Run
1. Navigate to the backend directory:
   ```bash
   cd "backend"
   ```

2. (Optional) Create a virtual environment:
   ```bash
   python -m venv venv
   # Windows: venv\\Scripts\\activate
   # Mac/Linux: source venv/bin/activate
   ```

3. Install all dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Install the Playwright Chromium binaries:
   ```bash
   playwright install chromium
   ```

5. Launch the FastAPI Development Server:
   ```bash
   uvicorn main:app --reload
   ```

The backend API will be instantly available on `http://localhost:8000`. You can view interactive API documentation at `http://localhost:8000/docs`.

## File Manifest
- `main.py`: Bootstraps the backend, configures CORS, and handles HTTP API endpoints.
- `scanner.py`: Background automation task orchestrating the Playwright headless browser. It maps URLs and injects evaluation scripts to locate issues and captures screenshots.
- `pdf/`: A modular package for high-fidelity PDF generation using Jinja2 templates and Playwright rendering.
- `requirements.txt`: Tracks the precise dependency footprint.
- `/screenshots`: Auto-generated directory for bug snapshots.
- `/reports`: Auto-generated directory for deployed PDFs.
