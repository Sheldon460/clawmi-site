# Auto-Evolution 定时任务配置

> 所有 Agent 的 auto-evolution 定时任务设置

---

## 🕐 定时任务表

| 时间 | 任务 | 执行者 | 说明 |
|------|------|--------|------|
| 每小时 | 快速扫描 | 各 Agent | 检查近期会话 |
| 每天 23:00 | 深度复盘 | 各 Agent | 日复盘 |
| 每周日 23:00 | 周度分析 | 各 Agent | 周复盘 |
| 每月1日 23:00 | 月度报告 | 各 Agent | 月复盘 |

---

## 🔧 配置方法

### 方法1: 系统 Cron (推荐)

添加到系统 crontab:
```bash
# 每小时快速扫描
0 * * * * cd /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/main && openclaw run auto-evolution --mode=hourly >> ~/auto-evolution/cron.log 2>&1

# 每天 23:00 深度复盘
0 23 * * * cd /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/main && openclaw run auto-evolution --mode=daily >> ~/auto-evolution/cron.log 2>&1

# 每周日 23:00 周度分析
0 23 * * 0 cd /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/main && openclaw run auto-evolution --mode=weekly >> ~/auto-evolution/cron.log 2>&1

# 每月1日 23:00 月度报告
0 23 1 * * cd /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/main && openclaw run auto-evolution --mode=monthly >> ~/auto-evolution/cron.log 2>&1
```

### 方法2: OpenClaw 内置调度

在 `~/.openclaw/config/cron.yaml` 添加:
```yaml
jobs:
  - name: auto-evolution-hourly
    schedule: "0 * * * *"
    command: "openclaw run auto-evolution --mode=hourly"
    
  - name: auto-evolution-daily
    schedule: "0 23 * * *"
    command: "openclaw run auto-evolution --mode=daily"
    
  - name: auto-evolution-weekly
    schedule: "0 23 * * 0"
    command: "openclaw run auto-evolution --mode=weekly"
    
  - name: auto-evolution-monthly
    schedule: "0 23 1 * *"
    command: "openclaw run auto-evolution --mode=monthly"
```

---

## 📋 各 Agent 状态

| Agent | auto-evolution | 定时任务 | 状态 |
|-------|---------------|----------|------|
| main | ✅ | ⏳ 待配置 | 活跃 |
| mi-ling | ✅ | ⏳ 待配置 | 活跃 |
| mi-* | ✅ | ⏳ 待配置 | 活跃 |
| xiao-mi | ✅ | ⏳ 待配置 | 活跃 |

---

## 📝 手动执行命令

```bash
# 快速扫描
openclaw run auto-evolution --mode=hourly

# 深度复盘
openclaw run auto-evolution --mode=daily

# 周度分析
openclaw run auto-evolution --mode=weekly

# 月度报告
openclaw run auto-evolution --mode=monthly
```

---

*配置时间: 2026-03-25*
