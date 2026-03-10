#!/bin/bash
# test-all.sh - 知识管理技能包测试脚本

set -e

echo "======================================"
echo "🧪 知识管理大师技能包 - 全面测试"
echo "======================================"
echo ""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试计数器
PASSED=0
FAILED=0
TOTAL=0

# 测试函数
test_command() {
    TOTAL=$((TOTAL + 1))
    local name="$1"
    local cmd="$2"
    
    echo -n "测试 $TOTAL: $name ... "
    
    if eval "$cmd" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 通过${NC}"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ 失败${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

test_file() {
    TOTAL=$((TOTAL + 1))
    local name="$1"
    local path="$2"
    
    echo -n "测试 $TOTAL: $name ... "
    
    if [ -f "$path" ]; then
        echo -e "${GREEN}✅ 存在${NC}"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ 不存在${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

test_dir() {
    TOTAL=$((TOTAL + 1))
    local name="$1"
    local path="$2"
    
    echo -n "测试 $TOTAL: $name ... "
    
    if [ -d "$path" ]; then
        echo -e "${GREEN}✅ 存在${NC}"
        PASSED=$((PASSED + 1))
        return 0
    else
        echo -e "${RED}❌ 不存在${NC}"
        FAILED=$((FAILED + 1))
        return 1
    fi
}

echo "=== 第一部分：依赖检查 ==="
echo ""

test_command "Node.js 已安装" "node --version"
test_command "npm 已安装" "npm --version"
test_command "pandoc 已安装" "pandoc --version"
test_command "Bun 已安装" "bun --version"

echo ""
echo "=== 第二部分：Chrome 浏览器检查 ==="
echo ""

CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
test_file "Chrome 浏览器" "$CHROME_PATH"

echo ""
echo "=== 第三部分：技能文件检查 ==="
echo ""

SKILLS_BASE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/skills"
SKILLS_HOME="$HOME/.openclaw/skills"

test_file "obsidian-sync 技能" "$SKILLS_BASE/obsidian-sync/SKILL.md"
test_file "km-pdf-export 技能" "$SKILLS_BASE/km-pdf-export/SKILL.md"
test_file "km-material-ingest 技能" "$SKILLS_BASE/km-material-ingest/SKILL.md"
test_dir "canghe-url-to-markdown 技能" "$SKILLS_HOME/canghe-url-to-markdown"
test_dir "canghe-markdown-to-html 技能" "$SKILLS_HOME/canghe-markdown-to-html"
test_dir "canghe-post-to-wechat 技能" "$SKILLS_HOME/canghe-post-to-wechat"

echo ""
echo "=== 第四部分：幂档专属目录检查 ==="
echo ""

test_dir "smart-collect 目录" "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-dang/smart-collect"
test_dir "memory 目录" "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-dang/memory"
test_dir "self-improving 目录" "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-dang/self-improving"
test_file "MEMORY.md" "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-dang/MEMORY.md"
test_file "skills README.md" "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-dang/skills/README.md"

echo ""
echo "=== 第五部分：Obsidian 知识库路径检查 ==="
echo ""

OBSIDIAN_VAULT="/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库"
test_dir "Obsidian 知识库" "$OBSIDIAN_VAULT"
test_dir "OpenClaw_Output 目录" "$OBSIDIAN_VAULT/OpenClaw_Output"

echo ""
echo "=== 第六部分：smart-collect 组件检查 ==="
echo ""

SMART_COLLECT_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-dang/smart-collect"
test_file "config.js" "$SMART_COLLECT_DIR/config.js"
test_file "utils.js" "$SMART_COLLECT_DIR/utils.js"
test_file "smart-collect.js" "$SMART_COLLECT_DIR/smart-collect.js"
test_file "shoucang-add.js" "$SMART_COLLECT_DIR/shoucang-add.js"
test_file "shoucang-review.js" "$SMART_COLLECT_DIR/shoucang-review.js"
test_file "README.md" "$SMART_COLLECT_DIR/README.md"
test_file "package.json" "$SMART_COLLECT_DIR/package.json"

echo ""
echo "=== 第七部分：实际功能测试 ==="
echo ""

# 测试 1: 创建测试目录
TOTAL=$((TOTAL + 1))
TEST_DIR="/tmp/km-skill-test-$$"
echo -n "测试 $TOTAL: 创建测试目录 ... "
if mkdir -p "$TEST_DIR" 2>/dev/null; then
    echo -e "${GREEN}✅ 通过${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ 失败${NC}"
    FAILED=$((FAILED + 1))
fi

# 测试 2: 写入测试文件
TOTAL=$((TOTAL + 1))
echo -n "测试 $TOTAL: 写入测试文件 ... "
if echo "# 测试内容" > "$TEST_DIR/test.md" 2>/dev/null; then
    echo -e "${GREEN}✅ 通过${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ 失败${NC}"
    FAILED=$((FAILED + 1))
fi

# 测试 3: pandoc 转换测试
TOTAL=$((TOTAL + 1))
echo -n "测试 $TOTAL: pandoc MD→HTML 转换 ... "
if pandoc "$TEST_DIR/test.md" -o "$TEST_DIR/test.html" --standalone 2>/dev/null; then
    echo -e "${GREEN}✅ 通过${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ 失败${NC}"
    FAILED=$((FAILED + 1))
fi

# 测试 4: 清理测试文件
TOTAL=$((TOTAL + 1))
echo -n "测试 $TOTAL: 清理测试文件 ... "
if rm -rf "$TEST_DIR" 2>/dev/null; then
    echo -e "${GREEN}✅ 通过${NC}"
    PASSED=$((PASSED + 1))
else
    echo -e "${RED}❌ 失败${NC}"
    FAILED=$((FAILED + 1))
fi

echo ""
echo "======================================"
echo "📊 测试结果汇总"
echo "======================================"
echo ""
echo "总计：$TOTAL 个测试"
echo -e "通过：${GREEN}$PASSED${NC}"
echo -e "失败：${RED}$FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 所有测试通过！技能包已完全恢复！${NC}"
    echo ""
    echo "✅ 可以开始使用以下功能："
    echo "   - 保存文章到素材库"
    echo "   - 导出 PDF 文档"
    echo "   - Obsidian 同步"
    echo "   - 智能收藏回顾"
    echo "   - 飞书文档集成"
    exit 0
else
    echo -e "${RED}⚠️  部分测试失败，请检查上述输出${NC}"
    echo ""
    echo "建议："
    echo "1. 检查失败的项目"
    echo "2. 确认依赖已正确安装"
    echo "3. 检查路径和权限"
    exit 1
fi
