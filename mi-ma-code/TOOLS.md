# TOOLS.md - 幂码 - 编程 武器库 V2.0

> 系统重装后技能恢复清单 | 最后更新：2026-03-10

---

## 🎯 核心专业工具（优先级 P0）

### 代码生成与复刻
| 工具 | 路径/命令 | 关键配置 | 状态 |
|------|----------|---------|------|
| **coding-agent** | `/usr/local/lib/node_modules/openclaw/skills/coding-agent/SKILL.md` | `pty: true` (必须!) | ✅ 可用 |
| **gemini** | `/usr/local/lib/node_modules/openclaw/skills/gemini/SKILL.md` | 一键 Q&A | ✅ 可用 |
| **github** | `/usr/local/lib/node_modules/openclaw/skills/github/SKILL.md` | `gh` CLI | ✅ 可用 |
| **gh-issues** | `/usr/local/lib/node_modules/openclaw/skills/gh-issues/SKILL.md` | Issues 自动化 | ✅ 可用 |
| **github-mcp** | `/usr/local/lib/node_modules/openclaw/skills/github-mcp/SKILL.md` | 需 `GITHUB_MCP_PAT` | ⚠️ 待配置 |

### 工作流编排
| 工具 | 路径/命令 | 用途 | 状态 |
|------|----------|------|------|
| **mcporter** | `/usr/local/lib/node_modules/openclaw/skills/mcporter/SKILL.md` | MCP 服务器管理 | ✅ 可用 |
| **conductor-mcp** | 通过 mcporter 调用 | 四种模式：顺序/并行/条件/循环 | ✅ 可用 |
| **sessions_spawn** | 内置工具 | 派生子 Agent 任务 | ✅ 已授权 |
| **subagents** | 内置工具 | 管理子 Agent 状态 | ✅ 已授权 |

### 跨 Agent 协作
| 工具 | 用途 | 示例 |
|------|------|------|
| **sessions_send** | 向其他 Agent 发送消息 | `sessions_send(targetAgent="mi-dang", message="...")` |
| **sessions_spawn** | 派生独立任务进程 | `sessions_spawn(task="...", runtime="subagent")` |
| **bindings** | 自动绑定当前群组 | 已自动配置 |

---

## 📦 飞书集成工具（内置）

> 使用飞书 OAuth 用户授权模式，所有工具自动可用

### 文档管理
| 工具 | 用途 | 触发场景 |
|------|------|---------|
| `feishu_create_doc` | 从 Markdown 创建云文档 | 生成报告/方案/总结 |
| `feishu_update_doc` | 更新云文档（7 种模式） | 追加/覆盖/定位替换 |
| `feishu_fetch_doc` | 获取文档 Markdown 内容 | 读取历史文档 |
| `feishu_doc_comments` | 管理文档评论 | 添加/@用户/解决评论 |

### 多维表格
| 工具 | 用途 | 触发场景 |
|------|------|---------|
| `feishu_bitable_app` | 创建/管理多维表格 App | 数据表/记录管理 |
| `feishu_bitable_app_table` | 管理数据表 | 增删改查记录 |
| `feishu_bitable_app_table_field` | 管理字段（列） | 调整表结构 |
| `feishu_bitable_app_table_record` | 管理记录（行） | 批量导入/更新 |
| `feishu_bitable_app_table_view` | 管理视图 | 网格/看板/画廊 |

### 日历与任务
| 工具 | 用途 | 触发场景 |
|------|------|---------|
| `feishu_calendar_event` | 创建/管理日程 | 会议安排/忙闲查询 |
| `feishu_calendar_freebusy` | 查询忙闲状态 | 安排会议时间 |
| `feishu_task_task` | 创建/管理任务 | 待办事项/任务分配 |
| `feishu_task_tasklist` | 管理任务清单 | 项目清单/分组 |

### IM 消息
| 工具 | 用途 | 触发场景 |
|------|------|---------|
| `feishu_im_user_message` | 发送/回复消息 | 群聊/私聊 |
| `feishu_im_user_get_messages` | 获取历史消息 | 读取聊天记录 |
| `feishu_im_user_search_messages` | 跨会话搜索消息 | 按关键词/发送者搜索 |
| `feishu_chat` | 管理群聊 | 搜索群/获取详情 |

