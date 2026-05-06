#!/usr/bin/env python3
"""
使用 Google Cloud Lyria API 生成背景音乐
"""
import os
import sys
import time
from google.cloud import aiplatform
from google.auth import default as google_auth_default

def generate_bgm():
    """使用 Lyria 生成科技感 BGM"""
    
    # 初始化 Vertex AI
    aiplatform.init(
        project="fluted-protocol-480308-p8",
        location="us-central1"
    )
    
    output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio/bgm.mp3"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 提示词
    prompt = """Create a modern tech-inspired background music track.

Style: Electronic ambient with subtle synth arpeggios
Mood: Professional, inspiring, forward-thinking, calm
Tempo: 120 BPM
Duration: 120 seconds

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
    
    print("Generating BGM with Google Lyria...")
    print("This may take 1-2 minutes...")
    
    try:
        # 使用 Lyria 模型
        # 注意：Lyria 需要通过 Vertex AI 的预测端点调用
        model = aiplatform.Model("lyria")
        
        # 生成音乐
        response = model.predict(
            prompt=prompt,
            duration=120,
            format="mp3"
        )
        
        # 保存音频
        audio_data = response.predictions[0]
        with open(output_path, 'wb') as f:
            f.write(audio_data)
        
        print(f"✅ BGM saved to: {output_path}")
        print(f"Size: {len(audio_data)} bytes")
        
    except Exception as e:
        print(f"❌ Error generating BGM: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    generate_bgm()
