#!/usr/bin/env python3
import requests
import json
import os
import time

# 尝试通过 OpenClaw gateway API 生成图片
GATEWAY_URL = os.environ.get('OPENCLAW_GATEWAY_URL', 'http://localhost:3000')

def generate_image(prompt, filename, size="1024x1024"):
    """通过 API 生成图片"""
    url = f"{GATEWAY_URL}/api/v1/tools/image_generate"
    
    payload = {
        "prompt": prompt,
        "filename": filename,
        "size": size
    }
    
    try:
        response = requests.post(url, json=payload, timeout=120)
        if response.status_code == 200:
            result = response.json()
            print(f"  Success: {result}")
            return result
        else:
            print(f"  Error: HTTP {response.status_code} - {response.text}")
            return None
    except Exception as e:
        print(f"  Error: {e}")
        return None

# 定义图片生成任务
images = [
    {
        "filename": "00_cover.png",
        "prompt": "A tech-style comparison banner for OpenClaw vs DeerFlow article. Split screen design: left side shows OpenClaw represented by a red lobster holding a toolbox, in a one-on-one chat interface with speech bubbles, blue tech aesthetic; right side shows DeerFlow represented by an elegant deer overseeing a factory assembly line with multiple AI agents working in parallel. Modern, clean, high-tech blue gradient background, professional infographic style.",
        "size": "1792x1024"
    },
    {
        "filename": "01_openclaw.png",
        "prompt": "OpenClaw usage scenario illustration. A person sitting at a desk having a one-on-one conversation with an AI assistant. The AI is represented by a friendly red lobster character with a toolbox. Chat bubbles floating between them showing dialogue. Single-threaded, focused interaction. Clean modern tech style, blue color scheme, minimalist design, professional illustration for tech article.",
        "size": "1024x1024"
    },
    {
        "filename": "02_deerflow.png",
        "prompt": "DeerFlow multi-agent workflow illustration. An elegant deer as the orchestrator overseeing a modern factory assembly line. Multiple AI agent icons as robot workers performing different tasks in parallel on conveyor belts. Visual representation of parallel processing and collaboration. Blue tech aesthetic, factory automation theme, professional infographic style, clean modern design.",
        "size": "1024x1024"
    },
    {
        "filename": "03_comparison.png",
        "prompt": "Efficiency comparison chart infographic. Data visualization showing time efficiency comparison between OpenClaw and DeerFlow. Bar chart or side-by-side comparison showing DeerFlow completing tasks faster with parallel processing. Blue tech color scheme, modern flat design, clean typography, professional data visualization style for tech article. Include time metrics and percentage improvements.",
        "size": "1024x1024"
    },
    {
        "filename": "04_conclusion.png",
        "prompt": "Decision recommendation infographic. Three distinct sections with icons representing different user types. Section 1: Recommended to Switch - icon of a power user with multiple screens. Section 2: Wait and See - icon of a casual observer. Section 3: Do not Switch Yet - icon of a satisfied current user. Blue tech aesthetic, clean modern infographic style, clear visual hierarchy, professional design for tech article conclusion.",
        "size": "1024x1024"
    }
]

print(f"Using gateway: {GATEWAY_URL}")

for img in images:
    print(f"\nGenerating {img['filename']}...")
    generate_image(img['prompt'], img['filename'], img['size'])
    time.sleep(1)

print("\nDone!")
