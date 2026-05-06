---
name: a-stock-monitor
description: "A 股量化监控技能。多因子选股、量化策略回测、自动交易信号、板块轮动监控。支持 akshare 数据源，A 股全市场覆盖。"
metadata: { "openclaw": { "emoji": "🤖", "requires": { "bins": ["python3"], "pip": ["akshare", "pandas", "numpy", "ta-lib", "backtrader"] } } }
---

# A 股量化监控技能 (A-Stock Monitor)

## 核心职能

作为幂家军的行情分析师 (mi-ce-invest)，本技能负责**A 股量化选股与策略监控**，提供多因子选股、策略回测和自动交易信号。

## 当以下情况时使用此技能

✅ **USE this skill when:**

- "量化选股/多因子选股"
- "策略回测/历史表现"
- "自动交易信号生成"
- "板块轮动监控"
- "龙虎榜数据分析"
- "涨停板复盘"
- "资金流向量化分析"
- "量化策略优化"

❌ **DON'T use this skill when:**

- 个股深度基本面分析 → 使用 `stock-analysis` 技能
- 港股/美股分析 → 使用对应技能
- 实时行情查询 → 使用 `stock-monitor` 技能
- 主观判断投资建议 → 量化仅供参考

## 量化策略库

### 1. 多因子选股策略

```python
# 因子类别
- 价值因子：PE、PB、PS、PEG
- 成长因子：营收增长、净利润增长
- 质量因子：ROE、ROA、毛利率
- 动量因子：动量、反转、RSI
- 资金因子：北向资金、主力流向
- 技术因子：均线、MACD、布林带

# 因子加权
综合评分 = 0.25*价值 + 0.20*成长 + 0.20*质量 + 0.15*动量 + 0.10*资金 + 0.10*技术
```

### 2. 板块轮动策略

```python
# 轮动信号
- 板块相对强度 (RS)
- 资金流入排名
- 景气度指标
- 政策催化

# 轮动周期
- 月度轮动：宏观驱动
- 周度轮动：资金驱动
- 日内轮动：情绪驱动
```

### 3. 涨停板策略

```python
# 涨停分析
- 首板/连板识别
- 涨停原因分类
- 封单强度分析
- 次日溢价统计

# 打板策略
- 早盘强势板
- 午后回封板
- 龙头股接力
```

### 4. 资金流策略

```python
# 资金监控
- 北向资金净流入
- 主力大单净流入
- 龙虎榜机构买入
- 融资融券变化

# 资金因子
- 资金流入强度
- 资金持续性
- 资金集中度
```

## 回测框架

### 回测参数

```python
# 基础设置
initial_capital = 1000000  # 初始资金 100 万
commission = 0.0003        # 佣金万分之三
slippage = 0.001           # 滑点 0.1%
benchmark = '000300.SH'    # 基准：沪深 300

# 交易规则
position_limit = 0.20      # 单只股票最大仓位 20%
stop_loss = 0.08           # 止损 8%
take_profit = 0.20         # 止盈 20%
holding_period = 5         # 平均持有期 5 天
```

### 回测指标

```python
# 收益指标
- 总收益率
- 年化收益率
- 超额收益 (vs 基准)
- 最大回撤

# 风险指标
- 波动率
- Sharpe 比率
- Sortino 比率
- Calmar 比率

# 交易指标
- 胜率
- 盈亏比
- 交易次数
- 平均持仓期
```

## 使用方法

### 1. 多因子选股

```bash
# 运行多因子选股
python3 quant_selector.py --strategy multi-factor --top 20

# 指定因子权重
python3 quant_selector.py --factors value:0.3,growth:0.3,quality:0.2,momentum:0.2

# 导出选股结果
python3 quant_selector.py --output selected_stocks.csv
```

### 2. 策略回测

```bash
# 回测多因子策略
python3 backtest.py --strategy multi-factor --start 2023-01-01 --end 2026-03-09

# 回测板块轮动
python3 backtest.py --strategy sector-rotation --period monthly

# 回测涨停策略
python3 backtest.py --strategy limit-up --year 2025

# 生成回测报告
python3 backtest.py --strategy multi-factor --report full
```

### 3. 实时监控

```bash
# 启动量化监控
python3 quant_monitor.py --realtime --interval 300

# 监控板块轮动
python3 quant_monitor.py --sector-rotation

# 监控资金流向
python3 quant_monitor.py --fund-flow --threshold 10000000

# 龙虎榜监控
python3 quant_monitor.py --longhu --auto-analyze
```

