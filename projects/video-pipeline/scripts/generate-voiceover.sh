#!/bin/bash
# Google Chirp3-HD TTS 配音生成脚本
# 使用方法: ./generate-voiceover.sh "要转换的文本" [输出文件名]

set -e

# 配置
CHIRP_BIN="/Volumes/My house/Users/Sheldon/go/bin/mcp-chirp3-go"
OUTPUT_DIR="$(cd "$(dirname "$0")/../public/voiceover" && pwd)"
VOICE="cmn-CN-Chirp3-HD-Charon"
PROJECT_ID="fluted-protocol-480308-p8"
GENMEDIA_BUCKET="bucket-0713"

# 检查参数
if [ $# -lt 1 ]; then
    echo "❌ 错误: 请提供要转换的文本"
    echo ""
    echo "用法:"
    echo "  $0 \"要转换的文本\" [输出文件名]"
    echo ""
    echo "示例:"
    echo "  $0 \"大家好，我是 Sheldon\" intro"
    exit 1
fi

TEXT="$1"
FILENAME="${2:-voiceover}"

# 导出环境变量
export PROJECT_ID
export GENMEDIA_BUCKET

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

echo "🎙️  Google Chirp3-HD TTS"
echo "========================"
echo ""
echo "📝 文本: $TEXT"
echo "🔊 语音: $VOICE"
echo "📁 输出: $OUTPUT_DIR/$FILENAME.wav"
echo ""

# 使用 Python 生成正确的 JSON
python3 << PYEOF
import json
import subprocess
import sys

request = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "chirp_tts",
        "arguments": {
            "text": "$TEXT",
            "voice_name": "$VOICE",
            "output_directory": "$OUTPUT_DIR",
            "output_filename_prefix": "$FILENAME"
        }
    }
}

json_str = json.dumps(request)
print(f"Sending JSON: {json_str}", file=sys.stderr)

result = subprocess.run(
    ["$CHIRP_BIN"],
    input=json_str,
    capture_output=True,
    text=True
)

print(result.stdout)
print(result.stderr, file=sys.stderr)

if "saved to" in result.stdout:
    print("✅ 配音生成成功!")
else:
    print("❌ 配音生成失败")
    sys.exit(1)
PYEOF

if [ $? -eq 0 ]; then
    echo ""
    # 查找生成的文件
    LATEST_FILE=$(ls -t "$OUTPUT_DIR"/*.wav 2>/dev/null | head -1)
    if [ -n "$LATEST_FILE" ]; then
        SIMPLE_NAME="$OUTPUT_DIR/${FILENAME}.wav"
        mv "$LATEST_FILE" "$SIMPLE_NAME" 2>/dev/null || true
        echo "📄 文件: $SIMPLE_NAME"
        ls -lh "$SIMPLE_NAME" 2>/dev/null | awk '{print "💾 大小: " $5}'
        echo ""
        echo "✨ 完成!"
    fi
fi
