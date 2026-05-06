#!/bin/bash
# AI 资讯每日采集完整任务 - agent-reach 集成版
# 由 OpenClaw Cron 调用
# 版本: 3.0

set -e

echo "🚀 [mi-zhi] 启动每日 AI 资讯采集任务"
echo "======================================"
echo "时间: $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 步骤 1: 执行 agent-reach 采集脚本
echo "📡 步骤 1/4: 执行多平台采集..."
bash "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-zhi/scripts/agent-reach-collector.sh" || echo "⚠️ 部分平台采集失败，继续处理..."

# 步骤 2: 等待数据采集完成
sleep 2

# 步骤 3: 生成执行报告
echo ""
echo "📊 步骤 2/4: 生成采集报告..."
OUTPUT_DIR="/tmp/ai_news"
DATE=$(date +%Y%m%d)

if [ -f "$OUTPUT_DIR/report_$DATE.md" ]; then
    echo "✅ 采集报告已生成"
    cat "$OUTPUT_DIR/report_$DATE.md"
else
    echo "⚠️ 报告文件未找到"
fi

# 步骤 4: 通知 mi-zhi 进行后续处理
echo ""
echo "📋 步骤 3/4: 准备数据写入飞书表格..."
echo "请 mi-zhi 执行以下操作:"
echo "1. 读取 /tmp/ai_news/ 目录下的 JSON 文件"
echo "2. 提取 TOP10 热点资讯"
echo "3. 自动分类并写入飞书多维表格"
echo "4. 发送执行报告到飞书"

echo ""
echo "======================================"
echo "✅ 采集阶段完成，等待数据处理..."
echo "输出目录: /tmp/ai_news/"
echo ""

# 列出采集到的文件
echo "📁 采集文件列表:"
ls -la "$OUTPUT_DIR/" | grep "$DATE" || echo "暂无今日数据文件"