### 4. 交易信号

```bash
# 生成今日交易信号
python3 signal_generator.py --date 2026-03-10

# 信号推送
python3 signal_generator.py --notify feishu --webhook <url>

# 信号回测验证
python3 signal_generator.py --verify --days 30
```

## 输出格式

### 多因子选股结果

```
【多因子选股】2026-03-10
======================
筛选条件：全 A 股 | 排除 ST | 排除科创板
因子权重：价值 25% + 成长 20% + 质量 20% + 动量 15% + 资金 10% + 技术 10%

【选股结果 TOP20】
| 排名 | 代码 | 名称 | 综合分 | 价值 | 成长 | 质量 | 动量 | 资金 | 技术 |
|------|------|------|--------|------|------|------|------|------|------|
| 1 | 600519 | 贵州茅台 | 92 | 85 | 88 | 95 | 90 | 92 | 90 |
| 2 | 300750 | 宁德时代 | 89 | 82 | 95 | 88 | 88 | 90 | 85 |
| 3 | 002594 | 比亚迪 | 87 | 80 | 92 | 85 | 90 | 88 | 82 |
| 4 | 601318 | 中国平安 | 85 | 90 | 78 | 92 | 82 | 85 | 80 |
| 5 | 000858 | 五粮液 | 84 | 88 | 80 | 90 | 85 | 82 | 78 |
| ... | ... | ... | ... | ... | ... | ... | ... | ... | ... |

【行业分布】
白酒：3 只 | 新能源：4 只 | 金融：3 只 | 科技：5 只 | 消费：3 只 | 其他：2 只

【市值分布】
大盘股 (>500 亿): 8 只 | 中盘股 (100-500 亿): 9 只 | 小盘股 (<100 亿): 3 只
```

### 策略回测报告

```
【策略回测】多因子选股策略 (2023-01-01 ~ 2026-03-09)
================================================

【收益指标】
总收益率：+125.6% | 年化收益率：+32.4%
基准收益：+18.5% | 超额收益：+107.1%
最大回撤：-18.2% | 回撤恢复期：45 天

【风险指标】
波动率：22.5% | Sharpe 比率：1.44
Sortino 比率：1.82 | Calmar 比率：1.78

【交易统计】
交易次数：328 次 | 胜率：58.5%
盈亏比：2.1 | 平均持仓期：6.2 天
最佳交易：+28.5% (宁德时代) | 最差交易：-12.3% (XX 股票)

【月度收益分布】
正收益月份：24 个月 (75%) | 负收益月份：8 个月 (25%)
最佳月份：+18.5% (2024-03) | 最差月份：-8.2% (2024-08)

【年度收益】
2023 年：+35.2% | 2024 年：+42.8% | 2025 年：+28.5% | 2026YTD: +12.3%

【评价】
✅ 策略表现优秀，年化收益 32.4%，显著跑赢基准
✅ 风险控制良好，最大回撤 -18.2% 低于行业平均
✅ 胜率 58.5% + 盈亏比 2.1，正期望系统
⚠️ 2024 年 8 月回撤较大，需优化止损机制
```

### 交易信号

```
【交易信号】2026-03-10
====================

【买入信号】
| 代码 | 名称 | 信号强度 | 触发因子 | 建议仓位 | 目标价 | 止损价 |
|------|------|----------|----------|----------|--------|--------|
| 600519 | 贵州茅台 | ★★★★ | 价值 + 资金 | 15% | 1850 | 1550 |
| 300750 | 宁德时代 | ★★★★ | 成长 + 动量 | 12% | 220 | 175 |
| 002594 | 比亚迪 | ★★★ | 成长 + 技术 | 10% | 280 | 220 |
| 601318 | 中国平安 | ★★★ | 价值 + 质量 | 10% | 55 | 42 |

【卖出信号】
| 代码 | 名称 | 信号强度 | 触发因子 | 当前仓位 | 建议 |
|------|------|----------|----------|----------|------|
| 000001 | XX 股票 | ★★ | 技术破位 | 8% | 减仓 50% |
| 000002 | XX 股票 | ★ | 止损触发 | 5% | 清仓 |

【持仓调整】
- 加仓：贵州茅台 (+5%)、宁德时代 (+3%)
- 减仓：XX 股票 (-4%)
- 新建仓：比亚迪 (10%)、中国平安 (10%)
- 总仓位：78% → 82%
```

