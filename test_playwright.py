import asyncio
from playwright.async_api import async_playwright

async def test():
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto("https://antigravity.google")
            print("PLAYWRIGHT_OK")
            await browser.close()
    except Exception as e:
        print(f"PLAYWRIGHT_ERROR: {e}")

if __name__ == "__main__":
    asyncio.run(test())
