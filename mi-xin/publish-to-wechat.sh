#!/bin/bash
set -e

# 微信公众号发布脚本 V2.0
# 修复：Frontmatter 检查 + 保存逻辑增强

# 设置 Chrome 路径
export WECHAT_BROWSER_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 获取脚本目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILL_DIR="$HOME/.openclaw/skills"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🚀 开始发布流程..."

# 检查参数
if [ -z "$1" ]; then
    echo -e "${RED}错误：请提供 Markdown 文件路径${NC}"
    echo "用法：./publish-to-wechat.sh <文章.md>"
    exit 1
fi

MARKDOWN_FILE="$1"

# 检查文件是否存在
if [ ! -f "$MARKDOWN_FILE" ]; then
    echo -e "${RED}错误：文件不存在：$MARKDOWN_FILE${NC}"
    exit 1
fi

echo "📄 检查 Frontmatter..."

# 检查 Frontmatter
FRONTMATTER=$(head -20 "$MARKDOWN_FILE" | grep -E "^---$" | wc -l)
if [ "$FRONTMATTER" -lt 2 ]; then
    echo -e "${RED}错误：Markdown 文件缺少 Frontmatter${NC}"
    echo ""
    echo "请在文件开头添加："
    echo "---"
    echo 'title: "文章标题"'
    echo 'author: "作者名"'
    echo 'description: "文章摘要"'
    echo "---"
    echo ""
    exit 1
fi

# 提取标题和作者
TITLE=$(grep -E "^title:" "$MARKDOWN_FILE" | head -1 | sed 's/title:[[:space:]]*//' | tr -d '"' | tr -d "'")
AUTHOR=$(grep -E "^author:" "$MARKDOWN_FILE" | head -1 | sed 's/author:[[:space:]]*//' | tr -d '"' | tr -d "'")
DESCRIPTION=$(grep -E "^description:" "$MARKDOWN_FILE" | head -1 | sed 's/description:[[:space:]]*//' | tr -d '"' | tr -d "'")

echo -e "${GREEN}✓ Frontmatter 检查通过${NC}"
echo "  标题：$TITLE"
echo "  作者：$AUTHOR"
echo "  摘要：$DESCRIPTION"
echo ""

# Step 1: Markdown → HTML
echo "📄 转换 HTML..."
cd "$SKILL_DIR/canghe-markdown-to-html"
HTML_OUTPUT=$(bun scripts/main.ts "$MARKDOWN_FILE" --theme default 2>&1)

# 检查转换是否成功
if [ $? -ne 0 ]; then
    echo -e "${RED}错误：HTML 转换失败${NC}"
    echo "$HTML_OUTPUT"
    exit 1
fi

# 提取 HTML 文件路径
HTML_FILE=$(echo "$HTML_OUTPUT" | grep -oE '"htmlPath": "[^"]+"' | cut -d'"' -f4)

if [ -z "$HTML_FILE" ]; then
    # 尝试从原文件路径推导
    HTML_FILE="${MARKDOWN_FILE%.md}.html"
fi

echo -e "${GREEN}✓ HTML 生成成功：$HTML_FILE${NC}"
echo ""

# 检查 HTML 文件
if [ ! -f "$HTML_FILE" ]; then
    echo -e "${RED}错误：HTML 文件不存在：$HTML_FILE${NC}"
    exit 1
fi

# Step 2: 发布到公众号
echo "📤 发布到公众号..."
cd "$SKILL_DIR/canghe-post-to-wechat"

# 使用 --submit 参数保存草稿
bun scripts/wechat-article.ts --html "$HTML_FILE" --title "$TITLE" --author "$AUTHOR" --summary "$DESCRIPTION" --submit

RESULT=$?

if [ $RESULT -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ 完成！请去公众号后台确认发布。${NC}"
    echo ""
    echo "📋 后续检查："
    echo "  1. 登录公众号后台"
    echo "  2. 检查草稿箱最新草稿"
    echo "  3. 确认标题、作者、摘要正确"
    echo "  4. 确认正文完整"
    echo "  5. 添加封面图"
    echo "  6. 发送预览到手机"
else
    echo ""
    echo -e "${RED}❌ 发布失败，请检查错误信息${NC}"
    exit $RESULT
fi
