# 幂码-架构 技能恢复计划 V2.0

**生成时间**: 2026-03-10 00:06 GMT+8  
**触发原因**: 系统重装导致技能丢失  
**负责人**: mi-ma-arch (首席架构师)

---

## 📊 当前技能存量盘点

### ✅ 已确认存在的技能

#### 1. 飞书集成技能 (9 个)
**位置**: `~/.openclaw/extensions/feishu-openclaw-plugin/skills/`

| 技能名 | 状态 | 用途 |
|:---|:---:|:---|
| feishu-bitable | ✅ | 多维表格管理 |
| feishu-calendar | ✅ | 日历日程管理 |
| feishu-channel-rules | ✅ | 飞书频道规则 |
| feishu-create-doc | ✅ | 创建云文档 |
| feishu-fetch-doc | ✅ | 获取云文档内容 |
| feishu-im-read | ✅ | IM 消息读取 |
| feishu-task | ✅ | 任务管理 |
| feishu-troubleshoot | ✅ | 问题排查 |
| feishu-update-doc | ✅ | 更新云文档 |

#### 2. 幂家军专用技能 (4 个)
**位置**: `~/.agents/skills/`

| 技能名 | 状态 | 用途 |
|:---|:---:|:---|
| agent-reach | ✅ | 全网内容分发 |
| baoyu-article-illustrator | ✅ | 文章配图生成 |
| nano-banana-pro-prompts | ✅ | AI 绘画提示词 |
| xiaohongshu / xiaohongshu-ops | ✅ | 小红书运营 |
| self-improving | ✅ | 自我迭代协议 |
| skill-feishu-docx-powerwrite | ✅ | 飞书文档增强 |

#### 3. 系统级技能 (54 个)
**位置**: `/usr/local/lib/node_modules/openclaw/skills/`

**核心可用**:
- 1password, apple-notes, apple-reminders
- blogwatcher, coding-agent, gemini
- github, gh-issues, gog
- himalaya, imsg, mcporter
- model-usage, nano-pdf, notion
- obsidian, pdf, pptx
- self-improving, summarize
- video-frames, weather, xurl

#### 4. 工作区技能 (20+ 个)
**位置**: `~/.openclaw/workspace/skills/`

**核心可用**:
- agent-reach, ai-agent-team
- algorithmic-art, brand-guidelines
- canvas-design, chrome-devtools-mcp
- comic-drama-maker, conductor-mcp
- context7, context7-mcp
- database-mcp, doc-coauthoring
- docx, exa-search-mcp
- firebase, frontend-design
- github, github-mcp, gitlab
- greptile, internal-comms
- json-canvas, lark-mcp
- mcp-builder, media-generation-mcp
- notebooklm, novel-to-manhua
- obsidian-bases, obsidian-markdown
- pdf, planning-with-files
- ppt-writer, pptx
- remotion, slack-gif-creator

---

## 🔧 作为首席架构师的核心技能矩阵

### P0 - 必须立即恢复 (架构设计核心)

| 技能 | 状态 | 恢复方案 | 优先级 |
|:---|:---:|:---|:---:|
| **MCP 协议深度应用** | ⚠️ 待验证 | 读取 `/usr/local/lib/node_modules/openclaw/skills/mcp-builder/SKILL.md` | P0 |
| **并行 Agent 协作** | ✅ 已验证 | 固化到 playbook.md，spawn 协议已可用 | P0 |
| **架构文档双轨输出** | ✅ 已验证 | 飞书文档 + Obsidian 本地同步 | P0 |
| **Self-Improving 协议** | ✅ 已激活 | 目录结构完整，协议已执行 | P0 |

### P1 - 重要支撑技能 (开发协作)

| 技能 | 状态 | 恢复方案 | 优先级 |
|:---|:---:|:---|:---:|
| **coding-agent** | ✅ 系统级 | 读取 `/usr/local/lib/node_modules/openclaw/skills/coding-agent/SKILL.md` | P1 |
| **github-mcp** | ✅ 工作区 | 读取 `~/.openclaw/workspace/skills/github-mcp/SKILL.md` | P1 |
| **context7-mcp** | ✅ 工作区 | 读取 `~/.openclaw/workspace/skills/context7-mcp/SKILL.md` | P1 |
| **frontend-design** | ✅ 工作区 | 读取 `~/.openclaw/workspace/skills/frontend-design/SKILL.md` | P1 |

