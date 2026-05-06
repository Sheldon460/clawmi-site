#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from PIL import Image, ImageDraw, ImageFont
import os

OUTPUT_DIR = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_font(size):
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

print("Generating cover image...")
img = create_gradient(900, 383, (30, 58, 95), (74, 28, 107))
draw = ImageDraw.Draw(img)
draw.rounded_rectangle([350, 100, 550, 240], radius=20, fill=(7, 193, 96))
draw.polygon([(380, 240), (400, 260), (410, 240)], fill=(7, 193, 96))
font = get_font(48)
draw.text((400, 140), "QClaw", fill=(255, 255, 255), font=font)
font2 = get_font(28)
draw.text((270, 310), "折腾了 3 小时，然后沉默了", fill=(255, 255, 255), font=font2)
img.save(os.path.join(OUTPUT_DIR, "00_cover.png"), "PNG")
print("Saved: 00_cover.png")

print("Generating wechat entry image...")
img2 = Image.new('RGB', (800, 600), (245, 245, 245))
draw2 = ImageDraw.Draw(img2)
draw2.rectangle([0, 0, 800, 50], fill=(237, 237, 237))
font3 = get_font(16)
draw2.text((384, 15), "微信", fill=(51, 51, 51), font=font3)
y = 50
chats = [("QClaw 客服号", True), ("文件传输助手", False), ("幂Claw", False), ("订阅号消息", False)]
for name, active in chats:
    if active:
        draw2.rectangle([0, y, 800, y+70], fill=(230, 230, 230))
    color = (102, 126, 234) if active else (200, 200, 200)
    draw2.rounded_rectangle([15, y+10, 65, y+60], radius=6, fill=color)
    draw2.text((80, y+15), name, fill=(51, 51, 51), font=font3)
    y += 70
draw2.rounded_rectangle([40, y+20, 760, y+100], radius=8, fill=(255, 251, 230), outline=(255, 229, 143))
font4 = get_font(14)
draw2.text((60, y+45), "扫码后可通过微信与客服号对话发送指令操控电脑", fill=(102, 102, 102), font=font4)
img2.save(os.path.join(OUTPUT_DIR, "01_wechat_entry.png"), "PNG")
print("Saved: 01_wechat_entry.png")

print("Generating feature compare image...")
img3 = Image.new('RGB', (800, 600), (255, 255, 255))
draw3 = ImageDraw.Draw(img3)
font5 = get_font(24)
draw3.text((200, 30), "功能对比：原生 OpenClaw vs QClaw", fill=(51, 51, 51), font=font5)
# Left column
for y in range(450):
    ratio = y / 450
    r = int(102 * (1 - ratio) + 118 * ratio)
    g = int(126 * (1 - ratio) + 75 * ratio)
    b = int(234 * (1 - ratio) + 162 * ratio)
    draw3.line([(40, 100 + y), (380, 100 + y)], fill=(r, g, b))
font6 = get_font(22)
draw3.text((60, 120), "原生 OpenClaw", fill=(255, 255, 255), font=font6)
font7 = get_font(14)
draw3.text((60, 150), "功能完整但门槛高", fill=(255, 255, 255), font=font7)
features1 = ["安装难度: 高", "文件传输: OK", "群聊功能: OK", "截图能力: OK", "自定义模型: OK"]
font8 = get_font(16)
y = 200
for f in features1:
    draw3.ellipse([60, y, 84, y+24], fill=(255, 255, 255))
    draw3.text((95, y+2), f, fill=(255, 255, 255), font=font8)
    y += 50
# Right column
for y in range(450):
    ratio = y / 450
    r = int(7 * (1 - ratio) + 5 * ratio)
    g = int(193 * (1 - ratio) + 160 * ratio)
    b = int(96 * (1 - ratio) + 80 * ratio)
    draw3.line([(420, 100 + y), (760, 100 + y)], fill=(r, g, b))
draw3.text((440, 120), "QClaw", fill=(255, 255, 255), font=font6)
draw3.text((440, 150), "门槛低但功能阉割", fill=(255, 255, 255), font=font7)
features2 = ["安装难度: 低", "文件传输: X", "群聊功能: X", "截图能力: X", "自定义模型: ?"]
y = 200
for f in features2:
    draw3.ellipse([440, y, 464, y+24], fill=(255, 255, 255))
    draw3.text((475, y+2), f, fill=(255, 255, 255), font=font8)
    y += 50
img3.save(os.path.join(OUTPUT_DIR, "02_feature_compare.png"), "PNG")
print("Saved: 02_feature_compare.png")

print("Generating ad update image...")
img4 = Image.new('RGB', (800, 600), (248, 249, 250))
draw4 = ImageDraw.Draw(img4)
draw4.rounded_rectangle([100, 80, 700, 520], radius=12, fill=(255, 255, 255))
draw4.rounded_rectangle([100, 80, 700, 130], radius=12, fill=(250, 250, 250))
for i, color in enumerate([(255, 95, 86), (255, 189, 46), (40, 201, 64)]):
    draw4.ellipse([120 + i*20, 98, 132 + i*20, 110], fill=color)
draw4.text((350, 96), "QClaw", fill=(100, 100, 100), font=font3)
draw4.rounded_rectangle([520, 160, 700, 200], radius=8, fill=(24, 144, 255))
draw4.text((540, 170), "龙虾管家安全沙箱", fill=(255, 255, 255), font=font7)
draw4.line([(610, 200), (610, 260)], fill=(255, 100, 100), width=3)
draw4.polygon([(602, 250), (618, 250), (610, 265)], fill=(255, 100, 100))
draw4.rounded_rectangle([530, 280, 690, 330], radius=8, fill=(240, 248, 255), outline=(24, 144, 255))
draw4.text((555, 295), "腾讯电脑管家", fill=(24, 144, 255), font=font7)
draw4.rounded_rectangle([130, 420, 250, 460], radius=6, fill=(245, 245, 245))
draw4.text((155, 432), "灵感广场", fill=(100, 100, 100), font=font7)
draw4.rounded_rectangle([130, 280, 670, 330], radius=8, fill=(245, 245, 245), outline=(220, 220, 220))
draw4.text((145, 295), "虾灵感: 如何使用灵感广场...", fill=(150, 150, 150), font=font7)
img4.save(os.path.join(OUTPUT_DIR, "03_ad_update.png"), "PNG")
print("Saved: 03_ad_update.png")

print("Generating quote card image...")
img5 = create_gradient(800, 600, (30, 35, 50), (20, 25, 40))
draw5 = ImageDraw.Draw(img5)
font9 = get_font(120)
draw5.text((80, 80), '"', fill=(100, 150, 255), font=font9)
font10 = get_font(32)
draw5.text((200, 200), "当 AI 被装进微信，", fill=(255, 255, 255), font=font10)
draw5.text((200, 260), "它到底是助手，还是囚徒？", fill=(255, 255, 255), font=font10)
draw5.line([(300, 340), (500, 340)], fill=(100, 150, 255), width=2)
draw5.text((320, 360), "QClaw 深度体验评测", fill=(150, 150, 150), font=font7)
img5.save(os.path.join(OUTPUT_DIR, "04_quote_card.png"), "PNG")
print("Saved: 04_quote_card.png")

print("\nAll images generated successfully!")
print(f"Output directory: {OUTPUT_DIR}")