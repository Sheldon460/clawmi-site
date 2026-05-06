#!/usr/bin/env python3
"""
Minimax TTS 配音生成脚本
使用 sheldon009 音色生成高质量中文配音

用法:
    python scripts/generate_voiceover_minimax.py
"""

import requests
import json
import os
from pathlib import Path

# Minimax API 配置
API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJHcm91cE5hbWUiOiJTaGVsZG9uIiwiVXNlck5hbWUiOiJTaGVsZG9uIiwiQWNjb3VudCI6InNoZWxkb25Ac3BhY2VzLmZ1biIsIlN1YmplY3RJRCI6IjE5MDQ3NDI4ODYzNjUyMTY4NjIiLCJQaG9uZSI6Ik1UTTBNVEF4TnpnNU1qZz0iLCJHcm91cElEIjoiMTkwNDc0Mjg4NjM2NTIxNjg2MiIsIlBhZ2VOYW1lIjoiIiwiTWFpbCI6InNoZWxkb25Ac3BhY2VzLmZ1biIsIkNyZWF0ZVRpbWUiOiIyMDI1LTA3LTEzIDE1OjI5OjE3IiwiaXNzIjoibWluaW1heCJ9.XYlT4n5f4q0w3K6qX4F_3d2E1v0B9z8A7y6C5x4W3e2R1t0Y9u8I7o6P5a4S3d2F1g0H9j8K7l6Z5x4V3c2B1n0M9m8L7k6J5h4G3f2D1s0A9q8w7E6r5T4y3U2i1O6p7L8k9J0h1G2f3D4s5A6q7w8E9r0T1y2U3i4O5p6"  # 请替换为实际的 API Key
GROUP_ID = "1904742886365216862"

# 配音脚本
SCRIPTS = {
    "scene-01": "终极揭秘：如何用 OpenClaw 搭建爆款素材库，实现选题自由。我是 Sheldon，今天是我们 7 天分享的最后一天。",
    "scene-02": "为什么你总是选题荒？大多数人的选题是刷朋友圈、刷小红书时随手存的，这叫碎片化堆积。真正需要的是流动的淡水库，能源源不断吸纳新信息，又能自动过滤死水。",
    "scene-03": "我的爆款素材库闭环流程有四步。第一步，全网监控。配置监控虾盯着 20 个头部账号，新内容自动抓取。第二步，热度初筛。AI 判断选题是否符合我的定位，不符合直接过滤。第三步，自动预处理。AI 拆解爆款文章的核心逻辑、情绪钩子、金句提炼，甚至预演我会怎么写。第四步，同步存档。处理完的内容自动同步到飞书多维表格或 Obsidian，按标签分类。",
    "scene-04": "用了这套系统，我的工作状态彻底变了。以前我是找选题，现在我是挑选题。每天早上打开素材库，十几条预处理好的新鲜选题等着我。",
    "scene-05": "创作的本质，不是从零到一的虚空创造，而是从一到一百的整合优化。自动化素材库帮你完成了最枯燥的零到一，你只需要注入灵魂和风格。",
}

OUTPUT_DIR = Path(__file__).parent.parent / "public" / "audio"


def generate_voiceover(scene_key: str, text: str, voice_id: str = "sheldon009") -> dict:
    """生成单条配音"""
    url = f"https://api.minimax.chat/v1/t2a_v2?GroupId={GROUP_ID}"
    
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "speech-01-turbo",
        "text": text,
        "voice_setting": {
            "voice_id": voice_id
        },
        "speed": 1.0,
        "vol": 1.0,
        "pitch": 0,
        "audio_setting": {
            "sample_rate": 32000,
            "bitrate": 128000,
            "format": "mp3"
        }
    }
    
    try:
        response = requests.post(url, headers=headers, json=payload, timeout=60)
        response.raise_for_status()
        data = response.json()
        
        if data.get("base_resp", {}).get("status_code") == 0:
            audio_hex = data.get("data", {}).get("audio")
            if audio_hex:
                # 保存音频文件
                output_path = OUTPUT_DIR / f"{scene_key}.mp3"
                audio_data = bytes.fromhex(audio_hex)
                with open(output_path, "wb") as f:
                    f.write(audio_data)
                
                duration = data.get("extra_info", {}).get("audio_length", 0) / 1000
                print(f"✅ {scene_key}: {duration:.1f}s - {output_path}")
                return {"success": True, "duration": duration, "path": str(output_path)}
        
        error_msg = data.get("base_resp", {}).get("status_msg", "Unknown error")
        print(f"❌ {scene_key}: {error_msg}")
        return {"success": False, "error": error_msg}
        
    except Exception as e:
        print(f"❌ {scene_key}: {str(e)}")
        return {"success": False, "error": str(e)}


def main():
    """批量生成所有配音"""
    print("🎙️ 开始生成 Minimax 配音 (sheldon009 音色)\n")
    
    # 确保输出目录存在
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    results = {}
    for scene_key, text in SCRIPTS.items():
        result = generate_voiceover(scene_key, text)
        results[scene_key] = result
        
        # 避免请求过快
        import time
        time.sleep(1)
    
    # 打印汇总
    print("\n📊 生成结果汇总:")
    total_duration = 0
    for scene_key, result in results.items():
        if result["success"]:
            print(f"  ✅ {scene_key}: {result['duration']:.1f}s")
            total_duration += result["duration"]
        else:
            print(f"  ❌ {scene_key}: {result.get('error', 'Failed')}")
    
    print(f"\n⏱️ 总时长: {total_duration:.1f}s")
    print(f"📁 输出目录: {OUTPUT_DIR}")
    
    # 生成时长配置（用于更新 config.ts）
    durations = {k: round(v["duration"], 1) for k, v in results.items() if v["success"]}
    if durations:
        config_path = OUTPUT_DIR.parent.parent / "scripts" / "audio-durations.json"
        with open(config_path, "w") as f:
            json.dump(durations, f, indent=2)
        print(f"\n💾 时长配置已保存: {config_path}")
        print("\n请更新 src/config.ts 中的 ESTIMATED_DURATIONS:")
        for k, v in durations.items():
            print(f'  "{k}": {v},')


if __name__ == "__main__":
    main()
