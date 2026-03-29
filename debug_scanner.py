
import asyncio
import sys
import os

# Add backend to path
sys.path.append(os.path.join(os.getcwd(), "backend"))

from scanner import run_scan

async def test_scan():
    scans_db = {"test-id": {"status": "pending"}}
    # Mock manager
    class MockManager:
        async def send(self, scan_id, data):
            print(f"[WS] {scan_id}: {data}")
    
    manager = MockManager()
    
    print("Starting direct scanner test on https://example.com...")
    try:
        await run_scan("test-id", "https://example.com", scans_db, manager)
        print(f"Final status in DB: {scans_db['test-id']['status']}")
        
        heatmap_file = f"reports/test-id_heatmap.png"
        if os.path.exists(heatmap_file):
            print(f"SUCCESS: Heatmap image found at {heatmap_file}")
        else:
            print("FAILURE: Heatmap image NOT found.")
            
        pdf_file = f"reports/test-id.pdf"
        if os.path.exists(pdf_file):
            print(f"SUCCESS: PDF report found at {pdf_file}")
        else:
            print("FAILURE: PDF report NOT found.")
            
    except Exception as e:
        print(f"Test failed with error: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test_scan())
