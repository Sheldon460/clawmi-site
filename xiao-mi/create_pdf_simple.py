#!/usr/bin/env python3
"""
Create PDF from PPT slides using reportlab.
"""

from reportlab.lib.pagesizes import A4, landscape
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import os
import sys

# Configuration
IMAGES_DIR = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/xiao-mi/ppt_images"
OUTPUT_PDF = "/Volumes/My house/Users/Sheldon/.openclaw/workspace/xiao-mi/OpenClaw_PPT_完整版.pdf"

# Slide content
SLIDES = [
    {
        "title": "OpenClaw 云端部署与培养指南",
        "subtitle": "从零到一构建企业级 AI 助手平台",
        "image": "slide-01.png",
    },
    {
        "title": "目录",
        "content": [
            "1. OpenClaw 简介与核心价值",
            "2. 部署准备与环境要求",
            "3. 三种部署方式详解",
            "4. 配置与初始化指南",
            "5. 技能培养与进阶使用",
            "6. 常见问题与最佳实践",
            "7. 企业级部署方案",
        ],
        "image": "slide-02.png",
    },
    {
        "title": "OpenClaw 简介与核心价值",
        "content": [
            "什么是 OpenClaw？",
            "- 开源的企业级 AI 助手框架",
            "- 支持多模型、多平台、多 Agent",
            "- 完整的技能生态系统",
            "",
            "核心价值：",
            "✅ 灵活部署：本地、Docker、云服务器",
            "✅ 模型自由：Kimi、OpenAI、Claude 等",
            "✅ 技能扩展：200+ 内置技能",
            "✅ 企业级：权限管理、审计日志",
        ],
        "image": "slide-03.png",
    },
    {
        "title": "部署准备：环境要求",
        "content": [
            "系统支持：",
            "✅ macOS 12+ (Apple Silicon/Intel)",
            "✅ Windows 10/11 + WSL2",
            "✅ Linux (Ubuntu 20.04+, CentOS)",
            "",
            "软件依赖：",
            "- Node.js 18+ (自动安装)",
            "- Docker 20+ (可选)",
            "- Git 2.+",
            "",
            "网络要求：",
            "- 能够访问 OpenAI API",
            "- 能够访问 npm 仓库",
            "- 推荐使用国内镜像加速",
        ],
        "image": "slide-04.png",
    },
    {
        "title": "部署方式 1：本地一键安装",
        "content": [
            "安装命令（推荐）：",
            "```bash",
            "# macOS/Linux",
            "curl -fsSL https://get.openclaw.ai | sh",
            "",
            "# Windows PowerShell",
            "irm https://get.openclaw.ai | iex",
            "```",
            "",
            "安装后初始化：",
            "```bash",
            "openclaw init",
            "openclaw start",
            "```",
            "",
            "适用场景：",
            "- 个人开发环境",
            "- 快速体验和测试",
            "- 原型验证",
        ],
        "image": "slide-05.png",
    },
    {
        "title": "部署方式 2：Docker 容器化部署",
        "content": [
            "Docker Compose 配置：",
            "```yaml",
            "services:",
            "  openclaw:",
            "    image: openclaw/openclaw:latest",
            "    ports:",
            "      - \"3000:3000\"",
            "    volumes:",
            "      - ./config:/app/config",
            "      - ./workspace:/app/workspace",
            "    environment:",
            "      - OPENAI_API_KEY=***",
            "```",
            "",
            "启动命令：",
            "```bash",
            "docker-compose up -d",
            "```",
            "",
            "优势：",
            "- 环境隔离，一键迁移",
            "- 资源控制，安全稳定",
        ],
        "image": "slide-06.png",
    },
    {
        "title": "部署方式 3：云服务器部署",
        "content": [
            "推荐平台：",
            "- 阿里云 ECS (2核4G起步)",
            "- 腾讯云 CVM",
            "- AWS EC2",
            "- 自建 VPS",
            "",
            "部署流程：",
            "1. 购买云服务器（推荐 Docker 镜像）",
            "2. 配置安全组（开放 3000 端口）",
            "3. 安装 Docker",
            "4. 使用 Docker Compose 部署",
            "5. 配置域名和 SSL 证书",
            "",
            "企业级部署：",
            "- 负载均衡：Nginx/Caddy",
            "- 高可用：多节点 + Redis",
            "- 监控告警：Prometheus + Grafana",
        ],
        "image": "slide-07.png",
    },
    {
        "title": "配置与初始化指南",
        "content": [
            "核心配置文件：",
            "- ~/.openclaw/config/config.yaml - 主配置",
            "- ~/.openclaw/.env - 环境变量",
            "- ~/.openclaw/workspace/ - 工作空间",
            "",
            "必填配置：",
            "```yaml",
            "models:",
            "  primary: \"openai/gpt-4\"",
            "  fallback: \"kimi/moonshot-v1-8k\"",
            "",
            "channels:",
            "  - type: \"feishu",
            "    enabled: true",
            "```",
            "",
            "初始化步骤：",
            "1. 运行 openclaw init 生成配置模板",
            "2. 编辑配置文件，添加 API 密钥",
            "3. 运行 openclaw start 启动服务",
            "4. 访问 http://localhost:3000",
        ],
        "image": "slide-08.png",
    },
    {
        "title": "技能培养与进阶使用",
        "content": [
            "基础技能（开箱即用）：",
            "- feishu-*：飞书生态集成",
            "- coding-agent：代码生成与重构",
            "- web-search：智能搜索",
            "- feishu-doc：文档处理",
            "",
            "进阶技能（需配置）：",
            "- obsidian：知识库同步",
            "- github：代码仓库管理",
            "- automation-workflows：自动化流程",
            "",
            "自定义技能：",
            "```bash",
            "# 创建新技能",
            "openclaw skill create my-skill",
            "",
            "# 编辑技能配置",
            "openclaw skill edit my-skill",
            "```",
            "",
            "学习路径：",
            "Level 1: 基础使用 → Level 2: 技能组合 → Level 3: 自定义开发",
        ],
        "image": "slide-09.png",
    },
    {
        "title": "常见问题与故障排查",
        "content": [
            "问题 1：安装失败",
            "- 检查网络连接",
            "- 使用国内镜像源",
            "- 检查系统权限",
            "",
            "问题 2：模型调用超时",
            "- 检查 API 密钥有效性",
            "- 配置代理或镜像",
            "- 切换备用模型",
            "",
            "问题 3：Docker 部署无响应",
            "- 检查容器日志：docker logs",
            "- 检查端口映射",
            "- 验证环境变量配置",
            "",
            "调试技巧：",
            "```bash",
            "# 查看日志",
            "openclaw logs --tail 100",
            "",
            "# 诊断模式",
            "openclaw doctor",
            "",
            "# 重启服务",
            "openclaw restart",
            "```",
        ],
        "image": "slide-10.png",
    },
    {
        "title": "最佳实践与优化建议",
        "content": [
            "性能优化：",
            "- 启用响应缓存（memory）",
            "- 配置合理的超时时间",
            "- 使用流式响应（stream）",
            "",
            "安全加固：",
            "- 敏感信息使用环境变量",
            "- 启用审计日志（audit）",
            "- 配置 IP 白名单",
            "- 定期更新依赖版本",
            "",
            "监控与维护：",
            "- 定期备份工作空间",
            "- 监控资源使用（CPU/内存）",
            "- 设置告警规则",
            "- 文档化配置变更",
            "",
            "团队协作：",
            "- 使用 Git 管理配置文件",
            "- 建立 Code Review 流程",
            "- 维护技能仓库",
        ],
        "image": "slide-11.png",
    },
    {
        "title": "企业级部署方案",
        "content": [
            "架构设计：",
            "[Gateway] → [Load Balancer] → [Cluster Nodes]",
            "                                    ↓",
            "                              [Redis Cache]",
            "                                    ↓",
            "                             [Database]",
            "",
            "高可用方案：",
            "- 多节点部署（3+ 节点）",
            "- Redis 共享会话",
            "- 消息队列（RabbitMQ）",
            "- 定时任务调度",
            "",
            "权限管理：",
            "- 基于角色的访问控制（RBAC）",
            "- 用户审计日志",
            "- 敏感操作二次确认",
            "",
            "数据安全：",
            "- 加密存储 API 密钥",
            "- 定期轮换凭据",
            "- 网络传输加密（TLS）",
            "- 数据备份策略",
        ],
        "image": "slide-12.png",
    },
    {
        "title": "社区资源与支持",
        "content": [
            "官方资源：",
            "- 📚 文档：docs.openclaw.ai",
            "- 💻 GitHub：github.com/openclaw",
            "- 💬 Discord：discord.gg/clawd",
            "- 🎯 ClawHub：clawhub.ai",
            "",
            "学习资源：",
            "- 视频教程：YouTube B站",
            "- 实战案例：社区博客",
            "- 技能市场：200+ 技能",
            "- 最佳实践：社区 Wiki",
            "",
            "技术支持：",
            "- 问题反馈：GitHub Issues",
            "- 功能建议：Feature Requests",
            "- 商业支持：Enterprise Edition",
            "",
            "参与贡献：",
            "- 贡献代码：PR Welcome",
            "- 分享技能：Skill Hub",
            "- 撰写文档：Docs PR",
            "- 社区活动：Meetup",
        ],
        "image": "slide-13.png",
    },
    {
        "title": "总结与下一步",
        "content": [
            "核心要点：",
            "✅ OpenClaw 支持多种部署方式",
            "✅ Docker 是生产环境首选",
            "✅ 技能生态是核心竞争力",
            "✅ 企业级需要高可用方案",
            "",
            "快速开始：",
            "1. 访问 docs.openclaw.ai 查看文档",
            "2. 下载一键安装脚本",
            "3. 完成 10 分钟快速配置",
            "4. 体验第一个技能",
            "",
            "进阶路径：",
            "1. 掌握基础配置和技能使用",
            "2. 学习自定义技能开发",
            "3. 部署到云服务器",
            "4. 构建企业级高可用架构",
            "",
            "保持更新：",
            "```bash",
            "# 更新到最新版本",
            "openclaw update",
            "",
            "# 查看更新日志",
            "openclaw changelog",
            "```",
        ],
        "image": "slide-14.png",
    },
    {
        "title": "感谢观看",
        "content": [
            "OpenClaw - 企业级 AI 助手框架",
            "",
            "开始你的 AI 自动化之旅",
            "",
            "🚀 官网：openclaw.ai",
            "📖 文档：docs.openclaw.ai",
            "💬 社区：discord.gg/clawclaw",
            "",
            "Q & A",
        ],
        "image": "slide-15.png",
    },
]

