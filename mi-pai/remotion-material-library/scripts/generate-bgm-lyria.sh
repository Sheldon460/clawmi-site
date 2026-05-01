#!/bin/bash
# 使用 Google Lyria MCP 生成 BGM

set -e

PROJECT_ID="fluted-protocol-480308-p8"
BUCKET="bucket-0713"
OUTPUT_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/remotion-material-library/public/audio"
OUTPUT_FILE="$OUTPUT_DIR/bgm.mp3"

# 确保输出目录存在
mkdir -p "$OUTPUT_DIR"

echo "Generating BGM with Google Lyria..."
echo "Project: $PROJECT_ID"
echo "Bucket: $BUCKET"

# 创建临时提示词文件
PROMPT=$(cat <<'EOF'
Create a modern tech-inspired background music track for a productivity/automation tutorial video.

Style: Electronic ambient with subtle synth arpeggios
Mood: Professional, inspiring, forward-thinking, calm
Tempo: 120 BPM
Duration: 120 seconds

Characteristics:
- Clean, minimal electronic sound
- Gentle pulsing bass
- Atmospheric pads
- Subtle digital textures
- No drums or percussion (ambient focus)
- Suitable for technology/productivity content
- Seamless loopable
- Non-distracting background music

The music should evoke feelings of innovation, efficiency, and modern workflow automation.
Think: futuristic office, AI assistance, streamlined productivity.
EOF
)

# 使用 Lyria MCP 生成音乐
# 注意：Lyria 生成的是到 GCS 的链接，我们需要下载
export PROJECT_ID
export GENMEDIA_BUCKET="$BUCKET"

# 创建 JSON-RPC 请求
JSON_REQ=$(cat <<EOF
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "generate_music",
    "arguments": {
      "prompt": "$PROMPT",
      "duration": 120,
      "style": "ambient_electronic"
    }
  }
}
EOF
)

echo "Sending request to Lyria..."
echo "$JSON_REQ" | GENMEDIA_BUCKET="$BUCKET" PROJECT_ID="$PROJECT_ID" mcp-lyria-go

echo "BGM generation initiated. Check GCS bucket for output."
