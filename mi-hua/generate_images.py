#!/usr/bin/env python3
"""
飞书CLI文章配图生成脚本
使用火山引擎豆包图片生成API
"""

import requests
import json
import os
import base64
from pathlib import Path

# API配置
API_KEY = "f263b245-b4be-4c0d-b46d-834366e28d36"
BASE_URL = "https://ark.cn-beijing.volces.com/api/v3"

# 输出目录
OUTPUT_DIR = Path("/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua/images")
OUTPUT_DIR.mkdir(exist_ok=True)

# 图片生成配置
IMAGES = [
    {
        "filename": "00_cover.png",
        "prompt": "A modern tech-style banner image for Feishu CLI tool. Dark blue gradient background with subtle grid pattern. Center shows a futuristic terminal window with glowing blue code lines. AI neural network visualization on the right side. Feishu brand blue and white color scheme. Clean minimalist design. Text '飞书CLI' and 'AI自动化' in modern Chinese font at the bottom left. Professional SaaS product aesthetic. Wide banner format 900x383.",
        "size": "1280x720"
    },
    {
        "filename": "01_questionnaire.png",
        "prompt": "A clean flowchart style diagram showing questionnaire generation process. Left to right flow: user input icon -> AI processing gear -> questionnaire form output. Light blue and white color scheme. Modern flat design. Icons: speech bubble, robot brain, checklist. Connected by arrows. Feishu brand blue accent. Clean professional tech illustration style.",
        "size": "1024x1024"
    },
    {
        "filename": "02_workflow.png",
        "prompt": "An automation workflow diagram showing connected nodes. Multiple circular nodes connected by flowing lines representing: Trigger -> Condition -> Action -> Notification. Modern tech style with blue gradient nodes and glowing connection lines. Feishu brand colors (blue/white). Clean background. Professional automation tool aesthetic. Flowchart with 4-5 connected steps.",
        "size": "1024x1024"
    },
    {
        "filename": "03_install.png",
        "prompt": "A stylized terminal screenshot showing npm install command. Dark terminal background with green and blue text. Command: 'npm install -g @larksuite/cli'. Modern code editor aesthetic with syntax highlighting. Clean minimal design. Tech/developer style. Shows successful installation with checkmark icons.",
        "size": "1024x1024"
    },
    {
        "filename": "04_result.png",
        "prompt": "A success notification interface showing automation completion. Modern toast notification design with green checkmark. Text showing '自动化执行成功' (Automation completed successfully). Clean dashboard style with stats: execution time, tasks completed. Feishu brand blue and white colors. Professional SaaS UI aesthetic. Light background with subtle shadows.",
        "size": "1024x1024"
    }
]

def generate_image(prompt, size="1024x1024", model="doubao-seedream-4-0-250828"):
    """使用火山引擎API生成图片"""
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    # 解析尺寸
    width, height = map(int, size.split('x'))
    
    payload = {
        "model": model,
        "prompt": prompt,
        "width": width,
        "height": height,
        "seed": 42
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/images/generations",
            headers=headers,
            json=payload,
            timeout=120
        )
        
        if response.status_code == 200:
            result = response.json()
            if "data" in result and len(result["data"]) > 0:
                image_data = result["data"][0]
                if "b64_json" in image_data:
                    return base64.b64decode(image_data["b64_json"])
                elif "url" in image_data:
                    # 下载图片
                    img_response = requests.get(image_data["url"], timeout=60)
                    return img_response.content
        else:
            print(f"API Error: {response.status_code}")
            print(f"Response: {response.text}")
            return None
            
    except Exception as e:
        print(f"Error generating image: {e}")
        return None
    
    return None

def main():
    """主函数：生成所有图片"""
    print("=" * 60)
    print("飞书CLI文章配图生成")
    print("=" * 60)
    
    generated_files = []
    
    for img_config in IMAGES:
        filename = img_config["filename"]
        prompt = img_config["prompt"]
        size = img_config.get("size", "1024x1024")
        
        print(f"\n生成: {filename}")
        print(f"尺寸: {size}")
        print(f"提示词: {prompt[:100]}...")
        
        # 生成图片
        image_data = generate_image(prompt, size)
        
        if image_data:
            output_path = OUTPUT_DIR / filename
            with open(output_path, "wb") as f:
                f.write(image_data)
            print(f"✓ 已保存: {output_path}")
            generated_files.append(str(output_path))
        else:
            print(f"✗ 生成失败: {filename}")
    
    print("\n" + "=" * 60)
    print("生成完成!")
    print("=" * 60)
    print("\n生成的文件:")
    for f in generated_files:
        print(f"  - {f}")
    
    return generated_files

if __name__ == "__main__":
    main()
