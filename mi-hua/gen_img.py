#!/usr/bin/env python3
import os
import base64
from google import genai
from google.genai import types

# 设置 API key
api_key = os.environ.get('GOOGLE_API_KEY')
if not api_key:
    print("Error: GOOGLE_API_KEY not set")
    exit(1)

client = genai.Client(api_key=api_key)

images_to_generate = [
    {
        "filename": "00_cover.png",
        "prompt": "A tech-style comparison banner for OpenClaw vs DeerFlow article. Split screen design: left side shows OpenClaw represented by a red lobster holding a toolbox, in a one-on-one chat interface with speech bubbles, blue tech aesthetic; right side shows DeerFlow represented by an elegant deer overseeing a factory assembly line with multiple AI agents working in parallel. Modern, clean, high-tech blue gradient background, professional infographic style."
    },
    {
        "filename": "01_openclaw.png",
        "prompt": "OpenClaw usage scenario illustration. A person sitting at a desk having a one-on-one conversation with an AI assistant. The AI is represented by a friendly red lobster character with a toolbox. Chat bubbles floating between them showing dialogue. Single-threaded, focused interaction. Clean modern tech style, blue color scheme, minimalist design, professional illustration for tech article."
    },
    {
        "filename": "02_deerflow.png",
        "prompt": "DeerFlow multi-agent workflow illustration. An elegant deer as the orchestrator overseeing a modern factory assembly line. Multiple AI agent icons as robot workers performing different tasks in parallel on conveyor belts. Visual representation of parallel processing and collaboration. Blue tech aesthetic, factory automation theme, professional infographic style, clean modern design."
    },
    {
        "filename": "03_comparison.png",
        "prompt": "Efficiency comparison chart infographic. Data visualization showing time efficiency comparison between OpenClaw and DeerFlow. Bar chart or side-by-side comparison showing DeerFlow completing tasks faster with parallel processing. Blue tech color scheme, modern flat design, clean typography, professional data visualization style for tech article. Include time metrics and percentage improvements."
    },
    {
        "filename": "04_conclusion.png",
        "prompt": "Decision recommendation infographic. Three distinct sections with icons representing different user types. Section 1: Recommended to Switch - icon of a power user with multiple screens. Section 2: Wait and See - icon of a casual observer. Section 3: Do not Switch Yet - icon of a satisfied current user. Blue tech aesthetic, clean modern infographic style, clear visual hierarchy, professional design for tech article conclusion."
    }
]

for img in images_to_generate:
    print(f"Generating {img['filename']}...")
    try:
        response = client.models.generate_content(
            model="gemini-2.0-flash-exp-image-generation",
            contents=img['prompt'],
            config=types.GenerateContentConfig(response_modalities=["Text", "Image"])
        )
        
        for part in response.candidates[0].content.parts:
            if part.inline_data is not None:
                image_data = part.inline_data.data
                filepath = f"/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua/{img['filename']}"
                with open(filepath, "wb") as f:
                    f.write(image_data)
                print(f"  Saved: {filepath}")
                break
    except Exception as e:
        print(f"  Error: {e}")

print("Done!")
