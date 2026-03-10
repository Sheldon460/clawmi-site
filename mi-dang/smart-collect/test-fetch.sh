#!/bin/bash
#
# 智能收藏回顾系统 - 网页抓取测试脚本
# 用于验证 canghe-url-to-markdown 技能是否正常工作
#

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "🧪 智能收藏回顾系统 - 网页抓取测试"
echo "═══════════════════════════════════════"
echo ""

# 检查参数
if [ $# -eq 0 ]; then
    echo "用法: $0 <URL>"
    echo "示例: $0 https://www.example.com"
    exit 1
fi

URL="$1"

# Chrome 路径
CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
SCRIPT_PATH="$HOME/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts"
OUTPUT_FILE="/tmp/test-fetch-$(date +%s).md"

echo "📋 测试配置:"
echo "   URL: $URL"
echo "   Chrome: $CHROME_PATH"
echo "   输出: $OUTPUT_FILE"
echo ""

# 检查 Chrome 是否存在
if [ ! -f "$CHROME_PATH" ]; then
    echo -e "${RED}❌ 错误: Chrome 未找到${NC}"
    echo "   请检查路径: $CHROME_PATH"
    exit 1
fi

echo -e "${GREEN}✅ Chrome 路径检查通过${NC}"

# 检查脚本是否存在
if [ ! -f "$SCRIPT_PATH" ]; then
    echo -e "${RED}❌ 错误: 抓取脚本未找到${NC}"
    echo "   请检查路径: $SCRIPT_PATH"
    exit 1
fi

echo -e "${GREEN}✅ 抓取脚本检查通过${NC}"

# 设置环境变量并执行
echo ""
echo "🚀 开始抓取..."
echo "─────────────────────────────────────"

export URL_CHROME_PATH="$CHROME_PATH"

# 执行抓取 (带超时)
timeout 90 npx -y bun "$SCRIPT_PATH" "$URL" -o "$OUTPUT_FILE" 2>&1

EXIT_CODE=$?

echo "─────────────────────────────────────"
echo ""

# 检查结果
if [ $EXIT_CODE -eq 0 ] && [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(stat -f%z "$OUTPUT_FILE" 2>/dev/null || stat -c%s "$OUTPUT_FILE" 2>/dev/null)
    echo -e "${GREEN}✅ 抓取成功!${NC}"
    echo "   文件大小: $FILE_SIZE 字节"
    echo ""
    echo "📄 内容预览 (前500字符):"
    echo "─────────────────────────────────────"
    head -c 500 "$OUTPUT_FILE"
    echo ""
    echo "─────────────────────────────────────"
    echo ""
    echo "💾 完整文件保存至: $OUTPUT_FILE"
    
    # 清理临时文件 (可选)
    # rm "$OUTPUT_FILE"
    
    exit 0
else
    echo -e "${RED}❌ 抓取失败 (退出码: $EXIT_CODE)${NC}"
    echo ""
    echo "🔍 可能的原因:"
    echo "   1. Chrome 正在运行，无法启动新实例"
    echo "   2. 网页加载超时"
    echo "   3. 网页需要登录"
    echo "   4. 网络连接问题"
    echo ""
    echo "💡 建议:"
    echo "   - 关闭所有 Chrome 窗口后重试"
    echo "   - 检查网络连接"
    echo "   - 尝试使用 --wait 模式 (如支持)"
    
    exit 1
fi
