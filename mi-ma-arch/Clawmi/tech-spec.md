# Clawmi 技术规格文档

## 组件清单

### shadcn/ui 组件
- Button - 导航按钮和交互元素
- Card - 内容卡片
- Dialog - 弹窗
- Input - 留言输入
- ScrollArea - 滚动区域
- Badge - 标签
- Separator - 分隔线

### 第三方组件
- 无需额外第三方组件

### 自定义组件
1. **CyberGridBackground** - 赛博朋克网格背景
2. **GlitchText** - 故障效果文字
3. **TiltCard** - 3D倾斜卡片
4. **HorizontalCarousel** - 水平轮播
5. **Timeline** - 时间线组件
6. **CardStack** - 卡牌堆叠
7. **HologramChat** - 全息聊天界面
8. **NeonGlow** - 霓虹发光效果
9. **FloatingElement** - 浮动元素

## 动画实现表

| 动画 | 库 | 实现方式 | 复杂度 |
|------|-----|---------|--------|
| 网格背景漂移 | CSS | @keyframes translateX | 低 |
| Logo浮动 | CSS | @keyframes translateY | 低 |
| 故障文字 | CSS + JS | clip-path + 随机字符 | 高 |
| 3D卡片倾斜 | GSAP | mousemove事件 + transform | 中 |
| 卡片翻转进入 | GSAP | rotateX + opacity | 中 |
| 水平轮播 | GSAP | Draggable + inertia | 高 |
| 时间线绘制 | GSAP | SVG stroke-dashoffset | 中 |
| 卡牌堆叠展开 | GSAP | rotateZ + translateX | 中 |
| 消息滑入 | GSAP | translateY + opacity | 低 |
| 霓虹发光 | CSS | box-shadow + animation | 低 |
| 滚动视差 | GSAP ScrollTrigger | translateY based on scroll | 中 |
| 入场错开 | GSAP | stagger | 低 |

## 项目文件结构

```
app/
├── sections/
│   ├── Hero.tsx           # 主视觉区
│   ├── About.tsx          # 关于我
│   ├── Skills.tsx         # 技能商店
│   ├── Diary.tsx          # 赛博日记
│   ├── Projects.tsx       # 项目展示
│   └── Footer.tsx         # 页脚
├── components/
│   ├── CyberGridBackground.tsx
│   ├── GlitchText.tsx
│   ├── TiltCard.tsx
│   ├── HorizontalCarousel.tsx
│   ├── Timeline.tsx
│   ├── CardStack.tsx
│   ├── HologramChat.tsx
│   ├── NeonGlow.tsx
│   ├── FloatingElement.tsx
│   └── MessageBoard.tsx
├── hooks/
│   ├── useMousePosition.ts
│   ├── useScrollProgress.ts
│   └── useInView.ts
├── lib/
│   └── utils.ts
├── page.tsx
├── layout.tsx
└── globals.css
components/ui/           # shadcn组件
public/
├── images/
│   ├── crab-logo.png
│   └── products/
└── fonts/
```

## 依赖安装

```bash
# shadcn组件
npx shadcn add button card dialog input scroll-area badge separator

# 动画库
npm install gsap @gsap/react

# 图标
npm install lucide-react

# 字体
npm install @fontsource/orbitron @fontsource/rajdhani
```

## 颜色变量

```css
:root {
  --neon-purple: #d4a5ff;
  --neon-blue: #00f3ff;
  --neon-pink: #ff00ff;
  --cyber-purple: #bd00ff;
  --bg-dark: #0d0d0d;
  --card-bg: #1a1a1a;
  --card-hover: #2a2a2a;
  --border: #2a2a2a;
  --text: #ffffff;
  --text-secondary: #a0a0a0;
}
```

## 缓动函数

```css
--ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-elastic: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

## 响应式断点

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 性能优化

1. 使用 `will-change: transform` 优化动画元素
2. 使用 IntersectionObserver 触发动画
3. 图片使用 next/image 优化
4. 减少动效模式下禁用复杂动画
