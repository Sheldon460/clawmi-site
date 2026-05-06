#!/bin/bash
# AI 资讯日报自动采集脚本
# 每天 7:30 执行，采集微信公众号、Twitter、小红书、抖音的 AI 资讯

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TIMESTAMP=$(date +%Y%m%d)
OUTPUT_DIR="/tmp/ai_daily_report"
mkdir -p "$OUTPUT_DIR"

echo "🤖 AI 资讯日报采集任务启动 - $(date)" | tee -a "$OUTPUT_DIR/collect.log"

# 1. 采集微信公众号 AI 文章
echo "📰 采集微信公众号..." | tee -a "$OUTPUT_DIR/collect.log"
agent-reach watch --source=wechat --query="AI 人工智能" --limit=10 --output="$OUTPUT_DIR/wechat_${TIMESTAMP}.md" 2>&1 | tee -a "$OUTPUT_DIR/collect.log"

# 2. 采集 Twitter/X AI 资讯
echo "🐦 采集 Twitter/X..." | tee -a "$OUTPUT_DIR/collect.log"
agent-reach watch --source=twitter --query="AI artificial intelligence" --limit=10 --output="$OUTPUT_DIR/twitter_${TIMESTAMP}.md" 2>&1 | tee -a "$OUTPUT_DIR/collect.log"

# 3. 采集小红书 AI 内容
echo "📕 采集小红书..." | tee -a "$OUTPUT_DIR/collect.log"
agent-reach watch --source=xiaohongshu --query="AI 人工智能" --limit=10 --output="$OUTPUT_DIR/xiaohongshu_${TIMESTAMP}.md" 2>&1 | tee -a "$OUTPUT_DIR/collect.log"

# 4. 采集抖音 AI 视频
echo "🎵 采集抖音..." | tee -a "$OUTPUT_DIR/collect.log"
agent-reach watch --source=douyin --query="AI 人工智能" --limit=10 --output="$OUTPUT_DIR/douyin_${TIMESTAMP}.md" 2>&1 | tee -a "$OUTPUT_DIR/collect.log"

# 5. 合并采集结果
echo "🔄 合并采集结果..." | tee -a "$OUTPUT_DIR/collect.log"
cat "$OUTPUT_DIR"/*_${TIMESTAMP}.md > "$OUTPUT_DIR/merged_${TIMESTAMP}.md" 2>/dev/null || true

# 6. 生成日报摘要
echo "📊 生成日报摘要..." | tee -a "$OUTPUT_DIR/collect.log"
REPORT_FILE="$OUTPUT_DIR/ai_daily_report_${TIMESTAMP}.md"

cat > "$REPORT_FILE" << 'EOF'
# 🌟 AI 资讯日报

**日期**: TIMESTAMP_PLACEHOLDER

---

## 📰 微信公众号精选

EOF

sed -i '' "s/TIMESTAMP_PLACEHOLDER/$(date +%Y-%m-%d)/" "$REPORT_FILE"

# 添加各平台采集内容到日报
echo "## 🐦 Twitter/X 热点" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
cat "$OUTPUT_DIR/twitter_${TIMESTAMP}.md" >> "$REPORT_FILE" 2>/dev/null || echo "暂无数据" >> "$REPORT_FILE"

echo "" >> "$REPORT_FILE"
echo "## 📕 小红书精选" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
cat "$OUTPUT_DIR/xiaohongshu_${TIMESTAMP}.md" >> "$REPORT_FILE" 2>/dev/null || echo "暂无数据" >> "$REPORT_FILE"

echo "" >> "$REPORT_FILE"
echo "## 🎵 抖音热门" >> "$REPORT_FILE"
echo "" >> "$REPORT_FILE"
cat "$OUTPUT_DIR/douyin_${TIMESTAMP}.md" >> "$REPORT_FILE" 2>/dev/null || echo "暂无数据" >> "$REPORT_FILE"

echo "✅ 日报生成完成 - $(date)" | tee -a "$OUTPUT_DIR/collect.log"
echo "📁 报告文件：$REPORT_FILE"

# 7. 调用 OpenClaw 写入飞书表格
echo "📝 写入飞书多维表格..." | tee -a "$OUTPUT_DIR/collect.log"
openclaw sessions_send --label "mi-zhi" --message "采集完成，请处理日报数据：$REPORT_FILE" 2>&1 | tee -a "$OUTPUT_DIR/collect.log"

echo "✅ 采集任务完成 - $(date)" | tee -a "$OUTPUT_DIR/collect.log"
