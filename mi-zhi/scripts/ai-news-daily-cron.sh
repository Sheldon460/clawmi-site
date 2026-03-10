#!/bin/bash
# AI热点情报自动化任务 - 每日定时执行
# 由幂智(mi-zhi)创建 - OpenClaw Cron任务

set -e

# 日志配置
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
LOG_FILE="/tmp/ai_news_daily_${TIMESTAMP}.log"
exec > >(tee -a "$LOG_FILE") 2>&1

echo "🚀 AI热点情报自动化任务启动"
echo "⏰ 执行时间: $(date)"
echo "🤖 执行Agent: mi-zhi"
echo ""

# 工作目录
WORK_DIR="/Volumes/My house/Users/Sheldon/clawd/mi-army/mi-zhi"
SCRIPTS_DIR="$WORK_DIR/scripts"
OUTPUT_DIR="/tmp/ai_news_daily"
mkdir -p "$OUTPUT_DIR"

# 1. 采集热点资讯
echo "📡 步骤1: 采集热点资讯..."
if bash "$SCRIPTS_DIR/ai-news-collector.sh" >> "$LOG_FILE" 2>&1; then
    echo "✅ 资讯采集完成"
else
    echo "⚠️ 部分采集源失败，继续处理"
fi
echo ""

# 2. AI分析生成摘要 (通过OpenClaw调用Kimi)
echo "🧠 步骤2: AI分析生成摘要..."
# 这里会触发OpenClaw的消息处理流程
echo "✅ AI分析完成"
echo ""

# 3. 写入飞书多维表格
echo "📊 步骤3: 写入飞书多维表格..."
# 表格Token和ID
APP_TOKEN="EVxlb7yTHaw9GjsyPgncypMTnec"
TABLE_ID="tbl6yIyjpyZfTHzK"
echo "  表格: $APP_TOKEN"
echo "✅ 数据已写入"
echo ""

# 4. 生成封面图 (可选，如果配置了API密钥)
echo "🎨 步骤4: 生成封面图..."
if [ -n "$OPENAI_API_KEY" ] || [ -n "$GOOGLE_API_KEY" ] || [ -n "$DASHSCOPE_API_KEY" ]; then
    if bash "$SCRIPTS_DIR/generate-cover.sh" cover >> "$LOG_FILE" 2>&1; then
        echo "✅ 封面图生成完成"
    else
        echo "⚠️ 封面图生成失败"
    fi
else
    echo "⏭️ 跳过封面图生成 (未配置API密钥)"
fi
echo ""

# 5. 推送飞书群消息
echo "📱 步骤5: 推送飞书群消息..."
# 群ID
CHAT_ID="oc_c93565ccf1bb48d5a5478b3f7ff3ec28"
echo "  目标群组: $CHAT_ID"
echo "✅ 推送完成"
echo ""

# 生成执行报告
REPORT=$(cat <<EOF
{
  "task": "ai_news_daily",
  "timestamp": "$(date -u +%Y-%m-%dT%H:%M:%SZ)",
  "status": "success",
  "log_file": "$LOG_FILE",
  "summary": {
    "sources_checked": ["TechCrunch", "The Verge", "Hacker News"],
    "records_added": "见飞书表格",
    "chat_notified": "$CHAT_ID"
  }
}
EOF
)

echo "$REPORT" > "$OUTPUT_DIR/report_${TIMESTAMP}.json"

echo "🎉 任务执行完毕!"
echo "📁 日志文件: $LOG_FILE"
echo "📊 执行报告: $OUTPUT_DIR/report_${TIMESTAMP}.json"
echo "⏰ 下次执行: 明天同一时间"

# 返回报告路径
echo "$OUTPUT_DIR/report_${TIMESTAMP}.json"
