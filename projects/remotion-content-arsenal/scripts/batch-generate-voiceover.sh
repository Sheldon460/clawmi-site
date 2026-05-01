#!/bin/bash
# 批量生成配音脚本
# 从文本文件读取，逐行生成配音

set -e

CHIRP_BIN="/Volumes/My house/Users/Sheldon/go/bin/mcp-chirp3-go"
OUTPUT_DIR="$(dirname "$0")/../public/voiceover"
VOICE="cmn-CN-Chirp3-HD-Charon"
PROJECT_ID="fluted-protocol-480308-p8"
GENMEDIA_BUCKET="bucket-0713"

export PROJECT_ID
export GENMEDIA_BUCKET

# 检查输入文件
if [ $# -lt 1 ]; then
    echo "❌ 错误: 请提供文本文件"
    echo ""
    echo "用法:"
    echo "  $0 <文本文件> [前缀]"
    echo ""
    echo "文本文件格式 (每行一个):"
    echo "  大家好，我是 Sheldon"
    echo "  今天我们来聊聊养虾"
    echo "  ..."
    exit 1
fi

INPUT_FILE="$1"
PREFIX="${2:-scene}"

if [ ! -f "$INPUT_FILE" ]; then
    echo "❌ 错误: 文件不存在: $INPUT_FILE"
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "🎙️  批量配音生成"
echo "================"
echo ""
echo "📖 输入文件: $INPUT_FILE"
echo "🔊 语音: $VOICE"
echo "📁 输出目录: $OUTPUT_DIR"
echo ""

# 读取文件并逐行生成
LINE_NUM=0
while IFS= read -r line || [[ -n "$line" ]]; do
    # 跳过空行
    [ -z "$line" ] && continue
    
    LINE_NUM=$((LINE_NUM + 1))
    FILENAME=$(printf "%s-%02d" "$PREFIX" "$LINE_NUM")
    
    echo "[$LINE_NUM] 生成: $line"
    
    # 生成配音
    JSON_REQUEST=$(cat <<EOF
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "chirp_tts",
    "arguments": {
      "text": "$line",
      "voice_name": "$VOICE",
      "output_directory": "$OUTPUT_DIR",
      "output_filename_prefix": "$FILENAME"
    }
  }
}
EOF
)
    
    RESULT=$(echo "$JSON_REQUEST" | "$CHIRP_BIN" 2>&1)
    
    if echo "$RESULT" | grep -q "saved to"; then
        # 简化文件名
        GENERATED_FILE=$(echo "$RESULT" | grep -oE "/Volumes/My house/Users/Sheldon/.openclaw/workspace/projects/video-pipeline/public/voiceover/[^\"]+\.wav" | head -1)
        if [ -n "$GENERATED_FILE" ] && [ -f "$GENERATED_FILE" ]; then
            SIMPLE_NAME="$OUTPUT_DIR/${FILENAME}.wav"
            mv "$GENERATED_FILE" "$SIMPLE_NAME" 2>/dev/null || true
            echo "    ✅ $SIMPLE_NAME"
        fi
    else
        echo "    ❌ 失败"
    fi
    
    # 短暂延迟避免 API 限制
    sleep 0.5
    
done < "$INPUT_FILE"

echo ""
echo "✨ 批量生成完成!"
echo "📁 文件保存在: $OUTPUT_DIR"
ls -lh "$OUTPUT_DIR"
