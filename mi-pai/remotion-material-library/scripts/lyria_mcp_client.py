#!/usr/bin/env python3
"""
完整的 MCP 客户端，支持初始化握手和工具调用
"""
import subprocess
import json
import os
import sys

def send_message(process, message):
    """发送 JSON-RPC 消息"""
    msg_str = json.dumps(message)
    process.stdin.write(msg_str + "\n")
    process.stdin.flush()

def read_message(process):
    """读取 JSON-RPC 响应"""
    line = process.stdout.readline()
    if not line:
        return None
    try:
        return json.loads(line.strip())
    except json.JSONDecodeError:
        return None

def generate_bgm():
    """使用 Lyria MCP 生成 BGM"""

    output_dir = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio"
    os.makedirs(output_dir, exist_ok=True)

    # 环境变量
    env = os.environ.copy()
    env.update({
        "PROJECT_ID": "fluted-protocol-480308-p8",
        "GENMEDIA_BUCKET": "bucket-0713",
        "LOCATION": "us-central1",
        "MCP_SERVER_REQUEST_TIMEOUT": "55000"
    })

    # 启动 MCP 服务
    print("启动 Lyria MCP 服务...")
    process = subprocess.Popen(
        ["mcp-lyria-go"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        env=env,
        text=True,
        bufsize=1
    )

    try:
        # 1. 发送初始化请求
        print("发送初始化请求...")
        init_request = {
            "jsonrpc": "2.0",
            "id": 1,
            "method": "initialize",
            "params": {
                "protocolVersion": "2024-11-05",
                "capabilities": {},
                "clientInfo": {
                    "name": "bgm-generator",
                    "version": "1.0.0"
                }
            }
        }
        send_message(process, init_request)

        # 读取初始化响应
        response = read_message(process)
        if response:
            print(f"初始化响应: {response}")

        # 2. 发送已初始化通知
        print("发送已初始化通知...")
        initialized_notification = {
            "jsonrpc": "2.0",
            "method": "notifications/initialized"
        }
        send_message(process, initialized_notification)

        # 3. 列出可用工具
        print("列出可用工具...")
        list_tools_request = {
            "jsonrpc": "2.0",
            "id": 2,
            "method": "tools/list"
        }
        send_message(process, list_tools_request)

        response = read_message(process)
        if response:
            print(f"工具列表: {json.dumps(response, indent=2)}")

        # 4. 调用 Lyria 生成音乐
        print("调用 Lyria 生成音乐...")
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

        generate_request = {
            "jsonrpc": "2.0",
            "id": 3,
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
        send_message(process, generate_request)

        # 读取生成响应
        print("等待生成结果...")
        response = read_message(process)
        if response:
            print(f"生成响应: {json.dumps(response, indent=2)}")

            # 检查结果
            if 'result' in response:
                content = response['result'].get('content', [])
                for item in content:
                    if item.get('type') == 'text':
                        print(f"结果: {item.get('text')}")

        # 关闭进程
        process.stdin.close()
        process.wait(timeout=5)

        # 检查文件是否生成
        expected_file = os.path.join(output_dir, "bgm_lyria.wav")
        if os.path.exists(expected_file):
            print(f"✅ BGM 生成成功!")
            print(f"文件: {expected_file}")
            print(f"大小: {os.path.getsize(expected_file)} bytes")
            return True
        else:
            print("⚠️ 文件未生成")
            return False

    except Exception as e:
        print(f"❌ 错误: {e}")
        import traceback
        traceback.print_exc()
        process.kill()
        return False

if __name__ == "__main__":
    success = generate_bgm()
    sys.exit(0 if success else 1)