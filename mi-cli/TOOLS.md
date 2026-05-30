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

### 花叔 md↔html 流水线 (huashu-md-html)
安装位置: `~/.openclaw/skills/skills/huashu-md-html/`
Venv: `.venv/` (Python 3.x)

```bash
# 能力1: 万物→md (markitdown)
~/.openclaw/skills/skills/huashu-md-html/scripts/any_to_md.py input.pdf
~/.openclaw/skills/skills/huashu-md-html/scripts/any_to_md.py "https://example.com" -o output.md

# 能力2: md→精美html (pandoc + 4模板)
~/.openclaw/skills/skills/huashu-md-html/scripts/md_to_html.py article.md
~/.openclaw/skills/skills/huashu-md-html/scripts/md_to_html.py article.md --theme report
~/.openclaw/skills/skills/huashu-md-html/scripts/md_to_html.py article.md --theme reading
~/.openclaw/skills/skills/huashu-md-html/scripts/md_to_html.py article.md --theme interactive

# 能力3: html/URL→md (html-to-markdown + trafilatura)
~/.openclaw/skills/skills/huashu-md-html/scripts/html_to_md.py input.html
~/.openclaw/skills/skills/huashu-md-html/scripts/html_to_md.py "https://example.com/blog/post"
```

触发词: md转html, html转md, pdf转md, docx转md, 文件转md, URL转md, 做html, 生成html
