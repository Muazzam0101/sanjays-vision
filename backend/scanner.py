import asyncio
import os
import uuid
import base64
import time
import urllib.parse
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, Error as PlaywrightError
import logging
import traceback

from pdf import generate_pdf_report
from ml_classifier import classify_severity_ml

logger = logging.getLogger(__name__)

# Step 1: Modular Form Validation Test Function
async def test_form_validation(page, current_url, issues, scans_db, scan_id, get_ss_path, safe_screenshot, heatmap_data, emit_issue, emit_log, emit_metrics):
    """
    Modular Form Stress Testing (Steps 1-6)
    Tests for weak validation, empty submissions, and required field bypass.
    """
    print(f"FORM TESTING STARTED: {current_url}") # Step 11
    
    try:
        # Step 2: Detect Forms
        forms = await page.query_selector_all("form")
        if not forms:
            return # Exit silently
            
        print(f"FORMS FOUND: {len(forms)}") # Step 11
        
        for i, form in enumerate(forms[:2]): # Step 9: Limit execution
            # Capture inputs for this form
            inputs = await form.query_selector_all("input[type='text'], input[type='email'], input[type='search'], input[type='password']")
            submit = await form.query_selector("button[type='submit'], input[type='submit'], button")
            
            if not submit: continue
            
            # Sub-test 1: Empty Submission
            emit_log(f"Form {i+1}: Testing empty submission...")
            await submit.click(force=True)
            await page.wait_for_timeout(500)
            
            # Check if URL changed significantly without error messages (potential bug)
            # Or if no native validation triggered
            has_validation_msg = await page.evaluate("() => document.querySelectorAll(':invalid').length > 0")
            
            if not has_validation_msg:
                # Potential weak validation if it's a 'critical' form
                severity = classify_severity("form_validation", "empty submission")
                ss_path = get_ss_path("form_validation")
                img_bytes = await safe_screenshot(page, ss_path)
                
                issues.append({
                    "page": current_url,
                    "type": "form_validation",
                    "issue": "Weak Validation: Empty form submission accepted",
                    "severity": "medium",
                    "screenshot": ss_path
                })
                scans_db[scan_id]["form_validation_errors"] += 1 
                emit_issue("form_validation", severity, "Empty form accepted")
                emit_log("FORM ISSUE DETECTED: Empty submission accepted")
                
                # Update heatmap for bug location
                box = await form.bounding_box()
                if box:
                    heatmap_data.append({"x": box["x"] + box["width"]/2, "y": box["y"] + box["height"]/2, "type": "BUG", "intensity": 0.8})

            # Reload to reset state for next test (Step 8)
            await page.reload()
            await page.wait_for_timeout(500)
            
            # Sub-test 2: Invalid Email Format
            email_inps = await page.query_selector_all("input[type='email']")
            if email_inps:
                emit_log(f"Form {i+1}: Testing invalid email 'abc@'...")
                await email_inps[0].fill("abc@")
                await submit.click(force=True)
                await page.wait_for_timeout(500)
                
                is_invalid = await page.evaluate("(el) => el.checkValidity() === false", email_inps[0])
                if not is_invalid:
                    severity = "medium"
                    ss_path = get_ss_path("form_validation")
                    await safe_screenshot(page, ss_path)
                    issues.append({
                        "page": current_url,
                        "type": "form_validation",
                        "issue": "Weak Validation: Invalid email format 'abc@' accepted",
                        "severity": severity,
                        "screenshot": ss_path
                    })
                    scans_db[scan_id]["form_validation_errors"] += 1
                    emit_issue("form_validation", severity, "Malformed email accepted")

            # Step 8: Non-destructive reload
            await page.reload()

    except Exception as e:
        print(f"FORM TESTING ERROR: {e}") # Step 6: Safe execution
        return # Continue scanning

def classify_severity(issue_type: str, context: str = "") -> str:
    """
    AI Bug Classification (Simple ML Classifier)
    """
    features = f"{issue_type} {context}".replace("_", " ")
    return classify_severity_ml(features)

