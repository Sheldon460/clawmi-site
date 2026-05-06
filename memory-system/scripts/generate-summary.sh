#!/bin/bash
# 生成讨论摘要

if [ -z "$1" ]; then
  echo "用法：$0 [讨论 ID]"
  echo "示例：$0 20260325-1435-001"
  exit 1
fi

DISCUSSION_ID=$1
DATE=$(echo $DISCUSSION_ID | cut -d'-' -f1 | sed 's/\(....\)\(..\)\(..\)/\1-\2-\3/')
SUMMARY_FILE="/Volumes/My house/Users/Sheldon/.openclaw/workspace/memory-system/summaries/${DISCUSSION_ID}.md"

cat > "$SUMMARY_FILE" << EOF
# 讨论摘要 - [待填写主题]

## 📋 基本信息
- **日期**: ${DATE}
- **讨论 ID**: ${DISCUSSION_ID}
- **参与人**: 
- **持续时间**: 分钟

## 🎯 讨论主题


## 💡 关键决策
1. 
2. 

## ✅ 已完成事项
- [ ] 

## 📌 待办追踪
| 任务 | 负责人 | 状态 | 截止 |
|------|--------|------|------|
|  |  | 待办 |  |

## 🔗 关联项目
- 

## 📎 相关资源
- 

---
*创建时间：$(date +%Y-%m-%d\ %H:%M:%S)*
EOF

echo "✅ 已创建摘要模板：$SUMMARY_FILE"
echo "📝 请编辑文件填写详细内容"
