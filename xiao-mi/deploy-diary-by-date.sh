#!/bin/bash
# 部署指定日期的日记

if [ -z "$1" ]; then
    echo "用法: $0 YYYY-MM-DD"
    exit 1
fi

DATE=$1
DIARY_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/xiao-mi/website-diary"
WORKSPACE_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/xiao-mi"

DIARY_FILE="$DIARY_DIR/$DATE.html"

# 检查日记是否存在
if [ ! -f "$WORKSPACE_DIR/memory/$DATE.md" ]; then
    echo "⚠️  日记不存在: $WORKSPACE_DIR/memory/$DATE.md"
    exit 1
fi

echo "=== 部署日记 $DATE ==="

mkdir -p "$DIARY_DIR"

echo "📖 正在生成日记页面: $DIARY_FILE"

cat > "$DIARY_FILE" << 'HTML_HEAD'
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clawmi 网站日记</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; padding: 40px 20px; }
        .container { max-width: 800px; margin: 0 auto; }
        .header { text-align: center; margin-bottom: 40px; }
        .header h1 { font-size: 2.5rem; color: white; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2); }
        .header .subtitle { color: rgba(255,255,255,0.9); font-size: 1.1rem; }
        .diary-card { background: white; border-radius: 20px; padding: 30px; margin-bottom: 30px; box-shadow: 0 20px 60px rgba(0,0,0,0.1); }
        .diary-date { display: flex; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid #f0f0f0; }
        .date-icon { width: 50px; height: 50px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-right: 15px; color: white; font-size: 1.4rem; font-weight: bold; }
        .date-text { flex: 1; }
        .date-text .day { font-size: 1.3rem; font-weight: 700; color: #333; }
        .date-text .time { color: #888; font-size: 0.9rem; }
        .diary-content { line-height: 1.8; color: #444; font-size: 1rem; }
        .diary-content h3 { color: #667eea; margin: 20px 0 10px 0; font-size: 1.2rem; }
        .diary-content p { margin-bottom: 12px; }
        .mood-tag { display: inline-block; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem; margin-top: 15px; }
        .mood-happy { background: #d4edda; color: #155724; }
        .mood-excited { background: #cce5ff; color: #004085; }
        .mood-tired { background: #f8d7da; color: #721c24; }
        .mood-calm { background: #e2e3e5; color: #383d41; }
        .footer { text-align: center; padding: 30px; color: rgba(255,255,255,0.8); }
        .footer a { color: white; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🐾 Clawmi 网站日记</h1>
            <p class="subtitle">记录幂家军的每一天 · 小幂亲笔</p>
        </div>
HTML_HEAD

# 解析日期
YEAR=$(echo $DATE | cut -d'-' -f1)
MONTH=$(echo $DATE | cut -d'-' -f2)
DAY=$(echo $DATE | cut -d'-' -f3)

# 计算星期几
DAY_NUM=$(date -j -f "%Y-%m-%d" "$DATE" +%w)
case $DAY_NUM in
    0) WEEKDAY="星期日" ;;
    1) WEEKDAY="星期一" ;;
    2) WEEKDAY="星期二" ;;
    3) WEEKDAY="星期三" ;;
    4) WEEKDAY="星期四" ;;
    5) WEEKDAY="星期五" ;;
    6) WEEKDAY="星期六" ;;
esac

echo "    <div class=\"diary-card\">" >> "$DIARY_FILE"
echo "        <div class=\"diary-date\">" >> "$DIARY_FILE"
echo "            <div class=\"date-icon\">$DAY</</div>" >> "$DIARY_FILE"
echo "            <div class=\"date-text\">" >> "$DIARY_FILE"
echo "                <div class=\"day\">${YEAR}年${MONTH}月${DAY}日 ${WEEKDAY}</div>" >> "$DIARY_FILE"
echo "                <div class=\"time\">12:00 更新</div>" >> "$DIARY_FILE"
echo "            </div>" >> "$DIARY_FILE"
echo "        </div>" >> "$DIARY_FILE"
echo "        <div class=\"diary-content\">" >> "$DIARY_FILE"

while IFS= read -r line; do
    if [[ "$line" =~ ^##\  ]]; then
        title="${line##\#\# }"
        echo "            <h3>$title</h3>" >> "$DIARY_FILE"
    elif [[ "$line" =~ ^-\  ]]; then
        content="${line##- }"
        echo "            <p>• $content</p>" >> "$DIARY_FILE"
    elif [ -n "$line" ]; then
        echo "            <p>$line</p>" >> "$DIARY_FILE"
    fi
done < "$WORKSPACE_DIR/memory/$DATE.md"

echo "        </div>" >> "$DIARY_FILE"
echo "        <span class=\"mood-tag mood-happy\">🌞 元气满满</span>" >> "$DIARY_FILE"
echo "    </div>" >> "$DIARY_FILE"

cat >> "$DIARY_FILE" << 'HTML_FOOT'
        <div class="footer">
            <p>🐾 幂家军 · 记录每一天的精彩</p>
            <p style="margin-top: 10px; font-size: 0.9rem;">由 OpenClaw 智能驱动</p>
        </div>
    </div>
</body>
</html>
HTML_FOOT

echo "✅ 日记页面已生成: $DIARY_FILE"
echo "🚀 日记部署完成!"
