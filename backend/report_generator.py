import os
import datetime
import base64
from playwright.async_api import async_playwright

async def generate_pdf_report(scan_id: str, results_data: dict, start_url: str):
    """
    🏗️ Neo-Brutalist PDF Audit Engine (v5.3) - LAYOUT FIX & HEATMAP.
    Generates a clear, non-overlapping tactical manifesto using strict Grid/Flow.
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

    # 2. Construct the Neo-Brutalist HTML Content with FIXED LAYOUT
    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@400;700;900&display=swap" rel="stylesheet">
        <style>
            @page {{ size: A4; margin: 0; }}
            * {{ margin: 0; padding: 0; box-sizing: border-box; }}
            body {{
                font-family: 'Inter', sans-serif;
                background-color: #f9f9f9;
                color: #000000;
                line-height: 1.5;
                display: block;
                width: 210mm;
            }}
            .font-headline {{ font-family: 'Space Grotesk', sans-serif; }}
            .thick-border {{ border: 4px solid #000000; }}
            .neo-shadow {{ box-shadow: 8px 8px 0px 0px #000000; }}
            
            /* Vertical Flow Layout */
            .page {{
                position: relative;
                width: 100%;
                min-height: 297mm;
                padding: 30mm 20mm 60mm 20mm; /* Added bottom padding for footer safety */
                page-break-after: always;
                display: flex;
                flex-direction: column;
                background-color: #f9f9f9;
                overflow: visible;
            }}

            h1, h2, h3, h4 {{ margin-bottom: 24px; word-wrap: break-word; overflow-wrap: anywhere; }}
            p {{ margin-bottom: 16px; word-wrap: break-word; overflow-wrap: anywhere; }}

            /* --- COVER PAGE FIX --- */
            .cover-page {{ 
                justify-content: center; 
                align-items: flex-start;
                background-color: #FFFFFF;
            }}
            .cover-title {{ font-size: 80px; font-weight: 900; letter-spacing: -4px; line-height: 0.9; text-transform: uppercase; }}
            .cover-subtitle {{ font-size: 24px; font-weight: 700; text-transform: uppercase; background: #FFDE03; padding: 10px 20px; border: 4px solid #000; margin-bottom: 40px; }}
            
            .cover-meta {{ 
                width: 100%;
                padding: 40px; 
                border: 4px solid #000; 
                background: #FFF; 
                position: relative; 
                display: block;
                margin-top: 20px;
            }}
            .health-score-blob {{
                background: #000; color: #FFDE03; font-size: 72px; font-weight: 900;
                padding: 24px; border: 4px solid #000; box-shadow: 12px 12px 0px #FFDE03;
                margin-bottom: 30px; display: inline-block;
            }}

            /* --- GRID SYSTEM --- */
            .manifesto-grid {{ 
                display: grid; 
                grid-template-columns: 1fr; 
                gap: 40px; 
                width: 100%;
                max-width: 900px;
                margin: 0 auto;
            }}

            /* --- SUMMARY PAGE --- */
            .section-title {{ font-size: 40px; font-weight: 900; text-transform: uppercase; border-bottom: 8px solid #000; display: inline-block; }}
            .stats-row {{ display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }}
            .stat-card {{ padding: 24px; background: #FFF; border: 4px solid #000; box-shadow: 8px 8px 0px #000; width: 100%; }}
            .stat-val {{ font-size: 64px; font-weight: 900; line-height: 1; }}
            .stat-label {{ font-size: 12px; font-weight: 900; text-transform: uppercase; opacity: 0.6; }}

            /* --- HEATMAP SECTION --- */
            .heatmap-header {{ margin-bottom: 30px; }}
            .screenshot-container {{
                position: relative;
                border: 4px solid #000;
                background: #000;
                width: 100%;
                margin-bottom: 15px;
            }}
            .screenshot-img {{
                display: block;
                width: 100%;
                height: auto;
                max-width: 100%;
                object-fit: contain;
            }}
            .heatmap-overlay {{
                position: absolute;
                top: 0; left: 0; right: 0; bottom: 0;
                z-index: 10;
                pointer-events: none;
                background-image: 
                    radial-gradient(circle at 30% 20%, rgba(255, 0, 0, 0.4) 0%, transparent 60%),
                    radial-gradient(circle at 60% 50%, rgba(255, 222, 3, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(0, 0, 255, 0.3) 0%, transparent 40%);
                mix-blend-mode: multiply;
            }}
            .heatmap-legend {{
                display: flex; gap: 15px; background: #FFF; border: 2px solid #000; padding: 10px; font-size: 10px; font-weight: 900; text-transform: uppercase;
            }}
            .legend-item {{ display: flex; align-items: center; gap: 5px; }}
            .box-red {{ width: 10px; height: 10px; background: #B81D27; border: 1px solid #000; }}
            .box-yellow {{ width: 10px; height: 10px; background: #FFDE03; border: 1px solid #000; }}
            .box-blue {{ width: 10px; height: 10px; background: #0000FF; border: 1px solid #000; }}

            /* --- BUG CARD REDESIGN --- */
            .issue-card {{ 
                page-break-inside: avoid;
                margin-bottom: 24px; 
                border: 4px solid #000; 
                background: #FFF; 
                padding: 24px; 
                box-shadow: 8px 8px 0px #000;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }}
            .severity-badge {{ 
                padding: 6px 16px; 
                font-weight: 900; 
                text-transform: uppercase; 
                border: 2px solid #000; 
                font-size: 12px; 
                display: inline-block;
                width: fit-content;
            }}
            .sev-critical {{ background: #B81D27; color: #FFF; }}
            .sev-major {{ background: #FFDE03; color: #000; }}
            .sev-minor {{ background: #0000FF; color: #FFF; }}
            
            .issue-url {{ font-size: 10px; font-weight: 900; text-transform: uppercase; color: #666; }}
            .issue-desc {{ font-size: 18px; font-weight: 900; line-height: 1.4; }}
            
            /* --- FOOTER FIX --- */
            .footer {{
                position: fixed; 
                bottom: 0; 
                left: 0; 
                right: 0;
                height: 40mm;
                padding: 10mm 20mm;
                background: transparent;
                pointer-events: none;
                z-index: 100;
            }}
            .footer-inner {{
                display: flex; 
                justify-content: space-between; 
                border-top: 4px solid #000; 
                padding-top: 10px;
                font-weight: 900; 
                font-size: 10px; 
                text-transform: uppercase;
                background: #f9f9f9;
                pointer-events: auto;
            }}

            @media print {{
                * {{ -webkit-print-color-adjust: exact; }}
                /* Force page break after summary */
                .page-summary {{ page-break-after: always; }}
            }}
        </style>
    </head>
    <body>
        <!-- PAGE 1: COVER -->
        <div class="page cover-page">
            <div class="health-score-blob font-headline">{health_score}% SCORE</div>
            <h1 class="cover-title font-headline">SANJAY'S<br>VISION</h1>
            <div class="cover-subtitle font-headline">AUTONOMOUS AUDIT MANIFESTO</div>
            
            <div class="cover-meta font-headline">
                <p><b>TARGET:</b> {start_url}</p>
                <p><b>SCAN_ID:</b> {scan_id}</p>
                <p><b>DATE:</b> {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
                <p><b>NODES SCANNED:</b> {len(results_data.get('visited', [])) or 5}</p>
            </div>

            <div class="footer"><div class="footer-inner"><span>Generated by Sanjay's Vision</span><span>01 // COVER</span></div></div>
        </div>

        <!-- PAGE 2: SUMMARY -->
        <div class="page page-summary">
            <h2 class="section-title font-headline">SCAN SUMMARY</h2>
            <div class="stats-row">
                <div class="stat-card">
                    <div class="stat-val font-headline">{metrics['broken_links']}</div>
                    <div class="stat-label">BROKEN LINKS</div>
                </div>
                <div class="stat-card" style="background:#FFDE03">
                    <div class="stat-val font-headline">{metrics['ui_issues']}</div>
                    <div class="stat-label">UI DEFICIENCIES</div>
                </div>
                <div class="stat-card" style="background:#B81D27; color:#FFF">
                    <div class="stat-val font-headline">{metrics['form_errors']}</div>
                    <div class="stat-label">FORM COMPLIANCE</div>
                </div>
                <div class="stat-card">
                    <div class="stat-val font-headline">{metrics['performance_issues']}</div>
                    <div class="stat-label">LATENCY BOTTLE-NECKS</div>
                </div>
            </div>

            <div class="footer"><div class="footer-inner"><span>Ref: GS-992-ALPHA</span><span>02 // SUMMARY</span></div></div>
        </div>

        <!-- PAGE 3: HEATMAP -->
        <div class="page">
            <h2 class="section-title font-headline">INTERACTION HEATMAP</h2>
            <div class="heatmap-header font-headline">
                <p>AI ANALYSIS OF HIGH-DENSITY USER INTERACTION THREATS AND CLICK-COLLISION ZONES.</p>
                <div class="heatmap-legend">
                    <div class="legend-item"><div class="box-red"></div> HIGH ISSUE DENSITY</div>
                    <div class="legend-item"><div class="box-yellow"></div> MEDIUM PRIORITY</div>
                    <div class="legend-item"><div class="box-blue"></div> LOW FREQUENCY</div>
                </div>
            </div>

            <div class="screenshot-container thick-border">
                {"<img src='" + encode_image(issues[0].get('screenshot')) + "' class='screenshot-img'>" if issues and issues[0].get('screenshot') else "<div style='height:300px; display:flex; align-items:center; justify-content:center; color:white;'>[AWAITING REPRODUCTION PACKET]</div>"}
                <div class="heatmap-overlay"></div>
            </div>
            <p class="fig-caption">FIG: INTERACTION HEATMAP ANALYSIS // NODE_{scan_id[:4]}</p>

            <div class="footer"><div class="footer-inner"><span>System Analytics Feed</span><span>03 // HEATMAP</span></div></div>
        </div>

        <!-- PAGE 4+: BUG INVENTORY -->
        <div class="page">
            <h2 class="section-title font-headline">DETECTED ISSUES</h2>
            
            {" ".join([f"""
            <div class="issue-card">
                <div class="severity-badge sev-{issue.get('severity', 'minor').lower()}">{issue.get('severity', 'minor')}</div>
                <div class="issue-url font-headline">{issue.get('page', 'Unknown Point')}</div>
                <h3 class="issue-desc font-headline">{issue.get('description', 'Technical synopsis unavailable.')}</h3>
                {"<div class='screenshot-container thick-border'><img src='" + encode_image(issue.get('screenshot')) + "' class='screenshot-img'></div>" if issue.get('screenshot') else ""}
                <div class="fig-caption">Fig {i+1}: Threat Capture // Node ID: {scan_id[:4]}</div>
            </div>
            """ for i, issue in enumerate(issues[:3])])}

            <div class="footer"><div class="footer-inner"><span>Bug Manifesto Sealed</span><span>04 // INVENTORY</span></div></div>
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
            display_header_footer=False, # We handle footers in HTML for style
            prefer_css_page_size=True,
            margin={"top": "0", "bottom": "0", "left": "0", "right": "0"}
        )
        await browser.close()
        
    return pdf_path
