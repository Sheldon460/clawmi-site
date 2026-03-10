# MI-TOU 技能索引

> **技能放置规范**: 根据 OpenClaw 技能三层架构，投资分析技能归属于 mi-ce-invest (行情分析师) 专属目录，mi-tou 通过符号链接调用。

---

## 📁 技能位置

| 技能名称 | 实际位置 | mi-tou 访问路径 | 状态 |
|---------|---------|---------------|------|
| stock-analysis | `workspace/mi-ce-invest/skills/stock-analysis/` | `workspace/mi-tou/skills/stock-analysis/` | ✅ 已链接 |
| hk-ai-stock-expert | `workspace/mi-ce-invest/skills/hk-ai-stock-expert/` | `workspace/mi-tou/skills/hk-ai-stock-expert/` | ✅ 已链接 |
| a-stock-monitor | `workspace/mi-ce-invest/skills/a-stock-monitor/` | `workspace/mi-tou/skills/a-stock-monitor/` | ✅ 已链接 |
| stock-monitor | `workspace/mi-ce-invest/skills/stock-monitor/` | `workspace/mi-tou/skills/stock-monitor/` | ✅ 已链接 |

---

## 🔗 符号链接说明

```
mi-tou/skills/
├── stock-analysis      → ../../mi-ce-invest/skills/stock-analysis
├── hk-ai-stock-expert  → ../../mi-ce-invest/skills/hk-ai-stock-expert
├── a-stock-monitor     → ../../mi-ce-invest/skills/a-stock-monitor
└── stock-monitor       → ../../mi-ce-invest/skills/stock-monitor
```

**优势**:
- ✅ 技能文件只有一份，避免重复
- ✅ mi-ce-invest 维护技能，mi-tou 直接调用
- ✅ 技能更新时只需更新源目录
- ✅ 符合"技能所有者"原则

---

## 📊 技能归属原则

根据 AGENTS.md 职能分工：

| Agent | 职位 | 核心职能 | 技能所有权 |
|-------|------|---------|-----------|
| **mi-ce-invest** | 行情分析师 | 深度调研、量化风控、宏观预警 | ✅ 技能所有者 |
| **mi-tou** | 资产管理师 | 全球市场监控、资产配置、增值 | ✅ 技能使用者 |

---

## 🛠️ 使用方式

### 直接调用 Python 脚本

```bash
# 股票深度分析
python3 /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-tou/skills/stock-analysis/stock_analysis.py --symbol 600519 --name 贵州茅台

# 港股 AI 投研
python3 /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-tou/skills/hk-ai-stock-expert/hk_ai_expert.py --symbol 00700.HK

# A 股实时监控
python3 /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-tou/skills/a-stock-monitor/a_stock_monitor.py --report brief

# 股票实时监控
python3 /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-tou/skills/stock-monitor/realtime_monitor.py --watchlist watchlist.json
```

### 通过 sessions_spawn 调用 mi-ce-invest

```python
# 调用行情分析师进行深度分析
sessions_spawn(
    agentId="mi-ce-invest",
    task="分析 600519 贵州茅台的投资价值"
)
```

---

## 📝 技能文件清单

### stock-analysis (股票深度分析)
- `stock_analysis.py` (16KB) - 8 维评分体系核心
- `valuation_models.py` (9KB) - DCF/PE/PB/PS/PEG 估值模型
- `technical_analysis.py` (15KB) - 均线/RSI/MACD/布林带
- `portfolio_manager.py` (15KB) - 持仓管理/止损止盈
- `SKILL.md` (7KB) - 技能说明文档

### hk-ai-stock-expert (港股 AI 投研)
- `hk_ai_expert.py` (13KB) - 港股 AI 个股深度分析
- `southbound_flow.py` (5KB) - 南向资金分析
- `industry_chain.py` (6KB) - AI 产业链图谱
- `analyst_ratings.py` (4KB) - 大行评级汇总
- `SKILL.md` (8KB) - 技能说明文档

### a-stock-monitor (A 股实时监控)
- `a_stock_monitor.py` (10KB) - A 股实时监控与预警
- `SKILL.md` (11KB) - 技能说明文档

### stock-monitor (股票实时监控)
- `realtime_monitor.py` (9KB) - 实时监控核心脚本
- `watchlist.json` (1KB) - 监控股票列表配置
- `alert_config.json` (295B) - 预警条件配置
- `SKILL.md` (4KB) - 技能说明文档

**总计**: 4 个技能，16 个文件，约 120KB 代码

---

## 🔄 技能更新流程

1. **技能维护者**: mi-ce-invest (行情分析师)
2. **更新位置**: `workspace/mi-ce-invest/skills/<skill>/`
3. **自动同步**: 符号链接自动指向最新版本
4. **无需操作**: mi-tou 自动使用更新后的技能

---

## ⚠️ 注意事项

1. **不要修改符号链接**: 修改 mi-tou/skills/ 下的链接文件不会影响源文件
2. **技能更新**: 需要更新技能时，修改 mi-ce-invest/skills/ 下的源文件
3. **新增技能**: 新增投资类技能应放在 mi-ce-invest/skills/，然后创建符号链接
4. **权限问题**: 确保 mi-tou 有权限读取 mi-ce-invest 的技能文件

---

*最后更新：2026-03-10 | 维护者：mi-tou (幂投)*
