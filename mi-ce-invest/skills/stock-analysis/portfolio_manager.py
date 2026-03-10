#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
持仓管理模块 (Portfolio Manager)
支持持仓分析、仓位管理、止损止盈、风险评估

维护者：幂策 (mi-ce-invest)
版本：V1.0
"""

import json
from datetime import datetime
from typing import Dict, List, Optional
from pathlib import Path


# ==================== 持仓数据结构 ====================

class Position:
    """单个持仓"""
    
    def __init__(
        self,
        symbol: str,
        name: str,
        quantity: float,
        avg_cost: float,
        current_price: float
    ):
        self.symbol = symbol
        self.name = name
        self.quantity = quantity
        self.avg_cost = avg_cost
        self.current_price = current_price
        
    @property
    def market_value(self) -> float:
        """市值"""
        return self.quantity * self.current_price
    
    @property
    def cost_value(self) -> float:
        """成本"""
        return self.quantity * self.avg_cost
    
    @property
    def profit_loss(self) -> float:
        """盈亏金额"""
        return self.market_value - self.cost_value
    
    @property
    def profit_loss_pct(self) -> float:
        """盈亏比例"""
        return (self.current_price - self.avg_cost) / self.avg_cost * 100
    
    def to_dict(self) -> Dict:
        return {
            "symbol": self.symbol,
            "name": self.name,
            "quantity": self.quantity,
            "avg_cost": self.avg_cost,
            "current_price": self.current_price,
            "market_value": round(self.market_value, 2),
            "cost_value": round(self.cost_value, 2),
            "profit_loss": round(self.profit_loss, 2),
            "profit_loss_pct": round(self.profit_loss_pct, 2)
        }


# ==================== 持仓组合 ====================

class Portfolio:
    """持仓组合"""
    
    def __init__(self, name: str = "我的持仓"):
        self.name = name
        self.positions: Dict[str, Position] = {}
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
    
    def add_position(
        self,
        symbol: str,
        name: str,
        quantity: float,
        avg_cost: float,
        current_price: float
    ):
        """添加/更新持仓"""
        self.positions[symbol] = Position(symbol, name, quantity, avg_cost, current_price)
        self.updated_at = datetime.now()
    
    def remove_position(self, symbol: str):
        """移除持仓"""
        if symbol in self.positions:
            del self.positions[symbol]
            self.updated_at = datetime.now()
    
    def update_price(self, symbol: str, current_price: float):
        """更新股价"""
        if symbol in self.positions:
            self.positions[symbol].current_price = current_price
            self.updated_at = datetime.now()
    
    @property
    def total_market_value(self) -> float:
        """总市值"""
        return sum(p.market_value for p in self.positions.values())
    
    @property
    def total_cost_value(self) -> float:
        """总成本"""
        return sum(p.cost_value for p in self.positions.values())
    
    @property
    def total_profit_loss(self) -> float:
        """总盈亏"""
        return self.total_market_value - self.total_cost_value
    
    @property
    def total_profit_loss_pct(self) -> float:
        """总盈亏比例"""
        if self.total_cost_value == 0:
            return 0
        return self.total_profit_loss / self.total_cost_value * 100
    
    def get_position_weights(self) -> Dict[str, float]:
        """获取各持仓权重"""
        total = self.total_market_value
        if total == 0:
            return {}
        return {
            symbol: p.market_value / total * 100
            for symbol, p in self.positions.items()
        }
    
    def get_sector_allocation(self) -> Dict:
        """行业分布 (需要外部数据)"""
        # 简化版本，实际需要从外部获取行业分类
        return {"未分类": 100.0}
    
    def to_dict(self) -> Dict:
        return {
            "name": self.name,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "total_market_value": round(self.total_market_value, 2),
            "total_cost_value": round(self.total_cost_value, 2),
            "total_profit_loss": round(self.total_profit_loss, 2),
            "total_profit_loss_pct": round(self.total_profit_loss_pct, 2),
            "position_count": len(self.positions),
            "positions": {symbol: p.to_dict() for symbol, p in self.positions.items()},
            "weights": {symbol: round(w, 2) for symbol, w in self.get_position_weights().items()}
        }


# ==================== 仓位管理 ====================

def calculate_position_size(
    total_capital: float,
    risk_per_trade: float = 0.02,
    entry_price: float,
    stop_loss_price: float
) -> Dict:
    """
    计算合理仓位大小 (基于风险)
    
    参数:
        total_capital: 总资金
        risk_per_trade: 单笔风险 (默认 2%)
        entry_price: 买入价
        stop_loss_price: 止损价
    
    返回:
        建议仓位大小
    """
    risk_amount = total_capital * risk_per_trade
    risk_per_share = entry_price - stop_loss_price
    
    if risk_per_share <= 0:
        return {
            "error": "止损价必须低于买入价",
            "shares": 0,
            "position_value": 0
        }
    
    shares = int(risk_amount / risk_per_share)
    position_value = shares * entry_price
    position_weight = position_value / total_capital * 100
    
    return {
        "risk_amount": round(risk_amount, 2),
        "risk_per_share": round(risk_per_share, 2),
        "shares": shares,
        "position_value": round(position_value, 2),
        "position_weight": f"{position_weight:.1f}%",
        "risk_per_trade": f"{risk_per_trade * 100}%"
    }


def suggest_position_by_rating(rating: str, total_capital: float) -> Dict:
    """
    根据评级建议仓位
    
    参数:
        rating: 投资评级
        total_capital: 总资金
    
    返回:
        仓位建议
    """
    suggestions = {
        "⭐⭐⭐⭐⭐": {"weight": 0.25, "description": "强烈推荐，可重仓"},
        "⭐⭐⭐⭐": {"weight": 0.20, "description": "推荐，标准仓位"},
        "⭐⭐⭐": {"weight": 0.10, "description": "持有，轻仓观望"},
        "⭐⭐": {"weight": 0.05, "description": "谨慎，试探性仓位"},
        "⭐": {"weight": 0.0, "description": "卖出，不建议持仓"}
    }
    
    suggestion = suggestions.get(rating[:5], {"weight": 0.1, "description": "未知评级"})
    
    position_value = total_capital * suggestion["weight"]
    
    return {
        "rating": rating,
        "suggested_weight": f"{suggestion['weight'] * 100}%",
        "suggested_value": round(position_value, 2),
        "description": suggestion["description"]
    }


# ==================== 止损止盈 ====================

def calculate_stop_loss(
    entry_price: float,
    stop_loss_pct: float = 0.10,
    support_level: Optional[float] = None
) -> Dict:
    """
    计算止损位
    
    参数:
        entry_price: 买入价
        stop_loss_pct: 止损比例
        support_level: 支撑位 (可选)
    
    返回:
        止损位建议
    """
    # 固定比例止损
    fixed_stop = entry_price * (1 - stop_loss_pct)
    
    # 技术位止损 (支撑位下方)
    if support_level:
        technical_stop = support_level * 0.98  # 支撑位下方 2%
    else:
        technical_stop = None
    
    # 选择更严格的止损
    if technical_stop and technical_stop > fixed_stop:
        stop_price = technical_stop
        method = "技术位止损"
    else:
        stop_price = fixed_stop
        method = "固定比例止损"
    
    loss_amount = entry_price - stop_price
    loss_pct = loss_amount / entry_price * 100
    
    return {
        "entry_price": entry_price,
        "stop_loss_price": round(stop_price, 2),
        "loss_amount": round(loss_amount, 2),
        "loss_pct": f"-{loss_pct:.1f}%",
        "method": method,
        "support_level": support_level
    }


def calculate_take_profit(
    entry_price: float,
    target_price: float,
    resistance_level: Optional[float] = None
) -> Dict:
    """
    计算止盈位
    
    参数:
        entry_price: 买入价
        target_price: 目标价
        resistance_level: 阻力位 (可选)
    
    返回:
        止盈位建议
    """
    # 目标价止盈
    target_gain = (target_price - entry_price) / entry_price * 100
    
    # 阻力位止盈
    if resistance_level:
        technical_target = resistance_level * 0.98  # 阻力位下方 2%
    else:
        technical_target = None
    
    # 选择更保守的目标
    if technical_target and technical_target < target_price:
        take_profit_price = technical_target
        method = "技术位止盈"
        gain_pct = (technical_target - entry_price) / entry_price * 100
    else:
        take_profit_price = target_price
        method = "目标价止盈"
        gain_pct = target_gain
    
    return {
        "entry_price": entry_price,
        "take_profit_price": round(take_profit_price, 2),
        "gain_amount": round(take_profit_price - entry_price, 2),
        "gain_pct": f"+{gain_pct:.1f}%",
        "method": method,
        "resistance_level": resistance_level
    }


# ==================== 风险评估 ====================

def portfolio_risk_analysis(portfolio: Portfolio) -> Dict:
    """
    持仓组合风险分析
    
    返回:
        风险指标
    """
    if not portfolio.positions:
        return {"error": "无持仓"}
    
    weights = portfolio.get_position_weights()
    
    # 集中度风险
    max_weight = max(weights.values()) if weights else 0
    top3_weight = sum(sorted(weights.values(), reverse=True)[:3])
    
    if max_weight > 50:
        concentration_risk = "高 (单一持仓过重)"
    elif max_weight > 30:
        concentration_risk = "中"
    else:
        concentration_risk = "低"
    
    # 盈亏分布
    winners = [p for p in portfolio.positions.values() if p.profit_loss > 0]
    losers = [p for p in portfolio.positions.values() if p.profit_loss < 0]
    
    # 最大单笔亏损
    max_loss = min((p.profit_loss_pct for p in portfolio.positions.values()), default=0)
    max_gain = max((p.profit_loss_pct for p in portfolio.positions.values()), default=0)
    
    return {
        "total_value": portfolio.total_market_value,
        "total_profit_loss_pct": portfolio.total_profit_loss_pct,
        "position_count": len(portfolio.positions),
        "concentration_risk": concentration_risk,
        "max_position_weight": f"{max_weight:.1f}%",
        "top3_weight": f"{top3_weight:.1f}%",
        "winners_count": len(winners),
        "losers_count": len(losers),
        "win_rate": f"{len(winners) / len(portfolio.positions) * 100:.1f}%" if portfolio.positions else "0%",
        "max_gain": f"+{max_gain:.1f}%",
        "max_loss": f"{max_loss:.1f}%"
    }


# ==================== 持仓报告 ====================

def generate_portfolio_report(portfolio: Portfolio) -> str:
    """
    生成持仓报告
    """
    report = f"""
