#!/usr/bin/env python3
"""
创建 SVG 图像作为备选方案
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
  <text x="450" y="355" text-anchor="middle" font-family="Arial" font-size="18" fill="white">AI工具怎么选?</text>
</svg>'''

# OpenClaw 场景 SVG
openclaw_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#e3f2fd"/>
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#1565c0">OpenClaw 使用场景</text>
  <text x="512" y="100" text-anchor="middle" font-family="Arial" font-size="20" fill="#1976d2">单线程对话式交互</text>
  <rect x="150" y="520" width="400" height="20" fill="#8d6e63"/>
  <circle cx="280" cy="370" r="50" fill="#ffccbc"/>
  <circle cx="750" cy="450" r="70" fill="#ff5722"/>
  <text x="750" y="460" text-anchor="middle" font-family="Arial" font-size="14" fill="white">AI龙虾</text>
</svg>'''

# DeerFlow 场景 SVG
deerflow_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#f3e5f5"/>
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#7b1fa2">DeerFlow 多智能体工作流</text>
  <text x="512" y="100" text-anchor="middle" font-family="Arial" font-size="20" fill="#9c27b0">多个AI协同工作</text>
  <ellipse cx="512" cy="300" rx="60" ry="80" fill="#8d6e63"/>
  <text x="512" y="310" text-anchor="middle" font-family="Arial" font-size="14" fill="white">鹿调度器</text>
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
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#333">效率对比</text>
  <rect x="200" y="800" width="100" height="-200" fill="#2196f3"/>
  <rect x="350" y="800" width="100" height="-350" fill="#9c27b0"/>
  <text x="250" y="830" text-anchor="middle" font-family="Arial" font-size="16" fill="#333">OpenClaw</text>
  <text x="400" y="830" text-anchor="middle" font-family="Arial" font-size="16" fill="#333">DeerFlow</text>
  <text x="250" y="580" text-anchor="middle" font-family="Arial" font-size="14" fill="white">60min</text>
  <text x="400" y="430" text-anchor="middle" font-family="Arial" font-size="14" fill="white">15min</text>
  <text x="512" y="900" text-anchor="middle" font-family="Arial" font-size="20" fill="#4caf50">效率提升 75%</text>
</svg>'''

# 结论 SVG
conclusion_svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="1024" height="1024" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="#fafafa"/>
  <text x="512" y="60" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="36" fill="#333">决策建议</text>
  <rect x="100" y="150" width="250" height="300" rx="15" fill="#4caf50" opacity="0.9"/>
  <text x="225" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="white">建议换</text>
  <text x="225" y="250" text-anchor="middle" font-family="Arial" font-size="14" fill="white">重度用户</text>
  <text x="225" y="280" text-anchor="middle" font-family="Arial" font-size="14" fill="white">多任务处理</text>
  <rect x="387" y="150" width="250" height="300" rx="15" fill="#ff9800" opacity="0.9"/>
  <text x="512" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="white">可以观望</text>
  <text x="512" y="250" text-anchor="middle" font-family="Arial" font-size="14" fill="white">轻度用户</text>
  <text x="512" y="280" text-anchor="middle" font-family="Arial" font-size="14" fill="white">偶尔使用</text>
  <rect x="674" y="150" width="250" height="300" rx="15" fill="#2196f3" opacity="0.9"/>
  <text x="799" y="200" text-anchor="middle" font-family="Arial" font-weight="bold" font-size="20" fill="white">暂时不换</text>
  <text x="799" y="250" text-anchor="middle" font-family="Arial" font-size="14" fill="white">满意现状</text>
  <text x="799" y="280" text-anchor="middle" font-family="Arial" font-size="14" fill="white">简单需求</text>
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

print("\nDone! SVG files created successfully.")
print("\nFile paths:")
for filename, _ in svgs:
    print(f"  {os.path.join(output_dir, filename)}")
