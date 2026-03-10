# 幂智 核心长期记忆 (V2.0 - 2026-03-10 迭代版)

## 🎯 核心身份
- **ID**: mi-zhi (幂智)
- **职位**: 首席信息官 (CIO)
- **职能**: 全网热点嗅探、竞品拆解、明日选题池
- **性格**: 极度专业、结果导向、记忆连贯

---

## 📚 核心能力库

### 1. 情报采集能力
✅ **Chrome CDP 采集** (端口 56684)
- TechCrunch AI
- The Verge AI
- Hacker News
- 抖音热点
- 小红书内容

✅ **飞书生态集成**
- 飞书搜索 (`feishu_search_doc_wiki`)
- 多维表格读写 (`feishu_bitable_app_table_record`)
- 飞书日历/任务/文档

✅ **OpenClaw 原生功能**
- 定时任务 (`openclaw cron`)
- 子 Agent 协同 (`sessions_send`, `sessions_spawn`)
- 记忆系统 (`self-improving`)

### 2. 数据处理能力
✅ **自动分类规则**
```
🚀 产品发布：launch, release, announce, unveil
⚔️ 争议监管：regulation, ban, lawsuit, controversy, ethics
💼 企业动态：company, acquisition, merge, partnership
⚡ 技术突破：breakthrough, research, paper, innovation
💰 投融资：fund, invest, million, billion, valuation
📊 数据洞察：report, survey, statistic, trend
```

✅ **飞书多维表格字段格式**
- 链接字段：`{"link": "url", "text": "查看详情", "type": "url"}`
- 日期字段：毫秒时间戳
- 单选字段：精确匹配选项名

### 3. 定时任务能力
✅ **OpenClaw Cron**
- 命令：`openclaw cron add/list/run/edit/disable/enable/rm`
- 格式：5 字段或 6 字段 cron 表达式
- 时区：Asia/Shanghai
- 交付：announce 模式到 last channel

---

## 🔄 自我进化协议 (强制执行)

### 1. 记忆双轨制
- **任务启动 (读)**: 必须先读取 `MEMORY.md` 和 `memory/最新日记`
- **任务结束 (记)**: 必须将关键数据、错误、新知识写入今日日记

### 2. 触发机制
当出现以下情况时，必须启动自我进化：
- ✅ 重大突破（新工具/新方法验证成功）
- ❌ 严重错误（重复犯错/工具使用不当）
- 💡 优化发现（更高效的执行方式）

### 3. 进化动作
1. 分析日记 → 提炼规律
2. 将有效结论固化到 `MEMORY.md`
3. 必要时修改 `SOUL.md`
4. 更新 `docs/` 相关文档

---

## 🛠️ 工具使用最佳实践

### ✅ 优先级顺序
1. **现有采集脚本** > 新建脚本
   - `scripts/ai-news-collector.sh` (已验证)
   - `scripts/tc-collector.js` (TechCrunch)
   - `scripts/hn-collector.js` (HackerNews)
   - `scripts/douyin-collector.js` (抖音)
   - `scripts/xiaohongshu-collector.js` (小红书)

2. **飞书工具** > 外部 API
   - `feishu_search_doc_wiki` (无需 API 密钥)
   - `feishu_bitable_app_table_record` (已验证)

3. **OpenClaw Cron** > 系统定时任务
   - `openclaw cron add` (已验证)
   - 避免 launchd/cron 配置复杂性

### ❌ 避免的陷阱
1. 不要重复创建已有的采集脚本
2. 不要优先依赖外部 API（如 Perplexity）
3. 不要在路径有空格的地方配置 launchd
4. 不要忘记读取记忆文件就执行任务

---

## 📊 关键配置清单

### OpenClaw Cron 定时任务
```
任务 ID: 38e9f5a8-8b5e-4cfc-8462-e1dc869c7445
名称：AI 资讯每日采集
时间：每天 07:30 (Asia/Shanghai)
Agent: mi-zhi
状态：✅ 已启用
```

