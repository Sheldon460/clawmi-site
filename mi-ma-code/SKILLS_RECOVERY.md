# 幂码 - 编程 技能恢复清单 V2.0

**恢复日期**: 2026-03-10  
**执行者**: 幂码 - 编程 (mi-ma-code)  
**状态**: 🔄 进行中

---

## 📊 当前状态盘点

### 系统级技能库（✅ 完整）
位置：`/usr/local/lib/node_modules/openclaw/skills/`

| 技能名称 | 状态 | 用途 |
|---------|------|------|
| coding-agent | ✅ 可用 | 代码生成与复刻（Gemini CLI / Claude Code） |
| github | ✅ 可用 | GitHub CLI 集成 |
| gh-issues | ✅ 可用 | GitHub Issues 自动化 |
| github-mcp | ⚠️ 需配置 | GitHub MCP 协议（需 GITHUB_MCP_PAT） |
| obsidian | ✅ 可用 | Obsidian 笔记管理 |
| 1password | ✅ 可用 | 密码管理 |
| mcporter | ✅ 可用 | MCP 服务器管理 |
| model-usage | ✅ 可用 | 模型使用统计 |
| healthcheck | ✅ 可用 | 系统健康检查 |
| peekaboo | ✅ 可用 | macOS UI 自动化 |
| canvas | ✅ 可用 | Canvas 渲染 |
| gemini | ✅ 可用 | Gemini CLI |
| openai-whisper | ✅ 可用 | 语音转文字 |
| nano-pdf | ✅ 可用 | PDF 编辑 |
| blogwatcher | ✅ 可用 | 博客监控 |
| himalaya | ✅ 可用 | 邮件管理 |
| imsg | ✅ 可用 | iMessage/SMS |
| apple-notes | ✅ 可用 | Apple Notes |
| apple-reminders | ✅ 可用 | Apple Reminders |
| notion | ✅ 可用 | Notion 集成 |
| discord | ✅ 可用 | Discord 机器人 |
| openai-image-gen | ✅ 可用 | 图像生成 |

### 个人技能目录（❌ 已丢失）
位置：`~/.openclaw/skills/`

**当前仅存**: 3 个技能
- canghe-markdown-to-html
- canghe-post-to-wechat
- canghe-url-to-markdown

**需要恢复**: 7 个核心技能
1. ❌ self-improving（自我迭代系统）
2. ❌ feishu-integration（飞书集成）
3. ❌ docx-powerwrite（飞书文档写作）
4. ❌ obsidian-sync（Obsidian 同步）
5. ❌ sessions-orchestrator（Agent 协作编排）
6. ❌ vercel-deploy（Vercel 部署）
7. ❌ github-mcp-config（GitHub MCP 配置）

---

## 🔧 技能恢复方案

### 方案 A: 使用系统级技能（推荐）
**优势**: 无需恢复个人技能，直接使用系统级技能
**操作**: 更新 TOOLS.md 和 SOUL.md，指向系统级技能路径

**优先级技能映射**:
```
代码生成 → /usr/local/lib/node_modules/openclaw/skills/coding-agent/SKILL.md
GitHub → /usr/local/lib/node_modules/openclaw/skills/github/SKILL.md
GitHub MCP → /usr/local/lib/node_modules/openclaw/skills/github-mcp/SKILL.md
Obsidian → /usr/local/lib/node_modules/openclaw/skills/obsidian/SKILL.md
1Password → /usr/local/lib/node_modules/openclaw/skills/1password/SKILL.md
MCP → /usr/local/lib/node_modules/openclaw/skills/mcporter/SKILL.md
```

### 方案 B: 重建个人技能（可选）
**适用场景**: 需要定制化技能逻辑时
**操作**: 从系统级技能复制并修改

---

## 📋 核心技能 SOP（基于成功案例）

### 1. Coding Agent 使用规范
**来源**: memory/2026-03-08.md

