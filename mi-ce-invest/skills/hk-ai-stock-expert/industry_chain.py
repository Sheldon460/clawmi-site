#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI 产业链分析模块 (AI Industry Chain Analysis)
港股 AI 产业链图谱、竞争格局、投资逻辑

维护者：幂策 (mi-ce-invest)
版本：V1.0
"""

from typing import Dict, List


# AI 产业链公司库
AI_INDUSTRY_CHAIN = {
    "upstream": {
        "name": "上游 - 算力/芯片",
        "companies": [
            {"symbol": "00981.HK", "name": "中芯国际", "business": "晶圆代工", "score": 75},
            {"symbol": "01347.HK", "name": "华虹半导体", "business": "特色工艺", "score": 72},
            {"symbol": "00522.HK", "name": "ASMPT", "business": "封装设备", "score": 70},
        ]
    },
    "midstream": {
        "name": "中游 - 大模型/算法",
        "companies": [
            {"symbol": "09888.HK", "name": "百度集团", "business": "文心一言", "score": 82},
            {"symbol": "00020.HK", "name": "商汤", "business": "计算机视觉", "score": 68},
            {"symbol": "03888.HK", "name": "金山办公", "business": "WPS AI", "score": 78},
        ]
    },
    "downstream": {
        "name": "下游 - 应用",
        "companies": [
            {"symbol": "00700.HK", "name": "腾讯控股", "business": "社交/游戏 AI", "score": 88},
            {"symbol": "09988.HK", "name": "阿里巴巴", "business": "电商/云 AI", "score": 85},
            {"symbol": "03690.HK", "name": "美团", "business": "本地生活 AI", "score": 83},
            {"symbol": "01810.HK", "name": "小米集团", "business": "AIoT", "score": 80},
            {"symbol": "02015.HK", "name": "理想汽车", "business": "智能汽车", "score": 78},
            {"symbol": "09868.HK", "name": "小鹏汽车", "business": "智能汽车", "score": 75},
        ]
    }
}


def get_industry_overview() -> Dict:
    """
    获取产业链概览
    """
    overview = {
        "total_companies": 0,
        "avg_score": 0,
        "segments": {}
    }
    
    total_score = 0
    for segment, data in AI_INDUSTRY_CHAIN.items():
        companies = data["companies"]
        avg_score = sum(c["score"] for c in companies) / len(companies)
        overview["segments"][segment] = {
            "name": data["name"],
            "company_count": len(companies),
            "avg_score": round(avg_score, 1),
            "companies": companies
        }
        overview["total_companies"] += len(companies)
        total_score += avg_score * len(companies)
    
    overview["avg_score"] = round(total_score / overview["total_companies"], 1)
    return overview


def compare_companies(symbols: List[str]) -> str:
    """
    比较多个公司
    
    参数:
        symbols: 股票代码列表
    
    返回:
        比较报告
    """
    report = """
# 【港股 AI 公司对比】

"""
    
    found_companies = []
    for segment, data in AI_INDUSTRY_CHAIN.items():
        for company in data["companies"]:
            if company["symbol"] in symbols:
                found_companies.append({
                    **company,
                    "segment": data["name"]
                })
    
    if not found_companies:
        return report + "⚠️ 未找到指定公司\n"
    
    report += """
## 📊 对比分析

| 代码 | 名称 | 环节 | 业务 | 评分 | 评级 |
|------|------|------|------|------|------|
"""
    
    for company in sorted(found_companies, key=lambda x: x["score"], reverse=True):
        rating = "⭐⭐⭐⭐⭐" if company["score"] >= 90 else "⭐⭐⭐⭐" if company["score"] >= 80 else "⭐⭐⭐"
        report += f"| {company['symbol']} | {company['name']} | {company['segment']} | {company['business']} | {company['score']} | {rating} |\n"
    
    return report


def generate_industry_report() -> str:
    """
    生成产业链分析报告
    """
    overview = get_industry_overview()
    
    report = f"""
# 【港股 AI 产业链深度研究】

**分析时间**: 2026-03-10

---

## 📊 产业链概览

| 指标 | 数值 |
|------|------|
| 覆盖公司数量 | {overview['total_companies']} |
| 平均评分 | {overview['avg_score']}/100 |

---

## 🏭 各环节分析

"""
    
    for segment, data in overview["segments"].items():
        report += f"""
### {data['name']}

- **公司数量**: {data['company_count']}
- **平均评分**: {data['avg_score']}/100

| 代码 | 名称 | 业务 | 评分 |
|------|------|------|------|
"""
        for company in sorted(data["companies"], key=lambda x: x["score"], reverse=True):
            report += f"| {company['symbol']} | {company['name']} | {company['business']} | {company['score']} |\n"
        
        report += "\n"
    
    report += """
---

## 💡 投资逻辑

### 上游 (算力/芯片)
- **驱动因素**: AI 训练需求爆发，算力缺口持续
- **风险**: 地缘政治、技术封锁、资本开支巨大
- **策略**: 逢低布局龙头，关注国产替代

### 中游 (大模型)
- **驱动因素**: 模型能力迭代，商业化场景拓展
- **风险**: 投入巨大、变现周期长、竞争激烈
- **策略**: 关注有场景、有数据的公司

### 下游 (应用)
- **驱动因素**: AI 赋能降本增效，商业模式创新
- **风险**: 竞争加剧、技术迭代快
- **策略**: 优选生态型、平台型公司

---

## 🎯 重点推荐

| 排名 | 代码 | 名称 | 环节 | 评分 | 理由 |
|------|------|------|------|------|------|
| 1 | 00700.HK | 腾讯控股 | 下游 | 88 | 生态护城河深厚 |
| 2 | 09988.HK | 阿里巴巴 | 下游 | 85 | 云 + 电商双轮驱动 |
| 3 | 03690.HK | 美团 | 下游 | 83 | 本地生活龙头 |
| 4 | 09888.HK | 百度集团 | 中游 | 82 | AI 技术积累深厚 |

---

*本报告由 industry_chain 模块自动生成*
"""
    
    return report


if __name__ == "__main__":
    print(generate_industry_report())
