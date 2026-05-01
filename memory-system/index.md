# 日常记忆系统 - 索引

> 最后更新：2026-03-25

## 📂 目录结构

```
memory-system/
├── daily-logs/      # 每日工作日志
├── summaries/       # 讨论摘要
├── projects/        # 项目追踪
├── dashboard/       # Dashboard 数据
└── index.md         # 本文件
```

## 🔍 快速查询

### 按日期查询
```bash
# 查看某日日志
cat daily-logs/YYYY-MM-DD.md

# 查看某日所有摘要
ls summaries/YYYY-MM-DD-*
```

### 按项目查询
```bash
# 查看项目信息
cat projects/项目名/info.md

# 查看项目相关讨论
grep -r "项目名" summaries/
```

### 关键词搜索
```bash
# 搜索所有日志
grep -r "关键词" daily-logs/

# 搜索所有摘要
grep -r "关键词" summaries/
```

## 📊 Dashboard 数据源
- Dashboard 数据：`dashboard/data.json`
- Dashboard HTML：`dashboard/index.html`

## 🤖 自动化命令

### 创建今日日志
```bash
./scripts/create-daily-log.sh
```

### 生成讨论摘要
```bash
./scripts/generate-summary.sh [讨论 ID]
```

### 更新 Dashboard
```bash
./scripts/update-dashboard.sh
```

## 📈 统计信息
| 类型 | 数量 | 最后更新 |
|------|------|---------|
| 日志 | 0 | - |
| 摘要 | 0 | - |
| 项目 | 0 | - |
