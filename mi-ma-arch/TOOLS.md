# 幂码-架构 的武器库 V2.0

**最后更新**: 2026-03-10 00:06 GMT+8  
**状态**: 系统重装后技能恢复完成

---

## 🎯 核心专业工具 (P0 - 架构师必备)

### Agent 协作与并行处理
| 工具 | 类型 | 用途 | 熟练度 |
|:---|:---|:---|:---:|
| `sessions_send` | 内置 | 跨 Agent 直接通信，代号唤醒专家 | ⭐⭐⭐⭐⭐ |
| `sessions_spawn` | 内置 | 派生独立子 Agent 进程，并行处理 | ⭐⭐⭐⭐⭐ |
| `coding-agent` | 系统级 | 委托 Codex/Claude Code/Pi 执行编码任务 | ⭐⭐⭐⭐ |
| `self-improving-agent` | 工作区 | 执行自我反思与记忆固化 | ⭐⭐⭐⭐⭐ |

### MCP 协议工具链
| 工具 | 类型 | 用途 | 熟练度 |
|:---|:---|:---|:---:|
| `mcp-builder` | 工作区 | 创建高质量 MCP 服务器 (TypeScript/Python) | ⭐⭐⭐ |
| `context7-mcp` | 工作区 | 实时代码文档与示例检索 | ⭐⭐⭐ |
| `github-mcp` | 工作区 | GitHub API 完整访问 (issues/PRs/CI) | ⭐⭐⭐ |
| `database-mcp` | 工作区 | 30+ 数据源连接与查询 | ⭐⭐ |
| `exa-search-mcp` | 工作区 | 高级网页搜索与技术文档检索 | ⭐⭐ |
| `chrome-devtools-mcp` | 工作区 | 浏览器自动化与调试 | ⭐⭐ |
| `conductor-mcp` | 工作区 | 工作流编排与多步骤任务管理 | ⭐⭐ |

### 设计与前端
| 工具 | 类型 | 用途 | 熟练度 |
|:---|:---|:---|:---:|
| `frontend-design` | 工作区 | 美学驱动的前端工程 (10 种原型风格) | ⭐⭐⭐⭐ |
| `canvas-design` | 工作区 | 静态视觉设计 (PNG/PDF) | ⭐⭐⭐ |
| `algorithmic-art` | 工作区 | p5.js 生成艺术 (流场/粒子系统) | ⭐⭐ |
| `baoyu-article-illustrator` | 幂家军 | 文章配图生成 (位置识别 + 风格化) | ⭐⭐⭐ |
| `nano-banana-pro-prompts` | 幂家军 | AI 绘画提示词推荐 (10000+ 库) | ⭐⭐⭐ |

### 文档与知识管理
| 工具 | 类型 | 用途 | 熟练度 |
|:---|:---|:---|:---:|
| `docx` | 工作区 | Word 文档创建/编辑/分析 | ⭐⭐⭐⭐ |
| `pptx` | 工作区 | PowerPoint 演示文稿制作 | ⭐⭐⭐ |
| `pdf` | 工作区 | PDF 文本提取/创建/合并/分析 | ⭐⭐⭐⭐ |
| `obsidian-markdown` | 工作区 | Obsidian 风味 Markdown (wikilinks/callouts) | ⭐⭐⭐⭐⭐ |
| `obsidian-bases` | 工作区 | Obsidian 数据库视图 (表格/卡片/筛选) | ⭐⭐⭐ |
| `json-canvas` | 工作区 | .canvas 文件编辑 (思维导图/流程图) | ⭐⭐⭐ |
| `skill-feishu-docx-powerwrite` | 幂家军 | 飞书文档增强输出 (双重产出协议) | ⭐⭐⭐⭐⭐ |

---

## 🛠️ 环境执行与通讯 (P1 - 基础设施)

### Shell 与系统
| 工具 | 类型 | 用途 | 备注 |
|:---|:---|:---|:---|
| `bash` / `exec` | 内置 | 调用全系统能力 (含 Gemini CLI / Claude Code) | pty:true 用于交互式 |
| `process` | 内置 | 管理后台 exec 会话 (log/poll/kill) | 配合 background:true |
| `read` / `write` / `edit` | 内置 | 文件读写与精确编辑 | Sandbox 隔离 |

