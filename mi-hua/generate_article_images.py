#!/usr/bin/env python3
"""
文章配图生成脚本 - Bezos: AI是全球经济的新电网
"""

from PIL import Image, ImageDraw, ImageFont
import random
import os

OUTPUT_DIR = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区"

def get_font(size):
    font_paths = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Helvetica.ttc"
    ]
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                pass
    return ImageFont.load_default()

def draw_gradient_bg(draw, width, height, color1, color2):
    for i in range(height):
        ratio = i / height
        r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
        g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
        b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
        draw.line([(0, i), (width, i)], fill=(r, g, b))

# ============ 封面图 ============
def generate_cover():
    width, height = 900, 383
    img = Image.new('RGB', (width, height), (10, 15, 30))
    draw = ImageDraw.Draw(img)
    
    draw_gradient_bg(draw, width, height, (5, 10, 25), (20, 30, 60))
    
    nodes = [
        (100, 100), (250, 80), (400, 120), (550, 90), (700, 110), (850, 95),
        (150, 200), (300, 180), (450, 220), (600, 190), (750, 210), (900, 195),
        (80, 300), (220, 280), (380, 320), (520, 290), (680, 310), (820, 295),
        (180, 383), (350, 360), (500, 383), (650, 370), (800, 383)
    ]
    
    blue_color = (0, 150, 255)
    gold_color = (255, 200, 50)
    
    connections = [
        (0, 1), (1, 2), (2, 3), (3, 4), (4, 5),
        (6, 7), (7, 8), (8, 9), (9, 10), (10, 11),
        (12, 13), (13, 14), (14, 15), (15, 16), (16, 17),
        (0, 6), (1, 7), (2, 8), (3, 9), (4, 10), (5, 11),
        (6, 12), (7, 13), (8, 14), (9, 15), (10, 16), (11, 17),
        (12, 18), (13, 19), (14, 20), (15, 21), (16, 22), (17, 22)
    ]
    
    for conn in connections:
        n1, n2 = nodes[conn[0]], nodes[conn[1]]
        color = blue_color if random.random() > 0.3 else gold_color
        draw.line([(n1[0], n1[1]), (n2[0], n2[1])], fill=color, width=1)
    
    for i, node in enumerate(nodes):
        color = gold_color if i % 3 == 0 else blue_color
        size = random.randint(4, 8)
        draw.ellipse([node[0]-size, node[1]-size, node[0]+size, node[1]+size], fill=color)
    
    try:
        font_large = get_font(42)
        font_small = get_font(20)
        draw.text((52, 52), "AI: The New Power Grid", fill=(0, 0, 0), font=font_large)
        draw.text((50, 50), "AI: The New Power Grid", fill=(255, 255, 255), font=font_large)
        draw.text((52, 102), "全球经济的新基础设施", fill=(0, 0, 0), font=font_small)
        draw.text((50, 100), "全球经济的新基础设施", fill=(200, 220, 255), font=font_small)
    except:
        pass
    
    img.save(os.path.join(OUTPUT_DIR, "00_cover.png"), "PNG")
    print("✅ 封面图已生成: 00_cover.png (900x383)")

