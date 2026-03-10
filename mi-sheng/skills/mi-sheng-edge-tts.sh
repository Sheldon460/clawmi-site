#!/bin/bash
# mi-sheng-edge-tts.sh - 幂声 Edge TTS 快速合成脚本
# 用途：使用微软 Edge TTS 快速生成中文语音
# 使用：./mi-sheng-edge-tts.sh "要合成的文本" [输出文件.mp3] [语音 ID]

set -e

# 默认参数
DEFAULT_VOICE="zh-CN-YunxiNeural"  # 默认男声 (新闻/小说风格)
DEFAULT_OUTPUT="mi-sheng-output-$(date +%Y%m%d-%H%M%S).mp3"

# 参数解析
TEXT="$1"
OUTPUT="${2:-$DEFAULT_OUTPUT}"
VOICE="${3:-$DEFAULT_VOICE}"

# 帮助信息
if [ -z "$TEXT" ] || [ "$1" == "-h" ] || [ "$1" == "--help" ]; then
    echo "🎙️  幂声 Edge TTS 快速合成工具"
    echo "==========================================="
    echo ""
    echo "用法：$0 \"要合成的文本\" [输出文件.mp3] [语音 ID]"
    echo ""
    echo "参数说明:"
    echo "  文本        - 要合成的文字内容 (必填，用引号包裹)"
    echo "  输出文件    - 输出 MP3 文件名 (可选，默认：mi-sheng-output-时间戳.mp3)"
    echo "  语音 ID     - 语音引擎 (可选，默认：zh-CN-YunxiNeural)"
    echo ""
    echo "可用中文语音:"
    echo "  女声:"
    echo "    zh-CN-XiaoxiaoNeural  - 温暖 (新闻/小说)"
    echo "    zh-CN-XiaoyiNeural    - 活泼 (卡通/小说)"
    echo "    zh-CN-liaoning-XiaobeiNeural - 幽默 (东北方言)"
    echo "    zh-CN-shaanxi-XiaoniNeural   - 明快 (陕西方言)"
    echo ""
    echo "  男声:"
    echo "    zh-CN-YunxiNeural     - 阳光 (小说) ⭐ 默认"
    echo "    zh-CN-YunjianNeural   - 激情 (体育/小说)"
    echo "    zh-CN-YunxiaNeural    - 可爱 (卡通/小说)"
    echo "    zh-CN-YunyangNeural   - 专业 (新闻)"
    echo ""
    echo "示例:"
    echo "  $0 \"你好，这是测试语音\""
    echo "  $0 \"欢迎收看\" output.mp3 zh-CN-YunyangNeural"
    echo ""
    exit 0
fi

echo "🎙️  幂声 Edge TTS 合成中..."
echo "==========================================="
echo "📝 文本：$TEXT"
echo "🎵 语音：$VOICE"
echo "💾 输出：$OUTPUT"
echo ""

# 执行 TTS 合成
if edge-tts --voice "$VOICE" --text "$TEXT" --write-media "$OUTPUT"; then
    echo ""
    echo "==========================================="
    echo "✅ 合成成功：$OUTPUT"
    echo ""
    
    # 显示文件信息
    if command -v ffprobe &> /dev/null; then
        duration=$(ffprobe -i "$OUTPUT" -show_entries format=duration -v quiet -of csv="p=0" 2>/dev/null)
        if [ -n "$duration" ]; then
            printf "⏱️  时长：%.2f 秒\n" "$duration"
        fi
    fi
    
    # 显示文件大小
    if command -v ls &> /dev/null; then
        size=$(ls -lh "$OUTPUT" | awk '{print $5}')
        echo "📦 大小：$size"
    fi
    
    echo ""
    echo "✨ 音频已准备就绪"
else
    echo ""
    echo "❌ 合成失败，请检查："
    echo "   1. edge-tts 是否正确安装 (edge-tts --version)"
    echo "   2. 网络连接是否正常"
    echo "   3. 语音 ID 是否正确 (edge-tts --list-voices)"
    exit 1
fi

exit 0
