import asyncio
import os
import sys

# Ensure the backend directory is in the path
sys.path.append(os.path.join(os.getcwd(), 'backend'))

from report_generator import generate_pdf_report

async def test_pdf():
    mock_data = {
        "health_score": 82,
        "broken_links": 4,
        "ui_issues": 12,
        "form_errors": 2,
        "js_errors": 1,
        "performance_issues": 3,
        "visited": ["https://example.com", "https://example.com/about"],
        "issues": [
            {
                "type": "accessibility_issue",
                "severity": "critical",
                "page": "https://example.com",
                "description": "Missing 'alt' text on critical hero image.",
                "screenshot": "backend/test_ss1.png" # Path to root
            },
            {
                "type": "broken_link",
                "severity": "major",
                "page": "https://example.com/about",
                "description": "Broken link to legacy documentation.",
            }
        ],
        "suggestions": [
            "Implement global 'alt' text audit.",
            "Sanitize input vectors identified during humanoid testing."
        ]
    }
    
    scan_id = "test-neo-brutalist-report"
    start_url = "https://example.com"
    
    print("Generating Neo-Brutalist PDF...")
    pdf_path = await generate_pdf_report(scan_id, mock_data, start_url)
    print(f"PDF generated at: {pdf_path}")
    
    if os.path.exists(pdf_path):
        print("Verification Successful: PDF exists.")
    else:
        print("Verification Failed: PDF not found.")

if __name__ == "__main__":
    asyncio.run(test_pdf())
