#!/usr/bin/env python3
import subprocess
import os
import json

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

output_dir = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua"
results = []

for img in images:
    print(f"\n{'='*60}")
    print(f"Generating: {img['filename']}")
    print(f"{'='*60}")
    
    # 使用 node 直接调用 image_generate
    js_code = f'''
const {{ image_generate }} = require('/usr/local/lib/node_modules/openclaw/dist/tools/image-generate');

async function main() {{
    try {{
        const result = await image_generate({{
            prompt: "{img['prompt']}",
            filename: "{img['filename']}",
            size: "{img['size']}"
        }});
        console.log(JSON.stringify(result));
    }} catch (e) {{
        console.error("Error:", e.message);
        process.exit(1);
    }}
}}

main();
'''
    
    try:
        result = subprocess.run(
            ['node', '-e', js_code],
            capture_output=True,
            text=True,
            timeout=120,
            cwd=output_dir
        )
        
        print(f"Return code: {result.returncode}")
        if result.stdout:
            print(f"stdout: {result.stdout[:500]}")
        if result.stderr:
            print(f"stderr: {result.stderr[:500]}")
        
        # 检查文件是否生成
        filepath = os.path.join(output_dir, img['filename'])
        if os.path.exists(filepath):
            size = os.path.getsize(filepath)
            print(f"✓ SUCCESS: {filepath} ({size} bytes)")
            results.append({"filename": img['filename'], "status": "success", "path": filepath})
        else:
            print(f"✗ FAILED: File not found - {filepath}")
            results.append({"filename": img['filename'], "status": "failed"})
            
    except Exception as e:
        print(f"✗ ERROR: {e}")
        results.append({"filename": img['filename'], "status": "error", "error": str(e)})

print(f"\n{'='*60}")
print("SUMMARY")
print(f"{'='*60}")
for r in results:
    status_icon = "✓" if r['status'] == 'success' else "✗"
    print(f"{status_icon} {r['filename']}: {r['status']}")
