#!/usr/bin/env python3
"""
使用 Google Cloud 认证生成背景音乐
使用 GCP ADC (Application Default Credentials)
"""
import os
import sys
from google import genai
from google.genai import types
from google.auth import default as google_auth_default

def generate_bgm():
    """生成科技感 BGM"""
    
    # 获取 GCP 认证
    try:
        credentials, project_id = google_auth_default()
        print(f"Using GCP project: {project_id}")
    except Exception as e:
        print(f"Error getting GCP credentials: {e}")
        sys.exit(1)
    
    # 使用 ADC 认证创建客户端
    client = genai.Client(
        vertexai=True,
        project="fluted-protocol-480308-p8",
        location="us-central1",
        credentials=credentials
    )
    
    output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio/bgm.mp3"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 科技感 BGM 提示词
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
    
    print("Generating BGM with Google GenAI (Vertex AI)...")
    print("This may take 30-60 seconds...")
    
    try:
        # 使用 Gemini 2.0 Flash 的音频生成功能
        response = client.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=prompt,
            config=types.GenerateContentConfig(
                response_modalities=['AUDIO']
            )
        )
        
        # 保存音频
        for part in response.candidates[0].content.parts:
            if part.inline_data:
                with open(output_path, 'wb') as f:
                    f.write(part.inline_data.data)
                print(f"✅ BGM saved to: {output_path}")
                print(f"Size: {len(part.inline_data.data)} bytes")
                return
                
        print("❌ Error: No audio data received")
        sys.exit(1)
        
    except Exception as e:
        print(f"❌ Error generating BGM: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

if __name__ == "__main__":
    generate_bgm()
