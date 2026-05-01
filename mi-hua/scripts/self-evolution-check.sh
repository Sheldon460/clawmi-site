#!/bin/bash
# 幂画 自我进化检查脚本
# 用途: 每次配图任务后自动检查SOP执行情况
# 触发: 配图任务完成时手动调用

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_DIR="$(dirname "$SCRIPT_DIR")"
DATE=$(date +%Y-%m-%d)
SOP_FILE="$WORKSPACE_DIR/SOP/公众号配图SOP.md"
DIARY_FILE="$WORKSPACE_DIR/memory/$DATE.md"

echo "=========================================="
echo "🔄 幂画 自我进化检查"
echo "日期: $DATE"
echo "=========================================="
echo ""

# 1. 检查SOP是否存在
if [ -f "$SOP_FILE" ]; then
    echo "✅ SOP文件存在: $SOP_FILE"
    SOP_VERSION=$(grep -oP '版本.*V[0-9.]+' "$SOP_FILE" | head -1)
    echo "   版本: $SOP_VERSION"
else
    echo "❌ SOP文件不存在!"
    exit 1
fi

echo ""

# 2. 检查今日日记是否存在
if [ -f "$DIARY_FILE" ]; then
    echo "✅ 今日日记存在: $DIARY_FILE"
    # 检查是否记录了配图任务
    if grep -q "配图" "$DIARY_FILE"; then
        echo "   📝 已记录配图相关事件"
    else
        echo "   ⚠️  今日尚未记录配图事件"
    fi
else
    echo "⚠️  今日日记不存在，将创建..."
    touch "$DIARY_FILE"
fi

echo ""

# 3. 检查配图成品区
IMAGE_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/"
if [ -d "$IMAGE_DIR" ]; then
    echo "✅ 配图成品区存在"
    RECENT_IMAGES=$(ls -lt "$IMAGE_DIR" 2>/dev/null | grep -E '\.(png|jpg|jpeg)$' | head -5)
    if [ -n "$RECENT_IMAGES" ]; then
        echo "   最近5张图片:"
        echo "$RECENT_IMAGES" | awk '{print "   - " $9 " (" $6 " " $7 " " $8 ")"}'
    else
        echo "   ⚠️  最近没有新图片"
    fi
else
    echo "⚠️  配图成品区不存在: $IMAGE_DIR"
fi

echo ""

# 4. 输出检查清单
echo "=========================================="
echo "📋 SOP执行检查清单"
echo "=========================================="
echo "请确认以下项目:"
echo ""
echo "配图生成:"
echo "  [ ] 封面图尺寸 900×383"
echo "  [ ] 正文图尺寸 800×600"
echo "  [ ] 所有图片为 PNG 格式"
echo ""
echo "文件规范:"
echo "  [ ] 文件名含日期前缀 (2026-03-26-xxx)"
echo "  [ ] 保存至配图成品区"
echo "  [ ] Markdown使用绝对路径"
echo ""
echo "质量检查:"
echo "  [ ] 配图内容与文章主题匹配"
echo "  [ ] 非旧文章图片复用"
echo "  [ ] 封面与正文风格统一"
echo ""

# 5. 提示用户反馈
echo "=========================================="
echo "💡 优化建议收集"
echo "=========================================="
echo "请记录以下内容到日记:"
echo ""
echo "1. 本次配图用时: ___ 分钟"
echo "2. 工具使用是否顺畅? (Google GenMedia / Canvas / 豆包)"
echo "3. 是否有异常或错误?"
echo "4. 对SOP的改进建议:"
echo ""
echo "记录命令:"
echo "  open $DIARY_FILE"
echo ""
