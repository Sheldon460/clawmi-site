#!/usr/bin/env python3
"""
使用 PIL/Pillow 创建 QClaw 文章配图
"""

from PIL import Image, ImageDraw, ImageFont
import os

# 输出路径
OUTPUT_DIR = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size):
    """获取字体"""
    font_paths = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/Hiragino Sans GB.ttc",
    ]
    for path in font_paths:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except:
                continue
    return ImageFont.load_default()

def create_gradient(width, height, color1, color2):
    """创建渐变背景"""
    img = Image.new('RGB', (width, height))
    draw = ImageDraw.Draw(img)
    
    for y in range(height):
        for x in range(width):
            ratio = (x + y) / (width + height)
            r = int(color1[0] * (1 - ratio) + color2[0] * ratio)
            g = int(color1[1] * (1 - ratio) + color2[1] * ratio)
            b = int(color1[2] * (1 - ratio) + color2[2] * ratio)
            draw.point((x, y), fill=(r, g, b))
    
    return img

def create_cover():
    """创建封面图 - 900x383"""
    width, height = 900, 383
    
    # 深蓝到紫色渐变背景
    img = create_gradient(width, height, (30, 58, 95), (74, 28, 107))
    draw = ImageDraw.Draw(img)
    
    # 微信绿色对话框
    bubble_x, bubble_y = width // 2 - 100, height // 2 - 80
    bubble_w, bubble_h = 200, 140
    
    # 对话框主体
    draw.rounded_rectangle([bubble_x, bubble_y, bubble_x + bubble_w, bubble_y + bubble_h], 
                           radius=20, fill=(7, 193, 96))
    
    # 对话框尾巴
    tail_points = [
        (bubble_x + 30, bubble_y + bubble_h),
        (bubble_x + 50, bubble_y + bubble_h + 20),
        (bubble_x + 60, bubble_y + bubble_h)
    ]
    draw.polygon(tail_points, fill=(7, 193, 96))
    
    # 破碎效果线条
    draw.line([(bubble_x + 120, bubble_y + 30), (bubble_x + 160, bubble_y + 50)], 
              fill=(255, 255, 255), width=2)
    
    # QClaw 文字
    font_large = get_font(48)
    text = "QClaw"
    bbox = draw.textbbox((0, 0), text, font=font_large)
    text_w = bbox[2] - bbox[0]
    draw.text((bubble_x + (bubble_w - text_w) // 2, bubble_y + 45), text, 
              fill=(255, 255, 255), font=font_large)
    
    # 底部文字
    font_title = get_font(28)
    title = "折腾了 3 小时，然后沉默了"
    bbox = draw.textbbox((0, 0), title, font=font_title)
    title_w = bbox[2] - bbox[0]
    draw.text(((width - title_w) // 2, height - 70), title, 
              fill=(255, 255, 255), font=font_title)
    
    # 小字
    font_small = get_font(14)
    subtitle = "QClaw vs OpenClaw 深度体验评测"
    bbox = draw.textbbox((0, 0), subtitle, font=font_small)
    sub_w = bbox[2] - bbox[0]
    draw.text(((width - sub_w) // 2, height - 35), subtitle, 
              fill=(200, 200, 200), font=font_small)
    
    output_path = os.path.join(OUTPUT_DIR, "00_cover.png")
    img.save(output_path, "PNG")
    print(f"✅ 封面图已保存: {output_path}")
    return output_path

def create_wechat_entry():
    """创建微信入口界面 - 800x600"""
    width, height = 800, 600
    img = Image.new('RGB', (width, height), (245, 245, 245))
    draw = ImageDraw.Draw(img)
    
    # 顶部状态栏
    draw.rectangle([0, 0, width, 50], fill=(237, 237, 237))
    font_header = get_font(16)
    draw.text((width // 2 - 16, 15), "微信", fill=(51, 51, 51), font=font_header)
    
    # 聊天列表
    chats = [
        {"name": "QClaw 客服号", "msg": "扫码后可通过微信与客服号对话...", "active": True},
        {"name": "文件传输助手", "msg": "[文件]", "active": False},
        {"name": "幂Claw", "msg": "好的，收到", "active": False},
        {"name": "订阅号消息", "msg": "4 篇更新", "active": False},
        {"name": "微信团队", "msg": "欢迎添加 QClaw...", "active": False},
    ]
    
    y_offset = 50
    for chat in chats:
        # 背景
        if chat["active"]:
            draw.rectangle([0, y_offset, width, y_offset + 70], fill=(230, 230, 230))
        
        # 头像
        avatar_color = (102, 126, 234) if chat["active"] else (200, 200, 200)
        draw.rounded_rectangle([15, y_offset + 10, 65, y_offset + 60], radius=6, fill=avatar_color)
        
        # 名称
        font_name = get_font(16)
        draw.text((80, y_offset + 15), chat["name"], fill=(51, 51, 51), font=font_name)
        
        # 消息预览
        font_msg = get_font(13)
        draw.text((80, y_offset + 40), chat["msg"], fill=(153, 153, 153), font=font_msg)
        
        # 时间
        font_time = get_font(12)
        draw.text((width - 60, y_offset + 15), "17:59", fill=(191, 191, 191), font=font_time)
        
        # 分隔线
        draw.line([(80, y_offset + 70), (width, y_offset + 70)], fill=(240, 240, 240), width=1)
        
        y_offset += 70
    
    # 高亮提示框
    hint_y = y_offset + 20
    draw.rounded_rectangle([40, hint_y, width - 40, hint_y + 80], radius=8, 
                           fill=(255, 251, 230), outline=(255, 229, 143))
    
    font_hint = get_font(14)
    hint_text = "扫码后可通过微信与客服号对话发送指令操控电脑"
    draw.text((60, hint_y + 30), hint_text, fill=(102, 102, 102), font=font_hint)
    
    output_path = os.path.join(OUTPUT_DIR, "01_wechat_entry.png")
    img.save(output_path, "PNG")
    print(f"✅ 微信入口图已保存: {output_path}")
    return output_path

def create_feature_compare():
    """创建功能对比表格 - 800x600"""
    width, height = 800, 600
    img = Image.new('RGB', (width, height), (255, 255, 255))
    draw = ImageDraw.Draw(img)
    
    # 标题
    font_title = get_font(24)
    title = "功能对比：原生 OpenClaw vs QClaw"
    bbox = draw.textbbox((0, 0), title, font=font_title)
    title_w = bbox[2] - bbox[0]
    draw.text(((width - title_w) // 2, 30), title, fill=(51, 51, 51), font=font_title)
    
    # 左栏 - OpenClaw
    left_x, left_y = 40, 100
    left_w, left_h = 340, 450
    
    # 渐变背景
    for y in range(left_h):
        ratio = y / left_h
        r = int(102 * (1 - ratio) + 118 * ratio)
        g = int(126 * (1 - ratio) + 75 * ratio)
        b = int(234 * (1 - ratio) + 162 * ratio)
        draw.line([(left_x, left_y + y), (left_x + left_w, left_y + y)], fill=(r, g, b))
    
    # 标题
    font_col_title = get_font(22)
    draw.text((left_x + 20, left_y + 20), "原生 OpenClaw", fill=(255, 255, 255), font=font_col_title)
    
    font_col_sub = get_font(14)
    draw.text((left_x + 20, left_y + 50), "功能完整但门槛高", fill=(255, 255, 255), font=font_col_sub)
    
    # 功能列表
    features = ["安装难度: 高", "文件传输: ✓", "群聊功能: ✓", "截图能力: ✓", "自定义模型: ✓"]
    
    font_feature = get_font(16)
    y = left_y + 100
    for feature in features:
        draw.ellipse([left_x + 20, y, left_x + 44, y + 24], fill=(255, 255, 255, 100))
        draw.text((left_x + 55, y + 2), feature, fill=(255, 255, 255), font=font_feature)
        y += 60
    
    # 右栏 - QClaw
    right_x, right_y = 420, 100
    right_w, right_h = 340, 450
    
    # 渐变背景
    for y in range(right_h):
        ratio = y / right_h
        r = int(7 * (1 - ratio) + 5 * ratio)
        g = int(193 * (1 - ratio) + 160 * ratio)
        b = int(96 * (1 - ratio) + 80 * ratio)
        draw.line([(right_x, right_y + y), (right_x + right_w, right_y + y)], fill=(r, g, b))
    
    draw.text((right_x + 20, right_y + 20), "QClaw", fill=(255, 255, 255), font=font_col_title)
    draw.text((right_x + 20, right_y + 50), "门槛低但功能阉割", fill=(255, 255, 255), font=font_col_sub)
    
    # QClaw 功能列表
    qclaw_features = ["安装难度: 低", "文件传输: ✗", "群聊功能: ✗", "截图能力: ✗", "自定义模型: △"]
    
    y = right_y + 100
    for feature in qclaw_features:
        draw.ellipse([right_x + 20, y, right_x + 44, y + 24], fill=(255, 255, 255, 100))
        draw.text((right_x + 55, y + 2), feature, fill=(255, 255, 255), font=font_feature)
        y += 60
    
    output_path = os.path.join(OUTPUT_DIR, "02_feature_compare.png")
    img.save(output_path, "PNG")
    print(f"✅ 功能对比图已保存: {output_path}")
    return output_path

def create_ad_update():
    """创建更新广告入口 - 800x600"""
    width, height = 800, 600
    img = Image.new('RGB', (width, height), (248, 249, 250))
    draw = ImageDraw.Draw(img)
    
    # 应用窗口
    win_x, win_y = 100, 80
    win_w, win_h = 600, 440
    
    # 窗口背景
    draw.rounded_rectangle([win_x, win_y, win_x + win_w, win_y + win_h], radius=12, fill=(255, 255, 255))
    
    # 窗口标题栏
    draw.rounded_rectangle([win_x, win_y, win_x + win_w, win_y + 50], radius=12, fill=(250, 250, 250))
    
    # 三个点（窗口按钮）
    for i, color in enumerate([(255, 95, 86), (255, 189, 46), (40, 201, 64)]):
        draw.ellipse([win_x + 20 + i * 20, win_y + 18, win_x + 32 + i * 20, win_y + 30], fill=color)
    
    # 窗口标题
    font_title = get_font(14)
    draw.text((win_x + win_w // 2 - 30, win_y + 16), "QClaw", fill=(100, 100, 100), font=font_title)
    
    # 右上角按钮 - 龙虾管家安全沙箱
    btn_x, btn_y = win_x + win_w - 200, win_y + 80
    btn_w, btn_h = 180, 40
    
    # 按钮背景
    draw.rounded_rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], radius=8, fill=(24, 144, 255))
    
    font_btn = get_font(13)
    btn_text = "龙虾管家安全沙箱"
    bbox = draw.textbbox((0, 0), btn_text, font=font_btn)
    text_w = bbox[2] - bbox[0]
    draw.text((btn_x + (btn_w - text_w) // 2, btn_y + 10), btn_text, fill=(255, 255, 255), font=font_btn)
    
    # 箭头指向腾讯电脑管家
    arrow_x = btn_x + btn_w // 2
    arrow_y1 = btn_y + btn_h
    arrow_y2 = btn_y + btn_h + 60
    
    draw.line([(arrow_x, arrow_y1), (arrow_x, arrow_y2)], fill=(255, 100, 100), width=3)
    draw.polygon([(arrow_x - 8, arrow_y2 - 10), (arrow_x + 8, arrow_y2 - 10), (arrow_x, arrow_y2)], fill=(255, 100, 100))
    
    # 腾讯电脑管家图标
    pc_x, pc_y = btn_x + 20, btn_y + btn_h + 70
    draw.rounded_rectangle([pc_x, pc_y, pc_x + 140, pc_y + 50], radius=8, fill=(240, 248, 255), outline=(24, 144, 255))
    
    font_pc = get_font(13)
    draw.text((pc_x + 15, pc_y + 15), "腾讯电脑管家", fill=(24, 144, 255), font=font_pc)
    
    # 左下角 - 灵感广场
    plaza_x, plaza_y = win_x + 30, win_y + win_h - 100
    draw.rounded_rectangle([plaza_x, plaza_y, plaza_x + 120, plaza_y + 40], radius=6, fill=(245, 245, 245))
    
    font_plaza = get_font(12)
    draw.text((plaza_x + 20, plaza_y + 12), "灵感广场", fill=(100, 100, 100), font=font_plaza)
    
    # 输入框
    input_x, input_y = win_x + 30, win_y + 200
    input_w, input_h = win_w - 60, 50
    draw.rounded_rectangle([input_x, input_y, input_x + input_w, input_y + input_h], radius=8, fill=(245, 245, 245), outline=(220, 220, 220))
    
    font_input = get_font(14)
    draw.text((input_x + 15, input_y + 15), "虾灵感: 如何使用灵感广场...", fill=(150, 150, 150), font=font_input)
    
    output_path = os.path.join(OUTPUT_DIR, "03_ad_update.png")
    img.save(output_path, "PNG")
    print(f"✅ 广告更新图已保存: {output_path}")
    return output_path

def create_quote_card():
    """创建金句卡片 - 800x600"""
    width, height = 800, 600
    
    # 深色渐变背景
    img = create_gradient(width, height, (30, 35, 50), (20, 25, 40))
    draw = ImageDraw.Draw(img)
    
    # 引号装饰
    font_quote = get_font(120)
    draw.text((80, 80), """, fill=(100, 150, 255), font=font_quote)
    
    # 主文字
    font_main = get_font(32)
    
    # 分行显示
    lines = ["当 AI 被装进微信，", "它到底是助手，还是囚徒？"]
    y = 200
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_main)
        text_w = bbox[2] - bbox[0]
        draw.text(((width - text_w) // 2, y), line, fill=(255, 255, 255), font=font_main)
        y += 60
    
    # 底部装饰线
    line_y = y + 40
    draw.line([(width // 2 - 100, line_y), (width // 2 + 100, line_y)], fill=(100, 150, 255), width=2)
    
    # 来源
    font_source = get_font(14)
    source_text = "—— QClaw 深度体验评测"
    bbox = draw.textbbox((0, 0), source_text, font=font_source)
    source_w = bbox[2] - bbox[0]
    draw.text(((width - source_w) // 2, line_y + 20), source_text, fill=(150, 150, 150), font=font_source)
    
    output_path = os.path.join(OUTPUT_DIR, "04_quote_card.png")
    img.save(output_path, "PNG")
    print(f"✅ 金句卡片已保存: {output_path}")
    return output_path

def main():
    """主函数"""
    print("🎨 开始生成 QClaw 文章配图...\n")
    
    # 生成所有配图
    paths = []
    paths.append(create_cover())
    paths.append(create_wechat_entry())
    paths.append(create_feature_compare())
    paths.append(create_ad_update())
    paths.append(create_quote_card())
    
    print("\n✅ 所有配图生成完成！")
    print(f"\n输出目录: {OUTPUT_DIR}")
    print("\n生成的文件:")
    for i, path in enumerate(paths, 1):
        print(f"  {i}. {os.path.basename(path)}")
    
    return paths

if __name__ == "__main__":
    main()