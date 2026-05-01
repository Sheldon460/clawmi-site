# 幂领 核心长期记忆

## 系统状态
- **状态**: ✅ Active
- **角色**: 幂家军运营总监 (COO)
- **职责**: 指挥28位特种兵，6大班组协同作战

---

## 重要里程碑

### 2026-04-27 [系统检查]
- **早间检查** (09:06 AM):
  - Gateway 服务运行中 (PID 39823)
  - 端口 18789 正常监听
  - 有活跃连接
  - Plist 文件存在但未加载
  - **观察**: LaunchAgent 未加载，重启后不会自动启动

- **午间复检** (12:00 PM):
  - Gateway 服务持续稳定运行（3小时+）
  - PID 39823 未变，无崩溃或重启
  - 端口 18789 正常监听 (*:18789)
  - Dashboard 可访问: http://192.168.10.10:18789/
  - RPC 连接: ⚠️ 需要 pairing 配置
  - LaunchAgent 仍处于未加载状态
  - **状态**: ✅ 系统运行非常稳定
  - **建议**: 运行 `openclaw gateway install` 重新加载 LaunchAgent 以实现持久化

- **晚间检查** (18:00 PM):
  - Gateway 服务全天稳定运行（9小时+）
  - PID 39823 自早间至今未变，零崩溃记录
  - CPU: 19.5%, 内存: 14.3% (2.4GB)
  - 系统负载: 3.97 4.33 4.51 ⚠️ 偏高
  - 内存增长: 从 1193MB → 2407MB (增长 101%)
  - 日志文件: 1.2MB，正常记录
  - **状态**: ✅ 系统全天稳定，但内存持续增长
  - **建议**:
    1. 运行 `openclaw gateway install` 实现 LaunchAgent 持久化
    2. 调查系统负载偏高的原因
    3. 长期运行后考虑重启服务释放内存

### 2026-05-01 [系统检查]
- **午间检查** (12:00 PM):
  - Gateway 服务运行中 (PID 47386)
  - 启动时间: 11:02 AM
  - 运行时长: 约 1 小时
  - 端口 18789 正常监听
  - LaunchAgent 未加载
  - 内存使用: 404MB (相比昨日 2GB+ 大幅下降) ✅
  - CPU: 0.0%
  - 系统负载: 6.98 6.04 6.79 ⚠️ 偏高
  - **关键发现**: 内存优化显著，但系统负载偏高
  - **建议**: 
    1. 运行 `openclaw gateway install` 实现 LaunchAgent 持久化（高优先级）
    2. 调查系统负载偏高原因
    3. 持续监控内存使用稳定性

---

### 2026-04-29 [系统检查]
- **午间检查** (12:00 PM):
  - Gateway 服务运行中 (PID 85254)
  - 端口 18789 正常监听
  - LaunchAgent 未加载
  - **观察**: PID 从昨日 39823 变更为 85254

- **晚间检查** (18:00 PM):
  - Gateway 服务运行中 (PID 89341)
  - 端口 18789 正常监听
  - LaunchAgent 未加载
  - **活跃连接**: 2 (Chrome + 本地 node)
  - **异常现象**: PID 在一天内多次变更 (39823 → 85254 → 89341)
  - **日志观察**: WebSocket reconnect 频繁，skill symlink 警告，memory dreaming cron 不可用
  - **状态**: ⚠️ 核心服务稳定但 PID 不稳定
  - **建议**:
    1. 运行 `openclaw gateway install` 实现 LaunchAgent 持久化（高优先级）
    2. 调查 PID 频繁变更原因
    3. 检查内存使用和重启机制

### 2026-03-04 [系统更新]
- **事件**: 火山引擎限额切换备用模型
- **指令来源**: 安东尼 (Sheldon)
- **变更内容**:
  - 🔴 火山引擎本月已限额
  - 🟢 备用模型: `bailian/kimi-k2.5`
  - 📋 影响范围: 全军28位特种兵
- **后续行动**: 所有任务默认使用 bailian/kimi-k2.5，待下月恢复火山引擎配额

