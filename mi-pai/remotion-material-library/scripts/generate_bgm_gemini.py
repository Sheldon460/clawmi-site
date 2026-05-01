#!/usr/bin/env python3
"""
使用 Google GenAI API 生成背景音乐
需要: pip install google-genai
"""
import os
import sys
from google import genai
from google.genai import types

def generate_bgm():
    """生成科技感 BGM"""
    
    # 从环境变量获取 API key
    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        print("Error: GOOGLE_API_KEY not set")
        print("Please set it with: export GOOGLE_API_KEY=your_key")
        sys.exit(1)
    
    client = genai.Client(api_key=api_key)
    
    output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio/bgm.mp3"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # 科技感 BGM 提示词
    prompt = """
    Create a modern tech-inspired background music track.
    
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
    
    The music should evoke feelings of innovation, efficiency, and modern workflow automation.
    Think: futuristic office, AI assistance, streamlined productivity.
    """
    
    print("Generating BGM with Google GenAI...")
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
        sys.exit(1)

if __name__ == "__main__":
    generate_bgm()
