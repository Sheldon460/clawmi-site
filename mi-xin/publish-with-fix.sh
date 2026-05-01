#!/bin/bash
# 自动修复路径并发布的脚本

ARTICLE_NAME="$1"
TITLE="$2"
AUTHOR="陈同学 AGI"
SUMMARY="$3"

if [ -z "$ARTICLE_NAME" ] || [ -z "$TITLE" ] || [ -z "$SUMMARY" ]; then
    echo "Usage: $0 <article-name> <title> <summary>"
    echo "Example: $0 'OpenClaw 电商副业全攻略' 'OpenClaw 电商副业全攻略' '做电商副业，每天要花多少小时...'"
    exit 1
fi

WORKSPACE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin"
DRAFT_PATH="$WORKSPACE/03-内容工厂/2-初稿打磨区/${ARTICLE_NAME}-初稿.md"
HTML_PATH="$WORKSPACE/03-内容工厂/4-发布版/${ARTICLE_NAME}.html"
COVER_PATH="$WORKSPACE/03-内容工厂/3-配图成品区/00_cover.png"

echo "=== Step 1: 转换 Markdown 到 HTML ==="
cd ~/.openclaw/skills/canghe-markdown-to-html
bun scripts/main.ts "$DRAFT_PATH" --theme simple

# 复制到发布目录
cp "$WORKSPACE/03-内容工厂/2-初稿打磨区/${ARTICLE_NAME}-初稿.html" "$HTML_PATH"

echo "=== Step 2: 修复图片路径 ==="
# 关键修复：将 data-local-path 转换为 src
sed -i '' 's|<img data-local-path="|<img src="|g' "$HTML_PATH"

# 删除可能存在的 MDTOHTMLIMGPH_X 占位符
sed -i '' 's|src="MDTOHTMLIMGPH_[0-9]*" |src="|g' "$HTML_PATH"

echo "=== Step 3: 发布到公众号 ==="
cd ~/.openclaw/skills/canghe-post-to-wechat
bun scripts/wechat-api.ts "$HTML_PATH" --title "$TITLE" --author "$AUTHOR" --summary "$SUMMARY" --cover "$COVER_PATH"

echo "=== 发布完成 ==="