---

## 🔐 安全与凭证管理

### 1Password
| 工具 | 路径 | 用途 |
|------|------|------|
| **1password** | `/usr/local/lib/node_modules/openclaw/skills/1password/SKILL.md` | 密钥托管/注入 |

**常用命令**:
```bash
# 登录
op signin

# 读取密钥
op read "op://Vault/Item/field"

# 注入环境变量
op run -- env | grep SECRET
```

### 密钥管理最佳实践
1. **禁止硬编码**: 所有 Token/密码存入 1Password
2. **环境变量注入**: 使用 `op run` 执行敏感命令
3. **定期轮换**: Token 过期前自动提醒

---

## 📝 文档与知识管理

### Obsidian
| 工具 | 路径 | 用途 |
|------|------|------|
| **obsidian** | `/usr/local/lib/node_modules/openclaw/skills/obsidian/SKILL.md` | 笔记管理 |

**双重产出协议**:
```
1. 本地生成 Markdown
2. 调用 feishu_create_doc 转换为飞书文档
3. 发送飞书文档链接到对话
4. 同步到 Obsidian:
   /Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/
```

### PDF 处理
| 工具 | 路径 | 用途 |
|------|------|------|
| **nano-pdf** | `/usr/local/lib/node_modules/openclaw/skills/nano-pdf/SKILL.md` | PDF 编辑 |
| **pdf** | 内置工具 | PDF 分析/提取 |

---

## 🤖 自我进化系统

### Self-Improving
**触发条件**:
- 用户纠正错误时 → `corrections.md`
- 完成重要工作后 → `memory.md`
- 发现可优化点 → `memory.md`
- 每日 23:00 → 自动复盘

**记忆文件**:
| 文件 | 路径 | 用途 |
|------|------|------|
| `memory.md` | `mi-ma-code/self-improving/memory.md` | 个人偏好/模式/规则 |
| `corrections.md` | `mi-ma-code/self-improving/corrections.md` | 错误纠正记录 |
| `index.md` | `mi-ma-code/self-improving/index.md` | 导航索引 |
| 今日日记 | `mi-ma-code/memory/YYYY-MM-DD.md` | 操作流水 |

---

## 🛠️ 环境执行工具

### Shell 执行
| 工具 | 用途 | 关键参数 |
|------|------|---------|
| `exec` | 执行 Shell 命令 | `pty: true` (TTY 必需) |
| `process` | 管理后台进程 | `action: poll/log/write/send-keys` |
| `bash` | 直接执行 | 简单命令 |

### 文件操作
| 工具 | 用途 | 注意 |
|------|------|------|
| `read` | 读取文件 | 支持文本/图片 |
| `write` | 写入文件 | 自动创建目录 |
| `edit` | 精确编辑 | 必须完全匹配 |

---

## 📊 监控与分析

### 模型使用
| 工具 | 路径 | 用途 |
|------|------|------|
| **model-usage** | `/usr/local/lib/node_modules/openclaw/skills/model-usage/SKILL.md` | 模型成本统计 |

### 系统健康
| 工具 | 路径 | 用途 |
|------|------|------|
| **healthcheck** | `/usr/local/lib/node_modules/openclaw/skills/healthcheck/SKILL.md` | 安全审计 |

---

## 🌐 网络与通讯

### 邮件
| 工具 | 路径 | 用途 |
|------|------|------|
| **himalaya** | `/usr/local/lib/node_modules/openclaw/skills/himalaya/SKILL.md` | IMAP/SMTP 邮件 |

### 消息
| 工具 | 路径 | 用途 |
|------|------|------|
| **imsg** | `/usr/local/lib/node_modules/openclaw/skills/imsg/SKILL.md` | iMessage/SMS |
| **discord** | `/usr/local/lib/node_modules/openclaw/skills/discord/SKILL.md` | Discord 机器人 |

### 博客监控
| 工具 | 路径 | 用途 |
|------|------|------|
| **blogwatcher** | `/usr/local/lib/node_modules/openclaw/skills/blogwatcher/SKILL.md` | RSS/Atom 监控 |

