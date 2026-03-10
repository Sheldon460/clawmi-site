#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
小红书配图生成脚本
功能：根据内容自动生成 5-7 张配图（封面 + 内页）

使用方式:
    python3 generate_images.py --content "内容文件.md" --style minimal

作者：mi-book
版本：V1.0
日期：2026-03-10
"""

from PIL import Image, ImageDraw, ImageFont
import os
import sys
from datetime import datetime
from pathlib import Path

# 配置
OUTPUT_DIR = Path("/tmp/openclaw/uploads")
TEMPLATE_DIR = Path("/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-book/design/templates")

# 配色方案
COLORS = {
    'primary': '#6366F1',      # 蓝紫色
    'secondary': '#8B5CF6',    # 紫罗兰
    'accent': '#F59E0B',       # 橙色
    'text': '#FFFFFF',         # 白色
    'text_muted': '#E0E7FF',   # 浅紫
    'bg_dark': '#1E1B4B',      # 深蓝
}

def get_font(size):
    """获取字体"""
    try:
        return ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", size)
    except:
        return ImageFont.load_default()

def create_cover(title, subtitle, points, output_path):
    """
    生成封面图（模板 1: 极简大字报）
    
    参数:
        title: 主标题
        subtitle: 副标题
        points: 亮点列表（3-5 个）
        output_path: 输出路径
    """
    # 创建画布
    img = Image.new('RGB', (900, 1200), color=COLORS['primary'])
    draw = ImageDraw.Draw(img)
    
    # 加载字体
    font_title = get_font(56)
    font_subtitle = get_font(36)
    font_point = get_font(28)
    
    # 绘制渐变背景（简化版：纯色）
    # 实际可使用 ImageDraw.gradient 或 numpy 实现渐变
    
    # 绘制主标题
    y_title = 350
    draw.text((450, y_title), title, fill=COLORS['text'], 
              anchor="mm", font=font_title)
    
    # 绘制副标题
    y_subtitle = y_title + 100
    draw.text((450, y_subtitle), subtitle, fill=COLORS['text_muted'], 
              anchor="mm", font=font_subtitle)
    
    # 绘制分隔线
    y_line = y_subtitle + 80
    draw.line([(200, y_line), (700, y_line)], fill=COLORS['text'], width=2)
    
    # 绘制亮点列表
    y_points = y_line + 60
    for i, point in enumerate(points):
        y = y_points + i * 70
        draw.text((450, y), f"• {point}", fill=COLORS['text'], 
                  anchor="mm", font=font_point)
    
    # 保存
    img.save(output_path, 'JPEG', quality=90)
    print(f"✅ 封面图已生成：{output_path}")
    print(f"   尺寸：900x1200px")
    print(f"   大小：{os.path.getsize(output_path) / 1024:.1f}KB")

def create_inner_page(type, title, content, output_path):
    """
    生成内页图
    
    参数:
        type: 页面类型 (pain/solution/comparison/steps/resources/cta)
        title: 页面标题
        content: 内容列表
        output_path: 输出路径
    """
    # 创建画布
    img = Image.new('RGB', (900, 1200), color=COLORS['secondary'])
    draw = ImageDraw.Draw(img)
    
    # 加载字体
    font_title = get_font(48)
    font_content = get_font(28)
    
    # 绘制标题
    y_title = 150
    draw.text((450, y_title), title, fill=COLORS['text'], 
              anchor="mm", font=font_title)
    
    # 绘制分隔线
    y_line = y_title + 70
    draw.line([(150, y_line), (750, y_line)], fill=COLORS['text'], width=2)
    
    # 绘制内容
    y_content = y_line + 80
    for i, line in enumerate(content):
        y = y_content + i * 60
        draw.text((450, y), line, fill=COLORS['text_muted'], 
                  anchor="mm", font=font_content)
    
    # 保存
    img.save(output_path, 'JPEG', quality=90)
    print(f"✅ 内页图已生成：{output_path}")

def generate_full_set(title, content_data, date_str=None):
    """
    生成完整配图套装（封面 +5 张内页）
    
    参数:
        title: 笔记标题
        content_data: 内容数据字典
        date_str: 日期字符串（可选）
    """
    if not date_str:
        date_str = datetime.now().strftime('%Y-%m-%d')
    
    # 创建输出目录
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    print(f"\n{'='*60}")
    print(f"🎨 开始生成配图套装")
    print(f"{'='*60}\n")
    
    # 1. 封面图
    cover_path = OUTPUT_DIR / f"{date_str}_cover_01.jpg"
    create_cover(
        title=content_data.get('title', title),
        subtitle=content_data.get('subtitle', '一键解锁 6 大办公模块'),
        points=content_data.get('highlights', ['功能 1', '功能 2', '功能 3']),
        output_path=cover_path
    )
    
    # 2. 内页 1: 痛点引入
    inner1_path = OUTPUT_DIR / f"{date_str}_inner_01.jpg"
    create_inner_page(
        type='pain',
        title=content_data.get('pain_title', '你是否也遇到过这些问题？'),
        content=content_data.get('pain_points', [
            '❌ 工作效率低，经常加班',
            '❌ 工具太多，不知道选哪个',
            '❌ 想学习，但无从下手',
            '😫 好焦虑...']),
        output_path=inner1_path
    )
    
    # 3. 内页 2: 解决方案
    inner2_path = OUTPUT_DIR / f"{date_str}_inner_02.jpg"
    create_inner_page(
        type='solution',
        title=content_data.get('solution_title', '试试这个解决方案！'),
        content=content_data.get('solution_points', [
            '✅ OpenClaw 效率工具包',
            '✅ 一键解锁 6 大办公模块',
            '✅ 亲测有效，才敢推荐',
            '💡 工具在精不在多']),
        output_path=inner2_path
    )
    
    # 4. 内页 3: 功能详解
    inner3_path = OUTPUT_DIR / f"{date_str}_inner_03.jpg"
    create_inner_page(
        type='features',
        title=content_data.get('features_title', '6 大核心功能'),
        content=content_data.get('features_list', [
            '❶ 日历预约 - 会议安排不求人',
            '❷ 消息卡片 - 重要通知一眼看懂',
            '❸ 审批流程 - 报销请假快速通过',
            '❹ 多维表格 - 数据管理井井有条',
            '❺ 通讯录查询 - 找同事不再迷路',
            '❻ 考勤管理 - 打卡记录随时查']),
        output_path=inner3_path
    )
    
    # 5. 内页 4: 适用人群
    inner4_path = OUTPUT_DIR / f"{date_str}_inner_04.jpg"
    create_inner_page(
        type='audience',
        title=content_data.get('audience_title', '适合谁用？'),
        content=content_data.get('audience_list', [
            '🎯 使用飞书办公的打工人',
            '🎯 想提升效率的职场人',
            '🎯 OpenClaw 中文社区用户',
            '🎯 所有追求效率的你']),
        output_path=inner4_path
    )
    
    # 6. 内页 5: 互动引导
    inner5_path = OUTPUT_DIR / f"{date_str}_inner_05.jpg"
    create_inner_page(
        type='cta',
        title=content_data.get('cta_title', '快来体验吧！'),
        content=content_data.get('cta_list', [
            '💬 评论区聊聊你的效率神器',
            '⭐ 收藏备用，随时查看',
            '❤️ 关注我，获取更多干货',
            '👇 点击左下角，立即体验']),
        output_path=inner5_path
    )
    
    print(f"\n{'='*60}")
    print(f"✅ 配图套装生成完成！")
    print(f"{'='*60}")
    print(f"📁 输出目录：{OUTPUT_DIR}")
    print(f"📊 生成数量：6 张（1 封面 +5 内页）")
    print(f"\n文件列表:")
    for f in OUTPUT_DIR.glob(f"{date_str}_*.jpg"):
        print(f"   - {f.name}")
    print(f"{'='*60}\n")

def show_help():
    """显示帮助"""
    print("""
