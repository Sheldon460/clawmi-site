#!/usr/bin/env python3
"""
创建 SVG 图像 - 修复版（使用英文标签避免字体问题）
"""
import os

output_dir = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua"

# 封面图 SVG
cover_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="900" height="383" viewBox="0 0 900 383" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a237e"/>
      <stop offset="100%" style="stop-color:#0d47a1"/>
    </linearGradient>
    <linearGradient id="leftPanel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1976d2"/>
      <stop offset="100%" style="stop-color:#2196f3"/>
    </linearGradient>
    <linearGradient id="rightPanel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#7b1fa2"/>
      <stop offset="100%" style="stop-color:#9c27b0"/>
    </linearGradient>
  </defs>
  <rect width="900" height="383" fill="url(#bg)"/>
  <rect x="50" y="50" width="380" height="283" rx="15" fill="url(#leftPanel)" opacity="0.9"/>
  <text x="240" y="280" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="16" fill="white">OpenClaw</text>
  <rect x="470" y="50" width="380" height="283" rx="15" fill="url(#rightPanel)" opacity="0.9"/>
  <text x="660" y="280" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="16" fill="white">DeerFlow</text>
  <text x="450" y="40" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="28" fill="white">OpenClaw vs DeerFlow</text>
  <text x="450" y="355" text-anchor="middle" font-family="Arial" font-size="18" fill="white">Which AI Tool to Choose?</text>
</svg>'''

# OpenClaw 场景 SVG
openclaw_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#e3f2fd"/>
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#1565c0">OpenClaw Usage Scenario</text>
  <text x="512" y="100" text-anchor="middle" font-family="Arial" font-size="20" fill="#1976d2">One-on-One Conversation</text>
  <rect x="150" y="520" width="400" height="20" fill="#8d6e63"/>
  <circle cx="280" cy="370" r="50" fill="#ffccbc"/>
  <text x="280" y="380" text-anchor="middle" font-family="Arial" font-size="14" fill="#333">User</text>
  <circle cx="750" cy="450" r="70" fill="#ff5722"/>
  <text x="750" y="460" text-anchor="middle" font-family="Arial" font-size="14" fill="white">AI Lobster</text>
</svg>'''

# DeerFlow 场景 SVG
deerflow_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#f3e5f5"/>
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#7b1fa2">DeerFlow Multi-Agent Workflow</text>
  <text x="512" y="100" text-anchor="middle" font-family="Arial" font-size="20" fill="#9c27b0">Multiple AI Collaboration</text>
  <ellipse cx="512" cy="300" rx="60" ry="80" fill="#8d6e63"/>
  <text x="512" y="310" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Deer</text>
  <rect x="200" y="500" width="600" height="30" fill="#424242"/>
  <rect x="250" y="470" width="80" height="30" fill="#ff9800"/>
  <rect x="400" y="470" width="80" height="30" fill="#4caf50"/>
  <rect x="550" y="470" width="80" height="30" fill="#2196f3"/>
  <rect x="700" y="470" width="80" height="30" fill="#9c27b0"/>
</svg>'''

# 对比图表 SVG
comparison_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="white"/>
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#333">Efficiency Comparison</text>
  <rect x="200" y="800" width="100" height="-200" fill="#2196f3"/>
  <rect x="350" y="800" width="100" height="-350" fill="#9c27b0"/>
  <text x="250" y="830" text-anchor="middle" font-family="Arial" font-size="16" fill="#333">OpenClaw</text>
  <text x="400" y="830" text-anchor="middle" font-family="Arial" font-size="16" fill="#333">DeerFlow</text>
  <text x="250" y="580" text-anchor="middle" font-family="Arial" font-size="14" fill="white">60min</text>
  <text x="400" y="430" text-anchor="middle" font-family="Arial" font-size="14" fill="white">15min</text>
  <text x="512" y="900" text-anchor="middle" font-family="Arial" font-size="20" fill="#4caf50">75% Efficiency Gain</text>
</svg>'''

# 结论 SVG
conclusion_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#fafafa"/>
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#333">Decision Guide</text>
  <rect x="100" y="150" width="250" height="300" rx="15" fill="#4caf50" opacity="0.9"/>
  <text x="225" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="white">Switch Now</text>
  <text x="225" y="250" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Power Users</text>
  <text x="225" y="280" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Multi-tasking</text>
  <rect x="387" y="150" width="250" height="300" rx="15" fill="#ff9800" opacity="0.9"/>
  <text x="512" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="white">Wait &amp; See</text>
  <text x="512" y="250" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Casual Users</text>
  <text x="512" y="280" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Occasional Use</text>
  <rect x="674" y="150" width="250" height="300" rx="15" fill="#2196f3" opacity="0.9"/>
  <text x="799" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="white">Stay Put</text>
  <text x="799" y="250" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Satisfied</text>
  <text x="799" y="280" text-anchor="middle" font-family="Arial" font-size="14" fill="white">Simple Needs</text>
</svg>'''

# 保存 SVG 文件
svgs = [
    ("00_cover.svg", cover_svg),
    ("01_openclaw.svg", openclaw_svg),
    ("02_deerflow.svg", deerflow_svg),
    ("03_comparison.svg", comparison_svg),
    ("04_conclusion.svg", conclusion_svg)
]

print("Creating SVG images...")
for filename, content in svgs:
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"  Created: {filepath}")

print("\nConverting SVG to PNG...")
import cairosvg
for svg_file, _ in svgs:
    png_file = svg_file.replace('.svg', '.png')
    width = 900 if 'cover' in svg_file else 1024
    try:
        cairosvg.svg2png(url=svg_file, write_to=png_file, output_width=width)
        size = os.path.getsize(png_file)
        print(f"  {png_file} ({size} bytes)")
    except Exception as e:
        print(f"  Error: {e}")

print("\nDone!")
