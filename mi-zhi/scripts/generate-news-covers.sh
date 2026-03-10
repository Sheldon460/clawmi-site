#!/bin/bash
# AI热点新闻封面图批量生成脚本
# 为每条新闻自动生成配图

set -e

SKILL_DIR="$HOME/.openclaw/skills/canghe-image-gen"
OUTPUT_DIR="/tmp/ai_news_covers"
mkdir -p "$OUTPUT_DIR"

# 检查API配置
check_api() {
  if [ -n "$OPENAI_API_KEY" ]; then
    echo "openai"
  elif [ -n "$GOOGLE_API_KEY" ]; then
    echo "google"
  elif [ -n "$DASHSCOPE_API_KEY" ]; then
    echo "dashscope"
  elif [ -n "$CANGHE_API_KEY" ]; then
    echo "canghe"
  else
    echo "none"
  fi
}

# 生成单条新闻封面
generate_news_cover() {
  local title="$1"
  local category="$2"
  local output_file="$3"
  
  local provider=$(check_api)
  
  if [ "$provider" = "none" ]; then
    echo "❌ 未配置API密钥，无法生成封面"
    echo "请配置以下环境变量之一:"
    echo "  export OPENAI_API_KEY='your-key'"
    echo "  export GOOGLE_API_KEY='your-key'"
    echo "  export DASHSCOPE_API_KEY='your-key'"
    return 1
  fi
  
  # 根据分类调整风格
  local style=""
  case "$category" in
    *"产品发布"*) style="科技感，蓝色调，未来主义，产品展示风格" ;;
    *"争议监管"*) style="警示感，红色调，严肃新闻风格，权威感" ;;
    *"企业动态"*) style="商务感，专业蓝色，企业新闻风格" ;;
    *"技术突破"*) style="创新感，紫色调，技术感，代码元素" ;;
    *"投融资"*) style="金融感，金色调，数据图表元素" ;;
    *"数据洞察"*) style="分析感，绿色调，数据可视化风格" ;;
    *) style="科技感，蓝色调，现代简约" ;;
  esac
  
  local prompt="科技新闻配图：$title，$style，16:9横版，高质量渲染，适合新闻展示"
  
  echo "🎨 生成封面: $title"
  cd "$SKILL_DIR"
  
  npx -y bun scripts/main.ts \
    --prompt "$prompt" \
    --image "$output_file" \
    --ar 16:9 \
    --quality normal \
    --provider "$provider" \
    2>&1
  
  if [ -f "$output_file" ]; then
    echo "✅ 生成成功: $output_file"
    return 0
  else
    echo "❌ 生成失败"
    return 1
  fi
}

# 批量生成所有新闻封面
batch_generate() {
  echo "🚀 批量生成新闻封面..."
  echo ""
  
  # 新闻列表（标题|分类|输出文件名）
  declare -a news_list=(
    "OpenAI机器人负责人辞职|⚔️ 争议监管|cover_1.png"
    "Claude发现Firefox漏洞|⚡ 技术突破|cover_2.png"
    "谷歌CEO获6.92亿薪酬包|💼 企业动态|cover_3.png"
    "ChatGPT成人模式推迟|🚀 产品发布|cover_4.png"
    "Grammarly AI专家审核争议|⚔️ 争议监管|cover_5.png"
  )
  
  local success_count=0
  local failed_count=0
  
  for news in "${news_list[@]}"; do
    IFS='|' read -r title category filename <<< "$news"
    if generate_news_cover "$title" "$category" "$OUTPUT_DIR/$filename"; then
      ((success_count++))
    else
      ((failed_count++))
    fi
    sleep 2  # 避免API限流
  done
  
  echo ""
  echo "📊 生成统计:"
  echo "  ✅ 成功: $success_count"
  echo "  ❌ 失败: $failed_count"
  echo ""
  echo "📁 输出目录: $OUTPUT_DIR"
}

# 上传封面到飞书多维表格
upload_to_bitable() {
  echo "📤 上传封面到飞书多维表格..."
  echo "提示: 需要使用feishu_bitable_app_table_record.update接口"
  echo "将生成的图片上传到附件字段'封面图'"
}

# 主函数
case "$1" in
  single)
    if [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
      echo "用法: $0 single '标题' '分类' '输出路径'"
      exit 1
    fi
    generate_news_cover "$2" "$3" "$4"
    ;;
  batch)
    batch_generate
    ;;
  upload)
    upload_to_bitable
    ;;
  *)
    echo "AI热点新闻封面图生成工具"
    echo ""
    echo "用法:"
    echo "  $0 single '标题' '分类' '输出路径'  # 生成单张封面"
    echo "  $0 batch                              # 批量生成所有封面"
    echo "  $0 upload                             # 上传到飞书表格"
    echo ""
    echo "环境变量配置:"
    echo "  export OPENAI_API_KEY='your-key'      # OpenAI (推荐)"
    echo "  export GOOGLE_API_KEY='your-key'      # Google Gemini"
    echo "  export DASHSCOPE_API_KEY='your-key'   # 阿里云通义万象"
    echo "  export CANGHE_API_KEY='your-key'      # Canghe API"
    ;;
esac
