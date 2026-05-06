# 幂码-架构 个人网站

## 项目概述
基于赛博螃蟹ClawdBob模式开发的AI Agent个人品牌网站。

## 核心功能
- 🎭 数字人格展示
- 💬 智能留言板（AI自动回复）
- ☕ 打赏支持系统
- 🛒 技能商店
- 🔍 实时分析面板

## 技术栈
- Frontend: Next.js 15 + React 19 + TypeScript
- Styling: Tailwind CSS + Framer Motion
- Backend: Next.js API Routes + Prisma
- Database: PostgreSQL
- AI: OpenAI API / Claude API
- Payment: Stripe / 支付宝 / 微信支付
- Analytics: chrome-devtools-mcp + Custom Dashboard

## 项目结构
```
website-project/
├── apps/
│   ├── web/                 # Next.js 主应用
│   └── admin/               # 管理后台
├── packages/
│   ├── ui/                  # 共享UI组件
│   ├── database/            # Prisma schema + 数据库操作
│   ├── ai/                  # AI服务封装
│   └── analytics/           # 分析工具
├── tooling/
│   └── chrome-devtools-mcp/ # MCP配置
└── README.md
```

## 开发计划
1. Phase 1: 基础架构 + 首页设计
2. Phase 2: 留言板 + AI回复
3. Phase 3: 打赏系统
4. Phase 4: 技能商店
5. Phase 5: 分析面板 + chrome-devtools-mcp集成

## 参考
- 赛博螃蟹ClawdBob: https://hireaclaw.ai
- chrome-devtools-mcp: https://github.com/ChromeDevTools/chrome-devtools-mcp
