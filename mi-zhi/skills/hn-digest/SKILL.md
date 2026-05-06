# Hacker News Digest 技能

## 功能
抓取 Hacker News 前页热帖，支持按主题过滤 (tech/health/AI)。

## 用法

### 基本用法
```
hn              # 抓取前 10 条热帖
hn 10           # 抓取 10 条热帖
hn 20 AI        # 抓取 20 条 AI 相关热帖
hn tech         # 抓取 tech 主题热帖
hn 15 health    # 抓取 15 条 health 主题热帖
```

### 其他说法
```
pull HN         # 抓取 HN 热帖
HN digest       # 抓取 HN 热帖
hacker news     # 抓取 HN 热帖
```

## 支持的过滤主题

| 主题 | 关键词 |
|------|--------|
| tech | tech, technology, software, hardware, programming, code, developer, engineering |
| health | health, medical, medicine, healthcare, biotech, biology, drug, vaccine |
| AI | AI, artificial intelligence, machine learning, deep learning, neural network, LLM, GPT, Claude, OpenAI, Anthropic, model, training, inference |

## 输出格式

```
🌟 Hacker News AI Digest

==================================================
1. 标题
   🔗 链接
   👍 分数 points | 💬 评论数 comments

2. ...
==================================================

✅ Fetched X stories matching "主题"
```

## 技术实现

- **API**: Hacker News Firebase API
- **脚本**: `scripts/hn-digest.js`
- **依赖**: Node.js (内置 https 模块)

## 示例

### 抓取 AI 相关热帖
```bash
node scripts/hn-digest.js 10 AI
```

输出：
```
🤖 Fetching Hacker News (AI) Top Stories...

🌟 Hacker News AI Digest

==================================================
1. Yann LeCun's AI startup raises $1B in Europe's largest ever seed round
   🔗 https://www.ft.com/content/e5245ec3-1a58-4eff-ab58-480b6259aaf1
   👍 186 points | 💬 107 comments

2. No, it doesn't cost Anthropic $5k per Claude Code user
   🔗 https://martinalderson.com/posts/no-it-doesnt-cost-anthropic-5k-per-claude-code-user/
   👍 323 points | 💬 236 comments
...
==================================================

✅ Fetched 5 stories matching "AI"
```

## 集成建议

可以集成到每日 AI 资讯日报中：
```bash
# 采集 HN AI 热帖
node scripts/hn-digest.js 10 AI > /tmp/hn_ai.md

# 合并到日报
cat /tmp/hn_ai.md >> daily_report.md
```

## 更新日志

- 2026-03-10: 创建技能，支持基础过滤 (tech/health/AI)
