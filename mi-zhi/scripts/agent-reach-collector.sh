#!/bin/bash
# AI 资讯采集脚本 - agent-reach 版本
# 用于每日定时采集多平台 AI 资讯
# 创建日期: 2026-03-18
# 版本: 1.0

set -e

# 配置
OUTPUT_DIR="/tmp/ai_news"
DATE=$(date +%Y%m%d)
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

echo "🚀 启动 AI 资讯采集 - $TIMESTAMP"
echo "================================"

# ============================================
# 1. Twitter/X 采集
# ============================================
echo "📱 采集 Twitter/X..."
if command -v xreach &> /dev/null; then
    xreach search "AI artificial intelligence" -n 20 --json > "$OUTPUT_DIR/twitter_ai_$DATE.json" 2>/dev/null || echo "⚠️ Twitter 采集失败 (可能需要配置)"
    xreach search "OpenAI GPT" -n 10 --json > "$OUTPUT_DIR/twitter_openai_$DATE.json" 2>/dev/null || true
    xreach search "Claude Anthropic" -n 10 --json > "$OUTPUT_DIR/twitter_claude_$DATE.json" 2>/dev/null || true
else
    echo "⚠️ xreach 命令未找到"
fi

# ============================================
# 2. GitHub Trending 采集
# ============================================
echo "💻 采集 GitHub AI 项目..."
if command -v gh &> /dev/null; then
    gh search repos "AI" --sort stars --limit 20 --json name,owner,description,url,stargazersCount,updatedAt > "$OUTPUT_DIR/github_ai_$DATE.json" 2>/dev/null || echo "⚠️ GitHub 采集失败"
    gh search repos "machine learning" --sort stars --limit 10 --json name,owner,description,url,stargazersCount > "$OUTPUT_DIR/github_ml_$DATE.json" 2>/dev/null || true
else
    echo "⚠️ gh 命令未找到"
fi

# ============================================
# 3. Reddit 采集
# ============================================
echo "🗣️ 采集 Reddit..."
curl -s "https://www.reddit.com/r/MachineLearning/hot.json?limit=15" \
    -H "User-Agent: agent-reach/1.0" > "$OUTPUT_DIR/reddit_ml_$DATE.json" 2>/dev/null || echo "⚠️ Reddit 采集失败"

curl -s "https://www.reddit.com/r/artificial/hot.json?limit=10" \
    -H "User-Agent: agent-reach/1.0" > "$OUTPUT_DIR/reddit_ai_$DATE.json" 2>/dev/null || true

# ============================================
# 4. RSS 订阅源采集
# ============================================
echo "📰 采集 RSS 订阅源..."
python3 << 'EOF'
import feedparser
import json
import sys
from datetime import datetime

rss_sources = [
    ("TechCrunch AI", "https://techcrunch.com/category/artificial-intelligence/feed/"),
    ("The Verge AI", "https://www.theverge.com/ai-artificial-intelligence/rss/index.xml"),
    ("Hacker News", "https://news.ycombinator.com/rss"),
]

results = []
for name, url in rss_sources:
    try:
        feed = feedparser.parse(url)
        for entry in feed.entries[:10]:
            results.append({
                "source": name,
                "title": entry.get("title", ""),
                "link": entry.get("link", ""),
                "published": entry.get("published", ""),
                "summary": entry.get("summary", "")[:200]
            })
    except Exception as e:
        print(f"⚠️ {name} 采集失败: {e}", file=sys.stderr)

# 保存结果
import os
output_dir = "/tmp/ai_news"
date = datetime.now().strftime("%Y%m%d")
with open(f"{output_dir}/rss_feeds_{date}.json", "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)

print(f"✅ RSS 采集完成: {len(results)} 条")
EOF

# ============================================
# 5. Web 搜索 (Exa) - 如果 mcporter 可用
# ============================================
echo "🔍 采集 Web 搜索结果..."
if command -v mcporter &> /dev/null; then
    mcporter call 'exa.web_search_exa(query: "AI news today", numResults: 10)' > "$OUTPUT_DIR/exa_ai_$DATE.json" 2>/dev/null || echo "⚠️ Exa 搜索失败 (可能需要配置)"
else
    echo "⚠️ mcporter 命令未找到"
fi

# ============================================
# 6. 生成汇总报告
# ============================================
echo "📊 生成汇总报告..."
python3 << 'EOF'
import json
import os
from datetime import datetime

output_dir = "/tmp/ai_news"
date = datetime.now().strftime("%Y%m%d")

# 统计各平台数据量
stats = {}
for filename in os.listdir(output_dir):
    if filename.endswith(f"_{date}.json"):
        filepath = os.path.join(output_dir, filename)
        try:
            with open(filepath, "r", encoding="utf-8") as f:
                data = json.load(f)
                if isinstance(data, list):
                    stats[filename] = len(data)
                elif isinstance(data, dict) and "data" in data:
                    stats[filename] = len(data["data"])
                else:
                    stats[filename] = 1
        except:
            stats[filename] = 0

# 生成报告
report = f"""# AI 资讯采集报告

**采集时间**: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}

## 各平台数据量

"""
for filename, count in sorted(stats.items()):
    platform = filename.replace(f"_{date}.json", "")
    report += f"- **{platform}**: {count} 条\n"

total = sum(stats.values())
report += f"\n**总计**: {total} 条\n"

# 保存报告
report_path = os.path.join(output_dir, f"report_{date}.md")
with open(report_path, "w", encoding="utf-8") as f:
    f.write(report)

print(f"✅ 报告已生成: {report_path}")
print(f"📈 总计采集: {total} 条")
EOF

echo ""
echo "================================"
echo "✅ 采集完成!"
echo "📁 输出目录: $OUTPUT_DIR"
echo "📄 查看报告: cat $OUTPUT_DIR/report_$DATE.md"
