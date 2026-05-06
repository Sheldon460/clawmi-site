#!/usr/bin/env python3
"""
PDF Generator for Brand IP Design Document
Uses ReportLab for PDF generation with Chinese font support
"""

import os
import sys
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm, mm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import re

def register_chinese_fonts():
    """Register Chinese fonts for PDF generation"""
    font_paths = [
        # macOS system fonts
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
        # Linux fonts
        "/usr/share/fonts/truetype/wqy/wqy-zenhei.ttc",
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Regular.ttc",
        # Windows fonts (if available)
        "/mnt/c/Windows/Fonts/msyh.ttc",
        "/mnt/c/Windows/Fonts/simsun.ttc",
    ]
    
    registered = []
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                font_name = os.path.basename(font_path).split('.')[0]
                pdfmetrics.registerFont(TTFont(font_name, font_path))
                registered.append(font_name)
                print(f"Registered font: {font_name}")
            except Exception as e:
                print(f"Failed to register {font_path}: {e}")
    
    return registered

def parse_markdown(md_content):
    """Parse markdown content into structured elements"""
    elements = []
    lines = md_content.split('\n')
    i = 0
    
    while i < len(lines):
        line = lines[i]
        
        # Headers
        if line.startswith('# '):
            elements.append(('h1', line[2:].strip()))
        elif line.startswith('## '):
            elements.append(('h2', line[3:].strip()))
        elif line.startswith('### '):
            elements.append(('h3', line[4:].strip()))
        elif line.startswith('#### '):
            elements.append(('h4', line[5:].strip()))
        
        # Tables
        elif line.startswith('|') and '---' in line:
            # Table header separator, skip
            pass
        elif line.startswith('|'):
            # Table row
            cells = [cell.strip() for cell in line.split('|')[1:-1]]
            elements.append(('table_row', cells))
        
        # Code blocks
        elif line.startswith('```'):
            code_lines = []
            i += 1
            while i < len(lines) and not lines[i].startswith('```'):
                code_lines.append(lines[i])
                i += 1
            elements.append(('code', '\n'.join(code_lines)))
        
        # List items
        elif line.startswith('- ') or line.startswith('* '):
            elements.append(('list_item', line[2:].strip()))
        elif re.match(r'^\d+\.', line):
            elements.append(('list_item', line[line.find('.')+1:].strip()))
        
        # Empty lines
        elif line.strip() == '':
            elements.append(('spacer', None))
        
        # Regular paragraph
        else:
            elements.append(('paragraph', line.strip()))
        
        i += 1
    
    return elements

def create_pdf(md_file, output_file):
    """Create PDF from markdown file"""
    # Read markdown content
    with open(md_file, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Register fonts
    registered_fonts = register_chinese_fonts()
    
    if not registered_fonts:
        print("ERROR: No Chinese fonts could be registered!")
        print("Please install a Chinese font or check font paths.")
        return False
    
    # Use the first registered font as default
    chinese_font = registered_fonts[0]
    print(f"Using font: {chinese_font}")
    
    # Create PDF document
    doc = SimpleDocTemplate(
        output_file,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2*cm,
        bottomMargin=2*cm
    )
    
    # Create styles
    styles = getSampleStyleSheet()
    
    # Custom styles with Chinese font
    style_h1 = ParagraphStyle(
        'CustomH1',
        parent=styles['Heading1'],
        fontName=chinese_font,
        fontSize=24,
        textColor=colors.HexColor('#F5A623'),
        spaceAfter=20,
        alignment=1,  # Center
        borderWidth=0,
        borderColor=colors.HexColor('#F5A623'),
        borderPadding=10
    )
    
    style_h2 = ParagraphStyle(
        'CustomH2',
        parent=styles['Heading2'],
        fontName=chinese_font,
        fontSize=16,
        textColor=colors.HexColor('#1A1A2E'),
        spaceBefore=20,
        spaceAfter=10,
        leftIndent=10,
        borderWidth=0,
        borderColor=colors.HexColor('#00D4AA'),
        borderPadding=5
    )
    
    style_h3 = ParagraphStyle(
        'CustomH3',
        parent=styles['Heading3'],
        fontName=chinese_font,
        fontSize=13,
        textColor=colors.HexColor('#333333'),
        spaceBefore=15,
        spaceAfter=8
    )
    
    style_body = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontName=chinese_font,
        fontSize=11,
        leading=18,
        spaceAfter=10,
        alignment=4  # Justify
    )
    
    # Parse markdown and build PDF
    elements = []
    md_elements = parse_markdown(md_content)
    
    for elem_type, elem_content in md_elements:
        if elem_type == 'h1':
            elements.append(Paragraph(elem_content, style_h1))
            elements.append(Spacer(1, 20))
        elif elem_type == 'h2':
            elements.append(Paragraph(elem_content, style_h2))
            elements.append(Spacer(1, 10))
        elif elem_type == 'h3':
            elements.append(Paragraph(elem_content, style_h3))
            elements.append(Spacer(1, 5))
        elif elem_type == 'paragraph':
            # Clean up markdown syntax
            text = elem_content
            text = re.sub(r'\*\*(.*?)\*\*', r'<b>\1</b>', text)
            text = re.sub(r'\*(.*?)\*', r'<i>\1</i>', text)
            text = re.sub(r'`(.*?)`', r'<code>\1</code>', text)
            elements.append(Paragraph(text, style_body))
        elif elem_type == 'spacer':
            elements.append(Spacer(1, 10))
        # Note: Tables and code blocks would need more complex handling
    
    # Build PDF
    doc.build(elements)
    print(f"✅ PDF created successfully: {output_file}")
    return True

if __name__ == '__main__':
    md_file = 'mi-ma-arch-brand-ip-design.md'
    output_file = '幂码-架构品牌IP设计方案.pdf'
    
    try:
        success = create_pdf(md_file, output_file)
        if not success:
            print("❌ PDF generation failed")
            sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
