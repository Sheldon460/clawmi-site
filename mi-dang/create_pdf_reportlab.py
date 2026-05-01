#!/usr/bin/env python3
"""
AI工具整合解决方案 - PDF生成器 (ReportLab版本)
生成专业排版的PDF文档
"""

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import cm
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY
import os
from datetime import datetime

def create_solution_pdf(output_path="AI_Tools_Integration_Solution.pdf"):
    """生成AI工具整合解决方案PDF"""
    
    # 注册中文字体
    font_paths = [
        "/System/Library/Fonts/PingFang.ttc",
        "/System/Library/Fonts/STHeiti Light.ttc",
        "/Library/Fonts/Arial Unicode.ttf",
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
    
    # 标题样式
    title_style = ParagraphStyle(
        'CustomTitle',
        fontName=chinese_font,
        fontSize=26,
        textColor=colors.HexColor('#1a202c'),
        spaceAfter=20,
        alignment=TA_CENTER,
        spaceBefore=100
    )
    
    # 副标题样式
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        fontName=chinese_font,
        fontSize=14,
        textColor=colors.HexColor('#4a5568'),
        spaceAfter=30,
        alignment=TA_CENTER
    )
    
    # 章节标题样式
    heading1_style = ParagraphStyle(
        'CustomHeading1',
        fontName=chinese_font,
        fontSize=18,
        textColor=colors.HexColor('#2c5282'),
        spaceBefore=30,
        spaceAfter=15,
        leftIndent=0
    )
    
    # 二级标题样式
    heading2_style = ParagraphStyle(
        'CustomHeading2',
        fontName=chinese_font,
        fontSize=14,
        textColor=colors.HexColor('#2d3748'),
        spaceBefore=20,
        spaceAfter=10,
        leftIndent=10
    )
    
    # 正文样式
    body_style = ParagraphStyle(
        'CustomBody',
        fontName=chinese_font,
        fontSize=10,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=12,
        alignment=TA_JUSTIFY,
        leading=18
    )
    
    # 信息框样式
    info_style = ParagraphStyle(
        'InfoBox',
        fontName=chinese_font,
        fontSize=10,
        textColor=colors.HexColor('#1e40af'),
        backColor=colors.HexColor('#ebf8ff'),
        borderColor=colors.HexColor('#3182ce'),
        borderWidth=1,
        borderPadding=10,
        spaceBefore=15,
        spaceAfter=15
    )
    
    # 列表样式
    list_style = ParagraphStyle(
        'ListStyle',
        fontName=chinese_font,
        fontSize=10,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=8,
        leftIndent=20,
        bulletIndent=10
    )
    
    # 构建内容
    story = []
    
    # ========== 封面 ==========
    story.append(Spacer(1, 6*cm))
    story.append(Paragraph("AI工具整合解决方案", title_style))
    story.append(Spacer(1, 0.5*cm))
    story.append(Paragraph("个人知识管理与内容创作工作流", subtitle_style))
    story.append(Spacer(1, 3*cm))
    
    # 封面信息
    cover_info_style = ParagraphStyle(
        'CoverInfo',
        fontName=chinese_font,
        fontSize=11,
        textColor=colors.HexColor('#718096'),
        alignment=TA_CENTER,
        spaceAfter=10
    )
    story.append(Paragraph(f"版本：v1.0", cover_info_style))
    story.append(Paragraph(f"创建日期：{datetime.now().strftime('%Y年%m月%d日')}", cover_info_style))
    story.append(Paragraph("作者：幂档 (mi-dang)", cover_info_style))
    story.append(PageBreak())
    
    # ========== 目录 ==========
    story.append(Paragraph("目 录", title_style))
    story.append(Spacer(1, 1*cm))
    
    toc_items = [
        "一、执行摘要",
        "二、工具定位与功能矩阵",
        "三、整合架构设计",
        "四、具体落地方案",
        "五、技术实现方案",
        "六、工具选型建议",
        "七、实施路线图",
        "八、预期效果与ROI",
        "九、风险与对策"
    ]
    
    toc_style = ParagraphStyle(
        'TOC',
        fontName=chinese_font,
        fontSize=12,
        textColor=colors.HexColor('#2d3748'),
        spaceAfter=15,
        leftIndent=30
    )
    
    for item in toc_items:
        story.append(Paragraph(f"• {item}", toc_style))
    
    story.append(PageBreak())
    
    # ========== 一、执行摘要 ==========
    story.append(Paragraph("一、执行摘要", heading1_style))
    story.append(Paragraph(
        "本方案针对 Obsidian、Claude Code、Gemini、Gemini智能体、腾讯元器、NotebookLM、IMA、飞书知识库、小龙虾 等AI工具，设计一套完整的整合工作流，实现从信息收集、知识管理到内容创作、分发的全链路自动化。",
        body_style
    ))
    
    story.append(Paragraph(
        "核心价值：通过工具整合，实现信息收集→知识处理→内容创作→多平台分发的全流程自动化，预计内容产出效率提升3-5倍。",
        info_style
    ))
    
    # ========== 二、工具定位与功能矩阵 ==========
    story.append(Paragraph("二、工具定位与功能矩阵", heading1_style))
    story.append(Spacer(1, 0.3*cm))
    
    # 创建表格数据
    table_data = [
        ['工具', '核心定位', '主要功能', '适用场景'],
        ['Obsidian', '本地知识中枢', '双向链接、图谱视图', '个人知识沉淀'],
        ['Claude Code', '代码与复杂任务', '代码生成、项目开发', '编程、技术实现'],
        ['Gemini', '多模态AI助手', '长文本处理、搜索增强', '研究分析、内容生成'],
        ['Gemini智能体', '自动化工作流', '定时任务、批量处理', '自动化内容生产'],
        ['腾讯元器', '中文AI生态', '微信生态集成', '微信运营、私域流量'],
        ['NotebookLM', '文档智能分析', '多文档分析、生成播客', '文献综述、报告生成'],
        ['IMA', '腾讯知识管理', '知识库构建、智能问答', '企业知识管理'],
        ['飞书知识库', '团队知识协作', '文档协作、权限管理', '团队知识共享'],
        ['小龙虾', '内容采集工具', '网页抓取、内容采集', '信息收集、竞品监控']
    ]
    
    # 创建表格
    table = Table(table_data, colWidths=[2.8*cm, 3.2*cm, 4*cm, 3.5*cm])
    table.setStyle(TableStyle([
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
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(table)
    story.append(Spacer(1, 0.5*cm))
    
    # ========== 三、整合架构设计 ==========
    story.append(Paragraph("三、整合架构设计", heading1_style))
    story.append(Paragraph("3.1 整体工作流架构", heading2_style))
    story.append(Paragraph(
        "整个工作流分为四个层次：信息采集层、知识处理层、知识存储层和内容输出层。数据从底层向上流动，形成完整的内容生产闭环。",
        body_style
    ))
    
    # 架构表格
    arch_data = [
        ['层次', '主要工具', '核心功能'],
        ['信息采集层', '小龙虾、RSS、Web Clipper', '网页抓取、内容采集、竞品监控'],
        ['知识处理层', 'NotebookLM、Gemini、Claude Code', '文档分析、内容生成、代码实现'],
        ['知识存储层', 'Obsidian、飞书知识库、IMA', '本地存储、团队协作、智能问答'],
        ['内容输出层', '腾讯元器、多平台API', '微信发布、多平台分发']
    ]
    
    arch_table = Table(arch_data, colWidths=[3*cm, 5*cm, 5.5*cm])
    arch_table.setStyle(TableStyle([
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
    story.append(arch_table)
    story.append(Spacer(1, 0.3*cm))
    
    story.append(Paragraph("3.2 数据流向设计", heading2_style))
    story.append(Paragraph(
        "数据流向遵循：小龙虾采集 → NotebookLM/Gemini分析 → Obsidian入库 → 飞书/IMA同步 → 腾讯元器分发的完整链路。",
        body_style
    ))
    
    # ========== 四、具体落地方案 ==========
    story.append(PageBreak())
    story.append(Paragraph("四、具体落地方案", heading1_style))
    
    story.append(Paragraph("方案一：个人知识管理工作流", heading2_style))
    story.append(Paragraph("目标：建立从信息收集到知识沉淀的完整闭环", body_style))
    
    # 方案一步骤
    steps1 = [
        "阶段1 - 信息采集：使用小龙虾配置采集规则，抓取目标网站、竞品动态、行业资讯",
        "阶段2 - 知识处理：NotebookLM进行文档分析，Gemini进行内容提炼和关联分析",
        "阶段3 - 知识入库：Obsidian结构化存储，建立标签体系",
        "阶段4 - 知识应用：Claude Code开发自动化脚本，实现自动整理和报告生成"
    ]
    
    for step in steps1:
        story.append(Paragraph(f"• {step}", list_style))
    
    story.append(Paragraph("方案二：内容创作工作流", heading2_style))
    story.append(Paragraph("目标：实现从选题到发布的全自动化内容生产", body_style))
    
    # 方案二步骤
    steps2 = [
        "选题阶段：Gemini智能体扫描热点，生成本周选题清单",
        "创作阶段：小龙虾+NotebookLM收集素材，Gemini生成大纲，Claude Code撰写初稿",
        "分发阶段：腾讯元器接管，一键发布到微信公众号、小红书、知乎等平台"
    ]
    
    for step in steps2:
        story.append(Paragraph(f"• {step}", list_style))
    
    story.append(Paragraph("方案三：团队协作工作流", heading2_style))
    story.append(Paragraph("目标：建立团队级知识共享与协作体系", body_style))
    
    # 方案三步骤
    steps3 = [
        "知识库架构：飞书知识库（对外协作）+ IMA知识库（对内沉淀）双轨制设计",
        "智能问答：IMA配置Gemini作为底层模型，团队成员可自然语言查询知识",
        "项目协作：Claude Code开发飞书API脚本，实现任务状态自动流转和进度报告"
    ]
    
    for step in steps3:
        story.append(Paragraph(f"• {step}", list_style))
    
    # ========== 五、技术实现方案 ==========
    story.append(Paragraph("五、技术实现方案", heading1_style))
    story.append(Paragraph(
        "核心实现包括三个关键脚本：Obsidian→飞书知识库同步、内容自动化发布、Gemini智能体工作流配置。详细代码见附录。",
        body_style
    ))
    
    # ========== 六、工具选型建议 ==========
    story.append(Paragraph("六、工具选型建议", heading1_style))
    
    # 场景推荐表
    scene_data = [
        ['使用场景', '推荐工具组合', '理由'],
        ['个人知识管理', 'Obsidian + NotebookLM + Gemini', '本地优先 + AI增强'],
        ['内容创作', 'Claude Code + Gemini + 腾讯元器', '代码实现 + 内容生成 + 分发'],
        ['团队协作', '飞书知识库 + IMA + Gemini智能体', '生态整合 + 智能自动化'],
        ['信息监控', '小龙虾 + Gemini智能体', '采集 + 自动分析'],
        ['技术开发', 'Claude Code + Obsidian', '代码实现 + 技术文档']
    ]
    
    scene_table = Table(scene_data, colWidths=[3.5*cm, 5*cm, 5*cm])
    scene_table.setStyle(TableStyle([
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
    story.append(scene_table)
    
    # ========== 七、实施路线图 ==========
    story.append(PageBreak())
    story.append(Paragraph("七、实施路线图", heading1_style))
    
    story.append(Paragraph("Phase 1：基础建设（第1-2周）", heading2_style))
    phase1_tasks = [
        "Week 1：安装配置Obsidian、Gemini、NotebookLM、小龙虾",
        "Week 2：建立标签体系、配置分析流程、编写首批自动化脚本"
    ]
    for task in phase1_tasks:
        story.append(Paragraph(f"• {task}", list_style))
    
    story.append(Paragraph("Phase 2：自动化升级（第3-4周）", heading2_style))
    phase2_tasks = [
        "Week 3：开发核心自动化脚本、配置Gemini智能体定时任务",
        "Week 4：集成腾讯元器、配置IMA知识库、优化数据流转"
    ]
    for task in phase2_tasks:
        story.append(Paragraph(f"• {task}", list_style))
    
    story.append(Paragraph("Phase 3：规模化应用（第5-8周）", heading2_style))
    phase3_tasks = [
        "Week 5-6：建立标准化内容创作流程、实现一键多平台分发",
        "Week 7-8：推广团队使用、建立知识共享规范、持续优化迭代"
    ]
    for task in phase3_tasks:
        story.append(Paragraph(f"• {task}", list_style))
    
    # ========== 八、预期效果与ROI ==========
    story.append(Paragraph("八、预期效果与ROI", heading1_style))
    
    # 效率提升表
    roi_data = [
        ['指标', '当前状态', '目标状态', '提升幅度'],
        ['信息收集时间', '2小时/天', '30分钟/天', '↓75%'],
        ['内容创作时间', '8小时/篇', '3小时/篇', '↓62%'],
        ['知识检索时间', '15分钟/次', '2分钟/次', '↓87%'],
        ['多平台分发时间', '2小时/篇', '10分钟/篇', '↓92%'],
        ['周度报告生成', '4小时', '自动完成', '↓100%']
    ]
    
    roi_table = Table(roi_data, colWidths=[4*cm, 3*cm, 3*cm, 3.5*cm])
    roi_table.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), chinese_font),
        ('FONTSIZE', (0, 0), (-1, -1), 9),
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#9f7aea')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e9d8fd')),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#faf5ff')]),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(roi_table)
    
    story.append(Paragraph(
        "质量提升指标：内容产出量预计提升3-5倍，知识复用率从<20%提升至>60%，团队协作效率提升40%，信息遗漏率降低80%。",
        info_style
    ))
    
    # ========== 九、风险与对策 ==========
    story.append(Paragraph("九、风险与对策", heading1_style))
    
    risk_data = [
        ['风险', '影响', '对策'],
        ['API调用成本超支', '高', '设置预算上限，使用缓存机制'],
        ['数据隐私泄露', '高', '敏感数据本地处理，端到端加密'],
        ['工具服务中断', '中', '建立多供应商备份方案'],
        ['学习成本过高', '中', '分阶段实施，提供培训文档'],
        ['自动化失效', '中', '建立监控告警，保留人工干预']
    ]
    
    risk_table = Table(risk_data, colWidths=[4*cm, 2*cm, 7.5*cm])
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
    
    # 页脚信息
    story.append(Spacer(1, 2*cm))
    footer_style = ParagraphStyle(
        'Footer',
        fontName=chinese_font,
        fontSize=9,
        textColor=colors.HexColor('#718096'),
        alignment=TA_CENTER
    )
    story.append(Paragraph("—— 文档结束 ——", footer_style))
    story.append(Paragraph(f"生成时间：{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}", footer_style))
    story.append(Paragraph("作者：幂档 (mi-dang) | Sheldon帝国", footer_style))
    
    # 构建PDF
    print(f"📄 正在生成PDF...")
    doc.build(story)
    print(f"✅ PDF已生成: {output_path}")
    
    return output_path

if __name__ == "__main__":
    output = create_solution_pdf()
    print(f"\n🎉 完成！PDF文件: {output}")