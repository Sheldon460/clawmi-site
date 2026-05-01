#!/usr/bin/env python3
"""
生成科技感视频封面图
主题：OpenClaw 爆款素材库
风格：深色背景，蓝色霓虹光效，现代简约设计，16:9比例
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import random

# 设置图片尺寸 (16:9 比例，高清)
WIDTH = 1920
HEIGHT = 1080

# 颜色定义
DARK_BG = (10, 15, 30)  # 深蓝黑色背景
BLUE_GLOW = (0, 150, 255)  # 蓝色霓虹
LIGHT_BLUE = (100, 200, 255)  # 浅蓝色
ACCENT_BLUE = (0, 200, 255)  # 强调蓝
WHITE = (255, 255, 255)

def create_gradient_background(width, height):
    """创建渐变深色背景"""
    img = Image.new('RGB', (width, height), DARK_BG)
    draw = ImageDraw.Draw(img)
    
    # 创建径向渐变效果
    for y in range(height):
        for x in range(0, width, 4):  # 步进优化
            # 计算距离中心的距离
            center_x, center_y = width // 2, height // 2
            dist = math.sqrt((x - center_x)**2 + (y - center_y)**2)
            max_dist = math.sqrt(center_x**2 + center_y**2)
            
            # 根据距离计算颜色
            ratio = dist / max_dist
            r = int(DARK_BG[0] + (20 - DARK_BG[0]) * (1 - ratio))
            g = int(DARK_BG[1] + (30 - DARK_BG[1]) * (1 - ratio))
            b = int(DARK_BG[2] + (50 - DARK_BG[2]) * (1 - ratio))
            
            draw.point((x, y), fill=(r, g, b))
    
    return img

def add_neon_glow(draw, x, y, radius, color, intensity=1.0):
    """添加霓虹光晕效果"""
    for r in range(radius, 0, -2):
        alpha = int(255 * (1 - r/radius) * intensity * 0.3)
        glow_color = (color[0], color[1], color[2])
        # 简化的光晕效果
        draw.ellipse([x-r, y-r, x+r, y+r], outline=glow_color, width=1)

def add_geometric_lines(draw, width, height):
    """添加几何线条装饰"""
    # 水平线条
    for i in range(5):
        y = height * (0.2 + i * 0.15)
        line_color = (BLUE_GLOW[0], BLUE_GLOW[1], BLUE_GLOW[2], 80)
        draw.line([(0, int(y)), (width, int(y))], fill=BLUE_GLOW, width=1)
    
    # 斜线装饰
    for i in range(3):
        x1 = width * (0.1 + i * 0.3)
        y1 = height * 0.1
        x2 = x1 + width * 0.15
        y2 = height * 0.3
        draw.line([(int(x1), int(y1)), (int(x2), int(y2))], fill=LIGHT_BLUE, width=2)
    
    # 右侧装饰线条
    for i in range(4):
        x = width * (0.7 + i * 0.08)
        y1 = height * 0.6
        y2 = height * 0.9
        draw.line([(int(x), int(y1)), (int(x), int(y2))], fill=BLUE_GLOW, width=2)

def add_corner_accents(draw, width, height):
    """添加角落装饰"""
    corner_size = 80
    
    # 左上角
    draw.line([(20, 20), (20 + corner_size, 20)], fill=ACCENT_BLUE, width=3)
    draw.line([(20, 20), (20, 20 + corner_size)], fill=ACCENT_BLUE, width=3)
    
    # 右上角
    draw.line([(width - 20, 20), (width - 20 - corner_size, 20)], fill=ACCENT_BLUE, width=3)
    draw.line([(width - 20, 20), (width - 20, 20 + corner_size)], fill=ACCENT_BLUE, width=3)
    
    # 左下角
    draw.line([(20, height - 20), (20 + corner_size, height - 20)], fill=ACCENT_BLUE, width=3)
    draw.line([(20, height - 20), (20, height - 20 - corner_size)], fill=ACCENT_BLUE, width=3)
    
    # 右下角
    draw.line([(width - 20, height - 20), (width - 20 - corner_size, height - 20)], fill=ACCENT_BLUE, width=3)
    draw.line([(width - 20, height - 20), (width - 20, height - 20 - corner_size)], fill=ACCENT_BLUE, width=3)

def add_particles(draw, width, height):
    """添加粒子效果"""
    random.seed(42)  # 固定种子以获得可重复结果
    for _ in range(50):
        x = random.randint(0, width)
        y = random.randint(0, height)
        size = random.randint(1, 3)
        brightness = random.randint(100, 255)
        color = (brightness // 3, brightness // 2, brightness)
        draw.ellipse([x, y, x+size, y+size], fill=color)

def get_font(size):
    """获取字体"""
    # 尝试使用系统字体
    font_paths = [
        "/System/Library/Fonts/PingFang.ttc",  # macOS 苹方
        "/System/Library/Fonts/STHeiti Light.ttc",  # macOS 黑体
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",  # Linux
        "/usr/share/fonts/truetype/noto/NotoSansCJK-Bold.ttc",  # Linux Noto
    ]
    
    for path in font_paths:
        try:
            return ImageFont.truetype(path, size)
        except:
            continue
    
    return ImageFont.load_default()

def create_cover():
    """创建视频封面"""
    # 创建基础背景
    img = create_gradient_background(WIDTH, HEIGHT)
    draw = ImageDraw.Draw(img)
    
    # 添加几何线条
    add_geometric_lines(draw, WIDTH, HEIGHT)
    
    # 添加角落装饰
    add_corner_accents(draw, WIDTH, HEIGHT)
    
    # 添加粒子效果
    add_particles(draw, WIDTH, HEIGHT)
    
    # 添加光晕效果（使用椭圆模拟）
    # 中心光晕
    for r in range(300, 0, -10):
        alpha = int(30 * (1 - r/300))
        color = (0, 150 - alpha//4, 255 - alpha//4)
        draw.ellipse([WIDTH//2 - r, HEIGHT//2 - r//2, WIDTH//2 + r, HEIGHT//2 + r//2], outline=color, width=2)
    
    # 添加主标题
    try:
        # 尝试加载中文字体
        title_font = get_font(120)
        subtitle_font = get_font(48)
        small_font = get_font(32)
    except:
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # 主标题文字
    title = "OpenClaw"
    subtitle = "爆款素材库"
    tagline = "TECH RESOURCE LIBRARY"
    
    # 计算文字位置（居中）
    # 主标题
    bbox = draw.textbbox((0, 0), title, font=title_font)
    title_width = bbox[2] - bbox[0]
    title_x = (WIDTH - title_width) // 2
    title_y = HEIGHT // 2 - 100
    
    # 绘制文字阴影/光晕效果
    for offset in range(15, 0, -3):
        glow_intensity = int(50 * (1 - offset/15))
        glow_color = (0, 150 + glow_intensity, 255)
        draw.text((title_x, title_y), title, font=title_font, fill=glow_color)
    
    # 绘制主标题
    draw.text((title_x, title_y), title, font=title_font, fill=WHITE)
    
    # 副标题
    bbox = draw.textbbox((0, 0), subtitle, font=subtitle_font)
    subtitle_width = bbox[2] - bbox[0]
    subtitle_x = (WIDTH - subtitle_width) // 2
    subtitle_y = title_y + 140
    
    # 副标题光晕
    for offset in range(8, 0, -2):
        glow_color = (0, 200, 255)
        draw.text((subtitle_x, subtitle_y), subtitle, font=subtitle_font, fill=glow_color)
    
    draw.text((subtitle_x, subtitle_y), subtitle, font=subtitle_font, fill=WHITE)
    
    # 英文标语
    bbox = draw.textbbox((0, 0), tagline, font=small_font)
    tagline_width = bbox[2] - bbox[0]
    tagline_x = (WIDTH - tagline_width) // 2
    tagline_y = subtitle_y + 80
    
    draw.text((tagline_x, tagline_y), tagline, font=small_font, fill=LIGHT_BLUE)
    
    # 添加底部装饰线
    line_y = HEIGHT - 100
    line_width = 400
    line_x = (WIDTH - line_width) // 2
    
    # 渐变线条
    for i in range(line_width):
        ratio = abs(i - line_width//2) / (line_width//2)
        brightness = int(255 * (1 - ratio * 0.5))
        color = (0, brightness//2, brightness)
        draw.line([(line_x + i, line_y), (line_x + i, line_y + 3)], fill=color, width=1)
    
    # 保存图片
    output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-pai/openclaw_cover.png"
    img.save(output_path, "PNG", quality=95)
    print(f"封面图已保存到: {output_path}")
    
    return output_path

if __name__ == "__main__":
    create_cover()
