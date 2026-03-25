import asyncio
import os
import uuid
import time
import urllib.parse
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright, Error as PlaywrightError
import logging
import traceback

from report_generator import generate_pdf_report

logger = logging.getLogger(__name__)

def classify_severity(issue_type: str, context: str = "") -> str:
    """
    Upgraded Smart Classification Logic
    """
    c = context.lower()
    if issue_type == "form_error" and any(x in c for x in ["sql", "xss", "buffer", "invalid"]):
        return "critical"
    elif issue_type == "broken_link":
        return "high"
    elif issue_type in ["js_error", "ui_issue", "performance_issue"]:
        return "medium"
    elif issue_type in ["seo_issue", "ux_issue", "accessibility_issue"]:
        return "low"
    return "low"

def run_scan(scan_id: str, start_url: str, scans_db: dict):
    """
    Synchronous thread wrapper. FastAPI will toss this into a worker thread,
    where we initialize a pristine Windows Proactor Event loop.
    """
    import sys
    if sys.platform == 'win32':
        asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())
    
    asyncio.run(_run_scan_async(scan_id, start_url, scans_db))

async def _run_scan_async(scan_id: str, start_url: str, scans_db: dict):
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
    
    def on_console(msg):
        if msg.type == "error":
            js_errors_detected.append(msg.text)
            
    def on_request_failed(request):
        js_errors_detected.append(f"Failed network resource: {request.url}")

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
            
            while to_visit and len(visited) < 5:
                current_url = to_visit.pop(0)
                if current_url in visited:
                    continue
                visited.add(current_url)
                
                try:
                    # Measure pure DOM Performance load
                    start_time = time.time()
                    response = await page.goto(current_url, wait_until="domcontentloaded", timeout=25000)
                    load_time = time.time() - start_time
                    
                    if load_time > 3.0:
                        issues.append({
                            "page": current_url,
                            "type": "performance_issue",
                            "severity": classify_severity("performance_issue"),
                            "description": f"Performance Issue - Slow Load Time ({load_time:.2f}s)",
                            "screenshot": None
                        })
                        scans_db[scan_id]["performance_issues"] += 1
                        suggestions.add("Optimize asset delivery to reduce DOM load times below 3 seconds.")

                    await asyncio.sleep(1) # Visual stabilization
                    
                    # Connection sanity
                    if response and response.status >= 400:
                        ss_path = get_ss_path("broken_link")
                        await page.screenshot(path=ss_path)
                        issues.append({
                            "page": current_url, "type": "broken_link", "severity": classify_severity("broken_link"),
                            "description": f"HTTP Error {response.status}", "screenshot": ss_path
                        })
                        scans_db[scan_id]["broken_links"] += 1
                        continue
                        
                    html_content = await page.content()
                    soup = BeautifulSoup(html_content, "html.parser")
                    
                    # SEO / Meta Checks
                    if not soup.find("title") or not soup.find("title").text.strip():
                        issues.append({"page": current_url, "type": "seo_issue", "severity": classify_severity("seo_issue"), "description": "Missing or empty <title> tag", "screenshot": None})
                        suggestions.add("Improve SEO ranking by wrapping all endpoints with descriptive <title> tags.")
                        
                    if not soup.find("meta", {"name": "description"}):
                        issues.append({"page": current_url, "type": "seo_issue", "severity": classify_severity("seo_issue"), "description": "Missing <meta name=\"description\"> tag", "screenshot": None})
                        suggestions.add("Improve Accessibility & SEO by incorporating <meta name=\"description\"> tags globally.")
                    
                    # Advanced Web Crawler mapping
                    for a_tag in soup.find_all("a", href=True):
                        href = a_tag["href"]
                        full_url = urllib.parse.urljoin(current_url, href)
                        if full_url.startswith(start_url) and full_url not in visited and len(to_visit) < 10:
                            to_visit.append(full_url)
                            
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
                            await page.screenshot(path=ss_path)
                            issues.append({"page": current_url, "type": "ui_issue", "severity": classify_severity("ui_issue"), "description": "Image element lacks valid 'src' property.", "screenshot": ss_path})
                            scans_db[scan_id]["ui_issues"] += 1
                        if alt is None or alt.strip() == "":
                            try:
                                await img.evaluate("(el) => el.style.border = '5px solid red'")
                            except:
                                pass
                            ss_path = get_ss_path("accessibility_issue")
                            await page.screenshot(path=ss_path)
                            issues.append({"page": current_url, "type": "accessibility_issue", "severity": classify_severity("accessibility_issue"), "description": "Image is missing 'alt' label property.", "screenshot": ss_path})
                            suggestions.add("Add alt tags to all image assets for 100% ADA compliance.")
                            
                    # UX Click Target Analysis
                    clickables = await page.query_selector_all("a, button, input[type='submit']")
                    for el in clickables[:10]:
                        try:
                            # 1. Check if Element is actively hidden but theoretically clickable in DOM tree
                            is_hidden = await page.evaluate("(el) => { const style = window.getComputedStyle(el); return style.display === 'none' || style.visibility === 'hidden'; }", el)
                            if is_hidden:
                                issues.append({"page": current_url, "type": "accessibility_issue", "severity": classify_severity("accessibility_issue"), "description": "Interactive element is hidden via CSS visibility logic.", "screenshot": None})
                                scans_db[scan_id]["ui_issues"] += 1
                                continue
                            
                            # 2. Check Bounding Math for Mobile usability scaling
                            box = await el.bounding_box()
                            if box and box["width"] > 0 and (box["width"] < 30 or box["height"] < 30):
                                try:
                                    await el.evaluate("(el) => el.style.border = '5px solid red'")
                                except:
                                    pass
                                ss_path = get_ss_path("ux_issue")
                                await page.screenshot(path=ss_path)
                                issues.append({"page": current_url, "type": "ux_issue", "severity": classify_severity("ux_issue"), "description": f"Poor UX - Click target is too small for mobile touch standards ({int(box['width'])}x{int(box['height'])})", "screenshot": ss_path})
                                scans_db[scan_id]["ui_issues"] += 1
                        except Exception:
                            pass

                    # Form Auditing (SQLi, XSS, Overflow bounds)
                    forms = await page.query_selector_all("form")
                    for form in forms[:2]: 
                        inputs = await form.query_selector_all("input[type='text'], input[type='email'], input[type='search']")
                        submit = await form.query_selector("button[type='submit'], input[type='submit'], button")
                        
                        if inputs and submit:
                            inp = inputs[0]
                            
                            # Dynamic Attack Payloads
                            payloads = [
                                ("bad-email-format", "Form accepted invalid format without native bounds check."),
                                ("' OR 1=1 --", "Potential Server susceptibility to raw SQL Injection payload."),
                                ("<script>alert('XSS')</script>", "Form failed to sanitize inline <script> XSS tags."),
                                ("A" * 600, "Buffer parsing failed to reject massively long 600-byte strings.")
                            ]
                            
                            for payload, description in payloads:
                                await inp.fill(payload)
                                await submit.click(force=True)
                                await page.wait_for_timeout(400) 
                                
                                is_valid = await page.evaluate("(el) => el.checkValidity()", inp)
                                if is_valid:
                                    ss_path = get_ss_path("form_error")
                                    await inp.evaluate("(el) => el.style.border = '5px solid red'")
                                    await page.screenshot(path=ss_path)
                                    
                                    issues.append({
                                        "page": current_url, 
                                        "type": "form_error", 
                                        "severity": classify_severity("form_error", payload), 
                                        "description": description, 
                                        "screenshot": ss_path
                                    })
                                    scans_db[scan_id]["form_errors"] += 1
                                    suggestions.add("Ensure deep input sanitization for XSS and SQL injection payloads server-side.")
                                    break

                except PlaywrightError as pe:
                    logger.warning(f"Timeout parsing {current_url}: {pe}")
                except Exception as ex:
                    logger.error(f"Unexpected parsing error {current_url}: {ex}")
                    
            # Global Javascript Execution Evaluation
            for err in js_errors_detected[:3]:
                ss_path = get_ss_path("js_error")
                try:
                    await page.screenshot(path=ss_path)
                except:
                    ss_path = None
                issues.append({"page": "Global JS Runtime", "type": "js_error", "severity": classify_severity("js_error"), "description": f"JavaScript Error: {err[:150]}", "screenshot": ss_path})
                scans_db[scan_id]["js_errors"] += 1
                suggestions.add("Resolve all console runtime warnings prior to React hydration mapping.")

            await context.close()
            await browser.close()
            
    except Exception as fatal_e:
        tb = traceback.format_exc()
        logger.error(f"Scanner crashed fatally: {fatal_e}\n{tb}")
        scans_db[scan_id]["status"] = "failed"
        scans_db[scan_id]["error_details"] = tb
        return

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
    scans_db[scan_id]["status"] = "completed"
    
    # Compile
    try:
        generate_pdf_report(scan_id, scans_db[scan_id], start_url)
    except Exception as pdf_e:
        logger.error(f"Generate PDF failed: {pdf_e}")
