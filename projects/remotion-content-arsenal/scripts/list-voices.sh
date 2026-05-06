#!/bin/bash
# 列出可用的 Chirp3-HD 语音

CHIRP_BIN="/Volumes/My house/Users/Sheldon/go/bin/mcp-chirp3-go"
PROJECT_ID="fluted-protocol-480308-p8"
GENMEDIA_BUCKET="bucket-0713"

export PROJECT_ID
export GENMEDIA_BUCKET

echo "🔊 Google Chirp3-HD 可用语音列表"
echo "================================"
echo ""

# 查询中文语音
JSON_REQUEST='{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_chirp_voices","arguments":{"language":"Chinese"}}}'

RESULT=$(echo "$JSON_REQUEST" | "$CHIRP_BIN" 2>&1)

# 提取并格式化输出
echo "$RESULT" | grep -oE '"name": "[^"]+", "language_code": "[^"]+", "gender": "[^"]+"' | while read -r line; do
    NAME=$(echo "$line" | grep -oE '"name": "[^"]+"' | cut -d'"' -f4)
    GENDER=$(echo "$line" | grep -oE '"gender": "[^"]+"' | cut -d'"' -f4)
    
    # 只显示中文语音
    if [[ "$NAME" == *"cmn-CN"* ]]; then
        # 提取语音代号
        VOICE_ID=$(echo "$NAME" | sed 's/cmn-CN-Chirp3-HD-//')
        
        # 标记推荐语音
        MARK=""
        [ "$VOICE_ID" == "Charon" ] && MARK=" ⭐推荐"
        
        echo "  $NAME"
        echo "    性别: $GENDER$MARK"
        echo ""
    fi
done

echo ""
echo "💡 使用说明:"
echo "  在生成配音时，可以通过环境变量指定语音:"
echo "  export VOICE=cmn-CN-Chirp3-HD-Charon"
echo ""
echo "  或者在脚本中修改 VOICE 变量"
