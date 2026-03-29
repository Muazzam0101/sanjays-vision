import os
import datetime
import base64
import logging
from playwright.async_api import async_playwright
from jinja2 import Template
from PIL import Image, ImageDraw, ImageFilter

# Step 11: Debug Log
logger = logging.getLogger("PDF_V2")
logger.setLevel(logging.INFO)

def draw_heatmap(base_image_path, heatmap_data, output_path):
    """
    Overlay heatmap interaction nodes on base screenshot as a Thermal Glow (v3)
    """
    if not os.path.exists(base_image_path):
        return None
        
    try:
        base = Image.open(base_image_path).convert("RGBA")
        # Global Thermal Overlay
        thermal_overlay = Image.new("RGBA", base.size, (0, 0, 0, 0))
        
        # Draw discrete intensity blobs on a single mask
        mask = Image.new("L", base.size, 0)
        mask_draw = ImageDraw.Draw(mask)
        
        for point in heatmap_data:
            x, y = point.get("x", 0), point.get("y", 0)
            p_type = point.get("type", "CLICK")
            
            if p_type == "BUG": intensity, radius = 255, 60
            elif p_type == "CLICK": intensity, radius = 180, 40
            else: intensity, radius = 100, 30
                
            left_up = (x - radius, y - radius)
            right_down = (x + radius, y + radius)
            mask_draw.ellipse([left_up, right_down], fill=intensity)
            
        # Heavy Blur to create the thermal glow
        blurred_mask = mask.filter(ImageFilter.GaussianBlur(radius=25))
        
        # Colorize the mask: Red for high (>200), Yellow for medium (>120), Blue for low (>40)
        # We'll use a triple-layer composite approach for the glow colors
        red_layer = Image.new("RGBA", base.size, (255, 0, 0, 180)) # High Density
        yellow_layer = Image.new("RGBA", base.size, (255, 230, 0, 140)) # Medium Priority
        blue_layer = Image.new("RGBA", base.size, (0, 122, 255, 100)) # Low Frequency
        
        # Composite based on intensity thresholds in the blurred mask
        # High intensity -> Red
        high_mask = blurred_mask.point(lambda p: p if p > 180 else 0)
        thermal_overlay.paste(red_layer, (0,0), high_mask)
        
        # Medium intensity -> Yellow
        med_mask = blurred_mask.point(lambda p: p if (100 < p <= 180) else 0)
        thermal_overlay.paste(yellow_layer, (0,0), med_mask)
        
        # Low intensity -> Blue
        low_mask = blurred_mask.point(lambda p: p if (20 < p <= 100) else 0)
        thermal_overlay.paste(blue_layer, (0,0), low_mask)
            
        # Step 7: Final Composite with base
        combined = Image.alpha_composite(base, thermal_overlay)
        # Apply strict 5px border integrated into the image as well (optional but cleaner)
        combined.convert("RGB").save(output_path, "PNG")
        print(f"THERMAL HEATMAP GENERATED (V3): {output_path}") 
        return output_path
    except Exception as e:
        logger.error(f"Thermal failure (Safe): {e}")
        return None

async def generate_pdf_report(scan_id: str, results_data: dict, start_url: str):
    """
    🏗️ MODULAR NEO-BRUTALIST PDF GENERATOR (V2)
    Completely rebuilt from scratch to resolve overflow and design inconsistencies.
    Uses Flow-Based CSS Architecture.
    """
    print("NEW NEO PDF SYSTEM ACTIVE") # Step 11: Mandatory Log
    logger.info(f"STARTING V2 PDF GENERATION: {scan_id}")

    # Use Absolute Paths for artifacts (Reliability Fix v3)
    reports_dir = os.path.abspath("reports")
    os.makedirs(reports_dir, exist_ok=True)
    pdf_path = os.path.join(reports_dir, f"{scan_id}.pdf")
    heatmap_output = os.path.join(reports_dir, f"{scan_id}_heatmap.png")
    
    # Step 3: Heatmap Base Location (Reliability Fix v3)
    heatmap_data = results_data.get("heatmap_data", [])
    base_ss = results_data.get("main_screenshot")
    
    # Trace log for support
    print(f"LOCATING BASE SCREENSHOT: {base_ss}") 
    
    if not base_ss:
        # Fallback search
        for issue in results_data.get("issues", []):
            if "_nav_" in (issue.get("screenshot") or ""):
                base_ss = issue.get("screenshot")
                break
            
    if base_ss and os.path.exists(base_ss):
        print(f"BASE SCREENSHOT VERIFIED: {base_ss}")
        draw_heatmap(base_ss, heatmap_data, heatmap_output)
    else:
        print(f"CRITICAL: BASE SCREENSHOT NOT FOUND AT {base_ss}")
    
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
        "form_validation": results_data.get("form_validation_errors", 0),
        "performance": results_data.get("performance_issues", 0)
    }

    # Step 5: Encode Heatmap for Main Section
    heatmap_base64 = encode_image(heatmap_output)

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
        heatmap_base64=heatmap_base64,
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
