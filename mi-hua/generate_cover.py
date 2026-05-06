#!/usr/bin/env python3
"""
生成 Molili 文章配图 - 封面图
尺寸: 900×383
主题: 微信消息爆炸、AI助手拯救
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math

# 创建画布 (900x383)
width, height = 900, 383
img = Image.new('RGB', (width, height), '#F8F9FA')
draw = ImageDraw.Draw(img)

# 渐变背景 - 从浅灰到科技蓝
for y in range(height):
    ratio = y / height
    r = int(248 - ratio * 30)
    g = int(249 - ratio * 20)
    b = int(250 + ratio * 20)
    draw.line([(0, y), (width, y)], fill=(r, g, b))

# 尝试加载字体
try:
    font_large = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 42)
    font_medium = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 24)
    font_small = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 16)
except:
    font_large = ImageFont.load_default()
    font_medium = ImageFont.load_default()
    font_small = ImageFont.load_default()

# 微信绿色
wechat_green = "#07C160"
# 科技蓝
tech_blue = "#1890FF"
# 暖光橙
warm_orange = "#FF6B35"

# 左侧 - 混乱的消息气泡 (代表手动回复的压力)
bubble_colors = ['#E8E8E8', '#F0F0F0', '#E5E5E5']
positions = [(80, 60), (120, 110), (60, 160), (100, 210), (70, 260)]

for i, (x, y) in enumerate(positions):
    # 绘制消息气泡
    bubble_w = 140 + (i % 3) * 30
    bubble_h = 35
    # 气泡阴影
    draw.rounded_rectangle([x+2, y+2, x+bubble_w+2, y+bubble_h+2], radius=15, fill='#D0D0D0')
    # 气泡主体
    draw.rounded_rectangle([x, y, x+bubble_w, y+bubble_h], radius=15, fill=bubble_colors[i % 3])
    # 气泡内省略号表示消息
    dots_x = x + bubble_w // 2 - 15
    for j in range(3):
        draw.ellipse([dots_x + j*12, y + 12, dots_x + j*12 + 6, y + 18], fill='#999999')

# 中间 - AI机器人图标 (圆形背景)
center_x, center_y = 450, 180
robot_size = 80

# 机器人圆形背景 - 科技蓝渐变效果
for r in range(robot_size, 0, -1):
    ratio = r / robot_size
    blue_r = int(24 + ratio * 100)
    blue_g = int(144 + ratio * 60)
    blue_b = int(255 - ratio * 50)
    draw.ellipse([center_x - r, center_y - r, center_x + r, center_y + r], 
                 fill=(blue_r, blue_g, blue_b))

# 机器人面部 - 简单几何图形
# 眼睛
draw.ellipse([center_x - 25, center_y - 20, center_x - 10, center_y - 5], fill='white')
draw.ellipse([center_x + 10, center_y - 20, center_x + 25, center_y - 5], fill='white')
# 眼珠
draw.ellipse([center_x - 20, center_y - 15, center_x - 15, center_y - 10], fill=tech_blue)
draw.ellipse([center_x + 15, center_y - 15, center_x + 20, center_y - 10], fill=tech_blue)
# 微笑
draw.arc([center_x - 20, center_y - 5, center_x + 20, center_y + 25], start=0, end=180, fill='white', width=3)
# 天线
draw.line([center_x, center_y - 80, center_x, center_y - 60], fill=tech_blue, width=3)
draw.ellipse([center_x - 5, center_y - 90, center_x + 5, center_y - 80], fill=tech_blue)

# 右侧 - 有序的消息气泡 (代表AI处理后的整洁)
organized_positions = [(700, 80), (720, 130), (680, 180), (710, 230)]
for i, (x, y) in enumerate(organized_positions):
    bubble_w = 120
    bubble_h = 35
    # 微信绿色气泡
    draw.rounded_rectangle([x, y, x+bubble_w, y+bubble_h], radius=15, fill=wechat_green)
    # 对勾标记
    check_x = x + bubble_w - 25
    check_y = y + bubble_h // 2
    draw.line([check_x - 5, check_y, check_x, check_y + 5, check_x + 8, check_y - 5], 
              fill='white', width=2)

# 连接线 - 从混乱到有序
# 左侧混乱线
for i in range(5):
    x1 = 200 + i * 15
    y1 = 100 + i * 40
    x2 = 350
    y2 = 180
    draw.line([x1, y1, x2, y2], fill='#CCCCCC', width=1)

# 右侧有序线
for i in range(4):
    x1 = 550
    y1 = 180
    x2 = 670 + i * 10
    y2 = 100 + i * 50
    draw.line([x1, y1, x2, y2], fill=wechat_green, width=2)

# 标题文字
title = "还在手动回微信？"
subtitle = "Molili 让 AI 帮你回"

# 主标题
draw.text((width//2 - 180, 280), title, fill='#333333', font=font_large)
draw.text((width//2 - 160, 330), subtitle, fill=tech_blue, font=font_medium)

# 装饰性元素 - 科技点阵
for i in range(20):
    x = 50 + i * 40
    y = 20 if i % 2 == 0 else 350
    draw.ellipse([x, y, x+4, y+4], fill='#E0E0E0')

# 保存图片
output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/00_cover.png"
img.save(output_path, 'PNG')
print(f"封面图已保存: {output_path}")
