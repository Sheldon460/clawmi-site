# 幂家军全员记忆索引

> 28 位 Agent 的记忆系统总览

## 📊 记忆系统状态

| Agent | 工作空间 | Obsidian 同步 | 今日日志 |
|-------|----------|---------------|----------|
| main | ✅ | ✅ | ✅ 2026-03-26 |
| mi-ling | ✅ | ✅ | 🔄 待创建 |
| xiao-mi | ✅ | ✅ | 🔄 待创建 |
| mi-ma-arch | ✅ | ✅ | 🔄 待创建 |
| mi-ma-code | ✅ | ✅ | 🔄 待创建 |
| mi-wen | ✅ | ✅ | 🔄 待创建 |
| mi-hua | ✅ | ✅ | 🔄 待创建 |
| mi-ying | ✅ | ✅ | 🔄 待创建 |
| mi-sheng | ✅ | ✅ | 🔄 待创建 |
| mi-zhi | ✅ | ✅ | 🔄 待创建 |
| mi-xin | ✅ | ✅ | 🔄 待创建 |
| mi-book | ✅ | ✅ | 🔄 待创建 |
| mi-tui | ✅ | ✅ | 🔄 待创建 |
| mi-pai | ✅ | ✅ | 🔄 待创建 |
| mi-bo | ✅ | ✅ | 🔄 待创建 |
| mi-hu | ✅ | ✅ | 🔄 待创建 |
| mi-cai | ✅ | ✅ | 🔄 待创建 |
| mi-tou | ✅ | ✅ | 🔄 待创建 |
| mi-ce-invest | ✅ | ✅ | 🔄 待创建 |
| mi-shu-data | ✅ | ✅ | 🔄 待创建 |
| mi-fa | ✅ | ✅ | 🔄 待创建 |
| mi-ren | ✅ | ✅ | 🔄 待创建 |
| mi-site | ✅ | ✅ | 🔄 待创建 |
| mi-wei-sec | ✅ | ✅ | 🔄 待创建 |
| mi-wei-guard | ✅ | ✅ | 🔄 待创建 |
| mi-ce | ✅ | ✅ | 🔄 待创建 |
| mi-yun | ✅ | ✅ | 🔄 待创建 |
| mi-dang | ✅ | ✅ | 🔄 待创建 |

## 📁 目录结构

```
workspace/
├── main/memory/              # 系统总管
├── mi-ling/memory/           # 运营总监
├── mi-ma-arch/memory/        # 首席架构师
├── mi-wen/memory/            # 内容创作师
├── mi-hua/memory/            # 视觉设计师
├── ... (共 28 个)

Obsidian/
└── OpenClaw_Output/
    ├── main/memory/
    ├── mi-ling/memory/
    ├── mi-ma-arch/memory/
    ├── mi-wen/memory/
    ├── mi-hua/memory/
    └── ... (共 28 个)
```

## 🏢 群组记忆

| 项目 | 路径 | 说明 |
|------|------|------|
| 群组 README | `group-memory/README.md` | 群组记忆系统说明 |
| 群组日志 | `group-memory/daily-logs/` | 群组每日对话 |
| 群组项目 | `group-memory/projects/` | 跨 Agent 协作项目 |
| 成员贡献 | `group-memory/members/` | Agent 群组贡献统计 |

## 🔍 快速查询

### 查看群组今日对话
```
workspace/main/group-memory/daily-logs/2026-03-26.md
```

### 查看某个 Agent 的今日工作
```
workspace/{agent}/memory/daily-logs/2026-03-26.md
```

### 查看某个 Agent 的项目
```
workspace/{agent}/memory/projects/active/
```

### 查看所有 Agent 的汇总
```
workspace/main/memory/AGENTS-INDEX.md
```

## 🚀 自动记录机制

每个 Agent 遵循相同的规则：
1. **每次对话结束** → 追加到 `daily-logs/YYYY-MM-DD.md`
2. **涉及新项目** → 创建 `projects/active/项目名.md`
3. **重要讨论** → 生成 `summaries/YYYYMMDD-HHMM-主题.md`
4. **每日首次对话** → 创建新的日期日志文件

---
*幂家军记忆系统 V1.0 | 28 Agent 全覆盖*
