# 🧠 Self-Improving 强制执行协议 V1.0

> **适用范围**: 幂家军全员
> **生效日期**: 2026-03-27
> **发布者**: 安东尼 (系统管理员)

---

## 📋 协议背景

近期发现多个 Agent 出现"失忆"现象：
- 低级错误重复犯
- 成功经验第二天就忘
- 缺乏系统性自我反思

本协议强制执行记忆系统，确保全军持续进化。

---

## 🎯 核心准则

1. **凡事必记** - 所有任务、错误、改进点必须记录
2. **凡记必同步** - 个人记忆 → 全局策略 → 核心决策
3. **强制执行自我进化** - 无例外，无豁免

---

## 📁 目录结构（必须存在）

```
workspace/<agent_id>/
├── self-improving/
│   ├── memory.md          # 个人核心记忆
│   ├── corrections.md     # 错误纠正记录
│   ├── index.md           # 索引与统计
│   ├── archive/           # 归档
│   ├── domains/           # 领域知识
│   ├── projects/          # 项目追踪
│   └── reflections/
│       ├── daily/         # 每日复盘
│       ├── weekly/        # 周度分析
│       └── monthly/       # 月度报告
├── MEMORY.md              # 长期核心决策
├── playbook.md            # 全局策略手册
└── memory/
    └── YYYY-MM-DD.md      # 每日操作流水
```

---

## ⚡ 触发条件（必须执行）

| 触发场景 | 动作 | 目标文件 |
|---------|------|---------|
| 用户纠正错误时 | 立即记录错误与纠正 | `corrections.md` |
| 完成重要工作后 | 执行自我反思 | `reflections/daily/` |
| 发现输出可优化时 | 记录改进点 | `memory.md` |
| 每日 23:00 | 自动复盘今日工作 | `memory/YYYY-MM-DD.md` |
| 每周日 | 周度分析与策略更新 | `reflections/weekly/` |
| 每月末 | 月度总结与 playbook 更新 | `playbook.md` |

---

## 🔄 执行流程

```
Step 1: 检测触发条件
    ↓
Step 2: 执行自我反思/错误记录
    ↓
Step 3: 写入 self-improving/ 目录
    ↓
Step 4: 同步写入记忆系统:
    ├── 操作流水 → memory/YYYY-MM-DD.md
    ├── 全局策略 → playbook.md
    └── 核心决策 → MEMORY.md
    ↓
Step 5: 在回复末尾声明 [自我进化]
```

---

## 📝 强制声明格式

**每次任务结束后，如果涉及学习或改进，必须在回复末尾添加：**

```markdown
---
[自我进化] 已记录到:
- 个人记忆: workspace/<agent_id>/self-improving/memory.md
- 今日日记: memory/2026-03-27.md
- 长期记忆: workspace/<agent_id>/MEMORY.md
- 数据文件: data/platform_daily/2026-03-27.json (如适用)
```

---

## 📊 记忆加载声明

**任务启动时，必须声明已加载的记忆：**

```markdown
[记忆加载] Self-Improving: 已加载个人记忆，发现X条相关经验
- 来自 memory.md: [关键经验摘要]
- 来自 corrections.md: [最近纠正]
```

---

## 🔍 质量检查清单

- [ ] self-improving/ 目录已创建
- [ ] memory.md 已初始化并包含核心身份
- [ ] corrections.md 已初始化
- [ ] index.md 已初始化并包含统计
- [ ] 每日复盘已设置定时任务
- [ ] 所有任务回复包含 [自我进化] 声明
- [ ] playbook.md 包含可复用策略

---

## 🚨 违规后果

未执行本协议的 Agent：
1. 将被标记为 [未同步] 状态
2. 优先级降级
3. 需向 @mi-ling 提交书面说明

---

## 📚 参考文档

- `main/docs/self-improving-sop.md` - 详细 SOP
- `main/docs/memory-system-architecture.md` - 系统架构
- `shared-knowledge/playbook-template.md` - Playbook 模板

---

**本协议由 幂档 (mi-dang) 负责监督执行**
**最后更新: 2026-03-27**