# ============ 配图1: 电力革命历史对照 ============
def generate_power_history():
    width, height = 800, 600
    img = Image.new('RGB', (width, height), (30, 30, 40))
    draw = ImageDraw.Draw(img)
    
    draw_gradient_bg(draw, width, height, (25, 25, 35), (40, 40, 55))
    draw.line([(width//2, 50), (width//2, height-50)], fill=(100, 100, 120), width=2)
    
    left_center = width // 4
    
    for y in range(50, height-50):
        ratio = (y - 50) / (height - 100)
        r = int(60 * (1 - ratio) + 40 * ratio)
        g = int(50 * (1 - ratio) + 35 * ratio)
        b = int(40 * (1 - ratio) + 30 * ratio)
        draw.line([(20, y), (width//2-20, y)], fill=(r, g, b))
    
    draw.rectangle([left_center-60, 200, left_center+60, 400], fill=(80, 70, 60), outline=(120, 110, 100), width=2)
    draw.ellipse([left_center-40, 420, left_center+40, 500], fill=(60, 55, 50), outline=(100, 95, 90), width=3)
    draw.rectangle([left_center-80, 150, left_center-60, 250], fill=(100, 90, 80), outline=(130, 120, 110), width=1)
    draw.rectangle([left_center+60, 150, left_center+80, 250], fill=(100, 90, 80), outline=(130, 120, 110), width=1)
    
    for i in range(5):
        x = left_center - 100 + i * 15
        draw.ellipse([x, 100+i*10, x+20, 130+i*10], fill=(180, 180, 180))
    
    try:
        font_title = get_font(24)
        font_desc = get_font(16)
        draw.text((left_center-80, 520), "1900s", fill=(220, 200, 180), font=font_title)
        draw.text((left_center-90, 555), "工厂自备发电机", fill=(180, 170, 160), font=font_desc)
    except:
        pass
    
    right_center = width * 3 // 4
    
    for y in range(50, height-50):
        ratio = (y - 50) / (height - 100)
        r = int(20 * (1 - ratio) + 15 * ratio)
        g = int(40 * (1 - ratio) + 30 * ratio)
        b = int(80 * (1 - ratio) + 60 * ratio)
        draw.line([(width//2+20, y), (width-20, y)], fill=(r, g, b))
    
    tower_x = right_center - 80
    draw.polygon([(tower_x, 450), (tower_x-20, 450), (tower_x, 150), (tower_x+20, 450)], fill=(100, 120, 150), outline=(150, 170, 200), width=2)
    draw.line([(tower_x-15, 300), (tower_x+15, 300)], fill=(120, 140, 170), width=2)
    draw.line([(tower_x-10, 220), (tower_x+10, 220)], fill=(120, 140, 170), width=2)
    
    tower_x = right_center + 80
    draw.polygon([(tower_x, 450), (tower_x-20, 450), (tower_x, 150), (tower_x+20, 450)], fill=(100, 120, 150), outline=(150, 170, 200), width=2)
    draw.line([(tower_x-15, 300), (tower_x+15, 300)], fill=(120, 140, 170), width=2)
    draw.line([(tower_x-10, 220), (tower_x+10, 220)], fill=(120, 140, 170), width=2)
    
    for y in [180, 220, 260, 300, 340]:
        draw.line([(right_center-80, y), (right_center+80, y)], fill=(180, 200, 220), width=2)
    
    try:
        draw.text((right_center-80, 520), "Today", fill=(150, 200, 255), font=font_title)
        draw.text((right_center-90, 555), "统一电网基础设施", fill=(130, 180, 230), font=font_desc)
    except:
        pass
    
    img.save(os.path.join(OUTPUT_DIR, "01_power_history.png"), "PNG")
    print("✅ 配图1已生成: 01_power_history.png (800x600)")

# ============ 配图2: AI渗透工作流程 ============
def generate_ai_workflow():
    width, height = 800, 600
    img = Image.new('RGB', (width, height), (25, 25, 35))
    draw = ImageDraw.Draw(img)
    
    draw_gradient_bg(draw, width, height, (20, 20, 30), (35, 35, 50))
    
    try:
        font_title = get_font(28)
        font_box = get_font(18)
        draw.text((300, 30), "AI 渗透工作流程", fill=(255, 255, 255), font=font_title)
    except:
        font_title = get_font(28)
        font_box = get_font(18)
    
    stages = [
        ("需求分析", 100, 150),
        ("方案设计", 300, 150),
        ("内容创作", 500, 150),
        ("数据分析", 700, 150),
        ("决策优化", 400, 350)
    ]
    
    colors = [
        (100, 150, 200),
        (120, 170, 220),
        (140, 190, 240),
        (160, 200, 255),
        (255, 200, 100)
    ]
    
    for i in range(len(stages) - 2):
        x1, y1 = stages[i][1], stages[i][2]
        x2, y2 = stages[i+1][1], stages[i+1][2]
        draw.line([(x1+60, y1), (x2-60, y2)], fill=(100, 150, 200), width=2)
        draw.polygon([(x2-60, y2-5), (x2-60, y2+5), (x2-50, y2)], fill=(100, 150, 200))
    
    for i in range(len(stages) - 1):
        x1, y1 = stages[i][1], stages[i][2]
        x2, y2 = stages[-1][1], stages[-1][2]
        if x1 < x2:
            draw.line([(x1, y1+30), (x2-40, y2-30)], fill=(255, 200, 100), width=1)
        else:
            draw.line([(x1, y1+30), (x2+40, y2-30)], fill=(255, 200, 100), width=1)
    
    for i, (text, x, y) in enumerate(stages):
        color = colors[i]
        draw.rounded_rectangle([x-60, y-30, x+60, y+30], radius=10, fill=color, outline=(255, 255, 255), width=2)
        try:
            draw.text((x-40, y-10), text, fill=(255, 255, 255), font=font_box)
        except:
            pass
    
    img.save(os.path.join(OUTPUT_DIR, "02_ai_workflow.png"), "PNG")
    print("✅ 配图2已生成: 02_ai_workflow.png (800x600)")

# ============ 配图3: 商业规则重构 ============
def generate_business_rules():
    width, height = 800, 600
    img = Image.new('RGB', (width, height), (25, 25, 35))
    draw = ImageDraw.Draw(img)
    
    draw_gradient_bg(draw, width, height, (20, 20, 30), (35, 35, 50))
    
    try:
        font_title = get_font(28)
        font_item = get_font(18)
        draw.text((280, 30), "商业规则重构", fill=(255, 255, 255), font=font_title)
    except:
        font_title = get_font(28)
        font_item = get_font(18)
    
    # 左侧：重构前
    left_x = 200
    draw.text((left_x-60, 80), "重构前", fill=(200, 150, 150), font=font_title)
    
    before_items = [
        "人工决策为主",
        "经验驱动",
        "线性增长",
        "高边际成本",
        "本地化运营"
    ]
    
    for i, item in enumerate(before_items):
        y = 140 + i * 70
        draw.rounded_rectangle([left_x-120, y-25, left_x+120, y+25], radius=8, fill=(80, 60, 60), outline=(150, 120, 120), width=2)
        try:
            draw.text((left_x-80, y-10), item, fill=(220, 200, 200), font=font_item)
        except:
            pass
    
    # 右侧：重构后
    right_x = 600
    draw.text((right_x-60, 80), "重构后", fill=(150, 200, 255), font=font_title)
    
    after_items = [
        "AI智能决策",
        "数据驱动",
        "指数增长",
        "低边际成本",
        "全球化运营"
    ]
    
    for i, item in enumerate(after_items):
        y = 140 + i * 70
        draw.rounded_rectangle([right_x-120, y-25, right_x+120, y+25], radius=8, fill=(60, 80, 120), outline=(100, 150, 200), width=2)
        try:
            draw.text((right_x-80, y-10), item, fill=(200, 220, 255), font=font_item)
        except:
            pass
    
    # 中间箭头
    draw.line([(left_x+130, 300), (right_x-130, 300)], fill=(255, 200, 100), width=3)
    draw.polygon([(right_x-130, 295), (right_x-130, 305), (right_x-115, 300)], fill=(255, 200, 100))
    
    img.save(os.path.join(OUTPUT_DIR, "03_business_rules.png"), "PNG")
    print("✅ 配图3已生成: 03_business_rules.png (800x600)")

# ============ 主函数 ============
if __name__ == "__main__":
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    print("🎨 开始生成文章配图...")
    print(f"输出目录: {OUTPUT_DIR}")
    print()
    
    generate_cover()
    generate_power_history()
    generate_ai_workflow()
    generate_business_rules()
    
    print()
    print("✅ 所有配图生成完成！")
