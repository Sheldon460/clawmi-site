#!/usr/bin/env python3
"""
觉醒新商学 AI升级改造方案 - PDF生成器
专业排版，针对商业方案优化
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import os
from datetime import datetime

def create_solution_pdf(output_path="觉醒新商学_AI升级改造方案.pdf"):
    """生成觉醒新商学AI升级改造方案PDF"""
    
    # 注册中文字体
    font_paths = [
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/System/Library/Fonts/PingFang.ttc",
    ]
    
    chinese_font = 'Helvetica'
    for font_path in font_paths:
        if os.path.exists(font_path):
            try:
                pdfmetrics.registerFont(TTFont('ChineseFont', font_path, subfontIndex=0))
                chinese_font = 'ChineseFont'
                print(f"✅ 已加载字体: {font_path}")
                break
            except Exception as e:
                print(f"⚠️ 字体加载失败 {font_path}: {e}")
                continue
    
    # 创建文档
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        rightMargin=2*cm,
        leftMargin=2*cm,
        topMargin=2.5*cm,
        bottomMargin=2*cm
    )
    
    # 定义样式
    styles = getSampleStyleSheet()
    
    # 封面标题
    title_style = ParagraphStyle(
        'CustomTitle',
        fontName=chinese_font,
        fontSize=28,
        textColor=colors.HexColor('#1a202c'),
        spaceAfter=15,
        alignment=TA_CENTER,
        spaceBefore=80
    )
    
    # 副标题
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        fontName=chinese_font,
        fontSize=14,
        textColor=colors.HexColor('#4a5568'),
        spaceAfter=25,
        alignment=TA_CENTER
    )
    
    # 章节标题
    heading1_style = ParagraphStyle(
        'CustomHeading1',
        fontName=chinese_font,
        fontSize=20,
        textColor=colors.HexColor('#2c5282'),
        spaceBefore=25,
        spaceAfter=15,
        leftIndent=0
    )
    
    # 二级标题
    heading2_style = ParagraphStyle(
        'CustomHeading2',
        fontName=chinese_font,
        fontSize=14,
        textColor=colors.HexColor('#2d3748'),
        spaceBefore=18,
        spaceAfter=10,
        leftIndent=0
    )
    
    # 三级标题
    heading3_style = ParagraphStyle(
        'CustomHeading3',
        fontName=chinese_font,
        fontSize=12,
        textColor=colors.HexColor('#4a5568'),
        spaceBefore=12,
        spaceAfter=8,
        leftIndent=10
    )
    
    # 正文
    body_style = ParagraphStyle(
        'CustomBody',
        fontName=chinese_font,
        fontSize=10,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=10,
        alignment=TA_JUSTIFY,
        leading=16
    )
    
    # 信息框
    info_style = ParagraphStyle(
        'InfoBox',
        fontName=chinese_font,
        fontSize=10,
        textColor=colors.HexColor('#1e40af'),
        backColor=colors.HexColor('#ebf8ff'),
        borderColor=colors.HexColor('#3182ce'),
        borderWidth=1,
        borderPadding=10,
        spaceBefore=10,
        spaceAfter=10
    )
    
    # 列表
    list_style = ParagraphStyle(
        'ListStyle',
        fontName=chinese_font,
        fontSize=10,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=6,
        leftIndent=15,
        bulletIndent=5
    )
    
    # 构建内容
    story = []
    
    # ========== 封面 ==========
    story.append(Spacer(1, 5*cm))
    story.append(Paragraph("觉醒新商学", title_style))
    story.append(Paragraph("AI升级改造方案", title_style))
    story.append(Spacer(1, 0.8*cm))
    story.append(Paragraph("从单点工具到团队AI工作流的完整升级路径", subtitle_style))
    story.append(Spacer(1, 2.5*cm))
    
    # 封面信息
    cover_info_style = ParagraphStyle(
        'CoverInfo',
        fontName=chinese_font,
        fontSize=11,
        textColor=colors.HexColor('#718096'),
        alignment=TA_CENTER,
        spaceAfter=8
    )
    story.append(Paragraph("版本：v1.0", cover_info_style))
    story.append(Paragraph(f"日期：{datetime.now().strftime('%Y年%m月%d日')}", cover_info_style))
    story.append(Paragraph("制定：幂档 (mi-dang)", cover_info_style))
    story.append(Paragraph("状态：待评审", cover_info_style))
    story.append(PageBreak())
    
    # ========== 目录 ==========
    story.append(Paragraph("目 录", ParagraphStyle(
        'TOCTitle',
        fontName=chinese_font,
        fontSize=22,
        textColor=colors.HexColor('#1a202c'),
        alignment=TA_CENTER,
        spaceAfter=30,
        spaceBefore=50
    )))
    
    toc_items = [
        "一、项目背景",
        "二、核心痛点诊断",
        "三、方案一：沉淀团队级资产",
        "四、方案二：搭建专属知识库与智能体",
        "五、方案三：构建岗位AI工作流",
        "六、方案四：数据分析辅助",
        "七、实施路线图",
        "八、成本与ROI",
        "九、风险与对策"
    ]
    
    toc_style = ParagraphStyle(
        'TOC',
        fontName=chinese_font,
        fontSize=12,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=12,
        leftIndent=40
    )
    
    for item in toc_items:
        story.append(Paragraph(f"• {item}", toc_style))
    
    story.append(PageBreak())
    
    # ========== 一、项目背景 ==========
    story.append(Paragraph("一、项目背景", heading1_style))
    
    story.append(Paragraph("项目主体", heading2_style))
    story.append(Paragraph("<b>觉醒新商学</b> - 专注「一人公司」和「超级个体」培养的知识社群", body_style))
    
    # 核心数据表
    core_data = [
        ['核心数据', '数值'],
        ['创始人', '阿猫（星主）、鱼堂主（合伙人）'],
        ['成员规模', '5,300+ 人'],
        ['内容沉淀', '2,400+ 篇'],
        ['运营时长', '1年零224天'],
        ['核心产品', '《一人公司》书籍配套学习星球'],
        ['年度价格', '¥999/年']
    ]
    
    core_table = Table(core_data, colWidths=[4*cm, 9*cm])
    core_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#4c51bf')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f7fafc')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(core_table)
    story.append(Spacer(1, 0.3*cm))
    
    story.append(Paragraph("核心业务", heading2_style))
    business_items = [
        "• 知识星球运营 - 社群内容产出与互动",
        "• 训练营运营 - 觉醒者训练营等项目",
        "• 自媒体内容创作 - 公众号、知识星球内容",
        "• 社群运营 - 用户增长与留存",
        "• 年度大会 - AI新个体年度大会"
    ]
    for item in business_items:
        story.append(Paragraph(item, list_style))
    
    # ========== 二、核心痛点诊断 ==========
    story.append(PageBreak())
    story.append(Paragraph("二、核心痛点诊断", heading1_style))
    
    story.append(Paragraph("根据深度调研，觉醒新商学团队面临四大核心挑战：", body_style))
    
    pain_data = [
        ['痛点', '具体表现', '影响范围'],
        ['资产流失', '个人经验无法沉淀为团队标准Prompt和SOP', '运营、编辑、客服'],
        ['知识孤岛', '历史文章和SOP无法被AI随时调用', '内容创作、新人培训'],
        ['工具碎片化', 'AI使用单线程，未形成工作流闭环', '全员效率'],
        ['数据盲区', '缺乏AI辅助数据分析的意识和能力', '管理决策']
    ]
    
    pain_table = Table(pain_data, colWidths=[3*cm, 6*cm, 4*cm])
    pain_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e53e3e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#fed7d7')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#fff5f5')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(pain_table)
    
    # ========== 三、方案一 ==========
    story.append(PageBreak())
    story.append(Paragraph("三、方案一：沉淀团队级资产", heading1_style))
    story.append(Paragraph("Prompt标准化工程", heading2_style))
    
    story.append(Paragraph("核心目标", heading3_style))
    story.append(Paragraph("把员工个人用得顺手的经验，变成团队可共用的标准Prompt和SOP模板。", body_style))
    
    story.append(Paragraph("实施路径", heading2_style))
    
    story.append(Paragraph("Phase 1：经验萃取（第1-2周）", heading3_style))
    
    steps = [
        "1. 建立'最佳实践'分享会机制（每周15分钟）",
        "2. 设置'Prompt悬赏榜'：优秀Prompt奖励机制",
        "3. 使用飞书多维表格建立Prompt收集库",
        "4. 设计标准化Prompt模板框架"
    ]
    for step in steps:
        story.append(Paragraph(step, list_style))
    
    story.append(Paragraph("首批标准化Prompt清单", heading3_style))
    
    prompt_data = [
        ['场景', 'Prompt名称', '优先级'],
        ['内容创作', '群公告生成器', '⭐⭐⭐⭐⭐'],
        ['内容创作', '训练营招生文案', '⭐⭐⭐⭐⭐'],
        ['内容创作', '公众号文章框架', '⭐⭐⭐⭐'],
        ['客服支持', '常见问题回复', '⭐⭐⭐⭐'],
        ['内容创作', '朋友圈互动话术', '⭐⭐⭐'],
        ['数据分析', '周报数据解读', '⭐⭐⭐']
    ]
    
    prompt_table = Table(prompt_data, colWidths=[4*cm, 5*cm, 4*cm])
    prompt_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#38a169')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#c6f6d5')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0fff4')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(prompt_table)
    
    story.append(Paragraph("预期成果", heading3_style))
    story.append(Paragraph(
        "• 建立50+标准Prompt的团队库<br/>"
        "• 新人培训时间缩短60%<br/>"
        "• 内容生产效率提升40%",
        body_style
    ))
    
    # ========== 四、方案二 ==========
    story.append(PageBreak())
    story.append(Paragraph("四、方案二：搭建专属知识库与智能体", heading1_style))
    
    story.append(Paragraph("核心目标", heading2_style))
    story.append(Paragraph("把阿猫、堂主沉淀的历史文章和SOP，变成AI可随时调用的风格库和语料库。", body_style))
    
    story.append(Paragraph("知识资产分类", heading2_style))
    
    knowledge_data = [
        ['分类', '内容', '价值'],
        ['品牌资产', '阿猫/鱼堂主文章全集、品牌调性指南', '内容创作、风格延续'],
        ['运营SOP', '社群/训练营/活动策划SOP', '流程标准化'],
        ['内容模板', '公众号/知识星球/朋友圈模板', '效率提升'],
        ['培训资料', '新人培训、岗位技能培训', '培训加速'],
        ['历史案例', '成功/失败案例、用户反馈', '经验传承']
    ]
    
    knowledge_table = Table(knowledge_data, colWidths=[3*cm, 5*cm, 5*cm])
    knowledge_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#dd6b20')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#feebc8')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#fffaf0')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(knowledge_table)
    
    story.append(Paragraph("技术方案推荐", heading2_style))
    
    tech_items = [
        "• <b>方案A（推荐）</b>：NotebookLM + 飞书知识库 - 零技术门槛，快速部署",
        "• <b>方案B（进阶）</b>：Coze智能体 + 飞书多维表格 - 自定义能力强",
        "• <b>方案C（最简单）</b>：Claude/Gemini Projects - 原生支持，无需技术"
    ]
    for item in tech_items:
        story.append(Paragraph(item, list_style))
    
    story.append(Paragraph("预期成果", heading2_style))
    story.append(Paragraph(
        "• 2400+篇文章知识库<br/>"
        "• 新人查询知识时间：30分钟 → 2分钟<br/>"
        "• 内容生成效率提升50%，风格一致性100%",
        body_style
    ))
    
    # ========== 五、方案三 ==========
    story.append(PageBreak())
    story.append(Paragraph("五、方案三：构建岗位AI工作流", heading1_style))
    
    story.append(Paragraph("核心目标", heading2_style))
    story.append(Paragraph("把AI从'帮我写一句话'，升级到'嵌进整个运营/编辑/客服的闭环工作流'。", body_style))
    
    story.append(Paragraph("运营岗位工作流升级", heading2_style))
    
    workflow_data = [
        ['步骤', '当前流程', '升级后流程'],
        ['Step 1', '接收任务', 'AI自动匹配Prompt模板库'],
        ['Step 2', '手动思考', 'AI生成初稿（调用知识库风格）'],
        ['Step 3', 'AI生成单点内容', '人工审核+AI优化建议'],
        ['Step 4', '手动修改', 'AI自动记录发布数据'],
        ['Step 5', '发布', 'AI采集反馈+生成效果报告'],
        ['Step 6', '无沉淀', 'AI提取经验+更新Prompt库']
    ]
    
    workflow_table = Table(workflow_data, colWidths=[2.5*cm, 4.5*cm, 6*cm])
    workflow_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#805ad5')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e9d8fd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#faf5ff')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(workflow_table)
    
    story.append(Paragraph("预期成果", heading2_style))
    story.append(Paragraph(
        "• 运营工作效率提升60%<br/>"
        "• 编辑内容产出提升40%<br/>"
        "• 客服响应速度提升70%",
        body_style
    ))
    
    # ========== 六、方案四 ==========
    story.append(PageBreak())
    story.append(Paragraph("六、方案四：数据分析辅助", heading1_style))
    
    story.append(Paragraph("核心目标", heading2_style))
    story.append(Paragraph("让AI不仅做执行，还能帮我们做数据异常分析、项目复盘以及任务优先级判断。", body_style))
    
    story.append(Paragraph("AI数据分析能力清单", heading2_style))
    
    analysis_data = [
        ['能力', '描述', '应用场景'],
        ['异常检测', '自动发现数据异常点', '日活突降、转化率异常'],
        ['趋势分析', '识别数据变化趋势', '用户增长、内容表现'],
        ['对比分析', '多维度数据对比', '活动效果、渠道质量'],
        ['归因分析', '找到变化根本原因', '为什么涨、为什么跌'],
        ['预测分析', '基于历史预测未来', '用户增长、收入预测'],
        ['决策建议', '基于数据给建议', '下一步做什么']
    ]
    
    analysis_table = Table(analysis_data, colWidths=[3*cm, 5*cm, 5*cm])
    analysis_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#3182ce')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#bee3f8')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#ebf8ff')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(analysis_table)
    
    story.append(Paragraph("预期成果", heading2_style))
    story.append(Paragraph(
        "• 20+关键指标的数据看板<br/>"
        "• 数据异常发现时间：7天 → 1天<br/>"
        "• 决策效率提升50%",
        body_style
    ))
    
    # ========== 七、实施路线图 ==========
    story.append(PageBreak())
    story.append(Paragraph("七、实施路线图", heading1_style))
    
    story.append(Paragraph("Phase 1：基础建设（第1-2周）", heading2_style))
    phase1_items = [
        "• 经验收集机制搭建 - Prompt收集表",
        "• 知识资产盘点 - 知识分类清单",
        "• 数据指标梳理 - 指标体系文档",
        "• Prompt模板设计 - 标准模板库"
    ]
    for item in phase1_items:
        story.append(Paragraph(item, list_style))
    
    story.append(Paragraph("Phase 2：系统搭建（第3-4周）", heading2_style))
    phase2_items = [
        "• Prompt库上线 - 50+标准Prompt",
        "• 知识库部署 - 可用知识库",
        "• 岗位工作流设计 - 工作流文档",
        "• 智能体上线测试 - 测试报告"
    ]
    for item in phase2_items:
        story.append(Paragraph(item, list_style))
    
    story.append(Paragraph("Phase 3：全员推广（第5-8周）", heading2_style))
    phase3_items = [
        "• 全员培训 - 培训覆盖率100%",
        "• 工作流试运行 - 试运行报告",
        "• 效果评估 - 效果报告",
        "• 优化迭代 - 优化方案"
    ]
    for item in phase3_items:
        story.append(Paragraph(item, list_style))
    
    # ========== 八、成本与ROI ==========
    story.append(Paragraph("八、成本与ROI", heading1_style))
    
    story.append(Paragraph("投入成本", heading2_style))
    
    cost_data = [
        ['项目', '成本', '说明'],
        ['工具订阅费', '¥2,000/月', 'Claude/Gemini/Coze'],
        ['飞书高级版', '¥1,000/月', '多维表格+自动化'],
        ['培训成本', '¥5,000', '一次性'],
        ['合计', '¥3,000/月', '持续投入']
    ]
    
    cost_table = Table(cost_data, colWidths=[4*cm, 3*cm, 6*cm])
    cost_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#718096')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e2e8f0')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f7fafc')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(cost_table)
    
    story.append(Paragraph("预期收益", heading2_style))
    
    benefit_data = [
        ['收益项', '量化指标', '年度价值'],
        ['效率提升', '节省1.5人工作量', '¥180,000'],
        ['新人培训缩短', '从15天降至6天', '¥30,000'],
        ['内容产出增加', '提升40%', '¥50,000'],
        ['决策效率提升', '提升50%', '¥40,000'],
        ['年度总收益', '-', '¥300,000']
    ]
    
    benefit_table = Table(benefit_data, colWidths=[4*cm, 4*cm, 5*cm])
    benefit_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#38a169')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#c6f6d5')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#f0fff4')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(benefit_table)
    
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph(
        "<b>ROI = (300,000 - 36,000) / 36,000 = 733%</b>",
        info_style
    ))
    
    # ========== 九、风险与对策 ==========
    story.append(PageBreak())
    story.append(Paragraph("九、风险与对策", heading1_style))
    
    risk_data = [
        ['风险', '影响', '对策'],
        ['团队抗拒使用', '高', '从简单场景切入，快速见效'],
        ['AI回答不准', '中', '建立人工审核机制'],
        ['数据安全问题', '高', '敏感数据不上传AI'],
        ['Prompt质量低', '中', '建立评审制度，持续优化'],
        ['依赖AI过度', '中', '保持人工判断能力']
    ]
    
    risk_table = Table(risk_data, colWidths=[4*cm, 2*cm, 7*cm])
    risk_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e53e3e')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#fed7d7')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#fff5f5')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(risk_table)
    
    # 页脚
    story.append(Spacer(1, 2*cm))
    footer_style = ParagraphStyle(
        'Footer',
        fontName=chinese_font,
        fontSize=9,
        textColor=colors.HexColor('#718096'),
        alignment=TA_CENTER
    )
    story.append(Paragraph("—— 方案结束 ——", footer_style))
    story.append(Paragraph(f"生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", footer_style))
    story.append(Paragraph("制定：幂档 (mi-dang) | Sheldon帝国", footer_style))
    
    # 构建PDF
    print(f"📄 正在生成PDF...")
    doc.build(story)
    print(f"✅ PDF已生成: {output_path}")
    
    return output_path

if __name__ == "__main__":
    output = create_solution_pdf()
    print(f"\n🎉 完成！PDF文件: {output}")