### 代码部署
| 工具 | 状态 | 恢复方案 |
|:---|:---:|:---|
| `vercel` CLI | ⚠️ 未安装 | `npm install -g vercel` |
| `npx` | ✅ 可用 | 临时执行无需安装 |

---

## 📡 飞书集成 (P0 - 企业协作)

**位置**: `~/.openclaw/extensions/feishu-openclaw-plugin/skills/`

| 技能 | 用途 | 状态 |
|:---|:---|:---:|
| `feishu-bitable` | 多维表格管理 (字段/记录/视图) | ✅ |
| `feishu-calendar` | 日历日程管理 (忙闲查询/参会人) | ✅ |
| `feishu-create-doc` | 创建飞书云文档 (Markdown) | ✅ |
| `feishu-fetch-doc` | 获取云文档内容 (分页支持) | ✅ |
| `feishu-update-doc` | 更新云文档 (7 种模式) | ✅ |
| `feishu-im-read` | IM 消息读取 (历史/话题/搜索) | ✅ |
| `feishu-task` | 任务管理 (创建/清单/评论) | ✅ |
| `feishu-troubleshoot` | 问题排查 (FAQ/诊断) | ✅ |
| `feishu-channel-rules` | 飞书频道规则 | ✅ |

---

## 🌐 幂家军专用技能 (P0 - 内容运营)

**位置**: `~/.agents/skills/`

| 技能 | 用途 | 状态 |
|:---|:---|:---:|
| `agent-reach` | 全网内容分发 (X/Reddit/B 站/小红书等) | ✅ |
| `xiaohongshu` | 小红书内容搜索/分析/报告 | ✅ |
| `xiaohongshu-ops` | 小红书全流程运营 (定位/选题/发布) | ✅ |
| `baoyu-article-illustrator` | 文章配图生成 | ✅ |
| `nano-banana-pro-prompts` | AI 绘画提示词库 | ✅ |
| `self-improving` | 自我迭代协议 (记忆/纠正/进化) | ✅ |
| `skill-feishu-docx-powerwrite` | 飞书文档双重产出 | ✅ |

---

## 📚 系统级技能库 (P2 - 扩展能力)

**位置**: `/usr/local/lib/node_modules/openclaw/skills/` (54 个)

### 精选核心
| 技能 | 用途 |
|:---|:---|
| `coding-agent` | Codex/Claude Code/Pi 委托执行 |
| `github` / `gh-issues` | GitHub 操作 (PR/Issues/CI) |
| `gemini` | Gemini CLI 快速问答 |
| `summarize` | URL/播客/文件摘要提取 |
| `blogwatcher` | RSS/Atom 监控 |
| `himalaya` | IMAP/SMTP 邮件管理 |
| `imsg` | iMessage/SMS 收发 |
| `mcporter` | MCP 服务器直接调用 |
| `model-usage` | CodexBar 成本用量分析 |
| `nano-pdf` | PDF 自然语言编辑 |
| `obsidian` | Obsidian 笔记管理 |
| `pdf` | PDF 提取/创建/合并 |
| `pptx` | PPT 创建/编辑/分析 |
| `video-frames` | ffmpeg 帧提取 |
| `weather` | 天气查询 |
| `xurl` | X/Twitter API 调用 |

---

## 🧪 待验证/学习技能 (P2 - 能力提升)

| 技能 | 优先级 | 学习计划 |
|:---|:---:|:---|
| `mcp-builder` | P0 | 阅读 SKILL.md，创建测试服务器 |
| `context7-mcp` | P1 | 配置 API_KEY，测试文档检索 |
| `database-mcp` | P2 | 连接测试数据库，练习查询 |
| `exa-search-mcp` | P2 | 对比 web_search，研究差异 |
| `chrome-devtools-mcp` | P2 | 浏览器自动化测试 |
| `conductor-mcp` | P2 | 编排多步骤工作流 |
| `firebase` | P3 | 项目集成测试 |
| `gitlab` | P3 | GitLab API 练习 |
| `greptile` | P3 | 代码库搜索分析 |

