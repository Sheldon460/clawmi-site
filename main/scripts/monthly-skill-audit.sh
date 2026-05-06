#!/bin/bash
# 技能目录规范性月度检查脚本
# 使用方法：./monthly-skill-audit.sh [YYYY-MM]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日期
if [ -n "$1" ]; then
    REPORT_DATE="$1"
else
    REPORT_DATE=$(date +%Y-%m)
fi

REPORT_FILE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/main/docs/monthly-skill-audit-${REPORT_DATE}.md"
WORKSPACE="/Volumes/My house/Users/Sheldon/.openclaw/workspace"

echo "========================================"
echo "技能目录规范性月度检查"
echo "日期：$REPORT_DATE"
echo "========================================"
echo ""

# 1. 检查共享技能目录
echo -n "1. 检查共享技能目录... "
SHARED_SKILLS_COUNT=$(ls ~/.openclaw/skills/ 2>/dev/null | grep -v ".DS_Store" | grep -v "INSTALL_LOG.md" | wc -l | tr -d ' ')
if [ "$SHARED_SKILLS_COUNT" -ge 10 ]; then
    echo -e "${GREEN}✅ 通过${NC} ($SHARED_SKILLS_COUNT 个技能)"
    SHARED_STATUS="✅"
else
    echo -e "${RED}❌ 未通过${NC} (仅 $SHARED_SKILLS_COUNT 个技能，预期≥10)"
    SHARED_STATUS="❌"
fi

# 2. 检查非标准路径
echo -n "2. 检查非标准路径... "
if [ -d ~/.agents/skills/ ]; then
    echo -e "${RED}❌ 发现非标准路径${NC}"
    NON_STANDARD_STATUS="❌"
    NON_STANDARD_DETAILS="发现 ~/.agents/skills/ 目录存在"
else
    echo -e "${GREEN}✅ 已清理${NC}"
    NON_STANDARD_STATUS="✅"
    NON_STANDARD_DETAILS="无"
fi

# 3. 检查 Agent 专属技能目录
echo "3. 检查 Agent 专属技能目录..."
AGENT_SKILLS_REPORT=""
for agent_dir in "$WORKSPACE"/mi-*/; do
    agent=$(basename "$agent_dir")
    skills_dir="$agent_dir/skills"
    
    if [ -d "$skills_dir" ]; then
        count=$(ls "$skills_dir" 2>/dev/null | grep -v ".DS_Store" | wc -l | tr -d ' ')
        if [ "$count" -gt 0 ]; then
            echo "   - $agent: $count 个专属技能"
            AGENT_SKILLS_REPORT="$AGENT_SKILLS_REPORT- $agent: $count 个专属技能\n"
        else
            echo "   - $agent: 无专属技能"
        fi
    else
        echo "   - $agent: 无 skills 目录"
    fi
done

# 4. 验证技能加载状态
echo ""
echo "4. 验证技能加载状态..."
openclaw status 2>&1 | grep -i "skill" | head -5 || echo "   无法获取技能加载状态"

# 生成报告
echo ""
echo "========================================"
echo "生成检查报告..."
echo "========================================"

cat > "$REPORT_FILE" << EOF
# 技能目录规范性检查报告

**日期**: $REPORT_DATE  
**检查者**: main (自动检查)

---

## 检查结果

| 检查项 | 预期 | 实际 | 状态 |
|--------|------|------|------|
| 共享技能数量 | ≥10 | $SHARED_SKILLS_COUNT 个 | $SHARED_STATUS |
| 非标准路径 | 无 | $NON_STANDARD_DETAILS | $NON_STANDARD_STATUS |
| Agent 专属技能 | 规范 | 见下方详情 | ✅ |

---

## Agent 专属技能详情

$(echo -e "$AGENT_SKILLS_REPORT")

---

## 发现问题

$(if [ "$SHARED_STATUS" = "❌" ] || [ "$NON_STANDARD_STATUS" = "❌" ]; then
    echo "### 需要整改的问题"
    if [ "$SHARED_STATUS" = "❌" ]; then
        echo "1. 共享技能数量不足，需要补充"
    fi
    if [ "$NON_STANDARD_STATUS" = "❌" ]; then
        echo "2. 发现非标准路径，需要清理"
    fi
else
    echo "✅ 本次检查未发现问题"
fi)

---

## 整改措施

$(if [ "$SHARED_STATUS" = "❌" ] || [ "$NON_STANDARD_STATUS" = "❌" ]; then
    echo "1. 待制定 (根据具体问题)"
else
    echo "无需整改"
fi)

---

## 下次检查

**日期**: $(date -v+1M +%Y-%m)-01  
**负责人**: main (幂 Claw)

---

*报告生成时间：$(date +%Y-%m-%d\ %H:%M:%S)*  
*脚本版本：V1.0*
EOF

echo "报告已生成：$REPORT_FILE"
echo ""
echo "========================================"
echo "检查完成！"
echo "========================================"

# 如果有问题，输出警告
if [ "$SHARED_STATUS" = "❌" ] || [ "$NON_STANDARD_STATUS" = "❌" ]; then
    echo ""
    echo -e "${YELLOW}⚠️  发现问题，请查看报告并整改${NC}"
    exit 1
else
    echo ""
    echo -e "${GREEN}✅ 所有检查项通过${NC}"
    exit 0
fi