# 📊 持仓报告 - {portfolio.name}

**生成时间**: {datetime.now().strftime('%Y-%m-%d %H:%M')}

---

## 总体表现

| 指标 | 数值 |
|------|------|
| 总市值 | ¥{portfolio.total_market_value:,.2f} |
| 总成本 | ¥{portfolio.total_cost_value:,.2f} |
| 总盈亏 | ¥{portfolio.total_profit_loss:,.2f} |
| 收益率 | {portfolio.total_profit_loss_pct:+.2f}% |
| 持仓数量 | {len(portfolio.positions)} |

---

## 持仓明细

| 代码 | 名称 | 持仓 | 成本 | 现价 | 市值 | 盈亏 | 收益率 | 权重 |
|------|------|------|------|------|------|------|--------|------|
"""
    
    for symbol, pos in sorted(portfolio.positions.items(), 
                              key=lambda x: x[1].market_value, 
                              reverse=True):
        weight = portfolio.get_position_weights().get(symbol, 0)
        report += f"""
| {pos.symbol} | {pos.name} | {pos.quantity} | {pos.avg_cost:.2f} | {pos.current_price:.2f} | {pos.market_value:,.0f} | {pos.profit_loss:+,.0f} | {pos.profit_loss_pct:+.1f}% | {weight:.1f}% |
"""
    
    # 风险分析
    risk = portfolio_risk_analysis(portfolio)
    
    report += f"""