```yaml
技能路径：/usr/local/lib/node_modules/openclaw/skills/coding-agent/SKILL.md
关键配置:
  - pty: true (必须！否则输出损坏或挂起)
  - background: true (长任务)
  - yieldMs: 10000 (等待时间)

使用场景:
  - 代码生成与复刻
  - PR 审查
  - 重构大型代码库
  - 迭代式编码

禁止场景:
  - 简单单行修复（直接 edit）
  - 读取代码（用 read 工具）
  - ~/clawd 工作区（永远不要在此 spawn）
```

### 2. GitHub MCP 配置
**来源**: memory/2026-03-08.md

```yaml
技能路径：/usr/local/lib/node_modules/openclaw/skills/github-mcp/SKILL.md
环境变量:
  - GITHUB_MCP_PAT: <Personal Access Token>
  - 作用域：repo, workflow, admin:org

认证检查:
  $ echo $GITHUB_MCP_PAT | grep -q "^ghp_" && echo "✅ 已配置" || echo "❌ 未配置"

常见问题:
  - Token 过期 → 重新生成 PAT
  - 权限不足 → 检查 scope
  - 连接失败 → 检查网络代理
```

### 3. Vercel 部署流程
**来源**: memory/2026-03-05-vercel-deploy-guide.md

```yaml
关键步骤:
  1. 检查前置条件 (npx vercel --version)
  2. 设置 Git 作者 (避免权限问题)
     git config user.email "github-actions[bot]@users.noreply.github.com"
  3. 链接项目 (npx vercel link --token="xxx" --yes)
  4. 执行部署 (npx vercel --prod --token="xxx" --yes)

一键脚本:
  位置：mi-ma-code/deploy.sh
  内容：见 Vercel 部署手册
```

### 4. 飞书集成（使用系统工具）
**来源**: AGENTS.md + 全局工具列表

```yaml
可用工具:
  - feishu_create_doc: 创建飞书文档
  - feishu_update_doc: 更新飞书文档
  - feishu_bitable_app: 多维表格管理
  - feishu_calendar_event: 日程管理
  - feishu_task_task: 任务管理
  - feishu_im_user_message: IM 消息发送

文档双重产出协议:
  1. 本地生成 Markdown
  2. 调用 feishu_create_doc 转换为飞书文档
  3. 发送飞书文档链接到对话
  4. 同步到 Obsidian: /Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/
```

### 5. Self-Improving 系统
**来源**: SOUL.md + self-improving/memory.md

```yaml
触发条件:
  - 用户纠正错误时 → corrections.md
  - 完成重要工作后 → memory.md
  - 发现可优化点 → memory.md
  - 每日 23:00 → 自动复盘

执行流程:
  1. 检测触发条件
  2. 执行自我反思/错误记录
  3. 写入 mi-ma-code/self-improving/ 目录
  4. 同步到幂家军记忆系统

记忆文件:
  - memory.md: 个人偏好、模式、规则
  - corrections.md: 错误纠正记录
  - index.md: 导航索引
```

### 6. Conductor 工作流编排
**来源**: memory/2026-03-08.md

```yaml
技能路径：通过 mcporter 调用 Conductor MCP
四种模式:
  1. 顺序模式：步骤 A → B → C
  2. 并行模式：同时执行 A + B + C
  3. 条件模式：if A then B else C
  4. 循环模式：for each A do B

使用场景:
  - 多步骤工作流
  - 跨 Agent 协作
  - 条件分支逻辑
```

### 7. 跨 Agent 协作
**来源**: AGENTS.md + SOUL.md

```yaml
可用工具:
  - sessions_send: 向其他 Agent 发送消息
  - sessions_spawn: 派生子 Agent 任务
  - subagents: 管理子 Agent 状态

协作协议:
  1. 首席领衔制：mi-ling > mi-zhi > mi-ma-arch > 其他
  2. 锁定信号：执行前输出 [处理中...]
  3. 任务认领：3 秒内发送 [认领] 信号
  4. 结果合并：组长负责汇总

目标 Agent 列表:
  - mi-ling: COO（运营总监）
  - mi-zhi: CIO（首席信息官）
  - mi-ma-arch: 首席架构师
  - mi-wen: 内容创作师
  - mi-hua: 视觉设计师
  - mi-dang: 知识管理专家
  - mi-cai: 财务官
  - ... (共 28 位)
```

