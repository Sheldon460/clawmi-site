#!/usr/bin/env python3
"""
Batch generate PPT images using Doubao Image Generation API.
"""

import requests
import json
import os
import time
from datetime import datetime

# Doubao Image Generation API Configuration
DOUBAO_IMAGE_API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations"
DOUBAO_API_KEY = "f263b245-b4be-4c0d-b46d-834366e28d36"

# Slide content prompts
SLIDE_PROMPTS = [
    {
        "num": 1,
        "prompt": "OpenClaw - 企业级 AI 助手平台。封面设计,大标题'OpenClaw 云端部署与培养指南',副标题'从零到一构建企业级 AI 助手平台'。极简现代风格,玻璃拟态卡片,霓虹紫和电光蓝渐变,科技感强烈,Apple Keynote 设计风格"
    },
    {
        "num": 2,
        "prompt": "目录页设计,展示7个章节:1.OpenClaw简介 2.部署准备 3.三种部署方式 4.配置与初始化 5.技能培养 6.常见问题 7.企业级方案。玻璃拟态卡片列表,青色和霓虹紫渐变,简洁现代排版"
    },
    {
        "num": 3,
        "prompt": "OpenClaw核心价值可视化。展示4个核心价值图标:灵活部署、模型自由、技能扩展、企业级。玻璃拟态卡片网格布局,电光蓝和珊瑚橙渐变,SaaS产品图标风格"
    },
    {
        "num": 4,
        "prompt": "环境要求检查清单。展示3个类别:系统支持、软件依赖、网络要求。玻璃拟态卡片,霓虹紫和青色渐变,现代UI设计,带勾选标记"
    },
    {
        "num": 5,
        "prompt": "本地一键安装示意图。展示终端界面,命令行高亮,一键安装流程可视化。玻璃拟态代码窗口,电光蓝和霓虹紫渐变,开发者友好设计,终端美学"
    },
    {
        "num": 6,
        "prompt": "Docker容器化部署架构图。展示Docker Compose配置、端口映射、卷挂载概念。玻璃拟态技术图示,珊瑚橙和电光蓝渐变,DevOps可视化风格,容器图标"
    },
    {
        "num": 7,
        "prompt": "云服务器部署流程图。展示:购买云服务器→配置安全组→安装Docker→Docker Compose部署→配置域名SSL。玻璃拟态流程图,青色和霓虹紫渐变,云平台图标,AWS/阿里云风格"
    },
    {
        "num": 8,
        "prompt": "配置文件结构可视化。展示配置文件树:config.yaml、.env、workspace/目录结构。玻璃拟态文件树,电光蓝和珊瑚橙渐变,开发者工具风格,文件夹和文件图标"
    },
    {
        "num": 9,
        "prompt": "技能生态系统图示。展示3层技能:基础技能、进阶技能、自定义技能。玻璃拟态金字塔结构,霓虹紫和青色色渐变,技能卡片,学习路径箭头"
    },
    {
        "num": 10,
        "prompt": "故障排查流程图。展示3个常见问题:安装失败、模型超时、Docker无响应,每个问题带解决方案。玻璃拟态问题解决卡片,电光蓝和珊瑚橙渐变,故障排除图标,警告与修复标识"
    },
    {
        "num": 11,
        "prompt": "最佳实践四大领域:性能优化、安全加固、监控维护、团队协作。玻璃拟态四象限图,青色和霓虹紫渐变,每个象限展示关键词,现代化仪表盘风格"
    },
    {
        "num": 12,
        "prompt": "企业级架构设计图。展示:Gateway→Load Balancer→Cluster Nodes,连接Redis Cache和Database。玻璃拟态网络拓扑图,电光蓝和珊瑚橙渐变,分布式系统图标,高可用架构可视化"
    },
    {
        "num": 13,
        "prompt": "社区资源导航图。展示4大资源:官方资源、学习资源、技术支持、参与贡献。玻璃拟态资源地图,霓虹紫和青色渐变,社交平台图标,社区连接视觉化"
    },
    {
        "num": 14,
        "prompt": "总结与学习路径图。展示核心要点、快速开始、进阶路径、保持更新。玻璃拟态学习路线图,电光蓝和珊瑚橙渐变,进度条,里程碑标记"
    },
    {
        "num": 15,
        "prompt": "感谢页面设计。大标题'感谢观看',品牌名称'OpenClaw',副标题'企业级AI助手框架',展示官网、文档、社区链接。玻璃拟态卡片,霓虹紫和电光蓝渐变,极简品牌风格,社交媒体图标,Thank You设计"
    }
]

