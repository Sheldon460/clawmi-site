#!/usr/bin/env python3
"""
使用 MCP 协议调用 Lyria 生成背景音乐
"""
import subprocess
import json
import os
import sys

def generate_bgm():
    """通过 MCP 协议调用 Lyria"""

    output_dir = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio"
    os.makedirs(output_dir, exist_ok=True)

    # 提示词
    prompt = """Create a modern tech-inspired background music track for a productivity tutorial video.

Style: Electronic ambient with subtle synth arpeggios
Mood: Professional, inspiring, forward-thinking, calm
Tempo: 120 BPM

Characteristics:
- Clean, minimal electronic sound
- Gentle pulsing bass
- Atmospheric pads
- Subtle digital textures
- No drums or percussion (ambient focus)
- Suitable for technology/productivity content
- Seamless loopable
- Non-distracting background music

The music should evoke feelings of innovation, efficiency, and modern workflow automation."""

    # MCP 请求
    request = {
        "jsonrpc": "2.0",
        "id": 1,
        "method": "tools/call",
        "params": {
            "name": "lyria_generate_music",
            "arguments": {
                "prompt": prompt,
                "local_path": output_dir,
                "file_name": "bgm_lyria.wav",
                "negative_prompt": "drums, percussion, vocals, lyrics, loud, aggressive, distracting, noise"
            }
        }
    }

    print("Generating BGM with Lyria MCP...")
    print("This may take 1-2 minutes...")

    env = os.environ.copy()
    env.update({
        "PROJECT_ID": "fluted-protocol-480308-p8",
        "GENMEDIA_BUCKET": "bucket-0713",
        "LOCATION": "us-central1"
    })

    try:
        # 启动 MCP 服务并发送请求
        process = subprocess.Popen(
            ["mcp-lyria-go"],
            stdin=subprocess.PIPE,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            env=env,
            text=True
        )

        # 发送请求
        request_str = json.dumps(request)
        stdout, stderr = process.communicate(input=request_str, timeout=180)

        print("Response received!")

        # 解析响应
        for line in stdout.strip().split('\n'):
            if line.startswith('{'):
                response = json.loads(line)
                if 'result' in response:
                    content = response['result'].get('content', [])
                    for item in content:
                        if item.get('type') == 'text':
                            print(f"Result: {item.get('text')}")

        # 检查文件是否生成
        expected_file = os.path.join(output_dir, "bgm_lyria.wav")
        if os.path.exists(expected_file):
            print(f"✅ BGM saved to: {expected_file}")
            print(f"Size: {os.path.getsize(expected_file)} bytes")
        else:
            print("⚠️ File not generated, checking MCP output...")
            print(f"Stdout: {stdout[:500]}")
            print(f"Stderr: {stderr[:500]}")

    except subprocess.TimeoutExpired:
        process.kill()
        print("❌ Timeout waiting for Lyria response")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    generate_bgm()