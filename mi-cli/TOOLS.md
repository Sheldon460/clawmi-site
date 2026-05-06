# mi-cli 工具速查表

## 🧰 核心工具

### 飞书 CLI (lark-cli)
```bash
# 查看日程
lark-cli calendar +agenda

# 搜索用户
lark-cli contact +search-user --query "关键词"

# 发送消息
lark-cli im +send --receive-id-type chat_id --receive-id "oc_xxx" --content '{"text":"消息"}'

# 查看群成员
lark-cli im +chat-members --chat-id "oc_xxx"
```

### OpenClaw 飞书工具
- `feishu_im_user_message` - 发送消息
- `feishu_im_user_get_messages` - 获取消息
- `feishu_calendar_event` - 日程管理
- `feishu_task_task` - 任务管理
- `feishu_bitable_app` - 多维表格
