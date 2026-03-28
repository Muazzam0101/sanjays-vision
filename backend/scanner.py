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
    
    screenshot_counter = 0

    def get_ss_path(issue_type: str) -> str:
        nonlocal screenshot_counter
        screenshot_counter += 1
        return f"screenshots/{scan_id}_{issue_type}_{screenshot_counter}.png"

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
            "js_errors": scans_db[scan_id]["js_errors"]
        }})
        
    def emit_issue(issue_type, severity, msg):
        emit({"type": "issue_detected", "issue": {"type": issue_type, "severity": severity, "message": msg}})

    def on_console(msg):
        if msg.type == "error":
            js_errors_detected.append(msg.text)
            
    def on_request_failed(request):
        js_errors_detected.append(f"Failed network resource: {request.url}")

    emit_log(f"Initializing V2 Smart Scanner for {start_url}...")
    emit({"type": "progress", "value": 5})

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
                    # Measure pure DOM Performance load
                    start_time = time.time()
                    response = await page.goto(current_url, wait_until="domcontentloaded", timeout=25000)
                    load_time = time.time() - start_time
                    
                    emit_log(f"Page loaded in {load_time:.2f}s")
                    
                    # Capture basic navigation screenshot for the stream
                    nav_ss_path = get_ss_path("nav")
                    img_bytes = await page.screenshot(path=nav_ss_path)
                    b64_img = base64.b64encode(img_bytes).decode('utf-8')
                    emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                    
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
                        await page.screenshot(path=ss_path)
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
                            img_bytes = await page.screenshot(path=ss_path)
                            b64_img = base64.b64encode(img_bytes).decode('utf-8')
                            severity = classify_severity("ui_issue")
                            issues.append({"page": current_url, "type": "ui_issue", "severity": severity, "description": "Image element lacks valid 'src' property.", "screenshot": ss_path})
                            scans_db[scan_id]["ui_issues"] += 1
                            emit_issue("ui", severity, "Image lacks 'src'")
                            emit_metrics()
                            emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                            
                        if alt is None or alt.strip() == "":
                            try:
                                await img.evaluate("(el) => el.style.border = '5px solid red'")
                            except:
                                pass
                            ss_path = get_ss_path("accessibility_issue")
                            img_bytes = await page.screenshot(path=ss_path)
                            b64_img = base64.b64encode(img_bytes).decode('utf-8')
                            severity = classify_severity("accessibility_issue")
                            issues.append({"page": current_url, "type": "accessibility_issue", "severity": severity, "description": "Image is missing 'alt' label property.", "screenshot": ss_path})
                            suggestions.add("Add alt tags to all image assets for 100% ADA compliance.")
                            emit_issue("accessibility", severity, "Missing 'alt' label")
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
                                img_bytes = await page.screenshot(path=ss_path)
                                b64_img = base64.b64encode(img_bytes).decode('utf-8')
                                severity = classify_severity("ux_issue")
                                issues.append({"page": current_url, "type": "ux_issue", "severity": severity, "description": f"Poor UX - Click target is too small for mobile touch standards ({int(box['width'])}x{int(box['height'])})", "screenshot": ss_path})
                                scans_db[scan_id]["ui_issues"] += 1
                                emit_issue("ux", severity, "Small clickable area")
                                emit_metrics()
                                emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                        except Exception:
                            pass

                    emit_log("Testing Input Forms for vulnerabilities...")
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
                                    img_bytes = await page.screenshot(path=ss_path)
                                    b64_img = base64.b64encode(img_bytes).decode('utf-8')
                                    
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
                                    emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})
                                    break

                except PlaywrightError as pe:
                    logger.warning(f"Timeout parsing {current_url}: {pe}")
                except Exception as ex:
                    logger.error(f"Unexpected parsing error {current_url}: {ex}")
                    
            # Global Javascript Execution Evaluation
            emit_log("Finalizing Runtime Evaluation...")
            for err in js_errors_detected[:3]:
                ss_path = get_ss_path("js_error")
                b64_img = None
                try:
                    img_bytes = await page.screenshot(path=ss_path)
                    b64_img = base64.b64encode(img_bytes).decode('utf-8')
                except:
                    ss_path = None
                
                severity = classify_severity("js_error")
                issues.append({"page": "Global JS Runtime", "type": "js_error", "severity": severity, "description": f"JavaScript Error: {err[:150]}", "screenshot": ss_path})
                scans_db[scan_id]["js_errors"] += 1
                suggestions.add("Resolve all console runtime warnings prior to React hydration mapping.")
                emit_issue("js_error", severity, f"JS Error: {err[:50]}")
                emit_metrics()
                if b64_img:
                    emit({"type": "screenshot", "image": f"data:image/png;base64,{b64_img}"})

            await context.close()
            await browser.close()
            
    except Exception as fatal_e:
        tb = traceback.format_exc()
        logger.error(f"Scanner crashed fatally: {fatal_e}\n{tb}")
        scans_db[scan_id]["status"] = "failed"
        scans_db[scan_id]["error_details"] = tb
        emit({"type": "failed", "message": "Crawler fatally crashed."})
        return

    emit({"type": "progress", "value": 90})
    emit_log("Applying Advanced Mathematical Scoring algorithms...")

    # Advanced Mathematical Scoring
    bl = scans_db[scan_id]["broken_links"]
    ui = scans_db[scan_id]["ui_issues"]
    fe = scans_db[scan_id]["form_errors"]
    js = scans_db[scan_id]["js_errors"]
    pi = scans_db[scan_id]["performance_issues"]
    
    score = 100 - (bl * 5) - (ui * 3) - (fe * 4) - (js * 3) - (pi * 2)
    score = max(0, min(100, score))
    
    if score == 100 and len(suggestions) == 0:
        suggestions.update(["Ensure robust CDN caching across all networks", "Test gracefully degraded without Javascript"])

    scans_db[scan_id]["health_score"] = score
    scans_db[scan_id]["issues"] = issues
    scans_db[scan_id]["suggestions"] = list(suggestions)
    
    emit_log("Generating Cryptographic PDF Report...")
    # Compile
    try:
        await generate_pdf_report(scan_id, scans_db[scan_id], start_url)
    except Exception as pdf_e:
        logger.error(f"Generate PDF failed: {pdf_e}")
        
    scans_db[scan_id]["status"] = "completed"
    emit({"type": "progress", "value": 100})
    emit_log("Scan Successfully Completed. Report Archived.")
    emit({"type": "complete"})
