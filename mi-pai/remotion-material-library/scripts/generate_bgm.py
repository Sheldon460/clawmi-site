#!/usr/bin/env python3
"""
使用 Google GenAI (Lyria) 生成背景音乐
"""
import os
import sys
from google import genai
from google.genai import types

def generate_bgm(output_path: str, duration_seconds: int = 120):
    """生成科技感 BGM"""
    
    # 从环境变量获取 API key
    api_key = os.environ.get('GOOGLE_API_KEY')
    if not api_key:
        print("Error: GOOGLE_API_KEY not set")
        sys.exit(1)
    
    client = genai.Client(api_key=api_key)
    
    # 科技感 BGM 提示词
    prompt = f"""
    Create a modern tech-inspired background music track.
    
    Style: Electronic ambient with subtle synth arpeggios
    Mood: Professional, inspiring, forward-thinking
    Tempo: 120 BPM
    Duration: {duration_seconds} seconds
    
    Characteristics:
    - Clean, minimal electronic sound
    - Gentle pulsing bass
    - Atmospheric pads
    - Subtle digital textures
    - No drums or percussion (ambient focus)
    - Suitable for technology/productivity content
    - Seamless loopable
    
    The music should evoke feelings of innovation, efficiency, and modern workflow automation.
    """
    
    print(f"Generating BGM ({duration_seconds}s)...")
    
    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash-thinking-exp',
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
                print(f"BGM saved to: {output_path}")
                return
                
        print("Error: No audio data received")
        sys.exit(1)
        
    except Exception as e:
        print(f"Error generating BGM: {e}")
        sys.exit(1)

if __name__ == "__main__":
    output = sys.argv[1] if len(sys.argv) > 1 else "public/audio/bgm.mp3"
    duration = int(sys.argv[2]) if len(sys.argv) > 2 else 120
    generate_bgm(output, duration)
