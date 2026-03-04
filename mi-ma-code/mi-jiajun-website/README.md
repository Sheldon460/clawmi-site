# 幂家军官方网站

一个现代化的 React 个人/团队网站，展示幂家军 - 28位AI Agent特种部队。

## 🚀 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) - React 框架
- **语言**: [TypeScript](https://www.typescriptlang.org/) - 类型安全
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 实用工具CSS
- **动画**: [Framer Motion](https://www.framer.com/motion/) - 流畅动画
- **图标**: [Lucide React](https://lucide.dev/) - 图标库

## 📁 项目结构

```
mi-jiajun-website/
├── app/                    # Next.js App Router
│   ├── globals.css        # 全局样式
│   ├── layout.tsx         # 根布局
│   └── page.tsx           # 首页
├── components/            # React 组件
│   ├── Hero.tsx          # 首屏英雄区
│   ├── Stats.tsx         # 统计数据
│   ├── TeamSection.tsx   # 班组展示
│   ├── AgentGrid.tsx     # 成员网格
│   ├── CTASection.tsx    # CTA区域
│   └── Footer.tsx        # 页脚
├── data/                  # 数据文件
│   └── agents.ts         # Agent和Team数据
├── lib/                   # 工具函数
│   └── utils.ts          # 通用工具
├── types/                 # TypeScript类型
│   └── index.ts          # 类型定义
├── public/               # 静态资源
├── next.config.js        # Next.js配置
├── tailwind.config.ts    # Tailwind配置
├── tsconfig.json         # TypeScript配置
└── package.json          # 依赖管理
```

## 🎨 设计特点

- **深色科技风**: 采用深色背景配合霓虹蓝紫渐变
- **流畅动画**: 使用 Framer Motion 实现平滑过渡和微交互
- **响应式设计**: 完美适配桌面、平板和移动设备
- **玻璃态效果**: 卡片使用 backdrop-blur 实现磨砂玻璃效果
- **渐变文字**: 标题使用蓝紫粉渐变增强视觉冲击力

## 🚀 部署指南

### 1. 环境要求

- Node.js 18.x 或更高版本
- npm 或 yarn 包管理器

### 2. 安装依赖

```bash
cd mi-jiajun-website
npm install
```

### 3. 开发模式

```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 4. 构建生产版本

```bash
npm run build
```

构建输出在 `dist/` 目录

### 5. 静态部署

本项目配置为静态导出，可以将 `dist/` 目录部署到任何静态托管服务：

- **Vercel**: 直接导入GitHub仓库自动部署
- **Netlify**: 拖拽 `dist` 文件夹或使用Git集成
- **GitHub Pages**: 使用 GitHub Actions 自动部署
- **Cloudflare Pages**: 连接Git仓库自动构建

## 📝 自定义配置

### 修改Agent信息

编辑 `data/agents.ts` 文件，更新 `agents` 数组中的对象：

```typescript
{
  id: 'your-agent-id',
  name: 'Agent名称',
  position: '职位',
  function: '职责描述',
  team: '所属班组',
  color: '#十六进制颜色',
}
```

### 修改Team信息

在同一文件的 `teams` 数组中更新班组信息。

### 修改主题颜色

编辑 `tailwind.config.ts` 文件，在 `theme.extend.colors` 中更新：

```typescript
colors: {
  'mi-primary': '#你的主色',
  'mi-accent': '#你的强调色',
  // ...
}
```

## 📄 许可证

MIT License - 详见 [LICENSE](./LICENSE) 文件

---

<p align="center">
  Made with 💜 by <strong>幂家军</strong> for Sheldon传媒
</p>
