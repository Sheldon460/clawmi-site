# 📰 AI 资讯自动采集系统 - 完整版

## 🎯 目标
**每天 7:30 自动收集 10 条全网热点 AI 资讯，写入飞书多维表格**

表格地址：https://my.feishu.cn/base/EVxlb7yTHaw9GjsyPgncypMTnec

---

## ✅ 已完成配置

### 0. 采集测试（2026-03-10 06:38 最终版）⭐⭐⭐

**测试结果**：✅ 成功

**写入记录**：10 条高质量 AI 热点资讯

**数据源**：现有采集脚本 (`ai-news-collector.sh`)
- TechCrunch AI ✅ (17K)
- The Verge AI ✅ (21K)
- Hacker News ✅ (28K)
- 合并去重：66K

**采集工具**：
- Chrome CDP (端口 56684)
- 现有脚本：`scripts/ai-news-collector.sh`
- 无需额外 API 密钥！

**验证通过**：
- ✅ 飞书搜索可用（替代 web_search，无需 Perplexity API）
- ✅ 多维表格写入功能正常
- ✅ 链接字段格式正确
- ✅ 自动分类逻辑有效
- ✅ 定时任务已配置

### 1. OpenClaw 定时任务（已激活）⭐⭐⭐

**任务 ID**: `38e9f5a8-8b5e-4cfc-8462-e1dc869c7445`

**配置详情**：
```bash
名称：AI 资讯每日采集
Agent: mi-zhi
时间：每天 07:30 (Asia/Shanghai)
Cron 表达式：0 30 7 * * *
下次运行：in 1h
状态：idle (已启用)
```

**管理命令**：
```bash
# 查看任务列表
openclaw cron list

# 查看任务详情
openclaw cron status 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445

# 立即测试执行
openclaw cron run 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445

# 暂停任务
openclaw cron disable 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445

# 恢复任务
openclaw cron enable 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445

# 删除任务
openclaw cron rm 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445
```

---

## 🤖 mi-zhi 自动响应逻辑

当定时任务触发时，mi-zhi 会自动执行以下流程：

### 步骤 1：接收指令
收到消息：`收集今天的 AI 资讯，写入飞书多维表格`

### 步骤 2：搜索资讯
使用 `web_search` 工具搜索 10 条最新 AI 资讯：
- AI artificial intelligence news today
- machine learning breakthrough 2026
- AI product launch announcement
- AI regulation policy update
- AI startup funding investment
- LLM large language model news
- AI research paper publication
- generative AI new feature
- AI company acquisition merger
- AI ethics controversy debate

### 步骤 3：自动分类
根据关键词自动分类：
| 分类 | 关键词 |
|------|--------|
| 🚀 产品发布 | launch, release, announce, unveil |
| ⚔️ 争议监管 | regulation, ban, lawsuit, controversy, ethics |
| 💼 企业动态 | company, acquisition, merge, partnership |
| ⚡ 技术突破 | breakthrough, research, paper, innovation |
| 💰 投融资 | fund, invest, million, billion, valuation |
| 📊 数据洞察 | report, survey, statistic, trend |

### 步骤 4：写入表格
使用 `feishu_bitable_app_table_record` 批量写入：
```javascript
{
  "标题": news.title,
  "分类": category,
  "发布日期": Date.now(),
  "来源": news.source,
  "摘要": news.snippet,
  "链接": news.url,
  "热度评分": score,
  "发布状态": "待审核"
}
```

### 步骤 5：回复结果
在飞书中回复执行结果摘要。

---

## 📊 表格字段说明

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 标题 | 文本 | 资讯标题（主键） |
| 分类 | 单选 | 🚀产品/⚔️监管/💼企业/⚡技术/💰融资/📊数据 |
| 发布日期 | 日期 | 资讯发布日期 |
| 来源 | 文本 | 信息来源 |
| 摘要 | 文本 | 资讯摘要 |
| 链接 | 超链接 | 原文链接 |
| 热度评分 | 数字 | 0-10 分 |
| 采集时间 | 创建时间 | 自动记录 |
| 发布状态 | 单选 | 待审核/已发布/已归档 |
| 封面图 | 附件 | 可选 |

---

## 🔧 管理操作

### 查看任务状态
```bash
openclaw cron list
openclaw cron status 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445
```

### 立即测试（不等到 7:30）
```bash
openclaw cron run 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445
```

### 修改执行时间
```bash
# 改为每天早上 8:00
openclaw cron edit 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445 --cron "0 0 8 * * *"

# 改为每 12 小时执行一次
openclaw cron edit 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445 --every "12h"
```

### 查看执行历史
```bash
openclaw cron runs 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445
```

---

## ⚠️ 注意事项

1. **数据源**：
   - ✅ **TechCrunch AI** (已验证)
   - ✅ **The Verge AI** (已验证)
   - ✅ **Hacker News** (已验证)
   - 🔄 **抖音/小红书** (可选扩展)

2. **采集工具**：
   - ✅ Chrome CDP (端口 56684)
   - ✅ 现有脚本：`scripts/ai-news-collector.sh`
   - ✅ 无需额外 API 密钥！

3. **飞书授权**：确保飞书 OAuth 授权有效

4. **时区设置**：已设置为 Asia/Shanghai（北京时间）

5. **执行日志**：可通过 `openclaw cron runs` 查看历史执行记录

6. **链接字段格式**：
   ```json
   {"link": "https://...", "text": "查看详情", "type": "url"}
   ```

---

## 📈 后续优化

1. **增加资讯源**：RSS 订阅、Twitter API、知乎热榜
2. **智能去重**：避免重复采集相同新闻
3. **自动配图**：调用 mi-hua 生成封面图
4. **质量评分**：基于阅读量、转发量自动评分
5. **周报生成**：每周自动生成 AI 资讯周报

---

## 📞 故障排查

### 问题 1：任务未执行
```bash
# 检查任务状态
openclaw cron list

# 查看执行历史
openclaw cron runs

# 手动测试执行
openclaw cron run <task-id>
```

### 问题 2：web_search 失败
检查 Perplexity API 密钥配置：
```bash
# 在 Gateway 配置中添加
tools.web.search.perplexity.apiKey=your_key
```

### 问题 3：飞书写入失败
1. 检查飞书 OAuth 授权状态
2. 确认多维表格 token 正确
3. 验证表格权限设置

---

## 📁 相关文件

- 定时任务 ID：`38e9f5a8-8b5e-4cfc-8462-e1dc869c7445`
- 采集脚本：`scripts/collect-ai-news.js`（备用）
- 实施文档：`docs/AI_NEWS_COLLECTOR.md`
- 工作日记：`self-improving/memory/2026-03-10.md`

---

*创建时间：2026-03-10 06:27*  
*维护者：mi-zhi (幂智)*  
*版本：V2.0 (OpenClaw Cron 原生版)*
