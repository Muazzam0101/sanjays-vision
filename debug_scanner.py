
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
    except Exception as e:
        print(f"Test failed with error: {e}")

if __name__ == "__main__":
    asyncio.run(test_scan())
