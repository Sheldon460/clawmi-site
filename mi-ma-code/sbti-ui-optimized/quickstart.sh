#!/bin/bash

# SBTI 测试网站快速启动脚本

echo "🚀 SBTI 测试网站 - 快速启动"
echo "================================"

# 检查 Node.js 是否安装
if ! command -v node &> /dev/null; then
    echo "❌ 错误：未安装 Node.js，请先安装 Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo "✅ npm 版本: $(npm -v)"

# 检查依赖是否已安装
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 正在安装依赖..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 错误：依赖安装失败"
        exit 1
    fi
    echo "✅ 依赖安装完成"
else
    echo "✅ 依赖已安装"
fi

echo ""
echo "🎯 启动开发服务器..."
echo "📍 访问地址：http://localhost:3000"
echo ""
echo "按 Ctrl+C 停止服务器"
echo "================================"

# 启动开发服务器
npm run dev
