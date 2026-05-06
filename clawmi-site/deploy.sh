#!/bin/bash
# Clawmi 网站一键部署脚本
# 包含自动更新别名配置

set -e

# 从环境变量读取 Token（避免泄露）
if [ -z "$VERCEL_TOKEN" ]; then
    echo "❌ 错误：请设置 VERCEL_TOKEN 环境变量"
    echo "   export VERCEL_TOKEN=\"your_token_here\""
    exit 1
fi

ALIAS="clawmi-site.vercel.app"

echo "🚀 开始部署..."

# 执行生产部署
DEPLOY_OUTPUT=$(npx vercel --prod --token="$VERCEL_TOKEN" 2>&1)

echo "$DEPLOY_OUTPUT"

# 提取最新部署域名
LATEST_DEPLOY=$(echo "$DEPLOY_OUTPUT" | grep -oP 'Production: \Khttps://[^\s]+')

if [ -n "$LATEST_DEPLOY" ]; then
    echo "✅ 部署成功：$LATEST_DEPLOY"
    echo "🔄 更新别名..."
    
    # 更新别名指向最新部署
    npx vercel alias set "$LATEST_DEPLOY" "$ALIAS" --token="$VERCEL_TOKEN"
    
    echo "✅ 别名已更新：https://$ALIAS"
    echo ""
    echo "🌐 访问地址：https://$ALIAS"
else
    echo "❌ 部署失败"
    exit 1
fi