---

## 风险分析

- **集中度风险**: {risk['concentration_risk']}
- **最大持仓权重**: {risk['max_position_weight']}
- **前三大持仓**: {risk['top3_weight']}
- **胜率**: {risk['win_rate']}
- **最大盈利**: {risk['max_gain']}
- **最大亏损**: {risk['max_loss']}

---

## 配置建议

1. **分散投资**: 单一持仓建议不超过 20%
2. **止损纪律**: 单笔亏损控制在 2% 以内
3. **动态平衡**: 定期调整仓位至目标配置

---

*本报告由 portfolio_manager 自动生成 | 数据仅供参考*
"""
    
    return report


# ==================== 文件操作 ====================

def save_portfolio(portfolio: Portfolio, filepath: str):
    """保存持仓到文件"""
    data = portfolio.to_dict()
    path = Path(filepath)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


def load_portfolio(filepath: str) -> Portfolio:
    """从文件加载持仓"""
    path = Path(filepath)
    if not path.exists():
        raise FileNotFoundError(f"持仓文件不存在：{filepath}")
    
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    portfolio = Portfolio(data.get("name", "我的持仓"))
    
    for symbol, pos_data in data.get("positions", {}).items():
        portfolio.add_position(
            symbol=pos_data["symbol"],
            name=pos_data["name"],
            quantity=pos_data["quantity"],
            avg_cost=pos_data["avg_cost"],
            current_price=pos_data["current_price"]
        )
    
    return portfolio


# ==================== 命令行入口 ====================

if __name__ == "__main__":
    # 创建测试持仓
    portfolio = Portfolio("测试持仓")
    portfolio.add_position("600519", "贵州茅台", 100, 1600, 1680)
    portfolio.add_position("00700.HK", "腾讯控股", 500, 350, 380)
    portfolio.add_position("AAPL", "苹果", 200, 175, 185)
    
    # 生成报告
    print(generate_portfolio_report(portfolio))
    
    # 保存
    save_portfolio(portfolio, "/tmp/test_portfolio.json")
    print("\n✅ 持仓已保存至 /tmp/test_portfolio.json")
