import os

# Suppress warning
os.environ['PYTORCH_ENABLE_MPS_FALLBACK'] = '1'

import requests
import json
import time

API_KEY = os.environ.get("DASHSCOPE_API_KEY")
if not API_KEY:
    print("DASHSCOPE_API_KEY not found")
    exit(1)

url = "https://dashscope.aliyuncs.com/compatible-mode/v1/images/generations"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

payload = {
    "model": "flux-schnell",
    "prompt": "Modern editorial illustration with satirical tone: An exhausted student sitting at a desk buried under mountains of tutoring materials, textbooks, and exam papers.",
    "size": "1024x1024",
    "n": 1
}

print("Generating image with DashScope...")
try:
    response = requests.post(url, headers=headers, json=payload, timeout=60)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text[:500]}")
    
    if response.status_code == 200:
        result = response.json()
        if "data" in result and len(result.get("data", [])) > 0:
            img_url = result["data"][0].get("url")
            print(f"\nSuccess! Image URL: {img_url}")
            
            # Download
            img_response = requests.get(img_url, timeout=60)
            if img_response.status_code == 200:
                output_dir = r"/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-配图库/2026-04-02-鸡娃/"
                os.makedirs(output_dir, exist_ok=True)
                filename = f"cover-education-arms-race_{int(time.time())}.png"
                save_path = os.path.join(output_dir, filename)
                
                with open(save_path, "wb") as f:
                    f.write(img_response.content)
                
                print(f"Saved to: {save_path}")
                print(f"Size: {os.path.getsize(save_path) / 1024:.1f} KB")
            else:
                print(f"Download failed: {img_response.status_code}")
    else:
        print(f"Failed: {response.text}")
except Exception as e:
    print(f"Error: {str(e)}")
