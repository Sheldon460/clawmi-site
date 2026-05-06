#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
小红书数据自动追踪脚本
功能：自动抓取发布后数据（24h/72h/7d），生成报告，异常告警

使用方式:
    python3 auto_track.py --feed_id "xxx" --xsec_token "xxx"
    python3 auto_track.py --check_all  # 检查所有已发布笔记

作者：mi-book
版本：V1.0
日期：2026-03-10
"""

import requests
import json
import os
from datetime import datetime, timedelta
from pathlib import Path

# 配置
API_BASE = "http://localhost:18061/api/v1"
DATA_DIR = Path("/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-book/data/platform_daily")
TRACKING_FILE = Path("/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-book/data/tracking.json")

def fetch_metrics(feed_id, xsec_token):
    """获取笔记互动数据"""
    try:
        response = requests.post(
            f"{API_BASE}/feeds/detail",
            json={"feed_id": feed_id, "xsec_token": xsec_token},
            timeout=30
        )
        data = response.json()
        
        if data.get('success'):
            note = data['data']['note']
            interact = note.get('interactInfo', {})
            return {
                'likes': int(interact.get('likedCount', 0)),
                'collects': int(interact.get('collectedCount', 0)),
                'comments': int(interact.get('commentCount', 0)),
                'shares': int(interact.get('sharedCount', 0)),
                'timestamp': datetime.now().isoformat()
            }
        else:
            print(f"❌ API 返回错误：{data.get('message', 'Unknown')}")
            return None
    except Exception as e:
        print(f"❌ 请求失败：{e}")
        return None

def load_tracking():
    """加载追踪配置"""
    if TRACKING_FILE.exists():
        with open(TRACKING_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return {"posts": []}

def save_tracking(data):
    """保存追踪配置"""
    TRACKING_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(TRACKING_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def add_post(feed_id, xsec_token, title, publish_time):
    """添加追踪目标"""
    tracking = load_tracking()
    
    # 检查是否已存在
    for post in tracking['posts']:
        if post['feed_id'] == feed_id:
            print(f"⚠️ 该笔记已在追踪列表中")
            return
    
    tracking['posts'].append({
        'feed_id': feed_id,
        'xsec_token': xsec_token,
        'title': title,
        'publish_time': publish_time,
        'checkpoints': {
            '24h': None,
            '72h': None,
            '7d': None
        },
        'history': []
    })
    
    save_tracking(tracking)
    print(f"✅ 已添加追踪：{title}")

def check_all():
    """检查所有追踪目标"""
    tracking = load_tracking()
    today = datetime.now()
    
    print(f"\n{'='*60}")
    print(f"📊 数据追踪报告 - {today.strftime('%Y-%m-%d %H:%M')}")
    print(f"{'='*60}\n")
    
    daily_data = {
        "date": today.strftime('%Y-%m-%d'),
        "posts": [],
        "summary": {
            "total_posts": len(tracking['posts']),
            "total_likes": 0,
            "total_collects": 0,
            "total_comments": 0
        }
    }
    
    for post in tracking['posts']:
        print(f"📝 {post['title']}")
        print(f"   发布时间：{post['publish_time']}")
        
        # 获取最新数据
        metrics = fetch_metrics(post['feed_id'], post['xsec_token'])
        if metrics:
            # 计算时间差
            pub_time = datetime.fromisoformat(post['publish_time'])
            hours_diff = (today - pub_time).total_seconds() / 3600
            
            # 更新检查点
            if hours_diff >= 24 and not post['checkpoints']['24h']:
                post['checkpoints']['24h'] = metrics.copy()
                print(f"   ✅ 24h 数据已记录")
            
            if hours_diff >= 72 and not post['checkpoints']['72h']:
                post['checkpoints']['72h'] = metrics.copy()
                print(f"   ✅ 72h 数据已记录")
            
            if hours_diff >= 168 and not post['checkpoints']['7d']:
                post['checkpoints']['7d'] = metrics.copy()
                print(f"   ✅ 7d 数据已记录")
            
            # 添加到历史记录
            post['history'].append(metrics)
            
            # 保留最近 10 条记录
            if len(post['history']) > 10:
                post['history'] = post['history'][-10:]
            
            # 输出最新数据
            print(f"   👍 {metrics['likes']}  ⭐ {metrics['collects']}  💬 {metrics['comments']}")
            
            # 计算藏赞比
            if metrics['likes'] > 0:
                ratio = metrics['collects'] / metrics['likes']
                print(f"   📈 藏赞比：{ratio:.2f}")
            
            # 异常检测
            if post['checkpoints']['24h']:
                prev_likes = post['checkpoints']['24h']['likes']
                if metrics['likes'] < prev_likes * 0.5:
                    print(f"   ⚠️ 警告：点赞数异常下降！")
            
            # 更新汇总
            daily_data['posts'].append({
                'title': post['title'],
                'metrics': metrics
            })
            daily_data['summary']['total_likes'] += metrics['likes']
            daily_data['summary']['total_collects'] += metrics['collects']
            daily_data['summary']['total_comments'] += metrics['comments']
            
        else:
            print(f"   ❌ 数据获取失败")
        
        print()
    
    # 保存更新
    save_tracking(tracking)
    
    # 保存今日数据
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    daily_file = DATA_DIR / f"{today.strftime('%Y-%m-%d')}.json"
    with open(daily_file, 'w', encoding='utf-8') as f:
        json.dump(daily_data, f, ensure_ascii=False, indent=2)
    
    # 输出汇总
    print(f"{'='*60}")
    print(f"📊 今日汇总")
    print(f"{'='*60}")
    print(f"追踪笔记数：{daily_data['summary']['total_posts']}")
    print(f"总点赞数：{daily_data['summary']['total_likes']}")
    print(f"总收藏数：{daily_data['summary']['total_collects']}")
    print(f"总评论数：{daily_data['summary']['total_comments']}")
    print(f"\n💾 数据已保存至：{daily_file}")
    print(f"{'='*60}\n")

def show_help():
    """显示帮助"""
    print("""
