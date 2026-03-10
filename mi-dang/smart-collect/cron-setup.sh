#!/bin/bash
#
# 智能收藏回顾系统 - 定时任务设置脚本
# 每天早上9:30运行回顾推送
#

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REVIEW_SCRIPT="${SCRIPT_DIR}/shoucang-review.js"

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到 Node.js，请先安装"
    exit 1
fi

echo "📅 智能收藏回顾系统 - 定时任务设置"
echo "═══════════════════════════════════════"
echo ""

# 检测操作系统
OS="$(uname -s)"

case "${OS}" in
    Linux*)
        echo "🐧 检测到 Linux 系统"
        # 检查是否使用 systemd
        if command -v systemctl &> /dev/null; then
            echo "使用 systemd timer 设置定时任务..."

            # 创建 systemd service
            SERVICE_FILE="${HOME}/.config/systemd/user/smart-collect.service"
            TIMER_FILE="${HOME}/.config/systemd/user/smart-collect.timer"

            mkdir -p "$(dirname "$SERVICE_FILE")"

            cat > "$SERVICE_FILE" << EOF
[Unit]
Description=Smart Collect Daily Review

[Service]
Type=oneshot
ExecStart=/usr/bin/node ${REVIEW_SCRIPT} --push
WorkingDirectory=${SCRIPT_DIR}
Environment="PATH=/usr/local/bin:/usr/bin:/bin"

[Install]
WantedBy=default.target
EOF

            cat > "$TIMER_FILE" << EOF
[Unit]
Description=Smart Collect Daily Review Timer

[Timer]
OnCalendar=*-*-* 09:30:00
Persistent=true

[Install]
WantedBy=timers.target
EOF

            systemctl --user daemon-reload
            systemctl --user enable smart-collect.timer
            systemctl --user start smart-collect.timer

            echo "✅ systemd timer 已设置"
            systemctl --user list-timers smart-collect.timer
        else
            # 使用 cron
            echo "使用 cron 设置定时任务..."
            CRON_JOB="30 9 * * * cd \"${SCRIPT_DIR}\" && /usr/bin/node ${REVIEW_SCRIPT} --push >> ${SCRIPT_DIR}/cron.log 2>&1"

            # 检查是否已存在
            if crontab -l 2>/dev/null | grep -q "smart-collect"; then
                echo "⚠️  定时任务已存在，跳过设置"
            else
                (crontab -l 2>/dev/null; echo "$CRON_JOB") | crontab -
                echo "✅ cron 任务已添加"
            fi
        fi
        ;;

    Darwin*)
        echo "🍎 检测到 macOS 系统"

        # 使用 launchd
        PLIST_FILE="${HOME}/Library/LaunchAgents/com.sheldon.smart-collect.plist"

        cat > "$PLIST_FILE" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.sheldon.smart-collect</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>${REVIEW_SCRIPT}</string>
        <string>--push</string>
    </array>
    <key>WorkingDirectory</key>
    <string>${SCRIPT_DIR}</string>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Hour</key>
        <integer>9</integer>
        <key>Minute</key>
        <integer>30</integer>
    </dict>
    <key>StandardOutPath</key>
    <string>${SCRIPT_DIR}/cron.log</string>
    <key>StandardErrorPath</key>
    <string>${SCRIPT_DIR}/cron-error.log</string>
</dict>
</plist>
EOF

        # 加载 plist
        launchctl unload "$PLIST_FILE" 2>/dev/null
        launchctl load "$PLIST_FILE"

        echo "✅ launchd 任务已设置"
        echo "📍 配置文件: $PLIST_FILE"
        ;;

    *)
        echo "❌ 不支持的操作系统: ${OS}"
        exit 1
        ;;
esac

echo ""
echo "═══════════════════════════════════════"
echo "✅ 定时任务设置完成!"
echo "⏰ 每天 9:30 将自动推送回顾提醒"
echo "📁 日志文件: ${SCRIPT_DIR}/cron.log"
echo ""
echo "手动测试命令:"
echo "  node ${REVIEW_SCRIPT} --push"
