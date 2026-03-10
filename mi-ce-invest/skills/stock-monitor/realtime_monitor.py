#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
股票实时监控核心脚本
功能：实时行情监控、异动预警、板块扫描、飞书推送
数据源：新浪财经、akshare
"""

import akshare as ak
import pandas as pd
import numpy as np
import time
import json
import requests
from datetime import datetime
from typing import Dict, List, Optional

class StockMonitor:
    """股票实时监控器"""
    
    def __init__(self, config_path: str = "alert_config.json"):
        self.config = self.load_config(config_path)
        self.watchlist = self.load_watchlist()
        self.last_alert = {}  # 避免重复预警
        
    def load_config(self, path: str) -> Dict:
        """加载预警配置"""
        default_config = {
            "price_change_pct": 5.0,    # 单日涨幅预警阈值
            "rsi_overbought": 70,       # RSI 超买
            "rsi_oversold": 30,         # RSI 超卖
            "volume_ratio": 3.0,        # 成交量异常
            "turnover_rate": 10.0,      # 换手率预警
            "notify": {
                "feishu": False,
                "webhook": ""
            }
        }
        try:
            with open(path, 'r', encoding='utf-8') as f:
                return json.load(f)
        except:
            return default_config
    
    def load_watchlist(self, path: str = "watchlist.json") -> List[str]:
        """加载监控股票列表"""
        try:
            with open(path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data.get("stocks", [])
        except:
            # 默认监控 28 个重点板块龙头
            return [
                "600519", "300750", "002594", "601318", "000858",  # 白酒/新能源/金融
                "00700.HK", "09988.HK", "03690.HK",  # 港股科技
                "AAPL", "MSFT", "GOOGL", "NVDA", "TSLA"  # 美股科技
            ]
    
    def get_realtime_quote(self, symbol: str) -> Optional[Dict]:
        """获取实时行情"""
        try:
            if symbol.endswith(".HK"):
                # 港股
                df = ak.stock_hk_daily(symbol=symbol.replace(".HK", ""))
            elif symbol.endswith(".SS") or symbol.endswith(".SZ"):
                # A 股
                df = ak.stock_zh_a_spot_em()
                df = df[df['代码'] == symbol[:6]]
            else:
                # 美股 (使用 akshare 模拟)
                df = ak.stock_us_spot_em()
                df = df[df['代码'] == symbol]
            
            if len(df) == 0:
                return None
                
            row = df.iloc[0]
            return {
                "symbol": symbol,
                "name": row.get('名称', row.get('名字', '')),
                "price": float(row.get('最新价', row.get('价格', 0))),
                "change_pct": float(row.get('涨跌幅', 0)),
                "volume": float(row.get('成交量', 0)),
                "turnover": float(row.get('成交额', 0)),
                "turnover_rate": float(row.get('换手率', 0)),
                "timestamp": datetime.now().strftime("%H:%M:%S")
            }
        except Exception as e:
            print(f"获取行情失败 {symbol}: {e}")
            return None
    
    def calculate_rsi(self, symbol: str, period: int = 14) -> float:
        """计算 RSI 指标"""
        try:
            # 获取历史数据
            if symbol.endswith(".HK"):
                df = ak.stock_hk_daily(symbol=symbol.replace(".HK", ""), adjust="qfq")
            else:
                df = ak.stock_zh_a_hist(symbol=symbol[:6], period="daily", adjust="qfq")
            
            if len(df) < period + 1:
                return 50.0
            
            # 计算 RSI
            delta = df['收盘'].diff()
            gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
            loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
            rs = gain / loss
            rsi = 100 - (100 / (1 + rs))
            
            return round(rsi.iloc[-1], 2)
        except:
            return 50.0
    
    def check_alerts(self, quote: Dict) -> List[Dict]:
        """检查预警条件"""
        alerts = []
        symbol = quote["symbol"]
        
        # 涨幅预警
        if quote["change_pct"] > self.config["price_change_pct"]:
            alerts.append({
                "type": "price surge",
                "message": f"单日涨幅 > {self.config['price_change_pct']}%",
                "value": f"{quote['change_pct']}%"
            })
        
        # RSI 超买
        rsi = self.calculate_rsi(symbol)
        if rsi > self.config["rsi_overbought"]:
            alerts.append({
                "type": "RSI overbought",
                "message": f"RSI > {self.config['rsi_overbought']} (超买)",
                "value": f"RSI={rsi}"
            })
        
        # RSI 超卖
        if rsi < self.config["rsi_oversold"]:
            alerts.append({
                "type": "RSI oversold",
                "message": f"RSI < {self.config['rsi_oversold']} (超卖)",
                "value": f"RSI={rsi}"
            })
        
        # 换手率预警
        if quote.get("turnover_rate", 0) > self.config["turnover_rate"]:
            alerts.append({
                "type": "high turnover",
                "message": f"换手率 > {self.config['turnover_rate']}%",
                "value": f"{quote['turnover_rate']}%"
            })
        
        return alerts
    
    def send_feishu_alert(self, quote: Dict, alerts: List[Dict]):
        """发送飞书预警"""
        if not self.config.get("notify", {}).get("feishu"):
            return
        
        webhook = self.config["notify"].get("webhook", "")
        if not webhook:
            return
        
        # 构建预警消息
        alert_text = "\n".join([f"🔔 {a['type']}: {a['message']} ({a['value']})" for a in alerts])
        
        content = {
            "msg_type": "text",
            "content": {
                "text": f"⚠️【异动预警】{quote['name']} ({quote['symbol']})\n"
                        f"💰 现价：{quote['price']} ({quote['change_pct']}%)\n"
                        f"📊 成交量：{quote.get('volume', 0)}\n"
                        f"{alert_text}\n"
                        f"⏰ 时间：{quote['timestamp']}"
            }
        }
        
        try:
            requests.post(webhook, json=content)
            print(f"飞书预警已发送：{quote['symbol']}")
        except Exception as e:
            print(f"发送飞书预警失败：{e}")
    
    def monitor_once(self):
        """执行一次监控"""
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] 开始监控...")
        
        for symbol in self.watchlist:
            quote = self.get_realtime_quote(symbol)
            if not quote:
                continue
            
            alerts = self.check_alerts(quote)
            
            if alerts:
                # 避免重复预警 (10 分钟内不重复)
                key = f"{symbol}_{datetime.now().strftime('%H')}"
                if key not in self.last_alert or \
                   (datetime.now().timestamp() - self.last_alert.get(key, 0)) > 600:
                    print(f"\n🚨 预警：{quote['name']} ({quote['symbol']})")
                    for alert in alerts:
                        print(f"   {alert['type']}: {alert['message']} ({alert['value']})")
                    
                    self.send_feishu_alert(quote, alerts)
                    self.last_alert[key] = datetime.now().timestamp()
            else:
                print(f"✓ {quote['name']} ({quote['symbol']}): {quote['price']} ({quote['change_pct']}%)")
        
        print(f"[{datetime.now().strftime('%H:%M:%S')}] 监控完成")
    
    def run(self, interval: int = 300):
        """持续监控"""
        print(f"🚀 启动实时监控，间隔 {interval}秒")
        print(f"监控标的：{len(self.watchlist)}只")
        print(f"预警条件：涨幅>{self.config['price_change_pct']}% | RSI>{self.config['rsi_overbought']}/{self.config['rsi_oversold']}")
        
        while True:
            # 检查是否在交易时段
            now = datetime.now()
            if now.weekday() < 5:  # 周一到周五
                # A 股交易时段
                if (9, 15) <= (now.hour, now.minute) <= (11, 30) or \
                   (13, 0) <= (now.hour, now.minute) <= (15, 0):
                    self.monitor_once()
                else:
                    print(f"[{now.strftime('%H:%M:%S')}] 非交易时段，跳过")
            else:
                print(f"[{now.strftime('%H:%M:%S')}] 周末，跳过")
            
            time.sleep(interval)


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="股票实时监控")
    parser.add_argument("--interval", type=int, default=300, help="监控间隔 (秒)")
    parser.add_argument("--config", type=str, default="alert_config.json", help="配置文件路径")
    parser.add_argument("--watchlist", type=str, default="watchlist.json", help="监控股票列表")
    
    args = parser.parse_args()
    
    monitor = StockMonitor(config_path=args.config)
    monitor.run(interval=args.interval)