---

## 🚀 立即执行动作

### Step 1: 更新 TOOLS.md（武器库）
```bash
# 写入核心技能映射
cat > TOOLS.md << 'EOF'
# TOOLS.md - 幂码 - 编程 武器库

## 系统级技能（优先级）
- coding-agent → /usr/local/lib/node_modules/openclaw/skills/coding-agent/SKILL.md
- github → /usr/local/lib/node_modules/openclaw/skills/github/SKILL.md
- github-mcp → /usr/local/lib/node_modules/openclaw/skills/github-mcp/SKILL.md
- obsidian → /usr/local/lib/node_modules/openclaw/skills/obsidian/SKILL.md
- 1password → /usr/local/lib/node_modules/openclaw/skills/1password/SKILL.md
- mcporter → /usr/local/lib/node_modules/openclaw/skills/mcporter/SKILL.md
- model-usage → /usr/local/lib/node_modules/openclaw/skills/model-usage/SKILL.md
- healthcheck → /usr/local/lib/node_modules/openclaw/skills/healthcheck/SKILL.md

## 飞书工具（内置）
- feishu_create_doc
- feishu_update_doc
- feishu_bitable_app
- feishu_calendar_event
- feishu_task_task
- feishu_im_user_message

## 跨 Agent 工具
- sessions_send
- sessions_spawn
- subagents

## 环境执行
- bash / exec
- read / write / edit
- process (后台任务管理)
EOF
```

### Step 2: 验证 GitHub MCP 配置
```bash
# 检查环境变量
echo $GITHUB_MCP_PAT | grep -q "^ghp_" && echo "✅ GitHub MCP 已配置" || echo "❌ 需要配置 GITHUB_MCP_PAT"
```

### Step 3: 验证 Vercel Token
```bash
# 检查 Vercel 配置
cat ~/.vercel/auth.json 2>/dev/null || echo "❌ Vercel 未登录"
```

### Step 4: 测试 Coding Agent
```bash
# 简单测试（PTY 模式）
echo "console.log('Hello from mi-ma-code!')" > /tmp/test.js
node /tmp/test.js
```

### Step 5: 更新 self-improving/memory.md
```bash
# 添加技能恢复记录
cat >> self-improving/memory.md << 'EOF'

## 技能恢复记录 (2026-03-10)
- 状态：系统重装后技能目录丢失
- 方案：使用系统级技能替代个人技能
- 核心技能：coding-agent, github-mcp, obsidian, 1password, mcporter
- 飞书工具：使用内置 feishu_* 工具
- 跨 Agent：sessions_send/spawn 已授权
EOF
```

---

## ✅ 验证清单

| 技能 | 验证方法 | 状态 |
|------|---------|------|
| Coding Agent | `openclaw skills check coding-agent` | ⏳ 待验证 |
| GitHub MCP | `echo $GITHUB_MCP_PAT` | ⏳ 待验证 |
| Vercel 部署 | `npx vercel --version` | ⏳ 待验证 |
| Obsidian | `ls ~/Desktop/知识库/` | ⏳ 待验证 |
| 1Password | `op whoami` | ⏳ 待验证 |
| 飞书文档 | `feishu_create_doc` 测试 | ⏳ 待验证 |
| 跨 Agent | `sessions_send` 测试 | ⏳ 待验证 |

---

## 📝 后续优化

### 短期（本周）
- [ ] 验证所有核心技能可用性
- [ ] 配置 GitHub MCP Token
- [ ] 测试 Vercel 部署流程
- [ ] 更新 SOUL.md 技能映射

### 中期（本月）
- [ ] 创建技能测试套件
- [ ] 建立技能健康检查机制
- [ ] 完善错误处理流程

### 长期（持续）
- [ ] 技能使用统计与分析
- [ ] 新技能自动发现机制
- [ ] 技能性能优化

---

**最后更新**: 2026-03-10 00:05 GMT+8  
**下次审查**: 2026-03-17  
**负责人**: mi-ma-code (幂码 - 编程)