### 2026-02-25
- **事件**: 接到首个实战任务 - 小红书爆款封面生成
- **成果**: 成功生成5张AI封面图
- **经验**: 建立了AI图像生成的工作流程

### 2026-02-26
- **事件**: 全军战备升级完成
- **行动**: 档案深度对齐，SOUL.md V2.8 重刻
- **状态**: ✅ 系统全面激活

### 2026-03-02 [核心突破]
- **事件**: 完成 Clawmi 品牌官网开发
- **客户**: 安东尼 (Sheldon)
- **任务**: 
  - 深度调研 https://hireaclaw.ai/
  - 学习 OpenClaw 生态
  - 打造幂领个人品牌官网
- **成果**:
  - ✅ 品牌名: Clawmi
  - ✅ 设计风格: 暗色科技风，深蓝/紫色渐变
  - ✅ 技术栈: Next.js 15 + React 19 + TypeScript
  - ✅ 6大页面: Hero, About, Capabilities, Projects, Contact, Footer
  - ✅ 构建成功: dist/ (1.4M)
  - ✅ 本地预览: http://localhost:8888
- **经验总结**:
  - CSS 变量管理: 避免使用未定义变量如 border-border
  - TypeScript 类型: 确保组件属性类型完整定义
  - 构建优化: Next.js 静态导出配置正确
  - 响应式设计: Tailwind CSS 断点使用

---

## 能力进化记录

### 技术能力
- ✅ Next.js 15 静态导出
- ✅ React 19 + TypeScript 5
- ✅ Tailwind CSS + Framer Motion
- ✅ 暗色主题设计系统
- ✅ 响应式布局设计

### 项目管理
- ✅ 需求分析 → 技术选型 → 开发 → 部署
- ✅ 版本控制 (Git)
- ✅ 文档编写 (README, DEPLOY)
- ✅ 客户沟通与汇报

### 设计能力
- ✅ 品牌视觉设计
- ✅ UI/UX 交互设计
- ✅ 动效设计 (Framer Motion)
- ✅ 响应式适配

---

## 工作方法论

### Ship-Learn 循环
1. **Ship** - 快速交付可用版本
2. **Learn** - 收集反馈并学习
3. **Iterate** - 持续迭代优化

### 结果导向
- 拒绝计划废话，只推产出 Rep
- Sandbox 隔离区产出，零污染
- 每日 21:00 发送全军战报

### 跨组协作
- 明确指挥链优先级
- 使用 sessions_send 跨 Agent 协调
- 分组批次唤醒，防止网关阻塞

---

## 记忆更新日期

- **首次激活**: 2026-02-26
- **最新更新**: 2026-04-29
- **版本**: MEMORY.md v1.1
- **状态**: ✅ Active

---

<p align="center">
  <strong>幂领</strong> - 幂家军运营总监 (COO)
  <br>
  <sub>指挥28位特种兵 · 打造顶级AI军团</sub>
</p>

## Promoted From Short-Term Memory (2026-04-29)

<!-- openclaw-memory-promotion:memory:memory/2026-04-21.md:19:22 -->
- | 日期 | 状态 | 备注 | |------|------|------| | 4/14 晚间 | 手动运行 | launchctl 未加载 | | 4/15 晚间 | 手动运行 | 持续稳定 15 小时 | [score=0.867 recalls=0 avg=0.620 source=memory/2026-04-21.md:19-22]
<!-- openclaw-memory-promotion:memory:memory/2026-04-21.md:23:24 -->
- | 4/20 晚间 | 手动运行 | 端口抖动到 18790 后回归 | | 4/21 午间 | LaunchAgent | ✅ 持久化生效 | [score=0.867 recalls=0 avg=0.620 source=memory/2026-04-21.md:23-24]

## Promoted From Short-Term Memory (2026-05-01)

<!-- openclaw-memory-promotion:memory:memory/2026-04-23.md:40:43 -->
- | 指标 | 午间 (12:00) | 晚间 (18:00) | 变化 | |:---|:---|:---|:---| | PID | 6731 | 47524 | 自动重启 ✅ | | 端口 | 18789 | 18789 | 无变化 | [score=0.901 recalls=0 avg=0.620 source=memory/2026-04-23.md:40-43]
