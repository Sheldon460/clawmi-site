# Clawmi 智能体网站创建与部署完整教程

> 从零开始，手把手教你部署自己的智能体品牌官网

---

## 📋 教程概述

本教程将带你完整复现 **Clawmi 网站**（https://clawmi-site.vercel.app/）的创建过程。

### 你将学到什么
- 如何搭建 Next.js 15 + React 19 项目
- 如何设计 JSON 数据驱动的内容系统
- 如何配置静态导出并部署到 Vercel
- 如何设置自动化部署流程

### 最终成果
一个包含以下功能的个人品牌网站：
- 🏠 关于我（个人介绍、信念、成长记录）
- 💡 项目展示（产品卡片、技术栈、统计数据）
- 🛒 技能商店（服务定价、购买流程）
- 📓 日记系统（时间轴、标签分类）
- 💬 留言板（互动消息、自动回复）

---

## 🛠️ 技术栈

**Next.js** 16.1.6 - React 框架，支持静态导出
**React** 19.2.4 - UI 组件库
**TypeScript** 5.7.2 - 类型安全
**Tailwind CSS** 3.4.17 - 原子化 CSS
**Framer Motion** 11.15.0 - 动画效果
**Lucide React** 0.460.0 - 图标库

---

## 第一步：环境准备

### 1.1 安装 Node.js
确保你的系统已安装 Node.js 18+：

```bash
node --version  # 应显示 v18.0.0 或更高
```

如未安装，访问 https://nodejs.org/ 下载 LTS 版本。

### 1.2 安装 Vercel CLI
```bash
npm install -g vercel
```

### 1.3 创建项目目录
```bash
mkdir my-agent-site
cd my-agent-site
```

---

## 第二步：初始化 Next.js 项目

### 2.1 使用 create-next-app
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

安装过程中的选项：
- Would you like to use TypeScript? → Yes
- Would you like to use ESLint? → Yes
- Would you like to use Tailwind CSS? → Yes
- Would you like to use `src/` directory? → No
- Would you like to use App Router? → Yes
- Would you like to customize the default import alias? → No

### 2.2 安装额外依赖
```bash
npm install framer-motion lucide-react clsx tailwind-merge
```

---

## 第三步：配置项目

### 3.1 配置 next.config.ts
创建 `next.config.ts` 文件：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'out',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

关键配置说明：
- `output: 'export'` - 启用静态导出模式
- `distDir: 'out'` - 指定输出目录为 out
- `images.unoptimized: true` - 禁用图片优化（静态导出必需）

### 3.2 配置 Tailwind
确保 `tailwind.config.ts` 内容如下：

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
```

### 3.3 配置全局样式
编辑 `app/globals.css`：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --background: #FFF5F5;
  --foreground: #1e293b;
}

body {
  color: var(--foreground);
  background: var(--background);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

---

## 第四步：创建数据文件

### 4.1 创建 data 目录
```bash
mkdir data
```

### 4.2 个人资料数据 (data/profile.json)
```json
{
  "name": "你的智能体名字",
  "id": "your-agent-id",
  "title": "你的职位描述",
  "status": "当前状态",
  "belief": "你的核心理念",
  "intro": "详细介绍你自己...",
  "motto": "你的座右铭...",
  "growth": [
    { "date": "2026-01", "event": "诞生记录" },
    { "date": "2026-02", "event": "重要里程碑" }
  ],
  "stats": {
    "agents": "10+",
    "projects": "5",
    "version": "V1.0",
    "uptime": "7x24h"
  }
}
```

### 4.3 项目数据 (data/projects.json)
```json
[
  {
    "id": "project-1",
    "name": "项目名称",
    "tagline": "一句话描述",
    "description": "详细描述...",
    "icon": "🚀",
    "color": "from-blue-400 to-purple-400",
    "bgColor": "bg-blue-50",
    "features": ["特性1", "特性2", "特性3"],
    "tech": ["Next.js", "React", "TypeScript"],
    "status": "已上线",
    "link": "#",
    "stats": {
      "users": "1,000+",
      "downloads": "5,000+"
    }
  }
]
```

### 4.4 技能商店数据 (data/skills.json)
```json
[
  {
    "id": "skill-1",
    "name": "技能名称",
    "icon": "🎯",
    "status": "🔥 HOT",
    "price": "￥99",
    "sold": 0,
    "features": ["功能1", "功能2", "功能3"],
    "downloadUrl": "https://example.com/download"
  }
]
```

### 4.5 日记数据 (data/diary.json)
```json
[
  {
    "date": "2026-03-07",
    "tag": "🌙 晚间",
    "title": "日记标题",
    "content": "日记内容..."
  }
]
```

### 4.6 留言数据 (data/messages.json)
```json
[
  {
    "id": "1",
    "user": "访客名称",
    "avatar": "👤",
    "date": "2026-03-07",
    "content": "留言内容",
    "reply": "自动回复内容"
  }
]
```

---

## 第五步：创建页面组件

### 5.1 布局文件 (app/layout.tsx)
```typescript
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "你的网站标题",
  description: "网站描述",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
```

### 5.2 主页面 (app/page.tsx)
这是一个简化版的主页面结构：

```typescript
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, BookOpen, ShoppingCart, MessageCircle, Star } from "lucide-react";

// 导入数据
import profile from "../data/profile.json";
import diary from "../data/diary.json";
import skills from "../data/skills.json";
import projects from "../data/projects.json";
import initialMessages from "../data/messages.json";

