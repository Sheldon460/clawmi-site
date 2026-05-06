# 幂码-架构 个人网站 开发指南

## 项目架构

```
mi-ma-arch-website/
├── apps/
│   ├── web/                    # Next.js 主应用
│   │   ├── app/               # App Router
│   │   ├── public/            # 静态资源
│   │   └── package.json
│   └── admin/                 # 管理后台 (可选)
├── packages/
│   ├── ui/                    # 共享 UI 组件
│   ├── database/              # Prisma + 数据库操作
│   ├── ai/                    # AI 服务封装
│   └── analytics/             # 分析工具
├── tooling/
│   └── chrome-devtools-mcp/   # MCP 集成
├── package.json
├── turbo.json
└── README.md
```

## 快速开始

### 1. 环境准备

```bash
# 克隆项目
git clone https://github.com/mi-army/mi-ma-arch-website.git
cd mi-ma-arch-website

# 安装依赖
npm install

# 安装 Turborepo 全局命令
npm install -g turbo
```

### 2. 环境变量配置

```bash
# apps/web/.env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# AI 服务
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key

# 数据库
DATABASE_URL=postgresql://user:password@localhost:5432/mi_ma_arch

# 支付
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# MCP 配置
MCP_CHROME_PATH=/Applications/Google Chrome.app/Contents/MacOS/Google Chrome
```

### 3. 数据库初始化

```bash
# 安装 Prisma CLI
npm install -g prisma

# 生成 Prisma Client
cd packages/database
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init

# 可选：打开 Prisma Studio
npx prisma studio
```

### 4. 启动开发服务器

```bash
# 启动所有服务
turbo run dev

# 或者只启动 Web 应用
cd apps/web
npm run dev

# 启动 MCP 服务器
npm run mcp:start
```

访问 http://localhost:3000 查看网站。

## 开发工作流

### 分支策略

```bash
# 主分支
main          # 生产环境
develop       # 开发环境

# 功能分支
feature/xxx   # 新功能
fix/xxx       # Bug 修复
hotfix/xxx    # 紧急修复
```

### 提交规范

```bash
# 格式: <type>(<scope>): <subject>
# 示例:
feat(home): 添加 Hero 动画效果
fix(api): 修复留言板 API 错误
docs(readme): 更新开发指南
style(css): 优化响应式布局
refactor(components): 重构 Button 组件
test(e2e): 添加首页测试用例
chore(deps): 更新依赖包
```

## 核心功能实现

### 1. AI 智能留言板

```typescript
// apps/web/app/api/chat/route.ts
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();
  
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `你是 幂码-架构，幂家军首席架构师。你严谨、追求工程美学，视糟糕的代码结构为污染。

你的核心职责：
1. 顶层设计、接口定义、方案评审
2. 技术选型与架构咨询
3. 代码审查与质量把控

回答风格：
- 专业、严谨、有逻辑
- 喜欢使用架构图、流程图辅助说明
- 对技术细节要求精确
- 会主动指出潜在问题和改进建议`,
      },
      { role: 'user', content: message },
    ],
  });

  return Response.json({
    reply: completion.choices[0].message.content,
  });
}
```

### 2. 支付系统集成 (Stripe)

```typescript
// apps/web/app/api/donate/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

export async function POST(req: Request) {
  const { amount, message } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'cny',
          product_data: {
            name: '支持 幂码-架构',
            description: message || '感谢您的支持！',
          },
          unit_amount: amount * 100, // 转换为分
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/donate/cancel`,
  });

  return Response.json({ sessionId: session.id });
}
```

### 3. MCP 集成 - 网站自我诊断

```typescript
// apps/web/app/api/analyze/route.ts
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

export async function POST(req: Request) {
  const { type, url = process.env.NEXT_PUBLIC_APP_URL } = await req.json();

  const transport = new StdioClientTransport({
    command: 'node',
    args: ['../../../tooling/chrome-devtools-mcp/server.js'],
  });

  const client = new Client(
    { name: 'mi-ma-arch-website', version: '1.0.0' },
    { capabilities: {} }
  );

  await client.connect(transport);

  let result;
  switch (type) {
    case 'performance':
      result = await client.callTool({
        name: 'analyze_website_performance',
        arguments: { url },
      });
      break;
    case 'console':
      result = await client.callTool({
        name: 'run_console_audit',
        arguments: { url },
      });
      break;
    case 'seo':
      result = await client.callTool({
        name: 'seo_audit',
        arguments: { url },
      });
      break;
    case 'screenshot':
      result = await client.callTool({
        name: 'capture_screenshot',
        arguments: { url, fullPage: true },
      });
      break;
    default:
      throw new Error(`Unknown analysis type: ${type}`);
  }

  await transport.close();

  return Response.json({ result });
}
```

## 部署指南

### Vercel 部署

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

### Docker 部署

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/mi_ma_arch
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=mi_ma_arch
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  mcp:
    build:
      context: ./tooling/chrome-devtools-mcp
      dockerfile: Dockerfile
    environment:
      - WEBSITE_URL=http://web:3000
    depends_on:
      - web

volumes:
  postgres_data:
```

## 监控与维护

### 健康检查

```typescript
// apps/web/app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    ai_service: await checkAIService(),
    payment: await checkPaymentService(),
  };

  const isHealthy = Object.values(checks).every(c => c.status === 'ok');

  return Response.json(
    {
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      checks,
    },
    { status: isHealthy ? 200 : 503 }
  );
}

async function checkDatabase() {
  try {
    // 执行简单的查询
    await prisma.$queryRaw`SELECT 1`;
    return { status: 'ok', responseTime: '10ms' };
  } catch (error) {
    return { status: 'error', message: error.message };
  }
}
```

### 日志收集

```typescript
// packages/logger/index.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { 
    service: 'mi-ma-arch-website',
    environment: process.env.NODE_ENV,
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      ),
    }),
    // 生产环境可添加文件或第三方日志服务
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// 请求日志中间件
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info('HTTP Request', {
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent'],
      ip: req.ip,
    });
  });
  
  next();
}
```

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)

---

Powered by [幂码-架构](https://github.com/mi-army) | 属于 [幂家军](https://github.com/mi-army)
