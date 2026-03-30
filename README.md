# 🚀 Sanjay’s Vision – Autonomous QA Inspector

> 🔍 AI-powered cybersecurity & QA automation system that scans websites, detects issues, and visualizes them in real-time.

---

## 🌐 Live Demo

- 🔗 Frontend: *((https://sanjays-vision.vercel.app/))*
- 🔗 Backend: https://sanjays-vision-backend.onrender.com

---

## 🧠 Overview

**Sanjay’s Vision** is an intelligent web scanning system that:

- Automatically crawls websites
- Detects UI, security, and functional issues
- Generates reports with screenshots
- Streams real-time scanning activity using WebSockets

---

## ✨ Features

### 🔍 Automated Scanning
- Multi-page crawling
- Form testing
- Broken link detection
- JavaScript error detection

### 🧠 Smart Analysis
- UI issues detection
- Performance insights
- Health score calculation
- Suggestions for improvement

### ⚡ Real-Time Visualization
- Live scanning logs
- Browser simulation UI
- Screenshot streaming
- WebSocket-based updates

### 📄 Report Generation
- PDF report generation
- Screenshot evidence
- Structured issue list

---

## 🧱 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- WebSockets

### Backend
- FastAPI
- Playwright
- WebSockets
- ReportLab

### Deployment
- Frontend → Vercel
- Backend → Render

---

## 📁 Project Structure
```
sanjays-vision/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── config/api.js
│   │   └── main.jsx
│   └── .env
│
├── backend/
│   ├── main.py
│   ├── scanner.py
│   ├── requirements.txt
│   ├── build.sh
│   ├── screenshots/
│   └── reports/
│
└── README.md
```

---

## ⚙️ Environment Variables

### Frontend (.env)
VITE_API_URL=https://sanjays-vision-backend.onrender.com
VITE_WS_URL=wss://sanjays-vision-backend.onrender.com/ws


---

## 🚀 Getting Started

### 🔧 Backend Setup

cd backend

pip install -r requirements.txt
playwright install chromium

uvicorn main:app --reload
Open:

http://127.0.0.1:8000/docs

---

### 💻 Frontend Setup
cd frontend

npm install
npm run dev

---

### 🌐 Deployment
🚀 Backend (Render)
1. Push code to GitHub
2. Create Web Service on Render
3. Configure:

Build Command: bash build.sh
Start Command: uvicorn main:app --host 0.0.0.0 --port 10000

---

### ⚡ Frontend (Vercel)
1. Import GitHub repo
2. Add Environment Variables
3.Deploy

---

### 🔌 API Endpoints
Start Scan
POST /scan
Get Results
GET /results/{scan_id}
Get Report
GET /report/{scan_id}

---

### 🔗 WebSocket
wss://sanjays-vision-backend.onrender.com/ws/{scan_id}
Events:
log

navigation

progress

screenshot

issue_detected

complete

---

### 🧪 Testing URLs
Use these safe demo sites:

https://demo.testfire.net

https://demoqa.com

https://example.com

---

### ⚠️ Limitations
Free Render backend has cold start (~2–5 min)

Large websites may be slow

Bot-protected sites are not supported

---

### 🏆 Hackathon Highlights
Real-time AI agent simulation

WebSocket-powered live updates

Automated QA + cybersecurity fusion

Futuristic UI design

---

### 🎤 Demo Line
“Our system autonomously scans websites, detects issues, and streams results in real-time like an AI QA engineer.”

---

### 📌 Future Improvements
AI-based issue explanation

Authentication testing

CI/CD integration

Advanced security scanning

---

## 👨‍💻 Authors

<div align="center">

👤 **Mohammad Muazzam**  
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)](https://github.com/Muazzam0101)

👤 **Aryan Khandare**  
[![GitHub](https://img.shields.io/badge/GitHub-Profile-black?logo=github)](https://github.com/AryanKhandare)

</div>