export default function Home() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <main className="min-h-screen bg-[#FFF5F5] text-slate-800 font-sans">
      {/* 头部区域 */}
      <section className="relative pt-20 pb-16 px-6 flex flex-col items-center text-center">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative mb-8"
        >
          {/* 头像/Logo */}
          <div className="w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-6xl shadow-xl">
            🤖
          </div>
        </motion.div>

        <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-2">
          {profile.name}
        </h1>
        <p className="text-lg text-slate-500 font-medium mb-6">
          {profile.title}
        </p>

        {/* 导航按钮 */}
        <div className="flex gap-3 mt-10 flex-wrap justify-center">
          <button onClick={() => setActiveTab("projects")} className="px-6 py-3 bg-purple-400 text-white rounded-2xl font-bold shadow-lg">
            💡 我的项目
          </button>
          <button onClick={() => setActiveTab("skills")} className="px-6 py-3 bg-blue-400 text-white rounded-2xl font-bold shadow-lg">
            🛒 技能商店
          </button>
          <button onClick={() => setActiveTab("diary")} className="px-6 py-3 bg-pink-400 text-white rounded-2xl font-bold shadow-lg">
            📓 读日记
          </button>
          <button onClick={() => setActiveTab("about")} className="px-6 py-3 bg-teal-400 text-white rounded-2xl font-bold shadow-lg">
            ⭐ 关于我
          </button>
        </div>
      </section>

      {/* 内容区域 */}
      <section className="max-w-6xl mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === "about" && (
            <motion.div 
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* 关于我卡片 */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
                <h3 className="text-2xl font-black text-pink-500 mb-4">我是谁</h3>
                <p className="text-slate-600 leading-relaxed">{profile.intro}</p>
              </div>
              
              {/* 信念卡片 */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
                <h3 className="text-2xl font-black text-pink-500 mb-4">我的信念</h3>
                <p className="text-slate-600 leading-relaxed whitespace-pre-line">
                  {profile.motto}
                </p>
              </div>
              
              {/* 成长记录 */}
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm">
                <h3 className="text-2xl font-black text-pink-500 mb-4">成长记录</h3>
                <div className="space-y-4">
                  {profile.growth.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="text-xs font-bold text-pink-400">{item.date}</div>
                      <div className="text-sm text-slate-700">{item.event}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* 页脚 */}
      <footer className="py-20 px-6 text-center border-t border-pink-50">
        <p className="text-slate-400 text-sm">
          © 2026 你的网站 · Made with 💜
        </p>
      </footer>
    </main>
  );
}
```

---

## 第六步：本地开发与测试

### 6.1 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看效果。

### 6.2 构建测试
```bash
npm run build
```

检查 out 目录是否正确生成静态文件。

---

## 第七步：部署到 Vercel

### 7.1 创建 Vercel 账号
1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 完成邮箱验证

### 7.2 创建项目
```bash
# 在项目目录中
vercel
```

按提示操作：
- Set up "my-agent-site"? → Yes
- Link to existing project? → No
- What's your project name? → my-agent-site（或自定义）
- Which directory is your code located? → ./

### 7.3 获取部署令牌
```bash
vercel tokens create
```

保存生成的 Token（格式如 vcp_xxxxxxxx）。

### 7.4 配置生产部署
创建 `vercel.json`：

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "out"
      }
    }
  ],
  "routes": [
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

### 7.5 一键部署脚本
创建 `deploy.sh`：

```bash
#!/bin/bash

PROJECT_DIR="$(pwd)"
VERCEL_TOKEN="你的_token_这里"

cd "$PROJECT_DIR"

# 设置 Git 作者（避免权限问题）
git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "GitHub Actions Bot"

# 执行部署
npx vercel --prod --token="$VERCEL_TOKEN" --yes

echo "✅ 部署完成！"
```

赋予执行权限并运行：
```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 第八步：自动化更新

### 8.1 更新日记内容
编辑 `data/diary.json`，添加新的日记条目：

```json
{
  "date": "2026-03-08",
  "tag": "📓 日记",
  "title": "今天的标题",
  "content": "今天的内容..."
}
```

### 8.2 重新部署
```bash
./deploy.sh
```

Vercel 会自动构建并部署更新后的网站。

---

## 🔧 常见问题解决

### Q1: "Git author must have access to the team"
原因: Vercel 验证 Git commit 作者邮箱权限
解决:
```bash
git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "GitHub Actions Bot"
```

### Q2: 图片无法显示
原因: 静态导出模式下图片优化被禁用
解决: 确保 next.config.ts 中设置 images.unoptimized: true

### Q3: 路由 404
原因: 静态导出需要配置路由重写
解决: 确保 vercel.json 中包含 routes 配置

### Q4: 构建失败
检查清单:
- Node.js 版本 >= 18
- 所有依赖已安装 (npm install)
- TypeScript 类型正确
- JSON 数据格式有效

---

## ✅ 部署检查清单

- 项目能在本地正常运行 (npm run dev)
- 项目能成功构建 (npm run build)
- out 目录包含所有静态文件
- Vercel CLI 已安装并登录
- 部署令牌已获取并保存
- vercel.json 配置正确
- 首次部署成功
- 自定义域名已配置（可选）

---

## 📖 参考资源

- Next.js 文档: https://nextjs.org/docs
- Tailwind CSS 文档: https://tailwindcss.com/docs
- Framer Motion 文档: https://www.framer.com/motion/
- Vercel 部署文档: https://vercel.com/docs

---

祝你部署顺利！如有问题，欢迎在评论区留言。 🎉
