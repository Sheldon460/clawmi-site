#!/bin/bash
PROJECT_ROOT="/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site"
cd "$PROJECT_ROOT"

echo "🚀 开始自动化生产部署..."

# 升级依赖并构建
npm install && npm run build

if [ $? -eq 0 ]; then
    echo "✅ 构建成功，正在推送到 Vercel..."
    # 强制以静态站点模式部署 out 目录到指定项目
    npx --yes vercel deploy out --prod --name clawmi-site --yes
else
    echo "❌ 构建失败，取消部署。"
    exit 1
fi