async def run_scan(scan_id: str, start_url: str, scans_db: dict, manager=None):
    logger.info(f"V2 Scan {scan_id} started on {start_url}")
    visited = set()
    to_visit = [start_url]
    issues = []
    suggestions = set()
    js_errors_detected = []
    heatmap_data = [] # Interaction coordinates (Step 2)
    
    screenshot_counter = 0

    def get_ss_path(issue_type: str) -> str:
        nonlocal screenshot_counter
        screenshot_counter += 1
        rel_path = f"screenshots/{scan_id}_{issue_type}_{screenshot_counter}.png"
        return os.path.abspath(rel_path)

    def emit(event_data):
        if manager:
            asyncio.create_task(manager.send(scan_id, event_data))

    def emit_log(msg):
        emit({"type": "log", "message": msg})
        
    def emit_metrics():
        emit({"type": "metrics", "data": {
            "broken_links": scans_db[scan_id]["broken_links"],
            "ui_issues": scans_db[scan_id]["ui_issues"],
            "form_errors": scans_db[scan_id]["form_errors"],
            "form_validation": scans_db[scan_id]["form_validation_errors"],
            "js_errors": scans_db[scan_id]["js_errors"]
        }})
        
    def emit_issue(issue_type, severity, msg):
        emit({"type": "issue_detected", "issue": {"type": issue_type, "severity": severity, "message": msg}})

    scans_db[scan_id] = {
        "status": "scanning",
        "broken_links": 0,
        "ui_issues": 0,
        "form_errors": 0,
        "form_validation_errors": 0,
        "performance_issues": 0,
        "js_errors": 0,
        "issues": []
    }

    def on_console(msg):
        if msg.type == "error":
            js_errors_detected.append(msg.text)
            
    def on_request_failed(request):
        js_errors_detected.append(f"Failed network resource: {request.url}")

    async def safe_screenshot(page, path, **kwargs):
        """
        Safety Wrapper for screenshots to prevent fatal crashes
        """
        try:
            return await page.screenshot(path=path, **kwargs)
        except Exception as e:
            logger.warning(f"Screenshot failed for {path}: {e}")
            return None

    async def robust_goto(page, url, max_retries=2):
        """
        Robust navigation with retries and 60s timeout
        """
        for attempt in range(max_retries + 1):
            try:
                logger.info(f"Navigating to {url} (Attempt {attempt+1})")
                return await page.goto(url, wait_until="domcontentloaded", timeout=60000)
            except Exception as e:
                logger.warning(f"Navigation failed (Attempt {attempt+1}): {e}")
                if attempt == max_retries:
                    raise e
                await asyncio.sleep(2)

    emit_log(f"Initializing V2 Smart Scanner for {start_url}...")
    emit({"type": "progress", "value": 5})

    # Initialize scan record in DB if not present (should be there from main.py)
    if scan_id in scans_db:
        scans_db[scan_id]["status"] = "processing"

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            context = await browser.new_context(
                viewport={'width': 1280, 'height': 800},
                user_agent='SanjaysVision-Crawler/2.0'
            )
            page = await context.new_page()
            
            # Attach Console Listeners for JS Error detection
            page.on("console", on_console)
            page.on("requestfailed", on_request_failed)

            # Heatmap Mouse Interaction Tracker (Step 2)
            async def on_click(event):
                heatmap_data.append({"x": event["x"], "y": event["y"], "type": "CLICK", "intensity": 0.5})
            page.on("click", on_click)
            
            max_pages = 3
            
            while to_visit and len(visited) < max_pages:
                current_url = to_visit.pop(0)
                if current_url in visited:
                    continue
                visited.add(current_url)
                
                # Progress math
                progress = int((len(visited) / max_pages) * 80)
                emit({"type": "progress", "value": progress})
                
                emit({"type": "navigation", "url": current_url})
                emit_log(f"Navigating to {current_url}...")
                
                try:
                    # Measure pure DOM Performance load using ROBUST GOTO
                    start_time = time.time()
                    response = await robust_goto(page, current_url)
                    load_time = time.time() - start_time
                    
                    emit_log(f"Page loaded in {load_time:.2f}s")
                    
                    # Capture basic navigation screenshot for the stream (SAFE)
                    nav_ss_path = get_ss_path("nav")
                    img_bytes = await safe_screenshot(page, nav_ss_path)
                    
                    # Step 5: Always store main_screenshot for the Heatmap base
                    if img_bytes and "main_screenshot" not in scans_db[scan_id]:
                        scans_db[scan_id]["main_screenshot"] = nav_ss_path

                    if img_bytes:
                        b64_img = base64.b64encode(img_bytes).decode('utf-8')
                        emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                    
                    # Step 7: Call Modular Form Validation Test
                    await test_form_validation(
                        page, current_url, issues, scans_db, scan_id, 
                        get_ss_path, safe_screenshot, heatmap_data, 
                        emit_issue, emit_log, emit_metrics
                    )

                    # Performance Analysis
                    if load_time > 3.0:
                        severity = classify_severity("performance_issue")
                        issues.append({
                            "page": current_url,
                            "type": "performance_issue",
                            "severity": severity,
                            "description": f"Performance Issue - Slow Load Time ({load_time:.2f}s)",
                            "screenshot": nav_ss_path
                        })
                        scans_db[scan_id]["performance_issues"] += 1
                        suggestions.add("Optimize asset delivery to reduce DOM load times below 3 seconds.")
                        emit_issue("performance", severity, f"Slow Load Time ({load_time:.2f}s)")

                    await asyncio.sleep(1) # Visual stabilization
                    
                    # Connection sanity
                    if response and response.status >= 400:
                        ss_path = get_ss_path("broken_link")
                        await safe_screenshot(page, ss_path)
                        severity = classify_severity("broken_link")
                        issues.append({
                            "page": current_url, "type": "broken_link", "severity": severity,
                            "description": f"HTTP Error {response.status}", "screenshot": ss_path
                        })
                        scans_db[scan_id]["broken_links"] += 1
                        emit_metrics()
                        emit_issue("broken_link", severity, f"HTTP Error {response.status}")
                        continue
                        
                    html_content = await page.content()
                    soup = BeautifulSoup(html_content, "html.parser")
                    
                    emit_log("Mapping DOM nodes and evaluating meta tags...")
                    
                    # SEO / Meta Checks
                    if not soup.find("title") or not soup.find("title").text.strip():
                        severity = classify_severity("seo_issue")
                        issues.append({"page": current_url, "type": "seo_issue", "severity": severity, "description": "Missing or empty <title> tag", "screenshot": None})
                        suggestions.add("Improve SEO ranking by wrapping all endpoints with descriptive <title> tags.")
                        emit_issue("seo", severity, "Missing <title> tag")
                        
                    if not soup.find("meta", {"name": "description"}):
                        severity = classify_severity("seo_issue")
                        issues.append({"page": current_url, "type": "seo_issue", "severity": severity, "description": "Missing <meta name=\"description\"> tag", "screenshot": None})
                        suggestions.add("Improve Accessibility & SEO by incorporating <meta name=\"description\"> tags globally.")
                    
                    # Advanced Web Crawler mapping
                    for a_tag in soup.find_all("a", href=True):
                        href = a_tag["href"]
                        full_url = urllib.parse.urljoin(current_url, href)
                        if full_url.startswith(start_url) and full_url not in visited and len(to_visit) < 10:
                            to_visit.append(full_url)
                            
                    emit_log("Running Spectral UI & Accessibility checks...")
                    # UI Analysis & Accessibility
                    images = await page.query_selector_all("img")
                    for img in images[:5]:
                        src = await img.get_attribute("src")
                        alt = await img.get_attribute("alt")
                        if not src or src.strip() == "":
                            try:
                                await img.evaluate("(el) => el.style.border = '5px solid red'")
                            except:
                                pass
                            ss_path = get_ss_path("ui_issue")
                            img_bytes = await safe_screenshot(page, ss_path)
                            severity = classify_severity("ui_issue")
                            issues.append({"page": current_url, "type": "ui_issue", "severity": severity, "description": "Image element lacks valid 'src' property.", "screenshot": ss_path})
                            scans_db[scan_id]["ui_issues"] += 1
                            emit_issue("ui", severity, "Image lacks 'src'")
                            emit_metrics()
                            
                            # Track Bug Location (Step 2)
                            try:
                                box = await img.bounding_box()
                                if box:
                                    heatmap_data.append({"x": box["x"] + box["width"]/2, "y": box["y"] + box["height"]/2, "type": "BUG", "intensity": 1.0})
                            except: pass

                            if img_bytes:
                                b64_img = base64.b64encode(img_bytes).decode('utf-8')
                                emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                            
                        if alt is None or alt.strip() == "":
                            try:
                                await img.evaluate("(el) => el.style.border = '5px solid red'")
                            except:
                                pass
                            ss_path = get_ss_path("accessibility_issue")
                            img_bytes = await safe_screenshot(page, ss_path)
                            severity = classify_severity("accessibility_issue")
                            issues.append({"page": current_url, "type": "accessibility_issue", "severity": severity, "description": "Image is missing 'alt' label property.", "screenshot": ss_path})
                            suggestions.add("Add alt tags to all image assets for 100% ADA compliance.")
                            emit_issue("accessibility", severity, "Missing 'alt' label")
                            
                            # Track Bug Location (Step 2)
                            try:
                                box = await img.bounding_box()
                                if box:
                                    heatmap_data.append({"x": box["x"] + box["width"]/2, "y": box["y"] + box["height"]/2, "type": "BUG", "intensity": 1.0})
                            except: pass

                            if img_bytes:
                                b64_img = base64.b64encode(img_bytes).decode('utf-8')
                                emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                            
                    # UX Click Target Analysis
                    clickables = await page.query_selector_all("a, button, input[type='submit']")
                    for el in clickables[:10]:
                        try:
                            is_hidden = await page.evaluate("(el) => { const style = window.getComputedStyle(el); return style.display === 'none' || style.visibility === 'hidden'; }", el)
                            if is_hidden:
                                severity = classify_severity("accessibility_issue")
                                issues.append({"page": current_url, "type": "accessibility_issue", "severity": severity, "description": "Interactive element is hidden via CSS visibility logic.", "screenshot": None})
                                scans_db[scan_id]["ui_issues"] += 1
                                emit_issue("accessibility", severity, "Hidden interactive element")
                                emit_metrics()
                                continue
                            
                            box = await el.bounding_box()
                            if box and box["width"] > 0 and (box["width"] < 30 or box["height"] < 30):
                                try:
                                    await el.evaluate("(el) => el.style.border = '5px solid red'")
                                except:
                                    pass
                                ss_path = get_ss_path("ux_issue")
                                img_bytes = await safe_screenshot(page, ss_path)
                                severity = classify_severity("ux_issue")
                                issues.append({"page": current_url, "type": "ux_issue", "severity": severity, "description": f"Poor UX - Click target is too small for mobile touch standards ({int(box['width'])}x{int(box['height'])})", "screenshot": ss_path})
                                scans_db[scan_id]["ui_issues"] += 1
                                emit_issue("ux", severity, "Small clickable area")
                                emit_metrics()
                                
                                # Use already calculated box
                                if box:
                                    heatmap_data.append({"x": box["x"] + box["width"]/2, "y": box["y"] + box["height"]/2, "type": "BUG", "intensity": 1.0})
                                
                                if img_bytes:
                                    b64_img = base64.b64encode(img_bytes).decode('utf-8')
                                    emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                        except Exception:
                            pass
