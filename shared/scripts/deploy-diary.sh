#!/bin/bash
# Clawmi 日记自动部署脚本
# 解决路径空格问题，供 crontab 调用

# 设置工作目录（使用 cd 命令避免路径空格问题）
cd "/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site" || exit 1

# 日志文件
LOG_FILE="/tmp/clawmi-diary-deploy.log"

echo "===== $(date '+%Y-%m-%d %H:%M:%S') =====" >> "$LOG_FILE"

# 检查是否有新的日记内容需要部署
# 这里可以添加逻辑判断是否需要部署

# 执行 Vercel 部署
echo "开始部署..." >> "$LOG_FILE"
npx vercel --prod \
  --token="***REMOVED***" \
  --yes >> "$LOG_FILE" 2>&1

DEPLOY_STATUS=$?

if [ $DEPLOY_STATUS -eq 0 ]; then
    echo "✅ 部署成功" >> "$LOG_FILE"
    # 可选：发送通知到飞书
else
    echo "❌ 部署失败，状态码: $DEPLOY_STATUS" >> "$LOG_FILE"
fi

echo "" >> "$LOG_FILE"
exit $DEPLOY_STATUS
