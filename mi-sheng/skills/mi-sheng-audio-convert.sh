#!/bin/bash
# mi-sheng-audio-convert.sh - 幂声音频格式批量转换脚本
# 用途：批量转换音频为飞书 OPUS 格式 (32kbps)
# 使用：./mi-sheng-audio-convert.sh file1.mp3 file2.wav ...

set -e

if [ $# -eq 0 ]; then
    echo "❌ 错误：请提供音频文件路径"
    echo "用法：$0 file1.mp3 file2.wav ..."
    exit 1
fi

echo "🎵 幂声音频转换器 - 批量转换为 OPUS 格式"
echo "==========================================="

converted=0
failed=0

for file in "$@"; do
    if [ ! -f "$file" ]; then
        echo "⚠️  跳过 (文件不存在): $file"
        ((failed++))
        continue
    fi
    
    # 生成输出文件名 (替换扩展名为 .opus)
    output="${file%.*}.opus"
    
    echo "🔄 转换中：$file → $output"
    
    # 使用 ffmpeg 转换为 OPUS (32kbps, 飞书推荐)
    if ffmpeg -y -i "$file" -c:a libopus -b:a 32k "$output" 2>/dev/null; then
        echo "✅ 成功：$output"
        ((converted++))
    else
        echo "❌ 失败：$file"
        ((failed++))
    fi
done

echo "==========================================="
echo "📊 转换完成：成功 $converted 个，失败 $failed 个"

if [ $converted -gt 0 ]; then
    echo "✨ 所有 OPUS 文件已准备就绪，可直接用于飞书消息"
fi

exit 0