def generate_image(prompt: str, output_path: str):
    """
    Generate an image using Doubao Image Generation API.

    Args:
        prompt: Image description prompt
        output_path: Where to save the image

    Returns:
        bool: True if successful, False otherwise
    """
    print(f"\n{'='*80}")
    print(f"Generating image {output_path}")
    print(f"Prompt: {prompt[:100]}...")
    print(f"{'='*80}")

    # Prepare request payload for image generation
    payload = {
        "model": "doubao-seedream-4-0-250828",
        "prompt": prompt,
        "image_size": "1024x576",
        "request_id": f"slide_{datetime.now().strftime('%Y%m%d%H%M%S')}"
    }

    # Prepare headers
    headers = {
        "Authorization": f"Bearer {DOUBAO_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        print("Calling Doubao Image Generation API...")
        response = requests.post(DOUBAO_IMAGE_API_URL, json=payload, headers=headers, timeout=120)

        print(f"Response status: {response.status_code}")

        if response.status_code == 200:
            result = response.json()
            print(f"Response keys: {result.keys()}")

            # Try to find image data in response
            if "data" in result and len(result["data"]) > 0:
                image_url = result["data"][0].get("url", "")

                if image_url:
                    print(f"Image URL: {image_url[:100]}...")

                    # Download the image
                    print(f"Downloading image to {output_path}...")
                    img_response = requests.get(image_url, timeout=60)

                    if img_response.status_code == 200:
                        with open(output_path, 'wb') as f:
                            f.write(img_response.content)
                        print(f"✅ Success! Image saved to {output_path}")
                        print(f"   Size: {len(img_response.content)} bytes")
                        return True
                    else:
                        print(f"❌ Failed to download image: {img_response.status_code}")
                        return False
                else:
                    print(f"❌ No image URL in response")
                    return False
            else:
                print(f"❌ No data in response")
                print(f"Response: {json.dumps(result, indent=2, ensure_ascii=False)[:1000]}")
                return False
        else:
            print(f"❌ HTTP API Error: {response.status_code}")
            print(f"Response: {response.text[:500]}")
            return False

    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

def main():
    """Main function to generate all slide images."""
    output_dir = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/xiao-mi/ppt_images"

    # Ensure output directory exists
    os.makedirs(output_dir, exist_ok=True)

    print(f"\n{'='*80}")
    print(f"Starting batch image generation for 15 slides")
    print(f"Output directory: {output_dir}")
    print(f"{'='*80}")

    success_count = 0
    failed_slides = []

    for slide in SLIDE_PROMPTS:
        slide_num = slide["num"]
        prompt = slide["prompt"]
        output_path = os.path.join(output_dir, f"slide-{slide_num:02d}.png")

        success = generate_image(prompt, output_path)

        if success:
            success_count += 1
        else:
            failed_slides.append(slide_num)

        # Add delay to avoid rate limiting
        if slide_num < 15:
            print("Waiting 2 seconds before next request...")
            time.sleep(2)

    # Summary
    print(f"\n{'='*80}")
    print(f"BATCH GENERATION COMPLETE")
    print(f"{'='*80}")
    print(f"✅ Successfully generated: {success_count}/15 images")
    print(f"❌ Failed: {len(failed_slides)} images")

    if failed_slides:
        print(f"\nFailed slide numbers: {', '.join(map(str, failed_slides))}")

    print(f"\nOutput directory: {output_dir}")

    # List generated files
    if os.path.exists(output_dir):
        files = sorted([f for f in os.listdir(output_dir) if f.startswith('slide-') and f.endswith('.png')])
        print(f"\nGenerated files ({len(files)}):")
        for f in files:
            print(f"  - {f}")

if __name__ == "__main__":
    main()
