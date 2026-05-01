#!/usr/bin/env python3
import requests
import time
import os

HF_API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"

def generate_image(prompt, filename):
    """使用 Hugging Face API 生成图片"""
    
    headers = {
        "Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxx",  # 匿名访问
        "Content-Type": "application/json"
    }
    
    payload = {
        "inputs": prompt
    }
    
    try:
        print(f"  Sending request to Hugging Face...")
        response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=120)
        
        if response.status_code == 200:
            filepath = f"/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua/{filename}"
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            size = len(response.content)
            print(f"  ✓ SUCCESS: {filepath} ({size} bytes)")
            return True
        else:
            print(f"  ✗ HTTP {response.status_code}: {response.text[:200]}")
            return False
            
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

images = [
    ("00_cover.png", "A tech-style comparison banner for OpenClaw vs DeerFlow article. Split screen design: left side shows OpenClaw represented by a red lobster holding a toolbox, in a one-on-one chat interface with speech bubbles, blue tech aesthetic; right side shows DeerFlow represented by an elegant deer overseeing a factory assembly line with multiple AI agents working in parallel. Modern, clean, high-tech blue gradient background, professional infographic style."),
    ("01_openclaw.png", "OpenClaw usage scenario illustration. A person sitting at a desk having a one-on-one conversation with an AI assistant. The AI is represented by a friendly red lobster character with a toolbox. Chat bubbles floating between them showing dialogue. Single-threaded, focused interaction. Clean modern tech style, blue color scheme, minimalist design, professional illustration for tech article."),
    ("02_deerflow.png", "DeerFlow multi-agent workflow illustration. An elegant deer as the orchestrator overseeing a modern factory assembly line. Multiple AI agent icons as robot workers performing different tasks in parallel on conveyor belts. Visual representation of parallel processing and collaboration. Blue tech aesthetic, factory automation theme, professional infographic style, clean modern design."),
    ("03_comparison.png", "Efficiency comparison chart infographic. Data visualization showing time efficiency comparison between OpenClaw and DeerFlow. Bar chart or side-by-side comparison showing DeerFlow completing tasks faster with parallel processing. Blue tech color scheme, modern flat design, clean typography, professional data visualization style for tech article. Include time metrics and percentage improvements."),
    ("04_conclusion.png", "Decision recommendation infographic. Three distinct sections with icons representing different user types. Section 1: Recommended to Switch - icon of a power user with multiple screens. Section 2: Wait and See - icon of a casual observer. Section 3: Do not Switch Yet - icon of a satisfied current user. Blue tech aesthetic, clean modern infographic style, clear visual hierarchy, professional design for tech article conclusion.")
]

print("Generating images with Hugging Face...\n")
results = []
for filename, prompt in images:
    print(f"{'='*60}")
    print(f"Generating: {filename}")
    print(f"{'='*60}")
    success = generate_image(prompt, filename)
    results.append((filename, success))
    time.sleep(5)

print(f"\n{'='*60}")
print("SUMMARY")
print(f"{'='*60}")
for filename, success in results:
    status = "✓" if success else "✗"
    print(f"{status} {filename}")
