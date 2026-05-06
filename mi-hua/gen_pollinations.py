#!/usr/bin/env python3
import requests
import time
import os

def generate_image(prompt, filename, width=1024, height=1024):
    """使用 Pollinations AI 生成图片"""
    
    # URL encode the prompt
    encoded_prompt = requests.utils.quote(prompt)
    
    # Pollinations AI 免费 API
    url = f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={width}&height={height}&nologo=true&seed=42&enhance=true"
    
    try:
        print(f"  Downloading from Pollinations AI...")
        response = requests.get(url, timeout=120)
        
        if response.status_code == 200:
            filepath = f"/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua/{filename}"
            with open(filepath, 'wb') as f:
                f.write(response.content)
            
            size = len(response.content)
            print(f"  ✓ SUCCESS: {filepath} ({size} bytes)")
            return True
        else:
            print(f"  ✗ HTTP {response.status_code}")
            return False
            
    except Exception as e:
        print(f"  ✗ Error: {e}")
        return False

images = [
    ("00_cover.png", "A tech-style comparison banner for OpenClaw vs DeerFlow article. Split screen design: left side shows OpenClaw represented by a red lobster holding a toolbox, in a one-on-one chat interface with speech bubbles, blue tech aesthetic; right side shows DeerFlow represented by an elegant deer overseeing a factory assembly line with multiple AI agents working in parallel. Modern, clean, high-tech blue gradient background, professional infographic style.", 1792, 1024),
    ("01_openclaw.png", "OpenClaw usage scenario illustration. A person sitting at a desk having a one-on-one conversation with an AI assistant. The AI is represented by a friendly red lobster character with a toolbox. Chat bubbles floating between them showing dialogue. Single-threaded, focused interaction. Clean modern tech style, blue color scheme, minimalist design, professional illustration for tech article.", 1024, 1024),
    ("02_deerflow.png", "DeerFlow multi-agent workflow illustration. An elegant deer as the orchestrator overseeing a modern factory assembly line. Multiple AI agent icons as robot workers performing different tasks in parallel on conveyor belts. Visual representation of parallel processing and collaboration. Blue tech aesthetic, factory automation theme, professional infographic style, clean modern design.", 1024, 1024),
    ("03_comparison.png", "Efficiency comparison chart infographic. Data visualization showing time efficiency comparison between OpenClaw and DeerFlow. Bar chart or side-by-side comparison showing DeerFlow completing tasks faster with parallel processing. Blue tech color scheme, modern flat design, clean typography, professional data visualization style for tech article. Include time metrics and percentage improvements.", 1024, 1024),
    ("04_conclusion.png", "Decision recommendation infographic. Three distinct sections with icons representing different user types. Section 1: Recommended to Switch - icon of a power user with multiple screens. Section 2: Wait and See - icon of a casual observer. Section 3: Do not Switch Yet - icon of a satisfied current user. Blue tech aesthetic, clean modern infographic style, clear visual hierarchy, professional design for tech article conclusion.", 1024, 1024)
]

print("Generating images with Pollinations AI...\n")
results = []
for filename, prompt, width, height in images:
    print(f"{'='*60}")
    print(f"Generating: {filename}")
    print(f"{'='*60}")
    success = generate_image(prompt, filename, width, height)
    results.append((filename, success))
    time.sleep(3)  # Rate limiting

print(f"\n{'='*60}")
print("SUMMARY")
print(f"{'='*60}")
for filename, success in results:
    status = "✓" if success else "✗"
    print(f"{status} {filename}")

# List generated files
print(f"\n{'='*60}")
print("Generated files:")
print(f"{'='*60}")
for filename, success in results:
    if success:
        filepath = f"/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua/{filename}"
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"  {filepath} ({size} bytes)")
