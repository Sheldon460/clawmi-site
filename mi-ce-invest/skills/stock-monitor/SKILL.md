---
name: stock-monitor
description: "股票实时监控技能。支持 A 股/港股/美股实时行情监控、异动预警、板块扫描。使用新浪财经/akshare 数据源，交易时段实时推送。"
metadata: { "openclaw": { "emoji": "📈", "requires": { "bins": ["python3"], "pip": ["akshare", "pandas", "numpy"] } } }
---

# 股票实时监控技能 (Stock Monitor)

## 核心职能

作为幂家军的行情分析师 (mi-ce-invest)，本技能负责**实时监控股票市场行情**，发现异动立即预警。

## 当以下情况时使用此技能

✅ **USE this skill when:**

- "监控 XX 股票/板块的实时行情"
- "扫描今日异动股票"
- "设置股价预警条件"
- "查看板块资金流向"
- "交易时段实时行情查询"
- "RSI 超买超卖预警"
- "成交量异常放大提醒"

❌ **DON'T use this skill when:**

- 深度基本面分析 → 使用 `stock-analysis` 技能
- 港股南向资金分析 → 使用 `hk-ai-stock-expert` 技能
- 历史数据回测 → 使用回测系统
- 非交易时段实时数据 → 数据可能不准确

## 监控配置

### 预警条件模板

```json
{
  "price_change_pct": 5.0,    // 单日涨幅 > 5%
  "rsi_overbought": 70,       // RSI > 70 超买
  "rsi_oversold": 30,         // RSI < 30 超卖
  "volume_ratio": 3.0,        // 成交量 > 3 倍均值
  "turnover_rate": 10.0       // 换手率 > 10%
}
```

### 监控板块列表 (28 个重点板块)

```json
{
  "technology": ["AI 人工智能", "半导体", "芯片", "5G", "云计算"],
  "new_energy": ["新能源", "光伏", "锂电池", "储能", "氢能"],
  "finance": ["银行", "证券", "保险", "互联网金融"],
  "consumer": ["白酒", "食品饮料", "家电", "消费电子"],
  "healthcare": ["医药", "医疗器械", "创新药", "CXO"],
  "manufacturing": ["机器人", "工业自动化", "高端装备"],
  "materials": ["稀土", "有色金属", "化工", "钢铁"],
  "others": ["军工", "传媒", "房地产", "基建"]
}
```

## 使用方法

### 1. 启动实时监控

```bash
# 监控单只股票
python3 realtime_monitor.py --symbol 600519 --interval 60

# 监控板块
python3 realtime_monitor.py --sector 半导体 --interval 300

# 加载 watchlist 批量监控
python3 realtime_monitor.py --watchlist watchlist.json
```

### 2. 设置预警推送

```bash
# 飞书推送配置
python3 realtime_monitor.py --notify feishu --webhook <webhook_url>

# 预警条件
python3 realtime_monitor.py --alert "price_change>5" --alert "rsi>70"
```

### 3. 查询实时数据

```bash
# 获取实时行情
python3 realtime_monitor.py --query 600519

# 获取板块行情
python3 realtime_monitor.py --sector-query AI
```

## 数据源

| 市场 | 数据源 | 延迟 | 交易时段 |
|------|--------|------|----------|
| A 股 | 新浪财经/akshare | 实时 | 09:30-11:30, 13:00-15:00 |
| 港股 | 新浪财经 | 15 分钟 | 09:30-12:00, 13:00-16:00 |
| 美股 | Yahoo Finance | 实时 | 21:30-04:00 (次日) |

## 输出格式

### 实时行情

```
【实时行情】贵州茅台 (600519)
💰 现价：1680.50 (+2.35%)
📊 成交量：125.8 万手
💹 成交额：21.2 亿元
📈 换手率：1.2%
⏰ 更新：10:35:28
```

### 预警推送

```
⚠️【异动预警】宁德时代 (300750)
🔔 触发条件：单日涨幅 > 5%
📊 现价：185.20 (+6.8%)
📈 成交量：3.2 倍均值
⏰ 时间：14:25
```

## 文件结构

```
~/.openclaw/workspace-jiaoyi/skills/stock-monitor/
├── SKILL.md              # 本文件
├── realtime_monitor.py   # 实时监控核心脚本
├── watchlist.json        # 监控股票列表配置
├── alert_config.json     # 预警条件配置
└── data/                 # 历史数据缓存
```

## 注意事项

1. **交易时段限制**: 非交易时段数据可能不准确
2. **API 限流**: 避免高频请求 (建议间隔≥3 秒)
3. **网络依赖**: 需要稳定的网络连接
4. **数据延迟**: 港股数据有 15 分钟延迟

## 与其他技能协作

- **stock-analysis**: 发现异动后，调用进行深度分析
- **hk-ai-stock-expert**: 港股标的联动分析
- **mi-zhi**: 情报组提供板块热点信息

---

*版本：V1.0 | 最后更新：2026-03-10 | 维护者：幂策 (mi-ce-invest)*
