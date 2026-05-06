#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
A 股实时监控脚本 (A-Share Stock Monitor)
A 股实时行情、异动预警、板块扫描

维护者：幂策 (mi-ce-invest) / 幂投 (mi-tou)
版本：V1.0
"""

import argparse
import sys
from datetime import datetime
from typing import Dict, List

try:
    import akshare as ak
    import pandas as pd
    import numpy as np
except ImportError as e:
    print(f"❌ 依赖缺失：{e}")
    print("请运行：pip3 install akshare pandas numpy")
    sys.exit(1)


# ==================== 实时行情 ====================

def get_realtime_quotes(symbols: List[str] = None) -> pd.DataFrame:
    """
    获取 A 股实时行情
    
    参数:
        symbols: 股票代码列表 (可选，不传则获取全部)
    
    返回:
        行情 DataFrame
    """
    try:
        # 获取全部 A 股行情
        df = ak.stock_zh_a_spot_em()
        
        if symbols:
            # 过滤指定股票
            mask = df["代码"].isin(symbols)
            df = df[mask]
        
        return df
    
    except Exception as e:
        print(f"获取行情失败：{e}")
        return pd.DataFrame()


def get_market_indices() -> Dict:
    """
    获取大盘指数
    
    返回:
        指数数据字典
    """
    try:
        index_df = ak.stock_zh_index_spot_em()
        
        indices = {
            "上证指数": None,
            "深证成指": None,
            "创业板指": None,
            "科创 50": None,
            "沪深 300": None,
        }
        
        for name in indices.keys():
            match = index_df[index_df["名称"] == name]
            if not match.empty:
                indices[name] = {
                    "price": match["最新价"].values[0],
                    "change": match["涨跌幅"].values[0],
                    "volume": match["成交量"].values[0]
                }
        
        return indices
    
    except Exception as e:
        print(f"获取指数失败：{e}")
        return {}


# ==================== 涨跌统计 ====================

def market_statistics(df: pd.DataFrame) -> Dict:
    """
    市场涨跌统计
    
    参数:
        df: 行情 DataFrame
    
    返回:
        统计数据
    """
    if df.empty:
        return {}
    
    total = len(df)
    gainers = len(df[df["涨跌幅"] > 0])
    losers = len(df[df["涨跌幅"] < 0])
    unchanged = len(df[df["涨跌幅"] == 0])
    
    limit_up = len(df[df["涨跌幅"] >= 9.8])
    limit_down = len(df[df["涨跌幅"] <= -9.8])
    
    avg_change = df["涨跌幅"].mean()
    
    return {
        "total": total,
        "gainers": gainers,
        "losers": losers,
        "unchanged": unchanged,
        "limit_up": limit_up,
        "limit_down": limit_down,
        "avg_change": avg_change,
        "gainer_ratio": gainers / total * 100 if total > 0 else 0
    }


def top_gainers(df: pd.DataFrame, n: int = 10) -> pd.DataFrame:
    """
    涨幅榜
    
    参数:
        df: 行情 DataFrame
        n: 数量
    
    返回:
        涨幅前 N 股票
    """
    if df.empty:
        return pd.DataFrame()
    
    return df.nlargest(n, "涨跌幅")[["代码", "名称", "最新价", "涨跌幅", "成交量", "成交额"]]


def top_losers(df: pd.DataFrame, n: int = 10) -> pd.DataFrame:
    """
    跌幅榜
    """
    if df.empty:
        return pd.DataFrame()
    
    return df.nsmallest(n, "涨跌幅")[["代码", "名称", "最新价", "涨跌幅", "成交量", "成交额"]]


def most_active(df: pd.DataFrame, n: int = 10) -> pd.DataFrame:
    """
    成交活跃榜
    """
    if df.empty:
        return pd.DataFrame()
    
    return df.nlargest(n, "成交额")[["代码", "名称", "最新价", "涨跌幅", "成交量", "成交额"]]


# ==================== 板块分析 ====================

def sector_performance() -> pd.DataFrame:
    """
    板块涨跌幅
    
    返回:
        板块行情
    """
    try:
        # 获取行业板块
        sector_df = ak.stock_board_industry_name_em()
        
        if not sector_df.empty:
            return sector_df[["板块名称", "涨跌幅", "成交量", "成交额"]].nlargest(20, "涨跌幅")
        
        return pd.DataFrame()
    
    except Exception as e:
        print(f"获取板块数据失败：{e}")
        return pd.DataFrame()


# ==================== 异动预警 ====================

def detect_abnormal(df: pd.DataFrame) -> List[Dict]:
    """
    检测异动股票
    
    条件:
        - 涨幅>5%
        - 跌幅<-5%
        - 量比>3
        - 换手率>10%
    """
    if df.empty:
        return []
    
    alerts = []
    
    # 大幅上涨
    surge_up = df[df["涨跌幅"] > 5]
    for _, row in surge_up.iterrows():
        alerts.append({
            "type": "大幅上涨",
            "symbol": row["代码"],
            "name": row["名称"],
            "price": row["最新价"],
            "change": row["涨跌幅"],
            "volume": row["成交量"]
        })
    
    # 大幅下跌
    surge_down = df[df["涨跌幅"] < -5]
    for _, row in surge_down.iterrows():
        alerts.append({
            "type": "大幅下跌",
            "symbol": row["代码"],
            "name": row["名称"],
            "price": row["最新价"],
            "change": row["涨跌幅"],
            "volume": row["成交量"]
        })
    
    return alerts


# ==================== 市场简报 ====================

def generate_market_brief() -> str:
    """
    生成 A 股市场简报
    """
    report = f"""