def create_pdf():
    """Create PDF from slides."""
    
    # Create PDF with landscape A4 pages
    from reportlab.pdfgen import canvas
    from reportlab.lib.units import inch, mm
    
    c = canvas.Canvas(OUTPUT_PDF, pagesize=landscape(A4))
    
    # Page dimensions
    width, height = landscape(A4)
    
    # Margins
    margin_left = 30 * mm
    margin_right = 30 * mm
    margin_top = 30 * mm
    margin_bottom = 30 * mm
    
    # Draw each slide
    for i, slide in enumerate(SLIDES):
        if i > 0:
            c.showPage()
        
        # Draw image
        image_path = os.path.join(IMAGES_DIR, slide['image'])
        if os.path.exists(image_path):
            c.drawImage(image_path, margin_left, height - margin_bottom - margin_top - 30*mm, 
                      width - margin_left - margin_right, preserveAspectRatio=True)
        else:
            print(f"Warning: Image not found: {image_path}")
        
        # Draw page number
        c.setFont('Helvetica', 10)
        c.setFillColor(colors.grey)
        c.drawString(width - margin_right - 40*mm, 20*mm, f"{i+1}/15")
        
        c.save()
    
    return OUTPUT_PDF

if __name__ == '__main__':
    pdf_path = create_pdf()
    
    # Check file size
    if os.path.exists(pdf_path):
        size = os.path.getsize(pdf_path) / (1024 * 1024)
        print(f"PDF created: {pdf_path}")
        print(f"Size: {size:.2f} MB")
    else:
        print("Error: PDF not created")
        sys.exit(1)
