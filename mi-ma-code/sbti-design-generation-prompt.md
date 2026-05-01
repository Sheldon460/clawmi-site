# SBTI 人格测试网站 - UI 设计生成请求

## 项目信息
- 产品名：SBTI（戏仿版 MBTI 人格测试）
- 技术栈：Next.js 14 + Tailwind CSS + TypeScript
- 目标框架：React Server Components

## 设计规范

### 配色系统
```css
--primary: #6c8d71;      /* 清新绿 - 主色 */
--accent: #4d6a53;       /* 深绿 - 强调色 */
--secondary: #dbe8dd;    /* 浅绿 - 辅助色 */
--background: #f6faf6;  /* 淡绿白底 - 背景 */
--text: #1e2a22;        /* 深绿黑 - 文字 */
--card: #ffffff;         /* 白 - 卡片 */
--shadow: rgba(47, 73, 55, 0.08);  /* 轻盈半透明阴影 */
```

### 布局要求
1. **Hero Screen**: 单列居中，径向渐变背景
2. **Test Screen**: 单列，顶部进度条，问题卡片堆叠
3. **Result Screen**: 响应式 - 桌面端左右布局，移动端单列
4. **Footer**: 简洁版权信息

### 组件规范
- 按钮：大圆角（rounded-3xl），悬停缩放（hover:-translate-y-1）
- 卡片：白色背景，轻盈阴影，大圆角
- 进度条：绿色渐变
- 动画：简单悬停效果，无复杂 3D

## 需要生成的文件

### 1. `app/globals.css`
- 定义 Tailwind 配置
- 自定义颜色系统
- 基础样式重置

### 2. `components/hero-screen.tsx`
- 首页入口
- 径向渐变背景
- 大标题 + 开始测试按钮

### 3. `components/test-screen.tsx`
- 测试问题页
- 进度条组件
- 问题卡片组件
- 选项按钮组件
- 返回/提交按钮

### 4. `components/result-screen.tsx`
- 结果展示页
- 海报组件（大字人格代码）
- 结果信息组件
- 维度评分列表
- 操作按钮

### 5. `components/footer.tsx`
- 简洁版权信息
- 仅供娱乐提示

### 6. `types/sbti.ts`
- TypeScript 类型定义

## 设计原则
- ✅ 淡绿径向渐变背景
- ✅ 单列居中或左文右图布局
- ✅ 极简线条图标或无图标
- ✅ 统一淡绿背景
- ✅ 大圆角（rounded-3xl）+ 适度间距
- ✅ 人格代码大字作为视觉元素
- ✅ 轻盈半透明阴影
- ✅ 简单悬停缩放动画

## 输出要求
1. 生成完整的 Next.js 14 项目代码
2. 所有组件使用 TypeScript
3. 响应式设计（移动端优先）
4. 代码注释清晰
5. 导出为可以直接运行的代码
