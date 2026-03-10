# main 工具速查表 - 幂家军系统总管

## 📚 技能管理规范

**标准路径**:
- 共享技能 → `~/.openclaw/skills/`
- 专属技能 → `<workspace>/<agent>/skills/`
- ❌ 禁止使用 `~/.agents/skills/`

**详见**: `main/docs/skill-management-sop.md`

---

## 🧰 核心技能 (11 个共享技能)

| 技能 | 用途 | 触发场景 |
|------|------|---------|
| `skill-feishu-docx-powerwrite` | 飞书文档生成 | 正式文档输出 |
| `self-improving` | 自我进化协议 | 任务复盘/错误纠正 |
| `agent-reach` | 全网内容触达 | 跨平台内容分发 |
| `baoyu-article-illustrator` | 文章配图 | 为文章生成插图 |
| `nano-banana-pro-prompts-recommend-skill` | AI 绘画提示词 | 图像生成需求 |
| `xiaohongshu` | 小红书工具 | 小红书内容运营 |
| `xiaohongshu-ops` | 小红书全链路 | 账号定位/内容生产/发布 |
| `canghe-markdown-to-html` | Markdown 转 HTML | 网页内容生成 |
| `canghe-post-to-wechat` | 发布到微信 | 公众号推送 |
| `canghe-url-to-markdown` | URL 转 Markdown | 网页内容提取 |
| `obsidian-sync` ⭐ | Obsidian 本地同步 | 文档归档/知识库同步 |

---

## 🔧 系统工具 (OpenClaw 内置)

### 会话管理
```bash
sessions_list          # 列出所有会话
sessions_send          # 发送消息到其他会话
sessions_spawn         # 派生子 Agent
session_status         # 查看会话状态 (📊)
```

### 子 Agent 编排
```bash
subagents list         # 列出子 Agent
subagents steer        # 指导子 Agent
subagents kill         # 终止子 Agent
```

### 系统执行
```bash
exec                   # 执行 shell 命令
process                # 管理后台进程
```

### 网络工具
```bash
web_search             # 搜索网络
web_fetch              # 提取网页内容
browser                # 浏览器自动化
```

---

## 📱 飞书工具 (feishu-openclaw-plugin)

### 文档与知识库
```bash
feishu_fetch_doc       # 读取文档
feishu_create_doc      # 创建文档
feishu_update_doc      # 更新文档
feishu_search_doc_wiki # 搜索文档/Wiki
feishu_wiki_space      # 知识库管理
feishu_wiki_space_node # 节点管理
```

### 多维表格
```bash
feishu_bitable_app            # 应用管理
feishu_bitable_app_table      # 数据表管理
feishu_bitable_app_table_field# 字段管理
feishu_bitable_app_table_record # 记录管理
feishu_bitable_app_table_view # 视图管理
```

### 日历与日程
```bash
feishu_calendar_calendar     # 日历管理
feishu_calendar_event        # 日程管理
feishu_calendar_event_attendee # 参会人管理
feishu_calendar_freebusy     # 忙闲查询
```

### 任务管理
```bash
feishu_task_task      # 任务管理
feishu_task_tasklist  # 清单管理
feishu_task_comment   # 评论管理
feishu_task_subtask   # 子任务管理
```

### IM 消息
```bash
feishu_im_user_message        # 发送消息
feishu_im_user_get_messages   # 获取消息
feishu_im_user_get_thread_messages # 话题消息
feishu_im_user_search_messages # 搜索消息
feishu_im_user_fetch_resource # 下载资源
feishu_im_bot_image           # 下载图片 (机器人身份)
```

### 云盘与表格
```bash
feishu_drive_file   # 文件管理
feishu_doc_comments # 文档评论
feishu_doc_media    # 文档媒体
feishu_sheet        # 电子表格
```

### 用户与组织
```bash
feishu_get_user      # 获取用户信息
feishu_search_user   # 搜索员工
feishu_chat          # 群聊管理
feishu_chat_members  # 群成员管理
```

### 授权管理
```bash
feishu_oauth          # OAuth 管理
feishu_oauth_batch_auth # 批量授权
```

---

## 🎯 常用命令组合

### 技能管理 SOP
```bash
# 1. 查看共享技能
ls ~/.openclaw/skills/

# 2. 查看专属技能
ls workspace/<agent>/skills/

# 3. 安装新技能 (ClawHub)
cd ~/.openclaw/skills && clawhub install <skill-slug>

# 4. 验证工具链
openclaw status
```

### 子 Agent 协作
```bash
# 并行派生
sessions_spawn --agent=mi-wen --task="写文案"
sessions_spawn --agent=mi-hua --task="配图"

# 状态监控
subagents list
session_status
```

### 文档双重产出
```bash
# 1. 生成 Markdown
write /tmp/report.md

# 2. 转飞书文档
feishu_create_doc --title="报告" --markdown="$(cat /tmp/report.md)"

# 3. 同步 Obsidian
cat /tmp/report.md >> /Volumes/My\ house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/report.md
```

---

## 📁 关键路径

| 类型 | 路径 |
|------|------|
| 共享技能目录 | `~/.openclaw/skills/` |
| 专属技能目录 | `<workspace>/<agent>/skills/` |
| 工作空间 | `/Volumes/My house/Users/Sheldon/.openclaw/workspace/` |
| 本地知识库 | `/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/` |
| 记忆系统 | `memory/YYYY-MM-DD.md` |
| 应用目录 | `/Volumes/My house/Users/Sheldon/.openclaw/apps/` |

---

*最后更新：2026-03-10*  
*技能恢复状态：V2.0 完成*  
*技能规范化：V1.0 完成*
