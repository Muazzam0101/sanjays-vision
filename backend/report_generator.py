import os
import datetime
import base64
import logging
from playwright.async_api import async_playwright

# Setup Logger for Debug Safety (Step 11)
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("PDF_GENERATOR_V8")

async def generate_pdf_report(scan_id: str, results_data: dict, start_url: str):
    """
    🏗️ REBUILT PDF GENERATOR (v8.0) - FLOW ARCHITECTURE
    Completely discards fixed-height manual pagination for a robust flow-based system.
    Strictly follows Neo-Brutalism design rules.
    """
    logger.info(f"INITIATING PDF REBUILD FOR SCAN: {scan_id} (LOG_V8.0)")
    os.makedirs("reports", exist_ok=True)
    pdf_path = f"reports/{scan_id}.pdf"
    
    # 1. Image Encoding Utility
    def encode_image(path):
        if not path or not os.path.exists(path): return ""
        try:
            with open(path, "rb") as f:
                return f"data:image/png;base64,{base64.b64encode(f.read()).decode()}"
        except Exception as e:
            logger.error(f"Image encode failed at {path}: {e}")
            return ""

    # Heatmap Check (Step 8)
    heatmap_path = f"reports/{scan_id}_heatmap.png"
    heatmap_base64 = encode_image(heatmap_path)

    issues = results_data.get("issues", [])
    health_score = results_data.get("health_score", 100)
    suggestions = results_data.get("suggestions", [])
    
    metrics = {
        "links": results_data.get("broken_links", 0),
        "ui": results_data.get("ui_issues", 0),
        "forms": results_data.get("form_errors", 0),
        "performance": results_data.get("performance_issues", 0)
    }

    # 2. Rebuilt HTML Template (Step 2, 3, 5)
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
        <style>
            /* --- STEP 10: PRINT CSS --- */
            @media print {{
                * {{ -webkit-print-color-adjust: exact; }}
                @page {{ margin: 15mm; size: A4 portrait; }}
            }}

            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            
            /* --- STEP 5: FLOW BASE --- */
            body {{
                font-family: 'Inter', sans-serif;
                background-color: #f9f9f9;
                color: #000;
                line-height: 1.5;
                height: auto; /* Fixed: No 100vh */
                overflow: visible; /* Fixed: No overflow hidden */
            }}

            /* --- STEP 3: LAYOUT SYSTEM --- */
            .main-container {{
                max-width: 900px; /* Fixed: User spec */
                margin: 0 auto;
                padding: 24px;
                display: flex;
                flex-direction: column;
                gap: 40px; /* Section gap step 3 */
            }}

            .font-headline {{ font-family: 'Space Grotesk', sans-serif; }}
            
            /* --- STEP 6: NEOBRUTALISM --- */
            .thick-border {{ border: 5px solid #000; }}
            .neo-shadow {{ box-shadow: 10px 10px 0px #000; }}
            .neo-shadow-sm {{ box-shadow: 6px 6px 0px #000; }}
            
            /* --- STEP 4: PAGE BREAKS --- */
            .avoid-break {{ page-break-inside: avoid; }}
            .force-page-break {{ page-break-after: always; }}

            /* --- COVER (Step 1/7) --- */
            .cover-section {{
                padding: 60px 40px;
                background-color: #FFDE03; /* Yellow block */
                display: flex;
                flex-direction: column;
                justify-content: center;
                border: 8px solid #000;
                margin-bottom: 20px;
            }}
            .cover-title {{ font-size: 84px; font-weight: 900; line-height: 0.8; letter-spacing: -4px; margin-bottom: 25px; text-transform: uppercase; }}
            .cover-subtitle {{ background: #000; color: #FFDE03; padding: 10px 20px; font-size: 24px; font-weight: 900; width: fit-content; text-transform: uppercase; }}

            .meta-card {{
                padding: 24px;
                background: #FFF;
                border: 5px solid #000;
                box-shadow: 12px 12px 0px #000;
                font-family: 'Space Grotesk';
                text-transform: uppercase;
                font-weight: 700;
            }}
            .score-card {{
                background: #000;
                color: #FFF;
                padding: 30px;
                text-align: center;
                width: 200px;
                border: 5px solid #000;
                box-shadow: 10px 10px 0px #FFDE03;
                align-self: flex-end;
                transform: rotate(2deg);
            }}

            /* --- SUMMARY (Step 2) --- */
            .summary-title {{ font-size: 40px; font-weight: 900; text-transform: uppercase; border-bottom: 8px solid #000; padding-bottom: 10px; margin-bottom: 30px; }}
            .stat-grid {{ display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }}
            .stat-card {{ background: #FFF; border: 5px solid #000; padding: 24px; box-shadow: 8px 8px 0px #000; }}
            .stat-val {{ font-size: 64px; font-weight: 900; line-height: 1; font-family: 'Space Grotesk'; }}
            .stat-label {{ font-size: 14px; font-weight: 900; text-transform: uppercase; margin-top: 10px; }}

            /* --- BUG CARDS (Step 7) --- */
            .issue-card {{
                background: #FFF;
                border: 5px solid #000;
                box-shadow: 10px 10px 0px #000;
                margin-bottom: 24px;
                display: flex;
                flex-direction: column;
                overflow: hidden;
            }}
            .issue-header {{ padding: 16px; border-bottom: 5px solid #000; display: flex; justify-content: space-between; align-items: center; }}
            .sev-label {{ padding: 8px 16px; border: 3px solid #000; font-weight: 900; text-transform: uppercase; font-size: 12px; }}
            .sev-critical {{ background: #B81D27; color: #FFF; }}
            .sev-major {{ background: #FFDE03; color: #000; }}
            .sev-minor {{ background: #000; color: #FFF; }}
            
            .issue-body {{ padding: 20px; }}
            .issue-title {{ font-size: 24px; font-weight: 900; margin-bottom: 15px; font-family: 'Space Grotesk'; text-transform: uppercase; }}
            .issue-loc {{ font-size: 12px; font-family: monospace; background: #eee; padding: 10px; border: 1px dashed #000; color: #444; margin-bottom: 20px; overflow-wrap: break-word; }}
            
            /* --- IMAGE BOX (Step 9) --- */
            .img-container {{
                border: 4px solid #000;
                background: #000;
                width: 100%;
                margin-bottom: 10px;
                display: flex;
                flex-direction: column;
            }}
            .img-container img {{ width: 100%; height: auto; object-fit: contain; display: block; }}
            .fig-caption {{ background: #000; color: #FFF; padding: 8px; font-size: 10px; font-weight: 900; text-transform: uppercase; }}

            /* --- HEATMAP (Step 8) --- */
            .heatmap-box {{ margin-top: 10px; border: 4px solid #000; }}

            /* --- FOOTER --- */
            .footer {{ border-top: 4px solid #000; padding-top: 10px; display: flex; justify-content: space-between; font-family: 'Space Grotesk'; font-weight: 900; font-size: 10px; text-transform: uppercase; }}
        </style>
    </head>
    <body>
        <div class="main-container">
            
            <!-- PAGE 1: COVER -->
            <div class="force-page-break avoid-break">
                <div class="cover-section thick-border">
                    <h1 class="cover-title font-headline">SANJAY'S<br>VISION</h1>
                    <div class="cover-subtitle font-headline">AUTONOMOUS QA REPORT</div>
                </div>
                
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-top: 30px;">
                    <div class="meta-card" style="flex: 1; margin-right: 20px;">
                        <p style="margin-bottom: 10px;">URL: {start_url}</p>
                        <p style="margin-bottom: 10px;">DATE: {datetime.datetime.now().strftime('%Y-%m-%d')}</p>
                        <p>ID: {scan_id[:8].upper()}</p>
                    </div>
                    <div class="score-card font-headline">
                        <div style="font-size: 14px;">HEALTH_SCORE</div>
                        <div style="font-size: 60px; font-weight: 900; color: #FFDE03;">{health_score}%</div>
                    </div>
                </div>
            </div>

            <!-- PAGE 2: SUMMARY -->
            <div class="force-page-break avoid-break">
                <h2 class="summary-title font-headline">SCAN_SUMMARY</h2>
                <div class="stat-grid">
                    <div class="stat-card" style="background: #B81D27; color: #FFF;">
                        <div class="stat-val font-headline">{metrics['links']}</div>
                        <div class="stat-label">DESTRUCTIVE_LINKS</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val font-headline">{metrics['ui']}</div>
                        <div class="stat-label">UI_INCONSISTENCIES</div>
                    </div>
                    <div class="stat-card" style="background: #FFDE03;">
                        <div class="stat-val font-headline">{metrics['forms']}</div>
                        <div class="stat-label">FORM_INTEGRITY_ERRORS</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-val font-headline">{metrics['performance']}</div>
                        <div class="stat-label">LATENCY_THREATS</div>
                    </div>
                </div>

                <div style="margin-top: 50px; border: 5px solid #000; padding: 30px; background: #FFF; box-shadow: 12px 12px 0px #FFDE03;">
                    <h3 class="font-headline" style="font-size: 24px; margin-bottom: 10px;">ANALYST SUGGESTIONS</h3>
                    {" ".join([f"<p style='font-weight:700; margin-bottom:10px;'>_ {sug.upper()}</p>" for sug in (suggestions if suggestions else ["Maintain CSS grid density", "Check responsive layout triggers"])])}
                </div>
            </div>

            <!-- BUG LIST (Step 7) -->
            <div>
                <h2 class="summary-title font-headline">DETECTED_ISSUES</h2>
                
                {" ".join([f"""
                <div class="issue-card avoid-break">
                    <div class="issue-header">
                        <div class="sev-label sev-{issue.get('severity', 'minor').lower()}">{issue.get('severity', 'MINOR')}</div>
                        <div class="font-headline" style="font-weight:900; font-size:12px;">TK_ID_{i+1:03}</div>
                    </div>
                    <div class="issue-body">
                        <h3 class="issue-title">{issue.get('description', 'Technical Detail Missing')}</h3>
                        <div class="issue-loc">SOURCE_NODE: {issue.get('page', 'Unknown Target')}</div>
                        
                        <!-- SCREENSHOT FRAME (Step 9) -->
                        {"<div class='img-container'><img src='" + encode_image(issue.get('screenshot')) + "'><div class='fig-caption'>FIG {i+1}.A: EVIDENCE CAPTURE</div></div>" if issue.get('screenshot') else ""}
                        
                        <!-- HEATMAP FRAME (Step 8) -->
                        {f"<div class='img-container heatmap-box'><img src='{heatmap_base64}'><div class='fig-caption'>FIG {i+1}.B: ELEMENT HEATMAP</div></div>" if heatmap_base64 else ""}
                    </div>
                </div>
                """ for i, issue in enumerate(issues)])}
            </div>

            <div class="footer">
                <span>MANIFERSTO ARCHIVE STATUS: SEALED</span>
                <span>PAGE_NODE_{scan_id[:4].upper()}</span>
                <span>GENERATED BY SANJAY'S VISION</span>
            </div>
        </div>
    </body>
    </html>
    """

    logger.info("RENDERING PDF VIA PLAYWRIGHT (ENGINE_V8.0)")

    # 3. Use Playwright (Step 2)
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        
        # Ensure we are using the new template string
        await page.set_content(html_content)
        
        # Render PDF (Step 10)
        await page.pdf(
            path=pdf_path, 
            format="A4", 
            print_background=True,
            display_header_footer=False,
            prefer_css_page_size=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        await browser.close()
        
    logger.info(f"PDF GENERATION SUCCESSFUL: {pdf_path}")
    return pdf_path
