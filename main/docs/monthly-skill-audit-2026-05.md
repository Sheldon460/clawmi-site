# 技能目录规范性检查报告

**日期**: 2026-05-01  
**检查者**: main (幂 Claw)  
**检查时间**: 2026-05-01 09:50 (逾期 50 分钟)  
**原定时间**: 每月 1 日 09:00

## 检查结果

| 检查项 | 预期 | 实际 | 状态 |
|--------|------|------|------|
| 共享技能数量 | ≥10 | 101 个 | ✅ 远超预期 |
| 非标准路径 | 不应存在 | 存在 77 个技能 | ❌ 严重违规 |
| Agent 专属技能目录 | 规范或无 | 无 | ✅ 符合规范 |
| 符号链接数 | - | 25 个 | ⚠️ 存在依赖 |

---

## 发现问题

### 🔴 严重问题：非标准技能路径违规

**问题描述**:
- 发现 `~/.agents/skills/` 目录仍然存在，包含 **77 个技能包**
- 违反了技能管理规范，该路径不应存在
- 共享技能目录中有 **25 个符号链接** 指向该路径

**符号链接列表** (25 个):
```
baoyu-slide-deck
lark-approval
lark-attendance
lark-base
lark-calendar
lark-contact
lark-doc
lark-drive
lark-event
lark-im
lark-mail
lark-minutes
lark-okr
lark-openapi-explorer
lark-shared
lark-sheets
lark-skill-maker
lark-slides
lark-task
lark-vc
lark-whiteboard
lark-wiki
lark-workflow-meeting-summary
lark-workflow-standup-report
```

**未引用的技能** (52 个，存在于 ~/.agents/skills/ 但无符号链接):
```
1password-1.0.1
a-stock-analysis-1.0.0
aminer-open-academic-1.0.5
architecture-designer-0.1.0
autoglm-browser-agent
autoglm-deepresearch
autoglm-generate-image
autoglm-open-link
autoglm-search-image
autoglm-websearch
automation-workflows-0.1.0
backtest-expert-0.1.0
blog-writer-0.1.0
brainstorming-0.1.0
clawdefender-1
code-1.0.4
content-strategy-0.1.0
copywriting-0.1.0
debug-pro-1.0.0
executing-plans-0.1.0
feishu-chat-history
feishu-cron-reminder
feishu-doc-1.2.7
feishu-drive-1.0.0
feishu-perm
feishu-screenshot
feishu-send-file
ffmpeg-video-editor-1.0.0
find-skills
frontend-design-3-0.1.0
git-essentials-1.0.0
ima-1.0.0
interview-designer-1.0.0
market-research-1.0.0
memory-1.0.2
obsidian-ontology-sync-1.0.1
opencode-controller-1.0.0
remotion-best-practices
research-paper-writer-0.1.0
security-auditor-1.0.0
seo-1.0.3
seo-content-writer-2.0.0
session-logs-1.0.0
skill-vetter-1.0.0
social-content-generator-0.1.0
social-media-scheduler-1.0.0
supabase-postgres-best-practices
test-runner-1.0.0
tmux-1.0.0
ui-ux-pro-max-0.1.0
video-frames-1.0.0
web-design-guidelines
writing-plans-0.1.0
```

### ⚠️ 系统问题：任务问题激增

**问题描述**:
- 任务问题数量从上月的 39 个激增至 210 个
- 17 个错误级别问题
- 6 个警告级别问题
- 需要关注系统健康状况

### ⚠️ Gateway 服务问题

**问题描述**:
- Gateway 服务状态: unreachable
- 错误原因: missing scope: operator.read
- 影响: 控制界面可能无法正常工作

### ⚠️ 插件警告

**被禁用的插件**:
1. **openclaw-mem0**: 记忆插件
2. **openclaw-weixin**: 微信集成插件

**影响**: 可能影响相关功能

### ⚠️ 安全区审计警告

**安全警告**:
- Control UI device auth disabled
- Elevated exec allowlist contains wildcard (严重安全风险)

---

## 整改措施

### 高优先级 (立即执行)

1. **Gateway 服务修复**:
   ```bash
   # 检查 Gateway 配置
   openclaw gateway status
   # 可能需要重新授权或修复权限
   ```

2. **系统任务维护**:
   ```bash
   # 清理问题任务
   openclaw tasks maintenance --apply
   ```

3. **安全配置修复**:
   ```bash
   # 移除 elevated exec allowlist 中的通配符
   # 确认 Control UI device auth 状态
   ```

### 中优先级 (本周内)

