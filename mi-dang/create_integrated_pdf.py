#!/usr/bin/env python3
"""
觉醒新商学 AI升级改造完整方案 - 整合版PDF生成器
包含：战略方案 + 落地方案 + Prompt模板库
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import os
from datetime import datetime

def create_complete_pdf(output_path="觉醒新商学_AI升级改造完整方案.pdf"):
    # 注册中文字体
    font_paths = ["/System/Library/Fonts/STHeiti Light.ttc", "/System/Library/Fonts/PingFang.ttc"]
    chinese_font = 'Helvetica'
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                pdfmetrics.registerFont(TTFont('ChineseFont', font_path, subfontIndex=0))
                chinese_font = 'ChineseFont'
                print(f"✅ 已加载字体: {font_path}")
                break
            except: continue
    
    doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=2*cm, leftMargin=2*cm, topMargin=2.5*cm, bottomMargin=2*cm)
    styles = getSampleStyleSheet()
    
    # 样式定义
    title_style = ParagraphStyle('Title', fontName=chinese_font, fontSize=26, textColor=colors.HexColor('#1a202c'), spaceAfter=12, alignment=TA_CENTER, spaceBefore=70)
    subtitle_style = ParagraphStyle('Subtitle', fontName=chinese_font, fontSize=13, textColor=colors.HexColor('#4a5568'), spaceAfter=20, alignment=TA_CENTER)
    h1 = ParagraphStyle('H1', fontName=chinese_font, fontSize=18, textColor=colors.HexColor('#2c5282'), spaceBefore=22, spaceAfter=12)
    h2 = ParagraphStyle('H2', fontName=chinese_font, fontSize=14, textColor=colors.HexColor('#2d3748'), spaceBefore=16, spaceAfter=8)
    h3 = ParagraphStyle('H3', fontName=chinese_font, fontSize=11, textColor=colors.HexColor('#4a5568'), spaceBefore=12, spaceAfter=6, leftIndent=8)
    body = ParagraphStyle('Body', fontName=chinese_font, fontSize=9.5, textColor=colors.HexColor('#2d3748'), spaceAfter=8, alignment=TA_JUSTIFY, leading=14)
    lst = ParagraphStyle('List', fontName=chinese_font, fontSize=9.5, textColor=colors.HexColor('#2d3748'), spaceAfter=5, leftIndent=12, bulletIndent=4)
    code = ParagraphStyle('Code', fontName='Courier', fontSize=7.5, textColor=colors.HexColor('#1e40af'), backColor=colors.HexColor('#f0f9ff'), borderColor=colors.HexColor('#bae6fd'), borderWidth=0.5, borderPadding=5, spaceBefore=6, spaceAfter=6, leftIndent=5)
    
    story = []
    
    # 封面
    story.append(Spacer(1, 5*cm))
    story.append(Paragraph("觉醒新商学", title_style))
    story.append(Paragraph("AI升级改造完整方案", title_style))
    story.append(Spacer(1, 0.6*cm))
    story.append(Paragraph("战略规划 + 落地实施 + Prompt模板库", subtitle_style))
    story.append(Spacer(1, 2*cm))
    cover_info = ParagraphStyle('Cover', fontName=chinese_font, fontSize=10, textColor=colors.HexColor('#718096'), alignment=TA_CENTER, spaceAfter=6)
    story.append(Paragraph("版本：v2.0 整合版", cover_info))
    story.append(Paragraph(f"日期：{datetime.now().strftime('%Y年%m月%d日')}", cover_info))
    story.append(Paragraph("制定：幂档 (mi-dang)", cover_info))
    story.append(PageBreak())
    
    # 目录
    story.append(Paragraph("目 录", ParagraphStyle('TOCTitle', fontName=chinese_font, fontSize=20, textColor=colors.HexColor('#1a202c'), alignment=TA_CENTER, spaceAfter=25, spaceBefore=40)))
    toc_items = ["第一部分：项目背景与痛点诊断", "第二部分：四大核心方案（战略层）", "第三部分：落地实施方案（执行层）", "第四部分：Prompt模板库（工具层）", "第五部分：实施路线图与效果追踪"]
    toc_style = ParagraphStyle('TOC', fontName=chinese_font, fontSize=11, textColor=colors.HexColor('#2d3748'), spaceAfter=10, leftIndent=35)
    for item in toc_items:
        story.append(Paragraph(f"• {item}", toc_style))
    story.append(PageBreak())
    
    # 第一部分：项目背景
    story.append(Paragraph("第一部分：项目背景与痛点诊断", h1))
    story.append(Paragraph("1.1 项目主体", h2))
    story.append(Paragraph("<b>觉醒新商学</b> - 专注「一人公司」和「超级个体」培养的知识社群", body))
    
    core_data = [['核心数据', '数值'], ['创始人', '阿猫（星主）、鱼堂主（合伙人）'], ['成员规模', '5,300+ 人'], ['内容沉淀', '2,400+ 篇'], ['运营时长', '1年零224天'], ['核心产品', '《一人公司》书籍配套学习星球'], ['年度价格', '¥999/年']]
    core_table = Table(core_data, colWidths=[4*cm, 9*cm])
    core_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4c51bf')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e0')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f7fafc')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(core_table)
    story.append(Spacer(1, 0.3*cm))
    
    story.append(Paragraph("1.2 四大核心痛点", h2))
    pain_data = [['痛点', '具体表现', '影响范围'], ['资产流失', '个人经验无法沉淀为团队标准Prompt和SOP', '运营、编辑、客服'], ['知识孤岛', '历史文章和SOP无法被AI随时调用', '内容创作、新人培训'], ['工具碎片化', 'AI使用单线程，未形成工作流闭环', '全员效率'], ['数据盲区', '缺乏AI辅助数据分析的意识和能力', '管理决策']]
    pain_table = Table(pain_data, colWidths=[2.8*cm, 6*cm, 4.2*cm])
    pain_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e53e3e')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#fed7d7')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#fff5f5')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(pain_table)
    
    # 第二部分：四大核心方案
    story.append(PageBreak())
    story.append(Paragraph("第二部分：四大核心方案（战略层）", h1))
    
    # 方案一
    story.append(Paragraph("方案一：沉淀团队级资产 - Prompt标准化工程", h2))
    story.append(Paragraph("核心目标：把员工个人经验，变成团队可共用的标准Prompt和SOP模板", body))
    story.append(Paragraph("实施路径：", h3))
    for step in ["Phase 1（第1-2周）：建立经验收集机制、设计标准化Prompt模板框架", "Phase 2（第3-4周）：搭建飞书多维表格Prompt库、建立Prompt评审机制", "Phase 3（第5-8周）：全员培训推广、建立激励制度"]:
        story.append(Paragraph(f"• {step}", lst))
    
    story.append(Paragraph("首批标准化Prompt清单：", h3))
    prompt_data = [['场景', 'Prompt名称', '优先级'], ['内容创作', '群公告生成器', '⭐⭐⭐⭐⭐'], ['内容创作', '训练营招生文案', '⭐⭐⭐⭐⭐'], ['内容创作', '公众号文章框架', '⭐⭐⭐⭐'], ['客服支持', '常见问题回复', '⭐⭐⭐⭐'], ['内容创作', '朋友圈互动话术', '⭐⭐⭐'], ['数据分析', '周报数据解读', '⭐⭐⭐']]
    prompt_table = Table(prompt_data, colWidths=[3.5*cm, 5*cm, 4.5*cm])
    prompt_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#38a169')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#c6f6d5')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0fff4')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(prompt_table)
    story.append(Paragraph("预期成果：建立50+标准Prompt团队库，新人培训时间缩短60%，内容生产效率提升40%", body))
    
    # 方案二
    story.append(Paragraph("方案二：搭建专属知识库与智能体", h2))
    story.append(Paragraph("核心目标：把阿猫、堂主沉淀的历史文章和SOP，变成AI可随时调用的风格库和语料库", body))
    
    story.append(Paragraph("知识资产分类：", h3))
    knowledge_data = [['分类', '内容', '价值'], ['品牌资产', '阿猫/鱼堂主文章全集、品牌调性指南', '内容创作、风格延续'], ['运营SOP', '社群/训练营/活动策划SOP', '流程标准化'], ['内容模板', '公众号/知识星球/朋友圈模板', '效率提升'], ['培训资料', '新人培训、岗位技能培训', '培训加速'], ['历史案例', '成功/失败案例、用户反馈', '经验传承']]
    knowledge_table = Table(knowledge_data, colWidths=[2.8*cm, 6*cm, 4.2*cm])
    knowledge_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#dd6b20')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#feebc8')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#fffaf0')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(knowledge_table)
    
    story.append(Paragraph("技术方案推荐：", h3))
    for item in ["• 方案A（推荐）：NotebookLM + 飞书知识库 - 零技术门槛，快速部署", "• 方案B（进阶）：Coze智能体 + 飞书多维表格 - 自定义能力强", "• 方案C（最简单）：Claude/Gemini Projects - 原生支持，无需技术"]:
        story.append(Paragraph(item, lst))
    story.append(Paragraph("预期成果：2400+篇文章知识库，新人查询知识时间从30分钟降至2分钟，内容生成效率提升50%", body))
    
    # 方案三
    story.append(PageBreak())
    story.append(Paragraph("方案三：构建岗位AI工作流", h2))
    story.append(Paragraph("核心目标：把AI从'帮我写一句话'，升级到'嵌进整个运营/编辑/客服的闭环工作流'", body))
    
    story.append(Paragraph("运营岗位工作流升级：", h3))
    workflow_data = [['步骤', '当前流程', '升级后流程'], ['Step 1', '接收任务', 'AI自动匹配Prompt模板库'], ['Step 2', '手动思考', 'AI生成初稿（调用知识库风格）'], ['Step 3', 'AI生成单点内容', '人工审核+AI优化建议'], ['Step 4', '手动修改', 'AI自动记录发布数据'], ['Step 5', '发布', 'AI采集反馈+生成效果报告'], ['Step 6', '无沉淀', 'AI提取经验+更新Prompt库']]
    workflow_table = Table(workflow_data, colWidths=[2.3*cm, 4*cm, 6.7*cm])
    workflow_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#805ad5')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e9d8fd')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#faf5ff')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(workflow_table)
    story.append(Paragraph("预期成果：运营工作效率提升60%，编辑内容产出提升40%，客服响应速度提升70%", body))
    
    # 方案四
    story.append(Paragraph("方案四：数据分析辅助", h2))
    story.append(Paragraph("核心目标：让AI不仅做执行，还能帮我们做数据异常分析、项目复盘以及任务优先级判断", body))
    
    story.append(Paragraph("AI数据分析能力清单：", h3))
    analysis_data = [['能力', '描述', '应用场景'], ['异常检测', '自动发现数据异常点', '日活突降、转化率异常'], ['趋势分析', '识别数据变化趋势', '用户增长、内容表现'], ['对比分析', '多维度数据对比', '活动效果、渠道质量'], ['归因分析', '找到变化根本原因', '为什么涨、为什么跌'], ['预测分析', '基于历史预测未来', '用户增长、收入预测'], ['决策建议', '基于数据给建议', '下一步做什么']]
    analysis_table = Table(analysis_data, colWidths=[2.8*cm, 4.5*cm, 5.7*cm])
    analysis_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3182ce')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#bee3f8')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#ebf8ff')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(analysis_table)
    story.append(Paragraph("预期成果：建立20+关键指标的数据看板，数据异常发现时间从7天降至1天，决策效率提升50%", body))
    
    # 第三部分：落地实施方案
    story.append(PageBreak())
    story.append(Paragraph("第三部分：落地实施方案（执行层）", h1))
    
    story.append(Paragraph("3.1 工具选型（精选5个）", h2))
    tool_data = [['工具', '选择理由', '落地难度', '优先级'], ['飞书多维表格', '团队已使用，0学习成本', '⭐', 'P0'], ['Coze', '免费、中文、可嵌入飞书', '⭐⭐', 'P0'], ['NotebookLM', '免费、零技术门槛', '⭐', 'P0'], ['Claude/Gemini', '直接对话，无学习成本', '⭐', 'P0'], ['腾讯元器', '微信生态，私域运营', '⭐⭐', 'P1']]
    tool_table = Table(tool_data, colWidths=[3.5*cm, 5.5*cm, 2*cm, 2*cm])
    tool_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#2d3748')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f7fafc')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(tool_table)
    
    story.append(Paragraph("3.2 第一周落地场景", h2))
    
    story.append(Paragraph("场景1：Prompt模板库（飞书多维表格）", h3))
    story.append(Paragraph("实施步骤：", body))
    for item in ["1. 创建「AI Prompt模板库」多维表格（5分钟）", "2. 字段：Prompt名称、适用场景、Prompt内容、使用示例、创建者、使用次数、效果评分", "3. 录入首批5个高频Prompt（30分钟）：群公告生成器、朋友圈文案、常见问题回复、周报生成、活动复盘", "4. 员工培训（10分钟）：打开表格→复制Prompt→粘贴到Claude→替换【】内容→使用"]:
        story.append(Paragraph(f"• {item}", lst))
    story.append(Paragraph("预期效果：员工5分钟即可上手，内容质量一致性提升", body))
    
    story.append(Paragraph("场景2：阿猫/堂主风格库（NotebookLM）", h3))
    for item in ["1. 准备资料（20分钟）：阿猫文章10篇、鱼堂主文章10篇，整理成PDF", "2. 创建知识库（10分钟）：访问notebooklm.google.com，上传文档", "3. 使用场景：查询风格特点、模仿风格创作、内容改写", "4. 团队共享（5分钟）：分享链接到飞书群"]:
        story.append(Paragraph(f"• {item}", lst))
    
    story.append(Paragraph("场景3：运营智能助手（Coze）", h3))
    for item in ["1. 创建Bot（15分钟）：访问www.coze.cn，名称：觉醒运营助手", "2. 配置知识库（10分钟）：上传公司介绍、产品手册、FAQ", "3. 配置Prompt（5分钟）：设置人设和回复逻辑", "4. 发布到飞书（5分钟）：选择飞书渠道，授权发布"]:
        story.append(Paragraph(f"• {item}", lst))
    story.append(Paragraph("使用方式：在飞书群@觉醒运营助手 即可获得帮助", body))
    
    story.append(Paragraph("场景4：数据分析看板（飞书多维表格）", h3))
    for item in ["1. 创建数据看板（20分钟）：每日数据、内容数据、活动数据三张表", "2. 配置自动化（10分钟）：每天早上9点自动发送昨日数据摘要", "3. AI分析Prompt：周报生成、活动复盘、任务优先级判断"]:
        story.append(Paragraph(f"• {item}", lst))
    
    story.append(Paragraph("场景5：内容创作工作流（Claude + 飞书）", h3))
    story.append(Paragraph("6个标准化步骤：选题→大纲→创作→排版→发布→复盘", body))
    
    # 第四部分：Prompt模板库
    story.append(PageBreak())
    story.append(Paragraph("第四部分：Prompt模板库（工具层）", h1))
    
    story.append(Paragraph("4.1 内容创作类（8个）", h2))
    
    story.append(Paragraph("模板1：群公告生成器", h3))
    story.append(Paragraph("你是觉醒新商学的运营助手，请为【活动名称】生成群公告。\n\n活动信息：\n- 时间：【具体时间】\n- 地点：【线上/线下地点】\n- 主题：【活动主题】\n- 讲师：【讲师姓名】\n\n要求：\n1. 语气温暖亲切，符合觉醒新商学调性\n2. 包含活动亮点和参与价值\n3. 结尾加上互动引导\n4. 字数控制在150字以内\n\n参考风格：阿猫温和理性，鱼堂主温暖共情", code))
    
    story.append(Paragraph("模板2：朋友圈文案生成", h3))
    story.append(Paragraph("你是觉醒新商学的内容助手，请为【主题】生成3条朋友圈文案。\n\n主题：【具体内容】\n目标：吸引用户点击/互动/报名\n\n要求：\n1. 每条文案风格不同（干货型/故事型/互动型）\n2. 适当使用emoji增加亲和力\n3. 结尾有明确的行动引导\n4. 每条50-80字", code))
    
    story.append(Paragraph("模板3：公众号文章大纲", h3))
    story.append(Paragraph("请为【选题】生成文章大纲。\n\n要求：\n1. 采用【阿猫/鱼堂主】风格\n2. 结构清晰，逻辑严密\n3. 包含3-5个核心观点\n4. 每个观点有案例支撑\n5. 结尾有行动引导\n\n输出格式：\n一、【标题】\n   1. 【要点】\n   2. 【要点】\n二、【标题】\n   ...", code))
    
    story.append(Paragraph("模板4：训练营招生文案", h3))
    story.append(Paragraph("你是觉醒新商学的招生助手，请为【训练营名称】生成招生文案。\n\n训练营信息：\n- 开营时间：【时间】\n- 时长：【天数】\n- 核心内容：【3-5个要点】\n- 目标人群：【人群画像】\n\n要求：\n1. 突出痛点和解决方案\n2. 强调学员收获和改变\n3. 建立信任感（数据/案例）\n4. 紧迫感行动引导", code))
    
    story.append(Paragraph("模板5：知识星球帖子", h3))
    story.append(Paragraph("请为知识星球写一篇【主题】帖子。\n\n要求：\n1. 开头引人入胜，激发好奇\n2. 中间提供干货价值\n3. 结尾互动提问引导讨论\n4. 语气亲切，像朋友分享\n5. 500-800字", code))
    
    story.append(Paragraph("模板6：活动邀请函", h3))
    story.append(Paragraph("请为【活动名称】写一封邀请函。\n\n活动信息：\n- 时间：【时间】\n- 形式：【线上/线下】\n- 主题：【主题】\n- 亮点：【3个亮点】\n\n要求：\n1. 开头表示对对方的重视\n2. 清晰说明活动价值\n3. 突出专属感\n4. 明确参与方式和截止时间", code))
    
    story.append(Paragraph("模板7：用户感谢信", h3))
    story.append(Paragraph("请为【用户姓名】写一封感谢信。\n\n用户背景：【新老用户/参与活动/贡献】\n感谢原因：【具体原因】\n\n要求：\n1. 真诚具体，不泛泛而谈\n2. 回顾共同经历\n3. 表达未来期待\n4. 温暖收尾", code))
    
    story.append(Paragraph("模板8：课程介绍文案", h3))
    story.append(Paragraph("请为【课程名称】撰写介绍文案。\n\n课程信息：\n- 时长：【时长】\n- 形式：【视频/直播/音频】\n- 核心内容：【3-5个模块】\n- 适合人群：【人群画像】\n\n要求：\n1. 突出课程独特价值\n2. 列举具体学习收获\n3. 展示学员反馈/成果\n4. 行动引导", code))
    
    story.append(Paragraph("4.2 运营类（6个）", h2))
    
    story.append(Paragraph("模板9：社群互动话题", h3))
    story.append(Paragraph("请生成5个适合【社群类型】的互动话题。\n\n社群背景：\n- 主题：【社群主题】\n- 人群：【用户画像】\n- 当前氛围：【活跃/冷淡】\n\n要求：\n1. 话题轻松有趣\n2. 容易参与（门槛低）\n3. 能引发共鸣\n4. 促进成员间互动", code))
    
    story.append(Paragraph("模板10：用户调研问卷", h3))
    story.append(Paragraph("请设计一份【调研主题】问卷。\n\n调研目的：【目的】\n目标人群：【人群】\n\n要求：\n1. 10-15个问题\n2. 包含选择题和开放题\n3. 先易后难排序\n4. 避免引导性问题", code))
    
    story.append(Paragraph("模板11：活动复盘报告", h3))
    story.append(Paragraph("请对以下活动进行复盘分析：\n\n活动名称：【名称】\n核心数据：【数据】\n\n要求：\n1. 活动效果评估\n2. 与预期对比分析\n3. 成功经验提炼\n4. 改进建议\n5. 是否值得复制推广", code))
    
    story.append(Paragraph("模板12：竞品分析报告", h3))
    story.append(Paragraph("请对【竞品名称】进行分析。\n\n分析维度：\n1. 产品功能对比\n2. 定价策略\n3. 用户评价\n4. 营销策略\n5. 优劣势总结\n6. 我们的应对策略", code))
    
    story.append(Paragraph("模板13：用户增长方案", h3))
    story.append(Paragraph("请为【产品/社群】设计用户增长方案。\n\n现状：\n- 当前用户数：【数量】\n- 目标用户数：【数量】\n- 时间周期：【周期】\n\n要求：\n1. 3-5个增长渠道\n2. 每个渠道的具体打法\n3. 预期效果和ROI\n4. 所需资源", code))
    
    story.append(Paragraph("模板14：留存提升策略", h3))
    story.append(Paragraph("请为【产品/社群】设计留存提升策略。\n\n当前问题：【流失情况】\n流失原因分析：【原因】\n\n要求：\n1. 用户分层策略\n2. 触达机制设计\n3. 激励方案\n4. 效果评估方法", code))
    
    story.append(Paragraph("4.3 客服类（3个）", h2))
    
    story.append(Paragraph("模板15：常见问题回复", h3))
    story.append(Paragraph("你是觉醒新商学的客服助手，请回复用户的以下问题：\n\n用户问题：【具体问题】\n用户背景：【新用户/老用户/合伙人】\n\n要求：\n1. 先表达理解和共情\n2. 清晰解答问题\n3. 适当延伸价值（如推荐相关资源）\n4. 结尾友好收尾\n\n参考知识库中的标准答案", code))
    
    story.append(Paragraph("模板16：投诉处理话术", h3))
    story.append(Paragraph("用户投诉内容：【投诉内容】\n\n请生成投诉处理回复，要求：\n1. 诚恳道歉，承认问题\n2. 解释原因（不过度辩解）\n3. 提出解决方案\n4. 承诺改进\n5. 补偿措施（如适用）", code))
    
    story.append(Paragraph("模板17：用户引导话术", h3))
    story.append(Paragraph("用户需求：【用户想做什么】\n当前困惑：【用户卡在哪里】\n\n请生成引导话术：\n1. 确认理解用户需求\n2. 分步骤指引（简单明了）\n3. 预判可能的问题并解答\n4. 鼓励用户行动", code))
    
    story.append(Paragraph("4.4 数据分析类（3个）", h2))
    
    story.append(Paragraph("模板18：周报生成", h3))
    story.append(Paragraph("请根据以下数据生成周报：\n\n【粘贴本周数据】\n\n要求：\n1. 总结本周核心数据变化\n2. 识别异常数据并分析原因\n3. 对比上周，指出进步和不足\n4. 给出下周建议\n\n输出格式：\n📊 核心数据\n📈 亮点\n⚠️ 需关注\n💡 建议", code))
    
    story.append(Paragraph("模板19：活动效果分析", h3))
    story.append(Paragraph("请分析以下活动的效果：\n\n活动名称：【名称】\n活动数据：【数据】\n对比基准：【上期活动/预期目标】\n\n分析维度：\n1. 核心指标表现\n2. 转化漏斗分析\n3. 用户反馈摘要\n4. 成本效益分析\n5. 可复制的经验", code))
    
    story.append(Paragraph("模板20：任务优先级判断", h3))
    story.append(Paragraph("请帮我判断以下任务的优先级：\n\n任务清单：\n1. 【任务A】\n2. 【任务B】\n3. 【任务C】\n\n评估维度：\n- 影响范围（影响多少人）\n- 紧急程度（是否有时限）\n- ROI（投入产出比）\n- 战略价值（是否支持长期目标）\n\n请输出优先级排序和理由。", code))
    
    # 第五部分：实施路线图
    story.append(PageBreak())
    story.append(Paragraph("第五部分：实施路线图与效果追踪", h1))
    
    story.append(Paragraph("5.1 第一周落地计划", h2))
    schedule_data = [['时间', '任务', '负责人', '产出'], ['Day 1', '创建Prompt模板库', '运营负责人', '可用模板库'], ['Day 1', '录入首批5个高频Prompt', '运营负责人', '5个标准Prompt'], ['Day 2', '创建NotebookLM知识库', '内容负责人', '风格库可用'], ['Day 2', '上传阿猫/堂主文章各10篇', '内容负责人', '知识库文档'], ['Day 3', '创建Coze运营助手', '技术负责人', '智能体上线'], ['Day 3', '配置知识库和Prompt', '技术负责人', '可回答问题'], ['Day 4', '创建数据看板', '数据负责人', '数据看板'], ['Day 4', '配置自动化规则', '数据负责人', '自动日报'], ['Day 5', '创建内容创作工作流文档', '编辑负责人', '标准流程'], ['Day 5', '培训全员使用（30分钟）', '全员', '掌握基本操作']]
    schedule_table = Table(schedule_data, colWidths=[2*cm, 5*cm, 3*cm, 4*cm])
    schedule_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#718096')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f7fafc')]), ('TOPPADDING', (0, 0), (-1, -1), 6), ('BOTTOMPADDING', (0, 0), (-1, -1), 6)]))
    story.append(schedule_table)
    
    story.append(Paragraph("5.2 成本与ROI", h2))
    cost_data = [['项目', '成本', '说明'], ['工具订阅费', '¥2,000/月', 'Claude/Gemini/Coze'], ['飞书高级版', '¥1,000/月', '多维表格+自动化'], ['培训成本', '¥5,000', '一次性'], ['合计', '¥3,000/月', '持续投入']]
    cost_table = Table(cost_data, colWidths=[4*cm, 3*cm, 6*cm])
    cost_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#718096')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f7fafc')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(cost_table)
    story.append(Spacer(1, 0.3*cm))
    
    benefit_data = [['收益项', '量化指标', '年度价值'], ['效率提升', '节省1.5人工作量', '¥180,000'], ['新人培训缩短', '从15天降至6天', '¥30,000'], ['内容产出增加', '提升40%', '¥50,000'], ['决策效率提升', '提升50%', '¥40,000'], ['年度总收益', '-', '¥300,000']]
    benefit_table = Table(benefit_data, colWidths=[4*cm, 4*cm, 5*cm])
    benefit_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#38a169')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#c6f6d5')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0fff4')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(benefit_table)
    story.append(Spacer(1, 0.3*cm))
    story.append(Paragraph("<b>ROI = (300,000 - 36,000) / 36,000 = 733%</b>", body))
    
    story.append(Paragraph("5.3 月度评估指标", h2))
    kpi_data = [['指标', '基准值', '目标值', '测量方式'], ['Prompt使用次数', '0', '50次/周', '多维表格统计'], ['内容创作效率', '8小时/篇', '5小时/篇', '时间记录'], ['客服响应时间', '30分钟', '10分钟', '客服系统'], ['数据异常发现时间', '7天', '1天', '复盘记录'], ['员工满意度', '-', '>80%', '问卷调查']]
    kpi_table = Table(kpi_data, colWidths=[4*cm, 3*cm, 3*cm, 3*cm])
    kpi_table.setStyle(TableStyle([('FONTNAME', (0, 0), (-1, -1), chinese_font), ('FONTSIZE', (0, 0), (-1, -1), 9), ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#805ad5')), ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke), ('ALIGN', (0, 0), (-1, -1), 'LEFT'), ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'), ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e9d8fd')), ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#faf5ff')]), ('TOPPADDING', (0, 0), (-1, -1), 7), ('BOTTOMPADDING', (0, 0), (-1, -1), 7)]))
    story.append(kpi_table)
    
    # 页脚
    story.append(Spacer(1, 1.5*cm))
    footer_style = ParagraphStyle('Footer', fontName=chinese_font, fontSize=9, textColor=colors.HexColor('#718096'), alignment=TA_CENTER)
    story.append(Paragraph("—— 方案结束 ——", footer_style))
    story.append(Paragraph(f"生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", footer_style))
    story.append(Paragraph("制定：幂档 (mi-dang) | Sheldon帝国", footer_style))
    
    # 构建PDF
    print(f"📄 正在生成整合版PDF...")
    doc.build(story)
    print(f"✅ PDF已生成: {output_path}")
    return output_path

if __name__ == "__main__":
    output = create_complete_pdf()
    print(f"\n🎉 完成！PDF文件: {output}")