#!/bin/bash
# 竞品监控日报演示脚本

set -e

echo "🚀 开始执行竞品监控日报流程..."
echo "================================"

# 步骤 1: 抓取竞品动态 (Agent-Reach)
echo "📡 步骤 1: 抓取竞品动态..."
echo "搜索 Reddit r/openclaw..."

REDDIT_DATA=$(curl -s "https://www.reddit.com/r/openclaw/hot.json?limit=5" \
  -H "User-Agent: agent-reach/1.0" 2>/dev/null || echo '{"data": {"children": []}}')

# 提取标题和链接
echo "✅ 获取到 Reddit 数据"
echo "$REDDIT_DATA" | jq -r '.data.children[].data | "- \(.title) (👍 \(.ups))"' 2>/dev/null | head -5

# 步骤 2: 提取关键信息 (Summarize)
echo ""
echo "📝 步骤 2: 提取关键信息..."
echo "热门话题:"
echo "$REDDIT_DATA" | jq -r '.data.children[].data.title' 2>/dev/null | head -3 | while read title; do
  echo "  • $title"
done

# 步骤 3: 生成报告 (Markdown)
echo ""
echo "📊 步骤 3: 生成报告..."

REPORT_FILE="/tmp/competitor-report-$(date +%Y%m%d).md"

cat > "$REPORT_FILE" << EOF
# 📊 竞品监控日报 - $(date +%Y年%m月%d日)

## 🔥 今日热点

### Reddit r/openclaw

$(echo "$REDDIT_DATA" | jq -r '.data.children[].data | "#### \(.title)\n- 👍 点赞: \(.ups)\n- 💬 评论: \(.num_comments)\n- 🔗 https://reddit.com\(.permalink)\n"' 2>/dev/null | head -10)

## 📈 数据洞察

- 监测平台: Reddit
- 抓取时间: $(date)
- 热门帖子数: $(echo "$REDDIT_DATA" | jq '.data.children | length')

## 💡 建议行动

1. 关注用户反馈，及时响应社区讨论
2. 分析竞品动态，调整产品策略
3. 持续监控趋势变化

---
*自动生成 by 竞品监控日报系统*
EOF

echo "✅ 报告已生成: $REPORT_FILE"

# 步骤 4: 推送到飞书 (Feishu-Bot)
echo ""
echo "📤 步骤 4: 推送到飞书..."
echo "报告摘要:"
head -20 "$REPORT_FILE"

echo ""
echo "================================"
echo "✅ 竞品监控日报流程执行完成！"
echo ""
echo "📄 完整报告: $REPORT_FILE"
echo "💡 提示: 配置飞书 Bot 后可自动推送"
