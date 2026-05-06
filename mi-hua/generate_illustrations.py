#!/usr/bin/env python3
"""
生成腾讯 ima skill + Agent 全自动知识管理配图
使用 Canvas Design 本地生成
"""

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/"

# 创建输出目录
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size):
    """获取字体"""
    font_paths = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
        "/System/Library/Fonts/Helvetica.ttc",
    ]
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                continue
    return ImageFont.load_default()

def create_gradient_background(width, height, color1, color2):
    """创建渐变背景"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        r = int(color1[0] + (color2[0] - color1[0]) * y / height)
        g = int(color1[1] + (color2[1] - color1[1]) * y / height)
        b = int(color1[2] + (color2[2] - color1[2]) * y / height)
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    return img

def generate_cover():
    """生成封面图 900x383"""
    width, height = 900, 383
    
    # 深蓝渐变背景 - 科技感
    img = create_gradient_background(width, height, (15, 30, 60), (30, 60, 120))
    draw = ImageDraw.Draw(img)
    
    # 绘制网格背景
    for i in range(0, width, 40):
        draw.line([(i, 0), (i, height)], fill=(100, 120, 150), width=1)
    for i in range(0, height, 40):
        draw.line([(0, i), (width, i)], fill=(100, 120, 150), width=1)
    
    # 绘制中心大脑/知识网络图形
    center_x, center_y = width // 2, height // 2 + 10
    
    # 外圈光环
    for r in range(120, 80, -10):
        draw.ellipse([center_x-r, center_y-r+20, center_x+r, center_y+r+20], 
                    outline=(100, 180, 255), width=2)
    
    # 中心节点
    draw.ellipse([center_x-60, center_y-40, center_x+60, center_y+80], 
                fill=(60, 130, 220), outline=(100, 200, 255), width=3)
    
    # 连接节点
    nodes = [
        (center_x-100, center_y-60), (center_x+100, center_y-60),
        (center_x-80, center_y+80), (center_x+80, center_y+80),
        (center_x-120, center_y+10), (center_x+120, center_y+10),
    ]
    
    for nx, ny in nodes:
        draw.line([(center_x, center_y+20), (nx, ny)], fill=(100, 180, 255), width=2)
        draw.ellipse([nx-15, ny-15, nx+15, ny+15], fill=(80, 160, 240), outline=(150, 220, 255), width=2)
    
    # 标题
    title_font = get_font(42)
    subtitle_font = get_font(22)
    
    title = "AI 知识管理自动化"
    subtitle = "腾讯 ima skill + Agent 全自动工作流"
    
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_w = bbox[2] - bbox[0]
    draw.text((center_x - title_w//2, 40), title, fill=(255, 255, 255), font=title_font)
    
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_w = bbox[2] - bbox[0]
    draw.text((center_x - subtitle_w//2, 100), subtitle, fill=(180, 210, 255), font=subtitle_font)
    
    # 底部标签
    tag_font = get_font(14)
    tags = ["#AI工具", "#效率提升", "#知识管理", "#自动化"]
    tag_x = 60
    for tag in tags:
        bbox = draw.textbbox((0, 0), tag, font=tag_font)
        tag_w = bbox[2] - bbox[0]
        draw.rounded_rectangle([tag_x-8, height-55, tag_x+tag_w+8, height-35], 
                          radius=10, fill=(40, 80, 140), outline=(100, 180, 255))
        draw.text((tag_x, height-52), tag, fill=(200, 230, 255), font=tag_font)
        tag_x += tag_w + 25
    
    img.save(f"{OUTPUT_DIR}00_cover.png")
    print(f"封面图已生成: {OUTPUT_DIR}00_cover.png")
    return f"{OUTPUT_DIR}00_cover.png"

def generate_input_illustration():
    """生成输入自动化配图 800x600"""
    width, height = 800, 600
    
    img = create_gradient_background(width, height, (245, 248, 252), (235, 242, 250))
    draw = ImageDraw.Draw(img)
    
    title_font = get_font(28)
    draw.text((width//2-120, 40), "输入自动化", fill=(40, 60, 100), font=title_font)
    
    sources = [
        ("1", "微信读书", "自动同步阅读笔记"),
        ("2", "收藏夹", "一键导入待读"),
        ("3", "网页链接", "智能抓取内容"),
    ]
    
    colors = [(70, 130, 220), (100, 160, 100), (220, 130, 70)]
    start_y = 140
    for i, ((num, name, desc), color) in enumerate(zip(sources, colors)):
        y = start_y + i * 130
        draw.rounded_rectangle([80, y, width-80, y+100], radius=15, 
                          fill=(255, 255, 255), outline=(200, 210, 230), width=2)
        
        draw.ellipse([100, y+20, 160, y+80], fill=color)
        icon_font = get_font(24)
        draw.text((125, y+38), num, fill=(255, 255, 255), font=icon_font)
        
        name_font = get_font(22)
        desc_font = get_font(16)
        draw.text((180, y+25), name, fill=(40, 60, 100), font=name_font)
        draw.text((180, y+55), desc, fill=(120, 140, 180), font=desc_font)
        
        if i < len(sources) - 1:
            draw.polygon([(width//2-10, y+110), (width//2+10, y+110), (width//2, y+125)], 
                      fill=(150, 180, 220))
    
    note_font = get_font(14)
    draw.text((width//2-150, height-60), "多渠道内容 -> 自动汇聚 -> 统一知识库", 
             fill=(100, 130, 180), font=note_font)
    
    img.save(f"{OUTPUT_DIR}01_input.png")
    print(f"输入配图已生成: {OUTPUT_DIR}01_input.png")
    return f"{OUTPUT_DIR}01_input.png"

def generate_process_illustration():
    """生成整理自动化配图 800x600"""
    width, height = 800, 600
    
    img = create_gradient_background(width, height, (250, 252, 255), (240, 245, 252))
    draw = ImageDraw.Draw(img)
    
    title_font = get_font(28)
    draw.text((width//2-120, 40), "整理自动化", fill=(40, 60, 100), font=title_font)
    
    center_x, center_y = width // 2, height // 2 + 20
    
    draw.ellipse([center_x-70, center_y-70, center_x+70, center_y+70], 
                fill=(80, 140, 230), outline=(120, 180, 255), width=3)
    center_font = get_font(18)
    draw.text((center_x-45, center_y-25), "调度", fill=(255, 255, 255), font=center_font)
    draw.text((center_x-45, center_y), "Agent", fill=(255, 255, 255), font=center_font)
    
    agents = [
        ("A", "分类", "Agent"),
        ("B", "标签", "Agent"),
        ("C", "关联", "Agent"),
        ("D", "摘要", "Agent"),
    ]
    
    angles = [45, 135, 225, 315]
    radius = 160
    
    for i, ((icon, name, suffix), angle) in enumerate(zip(agents, angles)):
        ax = center_x + radius * 0.7 * (1 if angle in [45, 315] else -1)
        ay = center_y + radius * 0.5 * (1 if angle in [45, 135] else -1)
        
        draw.line([(center_x, center_y), (ax, ay)], fill=(150, 190, 240), width=2)
        
        draw.ellipse([ax-50, ay-50, ax+50, ay+50], 
                    fill=(255, 255, 255), outline=(100, 160, 230), width=2)
        
        agent_font = get_font(16)
        draw.text((ax-35, ay-20), icon, fill=(70, 130, 220), font=get_font(20))
        draw.text((ax-35, ay+5), name, fill=(60, 90, 140), font=agent_font)
        draw.text((ax-35, ay+25), suffix, fill=(100, 130, 180), font=agent_font)
    
    note_font = get_font(14)
    draw.text((width//2-180, height-50), "多Agent协作 -> 智能分类 -> 自动整理", 
             fill=(100, 130, 180), font=note_font)
    
    img.save(f"{OUTPUT_DIR}02_process.png")
    print(f"整理配图已生成: {OUTPUT_DIR}02_process.png")
    return f"{OUTPUT_DIR}02_process.png"

def generate_output_illustration():
    """生成输出赋能配图 800x600"""
    width, height = 800, 600
    
    img = create_gradient_background(width, height, (252, 250, 245), (250, 245, 235))
    draw = ImageDraw.Draw(img)
    
    title_font = get_font(28)
    draw.text((width//2-100, 40), "输出赋能", fill=(40, 60, 100), font=title_font)
    
    # 用户提问气泡
    draw.rounded_rectangle([100, 120, width-100, 200], radius=20, 
                      fill=(230, 240, 255), outline=(180, 200, 230), width=2)
    q_font = get_font(18)
    draw.text((130, 145), "Q: 这篇笔记的核心观点是什么？", fill=(60, 90, 140), font=q_font)
    
    # AI回答区域
    draw.rounded_rectangle([100, 230, width-100, 420], radius=20, 
                      fill=(255, 255, 255), outline=(200, 210, 220), width=2)
    
    a_font = get_font(16)
    lines = [
        "A: 根据您的知识库分析，这篇笔记",
        "   的核心观点包括：",
        "",
        "   1. AI Agent 可以自动化知识管理",
        "   2. 多源输入实现统一汇聚",
        "   3. 智能整理提升检索效率",
    ]
    y = 250
    for line in lines:
        draw.text((130, y), line, fill=(80, 100, 130), font=a_font)
        y += 28
    
    # 底部功能标签
    features = ["智能问答", "知识检索", "内容生成"]
    feat_colors = [(100, 160, 220), (120, 180, 120), (220, 160, 100)]
    x = 120
    for feat, color in zip(features, feat_colors):
        bbox = draw.textbbox((0, 0), feat, font=get_font(14))
        fw = bbox[2] - bbox[0]
        draw.rounded_rectangle([x, height-100, x+fw+20, height-70], radius=12, fill=color)
        draw.text((x+10, height-95), feat, fill=(255, 255, 255), font=get_font(14))
        x += fw + 40
    
    img.save(f"{OUTPUT_DIR}03_output.png")
    print(f"输出配图已生成: {OUTPUT_DIR}03_output.png")
    return f"{OUTPUT_DIR}03_output.png"

def generate_workflow_illustration():
    """生成完整工作流配图 800x600"""
    width, height = 800, 600
    
    img = create_gradient_background(width, height, (248, 250, 252), (240, 244, 250))
    draw = ImageDraw.Draw(img)
    
    title_font = get_font(28)
    draw.text((width//2-140, 40), "完整工作流闭环", fill=(40, 60, 100), font=title_font)
    
    # 四个步骤
    steps = [
        ("输入", "多渠道采集"),
        ("整理", "Agent处理"),
        ("存储", "知识库沉淀"),
        ("输出", "智能应用"),
    ]
    
    colors = [(100, 160, 220), (120, 180, 120), (220, 160, 100), (180, 120, 200)]
    
    # 横向流程
    start_x = 80
    step_w = 150
    gap = 25
    y = 180
    
    for i, ((title, desc), color) in enumerate(zip(steps, colors)):
        x = start_x + i * (step_w + gap)
        
        # 步骤框
        draw.rounded_rectangle([x, y, x+step_w, y+180], radius=15, 
                          fill=(255, 255, 255), outline=color, width=3)
        
        # 步骤编号
        draw.ellipse([x+step_w//2-20, y-20, x+step_w//2+20, y+20], fill=color)
        num_font = get_font(20)
        draw.text((x+step_w//2-7, y-12), str(i+1), fill=(255, 255, 255), font=num_font)
        
        # 标题
        t_font = get_font(20)
        bbox = draw.textbbox((0, 0), title, font=t_font)
        tw = bbox[2] - bbox[0]
        draw.text((x+step_w//2-tw//2, y+50), title, fill=(40, 60, 100), font=t_font)
        
        # 描述
        d_font = get_font(14)
        bbox = draw.textbbox((0, 0), desc, font=d_font)
        dw = bbox[2] - bbox[0]
        draw.text((x+step_w//2-dw//2, y+90), desc, fill=(120, 140, 180), font=d_font)
        
        # 箭头
        if i < len(steps) - 1:
            arrow_x = x + step_w + 5
            draw.polygon([(arrow_x, y+90), (arrow_x+15, y+80), (arrow_x+15, y+100)], 
                      fill=(150, 170, 200))
    
    # 循环箭头
    draw.arc([start_x-30, y+200, start_x+step_w*4+gap*3+30, y+280], 
            start=200, end=340, fill=(150, 170, 200), width=3)
    draw.polygon([(start_x+step_w*2+gap, y+265), 
                  (start_x+step_w*2+gap-10, y+255),
                  (start_x+step_w*2+gap+10, y+255)], fill=(150, 170, 200))
    
    # 循环标签
    c_font = get_font(14)
    draw.text((width//2-60, y+235), "持续优化循环", fill=(120, 140, 180), font=c_font)
    
    img.save(f"{OUTPUT_DIR}04_workflow.png")
    print(f"工作流配图已生成: {OUTPUT_DIR}04_workflow.png")
    return f"{OUTPUT_DIR}04_workflow.png"

if __name__ == "__main__":
    print("开始生成配图...")
    print("=" * 50)
    
    generate_cover()
    generate_input_illustration()
    generate_process_illustration()
    generate_output_illustration()
    generate_workflow_illustration()
    
    print("=" * 50)
    print("所有配图生成完成!")
    print(f"输出目录: {OUTPUT_DIR}")
