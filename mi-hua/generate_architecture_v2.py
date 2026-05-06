#!/usr/bin/env python3
"""
生成 Molili 架构图 V2
尺寸: 800×600
主题: Molili架构 - 微信→Molili→AI模型
"""

from PIL import Image, ImageDraw, ImageFont

# 创建画布 (800x600)
width, height = 800, 600
img = Image.new('RGB', (width, height), '#FFFFFF')
draw = ImageDraw.Draw(img)

# 颜色定义
wechat_green = "#07C160"
tech_blue = "#1890FF"
ai_purple = "#722ED1"
bg_light = "#F5F5F5"
text_dark = "#333333"
text_gray = "#666666"

# 尝试加载字体
try:
    font_large = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 28)
    font_medium = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
    font_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
except:
    font_large = ImageFont.load_default()
    font_medium = ImageFont.load_default()
    font_small = ImageFont.load_default()

# 标题
title = "Molili Architecture"
draw.text((width//2 - 120, 40), title, fill=text_dark, font=font_large)

# 三个节点的位置
node_y = 250
wechat_x = 150
molili_x = 400
ai_x = 650

# 节点大小
node_w, node_h = 140, 100

# ========== 节点1: 微信 ==========
# 阴影
shadow_offset = 4
draw.rounded_rectangle([wechat_x - node_w//2 + shadow_offset, node_y - node_h//2 + shadow_offset,
                        wechat_x + node_w//2 + shadow_offset, node_y + node_h//2 + shadow_offset], 
                       radius=12, fill='#E0E0E0')
# 主体
wechat_box = [wechat_x - node_w//2, node_y - node_h//2, wechat_x + node_w//2, node_y + node_h//2]
draw.rounded_rectangle(wechat_box, radius=12, fill='#E8F5E9')
# 边框
draw.rounded_rectangle(wechat_box, radius=12, outline=wechat_green, width=3)

# 微信图标 (简化的对话气泡)
bubble_x = wechat_x - 20
bubble_y = node_y - 15
# 左气泡
draw.rounded_rectangle([bubble_x, bubble_y, bubble_x + 20, bubble_y + 16], radius=8, fill=wechat_green)
draw.polygon([(bubble_x + 5, bubble_y + 12), (bubble_x + 10, bubble_y + 20), (bubble_x + 12, bubble_y + 12)], fill=wechat_green)
# 右气泡
draw.rounded_rectangle([bubble_x + 25, bubble_y + 8, bubble_x + 45, bubble_y + 24], radius=8, fill='#4CAF50')
draw.polygon([(bubble_x + 38, bubble_y + 20), (bubble_x + 33, bubble_y + 28), (bubble_x + 31, bubble_y + 20)], fill='#4CAF50')

# 文字
draw.text((wechat_x - 30, node_y + 25), "WeChat", fill=text_dark, font=font_medium)
draw.text((wechat_x - 35, node_y + 50), "Messages", fill=text_gray, font=font_small)

# ========== 节点2: Molili ==========
# 阴影
draw.rounded_rectangle([molili_x - node_w//2 + shadow_offset, node_y - node_h//2 + shadow_offset,
                        molili_x + node_w//2 + shadow_offset, node_y + node_h//2 + shadow_offset], 
                       radius=12, fill='#E0E0E0')
# 主体
molili_box = [molili_x - node_w//2, node_y - node_h//2, molili_x + node_w//2, node_y + node_h//2]
draw.rounded_rectangle(molili_box, radius=12, fill='#E3F2FD')
# 边框
draw.rounded_rectangle(molili_box, radius=12, outline=tech_blue, width=3)

# Molili Logo (M字母风格)
# 绘制M形状
m_points = [
    (molili_x - 25, node_y + 15),
    (molili_x - 25, node_y - 20),
    (molili_x - 8, node_y - 5),
    (molili_x + 8, node_y - 20),
    (molili_x + 25, node_y - 20),
    (molili_x + 25, node_y + 15)
]
for i in range(len(m_points) - 1):
    draw.line([m_points[i], m_points[i+1]], fill=tech_blue, width=4)

# 文字
draw.text((molili_x - 35, node_y + 25), "Molili", fill=text_dark, font=font_medium)
draw.text((molili_x - 35, node_y + 50), "Bridge", fill=text_gray, font=font_small)

# ========== 节点3: AI模型 ==========
# 阴影
draw.rounded_rectangle([ai_x - node_w//2 + shadow_offset, node_y - node_h//2 + shadow_offset,
                        ai_x + node_w//2 + shadow_offset, node_y + node_h//2 + shadow_offset], 
                       radius=12, fill='#E0E0E0')
# 主体
ai_box = [ai_x - node_w//2, node_y - node_h//2, ai_x + node_w//2, node_y + node_h//2]
draw.rounded_rectangle(ai_box, radius=12, fill='#F3E5F5')
# 边框
draw.rounded_rectangle(ai_box, radius=12, outline=ai_purple, width=3)

# AI大脑图标
brain_x = ai_x
brain_y = node_y - 10
# 大脑轮廓
draw.ellipse([brain_x - 25, brain_y - 20, brain_x + 25, brain_y + 20], outline=ai_purple, width=3)
# 神经网络节点
neurons = [
    (brain_x - 10, brain_y - 8),
    (brain_x + 10, brain_y - 8),
    (brain_x, brain_y + 5),
    (brain_x - 15, brain_y + 2),
    (brain_x + 15, brain_y + 2)
]
for nx, ny in neurons:
    draw.ellipse([nx - 4, ny - 4, nx + 4, ny + 4], fill=ai_purple)
# 连接线
for i, (nx1, ny1) in enumerate(neurons):
    for nx2, ny2 in neurons[i+1:]:
        draw.line([(nx1, ny1), (nx2, ny2)], fill='#CE93D8', width=1)

# 文字
draw.text((ai_x - 35, node_y + 25), "AI Model", fill=text_dark, font=font_medium)
draw.text((ai_x - 40, node_y + 50), "Response", fill=text_gray, font=font_small)

# ========== 连接线 ==========
arrow_y = node_y

# 微信 -> Molili
# 箭头线
draw.line([(wechat_x + node_w//2, arrow_y), (molili_x - node_w//2 - 10, arrow_y)], fill=tech_blue, width=3)
# 箭头
draw.polygon([(molili_x - node_w//2 - 10, arrow_y - 6), 
              (molili_x - node_w//2 - 10, arrow_y + 6),
              (molili_x - node_w//2, arrow_y)], fill=tech_blue)

# Molili -> AI模型
draw.line([(molili_x + node_w//2, arrow_y), (ai_x - node_w//2 - 10, arrow_y)], fill=ai_purple, width=3)
draw.polygon([(ai_x - node_w//2 - 10, arrow_y - 6), 
              (ai_x - node_w//2 - 10, arrow_y + 6),
              (ai_x - node_w//2, arrow_y)], fill=ai_purple)

# 返回箭头 (AI -> Molili -> 微信)
return_y = node_y + 60
draw.line([(ai_x - 20, return_y), (wechat_x + 20, return_y)], fill='#9E9E9E', width=2)
draw.polygon([(wechat_x + 20, return_y - 5), 
              (wechat_x + 20, return_y + 5),
              (wechat_x + 10, return_y)], fill='#9E9E9E')

# 流程说明文字
draw.text((wechat_x + 80, arrow_y - 25), "Forward", fill=tech_blue, font=font_small)
draw.text((molili_x + 80, arrow_y - 25), "Process", fill=ai_purple, font=font_small)
draw.text((width//2 - 40, return_y + 10), "Reply Back", fill=text_gray, font=font_small)

# 底部说明
features = [
    "Real-time Message Listening",
    "Smart Context Understanding", 
    "Auto Reply Generation"
]
for i, feature in enumerate(features):
    draw.text((width//2 - 130, 450 + i * 35), feature, fill=text_dark, font=font_medium)

# 保存图片
output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/01_body.png"
img.save(output_path, 'PNG')
print(f"Architecture image saved: {output_path}")
