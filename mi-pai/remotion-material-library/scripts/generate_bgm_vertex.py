#!/usr/bin/env python3
"""
使用 Google Cloud Vertex AI Lyria 直接生成背景音乐
"""
import os
import sys
from google.cloud import aiplatform
from google.protobuf import json_format
from google.protobuf.struct_pb2 import Value
import base64

def generate_bgm():
    """使用 Lyria 生成科技感 BGM"""

    # 初始化 Vertex AI
    aiplatform.init(
        project="fluted-protocol-480308-p8",
        location="us-central1"
    )

    output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio/bgm_lyria.wav"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

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

    negative_prompt = "drums, percussion, vocals, lyrics, loud, aggressive, distracting, noise"

    print("Generating BGM with Google Lyria...")
    print("This may take 1-2 minutes...")

    try:
        # 使用 Model Garden 的 Lyria 模型
        model = aiplatform.Model("lyria-002")

        # 准备预测请求
        instances = [
            {
                "prompt": prompt,
                "negative_prompt": negative_prompt,
            }
        ]

        # 发送预测请求
        response = model.predict(instances=instances)

        # 获取音频数据
        if response.predictions:
            audio_data = response.predictions[0]
            if isinstance(audio_data, str):
                # Base64 编码
                audio_data = base64.b64decode(audio_data)

            # 保存
            with open(output_path, 'wb') as f:
                f.write(audio_data)

            print(f"✅ BGM saved to: {output_path}")
            print(f"Size: {len(audio_data)} bytes")
        else:
            print("❌ No audio generated")
            sys.exit(1)

    except Exception as e:
        print(f"❌ Error generating BGM: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    generate_bgm()