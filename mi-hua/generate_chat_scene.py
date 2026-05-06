#!/usr/bin/env python3
"""
生成 Molili 使用场景图 - 微信群聊界面
尺寸: 800×600
主题: 微信群里@AI助手
"""

from PIL import Image, ImageDraw, ImageFont

# 创建画布 (800x600)
width, height = 800, 600
img = Image.new('RGB', (width, height), '#EDEDED')
draw = ImageDraw.Draw(img)

# 颜色定义
wechat_green = "#07C160"
white = "#FFFFFF"
text_dark = "#333333"
text_gray = "#999999"
blue_at = "#576B95"
ai_bg = "#FFF2E8"

# 尝试加载字体
try:
    font_title = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 18)
    font_name = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 14)
    font_message = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 15)
    font_small = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 12)
except:
    font_title = ImageFont.load_default()
    font_name = ImageFont.load_default()
    font_message = ImageFont.load_default()
    font_small = ImageFont.load_default()

# ========== 顶部导航栏 ==========
# 状态栏背景
draw.rectangle([0, 0, width, 65], fill='#F5F5F5')
# 标题
draw.text((width//2 - 60, 35), "产品运营群", fill=text_dark, font=font_title)

# ========== 聊天区域 ==========
chat_top = 65
chat_bottom = height - 50

# 聊天背景
draw.rectangle([0, chat_top, width, chat_bottom], fill='#EDEDED')

# 头像绘制函数
def draw_avatar(draw, x, y, size, color, text, font):
    """绘制圆形头像"""
    draw.ellipse([x, y, x + size, y + size], fill=color)
    # 文字居中
    text_bbox = draw.textbbox((0, 0), text, font=font)
    text_w = text_bbox[2] - text_bbox[0]
    text_h = text_bbox[3] - text_bbox[1]
    draw.text((x + (size - text_w)//2, y + (size - text_h)//2), text, fill='white', font=font)

# 消息气泡绘制函数
def draw_message_bubble(draw, x, y, w, h, is_self, color, text, font, name=None, name_y=None):
    """绘制消息气泡"""
    if is_self:
        # 自己的消息 - 右侧
        # 气泡阴影
        draw.rounded_rectangle([x - 2, y + 2, x + w + 2, y + h + 2], radius=8, fill='#D0D0D0')
        # 气泡主体
        draw.rounded_rectangle([x, y, x + w, y + h], radius=8, fill=color)
        # 小三角
        draw.polygon([(x + w, y + 10), (x + w + 6, y + 15), (x + w, y + 20)], fill=color)
    else:
        # 别人的消息 - 左侧
        # 气泡阴影
        draw.rounded_rectangle([x - 2, y + 2, x + w + 2, y + h + 2], radius=8, fill='#D0D0D0')
        # 气泡主体
        draw.rounded_rectangle([x, y, x + w, y + h], radius=8, fill=color)
        # 小三角
        draw.polygon([(x, y + 10), (x - 6, y + 15), (x, y + 20)], fill=color)
    
    # 文字
    if is_self:
        draw.text((x + 12, y + 10), text, fill=text_dark, font=font)
    else:
        draw.text((x + 12, y + 10), text, fill=text_dark, font=font)

# ========== 消息1: 用户提问 ==========
msg1_y = 100
# 头像 (左侧)
draw_avatar(draw, 15, msg1_y, 40, '#FF6B6B', "张", font_name)
# 名字
draw.text((60, msg1_y - 5), "产品经理-张", fill=text_gray, font=font_small)
# 消息气泡
msg1_text = "@Molili 帮我分析一下这个用户反馈"
msg1_w = 280
msg1_h = 40
draw.rounded_rectangle([60, msg1_y + 15, 60 + msg1_w, msg1_y + 15 + msg1_h], radius=8, fill=white)
draw.polygon([(60, msg1_y + 25), (54, msg1_y + 30), (60, msg1_y + 35)], fill=white)
# @高亮
at_text = "@Molili"
msg_prefix = ""
draw.text((72, msg1_y + 22), at_text, fill=blue_at, font=font_message)
draw.text((72 + 65, msg1_y + 22), " 帮我分析一下这个用户反馈", fill=text_dark, font=font_message)

# ========== 消息2: AI回复 ==========
msg2_y = 170
# AI头像 (右侧)
draw_avatar(draw, width - 55, msg2_y, 40, wechat_green, "AI", font_name)
# AI名字
draw.text((width - 120, msg2_y - 5), "Molili", fill=text_gray, font=font_small)
# AI消息气泡
msg2_text = "收到！正在分析用户反馈..."
msg2_w = 220
msg2_h = 60
draw.rounded_rectangle([width - 60 - msg2_w, msg2_y + 15, width - 60, msg2_y + 15 + msg2_h], radius=8, fill=ai_bg)
draw.polygon([(width - 60, msg2_y + 25), (width - 54, msg2_y + 30), (width - 60, msg2_y + 35)], fill=ai_bg)
draw.text((width - 60 - msg2_w + 12, msg2_y + 22), msg2_text, fill=text_dark, font=font_message)

# ========== 消息3: AI详细回复 ==========
msg3_y = 260
# AI头像 (右侧)
draw_avatar(draw, width - 55, msg3_y, 40, wechat_green, "AI", font_name)
# AI消息气泡 - 详细回复
msg3_lines = [
    "📊 用户反馈分析完成：",
    "",
    "1. 主要问题：登录流程复杂",
    "2. 影响范围：约30%新用户",
    "3. 建议优化：简化注册步骤",
    "",
    "💡 完整报告已生成，需要",
    "   我发到群里吗？"
]
msg3_h = len(msg3_lines) * 22 + 20
msg3_w = 300
draw.rounded_rectangle([width - 60 - msg3_w, msg3_y + 15, width - 60, msg3_y + 15 + msg3_h], radius=8, fill=ai_bg)
draw.polygon([(width - 60, msg3_y + 25), (width - 54, msg3_y + 30), (width - 60, msg3_y + 35)], fill=ai_bg)

for i, line in enumerate(msg3_lines):
    draw.text((width - 60 - msg3_w + 12, msg3_y + 22 + i * 22), line, fill=text_dark, font=font_message)

# ========== 消息4: 用户感谢 ==========
msg4_y = msg3_y + msg3_h + 50
# 头像 (左侧)
draw_avatar(draw, 15, msg4_y, 40, '#FF6B6B', "张", font_name)
# 名字
draw.text((60, msg4_y - 5), "产品经理-张", fill=text_gray, font=font_small)
# 消息气泡
msg4_text = "太棒了！帮我发到群里吧"
msg4_w = 200
msg4_h = 40
draw.rounded_rectangle([60, msg4_y + 15, 60 + msg4_w, msg4_y + 15 + msg4_h], radius=8, fill=white)
draw.polygon([(60, msg4_y + 25), (54, msg4_y + 30), (60, msg4_y + 35)], fill=white)
draw.text((72, msg4_y + 22), msg4_text, fill=text_dark, font=font_message)

# ========== 底部输入框 ==========
draw.rectangle([0, height - 50, width, height], fill='#F7F7F7')
# 输入框背景
draw.rounded_rectangle([50, height - 42, width - 100, height - 8], radius=4, fill=white)
draw.rounded_rectangle([50, height - 42, width - 100, height - 8], radius=4, outline='#D9D9D9', width=1)
# 占位文字
draw.text((60, height - 32), "输入消息...", fill=text_gray, font=font_small)

# ========== 装饰性元素 ==========
# 左侧功能按钮图标 (简化)
draw.text((15, height - 35), "+", fill=text_gray, font=font_title)

# 右侧发送按钮
draw.rounded_rectangle([width - 80, height - 40, width - 15, height - 10], radius=4, fill=wechat_green)
draw.text((width - 60, height - 32), "发送", fill='white', font=font_small)

# 保存图片
output_path = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/02_body.png"
img.save(output_path, 'PNG')
print(f"场景图已保存: {output_path}")
