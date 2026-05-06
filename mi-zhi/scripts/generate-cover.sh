#!/bin/bash
# AI情报系统封面图生成脚本
# 需要配置以下环境变量之一：
# - OPENAI_API_KEY (推荐)
# - GOOGLE_API_KEY
# - DASHSCOPE_API_KEY (阿里云通义万象)
# - CANGHE_API_KEY

SKILL_DIR="$HOME/.openclaw/skills/canghe-image-gen"
OUTPUT_DIR="/tmp/ai_news_covers"
mkdir -p "$OUTPUT_DIR"

# 封面图提示词模板
COVER_PROMPT="AI科技新闻情报系统封面，赛博朋克风格，深蓝色调，数据流和神经网络元素，科技感十足，现代简约设计，16:9横版封面图，高质量渲染"

# 生成封面图
generate_cover() {
  local output_file="$OUTPUT_DIR/cover_$(date +%Y%m%d).png"
  
  echo "🎨 正在生成AI情报封面图..."
  
  cd "$SKILL_DIR" || exit 1
  
  # 尝试使用可用的API生成
  npx -y bun scripts/main.ts \
    --prompt "$COVER_PROMPT" \
    --image "$output_file" \
    --ar 16:9 \
    --quality 2k \
    2>&1
  
  if [ -f "$output_file" ]; then
    echo "✅ 封面图生成成功: $output_file"
    echo "$output_file"
  else
    echo "⚠️ 封面图生成失败，请检查API配置"
    echo ""
    echo "需要配置以下环境变量之一:"
    echo "  export OPENAI_API_KEY='your-key'"
    echo "  export GOOGLE_API_KEY='your-key'"
    echo "  export DASHSCOPE_API_KEY='your-key'"
    echo "  export CANGHE_API_KEY='your-key'"
    return 1
  fi
}

# 生成新闻配图
generate_news_image() {
  local title="$1"
  local output_file="$OUTPUT_DIR/news_$(date +%Y%m%d_%H%M%S).png"
  
  local prompt="科技新闻配图: $title，扁平化设计风格，蓝色科技色调，简约现代，适合新闻展示"
  
  cd "$SKILL_DIR" || exit 1
  
  npx -y bun scripts/main.ts \
    --prompt "$prompt" \
    --image "$output_file" \
    --ar 16:9 \
    --quality normal \
    2>&1
  
  if [ -f "$output_file" ]; then
    echo "$output_file"
  fi
}

# 主函数
case "$1" in
  cover)
    generate_cover
    ;;
  news)
    generate_news_image "$2"
    ;;
  *)
    echo "用法: $0 {cover|news '标题'}"
    echo ""
    echo "示例:"
    echo "  $0 cover              # 生成周报封面"
    echo "  $0 news 'GPT-5发布'   # 生成新闻配图"
    ;;
esac
