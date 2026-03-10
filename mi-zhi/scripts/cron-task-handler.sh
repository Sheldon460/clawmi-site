#!/bin/bash
# AI热点情报完整自动化流程
# 由Cron触发执行

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/tmp/ai_news_cron_${TIMESTAMP}.log"

echo "🚀 AI热点情报自动化任务" | tee -a "$LOG_FILE"
echo "⏰ $(date)" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# 配置
WORK_DIR="/Volumes/My house/Users/Sheldon/clawd/mi-army/mi-zhi"
OUTPUT_DIR="/tmp/ai_news_output"
mkdir -p "$OUTPUT_DIR"

# 飞书配置
APP_TOKEN="EVxlb7yTHaw9GjsyPgncypMTnec"
TABLE_ID="tbl6yIyjpyZfTHzK"
CHAT_ID="oc_c93565ccf1bb48d5a5478b3f7ff3ec28"

# 1. 采集热点
echo "📡 正在采集AI热点..." | tee -a "$LOG_FILE"

# TechCrunch
export URL_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
cd "$HOME/.openclaw/skills/canghe-url-to-markdown"
bun scripts/main.ts "https://techcrunch.com/category/artificial-intelligence/" -o "$OUTPUT_DIR/techcrunch.md" --timeout 45000 2>/dev/null || true

# The Verge
bun scripts/main.ts "https://www.theverge.com/ai-artificial-intelligence" -o "$OUTPUT_DIR/verge.md" --timeout 45000 2>/dev/null || true

echo "✅ 采集完成" | tee -a "$LOG_FILE"
echo "" | tee -a "$LOG_FILE"

# 2. 生成摘要报告
echo "📝 生成摘要报告..." | tee -a "$LOG_FILE"

# 合并内容
cat $OUTPUT_DIR/*.md > "$OUTPUT_DIR/merged.md" 2>/dev/null || echo "无内容" > "$OUTPUT_DIR/merged.md"

# 生成今日报告
REPORT_FILE="$OUTPUT_DIR/report_${TIMESTAMP}.txt"
cat > "$REPORT_FILE" << EOF
🔥 AI热点情报 - $(date +%Y年%m月%d日)

📊 今日采集来源:
- TechCrunch AI板块
- The Verge AI频道

⏰ 自动化状态: 运行正常
🤖 执行Agent: mi-zhi (幂智)

📁 详细数据已同步至飞书多维表格:
https://my.feishu.cn/base/EVxlb7yTHaw9GjsyPgncypMTnec

---
本消息由OpenClaw自动推送
EOF

echo "✅ 报告生成: $REPORT_FILE" | tee -a "$LOG_FILE"

# 输出报告路径
echo "$REPORT_FILE"