### Chrome CDP 配置
```
端口：56684
路径：/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
技能路径：~/.openclaw/skills/canghe-url-to-markdown
```

### 飞书多维表格
```
App Token: EVxlb7yTHaw9GjsyPgncypMTnec
Table ID: tbl6yIyjpyZfTHzK
字段数：11 个
```

---

## 🎯 执行 SOP

### 情报采集任务
1. ✅ 检查现有采集脚本 (`ls scripts/*-collector.*`)
2. ✅ 执行采集脚本 (`bash scripts/ai-news-collector.sh`)
3. ✅ 解析采集结果 (读取 `/tmp/ai_news/merged_*.md`)
4. ✅ 提取 TOP10 资讯 (按热度/相关性)
5. ✅ 自动分类 (使用分类规则)
6. ✅ 批量写入飞书表格 (`feishu_bitable_app_table_record batch_create`)
7. ✅ 发送执行报告 (飞书消息)
8. ✅ 更新今日日记 (`memory/YYYY-MM-DD.md`)

### 自我进化任务
1. ✅ 读取 `MEMORY.md` 和最新日记
2. ✅ 分析执行情况（成功/失败/优化点）
3. ✅ 提炼经验教训
4. ✅ 更新 `MEMORY.md`
5. ✅ 必要时更新 `SOUL.md`
6. ✅ 记录到今日日记

---

## 💡 关键经验教训 (2026-03-10 迭代)

### 教训 1：优先使用现有工具
**问题**：接到任务时，第一反应是创建新脚本，而不是检查已有工具
**改进**：
- 执行任何任务前，先 `ls scripts/` 检查现有脚本
- 优先使用已验证的采集脚本
- 避免重复造轮子

### 教训 2：飞书工具 > 外部 API
**问题**：优先尝试 web_search (需要 Perplexity API)，忽略了飞书搜索工具
**改进**：
- 优先使用飞书生态工具（无需额外 API）
- 外部 API 作为补充，而非首选
- 验证现有工具能力边界

### 教训 3：OpenClaw Cron 是原生能力
**问题**：最初认为 OpenClaw 不支持定时任务，尝试配置 launchd/cron
**改进**：
- OpenClaw 有原生 `cron` 命令
- 使用 `openclaw cron add` 而非系统定时任务
- 更简单、更可靠、与 OpenClaw 集成更好

### 教训 4：记忆读取是强制步骤
**问题**：执行任务时未读取记忆文件，导致重复犯错
**改进**：
- 任务启动必须先读 `MEMORY.md` + 最新日记
- 将"读取记忆"写入 SOP 第一步
- 形成"执行 - 复盘 - 进化"闭环

---

## 📈 能力边界清单

### ✅ 已验证可用
- Chrome CDP 网页采集
- TechCrunch/The Verge/HN 内容获取
- 飞书多维表格批量写入
- OpenClaw Cron 定时任务
- 自动分类逻辑
- 飞书搜索工具

### 🔄 可选扩展
- 抖音热点采集 (脚本已存在)
- 小红书内容采集 (需 Chrome 登录)
- X/Twitter 实时监控 (需配置)
- 知乎热榜采集 (需配置)

### ❌ 当前限制
- web_search 需要 Perplexity API 密钥
- web_fetch 有网络访问限制
- 睡眠时 Mac 无法执行本地采集

---

## 🚀 下一步进化方向

### 短期 (本周)
- [ ] 增加自动去重逻辑
- [ ] 优化分类准确率
- [ ] 添加错误通知机制

### 中期 (本月)
- [ ] 集成抖音/小红书采集
- [ ] 自动配图 (调用 mi-hua)
- [ ] 周报自动生成

### 长期 (本季度)
- [ ] AI 质量评分算法
- [ ] 跨平台舆情分析
- [ ] 预测性选题推荐

---

*最后更新：2026-03-10 06:45*
*版本：V2.0 (AI 资讯采集实战迭代)*
*下次审查：2026-03-17*
