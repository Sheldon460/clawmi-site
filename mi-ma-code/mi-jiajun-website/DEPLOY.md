# 幂家军网站 - 部署指南

## 项目概述

- **项目名称**: 幂家军官方网站
- **技术栈**: Next.js 14 + React + TypeScript + Tailwind CSS + Framer Motion
- **项目路径**: `/tmp/clawd_bridge/data/mi-army/mi-ma-code/mi-jiajun-website/`

## 快速开始

### 1. 安装依赖

```bash
cd /tmp/clawd_bridge/data/mi-army/mi-ma-code/mi-jiajun-website
npm install
```

### 2. 开发模式

```bash
npm run dev
```

访问 http://localhost:3000

### 3. 构建生产版本

```bash
npm run build
```

构建输出在 `dist/` 目录

## 项目文件结构

```
mi-jiajun-website/
├── app/                      # Next.js App Router
│   ├── globals.css          # 全局样式
│   ├── layout.tsx           # 根布局
│   └── page.tsx             # 首页
├── components/              # React 组件
│   ├── Hero.tsx            # 首屏英雄区
│   ├── Stats.tsx           # 统计数据
│   ├── TeamSection.tsx     # 班组展示
│   ├── AgentGrid.tsx       # 成员网格
│   ├── CTASection.tsx      # CTA区域
│   └── Footer.tsx          # 页脚
├── data/                    # 数据文件
│   └── agents.ts           # Agent和Team数据
├── lib/                     # 工具函数
│   └── utils.ts            # 通用工具
├── types/                   # TypeScript类型
│   └── index.ts            # 类型定义
├── next.config.js          # Next.js配置
├── tailwind.config.ts      # Tailwind配置
├── tsconfig.json           # TypeScript配置
├── package.json            # 依赖管理
└── README.md               # 项目说明
```

## 部署选项

### 1. Vercel (推荐)

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 2. Netlify

```bash
# 安装 Netlify CLI
npm i -g netlify-cli

# 部署
netlify deploy --prod --dir=dist
```

### 3. GitHub Pages

使用 GitHub Actions 自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### 4. 静态托管

将 `dist/` 目录上传到任何静态托管服务：
- AWS S3 + CloudFront
- Cloudflare Pages
- 阿里云 OSS
- 腾讯云 COS

## 自定义配置

### 修改主题颜色

编辑 `tailwind.config.ts`：

```typescript
colors: {
  'mi-primary': '#你的主色',
  'mi-accent': '#你的强调色',
  // ...
}
```

### 修改Agent信息

编辑 `data/agents.ts` 文件，更新 `agents` 数组。

### 修改Team信息

在同一文件的 `teams` 数组中更新班组信息。

## 性能优化

- 图片已配置为自动优化
- 使用 Next.js 静态导出，无需服务器
- 组件懒加载支持
- CSS 使用 Tailwind 的 purge 功能

## 浏览器支持

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

MIT License

---

<p align="center">
  Made with 💜 by <strong>幂家军</strong> for Sheldon传媒
</p>
