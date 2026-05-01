#!/bin/bash
# 修复 HTML 图片路径脚本

HTML_FILE="$1"

if [ -z "$HTML_FILE" ]; then
    echo "Usage: $0 <html-file>"
    exit 1
fi

# 修复双重路径问题
# 将 data-local-path=".../2-初稿打磨区/03-内容工厂/..." 替换为正确的绝对路径
sed -i '' 's|data-local-path="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/2-初稿打磨区/03-内容工厂/3-配图成品区/|src="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/|g' "$HTML_FILE"

# 删除 src="MDTOHTMLIMGPH_X" 的占位符，使用正确的 src
sed -i '' 's|src="MDTOHTMLIMGPH_[0-9]*" ||g' "$HTML_FILE"

echo "图片路径修复完成: $HTML_FILE"
