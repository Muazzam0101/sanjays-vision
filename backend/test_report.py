import sys
sys.path.append('.')
from report_generator import generate_pdf_report

data = {
    "health_score": 80,
    "issues": [
        {"type": "ui_issue", "severity": "medium", "page": "http://test", "description": "Test UI 1", "screenshot": "test_ss1.png"},
        {"type": "ui_issue", "severity": "medium", "page": "http://test", "description": "Test UI 2", "screenshot": "test_ss2.png"},
        {"type": "ui_issue", "severity": "medium", "page": "http://test", "description": "Test UI 3", "screenshot": "none.png"}
    ]
}

# Create dummy images
from PIL import Image
Image.new('RGB', (100, 100), color='red').save('test_ss1.png')
Image.new('RGB', (100, 100), color='blue').save('test_ss2.png')

generate_pdf_report("test_scan", data, "http://test")
print("Done!")
