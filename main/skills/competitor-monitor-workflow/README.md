# 竞品监控日报工作流

## 概述
自动化竞品监控日报生成系统，整合 Agent-Reach + Summarize + GA4 + Feishu-Bot。

## 工作流程

```
抓取竞品动态（Agent-Reach）
    ↓
提取关键信息（Summarize）
    ↓
数据分析（GA4 + GSC）
    ↓
生成报告（Markdown）
    ↓
推送到飞书（Feishu-Bot）
```

## 已安装技能

| 技能 | 版本 | 用途 |
|------|------|------|
| agent-reach | 1.1.0 | 抓取14个平台动态 |
| summarize | 1.0.0 | 内容摘要提取 |
| ga4-analytics | 1.0.0 | 网站数据分析 |
| feishu-bot-manager | 1.0.0 | 飞书消息推送 |

## 使用示例

### 1. 抓取竞品动态

```bash
# Reddit 搜索
xreach search "OpenClaw" -n 10 --json

# Twitter 搜索（需配置）
xreach search "OpenClaw" -n 10 --json

# 小红书搜索
mcporter call 'xiaohongshu.search_feeds(keyword: "AI Agent")'
```

### 2. 提取关键信息

```bash
# 使用 summarize 提取要点
openclaw skills summarize run <URL>
```

### 3. 数据分析

```bash
# GA4 数据查询
openclaw skills ga4-analytics run --property-id "YOUR_PROPERTY" --start-date "7daysAgo"
```

### 4. 推送到飞书

```bash
# 使用 feishu-bot-manager 发送报告
openclaw skills feishu-bot-manager run --action send --message "报告内容"
```

## 自动化脚本

见 `scripts/daily-competitor-monitor.sh`
