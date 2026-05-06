# SBTI - 戏仿版 MBTI 人格测试

**MBTI过时了，试试这个荒诞幽默的31道戏仿人格测试，测出你的隐藏人格**

---

## 🎯 项目介绍

SBTI 是一个戏仿版的 MBTI 人格测试网站，专为 95 后、00 后、10 后年轻用户设计。通过 31 道荒诞幽默的问题，测出你的隐藏人格——死者、草者、吗喽、屌丝、神人、杠精、屎者、佛系。

### 核心特色

- 🎨 **清新绿色调**：使用淡绿径向渐变背景，营造轻松幽默的氛围
- 📱 **完全响应式**：移动端优先，支持桌面端和移动端
- 🎭 **幽默风格**：荒诞的测试问题和人格解读
- ⚡ **Next.js 14**：使用最新的 React 框架，性能优异
- 🎯 **个性化结果**：详细的维度评分和匹配度展示

---

## 🚀 快速开始

### 前置要求

- Node.js 18.0 或更高版本
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

访问：http://localhost:3000

### 构建生产版本

```bash
npm run build
npm start
```

### 使用快速启动脚本

```bash
chmod +x quickstart.sh
./quickstart.sh
```

---

## 📁 项目结构

```
sbti-ui-optimized/
├── app/
│   ├── globals.css          # Tailwind 配置 + 自定义样式
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 主页面（屏幕路由）
├── components/
│   ├── hero-screen.tsx       # 首页入口
│   ├── test-screen.tsx       # 测试问题页
│   ├── result-screen.tsx     # 结果展示页
│   └── footer.tsx            # 页脚
├── types/
│   └── sbti.ts               # TypeScript 类型定义
├── lib/
│   └── utils.ts              # 工具函数 + 示例数据
├── tailwind.config.ts        # Tailwind 配置
├── tsconfig.json             # TypeScript 配置
├── postcss.config.js         # PostCSS 配置
├── package.json              # 依赖配置
├── OPTIMIZATION_REPORT.md    # UI 优化报告
└── README.md                 # 项目说明
```

---

## 🎨 设计规范

### 配色方案

| 颜色色值 | 用途 | 说明 |
|---------|------|------|
| `#6c8d71` | Primary（主色） | 清新绿 - 主要按钮、强调元素 |
| `#4d6a53` | Accent（强调色） | 深绿 - 悬停状态、重要文字 |
| `#dbe8dd` | Secondary（辅助色） | 浅绿 - 边框、分隔线、次级背景 |
| `#f6faf6` | Background（背景色） | 淡绿白底 - 页面主背景 |
| `#1e2a22` | Text（文字色） | 深绿黑 - 主要文字 |
| `#ffffff` | Card（卡片色） | 白色 - 卡片、按钮背景 |

### 设计原则

- ✅ 淡绿径向渐变背景
- ✅ 单列居中或左文右图布局
- ✅ 极简线条图标（Lucide React）
- ✅ 统一淡绿背景
- ✅ 大圆角（rounded-3xl）+ 适度间距
- ✅ 人格代码大字作为视觉元素
- ✅ 轻盈半透明阴影（rgba(47, 73, 55, 0.08)）
- ✅ 简单悬停缩放动画

---

## 🛠️ 技术栈

- **框架**：Next.js 14（React 18）
- **样式**：Tailwind CSS 3.4
- **类型**：TypeScript 5.3
- **图标**：Lucide React
- **构建工具**：Webpack（内置）

---

## 📱 页面说明

### 1. Hero Screen（首页）

- **大标题**：MBTI已经过时，SBTI来了
- **副标题**：31道荒诞幽默的戏仿人格测试
- **操作按钮**：开始测试
- **背景**：淡绿径向渐变

### 2. Test Screen（测试页）

- **顶部进度条**：绿色渐变 + 毛玻璃效果
- **问题卡片**：白色背景 + 轻盈阴影
- **选项按钮**：单选样式，已选中状态明确
- **底部导航**：返回首页 + 上一题 + 下一题/查看结果

### 3. Result Screen（结果页）

- **海报图**（桌面端左侧）：
  - 大字人格代码（6xl-8xl）
  - 类型名称（3xl-4xl）
  - 匹配度百分比（5xl-6xl）
