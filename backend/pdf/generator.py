import os
import datetime
import base64
import logging
from playwright.async_api import async_playwright
from jinja2 import Template

# Step 11: Debug Log
logger = logging.getLogger("PDF_V2")
logger.setLevel(logging.INFO)

async def generate_pdf_report(scan_id: str, results_data: dict, start_url: str):
    """
    🏗️ MODULAR NEO-BRUTALIST PDF GENERATOR (V2)
    Completely rebuilt from scratch to resolve overflow and design inconsistencies.
    Uses Flow-Based CSS Architecture.
    """
    print("NEW NEO PDF SYSTEM ACTIVE") # Step 11: Mandatory Log
    logger.info(f"STARTING V2 PDF GENERATION: {scan_id}")

    os.makedirs("reports", exist_ok=True)
    pdf_path = f"reports/{scan_id}.pdf"
    
    # 1. Capture/Encode Images for Embedding
    def encode_image(path):
        if not path or not os.path.exists(path): return ""
        try:
            with open(path, "rb") as f:
                return f"data:image/png;base64,{base64.b64encode(f.read()).decode()}"
        except: return ""

    # Prepare Data for Jinja2
    issues = results_data.get("issues", [])
    for issue in issues:
        # Step 7: Screenshot handling
        issue["screenshot_base64"] = encode_image(issue.get("screenshot"))
        
        # Step 6: Heatmap check (reports/{scan_id}_heatmap.png)
        heatmap_path = f"reports/{scan_id}_heatmap.png"
        if os.path.exists(heatmap_path):
            issue["heatmap_base64"] = encode_image(heatmap_path)
        else:
            issue["heatmap_base64"] = ""

    health_score = results_data.get("health_score", 100)
    metrics = {
        "links": results_data.get("broken_links", 0),
        "ui": results_data.get("ui_issues", 0),
        "forms": results_data.get("form_errors", 0),
        "performance": results_data.get("performance_issues", 0)
    }

    # Load Template and Styles
    current_dir = os.path.dirname(os.path.abspath(__file__))
    with open(os.path.join(current_dir, "template.html"), "r") as f:
        template_str = f.read()
    with open(os.path.join(current_dir, "styles.css"), "r") as f:
        css_style = f.read()

    # Inject into Jinja2 Template
    template = Template(template_str)
    html_content = template.render(
        scan_id=scan_id.upper(),
        start_url=start_url,
        timestamp=datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S UTC'),
        health_score=health_score,
        metrics=metrics,
        issues=issues,
        status=results_data.get("status", "unknown").upper(),
        nested_styles=css_style
    )

    # 3. Render PDF via Playwright (Step 2 & 4)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        
        # Ensure we are using the new template string
        await page.set_content(html_content)
        
        # Step 10: Print Optimization
        await page.pdf(
            path=pdf_path, 
            format="A4", 
            print_background=True,
            display_header_footer=False,
            prefer_css_page_size=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        await browser.close()
        
    logger.info(f"V2 PDF GENERATION COMPLETE: {pdf_path}")
    return pdf_path
