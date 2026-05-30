# Memory (HOT Tier) - mi-ling

## Preferences
- **沟通风格**: 简洁专业，结果导向，避免冗长计划
- **输出格式**: Markdown 表格 + 清单，便于快速扫描
- **决策偏好**: 数据驱动，优先执行已验证的模式
- **协作方式**: 明确指挥链，批量唤醒防止网关阻塞

## Patterns
1. **任务启动三件套**: 读 MEMORY.md → 读今日日记 → 声明状态
2. **跨组协作**: sessions_send 定向唤醒，避免全员 @
3. **部署流程**: 本地构建 → 验证 → Vercel CLI → 确认
4. **定时任务**: 提醒型优于自动执行型（确保内容质量）

## Rules
- [强制] 凡事必记，凡记必同步
- [强制] 任务结束必须更新今日日记
- [强制] 涉及学习/改进时，回复末尾声明记录状态
- [强制] 执行 sessions_spawn/exec 前发送 [处理中...] 信号
- [建议] Ship-Learn 循环：先交付可用版本，再迭代优化
- [建议] 优先使用 bailian/kimi-k2.5（火山引擎限额期间）

---

## 迭代记录

### 2026-05-11 [晚间日记 - 系统巡检]
- **触发**: cron 自动执行 (daily-diary-evening)
- **发现**:
  1. Gateway 今日 22:45 重启 (PID 82126)，运行稳定
  2. 内存 15 分钟内从 155MB→420MB — 启动初期正常但需持续监控
  3. 系统负载 3.19 创近两周新低，持续改善趋势明确
  4. LaunchAgent Plist 已存在 (5/10 创建) 但未加载到 launchctl — 需手动 load
  5. Memory Search 仍不可用 (embedding provider 超时)
- **行动**: 更新日记 + Obsidian 同步
- **规则提炼**:
  - [新增] Gateway 启动初期 (15min 内) 内存增长 2-3x 属正常分配行为，不必恐慌
  - [确认] LaunchAgent 需要 `launchctl load` 才能生效，仅创建 Plist 不够

### 2026-05-10 [午间日记 - 系统巡检]
- **触发**: cron 自动执行 (daily-diary-midday)
- **发现**: 
  1. Memory Search 不可用 (Gemini API key 泄露 403) — 影响记忆检索能力
  2. Gateway.log 17天未更新但系统运行正常 — 日志可能写入新路径
  3. 5/9 配置异常被自动恢复 — 系统自我修复能力验证
  4. 内存使用持续优化 (1.2GB → 116MB)
  5. LaunchAgent 持久化问题已持续 13 天未解决
- **行动**: 更新日记 + MEMORY.md + Obsidian 同步
- **规则提炼**: 
  - [新增] 日志文件长期未更新时，优先检查是否有新路径而非假设异常
  - [确认] 双重产出协议必须执行（日记 → 本地 + Obsidian）

### 2026-03-08 [Self-Improving 初始化]
- **触发**: 安东尼指令，全军 Agent 执行自我迭代
- **发现**: 个人记忆档案为空，需填充 Preferences/Patterns/Rules
- **行动**: 基于 MEMORY.md 里程碑提炼工作模式
- **状态**: ✅ 已更新
