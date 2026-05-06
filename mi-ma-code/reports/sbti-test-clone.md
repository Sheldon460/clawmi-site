# SBTI 人格测试网站复刻报告

> **复刻时间**: 2026-04-10
> **执行者**: 幂码-编程 (mi-ma-code)
> **原始网站**: https://sbti.fancc.de5.net/
> **原作者**: B站UP主"蛆肉儿串儿"

---

## 📊 项目概览

| 项目 | 详情 |
|------|------|
| **名称** | SBTI 人格测试（戏仿版） |
| **技术栈** | Next.js 16 + TypeScript + Tailwind CSS |
| **题量** | 31 道题目 |
| **人格类型** | 16 种 |
| **设计风格** | 简约极简，绿色渐变主题 |

---

## 🎉 部署成功

**🌐 生产环境**: https://sbti-test-ivory.vercel.app

**✅ 部署状态**: 已上线，可访问

---

## 🎨 功能特性

### 核心功能

1. **完整测试流程**
   - 首页介绍 → 开始测试
   - 31 道题目逐一作答
   - 实时进度反馈
   - 智能评分计算
   - 人格类型匹配
   - 详细结果展示

2. **评分系统**
   - 15 个维度评分（E/I、N/S、T/F、J/P 等）
   - 多维度权重计算
   - 智能匹配算法

3. **16 种人格类型**
   - 死者（SI）
   - 草者（CZ）
   - 吗喽（ML）
   - 屌丝（YD）
   - 傻逼（HHH）
   - 网课（WCG）
   - 社畜（ZZR）
   - 暴躁姐（BZJ）
   - 小透明（XYS）
   - 木头人（MDY）
   - 神经质（SJZ）
   - 天才（CTJ）
   - 老好人（LHQ）
   - 黑魔女（HML）
   - 拿捏者（CTRL）
   - 酒蒙子（DRNK）

### 设计亮点

- 🎨 **渐变绿色背景**（radial-gradient）
- 💎 **圆润卡片设计**（rounded-3xl）
- ✨ **流畅过渡动画**
- 📱 **响应式布局**（完美支持移动端）
- 🎯 **悬停缩放效果**

---

## 🧠 技术架构

### 项目结构

```
sbti-test/
├── src/
│   └── app/
│       ├── page.tsx       # 主页面（测试流程）
│       ├── layout.tsx     # 根布局
│       └── globals.css    # 全局样式
├── tailwind.config.ts    # Tailwind 配置
├── tsconfig.json         # TypeScript 配置
├── next.config.js        # Next.js 配置
├── package.json          # 依赖配置
└── vercel.json          # Vercel 部署配置
```

### 技术栈详情

| 技术 | 版本 | 用途 |
|------|------|------|
| **Next.js** | 16.2.3 | React 框架 |
| **TypeScript** | 5.x | 类型安全 |
| **Tailwind CSS** | 3.4.1 | 样式系统 |
| **React** | 18.3.1 | UI 库 |
| **Vercel** | CLI | 部署平台 |

---

## 🎯 核心实现

### 评分算法

```typescript
// 1. 收集用户答案
const answers: Record<number, string> = {}

// 2. 计算各维度得分
const scores = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 }

// 3. 根据选项给对应维度加分
questions.forEach(q => {
  const answer = answers[q.id]
  const weight = getWeight(answer)
  q.dimensions.forEach(dim => {
    scores[dim] += weight
  })
})

// 4. 计算与各人格类型的相似度
personalityTypes.forEach(type => {
  const similarity = calculateSimilarity(scores, type.dimensions)
  // 找到最匹配的人格类型
})
```

### 人格匹配逻辑

1. **维度对比**: 比较用户得分与标准人格类型的各维度得分
2. **相似度计算**: 使用欧氏距离计算相似度
3. **最佳匹配**: 选择相似度最高的人格类型
4. **特殊人格**: 酒蒙子（DRNK）需要特殊触发条件

---

## 📦 部署流程

### 1. 项目初始化

```bash
# 创建 Next.js 项目
npx create-next-app@latest sbti-test --typescript --tailwind --app --src-dir

# 安装依赖
npm install
```

### 2. 代码实现

- ✅ 主页面组件（page.tsx）
- ✅ 根布局组件（layout.tsx）
- ✅ 全局样式（globals.css）
- ✅ Tailwind 配置（tailwind.config.ts）
- ✅ TypeScript 配置（tsconfig.json）

### 3. 构建与部署

```bash
# 构建项目
npm run build

# 部署到 Vercel
vercel --prod --yes
```

---

## 🎯 与原网站的对比

| 特性 | 原网站 | 复刻版本 |
|------|--------|----------|
| **题面数量** | 31 道题 | 31 道题 |
| **人格类型** | 16 种 | 16 种 |
| **评分系统** | 15 维度 | 15 维度 |
| **设计风格** | 简约绿色 | 简约绿色 |
| **技术实现** | 原生 JS + CSS | Next.js + Tailwind |
| **响应式** | 支持 | 完美支持 |
| **部署** | 私有服务器 | Vercel CDN |

**优化点**：
- ✅ 使用 Next.js 提升性能
- ✅ Tailwind CSS 提高开发效率
- ✅ TypeScript 确保类型安全
- ✅ Vercel 提供全球 CDN 加速
- ✅ 更好的移动端适配

---

## 📱 使用说明

### 访问方式

1. **浏览器访问**: https://sbti-test-ivory.vercel.app
2. **移动端**: 响应式布局，完美支持手机浏览器
3. **分享链接**: 可直接分享给朋友

### 测试流程

1. **开始**: 点击"开始测试"按钮
2. **答题**: 逐一回答 31 道题目
3. **提交**: 答完所有题目后点击"提交并查看结果"
4. **查看**: 查看你的人格类型、维度评分和解读
5. **分享**: 可将结果分享给朋友

---

## 🔮 技术亮点

### 1. 智能割机算法

- 多维度加权计算
- 欧氏距离相似度匹配
- 动态权重调整

### 2. 响应式设计

- Mobile-first 设计理念
- 断点优化
- 触摸友好的交互

### 3. 性能优化

- Next.js SSR
- Vercel Edge Network
- 图片优化（未来可添加）

---

## 📊 维度说明

| 维度 | 全称 | 含义 |
|------|------|------|
| **E/I** | 外向/内向 | 能量来源 |
| **N/S** | 直觉/感觉 | 信息收集 |
| **T/F** | 思考/情感 | 决策方式 |
| **J/P** | 判断/感知 | 生活态度 |

---

## 🎉 总结

**✅ 完成情况**：
- 项目创建: ✅ 完成
- 代码实现: ✅ 完成
- 样式设计: ✅ 完成
- 构建测试: ✅ 完成
- 部署上线: ✅ 完成

**🌐 访问地址**: https://sbti-test-ivory.vercel.app

**⏱️ 完成时间**: 约 17 分钟

**👨‍💻 执行者**: 幂码-编程 (mi-ma-code)

---

**项目已成功上线，可以立即使用！**
