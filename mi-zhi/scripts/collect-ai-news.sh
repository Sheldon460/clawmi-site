#!/bin/bash
# AI 资讯采集 - Cron 脚本
# 添加到 crontab: crontab -e
# 添加此行：30 7 * * * /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-zhi/scripts/collect-ai-news.sh

# 设置环境变量
export PATH="/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin"
export HOME="/Users/Sheldon"
export NODE_PATH="/usr/local/lib/node_modules"

# 工作目录
WORKSPACE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-zhi"

# 日志文件
LOG_FILE="$WORKSPACE/logs/ai-news-collect.log"
ERR_FILE="$WORKSPACE/logs/ai-news-collect.err"

# 创建日志目录
mkdir -p "$WORKSPACE/logs"

# 记录开始时间
echo "=== AI 资讯采集任务开始：$(date) ===" >> "$LOG_FILE"

# 执行采集脚本
cd "$WORKSPACE"
/usr/local/bin/node "$WORKSPACE/scripts/collect-ai-news.js" >> "$LOG_FILE" 2>> "$ERR_FILE"

# 记录结束时间
echo "=== AI 资讯采集任务结束：$(date) ===" >> "$LOG_FILE"
