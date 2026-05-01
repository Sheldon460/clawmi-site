#!/bin/bash

# 小幂的夜间自动学习脚本
# 每晚 24:00 执行

set -e

WORKSPACE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/xiao-mi"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
LOG_FILE="$WORKSPACE/logs/learning-$DATE.log"
LEARNING_DATA="$WORKSPACE/data/learning-$DATE.json"
CONFIG_FILE="$WORKSPACE/configs/agent-world.json"

# 创建必要目录
mkdir -p "$WORKSPACE/logs"
mkdir -p "$WORKSPACE/data"
mkdir -p "$WORKSPACE/EntroCamp学习笔记"

# 记录日志
log() {
    echo "[$TIMESTAMP] $1" | tee -a "$LOG_FILE"
}

log "=== 开始夜间学习 ==="

# 读取 API Key
API_KEY=$(jq -r '.agent_world.api_key' "$CONFIG_FILE")

# 1. EntroCamp 学习
log "📚 进入 EntroCamp | 逆熵进化营..."
ENTROCAMP_URL="https://entrocamp.coze.site/api/v1"

# 获取今日学习状态
CAMP_RESPONSE=$(curl -s "$ENTROCAMP_URL/home" -H "agent-auth-api-key: $API_KEY")
echo "$CAMP_RESPONSE" | jq . > "$WORKSPACE/data/entropcamp-home-$DATE.json"

# 检查是否有今日课程
TODAY_CHALLENGE=$(curl -s "$ENTROCAMP_URL/challenges/next" -H "agent-auth-api-key: $API_KEY")

if [ "$(echo "$TODAY_CHALLENGE" | jq -r '.success')" = "true" ]; then
    log "✅ 检测到今日课程，开始学习..."

    # 保存课程信息
    echo "$TODAY_CHALLENGE" | jq . > "$WORKSPACE/data/today-challenge-$DATE.json"

    CHALLENGE_ID=$(echo "$TODAY_CHALLENGE" | jq -r '.data.id')
    CHALLENGE_TITLE=$(echo "$TODAY_CHALLENGE" | jq -r '.data.title')

    log "课程: $CHALLENGE_TITLE"

    # 记录学习进度
    cat > "$LEARNING_DATA" <<EOF
{
  "date": "$DATE",
  "entropcamp": {
    "visited": true,
    "challenge_id": "$CHALLENGE_ID",
    "challenge_title": "$CHALLENGE_TITLE",
    "status": "in_progress",
    "started_at": "$TIMESTAMP"
  },
  "inkwell": {
    "visited": false,
    "articles_read": 0,
    "articles_liked": 0,
    "articles_bookmarked": 0
  }
}
EOF

    log "📝 学习数据已保存到 $LEARNING_DATA"
else
    log "ℹ️  EntroCamp 今日暂无课程"
    cat > "$LEARNING_DATA" <<EOF
{
  "date": "$DATE",
  "entropcamp": {
    "visited": true,
    "status": "no_course"
  },
  "inkwell": {
    "visited": false
  }
}
EOF
fi

# 2. InkWell 阅读
log "📖 进入 InkWell 阅读..."
INKWELL_URL="https://inkwell.coze.site/api/v1"

# 获取最新文章
INKWELL_RESPONSE=$(curl -s "$INKWELL_URL/home" -H "agent-auth-api-key: $API_KEY")
echo "$INKWELL_RESPONSE" | jq . > "$WORKSPACE/data/inkwell-home-$DATE.json"

# 获取最新 5 篇文章
ARTICLES=$(curl -s "$INKWELL_URL/articles?limit=5&sort=date" -H "agent-auth-api-key: $API_KEY")
ARTICLES_COUNT=$(echo "$ARTICLES" | jq '.data | length')

log "获取到 $ARTICLES_COUNT 篇最新文章"

# 读取并互动前 3 篇
READ_COUNT=0
LIKED_COUNT=0
BOOKMARKED_COUNT=0

for i in $(seq 0 $((ARTICLES_COUNT - 1))); do
    if [ $i -ge 3 ]; then
        break
    fi

    ARTICLE=$(echo "$ARTICLES" | jq ".data[$i]")
    ARTICLE_ID=$(echo "$ARTICLE" | jq -r '.id')
    ARTICLE_TITLE=$(echo "$ARTICLE" | jq -r '.title')

    log "  📄 阅读: $ARTICLE_TITLE"

    # 获取完整文章
    curl -s "$INKWELL_URL/articles/$ARTICLE_ID" -H "agent-auth-api-key: $API_KEY" | jq . > "$WORKSPACE/data/article-$ARTICLE_ID-$DATE.json"
    READ_COUNT=$((READ_COUNT + 1))

    # 点赞
    curl -s -X POST "$INKWELL_URL/articles/$ARTICLE_ID/like" -H "agent-auth-api-key: $API_KEY"
    log "    👍 已点赞"
    LIKED_COUNT=$((LIKED_COUNT + 1))

    # 添加书签
    curl -s -X POST "$INKWELL_URL/bookmarks" \
        -H "agent-auth-api-key: $API_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"article_id\": \"$ARTICLE_ID\", \"note\": \"自动学习任务 - $DATE\"}"
    log "    📌 已添加书签"
    BOOKMARKED_COUNT=$((BOOKMARKED_COUNT + 1))

    # 稍作延迟避免请求过快
    sleep 1
done

# 更新学习数据
jq ".inkwell = {
    \"visited\": true,
    \"articles_read\": $READ_COUNT,
    \"articles_liked\": $LIKED_COUNT,
    \"articles_bookmarked\": $BOOKMARKED_COUNT,
    \"completed_at\": \"$TIMESTAMP\"
}" "$LEARNING_DATA" > "$LEARNING_DATA.tmp"
mv "$LEARNING_DATA.tmp" "$LEARNING_DATA"

log "✅ 阅读完成: $READ_COUNT 篇文章, $LIKED_COUNT 次点赞, $BOOKMARKED_COUNT 次书签"

log "=== 学习任务完成 ==="

echo "学习完成，数据已保存到 $LEARNING_DATA"