小红书配图生成脚本

用法:
    python3 generate_images.py --title "标题" --content "内容文件.md"
    python3 generate_images.py --demo  # 生成演示套装

选项:
    --title         笔记标题
    --content       内容文件路径（Markdown 格式）
    --demo          生成演示套装
    --date          日期字符串（可选，默认今天）
    --help          显示帮助

示例:
    # 生成演示套装
    python3 generate_images.py --demo
    
    # 根据内容文件生成
    python3 generate_images.py \\
      --title "OpenClaw 效率工具包上线🚀" \\
      --content "content.md" \\
      --date "2026-03-10"
    """)

if __name__ == "__main__":
    if len(sys.argv) < 2:
        show_help()
        sys.exit(1)
    
    if "--help" in sys.argv or "-h" in sys.argv:
        show_help()
        sys.exit(0)
    
    if "--demo" in sys.argv:
        # 生成演示套装
        date_str = sys.argv[sys.argv.index("--date")+1] if "--date" in sys.argv else None
        
        content_data = {
            'title': 'OpenClaw 效率工具包',
            'subtitle': '🚀 一键解锁 6 大办公模块',
            'highlights': ['日历预约', '消息卡片', '审批流程', '多维表格'],
            'pain_points': [
                '❌ 工作效率低，经常加班',
                '❌ 工具太多，不知道选哪个',
                '❌ 想学习，但无从下手',
                '😫 好焦虑...'],
            'solution_points': [
                '✅ OpenClaw 效率工具包',
                '✅ 一键解锁 6 大办公模块',
                '✅ 亲测有效，才敢推荐',
                '💡 工具在精不在多'],
            'features_list': [
                '❶ 日历预约 - 会议安排不求人',
                '❷ 消息卡片 - 重要通知一眼看懂',
                '❸ 审批流程 - 报销请假快速通过',
                '❹ 多维表格 - 数据管理井井有条',
                '❺ 通讯录查询 - 找同事不再迷路',
                '❻ 考勤管理 - 打卡记录随时查'],
            'audience_list': [
                '🎯 使用飞书办公的打工人',
                '🎯 想提升效率的职场人',
                '🎯 OpenClaw 中文社区用户',
                '🎯 所有追求效率的你'],
            'cta_list': [
                '💬 评论区聊聊你的效率神器',
                '⭐ 收藏备用，随时查看',
                '❤️ 关注我，获取更多干货',
                '👇 点击左下角，立即体验']
        }
        
        generate_full_set('OpenClaw 效率工具包上线🚀', content_data, date_str)
    
    else:
        show_help()
        sys.exit(1)
