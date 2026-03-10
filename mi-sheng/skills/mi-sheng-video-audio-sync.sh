#!/bin/bash
# mi-sheng-video-audio-sync.sh - 幂声音画同步合成脚本
# 用途：与 mi-ying (视频组) 协作，为视频添加配音/背景音乐
# 使用：./mi-sheng-video-audio-sync.sh 视频文件.mp4 音频文件.mp3 [输出文件.mp4]

set -e

# 参数检查
if [ $# -lt 2 ]; then
    echo "🎬 幂声音画同步工具"
    echo "==========================================="
    echo ""
    echo "用法：$0 视频文件.mp4 音频文件.mp3 [输出文件.mp4]"
    echo ""
    echo "参数说明:"
    echo "  视频文件  - 输入视频 (必填)"
    echo "  音频文件  - 输入音频 (必填，配音或背景音乐)"
    echo "  输出文件  - 输出视频 (可选，默认：output-时间戳.mp4)"
    echo ""
    echo "示例:"
    echo "  $0 video.mp4 voice.mp3"
    echo "  $0 raw.mp4 bgm.mp3 final.mp4"
    echo ""
    exit 1
fi

VIDEO="$1"
AUDIO="$2"
OUTPUT="${3:-output-$(date +%Y%m%d-%H%M%S).mp4}"

# 文件检查
if [ ! -f "$VIDEO" ]; then
    echo "❌ 错误：视频文件不存在 - $VIDEO"
    exit 1
fi

if [ ! -f "$AUDIO" ]; then
    echo "❌ 错误：音频文件不存在 - $AUDIO"
    exit 1
fi

echo "🎬 幂声音画同步合成中..."
echo "==========================================="
echo "📹 视频：$VIDEO"
echo "🎵 音频：$AUDIO"
echo "💾 输出：$OUTPUT"
echo ""

# 获取视频时长
video_duration=$(ffprobe -i "$VIDEO" -show_entries format=duration -v quiet -of csv="p=0" 2>/dev/null)
audio_duration=$(ffprobe -i "$AUDIO" -show_entries format=duration -v quiet -of csv="p=0" 2>/dev/null)

echo "⏱️  视频时长：${video_duration}s"
echo "⏱️  音频时长：${audio_duration}s"
echo ""

# 判断音频处理策略
if (( $(echo "$audio_duration > $video_duration" | bc -l) )); then
    echo "📌 策略：音频长于视频，将裁剪音频适配视频"
    ffmpeg_args="-shortest"
else
    echo "📌 策略：音频短于视频，将循环音频或保留原音"
    ffmpeg_args=""
fi

echo ""
echo "🔄 开始合成..."

# 执行合成
# -c:v copy: 视频流直接复制 (不重新编码，快速)
# -c:a aac: 音频编码为 AAC (兼容性最好)
# -b:a 192k: 音频比特率 192kbps (高质量)
if ffmpeg -y -i "$VIDEO" -i "$AUDIO" $ffmpeg_args -c:v copy -c:a aac -b:a 192k "$OUTPUT" 2>/dev/null; then
    echo ""
    echo "==========================================="
    echo "✅ 音画合成成功：$OUTPUT"
    echo ""
    
    # 显示输出文件信息
    output_duration=$(ffprobe -i "$OUTPUT" -show_entries format=duration -v quiet -of csv="p=0" 2>/dev/null)
    printf "⏱️  输出时长：%.2f 秒\n" "$output_duration"
    
    output_size=$(ls -lh "$OUTPUT" | awk '{print $5}')
    echo "📦 文件大小：$output_size"
    
    echo ""
    echo "✨ 视频已准备就绪，可交付给 mi-ying 或直接发布"
else
    echo ""
    echo "❌ 合成失败，请检查："
    echo "   1. 视频/音频文件是否损坏"
    echo "   2. ffmpeg 是否正确安装 (ffmpeg -version)"
    echo "   3. 磁盘空间是否充足"
    exit 1
fi

exit 0
