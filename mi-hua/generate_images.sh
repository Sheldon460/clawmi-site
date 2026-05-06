#!/bin/bash
set -e

WORKSPACE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-hua"
cd "$WORKSPACE"

# 封面图
echo "Generating cover image..."
gemini "Generate an image: A tech-style comparison banner for OpenClaw vs DeerFlow article. Split screen design: left side shows OpenClaw represented by a red lobster holding a toolbox, in a one-on-one chat interface with speech bubbles, blue tech aesthetic; right side shows DeerFlow represented by an elegant deer overseeing a factory assembly line with multiple AI agents working in parallel. Modern, clean, high-tech blue gradient background, professional infographic style." --model gemini-2.0-flash-exp-image-generation > 00_cover.txt 2>&1

# 正文图1 - OpenClaw
echo "Generating OpenClaw image..."
gemini "Generate an image: OpenClaw usage scenario illustration. A person sitting at a desk having a one-on-one conversation with an AI assistant. The AI is represented by a friendly red lobster character with a toolbox. Chat bubbles floating between them showing dialogue. Single-threaded, focused interaction. Clean modern tech style, blue color scheme, minimalist design, professional illustration for tech article." --model gemini-2.0-flash-exp-image-generation > 01_openclaw.txt 2>&1

# 正文图2 - DeerFlow
echo "Generating DeerFlow image..."
gemini "Generate an image: DeerFlow multi-agent workflow illustration. An elegant deer as the orchestrator overseeing a modern factory assembly line. Multiple AI agent icons as robot workers performing different tasks in parallel on conveyor belts. Visual representation of parallel processing and collaboration. Blue tech aesthetic, factory automation theme, professional infographic style, clean modern design." --model gemini-2.0-flash-exp-image-generation > 02_deerflow.txt 2>&1

# 正文图3 - 对比图表
echo "Generating comparison chart..."
gemini "Generate an image: Efficiency comparison chart infographic. Data visualization showing time efficiency comparison between OpenClaw and DeerFlow. Bar chart or side-by-side comparison showing DeerFlow completing tasks faster with parallel processing. Blue tech color scheme, modern flat design, clean typography, professional data visualization style for tech article. Include time metrics and percentage improvements." --model gemini-2.0-flash-exp-image-generation > 03_comparison.txt 2>&1

# 正文图4 - 决策建议
echo "Generating conclusion image..."
gemini "Generate an image: Decision recommendation infographic. Three distinct sections with icons representing different user types. Section 1: Recommended to Switch - icon of a power user with multiple screens. Section 2: Wait and See - icon of a casual observer. Section 3: Do not Switch Yet - icon of a satisfied current user. Blue tech aesthetic, clean modern infographic style, clear visual hierarchy, professional design for tech article conclusion." --model gemini-2.0-flash-exp-image-generation > 04_conclusion.txt 2>&1

echo "All prompts sent!"
