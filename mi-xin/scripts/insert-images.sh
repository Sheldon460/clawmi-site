#!/bin/bash
# insert-images.sh - 自动将配图插入文章对应位置
# 版本: V1.0
# 作者: 幂家军 - 微信运营 (mi-xin)

set -e

# 参数检查
if [ $# -lt 2 ]; then
    echo "用法: $0 <文章.md> <图片目录>"
    echo "示例: $0 article.md ./images/"
    exit 1
fi

ARTICLE_FILE="$1"
IMAGE_DIR="$2"

# 检查文件是否存在
if [ ! -f "$ARTICLE_FILE" ]; then
    echo "❌ 错误: 文章文件不存在: $ARTICLE_FILE"
    exit 1
fi

if [ ! -d "$IMAGE_DIR" ]; then
    echo "❌ 错误: 图片目录不存在: $IMAGE_DIR"
    exit 1
fi

echo "======================================"
echo "  配图自动插入工具 V1.0"
echo "======================================"
echo "文章: $ARTICLE_FILE"
echo "图片: $IMAGE_DIR"
echo ""

# 创建备份
cp "$ARTICLE_FILE" "${ARTICLE_FILE}.bak"
echo "✅ 已创建备份: ${ARTICLE_FILE}.bak"

# 定义配图映射规则
declare -A IMAGE_MAP
IMAGE_MAP["\[配图：封面\]"]="![封面](${IMAGE_DIR}00_cover.png)"
IMAGE_MAP["\[配图：封面图\]"]="![封面图](${IMAGE_DIR}00_cover.png)"
IMAGE_MAP["\[配图：第一部分\]"]="![第一部分](${IMAGE_DIR}01_section1.png)"
IMAGE_MAP["\[配图：第二部分\]"]="![第二部分](${IMAGE_DIR}02_section2.png)"
IMAGE_MAP["\[配图：第三部分\]"]="![第三部分](${IMAGE_DIR}03_section3.png)"
IMAGE_MAP["\[配图：第四部分\]"]="![第四部分](${IMAGE_DIR}04_section4.png)"
IMAGE_MAP["\[配图：准备工作\]"]="![准备工作](${IMAGE_DIR}01_prepare.png)"
IMAGE_MAP["\[配图：部署步骤\]"]="![部署步骤](${IMAGE_DIR}02_deploy.png)"
IMAGE_MAP["\[配图：基础功能\]"]="![基础功能](${IMAGE_DIR}03_basic.png)"
IMAGE_MAP["\[配图：进阶玩法\]"]="![进阶玩法](${IMAGE_DIR}04_advanced.png)"

# 计数器
REPLACED_COUNT=0

# 遍历映射规则进行替换
for placeholder in "${!IMAGE_MAP[@]}"; do
    replacement="${IMAGE_MAP[$placeholder]}"
    
    # 检查占位符是否存在
    if grep -q "$placeholder" "$ARTICLE_FILE"; then
        # 使用 sed 替换（Mac 兼容）
        sed -i '' "s|$placeholder|$replacement|g" "$ARTICLE_FILE"
        echo "✅ 已替换: $placeholder"
        ((REPLACED_COUNT++))
    fi
done

echo ""
echo "======================================"
echo "  替换完成"
echo "======================================"
echo "替换数量: $REPLACED_COUNT"

# 检查是否还有未替换的占位符
REMAINING=$(grep -c "\[配图：" "$ARTICLE_FILE" || true)
if [ "$REMAINING" -gt 0 ]; then
    echo "⚠️ 警告: 还有 $REMAINING 个未识别的配图占位符"
    echo "未识别的占位符:"
    grep "\[配图：" "$ARTICLE_FILE" | head -5
else
    echo "✅ 所有配图占位符已替换完成"
fi

echo ""
echo "文章已更新: $ARTICLE_FILE"
echo "备份文件: ${ARTICLE_FILE}.bak"