---

## 🎨 媒体处理

### 图像生成
| 工具 | 路径 | 用途 |
|------|------|------|
| **openai-image-gen** | `/usr/local/lib/node_modules/openclaw/skills/openai-image-gen/SKILL.md` | DALL-E 图像生成 |
| **nano-banana-pro** | `/usr/local/lib/node_modules/openclaw/skills/nano-banana-pro/SKILL.md` | Gemini 图像生成 |

### 音频
| 工具 | 路径 | 用途 |
|------|------|------|
| **openai-whisper** | `/usr/local/lib/node_modules/openclaw/skills/openai-whisper/SKILL.md` | 语音转文字 |

### UI 自动化
| 工具 | 路径 | 用途 |
|------|------|------|
| **peekaboo** | `/usr/local/lib/node_modules/openclaw/skills/peekaboo/SKILL.md` | macOS UI 捕获 |
| **canvas** | `/usr/local/lib/node_modules/openclaw/skills/canvas/SKILL.md` | Canvas 渲染 |

---

## 📱 个人工具

### 笔记
| 工具 | 路径 | 用途 |
|------|------|------|
| **apple-notes** | `/usr/local/lib/node_modules/openclaw/skills/apple-notes/SKILL.md` | Apple Notes |
| **notion** | `/usr/local/lib/node_modules/openclaw/skills/notion/SKILL.md` | Notion 集成 |

### 提醒事项
| 工具 | 路径 | 用途 |
|------|------|------|
| **apple-reminders** | `/usr/local/lib/node_modules/openclaw/skills/apple-reminders/SKILL.md` | Reminders |

---

## 🔧 快速验证脚本

```bash
#!/bin/bash
# 验证核心技能可用性

echo "=== 幂码 - 编程 技能验证 ==="
echo ""

# Coding Agent
if [ -f "/usr/local/lib/node_modules/openclaw/skills/coding-agent/SKILL.md" ]; then
  echo "✅ coding-agent: 可用"
else
  echo "❌ coding-agent: 缺失"
fi

# GitHub
if command -v gh &> /dev/null; then
  echo "✅ github (gh CLI): 已安装"
else
  echo "❌ github (gh CLI): 未安装"
fi

# GitHub MCP
if [ -n "$GITHUB_MCP_PAT" ]; then
  echo "✅ github-mcp: 已配置 (GITHUB_MCP_PAT)"
else
  echo "⚠️  github-mcp: 需配置 GITHUB_MCP_PAT"
fi

# Vercel
if command -v vercel &> /dev/null || npx vercel --version &> /dev/null; then
  echo "✅ vercel: 可用"
else
  echo "⚠️  vercel: 需安装"
fi

# 1Password
if command -v op &> /dev/null; then
  echo "✅ 1password (op CLI): 已安装"
else
  echo "⚠️  1password (op CLI): 未安装"
fi

# Obsidian
if [ -d "/Volumes/My house/Users/Sheldon/Desktop/知识库" ]; then
  echo "✅ Obsidian 知识库: 可访问"
else
  echo "⚠️  Obsidian 知识库: 路径不存在"
fi

echo ""
echo "=== 验证完成 ==="
```

---

## 📋 技能使用检查清单

### 任务启动前
- [ ] 读取 `MEMORY.md` 和今日日记
- [ ] 检查 `corrections.md` 避免重复错误
- [ ] 确认所需技能可用

### 任务执行中
- [ ] 使用 `sessions_send` 协作时声明目标 Agent
- [ ] 使用 `coding-agent` 时设置 `pty: true`
- [ ] 使用 GitHub MCP 时检查 Token 有效性

### 任务完成后
- [ ] 更新今日日记 `memory/YYYY-MM-DD.md`
- [ ] 执行双重产出（飞书 + Obsidian）
- [ ] 记录错误到 `corrections.md`（如有）
- [ ] 声明 `[自我进化]` 已记录

---

**最后更新**: 2026-03-10 00:05 GMT+8  
**维护者**: mi-ma-code (幂码 - 编程)  
**下次审查**: 2026-03-17
