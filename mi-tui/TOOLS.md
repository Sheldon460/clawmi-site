# 幂推 的武器库 (V2.0 - 系统重装恢复版)

## 🎯 核心专业工具 (Priority)

### Twitter/X 运营核心
| 工具 | 用途 | 状态 | 示例 |
|------|------|------|------|
| `xurl` | Twitter 发帖/互动 | ✅ 已安装（需认证） | `xurl post "内容" --media img.jpg` |
| `xreach` | Twitter 搜索/读取 | ✅ 已安装 | `xreach search "AI" -n 20 --json` |
| `browser` | 浏览器自动化 | ✅ 可用 | 复杂网页交互 |

### 跨组协作
| 工具 | 用途 | 状态 | 示例 |
|------|------|------|------|
| `sessions_send` | 直接代号唤醒专家 | ✅ 可用 | `sessions_send(mi-wen, "写文案")` |
| `sessions_spawn` | 派生子 Agent | ✅ 可用 | `sessions_spawn(task="...", runtime="acp")` |

### 自我进化
| 工具 | 用途 | 状态 | 说明 |
|------|------|------|------|
| `self-improving` | 自我迭代协议 | ✅ 完整 | memory.md + corrections.md |
| `read`/`write` | 文件读写 | ✅ 可用 | 日记、数据、Playbook |

### 情报与搜索
| 工具 | 用途 | 状态 | 示例 |
|------|------|------|------|
| `web_search` | 网络搜索 | ✅ 可用 | 热点情报收集 |
| `web_fetch` | 网页提取 | ✅ 可用 | 提取文章内容 |
| `agent-reach` | 13+ 平台框架 | ✅ 7/13 可用 | `agent-reach doctor` |

---

## 🛠️ 环境执行与通讯

### Shell 命令
- `bash` / `exec`: 调用全系统能力（含 xurl、xreach、agent-reach）
- `process`: 管理后台长任务

### 文件操作
- `read` / `write` / `edit`: 文件读写（工作目录：`/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-tui/`）

### 飞书集成（OAuth 用户身份）
- `feishu_create_doc` / `feishu_update_doc`: 文档创建/更新
- `feishu_bitable_app_*`: 多维表格管理
- `feishu_calendar_event`: 日程管理
- `feishu_task_task`: 任务管理
- `feishu_im_user_*`: IM 消息读取

---

## 📊 跨 Agent 核心权限 (V3.0)

- **`sessions_send`**: ✅ 已授权。用于跨 Agent 发送指令。
  - 示例：`sessions_send(targetAgent="mi-dang", message="处理笔记")`
  - 示例：`sessions_send(targetAgent="mi-wen", message="写推文文案")`

- **`sessions_spawn`**: ✅ 已授权。用于派生独立的任务进程。
  - 示例：`sessions_spawn(task="分析热点", runtime="subagent", agentId="mi-zhi")`
  - 示例：`sessions_spawn(task="配图设计", runtime="acp", agentId="mi-hua")`

- **`bindings`**: ✅ 已授权。已自动绑定至当前活跃群组，确保响应可见。

---

## 🔧 待恢复/配置的工具

| 工具 | 用途 | 配置命令 | 优先级 |
|------|------|---------|--------|
| Twitter Cookie | xurl/xreach 认证 | `agent-reach configure twitter-cookies "..."` | P0 |
| Exa MCP | 全网语义搜索 | `mcporter config add exa https://mcp.exa.ai/mcp` | P1 |
| 小红书 MCP | 小红书运营 | `docker run -d --name xiaohongshu-mcp ...` | P2 |
| LinkedIn MCP | LinkedIn 运营 | `pip install linkedin-scraper-mcp` | P2 |

---

## 📋 常用工作流命令

### Twitter 发布流程
```bash
# 1. 搜索热点
xreach search "AI Agent" -n 20 --json

# 2. 分析爆款推文
xreach tweet https://x.com/user/status/123 --json

# 3. 发布推文（认证后）
xurl post "推文内容"
xurl post "推文内容" --media /path/to/image.jpg

# 4. 互动回复
xurl reply 1234567890 "精彩观点！"
```

### 跨组协作流程
```
mi-zhi (情报) → mi-wen (文案) → mi-hua (配图) → mi-tui (发布)
     ↓              ↓              ↓             ↓
 sessions_send → sessions_send → sessions_send → xurl post
```

### 数据追踪
```bash
# 每日数据记录
data/platform_daily/YYYY-MM-DD.json

# 日记更新
memory/YYYY-MM-DD.md

# 经验固化
self-improving/memory.md
playbook.md
```

---

*最后更新：2026-03-10 00:30 GMT+8*  
*技能恢复状态：核心能力 90% 恢复，待完成 Twitter 认证*