### 板块轮动监控

```
【板块轮动】2026-03-10
====================

【板块强度排名】
| 排名 | 板块 | RS 强度 | 资金流入 | 涨幅 | 趋势 |
|------|------|--------|----------|------|------|
| 1 | AI 人工智能 | 95 | +25 亿 | +3.2% | ↑↑↑ |
| 2 | 半导体 | 88 | +18 亿 | +2.8% | ↑↑ |
| 3 | 新能源 | 82 | +12 亿 | +2.1% | ↑↑ |
| 4 | 医药 | 75 | +8 亿 | +1.5% | ↑ |
| 5 | 消费 | 68 | +5 亿 | +0.8% | → |
| ... | ... | ... | ... | ... | ... |

【轮动建议】
超配：AI 人工智能、半导体
标配：新能源、医药
低配：消费、金融
回避：房地产、传统周期

【轮动逻辑】
- AI 板块：政策催化 + 资金持续流入
- 半导体：国产替代 + 周期复苏
- 新能源：估值修复 + 出海逻辑
```

## 文件结构

```
~/.openclaw/workspace-jiaoyi/skills/a-stock-monitor/
├── SKILL.md                  # 本文件
├── quant_selector.py         # 多因子选股
├── backtest.py               # 策略回测
├── quant_monitor.py          # 实时监控
├── signal_generator.py       # 交易信号
├── sector_rotation.py        # 板块轮动
├── fund_flow.py              # 资金流向
├── longhu_analysis.py        # 龙虎榜分析
├── limit_up_strategy.py      # 涨停板策略
├── strategies/               # 策略库
│   ├── multi_factor.py
│   ├── sector_rotation.py
│   ├── limit_up.py
│   └── fund_flow.py
├── data/                     # 数据缓存
│   ├── daily/                # 日线数据
│   ├── fundamentals/         # 基本面数据
│   ├── factors/              # 因子数据
│   └── signals/              # 信号记录
└── reports/                  # 回测报告
    ├── backtest_results/
    └── daily_reports/
```

## 数据库设计

### 信号记录表

```sql
CREATE TABLE trading_signals (
    id INTEGER PRIMARY KEY,
    signal_date DATE NOT NULL,
    symbol TEXT NOT NULL,
    signal_type TEXT,  -- buy/sell/hold
    signal_strength INTEGER,  -- 1-5 stars
    trigger_factors TEXT,
    suggested_position REAL,
    target_price REAL,
    stop_loss REAL,
    entry_price REAL,
    exit_price REAL,
    profit_loss REAL,
    profit_loss_pct REAL,
    status TEXT,  -- pending/active/closed
    created_at TIMESTAMP,
    closed_at TIMESTAMP
);

CREATE TABLE backtest_results (
    id INTEGER PRIMARY KEY,
    strategy_name TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    total_return REAL,
    annual_return REAL,
    benchmark_return REAL,
    max_drawdown REAL,
    sharpe_ratio REAL,
    sortino_ratio REAL,
    win_rate REAL,
    profit_loss_ratio REAL,
    trade_count INTEGER,
    report_path TEXT,
    created_at TIMESTAMP
);
```

## 数据源

| 数据类型 | 数据源 | 频率 |
|----------|--------|------|
| 行情数据 | akshare/新浪财经 | 实时 |
| 财务数据 | akshare/Choice | 季报 |
| 资金流向 | akshare/东方财富 | 实时 |
| 龙虎榜 | akshare/交易所 | 盘后 |
| 北向资金 | akshare/港交所 | 实时 |

## 注意事项

1. **回测过拟合**: 避免过度优化参数
2. **交易成本**: 回测需考虑佣金、印花税、滑点
3. **停牌处理**: 停牌股票无法交易，回测需排除
4. **数据质量**: 复权处理、异常值处理
5. **实盘差异**: 回测结果不代表未来表现

## 与其他技能协作

- **stock-monitor**: 实时监控触发量化信号
- **stock-analysis**: 量化选股后深度分析
- **mi-shu-data**: 回测结果可视化
- **mi-wen**: 生成量化报告文案

---

*版本：V1.0 | 最后更新：2026-03-10 | 维护者：幂策 (mi-ce-invest)*
