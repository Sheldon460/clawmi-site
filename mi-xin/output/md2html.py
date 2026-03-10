#!/usr/bin/env python3
import re
import sys
import os

def md_to_html(md_file):
    with open(md_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract frontmatter
    title = ""
    subtitle = ""
    author = "幂信"
    
    frontmatter_match = re.search(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
    if frontmatter_match:
        frontmatter = frontmatter_match.group(1)
        title_match = re.search(r'title:\s*"([^"]+)"', frontmatter)
        subtitle_match = re.search(r'subtitle:\s*"([^"]+)"', frontmatter)
        author_match = re.search(r'author:\s*"([^"]+)"', frontmatter)
        if title_match:
            title = title_match.group(1)
        if subtitle_match:
            subtitle = subtitle_match.group(1)
        if author_match:
            author = author_match.group(1)
        content = content[frontmatter_match.end():]
    
    # Convert markdown to HTML
    html = content
    
    # Headers
    html = re.sub(r'^###### (.*?)$', r'<h6>\1</h6>', html, flags=re.MULTILINE)
    html = re.sub(r'^##### (.*?)$', r'<h5>\1</h5>', html, flags=re.MULTILINE)
    html = re.sub(r'^#### (.*?)$', r'<h4>\1</h4>', html, flags=re.MULTILINE)
    html = re.sub(r'^### (.*?)$', r'<h3>\1</h3>', html, flags=re.MULTILINE)
    html = re.sub(r'^## (.*?)$', r'<h2>\1</h2>', html, flags=re.MULTILINE)
    html = re.sub(r'^# (.*?)$', r'<h1>\1</h1>', html, flags=re.MULTILINE)
    
    # Bold and italic
    html = re.sub(r'\*\*\*(.*?)\*\*\*', r'<strong><em>\1</em></strong>', html)
    html = re.sub(r'\*\*(.*?)\*\*', r'<strong>\1</strong>', html)
    html = re.sub(r'\*(.*?)\*', r'<em>\1</em>', html)
    
    # Blockquotes
    def process_blockquote(match):
        text = match.group(1)
        lines = text.strip().split('\n')
        cleaned_lines = [re.sub(r'^>\s?', '', line) for line in lines]
        return '<blockquote>' + '\n'.join(cleaned_lines) + '</blockquote>'
    
    html = re.sub(r'(^>.*?(?=\n[^>]|\Z))', process_blockquote, html, flags=re.MULTILINE | re.DOTALL)
    
    # Tables
    def process_table(match):
        table_text = match.group(0)
        lines = table_text.strip().split('\n')
        if len(lines) < 2:
            return table_text
        
        html_table = '<table>\n'
        
        # Header
        headers = [cell.strip() for cell in lines[0].split('|') if cell.strip()]
        html_table += '<tr>' + ''.join(f'<th>{h}</th>' for h in headers) + '</tr>\n'
        
        # Skip separator line
        for line in lines[2:]:
            cells = [cell.strip() for cell in line.split('|') if cell.strip()]
            if cells:
                html_table += '<tr>' + ''.join(f'<td>{c}</td>' for c in cells) + '</tr>\n'
        
        html_table += '</table>'
        return html_table
    
    # Match table pattern
    html = re.sub(r'(\|[^\n]+\|\n\|[\-\|: ]+\|\n(?:\|[^\n]+\|\n?)+)', process_table, html)
    
    # Lists
    html = re.sub(r'^\d+\.\s+(.*?)$', r'<li>\1</li>', html, flags=re.MULTILINE)
    html = re.sub(r'^(\s*)[-*]\s+(.*?)$', r'<li>\2</li>', html, flags=re.MULTILINE)
    
    # Horizontal rules
    html = re.sub(r'^---+$', '<hr>', html, flags=re.MULTILINE)
    
    # Paragraphs
    paragraphs = html.split('\n\n')
    new_paragraphs = []
    in_list = False
    list_items = []
    
    for p in paragraphs:
        p = p.strip()
        if not p:
            continue
        
        # Check if it's a block element
        if p.startswith('<h') or p.startswith('<blockquote') or p.startswith('<table') or p.startswith('<hr'):
            if in_list and list_items:
                new_paragraphs.append('<ul>' + '\n'.join(list_items) + '</ul>')
                list_items = []
                in_list = False
            new_paragraphs.append(p)
        elif p.startswith('<li>'):
            in_list = True
            list_items.append(p)
        else:
            if in_list and list_items:
                new_paragraphs.append('<ul>' + '\n'.join(list_items) + '</ul>')
                list_items = []
                in_list = False
            new_paragraphs.append(f'<p>{p}</p>')
    
    if in_list and list_items:
        new_paragraphs.append('<ul>' + '\n'.join(list_items) + '</ul>')
    
    html = '\n\n'.join(new_paragraphs)
    
    # Build full HTML
    full_html = f'''<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<link rel="stylesheet" href="wechat-style.css">
</head>
<body>
<h1>{title}</h1>
<p class="subtitle">{subtitle}</p>

{html}

<div class="footer">
<p>作者：{author}</p>
</div>
</body>
</html>'''
    
    return full_html

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python md2html.py <markdown_file>")
        sys.exit(1)
    
    md_file = sys.argv[1]
    html = md_to_html(md_file)
    
    output_file = md_file.replace('.md', '.html')
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(html)
    
    print(f"Converted: {md_file} -> {output_file}")