# 📊 A 股市场简报

**时间**: {datetime.now().strftime('%Y-%m-%d %H:%M')}  
**数据来源**: akshare / 新浪财经

---

## 🌏 大盘指数

"""
    
    # 获取指数
    indices = get_market_indices()
    if indices:
        report += """
| 指数 | 最新价 | 涨跌幅 |
|------|--------|--------|
"""
        for name, data in indices.items():
            if data:
                report += f"| {name} | {data['price']:.2f} | {data['change']:+.2f}% |\n"
    
    # 获取行情
    df = get_realtime_quotes()
    
    if not df.empty:
        # 市场统计
        stats = market_statistics(df)
        
        report += f"""
---

## 📈 市场情绪

| 指标 | 数值 |
|------|------|
| 上涨家数 | {stats['gainers']} |
| 下跌家数 | {stats['losers']} |
| 涨停家数 | {stats['limit_up']} |
| 跌停家数 | {stats['limit_down']} |
| 平均涨幅 | {stats['avg_change']:+.2f}% |
| 上涨比例 | {stats['gainer_ratio']:.1f}% |

---

## 🔝 涨幅榜 TOP10

| 代码 | 名称 | 最新价 | 涨跌幅 | 成交量 |
|------|------|--------|--------|--------|
"""
        top10 = top_gainers(df, 10)
        for _, row in top10.iterrows():
            report += f"| {row['代码']} | {row['名称']} | {row['最新价']:.2f} | {row['涨跌幅']:+.2f}% | {int(row['成交量']):,} |\n"
        
        report += """
---

## 📉 跌幅榜 TOP10

| 代码 | 名称 | 最新价 | 涨跌幅 | 成交量 |
|------|------|--------|--------|--------|
"""
        bottom10 = top_losers(df, 10)
        for _, row in bottom10.iterrows():
            report += f"| {row['代码']} | {row['名称']} | {row['最新价']:.2f} | {row['涨跌幅']:+.2f}% | {int(row['成交量']):,} |\n"
        
        report += """
---

## 🏭 领涨板块

"""
        sectors = sector_performance()
        if not sectors.empty:
            report += """
| 排名 | 板块 | 涨跌幅 |
|------|------|--------|
"""
            for idx, row in sectors.head(10).iterrows():
                report += f"| {idx+1} | {row['板块名称']} | {row['涨跌幅']:+.2f}% |\n"
    
    report += """
---

## ⚠️ 异动预警

"""
    
    alerts = detect_abnormal(df)
    if alerts:
        report += f"发现 {len(alerts)} 只股票异动\n\n"
        for alert in alerts[:10]:
            report += f"- **{alert['type']}**: {alert['symbol']} {alert['name']} ({alert['change']:+.2f}%)\n"
    
    report += """
---

## 💡 市场观察

1. **市场情绪**: 关注上涨比例和涨停家数
2. **板块轮动**: 跟踪领涨板块持续性
3. **异动个股**: 留意大幅波动股票

---

*本报告由 a-stock-monitor 自动生成 | 数据仅供参考*
"""
    
    return report


# ==================== 命令行入口 ====================

def main():
    parser = argparse.ArgumentParser(description="A 股实时监控工具")
    parser.add_argument("--symbol", type=str, nargs="+", help="股票代码列表")
    parser.add_argument("--report", type=str, choices=["brief", "indices", "top", "sector"],
                       default="brief", help="报告类型")
    parser.add_argument("--output", type=str, help="输出文件路径")
    
    args = parser.parse_args()
    
    if args.report == "brief":
        report = generate_market_brief()
    elif args.report == "indices":
        indices = get_market_indices()
        report = f"# 大盘指数\n\n{indices}"
    elif args.report == "top":
        df = get_realtime_quotes(args.symbol)
        report = f"# 涨幅榜\n\n{top_gainers(df).to_markdown()}"
    elif args.report == "sector":
        sectors = sector_performance()
        report = f"# 板块涨跌\n\n{sectors.to_markdown()}" if not sectors.empty else "数据获取失败"
    else:
        print("未知报告类型")
        sys.exit(1)
    
    if args.output:
        from pathlib import Path
        Path(args.output).parent.mkdir(parents=True, exist_ok=True)
        Path(args.output).write_text(report, encoding='utf-8')
        print(f"✅ 报告已保存至：{args.output}")
    else:
        print(report)


if __name__ == "__main__":
    main()
