#!/usr/bin/env python3
"""
Generate a single image using Doubao API.
"""

import requests
import sys
import json
import os
from datetime import datetime

# Doubao API Configuration
DOUBAO_API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
DOUBAO_API_KEY = "f263b245-b4be-4c0d-b46d-834366e28d36"

def generate_image(prompt: str, output_path: str = None, size: str = "1280x720"):
    """
    Generate an image using Doubao API.

    Args:
        prompt: Image description prompt
        output_path: Where to save the image (optional)
        size: Image size (default: 1280x720)
    """
    print(f"Generating image with prompt: {prompt[:100]}...")

    # Prepare request payload
    payload = {
        "model": "doubao-pro-32k",
        "messages": [
            {
                "role": "user",
                "content": f"生成一张图片：{prompt}"
            }
        ],
        "stream": False
    }

    # Prepare headers
    headers = {
        "Authorization": f"Bearer {DOUBAO_API_KEY}",
        "Content-Type": "application/json",
        "Accept": "application/json"
    }

    try:
        print(f"Calling Doubao API at {DOUBAO_API_URL}...")
        response = requests.post(DOUBAO_API_URL, json=payload, headers=headers, timeout=60)

        print(f"Response status: {response.status_code}")

        if response.status_code == 200:
            result = response.json()
            print(f"Response keys: {result.keys()}")

            # Try to find image URL in response
            if "choices" in result and len(result["choices"]) > 0:
                content = result["choices"][0].get("message", {}).get("content", "")
                print(f"Content length: {len(content)}")
                print(f"Content preview: {content[:500]}")

                # Save result to JSON for inspection
                with open(f"/tmp/doubao_response_{datetime.now().strftime('%H%M%S')}.json", "w") as f:
                    json.dump(result, f, indent=2, ensure_ascii=False)
                print(f"Full response saved to /tmp/doubao_response_*.json")

                return True
            else:
                print(f"No choices in response")
                print(f"Response: {json.dumps(result, indent=2, ensure_ascii=False)[:1000]}")
                return False
        else:
            print(f"HTTP API Error: {response.status_code}")
            print(f"Response: {response.text[:500]}")
            return False

    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python generate_doubao_image.py '<prompt>'")
        sys.exit(1)

    prompt = sys.argv[1]
    generate_image(prompt)
