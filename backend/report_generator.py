import os
import datetime
import base64
from playwright.async_api import async_playwright

async def generate_pdf_report(scan_id: str, results_data: dict, start_url: str):
    """
    🏗️ High-Fidelity Neo-Brutalist PDF Audit Manifesto (v6.0)
    Uses strict grid systems, thick borders, and hard shadows.
    """
    os.makedirs("reports", exist_ok=True)
    pdf_path = f"reports/{scan_id}.pdf"
    
    # 1. Capture/Encode Images for Embedding
    def encode_image(path):
        if not path or not os.path.exists(path): return ""
        try:
            with open(path, "rb") as f:
                return f"data:image/png;base64,{base64.b64encode(f.read()).decode()}"
        except: return ""

    issues = results_data.get("issues", [])
    health_score = results_data.get("health_score", 100)
    metrics = {
        "broken_links": results_data.get("broken_links", 0),
        "ui_issues": results_data.get("ui_issues", 0),
        "form_errors": results_data.get("form_errors", 0),
        "js_errors": results_data.get("js_errors", 0),
        "performance_issues": results_data.get("performance_issues", 0)
    }

    # 2. Construct the Neo-Brutalist HTML Content
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700;900&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
        <style>
            @page {{ size: A4; margin: 0; }}
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{
                font-family: 'Inter', sans-serif;
                background-color: #f9f9f9;
                color: #000000;
                line-height: 1.5;
                width: 210mm;
            }}
            .space-grotesk {{ font-family: 'Space Grotesk', sans-serif; }}
            .thick-border {{ border: 5px solid #000000; }}
            .neo-shadow {{ box-shadow: 10px 10px 0px 0px #000000; }}
            
            .page {{
                position: relative;
                width: 100%;
                min-height: 297mm;
                padding: 25mm;
                page-break-after: always;
                display: flex;
                flex-direction: column;
                background-color: #f9f9f9;
                border-bottom: 20px solid #000;
            }}

            /* --- COVER PAGE --- */
            .cover-page {{ 
                justify-content: center; 
                background-color: #FFDE03; /* High contrast Yellow */
                border: 10px solid #000;
            }}
            .cover-title {{ 
                font-size: 110px; 
                font-weight: 900; 
                letter-spacing: -6px; 
                line-height: 0.8; 
                text-transform: uppercase; 
                font-family: 'Space Grotesk';
                margin-bottom: 40px;
                transform: rotate(-2deg);
            }}
            .cover-badge {{ 
                display: inline-block;
                background: #000;
                color: #FFDE03;
                padding: 15px 30px;
                font-size: 24px;
                font-weight: 900;
                text-transform: uppercase;
                margin-bottom: 60px;
            }}
            .cover-meta {{ 
                border: 5px solid #000;
                background: #FFF;
                padding: 40px;
                box-shadow: 20px 20px 0px #000;
                font-family: 'Space Grotesk';
                font-weight: 700;
                text-transform: uppercase;
            }}
            .health-score-blob {{
                position: absolute;
                top: 40px;
                right: 40px;
                background: #000;
                color: #FFF;
                width: 150px;
                height: 150px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: 5px solid #000;
                transform: rotate(5deg);
            }}
            .score-val {{ font-size: 60px; font-weight: 900; line-height: 1; color: #FFDE03; }}

            /* --- SUMMARY PAGE --- */
            .section-header {{
                background: #000;
                color: #FFF;
                padding: 15px 30px;
                display: inline-block;
                font-family: 'Space Grotesk';
                font-weight: 900;
                font-size: 40px;
                text-transform: uppercase;
                margin-bottom: 50px;
                transform: skew(-5deg);
            }}
            .bento-grid {{
                display: grid;
                grid-template-columns: 1fr 1.5fr;
                gap: 40px;
                margin-bottom: 60px;
            }}
            .bento-item {{
                background: #FFF;
                border: 5px solid #000;
                padding: 30px;
                box-shadow: 12px 12px 0px #000;
            }}
            .stat-val {{ font-size: 80px; font-weight: 900; font-family: 'Space Grotesk'; line-height: 0.9; margin-bottom: 10px; }}
            .stat-label {{ font-size: 14px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; }}

            /* --- ISSUE CARDS --- */
            .issue-card {{
                page-break-inside: avoid;
                background: #FFF;
                border: 5px solid #000;
                padding: 30px;
                margin-bottom: 40px;
                box-shadow: 10px 10px 0px #000;
                display: flex;
                flex-direction: column;
                gap: 20px;
            }}
            .severity-seal {{
                display: inline-block;
                padding: 8px 16px;
                font-weight: 900;
                text-transform: uppercase;
                border: 3px solid #000;
                width: fit-content;
                font-size: 14px;
            }}
            .sev-critical {{ background: #B81D27; color: #FFF; }}
            .sev-high {{ background: #FFDE03; color: #000; }}
            .sev-medium {{ background: #000; color: #FFF; }}
            
            .screenshot-frame {{
                border: 4px solid #000;
                background: #000;
                overflow: hidden;
            }}
            .screenshot-frame img {{ width: 100%; display: block; }}

            /* --- FOOTER --- */
            .footer {{
                margin-top: auto;
                border-top: 5px solid #000;
                padding-top: 20px;
                display: flex;
                justify-content: space-between;
                font-family: 'Space Grotesk';
                font-weight: 900;
                text-transform: uppercase;
                font-size: 12px;
            }}

            @media print {{
                * {{ -webkit-print-color-adjust: exact; }}
            }}
        </style>
    </head>
    <body>
        <!-- COVER -->
        <div class="page cover-page">
            <div class="health-score-blob">
                <div class="score-val">{health_score}</div>
                <div style="font-size: 14px; font-weight: 900;">HEALTH_INDEX</div>
            </div>
            <h1 class="cover-title">SANJAY'S<br>VISION</h1>
            <div class="cover-badge">ARCHIVE_SYSTEM // V6.0</div>
            
            <div class="cover-meta">
                <div style="margin-bottom: 10px;">TARGET_MANIFESTO: {start_url}</div>
                <div style="margin-bottom: 10px;">PROTOCOL_ID: {scan_id[:8].upper()}</div>
                <div>TIMESTAMP: {datetime.datetime.now().strftime('%Y-%m-%d // %H:%M:%S UTC')}</div>
            </div>
            
            <div class="footer">
                <span>// CLASSIFIED AUDIT REPORT</span>
                <span>PAGE 01_OF_0X</span>
            </div>
        </div>

        <!-- SUMMARY -->
        <div class="page">
            <div class="section-header">MANIFESTO_SUMMARY</div>
            
            <div class="bento-grid">
                <div class="bento-item" style="background: #B81D27; color: #FFF;">
                    <div class="stat-val">{metrics['broken_links']}</div>
                    <div class="stat-label">DESTRUCTIVE_LINKS</div>
                </div>
                <div class="bento-item">
                    <div class="stat-val">{metrics['ui_issues']}</div>
                    <div class="stat-label">UI_ASYMMETRY_DETECTED</div>
                </div>
                <div class="bento-item" style="grid-column: span 2; background: #FFDE03;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div class="stat-val">{metrics['form_errors']}</div>
                            <div class="stat-label">FORM_INTEGRITY_FAILURES</div>
                        </div>
                        <div style="width: 1px; height: 80px; background: #000;"></div>
                        <div>
                            <div class="stat-val">{metrics['performance_issues']}</div>
                            <div class="stat-label">LATENCY_BOTTLENECKS</div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="border: 5px solid #000; padding: 40px; background: #FFF;">
                <h3 style="font-family: 'Space Grotesk'; font-weight: 900; text-transform: uppercase; margin-bottom: 20px;">SYSTEM_ADVISORY</h3>
                <p style="font-weight: 700; text-transform: uppercase; color: #666;">Autonomous scan complete. Nodes traversed: {len(results_data.get('visited', []))} pages. All identified threats have been categorized by catastrophic potential.</p>
            </div>

            <div class="footer">
                <span>REF_PROTOCOL: GS-992-ALPHA</span>
                <span>PAGE 02_OF_0X</span>
            </div>
        </div>

        <!-- BUG INVENTORY -->
        <div class="page">
            <div class="section-header">BUG_MANIFESTO</div>
            
            {" ".join([f"""
            <div class="issue-card">
                <div style="display: flex; justify-content: space-between; align-items: start;">
                    <div>
                        <div class="severity-seal sev-{issue.get('severity', 'medium').lower()}">{issue.get('severity', 'MEDIUM')}</div>
                        <div style="font-family: 'Space Grotesk'; font-weight: 900; text-transform: uppercase; margin-top: 15px; font-size: 24px;">{issue.get('description', 'Technical Detail Missing')}</div>
                    </div>
                    <div style="font-family: 'Space Grotesk'; font-weight: 900; font-size: 12px;">ID_{i:03}</div>
                </div>
                <div style="font-family: 'Mono', monospace; font-size: 10px; background: #eee; padding: 10px; border: 1px dashed #000;">LOC: {issue.get('page', 'Unknown')}</div>
                {"<div class='screenshot-frame'><img src='" + encode_image(issue.get('screenshot')) + "'></div>" if issue.get('screenshot') else ""}
            </div>
            """ for i, issue in enumerate(issues[:4])])}

            <div class="footer">
                <span>FEED_STATUS: SEALED</span>
                <span>PAGE 03_OF_0X</span>
            </div>
        </div>
    </body>
    </html>
    """

    # 3. Render PDF via Playwright
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context()
        page = await context.new_page()
        await page.set_content(html_content)
        await page.pdf(
            path=pdf_path, 
            format="A4", 
            print_background=True,
            display_header_footer=False,
            prefer_css_page_size=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        await browser.close()
        
    return pdf_path
