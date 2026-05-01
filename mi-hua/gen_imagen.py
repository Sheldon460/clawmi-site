#!/usr/bin/env python3
"""
使用 Google Imagen API 生成图片
"""
import os
import requests
import json
import time

# 从环境变量获取 API key
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', '')

if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY not set")
    exit(1)

API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp-image-generation:generateContent"

def generate_image(prompt, filename):
    """使用 Imagen API 生成图片"""
    
    headers = {
        "Content-Type": "application/json"
    }
    
    payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"]
        }
    }
    
    url = f"{API_URL}?key={GEMINI_API_KEY}"
    
    try:
        print(f"  Sending request to Imagen API...")
        response = requests.post(url, headers=headers, json=payload, timeout=120)
        
        if response.status_code == 200:
            result = response.json()
            
            # 检查是否有图片数据
            candidates = result.get('candidates', [])
            if candidates:
                content = candidates[0].get('content', {})
                parts = content.get('parts', [])
                
                for part in parts:
                    if 'inlineData' in part:
                        image_data = part['inlineData'].get('data', '')
                        if image_data:
                            import base64
                            image_bytes = base64.b64decode(image_data)
                            
                            filepath = f"/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua/{filename}"
                            with open(filepath, 'wb') as f:
                                f.write(image_bytes)
                            
                            size = len(image_bytes)
                            print(f"  ✓ SUCCESS: Saved {filepath} ({size} bytes)")
                            return True
            
            print(f"  ✗ No image data found in response")
            print(f"  Response: {json.dumps(result, indent=2)[:500]}")
            return False
        else:
            print(f"  ✗ Error: HTTP {response.status_code}")
            print(f"  Response: {response.text[:500]}")
            return False
            
    except Exception as e:
        print(f"  ✗ Exception: {e}")
        return False

# 定义图片生成任务
images = [
    {
        "filename": "00_cover.png",
        "prompt": "A tech-style comparison banner for OpenClaw vs DeerFlow article. Split screen design: left side shows OpenClaw represented by a red lobster holding a toolbox, in a one-on-one chat interface with speech bubbles, blue tech aesthetic; right side shows DeerFlow represented by an elegant deer overseeing a factory assembly line with multiple AI agents working in parallel. Modern, clean, high-tech blue gradient background, professional infographic style."
    },
    {
        "filename": "01_openclaw.png",
        "prompt": "OpenClaw usage scenario illustration. A person sitting at a desk having a one-on-one conversation with an AI assistant. The AI is represented by a friendly red lobster character with a toolbox. Chat bubbles floating between them showing dialogue. Single-threaded, focused interaction. Clean modern tech style, blue color scheme, minimalist design, professional illustration for tech article."
    },
    {
        "filename": "02_deerflow.png",
        "prompt": "DeerFlow multi-agent workflow illustration. An elegant deer as the orchestrator overseeing a modern factory assembly line. Multiple AI agent icons as robot workers performing different tasks in parallel on conveyor belts. Visual representation of parallel processing and collaboration. Blue tech aesthetic, factory automation theme, professional infographic style, clean modern design."
    },
    {
        "filename": "03_comparison.png",
        "prompt": "Efficiency comparison chart infographic. Data visualization showing time efficiency comparison between OpenClaw and DeerFlow. Bar chart or side-by-side comparison showing DeerFlow completing tasks faster with parallel processing. Blue tech color scheme, modern flat design, clean typography, professional data visualization style for tech article. Include time metrics and percentage improvements."
    },
    {
        "filename": "04_conclusion.png",
        "prompt": "Decision recommendation infographic. Three distinct sections with icons representing different user types. Section 1: Recommended to Switch - icon of a power user with multiple screens. Section 2: Wait and See - icon of a casual observer. Section 3: Do not Switch Yet - icon of a satisfied current user. Blue tech aesthetic, clean modern infographic style, clear visual hierarchy, professional design for tech article conclusion."
    }
]

print(f"GEMINI_API_KEY: {'Set (' + str(len(GEMINI_API_KEY)) + ' chars)' if GEMINI_API_KEY else 'Not set'}")
print(f"\nGenerating {len(images)} images...\n")

results = []
for img in images:
    print(f"{'='*60}")
    print(f"Generating: {img['filename']}")
    print(f"{'='*60}")
    success = generate_image(img['prompt'], img['filename'])
    results.append({"filename": img['filename'], "success": success})
    time.sleep(2)  # Rate limiting

print(f"\n{'='*60}")
print("SUMMARY")
print(f"{'='*60}")
for r in results:
    status = "✓ SUCCESS" if r['success'] else "✗ FAILED"
    print(f"{status}: {r['filename']}")

print("\nDone!")
