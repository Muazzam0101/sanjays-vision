import asyncio
from playwright.async_api import async_playwright
import traceback

async def main():
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            print("Browser launched successfully.")
            await browser.close()
    except Exception as e:
        print("Error launching Playwright:")
        traceback.print_exc()

asyncio.run(main())