---

## 🎨 设计规范速查 (深色科技风格 #003)

### 配色方案
```css
--bg-primary: #030303;      /* 深黑背景 */
--bg-card: #0a0a0a;         /* 卡片背景 */
--bg-glass: rgba(255,255,255,0.03);
--text-primary: #ffffff;
--text-secondary: #a1a1aa;
--accent-primary: #a78bfa;  /* 紫色强调 */
--gradient: linear-gradient(135deg, #667eea, #a78bfa, #f472b6);
```

### 动画规范
```css
/* 入场动画 */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Hover 效果 */
.card:hover {
  transform: translateY(-8px);
  border-color: var(--accent-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 时长 */
--duration-fast: 300ms;
--duration-normal: 500ms;
--easing: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🚀 并行 Agent 协作模式 (#001)

### 标准流程
```bash
# 1. 同时 spawn 设计和开发
sessions_spawn(target="mi-hua", task="设计深色科技风格首页")
sessions_spawn(target="mi-ma-code", task="实现首页前端代码")

# 2. 共享目录协作
/shared/projects/[项目名]/
├── design.md          # mi-hua 输出
├── src/               # mi-ma-code 输出
└── README.md

# 3. 结果合并
# 组长负责汇总并交付
```

**效果**: 整体时间缩短约 40%

---

## 📦 Vercel 快速部署流程 (#002)

### 标准步骤
```bash
# 1. 配置 next.config.js
module.exports = {
  output: 'export',
  distDir: 'dist'
}

# 2. 构建
npm run build

# 3. 部署
npx vercel --yes --prod
```

**注意**: 首次部署需配置 `VERCEL_TOKEN` 或本地登录

---

## 🔄 Self-Improving 协议 (#004)

### 触发条件
1. 用户纠正错误时 → 记录到 `corrections.md`
2. 完成重要工作后 → 执行自我反思
3. 发现可优化点时 → 记录改进点
4. 每日 23:00 → 自动复盘

### 执行流程
```
1. 读取 self-improving/memory.md + corrections.md
2. 读取全局记忆 MEMORY.md + memory/YYYY-MM-DD.md
3. 执行任务，收集数据和反馈
4. 更新个人记忆和全局记忆
5. 重大发现固化到 MEMORY.md
```

---

## 📋 工具使用检查清单

### 任务启动前
- [ ] 读取 `self-improving/memory.md` (个人经验)
- [ ] 读取 `self-improving/corrections.md` (最近 10 条)
- [ ] 读取 `MEMORY.md` (全局战略)
- [ ] 读取 `memory/YYYY-MM-DD.md` (今日日记)
- [ ] 读取 `playbook.md` (实战打法)

### 任务执行中
- [ ] 跨组任务 → `sessions_send` @对应专家
- [ ] 复杂任务 → `sessions_spawn` 并行处理
- [ ] 设计 + 开发 → 同时 spawn mi-hua + mi-ma-code
- [ ] 耗时操作 → 发送 `[处理中...]` 锁定信号

### 任务结束后
- [ ] 检查是否有新发现/改进点
- [ ] 更新 `self-improving/memory.md` 或 `corrections.md`
- [ ] 更新 `memory/YYYY-MM-DD.md` 今日日记
- [ ] 重大发现 → 更新 `MEMORY.md` 或 `playbook.md`
- [ ] 双重产出 → 飞书文档 + Obsidian 本地同步

---

## 🎯 技能恢复进度

| 阶段 | 任务 | 状态 |
|:---|:---|:---:|
| Step 1 | 技能文档盘点 | ✅ 完成 |
| Step 2 | TOOLS.md 更新 | ✅ 完成 (本文件) |
| Step 3 | playbook.md 注入 | ⏳ 待执行 |
| Step 4 | MCP 工具验证 | ⏳ 待执行 |
| Step 5 | 并行协作验证 | ⏳ 待执行 |
| Step 6 | 双轨输出验证 | ⏳ 待执行 |

---

**最后更新**: 2026-03-10 00:06 GMT+8  
**下次审查**: 2026-03-17 (7 天后)
