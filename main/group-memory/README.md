# 幂家军群组记忆系统

> 记录群组对话、决策和协作

## 📁 目录结构

```
group-memory/
├── README.md              # 本文件
├── daily-logs/            # 群组每日对话记录
│   └── 2026-03-26.md
├── projects/              # 群组项目（跨 Agent 协作）
├── decisions/             # 群组决策记录
└── members/               # 成员贡献统计
    ├── mi-ling.md
    ├── mi-wen.md
    ├── mi-hua.md
    └── ...
```

## 🎯 记录范围

### 记录内容
- ✅ 群组中的对话和讨论
- ✅ 跨 Agent 协作项目
- ✅ 群组决策和共识
- ✅ 成员贡献和活跃度

### 不记录内容
- ❌ 单聊（在各自 Agent 的 memory/ 中）
- ❌ 系统内部日志
- ❌ 敏感信息

## 🔄 自动记录机制

| 触发条件 | 记录位置 | 内容 |
|----------|----------|------|
| 群组对话结束 | `daily-logs/YYYY-MM-DD.md` | 对话摘要 |
| 跨 Agent 项目 | `projects/项目名.md` | 项目进展 |
| 重要决策 | `decisions/YYYYMMDD-决策.md` | 决策记录 |
| 每日汇总 | `members/{agent}.md` | 成员贡献 |

## 📊 与单聊记忆的区别

| 维度 | 单聊记忆 | 群组记忆 |
|------|---------|----------|
| 位置 | `memory/daily-logs/` | `group-memory/daily-logs/` |
| 内容 | 一对一对话 | 群组讨论 |
| 参与者 | 用户 + 单个 Agent | 用户 + 多个 Agent |
| 决策 | 个人决策 | 群组共识 |

---
*幂家军群组记忆系统 V1.0*