小红书数据自动追踪脚本

用法:
    python3 auto_track.py --add --feed_id "xxx" --xsec_token "xxx" --title "标题" --time "2026-03-10T01:30:00"
    python3 auto_track.py --check_all
    python3 auto_track.py --list

选项:
    --add           添加追踪目标
    --check_all     检查所有追踪目标
    --list          列出所有追踪目标
    --feed_id       笔记 ID
    --xsec_token    安全令牌
    --title         笔记标题
    --time          发布时间 (ISO 8601 格式)
    --help          显示帮助

示例:
    # 添加追踪
    python3 auto_track.py --add \\
      --feed_id "6997ddaa000000000a03e274" \\
      --xsec_token "AB09ez87lcq6Ps5KT8b53gnRX9A-7USKB0zVdscp3ewcA=" \\
      --title "OpenClaw 效率工具包上线🚀" \\
      --time "2026-03-10T01:30:00+08:00"
    
    # 检查所有
    python3 auto_track.py --check_all
    
    # 列出所有
    python3 auto_track.py --list
    """)

def list_posts():
    """列出所有追踪目标"""
    tracking = load_tracking()
    
    print(f"\n{'='*60}")
    print(f"📋 追踪列表")
    print(f"{'='*60}\n")
    
    for i, post in enumerate(tracking['posts'], 1):
        status_24h = "✅" if post['checkpoints']['24h'] else "⏳"
        status_72h = "✅" if post['checkpoints']['72h'] else "⏳"
        status_7d = "✅" if post['checkpoints']['7d'] else "⏳"
        
        print(f"{i}. {post['title']}")
        print(f"   发布：{post['publish_time']}")
        print(f"   检查点：24h{status_24h}  72h{status_72h}  7d{status_7d}")
        
        if post['history']:
            latest = post['history'][-1]
            print(f"   最新：👍{latest['likes']} ⭐{latest['collects']} 💬{latest['comments']}")
        print()
    
    print(f"{'='*60}\n")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        show_help()
        sys.exit(1)
    
    if "--help" in sys.argv or "-h" in sys.argv:
        show_help()
        sys.exit(0)
    
    if "--add" in sys.argv:
        # 解析参数
        feed_id = sys.argv[sys.argv.index("--feed_id")+1] if "--feed_id" in sys.argv else None
        xsec_token = sys.argv[sys.argv.index("--xsec_token")+1] if "--xsec_token" in sys.argv else None
        title = sys.argv[sys.argv.index("--title")+1] if "--title" in sys.argv else "未命名"
        publish_time = sys.argv[sys.argv.index("--time")+1] if "--time" in sys.argv else datetime.now().isoformat()
        
        if not feed_id or not xsec_token:
            print("❌ 缺少必需参数：--feed_id 和 --xsec_token")
            sys.exit(1)
        
        add_post(feed_id, xsec_token, title, publish_time)
    
    elif "--check_all" in sys.argv:
        check_all()
    
    elif "--list" in sys.argv:
        list_posts()
    
    else:
        show_help()
        sys.exit(1)