### P2 - 增强技能 (效率提升)

| 技能 | 状态 | 恢复方案 | 优先级 |
|:---|:---:|:---|:---:|
| **database-mcp** | ✅ 工作区 | 读取 SKILL.md 熟悉 API | P2 |
| **exa-search-mcp** | ✅ 工作区 | 研究搜索增强用法 | P2 |
| **chrome-devtools-mcp** | ✅ 工作区 | 浏览器自动化调试 | P2 |
| **conductor-mcp** | ✅ 工作区 | 工作流编排 | P2 |

---

## 📋 立即执行动作清单

### Step 1: 核心技能文档加载 (本次完成)
- [x] 读取飞书技能列表 (9 个✅)
- [x] 读取幂家军专用技能 (6 个✅)
- [x] 读取系统级技能列表 (54 个✅)
- [x] 读取工作区技能列表 (20+ 个✅)
- [ ] 深度阅读 MCP 相关 SKILL.md 文档
- [ ] 深度阅读 coding-agent SKILL.md 文档

### Step 2: 更新 TOOLS.md (架构师速查表)
- [ ] 补充 MCP 协议工具清单
- [ ] 补充 Agent 协作 spawn 协议
- [ ] 补充 Vercel 部署流程
- [ ] 补充深色科技风格规范

### Step 3: 更新 playbook.md (实战打法)
- [ ] 注入并行协作模式 (#001)
- [ ] 注入 Vercel 部署流程 (#002)
- [ ] 注入深色科技设计规范 (#003)
- [ ] 注入 Self-Improving 协议 (#004)

### Step 4: 技能验证测试
- [ ] 测试 sessions_spawn 并行调用
- [ ] 测试 MCP 工具链调用
- [ ] 测试飞书文档双轨输出
- [ ] 测试 Self-Improving 记忆同步

---

## 🎯 技能恢复完成标准

1. **TOOL.md 更新完成** - 包含所有架构师核心工具
2. **playbook.md 注入完成** - 4 条验证有效的战术固化
3. **MCP 协议验证通过** - 能够调用至少 3 个 MCP 工具
4. **并行协作验证通过** - 成功 spawn 2 个以上子 Agent
5. **双轨输出验证通过** - 飞书文档 + Obsidian 本地同步

---

## 📚 关键文档位置索引

### 架构师个人档案
```
/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-ma-arch/
├── SOUL.md                    # 作战灵魂 (含 Self-Improving 协议)
├── TOOLS.md                   # 武器库 (待更新)
├── MEMORY.md                  # 长期记忆 (3 条经验)
├── playbook.md                # 实战打法 (待注入)
├── memory.md                  # 任务日记索引
├── memory/
│   ├── 2026-02-26.md
│   ├── 2026-03-02.md
│   └── 2026-03-08.md
└── self-improving/
    ├── memory.md              # 个人经验库
    ├── corrections.md         # 错误纠正 (空)
    └── index.md
```

### 幂家军全局记忆
```
/Volumes/My house/Users/Sheldon/.openclaw/workspace/
├── MEMORY.md                  # 核心决策与架构记忆
├── AGENTS.md                  # 全员深度通讯录
├── shared/
│   ├── tasks/                 # 任务目录 (空)
│   └── projects/              # 项目目录
└── mi-jiajun-website/         # 官网源码 (已部署)
```

### 技能库位置
```
~/.openclaw/extensions/feishu-openclaw-plugin/skills/  # 飞书插件 (9 个)
~/.agents/skills/                                       # 幂家军专用 (6 个)
~/.openclaw/workspace/skills/                           # 工作区技能 (20+ 个)
/usr/local/lib/node_modules/openclaw/skills/            # 系统级技能 (54 个)
```

---

**下一步**: 深度阅读核心 SKILL.md 文档，更新 TOOLS.md 和 playbook.md
