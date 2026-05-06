#!/bin/bash

echo "=== Clawmi 网站预览助手 (v3.0 活体重构版) ==="
echo "1. 完整预览 (npm install + next dev) - 适合交互开发"
echo "2. 快速预览 (构建并启动静态服务器) - 适合查看最终视觉效果"
read -p "请选择 (1/2): " choice

if [ "$choice" == "1" ]; then
    echo "正在安装依赖..."
    npm install
    echo "正在启动开发服务器..."
    npm run dev
elif [ "$choice" == "2" ]; then
    echo "正在进行静态构建 (导出 dist 目录)..."
    npm install && npm run build
    echo "正在启动静态服务器 (端口 8888)..."
    python3 -m http.server 8888 --directory dist
else
    echo "无效选择。"
fi