# Form Auditing (SQLi, XSS, Overflow bounds)
                    forms = await page.query_selector_all("form")
                    for form in forms[:2]: 
                        inputs = await form.query_selector_all("input[type='text'], input[type='email'], input[type='search']")
                        submit = await form.query_selector("button[type='submit'], input[type='submit'], button")
                        
                        if inputs and submit:
                            inp = inputs[0]
                            
                            payloads = [
                                ("bad-email-format", "Form accepted invalid format without native bounds check."),
                                ("' OR 1=1 --", "Potential Server susceptibility to raw SQL Injection payload."),
                                ("<script>alert('XSS')</script>", "Form failed to sanitize inline <script> XSS tags."),
                                ("A" * 600, "Buffer parsing failed to reject massively long 600-byte strings.")
                            ]
                            
                            for payload, description in payloads:
                                emit_log(f"Injecting payload: {payload[:20]}...")
                                await inp.fill(payload)
                                await submit.click(force=True)
                                await page.wait_for_timeout(400) 
                                
                                is_valid = await page.evaluate("(el) => el.checkValidity()", inp)
                                if is_valid:
                                    ss_path = get_ss_path("form_error")
                                    await inp.evaluate("(el) => el.style.border = '5px solid red'")
                                    img_bytes = await safe_screenshot(page, ss_path)
                                    
                                    severity = classify_severity("form_error", payload)
                                    issues.append({
                                        "page": current_url, 
                                        "type": "form_error", 
                                        "severity": severity, 
                                        "description": description, 
                                        "screenshot": ss_path
                                    })
                                    scans_db[scan_id]["form_errors"] += 1
                                    suggestions.add("Ensure deep input sanitization for XSS and SQL injection payloads server-side.")
                                    emit_issue("security", severity, description)
                                    emit_metrics()

                                    # Form location (Step 2)
                                    try:
                                        box = await inp.bounding_box()
                                        if box:
                                            heatmap_data.append({"x": box["x"] + box["width"]/2, "y": box["y"] + box["height"]/2, "type": "BUG", "intensity": 1.0})
                                    except: pass

                                    if img_bytes:
                                        b64_img = base64.b64encode(img_bytes).decode('utf-8')
                                        emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                                    break

                except PlaywrightError as pe:
                    logger.warning(f"Timeout parsing {current_url}: {pe}")
                    scans_db[scan_id]["status"] = "partial"
                except Exception as ex:
                    logger.error(f"Unexpected parsing error {current_url}: {ex}")
                    scans_db[scan_id]["status"] = "partial"
                    
            # Global Javascript Execution Evaluation
            emit_log("Finalizing Runtime Evaluation...")
            for err in js_errors_detected[:3]:
                ss_path = get_ss_path("js_error")
                img_bytes = await safe_screenshot(page, ss_path)
                
                severity = classify_severity("js_error")
                issues.append({"page": "Global JS Runtime", "type": "js_error", "severity": severity, "description": f"JavaScript Error: {err[:150]}", "screenshot": ss_path})
                scans_db[scan_id]["js_errors"] += 1
                suggestions.add("Resolve all console runtime warnings prior to React hydration mapping.")
                emit_issue("js_error", severity, f"JS Error: {err[:50]}")
                emit_metrics()
                if img_bytes:
                    b64_img = base64.b64encode(img_bytes).decode('utf-8')
                    emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})

            await context.close()
            await browser.close()
            if scans_db[scan_id]["status"] != "partial":
                scans_db[scan_id]["status"] = "completed"

    except Exception as fatal_e:
        tb = traceback.format_exc()
        logger.error(f"Scanner experienced a major issue: {repr(fatal_e)}\n{tb}")
        scans_db[scan_id]["status"] = "partial" # Mark as partial instead of failed
        scans_db[scan_id]["error_details"] = tb
        emit({"type": "log", "message": f"Critical Error in Crawler: {repr(fatal_e)}. Generating report for partial findings..."})

    # FINALIZATION PHASE (ALWAYS RUNS)
    emit({"type": "progress", "value": 90})
    emit_log("Applying Advanced Mathematical Scoring algorithms...")

    # Advanced Mathematical Scoring
    bl = scans_db[scan_id].get("broken_links", 0)
    ui = scans_db[scan_id].get("ui_issues", 0)
    fe = scans_db[scan_id].get("form_errors", 0)
    js = scans_db[scan_id].get("js_errors", 0)
    pi = scans_db[scan_id].get("performance_issues", 0)
    
    score = 100 - (bl * 5) - (ui * 3) - (fe * 4) - (js * 3) - (pi * 2)
    score = max(0, min(100, score))
    
    if score == 100 and len(suggestions) == 0:
        suggestions.update(["Ensure robust CDN caching across all networks", "Test gracefully degraded without Javascript"])

    scans_db[scan_id]["health_score"] = score
    scans_db[scan_id]["issues"] = issues
    scans_db[scan_id]["suggestions"] = list(suggestions)
    scans_db[scan_id]["heatmap_data"] = heatmap_data # Push to DB (Step 8)
    
    emit_log("Generating Cryptographic PDF Report...")
    # Compile
    try:
        await generate_pdf_report(scan_id, scans_db[scan_id], start_url)
    except Exception as pdf_e:
        logger.error(f"Generate PDF failed: {pdf_e}")
        
    if scans_db[scan_id]["status"] != "partial":
        scans_db[scan_id]["status"] = "completed"
    
    emit({"type": "progress", "value": 100})
    emit_log(f"Scan Finished. Final Status: {scans_db[scan_id]['status']}")
    emit({"type": "complete"})
