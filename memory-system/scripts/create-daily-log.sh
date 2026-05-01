#!/bin/bash
# 创建每日日志

DATE=$(date +%Y-%m-%d)
WEEKDAY=$(date +%A)
LOG_FILE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/memory-system/daily-logs/${DATE}.md"

if [ -f "$LOG_FILE" ]; then
  echo "今日日志已存在：$LOG_FILE"
  exit 0
fi

cat > "$LOG_FILE" << EOF
# 工作日志 - ${DATE}

## 📊 今日概览
- **日期**: ${DATE}
- **星期**: ${WEEKDAY}
- **工作时长**: -
- **讨论次数**: 0
- **完成项目**: 0

## 💬 讨论记录

*(讨论结束后自动添加)*

## 📌 项目进展

| 项目 | 进展 | 状态 |
|------|------|------|
| - | - | - |

## 📝 备注
- 

---
*最后更新：$(date +%Y-%m-%d\ %H:%M:%S)*
EOF

echo "✅ 已创建今日日志：$LOG_FILE"
