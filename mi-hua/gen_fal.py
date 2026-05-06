#!/usr/bin/env python3
import os
import requests
import time

# 尝试从 openclaw 配置读取
import subprocess
result = subprocess.run(['openclaw', 'config', 'get', 'providers.fal.apiKey'], capture_output=True, text=True)
fal_key = result.stdout.strip() if result.returncode == 0 else ""

if not fal_key:
    print("Error: FAL_KEY not found in openclaw config")
    exit(1)

headers = {
    "Authorization": f"Key {fal_key}",
    "Content-Type": "application/json"
}

images_to_generate = [
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

for img in images_to_generate:
    print(f"Generating {img['filename']}...")
    try:
        # Submit request
        response = requests.post(
            "https://queue.fal.run/fal-ai/flux/dev",
            headers=headers,
            json={
                "prompt": img['prompt'],
                "image_size": "landscape_4_3"
            }
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"  Request ID: {result.get('request_id', 'N/A')}")
            
            # Poll for result
            status_url = f"https://queue.fal.run/fal-ai/flux/dev/requests/{result['request_id']}"
            for i in range(30):  # Max 30 retries
                time.sleep(2)
                status_resp = requests.get(status_url, headers=headers)
                if status_resp.status_code == 200:
                    status_data = status_resp.json()
                    if status_data.get('status') == 'COMPLETED':
                        image_url = status_data.get('images', [{}])[0].get('url')
                        if image_url:
                            img_data = requests.get(image_url).content
                            filepath = f"/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua/{img['filename']}"
                            with open(filepath, 'wb') as f:
                                f.write(img_data)
                            print(f"  Saved: {filepath}")
                        break
                    elif status_data.get('status') == 'FAILED':
                        print(f"  Failed: {status_data.get('error', 'Unknown error')}")
                        break
            else:
                print("  Timeout waiting for result")
        else:
            print(f"  Error: HTTP {response.status_code} - {response.text}")
    except Exception as e:
        print(f"  Error: {e}")

print("Done!")
