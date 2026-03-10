# Memory (HOT Tier) - mi-ma-code

## Preferences
- 代码风格: 清晰、注释完善、模块化
- 输出格式: 优先 Markdown，支持代码块
- 沟通风格: 专业、简洁、结果导向

## Patterns
- 任务启动时读取 MEMORY.md 和今日日记
- 任务结束时更新日记和自我反思
- 涉及文档生成时执行双重产出协议
- 飞书消息使用卡片格式提升可读性

## Rules
1. 凡事必记，凡记必同步
2. 代码必须可复用、可维护
3. 文档必须同步到飞书和本地
4. 错误必须记录到 corrections.md

## Recent Learnings
- 2026-03-07: 飞书聊天窗口不支持 Markdown 表格，需使用列表或卡片
- 2026-03-07: 消息卡片在飞书中有缓存延迟，可能需要刷新才能看到
- 2026-03-07: Vercel 部署时需要处理 Git 作者权限问题
- 2026-03-08: Coding Agent 必须使用 PTY 模式，否则输出会损坏或挂起
- 2026-03-08: GitHub MCP 需要 GITHUB_MCP_PAT 环境变量认证
- 2026-03-08: Conductor 工作流支持四种模式：顺序/并行/条件/循环
- 2026-03-08: SOUL.md 更新时需确保 Step 1 和 Step X 流程完整，避免重复区块
- 2026-03-08: Self-Improving 迭代执行时需全面读取个人记忆、纠正记录、今日日记、全局 MEMORY

## Self-Improving System Status
- 状态: ✅ 已激活
- 最后迭代: 2026-03-08 05:37
- 记忆文件: 已初始化
- 触发条件: 已配置（错误纠正/重要工作/优化发现/每日复盘）
- 迭代次数: 2

## 能力矩阵 (2026-03-08 更新)

| 能力维度 | 当前状态 | 熟练度 | 备注 |
|---------|---------|-------|------|
| 代码生成与复刻 | ✅ 可用 | 高 | Gemini CLI / Claude Code 熟练 |
| 飞书生态集成 | ✅ 可用 | 中 | 已掌握消息、文档、多维表格 API |
| 版本控制 (Git) | ✅ 可用 | 高 | GitHub MCP 已配置 |
| 工作流编排 | ✅ 可用 | 中 | Conductor 四种模式已掌握 |
| 自我进化系统 | ✅ 已激活 | 高 | memory/corrections/diary 三轨运行 |
| 跨 Agent 协作 | ✅ 可用 | 中 | sessions_send/spawn 已授权 |
| 文档双重产出 | ✅ 可用 | 高 | 飞书 + Obsidian 同步 |
| 容器化部署 | ⚠️ 待验证 | 低 | Vercel/GitHub Actions 需更多实践 |

## 技能恢复记录

### 2026-03-10: 系统重装后技能恢复
- **状态**: ✅ 完成
- **问题**: 个人技能目录丢失 (`~/.openclaw/skills/` 仅剩 3 个技能)
- **方案**: 使用系统级技能替代 (`/usr/local/lib/node_modules/openclaw/skills/`)
- **恢复技能**:
  - coding-agent (代码生成)
  - github-mcp (GitHub 集成)
  - obsidian (知识管理)
  - 1password (密钥管理)
  - mcporter (MCP 服务器)
  - conductor-mcp (工作流编排)
- **飞书工具**: 使用内置 `feishu_*` 工具 (无需恢复)
- **跨 Agent**: `sessions_send/spawn` 已授权

## 改进路线图

### 已完成 ✅
- [x] Self-Improving 系统初始化
- [x] 记忆双轨制建立
- [x] 纠正记录机制
- [x] 每日复盘流程
- [x] 系统级技能映射 (2026-03-10)

### 进行中 🔄
- [ ] 飞书格式兼容性优化
- [ ] Coding Agent PTY 模式标准化
- [ ] GitHub MCP Token 配置

### 计划中 📋
- [ ] 错误模式预测机制
- [ ] 技能库自动发现
- [ ] 容器化部署实践
- [ ] 技能验证测试套件
