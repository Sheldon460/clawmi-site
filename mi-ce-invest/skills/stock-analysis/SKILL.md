---
name: stock-analysis
description: "股票深度分析技能。8 维评分体系、基本面分析、技术面分析、估值模型、持仓管理。支持美股/港股/A 股深度研究。"
metadata: { "openclaw": { "emoji": "🔬", "requires": { "bins": ["python3"], "pip": ["yfinance", "akshare", "pandas", "numpy"] } } }
---

# 股票深度分析技能 (Stock Analysis)

## 核心职能

作为幂家军的行情分析师 (mi-ce-invest)，本技能负责**股票深度研究与分析**，提供 8 维评分体系和投资建议。

## 当以下情况时使用此技能

✅ **USE this skill when:**

- "分析 XX 股票的投资价值"
- "XX 公司基本面怎么样"
- "这只股票值得买入吗"
- "生成股票深度研究报告"
- "估值分析/目标价预测"
- "财务健康度评估"
- "技术面分析 (支撑/阻力)"
- "持仓建议/仓位管理"

❌ **DON'T use this skill when:**

- 实时行情查询 → 使用 `stock-monitor` 技能
- 港股南向资金分析 → 使用 `hk-ai-stock-expert` 技能
- 短线交易信号 → 使用量化监控系统
- 期权/期货分析 → 使用衍生品工具

## 8 维评分体系

### 评分维度与权重

| 维度 | 权重 | 评分标准 |
|------|------|----------|
| **1. 基本面** | 15% | 营收增长、利润率、ROE |
| **2. 成长性** | 15% | 营收 CAGR、净利润 CAGR |
| **3. 估值** | 15% | PE、PB、PEG、DCF |
| **4. 财务健康** | 10% | 负债率、现金流、利息覆盖 |
| **5. 行业地位** | 10% | 市场份额、竞争壁垒 |
| **6. 管理层** | 10% | 管理层背景、股权激励 |
| **7. 技术面** | 15% | 趋势、支撑/阻力、RSI、MACD |
| **8. 资金面** | 10% | 主力流向、北向/南向资金 |

### 综合评级

```
90-100 分：⭐⭐⭐⭐⭐ 强烈推荐 (Strong Buy)
80-89 分：  ⭐⭐⭐⭐ 推荐 (Buy)
70-79 分：  ⭐⭐⭐ 持有 (Hold)
60-69 分：  ⭐⭐ 谨慎 (Underperform)
<60 分：    ⭐ 卖出 (Sell)
```

## 分析方法

### 1. 基本面分析

```python
# 核心指标
- 营收 (Revenue): 同比增长率
- 净利润 (Net Income): 同比增长率
- 毛利率 (Gross Margin): 趋势分析
- ROE/ROA: 盈利能力
- EPS: 每股收益增长
```

### 2. 估值模型

```python
# 相对估值
- PE (市盈率): vs 行业平均 vs 历史中位数
- PB (市净率): 资产估值
- PEG: 成长调整估值
- PS (市销率): 高增长公司

# 绝对估值
- DCF (现金流折现): 内在价值计算
- DD (股利折现): 分红股票估值
```

### 3. 技术面分析

```python
# 趋势指标
- MA20/MA60/MA200: 均线系统
- MACD: 趋势动能
- RSI: 超买超卖 (70/30)
- Bollinger Bands: 波动区间

# 支撑/阻力
- 前期高低点
- 成交密集区
- 斐波那契回撤位
```

### 4. 资金面分析

```python
# A 股
- 北向资金流向
- 主力资金净流入
- 融资融券余额

# 港股
- 南向资金流向
- 港股通持仓
- 大行持仓变化

# 美股
- 机构持仓变化
-  insider trading
- 空头比例
```

## 使用方法

### 1. 深度分析报告

```bash
# 分析单只股票
python3 stock_analysis.py --symbol 600519 --report full

# 分析多只股票
python3 stock_analysis.py --symbols AAPL,MSFT,GOOGL

# 指定分析维度
python3 stock_analysis.py --symbol 00700.HK --focus valuation,technical
```

### 2. 估值计算

