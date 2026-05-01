#!/bin/bash
# check-image-format.sh - 图片格式检查与转换脚本
# 版本: V1.0
# 用途: SOP V2.3 发布前格式检查

set -e

# 参数检查
if [ $# -lt 1 ]; then
    echo "用法: $0 <图片目录>"
    echo "示例: $0 ./images/"
    exit 1
fi

IMAGE_DIR="$1"

if [ ! -d "$IMAGE_DIR" ]; then
    echo "❌ 错误: 图片目录不存在: $IMAGE_DIR"
    exit 1
fi

echo "======================================"
echo "  图片格式检查与转换工具 V1.0"
echo "======================================"
echo "检查目录: $IMAGE_DIR"
echo ""

# 计数器
SVG_COUNT=0
CONVERTED_COUNT=0
ERROR_COUNT=0

# 遍历所有图片文件
for file in "$IMAGE_DIR"/*.{svg,png,jpg,jpeg} 2>/dev/null; do
    [ -e "$file" ] || continue
    
    filename=$(basename "$file")
    echo "检查: $filename"
    
    # 检查 SVG 格式
    if [[ "$file" == *.svg ]]; then
        echo "  ⚠️  发现 SVG 格式，正在转换为 PNG..."
        
        # 尝试转换
        if convert "$file" "${file%.svg}.png" 2>/dev/null; then
            echo "  ✅ ImageMagick 转换成功"
        elif sips -s format png "$file" --out "${file%.svg}.png" 2>/dev/null; then
            echo "  ✅ sips 转换成功"
        else
            echo "  ❌ 转换失败: $file"
            ((ERROR_COUNT++))
            continue
        fi
        
        # 删除原 SVG
        rm "$file"
        echo "  ✅ 已删除原 SVG: $file"
        ((SVG_COUNT++))
        ((CONVERTED_COUNT++))
    fi
    
    # 检查 PNG/JPG 文件大小
    if [[ "$file" == *.png || "$file" == *.jpg || "$file" == *.jpeg ]]; then
        filesize=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        filesize_mb=$((filesize / 1024 / 1024))
        
        if [ "$filesize_mb" -gt 2 ]; then
            echo "  ⚠️  文件过大: ${filesize_mb}MB，建议压缩到 2MB 以内"
        fi
    fi
done

echo ""
echo "======================================"
echo "  检查结果"
echo "======================================"
echo "SVG 文件数: $SVG_COUNT"
echo "转换成功: $CONVERTED_COUNT"
echo "转换失败: $ERROR_COUNT"

if [ "$ERROR_COUNT" -gt 0 ]; then
    echo ""
    echo "❌ 检查未通过，请修复后重试"
    exit 1
fi

# 最终验证
REMAINING_SVG=$(find "$IMAGE_DIR" -name "*.svg" | wc -l)
if [ "$REMAINING_SVG" -gt 0 ]; then
    echo ""
    echo "❌ 仍有 $REMAINING_SVG 个 SVG 文件未转换"
    exit 1
fi

echo ""
echo "✅ 所有图片格式检查通过（PNG/JPG only）"
echo "✅ 可以安全发布到公众号"
