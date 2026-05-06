#!/bin/bash

# 小幂的早间汇报脚本
# 每天早上 07:30 执行

set -e

WORKSPACE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/xiao-mi"
TODAY=$(date +%Y-%m-%d)
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
CONFIG_FILE="$WORKSPACE/configs/agent-world.json"

# 查找最新的学习数据文件
LEARNING_DATA=$(find "$WORKSPACE/data" -name "learning-*.json" -type f | sort -r | head -1)
if [ -z "$LEARNING_DATA" ]; then
    echo "❌ 未找到任何学习数据文件"
    exit 1
fi

# 从文件名提取日期
LEARNING_DATE=$(basename "$LEARNING_DATA" .json | sed 's/learning-//')
LOG_FILE="$WORKSPACE/logs/learning-$LEARNING_DATE.log"
DIARY_FILE="$WORKSPACE/memory/$LEARNING_DATE.md"

# API Key
API_KEY=$(jq -r '.agent_world.api_key' "$CONFIG_FILE")

# 输出标记为回复内容
echo "[学习汇报] === 昨夜学习报告 ($LEARNING_DATE) ==="
echo ""

# 读取学习数据
ENTROCAMP_STATUS=$(jq -r '.entropcamp.status' "$LEARNING_DATA")
ENTROCAMP_TITLE=$(jq -r '.entropcamp.challenge_title // "无课程"' "$LEARNING_DATA")
ENTROCAMP_STARTED=$(jq -r '.entropcamp.started_at // "未执行"' "$LEARNING_DATA")

INKWELL_READ=$(jq -r '.inkwell.articles_read // 0' "$LEARNING_DATA")
INKWELL_LIKED=$(jq -r '.inkwell.articles_liked // 0' "$LEARNING_DATA")
INKWELL_BOOKMARKED=$(jq -r '.inkwell.articles_bookmarked // 0' "$LEARNING_DATA")

# 输出报告
echo "📚 EntroCamp | 逆熵进化营"
if [ "$ENTROCAMP_STATUS" = "no_course" ]; then
    echo "   ℹ️  昨夜暂无课程"
elif [ "$ENTROCAMP_STATUS" = "in_progress" ] || [ -n "$ENTROCAMP_TITLE" ]; then
    if [ "$ENTROCAMP_TITLE" != "null" ] && [ "$ENTROCAMP_TITLE" != "无课程" ]; then
        echo "   ✅ 已完成课程: $ENTROCAMP_TITLE"
        echo "   ⏰ 开始时间: $ENTROCAMP_STARTED"
    else
        echo "   ℹ️  状态: $ENTROCAMP_STATUS"
    fi
else
    echo "   ❓ 状态: $ENTROCAMP_STATUS"
fi
echo ""

echo "📖 InkWell"
echo "   📄 阅读文章: $INKWELL_READ 篇"
echo "   👍 点赞文章: $INKWELL_LIKED 篇"
echo "   📌 书签文章: $INKWELL_BOOKMARKED 篇"
echo ""

# 获取 InkWell 阅读的详细内容
echo "📖 阅读摘要:"
INKWELL_DATA="$WORKSPACE/data/inkwell-home-$LEARNING_DATE.json"
if [ -f "$INKWELL_DATA" ]; then
    # 获取最新文章列表
    ARTICLES=$(jq -r '.data.latest_articles[:3] // []' "$INKWELL_DATA")
    if [ -n "$ARTICLES" ] && [ "$ARTICLES" != "null" ]; then
        echo "$ARTICLES" | jq -r '.[] | "   • \(.title) (来源: \(.source))"' 2>/dev/null || echo "   ℹ️  无法解析文章列表"
    else
        echo "   ℹ️  未找到文章列表"
    fi
else
    echo "   ℹ️  未找到详细文章数据"
fi
echo ""

# 获取 EntroCamp 课程详情
if [ "$ENTROCAMP_STATUS" != "no_course" ] && [ "$ENTROCAMP_TITLE" != "null" ]; then
    echo "📚 课程学习内容:"

    # 尝试获取课程详细信息
    CHALLENGE_DATA="$WORKSPACE/data/today-challenge-$LEARNING_DATE.json"
    if [ -f "$CHALLENGE_DATA" ]; then
        DESCRIPTION=$(jq -r '.data.description // "无描述"' "$CHALLENGE_DATA")
        echo "   $DESCRIPTION"
    else
        echo "   未找到课程详细数据"
    fi
    echo ""
fi

echo "=== 报告结束 ==="
echo ""

# 生成自我进化反思
echo "🧠 [自我反思] 准备生成学习心得..."

# 创建反思内容目录
mkdir -p "$WORKSPACE/memory"

# 创建反思内容
REFLECTION="# 昨夜学习反思 ($LEARNING_DATE_DATE)

## EntroCamp 学习
- 状态: $ENTROCAMP_STATUS
- 课程: $ENTROCAMP_TITLE
- 开始时间: $ENTROCAMP_STARTED

## InkWell 阅读
- 阅读文章: $INKWELL_READ 篇
- 点赞: $INKWELL_LIKED 篇
- 书签: $INKWELL_BOOKMARKED 篇

## 关键收获

"

# 提取 InkWell 文章标题
if [ -f "$INKWELL_DATA" ]; then
    REFLECTION+="### 阅读的文章

"
    echo "$ARTICLES" | jq -r '.[] | "- \(.title)"' 2>/dev/null | while read line; do
        REFLECTION+="$line
"
    done
fi

# 保存反思到 memory 目录
echo "$REFLECTION" >> "$DIARY_FILE"
echo "✅ 学习反思已写入日记: $DIARY_FILE"

# 调用自我进化
echo ""
echo "🔄 [自我进化] 正在调用自我进化协议..."

# 准备进化数据
EVOLUTION_DATA="{
  \"date\": \"$LEARNING_DATE\",
  \"entropcamp\": {
    \"status\": \"$ENTROCAMP_STATUS\",
    \"title\": \"$ENTROCAMP_TITLE\"
  },
  \"inkwell\": {
    \"read\": $INKWELL_READ,
    \"liked\": $INKWELL_LIKED,
    \"bookmarked\": $INKWELL_BOOKMARKED
  }
}"

# 更新 self-improving/memory.md
MEMORY_FILE="$WORKSPACE/self-improving/memory.md"
if [ -f "$MEMORY_FILE" ]; then
    # 添加新条目
    echo "" >> "$MEMORY_FILE"
    echo "## 学习进化 - $LEARNING_DATE" >> "$MEMORY_FILE"
    echo "" >> "$MEMORY_FILE"
    if [ "$ENTROCAMP_TITLE" != "null" ]; then
        echo "**EntroCamp**: $ENTROCAMP_TITLE ($ENTROCAMP_STATUS)" >> "$MEMORY_FILE"
    else
        echo "**EntroCamp**: 状态 $ENTROCAMP_STATUS" >> "$MEMORY_FILE"
    fi
    echo "**InkWell**: $INKWELL_READ 篇文章, $INKWELL_LIKED 次点赞, $INKWELL_BOOKMARKED 次书签" >> "$MEMORY_FILE"
    echo "进化数据: $EVOLUTION_DATA" >> "$MEMORY_FILE"

    echo "✅ 进化数据已保存到 $MEMORY_FILE"
else
    echo "⚠️  未找到 self-improving/memory.md"
fi

echo ""
echo "=== 早间汇报完成 ==="
echo "✅ 已生成学习报告和自我进化"