```bash
# DCF 估值
python3 stock_analysis.py --symbol AAPL --model DCF

# 相对估值
python3 stock_analysis.py --symbol 600519 --model PE,PB,PEG

# 目标价预测
python3 stock_analysis.py --symbol TSLA --target-price
```

### 3. 持仓管理

```bash
# 持仓分析
python3 stock_analysis.py --portfolio portfolio.json

# 仓位建议
python3 stock_analysis.py --symbol 600519 --position-advice

# 止损止盈
python3 stock_analysis.py --symbol 600519 --stop-loss --take-profit
```

## 输出格式

### 深度分析报告

```
【股票深度分析】贵州茅台 (600519)
=====================================

📊 综合评分：85/100 ⭐⭐⭐⭐ 推荐

【8 维评分】
基本面：    90/100 ██████████
成长性：    80/100 ████████
估值：      70/100 ███████
财务健康：  95/100 ██████████
行业地位：  90/100 ██████████
管理层：    85/100 ████████
技术面：    75/100 ███████
资金面：    80/100 ████████

【核心观点】
✅ 优势：品牌护城河深厚，现金流充沛，ROE 领先行业
⚠️ 风险：估值偏高，政策风险，消费降级

【估值分析】
当前 PE: 35x | 行业平均：28x | 历史中位数：32x
DCF 目标价：1850 元 | 上行空间：+10%

【技术面】
趋势：上升通道 | 支撑：1600 元 | 阻力：1750 元
RSI: 55 (中性) | MACD: 金叉

【操作建议】
建议仓位：15-20%
买入区间：1600-1650 元
止损位：1550 元 (-5%)
目标价：1850 元 (+10%)
```

### Hot Scanner 选股

```
【Hot Scanner】今日选股结果
==========================
筛选条件：PE<20 AND ROE>15% AND 营收增长>20%

| 代码 | 名称 | 评分 | PE | ROE | 增长 | 评级 |
|------|------|------|----|----|----|----|
| 002594 | 比亚迪 | 88 | 18 | 18% | 35% | 推荐 |
| 300750 | 宁德时代 | 85 | 19 | 16% | 28% | 推荐 |
| 600519 | 贵州茅台 | 82 | 35 | 30% | 15% | 持有 |
```

## 文件结构

```
~/.openclaw/workspace-jiaoyi/skills/stock-analysis/
├── SKILL.md                  # 本文件
├── stock_analysis.py         # 分析核心脚本
├── valuation_models.py       # 估值模型库
├── technical_analysis.py     # 技术分析库
├── portfolio_manager.py      # 持仓管理
├── templates/                # 报告模板
│   ├── full_report.md
│   ├── quick_analysis.md
│   └── valuation_report.md
└── data/                     # 数据缓存
    ├── fundamentals/
    ├── technicals/
    └── valuations/
```

## 数据库设计

### 持仓管理数据库

```sql
CREATE TABLE positions (
    id INTEGER PRIMARY KEY,
    symbol TEXT NOT NULL,
    name TEXT,
    quantity REAL,
    avg_cost REAL,
    current_price REAL,
    market_value REAL,
    profit_loss REAL,
    profit_loss_pct REAL,
    position_pct REAL,
    rating TEXT,
    target_price REAL,
    stop_loss REAL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE analysis_history (
    id INTEGER PRIMARY KEY,
    symbol TEXT NOT NULL,
    analysis_date DATE,
    overall_score REAL,
    fundamental_score REAL,
    valuation_score REAL,
    technical_score REAL,
    rating TEXT,
    target_price REAL,
    report_path TEXT
);
```

## 注意事项

1. **数据延迟**: 财报数据有披露延迟
2. **估值假设**: DCF 模型对假设敏感，需审慎使用
3. **技术面局限**: 技术分析不适用于所有市场环境
4. **风险提示**: 分析仅供参考，不构成投资建议

## 与其他技能协作

- **stock-monitor**: 实时监控发现异动，触发深度分析
- **hk-ai-stock-expert**: 港股标的联合分析
- **mi-wen**: 生成投资报告文案
- **mi-shu-data**: 数据可视化图表

---

*版本：V1.0 | 最后更新：2026-03-10 | 维护者：幂策 (mi-ce-invest)*
