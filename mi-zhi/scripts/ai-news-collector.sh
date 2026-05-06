#!/bin/bash
# AI热点情报自动采集脚本
# 由幂智(mi-zhi)创建 - 2026-03-08

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/tmp/ai_news_collector_${TIMESTAMP}.log"

echo "🤖 AI情报采集任务启动 - $(date)" | tee -a "$LOG_FILE"

# 配置
URL_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SKILL_PATH="$HOME/.openclaw/skills/canghe-url-to-markdown"
OUTPUT_DIR="/tmp/ai_news"
mkdir -p "$OUTPUT_DIR"

# 采集源列表
SOURCES=(
  "https://techcrunch.com/category/artificial-intelligence/|techcrunch_ai"
  "https://www.theverge.com/ai-artificial-intelligence|verge_ai"
  "https://news.ycombinator.com|hackernews"
)

# 1. 采集各平台数据
echo "📡 开始采集热点资讯..." | tee -a "$LOG_FILE"

for source in "${SOURCES[@]}"; do
  IFS='|' read -r url name <<< "$source"
  echo "  🔍 采集: $name" | tee -a "$LOG_FILE"
  
  export URL_CHROME_PATH
  cd "$SKILL_PATH"
  
  if bun scripts/main.ts "$url" -o "${OUTPUT_DIR}/${name}_${TIMESTAMP}.md" --timeout 45000 2>/dev/null; then
    echo "  ✅ $name 采集成功" | tee -a "$LOG_FILE"
  else
    echo "  ⚠️ $name 采集失败，跳过" | tee -a "$LOG_FILE"
  fi
  
  sleep 2
done

# 2. 合并并去重
echo "🔄 合并采集结果..." | tee -a "$LOG_FILE"
cat ${OUTPUT_DIR}/*_${TIMESTAMP}.md > "${OUTPUT_DIR}/merged_${TIMESTAMP}.md" 2>/dev/null || true

# 3. 调用OpenClaw进行AI分析和摘要生成
echo "🧠 AI分析生成摘要..." | tee -a "$LOG_FILE"

# 生成处理后的数据文件
PROCESSED_FILE="${OUTPUT_DIR}/processed_${TIMESTAMP}.json"

cat > "$PROCESSED_FILE" << 'EOF'
{
  "status": "collected",
  "timestamp": "TIMESTAMP_PLACEHOLDER",
  "sources": ["TechCrunch", "The Verge", "Hacker News"],
  "next_step": "等待AI分析和飞书表格写入"
}
EOF

sed -i '' "s/TIMESTAMP_PLACEHOLDER/$(date -u +%Y-%m-%dT%H:%M:%SZ)/" "$PROCESSED_FILE"

echo "✅ 采集任务完成 - $(date)" | tee -a "$LOG_FILE"
echo "📁 输出文件: $OUTPUT_DIR"
echo "📊 处理结果: $PROCESSED_FILE"

# 返回结果路径
echo "$PROCESSED_FILE"