- **结果信息**（桌面端右侧）：
  - 人格解读
  - 维度评分列表（水平进度条）
  - 作者折叠卡片
- **操作按钮**：重新测试、分享结果、保存图片、回到首页

### 4. Footer（页脚）

- 简洁版权信息
- "仅供娱乐"提示

---

## 📊 人格类型

| 人格代码 | 类型名称 | 特征 |
|---------|---------|------|
| DEAD | 死者 | 失去对生活的热情，像个行尸走肉 |
| GRASS | 草者 | 顽强生存，任何环境都能适应 |
| MONKEY | 吗喽 | 活力四射，上蹿下跳，三分钟热度 |
| LOSER | 屌丝 | 普通人，平凡中也有独特魅力 |
| GOD | 神人 | 完美存在，让人望尘莫及 |
| TROLL | 杠精 | 总能找到反驳别人的角度 |
| SHIT | 屎者 | 一团糟，但屎也有它的价值 |
| PEACE | 佛系 | 看透一切，心如止水 |

---

## 🔧 配置说明

### Tailwind 配置

```typescript
// tailwind.config.ts
colors: {
  primary: '#6c8d71',
  accent: '#4d6a53',
  secondary: '#dbe8dd',
  background: '#f6faf6',
  text: '#1e2a22',
  card: '#ffffff',
}
```

### TypeScript 类型

```typescript
// types/sbti.ts
type PersonalityType = 'DEAD' | 'GRASS' | 'MONKEY' | 'LOSER' | 'GOD' | 'TROLL' | 'SHIT' | 'PEACE';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface Result {
  type: PersonalityType;
  typeName: string;
  code: string;
  matchRate: number;
  description: string;
  dimensions: { label: string; score: number; maxScore: number; }[];
}
```

---

## 🎯 后续优化建议

### 短期优化（1-2 周）
1. **补充完整问题数据**：添加 31 道测试问题的完整数据
2. **完善计分逻辑**：实现真实的 SBTI 人格计算算法
3. **添加分享功能**：实现分享结果到社交媒体
4. **保存图片功能**：生成结果图片并支持下载

### 中期优化（1-2 个月）
1. **数据统计**：收集测试数据，分析人格分布
2. **A/B 测试**：对比不同设计的转化率
3. **SEO 优化**：添加元数据，提升搜索引擎排名
4. **加载优化**：添加骨架屏，优化首屏加载速度

### 长期优化（3-6 个月）
1. **多语言支持**：添加英文、日文等其他语言
2. **个性化推荐**：根据用户历史推荐相关内容
3. **社区功能**：允许用户分享结果并进行讨论
4. **商业化探索**：考虑付费功能或广告变现

---

## 📝 开发说明

### 添加新问题

编辑 `lib/utils.ts`，在 `SAMPLE_QUESTIONS` 数组中添加问题：

```typescript
export const SAMPLE_QUESTIONS = [
  // ... 现有问题
  {
    id: 4,
    text: "你的问题文本",
    options: [
      "选项 A",
      "选项 B",
      "选项 C",
      "选项 D"
    ]
  }
]
```

### 修改人格结果

编辑 `lib/utils.ts`，在 `SAMPLE_RESULTS` 对象中修改或添加人格类型：

```typescript
export const SAMPLE_RESULTS = {
  // ... 现有结果
  YOUR_NEW_TYPE: {
    typeName: "类型名称",
    code: "CODE",
    matchRate: 90,
    description: "人格描述",
    dimensions: [
      { label: "维度1", score: 80, maxScore: 100 },
      // ... 更多维度
    ]
  }
}
```

### 自定义样式

编辑 `app/globals.css`，添加自定义样式：

```css
/* 自定义类名 */
.my-custom-class {
  /* 你的样式 */
}

/* 悬停效果 */
.my-hover-effect {
  transition: all 0.3s ease;
}

.my-hover-effect:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(47, 73, 55, 0.12);
}
```

---

## 📄 许可证

仅供学习和娱乐使用，请勿用于商业用途。

---

## 👤 作者

SBTI Test · 仅供娱乐

---

## 🙏 致谢

- Next.js 团队
- Tailwind CSS 团队
- Lucide React 图标库

---

**最后更新：2026-04-10**
**版本：1.0.0**
