#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
估值模型库 (Valuation Models)
支持 DCF、PE、PB、PEG、PS 等多种估值方法

维护者：幂策 (mi-ce-invest)
版本：V1.0
"""

import numpy as np
from typing import Dict, Optional, Tuple


# ==================== DCF 估值模型 ====================

def dcf_valuation(
    free_cash_flow: float,
    growth_rate: float = 0.15,
    discount_rate: float = 0.10,
    terminal_growth: float = 0.03,
    forecast_years: int = 5,
    shares_outstanding: float = 1.0
) -> Dict:
    """
    自由现金流折现模型 (DCF)
    
    参数:
        free_cash_flow: 当前自由现金流 (亿元)
        growth_rate: 预期增长率
        discount_rate: 折现率 (WACC)
        terminal_growth: 永续增长率
        forecast_years: 预测年数
        shares_outstanding: 总股本 (亿股)
    
    返回:
        估值结果字典
    """
    result = {
        "model": "DCF",
        "assumptions": {
            "FCF": free_cash_flow,
            "growth_rate": growth_rate,
            "discount_rate": discount_rate,
            "terminal_growth": terminal_growth,
        },
        "projections": [],
        "intrinsic_value": None,
        "value_per_share": None
    }
    
    # 预测期现金流折现
    pv_forecast = 0
    for year in range(1, forecast_years + 1):
        fcf = free_cash_flow * (1 + growth_rate) ** year
        pv = fcf / (1 + discount_rate) ** year
        result["projections"].append({
            "year": year,
            "FCF": round(fcf, 2),
            "PV": round(pv, 2)
        })
        pv_forecast += pv
    
    # 终值计算 (Gordon Growth Model)
    terminal_fcf = free_cash_flow * (1 + growth_rate) ** forecast_years * (1 + terminal_growth)
    if discount_rate > terminal_growth:
        terminal_value = terminal_fcf / (discount_rate - terminal_growth)
        pv_terminal = terminal_value / (1 + discount_rate) ** forecast_years
        
        # 内在价值
        intrinsic_value = pv_forecast + pv_terminal
        result["intrinsic_value"] = round(intrinsic_value, 2)
        result["value_per_share"] = round(intrinsic_value / shares_outstanding, 2) if shares_outstanding > 0 else None
    
    return result


# ==================== 相对估值 ====================

def pe_valuation(
    eps: float,
    industry_pe: float,
    historical_pe_median: float,
    growth_rate: float = 0.15
) -> Dict:
    """
    PE 相对估值
    
    参数:
        eps: 每股收益
        industry_pe: 行业平均 PE
        historical_pe_median: 历史 PE 中位数
        growth_rate: 预期增长率
    
    返回:
        估值结果字典
    """
    # PEG 调整
    peg_fair_value = eps * growth_rate * 100  # PEG=1 时的合理 PE
    
    # 综合合理 PE
    fair_pe = (industry_pe + historical_pe_median + peg_fair_value) / 3
    
    result = {
        "model": "PE Relative",
        "current_eps": eps,
        "industry_pe": industry_pe,
        "historical_pe": historical_pe_median,
        "peg_fair_pe": round(peg_fair_value, 1),
        "fair_pe": round(fair_pe, 1),
        "fair_value": round(fair_pe * eps, 2),
        "peg": round((fair_pe / 100) / growth_rate, 2) if growth_rate > 0 else None
    }
    
    return result


def pb_valuation(
    book_value_per_share: float,
    industry_pb: float,
    roe: float
) -> Dict:
    """
    PB 估值 (适合重资产行业)
    
    参数:
        book_value_per_share: 每股净资产
        industry_pb: 行业平均 PB
        roe: 净资产收益率
    
    返回:
        估值结果字典
    """
    # ROE 调整 PB
    # ROE>15% 给予溢价，ROE<5% 给予折价
    roe_adjustment = 1 + (roe - 0.10) * 2  # ROE 每偏离 10% 1%，PB 调整 2%
    
    fair_pb = industry_pb * roe_adjustment
    fair_value = fair_pb * book_value_per_share
    
    result = {
        "model": "PB Relative",
        "bvps": book_value_per_share,
        "industry_pb": industry_pb,
        "roe": roe,
        "roe_adjustment": round(roe_adjustment, 2),
        "fair_pb": round(fair_pb, 2),
        "fair_value": round(fair_value, 2)
    }
    
    return result


def peg_valuation(
    pe: float,
    growth_rate: float
) -> Dict:
    """
    PEG 估值
    
    参数:
        pe: 当前 PE
        growth_rate: 预期增长率
    
    返回:
        估值结果字典
    """
    peg = pe / (growth_rate * 100) if growth_rate > 0 else None
    
    # PEG 评级
    if peg is None:
        rating = "无法评估"
    elif peg < 0.5:
        rating = "严重低估"
    elif peg < 1:
        rating = "低估"
    elif peg < 1.5:
        rating = "合理"
    elif peg < 2:
        rating = "高估"
    else:
        rating = "严重高估"
    
    result = {
        "model": "PEG",
        "pe": pe,
        "growth_rate": growth_rate,
        "peg": round(peg, 2) if peg else None,
        "rating": rating,
        "fair_pe": round(growth_rate * 100, 1) if growth_rate > 0 else None
    }
    
    return result


def ps_valuation(
    revenue_per_share: float,
    industry_ps: float,
    net_margin: float
) -> Dict:
    """
    PS 估值 (适合未盈利高增长公司)
    
    参数:
        revenue_per_share: 每股营收
        industry_ps: 行业平均 PS
        net_margin: 净利润率
    
    返回:
        估值结果字典
    """
    # 利润率调整
    margin_adjustment = 1 + (net_margin - 0.10) * 3  # 利润率每偏离 10% 1%，PS 调整 3%
    
    fair_ps = industry_ps * margin_adjustment
    fair_value = fair_ps * revenue_per_share
    
    result = {
        "model": "PS Relative",
        "rps": revenue_per_share,
        "industry_ps": industry_ps,
        "net_margin": net_margin,
        "margin_adjustment": round(margin_adjustment, 2),
        "fair_ps": round(fair_ps, 2),
        "fair_value": round(fair_value, 2)
    }
    
    return result


# ==================== 综合估值 ====================

def comprehensive_valuation(
    current_price: float,
    fcf: float,
    eps: float,
    bvps: float,
    rps: float,
    growth_rate: float,
    roe: float,
    net_margin: float,
    industry_pe: float = 20,
    industry_pb: float = 2.5,
    industry_ps: float = 3,
    historical_pe: float = 25
) -> Dict:
    """
    综合多种估值方法
    
    返回:
        包含所有模型结果和综合目标价
    """
    # 运行各估值模型
    dcf_result = dcf_valuation(fcf, growth_rate=growth_rate)
    pe_result = pe_valuation(eps, industry_pe, historical_pe, growth_rate)
    pb_result = pb_valuation(bvps, industry_pb, roe)
    ps_result = ps_valuation(rps, industry_ps, net_margin)
    peg_result = peg_valuation(current_price / eps if eps > 0 else 0, growth_rate)
    
    # 收集各模型目标价
    target_prices = []
    weights = []
    
    if dcf_result.get("value_per_share"):
        target_prices.append(dcf_result["value_per_share"])
        weights.append(0.35)  # DCF 权重 35%
    
    if pe_result.get("fair_value"):
        target_prices.append(pe_result["fair_value"])
        weights.append(0.25)  # PE 权重 25%
    
    if pb_result.get("fair_value"):
        target_prices.append(pb_result["fair_value"])
        weights.append(0.20)  # PB 权重 20%
    
    if ps_result.get("fair_value"):
        target_prices.append(ps_result["fair_value"])
        weights.append(0.20)  # PS 权重 20%
    
    # 加权平均目标价
    if target_prices and weights:
        total_weight = sum(weights)
        weighted_avg = sum(p * w for p, w in zip(target_prices, weights)) / total_weight
        upside = (weighted_avg - current_price) / current_price * 100
        
        comprehensive_result = {
            "current_price": current_price,
            "target_price": round(weighted_avg, 2),
            "upside": f"{upside:+.1f}%",
            "models_used": len(target_prices),
            "valuation_range": {
                "low": round(min(target_prices), 2),
                "high": round(max(target_prices), 2)
            }
        }
    else:
        comprehensive_result = {
            "current_price": current_price,
            "target_price": None,
            "upside": "N/A"
        }
    
    return {
        "dcf": dcf_result,
        "pe": pe_result,
        "pb": pb_result,
        "ps": ps_result,
        "peg": peg_result,
        "comprehensive": comprehensive_result
    }


# ==================== 命令行测试 ====================

if __name__ == "__main__":
    # 测试 DCF
    print("=== DCF 测试 ===")
    dcf = dcf_valuation(free_cash_flow=100, growth_rate=0.15, shares_outstanding=10)
    print(f"内在价值：{dcf['intrinsic_value']} 亿元")
    print(f"每股价值：{dcf['value_per_share']} 元")
    
    # 测试综合估值
    print("\n=== 综合估值测试 ===")
    comp = comprehensive_valuation(
        current_price=100,
        fcf=10,
        eps=5,
        bvps=40,
        rps=50,
        growth_rate=0.15,
        roe=0.15,
        net_margin=0.10
    )
    print(f"目标价：{comp['comprehensive']['target_price']} 元")
    print(f"上行空间：{comp['comprehensive']['upside']}")
