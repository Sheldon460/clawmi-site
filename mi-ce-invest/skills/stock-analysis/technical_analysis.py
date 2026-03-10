#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
技术分析库 (Technical Analysis)
支持均线、MACD、RSI、布林带、支撑阻力等技术指标

维护者：幂策 (mi-ce-invest)
版本：V1.0
"""

import numpy as np
import pandas as pd
from typing import Dict, List, Optional, Tuple


# ==================== 均线系统 ====================

def calculate_ma(prices: np.ndarray, periods: List[int] = [5, 10, 20, 60, 200]) -> Dict:
    """
    计算移动平均线
    
    参数:
        prices: 价格数组 (收盘价)
        periods: 均线周期列表
    
    返回:
        各周期均线值字典
    """
    result = {}
    for period in periods:
        if len(prices) >= period:
            result[f"MA{period}"] = round(np.mean(prices[-period:]), 2)
        else:
            result[f"MA{period}"] = None
    
    return result


def ma_signal(prices: np.ndarray) -> Dict:
    """
    均线信号分析
    
    返回:
        趋势判断和交易信号
    """
    if len(prices) < 60:
        return {"signal": "数据不足", "trend": "未知"}
    
    ma5 = np.mean(prices[-5:])
    ma10 = np.mean(prices[-10:])
    ma20 = np.mean(prices[-20:])
    ma60 = np.mean(prices[-60:])
    
    current_price = prices[-1]
    
    result = {
        "MA5": round(ma5, 2),
        "MA10": round(ma10, 2),
        "MA20": round(ma20, 2),
        "MA60": round(ma60, 2),
        "current_price": round(current_price, 2)
    }
    
    # 趋势判断
    if ma5 > ma10 > ma20 > ma60:
        result["trend"] = "强多头"
        result["signal"] = "买入/持有"
        result["description"] = "✅ 均线多头排列，上升趋势强劲"
    elif ma5 < ma10 < ma20 < ma60:
        result["trend"] = "强空头"
        result["signal"] = "卖出/观望"
        result["description"] = "⚠️ 均线空头排列，下降趋势"
    elif ma5 > ma10 > ma20 and ma20 < ma60:
        result["trend"] = "反弹"
        result["signal"] = "谨慎买入"
        result["description"] = "📈 短期反弹，但长期趋势未明"
    elif ma5 < ma10 < ma20 and ma20 > ma60:
        result["trend"] = "回调"
        result["signal"] = "谨慎卖出"
        result["description"] = "📉 短期回调，长期趋势仍向上"
    else:
        result["trend"] = "震荡"
        result["signal"] = "观望"
        result["description"] = "➡️ 均线纠缠，震荡整理"
    
    # 金叉/死叉检测
    if ma5 > ma10 and prices[-2] < np.mean(prices[-11:-1]):
        result["cross"] = "金叉 (MA5 上穿 MA10)"
    elif ma5 < ma10 and prices[-2] > np.mean(prices[-11:-1]):
        result["cross"] = "死叉 (MA5 下穿 MA10)"
    
    return result


# ==================== RSI 指标 ====================

def calculate_rsi(prices: np.ndarray, period: int = 14) -> Dict:
    """
    计算相对强弱指数 (RSI)
    
    参数:
        prices: 价格数组
        period: RSI 周期 (默认 14)
    
    返回:
        RSI 值和信号
    """
    if len(prices) < period + 1:
        return {"rsi": None, "signal": "数据不足"}
    
    # 计算价格变化
    delta = np.diff(prices)
    
    # 分离涨跌
    gain = np.where(delta > 0, delta, 0)
    loss = np.where(delta < 0, -delta, 0)
    
    # 计算平均涨跌幅
    avg_gain = np.mean(gain[-period:])
    avg_loss = np.mean(loss[-period:])
    
    # 计算 RS 和 RSI
    if avg_loss == 0:
        rsi = 100
    else:
        rs = avg_gain / avg_loss
        rsi = 100 - (100 / (1 + rs))
    
    # 信号判断
    if rsi >= 70:
        signal = "超买"
        action = "考虑卖出"
        description = "⚠️ RSI 超买，可能回调"
    elif rsi <= 30:
        signal = "超卖"
        action = "考虑买入"
        description = "✅ RSI 超卖，可能反弹"
    elif rsi >= 60:
        signal = "偏强"
        action = "持有"
        description = "📈 动能偏强"
    elif rsi <= 40:
        signal = "偏弱"
        action = "观望"
        description = "📉 动能偏弱"
    else:
        signal = "中性"
        action = "观望"
        description = "➡️ 动能中性"
    
    return {
        "rsi": round(rsi, 1),
        "signal": signal,
        "action": action,
        "description": description,
        "overbought_level": 70,
        "oversold_level": 30
    }


# ==================== MACD 指标 ====================

def calculate_macd(
    prices: np.ndarray,
    fast_period: int = 12,
    slow_period: int = 26,
    signal_period: int = 9
) -> Dict:
    """
    计算 MACD 指标
    
    参数:
        prices: 价格数组
        fast_period: 快线周期
        slow_period: 慢线周期
        signal_period: 信号线周期
    
    返回:
        MACD 值和信号
    """
    if len(prices) < slow_period + signal_period:
        return {"signal": "数据不足"}
    
    # 计算 EMA
    def ema(data, period):
        multiplier = 2 / (period + 1)
        ema_values = [np.mean(data[:period])]
        for price in data[period:]:
            ema_values.append((price - ema_values[-1]) * multiplier + ema_values[-1])
        return np.array(ema_values)
    
    fast_ema = ema(prices, fast_period)
    slow_ema = ema(prices, slow_period)
    
    # 对齐长度
    min_len = min(len(fast_ema), len(slow_ema))
    fast_ema = fast_ema[-min_len:]
    slow_ema = slow_ema[-min_len:]
    
    # MACD 线 (DIF)
    macd_line = fast_ema - slow_ema
    
    # 信号线 (DEA)
    signal_line = ema(macd_line, signal_period)
    
    # MACD 柱状图
    macd_histogram = macd_line - signal_line
    
    # 当前值
    current_macd = macd_line[-1]
    current_signal = signal_line[-1]
    current_histogram = macd_histogram[-1]
    
    # 信号判断
    if current_macd > current_signal and macd_line[-2] <= signal_line[-2]:
        cross_signal = "金叉 (买入信号)"
        trend = "看涨"
    elif current_macd < current_signal and macd_line[-2] >= signal_line[-2]:
        cross_signal = "死叉 (卖出信号)"
        trend = "看跌"
    elif current_macd > current_signal:
        cross_signal = "MACD 在信号线上方"
        trend = "看涨"
    else:
        cross_signal = "MACD 在信号线下方"
        trend = "看跌"
    
    # 柱状图分析
    if current_histogram > 0 and current_histogram > macd_histogram[-2]:
        histogram_signal = "多头动能增强"
    elif current_histogram > 0:
        histogram_signal = "多头动能减弱"
    elif current_histogram < 0 and current_histogram < macd_histogram[-2]:
        histogram_signal = "空头动能增强"
    else:
        histogram_signal = "空头动能减弱"
    
    return {
        "macd": round(current_macd, 4),
        "signal": round(current_signal, 4),
        "histogram": round(current_histogram, 4),
        "cross_signal": cross_signal,
        "trend": trend,
        "histogram_signal": histogram_signal
    }


# ==================== 布林带 ====================

def calculate_bollinger_bands(
    prices: np.ndarray,
    period: int = 20,
    std_dev: float = 2.0
) -> Dict:
    """
    计算布林带
    
    参数:
        prices: 价格数组
        period: 周期
        std_dev: 标准差倍数
    
    返回:
        布林带上下轨和中轨
    """
    if len(prices) < period:
        return {"signal": "数据不足"}
    
    # 中轨 (SMA)
    middle = np.mean(prices[-period:])
    
    # 标准差
    std = np.std(prices[-period:])
    
    # 上下轨
    upper = middle + std_dev * std
    lower = middle - std_dev * std
    
    current_price = prices[-1]
    
    # 位置判断
    if current_price >= upper:
        position = "上轨上方"
        signal = "超买，可能回调"
    elif current_price <= lower:
        position = "下轨下方"
        signal = "超卖，可能反弹"
    elif current_price >= middle:
        position = "中轨上方"
        signal = "偏强"
    else:
        position = "中轨下方"
        signal = "偏弱"
    
    # 带宽 (波动率)
    bandwidth = (upper - lower) / middle * 100
    
    return {
        "upper": round(upper, 2),
        "middle": round(middle, 2),
        "lower": round(lower, 2),
        "current_price": round(current_price, 2),
        "position": position,
        "signal": signal,
        "bandwidth": f"{bandwidth:.1f}%",
        "std_dev": std_dev
    }


# ==================== 支撑阻力 ====================

def calculate_support_resistance(
    highs: np.ndarray,
    lows: np.ndarray,
    current_price: float,
    lookback: int = 20
) -> Dict:
    """
    计算支撑位和阻力位
    
    参数:
        highs: 最高价数组
        lows: 最低价数组
        current_price: 当前价
        lookback: 回看周期
    
    返回:
        支撑位和阻力位
    """
    if len(highs) < lookback or len(lows) < lookback:
        return {"signal": "数据不足"}
    
    # 近期高低点
    recent_highs = highs[-lookback:]
    recent_lows = lows[-lookback:]
    
    # 阻力位 (近期高点)
    resistance_levels = sorted(recent_highs, reverse=True)
    
    # 支撑位 (近期低点)
    support_levels = sorted(recent_lows)
    
    # 找到最接近的支撑和阻力
    resistance = None
    for level in resistance_levels:
        if level > current_price:
            resistance = level
            break
    
    support = None
    for level in reversed(support_levels):
        if level < current_price:
            support = level
            break
    
    # 如果没有找到，使用极值
    if resistance is None:
        resistance = max(recent_highs)
    if support is None:
        support = min(recent_lows)
    
    # 计算距离
    resistance_distance = (resistance - current_price) / current_price * 100
    support_distance = (current_price - support) / current_price * 100
    
    return {
        "resistance": round(resistance, 2),
        "resistance_distance": f"+{resistance_distance:.1f}%",
        "support": round(support, 2),
        "support_distance": f"-{support_distance:.1f}%",
        "resistance_levels": [round(x, 2) for x in resistance_levels[:3]],
        "support_levels": [round(x, 2) for x in support_levels[:3]]
    }


# ==================== 成交量分析 ====================

def analyze_volume(
    volumes: np.ndarray,
    prices: np.ndarray,
    period: int = 20
) -> Dict:
    """
    成交量分析
    
    返回:
        量比、均量线等
    """
    if len(volumes) < period:
        return {"signal": "数据不足"}
    
    current_volume = volumes[-1]
    avg_volume = np.mean(volumes[-period:])
    
    # 量比
    volume_ratio = current_volume / avg_volume if avg_volume > 0 else 0
    
    # 量价关系
    price_change = (prices[-1] - prices[-2]) / prices[-2] * 100 if len(prices) > 1 else 0
    
    if volume_ratio > 3:
        volume_signal = "巨量"
        description = "⚠️ 成交量异常放大"
    elif volume_ratio > 2:
        volume_signal = "放量"
        description = "📈 成交量明显放大"
    elif volume_ratio > 1.5:
        volume_signal = "温和放量"
        description = "✅ 成交量温和放大"
    elif volume_ratio < 0.5:
        volume_signal = "缩量"
        description = "⚠️ 成交量严重萎缩"
    else:
        volume_signal = "正常"
        description = "➡️ 成交量正常"
    
    # 量价配合
    if price_change > 0 and volume_ratio > 1:
        price_volume_signal = "✅ 量价齐升"
    elif price_change < 0 and volume_ratio > 1:
        price_volume_signal = "⚠️ 放量下跌"
    elif price_change > 0 and volume_ratio < 1:
        price_volume_signal = "⚠️ 缩量上涨"
    elif price_change < 0 and volume_ratio < 1:
        price_volume_signal = "✅ 缩量下跌"
    else:
        price_volume_signal = "中性"
    
    return {
        "current_volume": int(current_volume),
        "avg_volume": int(avg_volume),
        "volume_ratio": round(volume_ratio, 2),
        "volume_signal": volume_signal,
        "description": description,
        "price_change": f"{price_change:+.2f}%",
        "price_volume_signal": price_volume_signal
    }


# ==================== 综合技术分析 ====================

def comprehensive_technical_analysis(
    prices: np.ndarray,
    highs: np.ndarray,
    lows: np.ndarray,
    volumes: np.ndarray
) -> Dict:
    """
    综合技术分析
    
    返回:
        所有技术指标和综合信号
    """
    result = {
        "ma": ma_signal(prices),
        "rsi": calculate_rsi(prices),
        "macd": calculate_macd(prices),
        "bollinger": calculate_bollinger_bands(prices),
        "support_resistance": calculate_support_resistance(highs, lows, prices[-1]),
        "volume": analyze_volume(volumes, prices)
    }
    
    # 综合信号评分
    score = 0
    signals = []
    
    # MA 信号
    if "多头" in result["ma"].get("trend", ""):
        score += 2
        signals.append("✅ 均线多头")
    elif "空头" in result["ma"].get("trend", ""):
        score -= 2
        signals.append("⚠️ 均线空头")
    
    # RSI 信号
    rsi = result["rsi"].get("rsi", 50)
    if rsi < 30:
        score += 2
        signals.append("✅ RSI 超卖")
    elif rsi > 70:
        score -= 2
        signals.append("⚠️ RSI 超买")
    
    # MACD 信号
    if "金叉" in result["macd"].get("cross_signal", ""):
        score += 2
        signals.append("✅ MACD 金叉")
    elif "死叉" in result["macd"].get("cross_signal", ""):
        score -= 2
        signals.append("⚠️ MACD 死叉")
    
    # 布林带信号
    if "超卖" in result["bollinger"].get("signal", ""):
        score += 1
        signals.append("✅ 布林带超卖")
    elif "超买" in result["bollinger"].get("signal", ""):
        score -= 1
        signals.append("⚠️ 布林带超买")
    
    # 综合评级
    if score >= 4:
        rating = "强烈买入"
        action = "买入"
    elif score >= 2:
        rating = "买入"
        action = "买入/持有"
    elif score >= 0:
        rating = "持有"
        action = "持有/观望"
    elif score >= -2:
        rating = "卖出"
        action = "减仓"
    else:
        rating = "强烈卖出"
        action = "卖出"
    
    result["comprehensive"] = {
        "score": score,
        "rating": rating,
        "action": action,
        "signals": signals
    }
    
    return result


# ==================== 命令行测试 ====================

if __name__ == "__main__":
    # 生成测试数据
    np.random.seed(42)
    prices = 100 + np.cumsum(np.random.randn(100) * 2)
    highs = prices + np.random.rand(100) * 2
    lows = prices - np.random.rand(100) * 2
    volumes = np.random.randint(1000, 10000, 100)
    
    # 综合技术分析
    result = comprehensive_technical_analysis(prices, highs, lows, volumes)
    
    print("=== 综合技术分析 ===")
    print(f"MA 信号：{result['ma']['signal']}")
    print(f"RSI: {result['rsi']['rsi']} ({result['rsi']['signal']})")
    print(f"MACD: {result['macd']['cross_signal']}")
    print(f"布林带：{result['bollinger']['signal']}")
    print(f"成交量：{result['volume']['volume_signal']}")
    print(f"\n综合评级：{result['comprehensive']['rating']}")
    print(f"操作建议：{result['comprehensive']['action']}")
