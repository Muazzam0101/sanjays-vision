import asyncio
import os
from scanner import _run_scan_async

async def test_autonomous():
    # Mock database and queue
    scans_db = {
        "test_auto": {
            "broken_links": 0, "ui_issues": 0, "form_errors": 0, "js_errors": 0, "performance_issues": 0,
            "status": "pending", "health_score": 0, "issues": [], "suggestions": []
        }
    }
    
    # Simple test against a local HTML or a known stable page with forms
    # For now, we'll just check if the code runs without crashing on a simple page
    test_url = "https://example.com" # Example.com is simple and safe
    
    print("Starting Autonomous Test Scan...")
    try:
        await _run_scan_async("test_auto", test_url, scans_db, max_pages=1)
        print("Success! Scan completed without crashing.")
    except Exception as e:
        print(f"Failed! Error: {e}")

if __name__ == "__main__":
    asyncio.run(test_autonomous())
