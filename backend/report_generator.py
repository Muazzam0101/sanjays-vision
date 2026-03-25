import os
import datetime
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib import colors

def generate_pdf_report(scan_id: str, results_data: dict, start_url: str):
    """
    Enhanced V2 PDF rendering architecture.
    """
    os.makedirs("reports", exist_ok=True)
    pdf_path = f"reports/{scan_id}.pdf"
    
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, rightMargin=72, leftMargin=72, topMargin=72, bottomMargin=18)
    styles = getSampleStyleSheet()
    
    title_style = styles['Title']
    meta_style = styles['Normal']
    heading_style = styles['Heading2']
    
    Story = []
    
    Story.append(Paragraph("Sanjay's Vision Advanced QA Report", title_style))
    Story.append(Spacer(1, 12))
    
    Story.append(Paragraph(f"<b>Target URL:</b> {start_url}", meta_style))
    Story.append(Paragraph(f"<b>Scan ID:</b> {scan_id}", meta_style))
    Story.append(Paragraph(f"<b>Date:</b> {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')} UTC", meta_style))
    Story.append(Spacer(1, 24))
    
    health_score = results_data.get("health_score", 100)
    color = "green" if health_score >= 80 else "orange" if health_score >= 50 else "red"
    Story.append(Paragraph(f"Global Health Score: <font color='{color}'><b>{health_score}/100</b></font>", styles['Heading1']))
    Story.append(Spacer(1, 12))
    
    data = [
        ["Severity Vector", "Count"],
        ["Broken Navigation Links", str(results_data.get('broken_links', 0))],
        ["UI/UX Deficiencies", str(results_data.get('ui_issues', 0))],
        ["Vulnerable Input Forms", str(results_data.get('form_errors', 0))],
        ["Javascript Exceptions", str(results_data.get('js_errors', 0))],
        ["Performance Hits", str(results_data.get('performance_issues', 0))]
    ]
    t = Table(data, colWidths=[240, 100])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (1,0), colors.darkblue),
        ('TEXTCOLOR', (0,0), (1,0), colors.whitesmoke),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('BOTTOMPADDING', (0,0), (-1,0), 12),
        ('BACKGROUND', (0,1), (-1,-1), colors.ghostwhite),
        ('GRID', (0,0), (-1,-1), 1, colors.grey)
    ]))
    Story.append(t)
    Story.append(Spacer(1, 24))

    # Suggestions Sub-Block
    suggs = results_data.get('suggestions', [])
    if suggs:
        Story.append(Paragraph("AI Diagnostic Suggestions:", heading_style))
        for sug in suggs:
            Story.append(Paragraph(f"- {sug}", styles['Normal']))
        Story.append(Spacer(1, 24))
    
    # Deep logs
    Story.append(Paragraph("Detected Vulnerabilities:", heading_style))
    Story.append(Spacer(1, 12))
    
    issues = results_data.get('issues', [])
    if not issues:
        Story.append(Paragraph("System appears perfectly fortified against evaluated vectors.", styles['Normal']))
    else:
        for idx, issue in enumerate(issues, 1):
            sev_color = "red" if issue['severity'] == "critical" else ("orange" if issue['severity'] == "major" else "blue")
            Story.append(Paragraph(f"{idx}. Threat Axis: {issue['type'].replace('_', ' ').title()} - <font color='{sev_color}'>[{issue['severity'].upper()}]</font>", styles['Heading4']))
            Story.append(Paragraph(f"<b>Endpoint:</b> {issue['page'][:60]}...", styles['Normal']))
            Story.append(Paragraph(f"<b>Detailed Synopsis:</b> {issue['description']}", styles['Normal']))
            Story.append(Spacer(1, 6))
            
            screenshot_path = issue.get('screenshot')
            if screenshot_path and os.path.exists(screenshot_path):
                try:
                    img = RLImage(screenshot_path, width=380, height=230)
                    Story.append(img)
                except Exception as e:
                    Story.append(Paragraph(f"[Snapshot Corrupted]", styles['Normal']))
            Story.append(Spacer(1, 18))
            
    doc.build(Story)