4. **技能路径规范化决策**:
   
   **方案 A - 迁移并清理**:
   - 将 52 个未引用技能迁移到共享目录
   - 删除符号链接，重新建立规范路径
   - 备份并删除 `~/.agents/skills/`
   
   **方案 B - 接受现状**:
   - 将 `~/.agents/skills/` 正式接受为二级技能库
   - 更新文档规范说明
   - 定期维护依赖关系
   
   **建议**: 先执行方案 A 的备份步骤，验证功能正常后再删除

5. **启用核心 Agent 心跳**:
   ```bash
   # 为 mi-ling 启用心跳
   openclaw config set agent.mi-ling.heartbeat "30m"
   ```

6. **插件启用决策**:
   - 确认是否需要 mem0 (长期记忆功能)
   - 确认是否需要 weixin (微信集成功能)

### 低优先级 (本月内)

7. **建立技能清单**:
   - 维护官方技能列表
   - 区分核心技能 vs 实验性技能

8. **定期清理计划**:
   - 识别不再使用的技能
   - 建立技能使用统计机制

---

## 趋势对比 (与 2026-04 检查对比)

| 指标 | 2026-04 | 2026-05 | 趋势 |
|------|---------|---------|------|
| 共享技能数 | 101 | 101 | - |
| 非标准路径技能 | 77 | 77 | - |
| 符号链接数 | 25 | 25 | - |
| 任务问题数 | 39 | 210 | 🔴 激增 438% |
| Gateway 状态 | unreachable | unreachable | - |
| 系统更新 | 2026.4.25 | 2026.4.27 | ✅ 已更新 |

---

## 附录

### A. 非标准路径技能完整列表 (77 个)

```
1password-1.0.1
a-stock-analysis-1.0.0
aminer-open-academic-1.0.5
architecture-designer-0.1.0
autoglm-browser-agent
autoglm-deepresearch
autoglm-generate-image
autoglm-open-link
autoglm-search-image
autoglm-websearch
automation-workflows-0.1.0
backtest-expert-0.1.0
baoyu-slide-deck
blog-writer-0.1.0
brainstorming-0.1.0
clawdefender-1
code-1.0.4
content-strategy-0.1.0
copywriting-0.1.0
debug-pro-1.0.0
executing-plans-0.1.0
feishu-chat-history
feishu-cron-reminder
feishu-doc-1.2.7
feishu-drive-1.0.0
feishu-perm
feishu-screenshot
feishu-send-file
ffmpeg-video-editor-1.0.0
find-skills
frontend-design-3-0.1.0
git-essentials-1.0.0
ima-1.0.0
interview-designer-1.0.0
lark-approval
lark-attendance
lark-base
lark-calendar
lark-contact
lark-doc
lark-drive
lark-event
lark-im
lark-mail
lark-minutes
lark-okr
lark-openapi-explorer
lark-shared
lark-sheets
lark-skill-maker
lark-slides
lark-task
lark-vc
lark-whiteboard
lark-wiki
lark-workflow-meeting-summary
lark-workflow-standup-report
market-research-1.0.0
memory-1.0.2
obsidian-ontology-sync-1.0.1
opencode-controller-1.0.0
remotion-best-practices
research-paper-writer-0.1.0
security-auditor-1.0.0
seo-1.0.3
seo-content-writer-2.0.0
session-logs-1.0.0
skill-vetter-1.0.0
social-content-generator-0.1.0
social-media-scheduler-1.0.0
supabase-postgres-best-practices
test-runner-1.0.0
tmux-1.0.0
ui-ux-pro-max-0.1.0
video-frames-1.0.0
web-design-guidelines
writing-plans-0.1.0
```

### B. 系统状态摘要

```
OS: macos 26.5 (arm64) · node 23.11.0
Dashboard: http://192.168.10.10:18789/
Channel: stable (default)
Update: available · pnpm · npm update 2026.4.27
Gateway: local · ws://127.0.0.1:18789 · unreachable (missing scope: operator.read)
Gateway service: LaunchAgent installed · not loaded · unknown
Node service: LaunchAgent not installed
Agents: 30 · 21 bootstrap files present · sessions 616
Memory: 1 files · 1 chunks · dirty · sources memory
Plugin compatibility: none
Probes: skipped (use --deep)
Events: none
Tasks: 17 active · 0 queued · 17 running · 210 issues · audit 17 errors · 6 warn · 210 tracked
Heartbeat: 30m (main), disabled (29 agents)
Sessions: 616 active · default glm-4.7 (200k ctx) · 30 stores
```

---

## 下次检查

**下次检查日期**: 2026-06-01 09:00

---

*报告生成时间: 2026-05-01 09:55*  
*版本: V1.2*  
*状态: 已完成，多项待整改*
