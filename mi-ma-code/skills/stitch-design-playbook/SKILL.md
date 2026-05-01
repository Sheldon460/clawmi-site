# Stitch Design Agent Playbook

> 专为 Stitch AI (Google 的 Text-to-UI 工具) 设计的 Prompt 工程手册
> 版本: 1.0 | 维护者: mi-ma-code

---

## 🎯 8 字段 Prompt 模板

一个完整的 Stitch 提示必须包含以下 8 个字段，按顺序组织：

### 字段 1: 产品名 + 一句话定位
**格式**: `[产品名] — [一句话描述核心价值]`

```
✅ 示例:
CharGen.ai — AI 角色生成器，一键生成角色头像+完整人设卡

❌ 避免:
- 过于笼统: "一个AI工具"
- 技术术语堆砌: "基于GPT-4的角色生成pipeline"
```

---

### 字段 2: 目标用户
**格式**: `[用户群体1]、[用户群体2]、[用户群体3]`

```
✅ 示例:
DnD 玩家、小说创作者、独立游戏开发者

💡 作用:
帮助 AI 理解设计调性（专业/休闲/企业级）
```

---

### 字段 3: 配色要求
**格式**: `[主色] + [强调色] + [辅助色]`（必须提供 HEX 值）

```
✅ 示例:
深色底（#0A0F1C）+ 赛博青（#00E5CC）强调 + 琥珀金（#FFB800）辅助

❌ 避免:
- 模糊描述: "蓝色主题"
- 不提供具体色值
- 超过 4 种主色
```

---

### 字段 4: 页面结构（逐 Section 描述）
**格式**: `Section名称: [布局描述] + [关键元素]`

```
✅ 示例:
Hero: 暗色背景 + 发光输入框 + 右侧浮现角色卡预览
Gallery: 3 个不同类型角色卡（战士/动漫/科幻）横向排列
How It Works: 3 步流程（描述→生成→导出）垂直时间线
Use Cases: DnD / 小说 / 游戏 / Anime 四张卡片网格
Features: 高对比特性网格 2x3 布局
Pricing: Pro 用赛博青发光边框突出
FAQ: 暗色手风琴样式
Footer: 简洁链接 + 版权信息

💡 技巧:
- 每个 Section 控制在 1-2 句话
- 明确布局方向（横向/纵向/网格）
- 指定元素数量（3个卡片、2x3网格）
```

---

### 字段 5: 消息层级（文案架构）
**格式**: `主标题: [文案]` / `副标题: [文案]` / `CTA: [文案]`

```
✅ 示例:
主标题: Generate Characters Instantly
副标题: Portrait + backstory + stats in 30 seconds
CTA: Create My Character — Free

💡 原则:
- 主标题 ≤ 5 个单词
- 副标题补充价值主张
- CTA 包含动作 + 利益点
```

---

### 字段 6: 定价信息
**格式**: `[套餐名]: [价格/限制]`

```
✅ 示例:
Free: 3次/天
Pro: $9/月（200次）
Lifetime: $199

💡 作用:
让 Pricing Section 的展示更精准
```

---

### 字段 7: 设计调性关键词
**格式**: `[关键词1]、[关键词2]、[关键词3]、[关键词4]`

```
✅ 示例:
Gaming、Fantasy、Premium、Dark Mode

可选词库:
- 风格: Minimalist、Bold、Playful、Corporate、Elegant
- 行业: SaaS、E-commerce、Fintech、Healthcare、Education
- 感觉: Friendly、Professional、Luxury、Tech、Organic
```

---

### 字段 8: 反 AI 味要求（最重要！）
**格式**: `不要 [常见 AI 设计套路]`

```
✅ 必须包含（Prompt 阶段）:
不要紫蓝渐变背景
不要对称 3 列布局
不要用 emoji 做 icon
不要每个 section 背景色交替白/灰
不要圆角卡片堆砌
不要默认 placeholder 头像
不要过度使用阴影

💡 为什么重要:
Stitch 默认输出容易落入"AI 设计套路"，
这些否定指令能显著提升设计独特性。
```

---

## 🚫 反 AI 味二次检查（代码输出后）

Stitch 生成代码后，必须人工复核以下 AI 味陷阱：

### 视觉套路 ❌
| 问题 | 示例 | 修正方案 |
|------|------|----------|
| **紫蓝渐变 + 白色大标题 + 居中布局** | 典型的"AI 官网" look | 用纯色背景 + 左对齐/不对称布局 |
| **所有 icon 同一套线性图标 + 完美对称 3 列** | 过于规整，缺乏个性 | 混搭图标风格，用 2+4 或 3+2 非对称网格 |
| **Hero 区放抽象 3D 渲染球体** | 没有实际意义的装饰 | 用产品截图、真实场景或插画 |
| **每个 section 背景色交替白/灰** | 老式的内容分区方式 | 统一背景色，用间距和边框区分 |

### 文案套路 ❌
| 禁用词 | 为什么 | 替代方案 |
|--------|--------|----------|
| **"Revolutionize"** | 过于夸张，空洞 | 具体描述改变了什么 |
| **"Empower"** | 企业级 buzzword | 说明用户能做什么 |
| **"Seamless"** |  meaningless 形容词 | 描述实际体验 |
| **"Unlock your potential"** | 模板化口号 | 产品具体价值 |
| **"Transform the way you..."** | 过度承诺 | 实际功能描述 |

### 设计套路 ❌
- [ ] 检查是否有 **悬浮的抽象几何图形**（圆环、立方体）
- [ ] 检查是否有 **无意义的渐变光晕**
- [ ] 检查是否有 **过度圆角的卡片**（ROUND_FULL 滥用）
- [ ] 检查是否有 **阴影过于强烈的卡片堆叠**
- [ ] 检查是否有 **人物头像用 AI 生成的假脸**

---

## ✅ 7 项输出检查清单

在提交 Stitch 生成请求前，逐项确认：

### 1. 配色一致性检查
- [ ] 所有颜色都有明确的 HEX 值
- [ ] 主色、强调色、辅助色比例合理（60-30-10 法则）
- [ ] 深色模式已指定背景色

### 2. 布局可行性检查
- [ ] 每个 Section 都有明确的布局方向
- [ ] 元素数量与布局匹配（3个元素用3列或横向排列）
- [ ] 移动端适配已考虑

### 3. 文案层级检查
- [ ] 主标题足够简短有力
- [ ] 副标题解释"为什么选我们"
- [ ] CTA 按钮文案包含动作动词

### 4. 反 AI 味检查
- [ ] 至少包含 4 条"不要"指令
- [ ] 明确拒绝了最常见的 AI 设计套路
- [ ] 提供了替代方案（如"用插画代替 emoji"）

### 5. 品牌一致性检查
- [ ] 产品名贯穿整个描述
- [ ] 目标用户决定了设计调性
- [ ] 关键词与行业匹配

### 6. Section 完整性检查
- [ ] 包含 Hero（首屏）
- [ ] 包含核心功能展示
- [ ] 包含 Social Proof 或 Use Cases
- [ ] 包含 Pricing（如适用）
- [ ] 包含 CTA 或 Footer

### 7. 技术可行性检查
- [ ] 没有要求复杂的交互动效
- [ ] 图片/图标需求明确且可生成
- [ ] 布局在 Stitch 能力范围内（静态 UI）

---

## 🔍 Stitch 输出后检查清单（Post-Generation QA）

Stitch 生成代码后，必须人工检查以下项目：

### 视觉一致性检查
- [ ] **配色是否和你要的一致**
  - ⚠️ Stitch 会微调色值，检查实际生成的 HEX
- [ ] **字体是否和品牌要求一致**
  - ⚠️ Stitch 可能用默认字体，需替换为指定字体
- [ ] **移动端响应式是否合理**
  - 大部分 Tailwind 处理不错，但复杂布局要检查

### 内容准确性检查
- [ ] **文案是否用了占位符**
  - ❌ Stitch 经常用 Lorem ipsum 或自编文案
  - ✅ 必须替换成你的定稿文案
- [ ] **定价数字是否用了审查后的版本**
  - ❌ 不是 PRD 原始数字
  - ✅ 必须是最终确认的定价

### 资源替换检查
- [ ] **图片是否用了 Google CDN 临时图**
  - ❌ src 指向 Google 服务器（如 `lh3.googleusercontent.com`）
  - ✅ 必须替换成你自己的图或正版素材
- [ ] **有没有 emoji 做 icon**
  - ❌ 有的话让开发替换成 SVG 图标
  - ✅ 使用 Lucide/Phosphor 等专业图标库

### 代码质量检查
- [ ] **检查 className 是否有冲突**
- [ ] **验证所有链接和按钮是否可点击**
- [ ] **确认暗色/亮色模式切换正常**
- [ ] **检查是否有未使用的导入**

---

## 📝 完整示例 Prompt

```markdown
## CharGen.ai Landing Page

**产品名 + 定位**: CharGen.ai — AI 角色生成器，一键生成角色头像+完整人设卡

**目标用户**: DnD 玩家、小说创作者、独立游戏开发者

**配色要求**: 深色底（#0A0F1C）+ 赛博青（#00E5CC）强调 + 琥珀金（#FFB800）辅助

**页面结构**:
1. Hero: 全宽暗色背景，左侧大标题+输入框，右侧悬浮角色卡预览（带发光边框）
2. Gallery: 3 个不同类型角色卡（战士/动漫/科幻）横向排列，卡片有悬停效果
3. How It Works: 垂直 3 步流程（描述→生成→导出），每步配简单图标
4. Use Cases: 2x2 网格展示 DnD / 小说 / 游戏 / Anime 四场景
5. Features: 6 个特性图标网格，高对比度
6. Pricing: 三栏对比，Pro 用赛博青发光边框突出
7. FAQ: 暗色手风琴样式，简洁展开
8. Footer: 深色背景，简洁链接+社交图标

**消息层级**:
- 主标题: Generate Characters Instantly
- 副标题: Portrait + backstory + stats in 30 seconds. No prompt engineering needed.
- CTA: Create My Character — Free

**定价信息**: Free: 3次/天 | Pro: $9/月（200次）| Lifetime: $199

**设计调性**: Gaming、Fantasy、Premium、Dark Mode、Cyberpunk

**反 AI 味要求**:
- 不要紫蓝渐变背景，用纯色深底
- 不要对称 3 列布局，用不对称构图
- 不要用 emoji 做 icon，用线条图标或插画
- 不要每个 section 背景色交替，保持统一深色
- 不要默认 placeholder 头像，用生成的角色预览
- 不要过度圆角（ROUND_FULL），用 ROUND_EIGHT
```

---

## 🔧 快速使用指南

### 通过 mcporter 调用 Stitch

```bash
# 1. 创建项目
mcporter call stitch.create_project title="CharGen.ai Landing"

# 2. 生成屏幕（使用本 playbook 的 prompt）
mcporter call stitch.generate_screen_from_text \
  projectId="YOUR_PROJECT_ID" \
  prompt="[上面的完整 prompt]" \
  deviceType="DESKTOP" \
  modelId="GEMINI_3_1_PRO"

# 3. 查看生成的屏幕
mcporter call stitch.list_screens projectId="YOUR_PROJECT_ID"
```

### 设计系统配置建议

```bash
# 创建设计系统（与 prompt 配色保持一致）
mcporter call stitch.create_design_system \
  projectId="YOUR_PROJECT_ID" \
  designSystem='{
    "displayName": "CharGen Dark Theme",
    "theme": {
      "colorMode": "DARK",
      "headlineFont": "INTER",
      "bodyFont": "INTER",
      "roundness": "ROUND_EIGHT",
      "customColor": "#00E5CC"
    }
  }'
```

---

## 📚 版本记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| 1.0 | 2026-04-02 | 初始版本，8字段模板 + 7项检查清单 |
| 1.1 | 2026-04-02 | 新增 Stitch 输出后检查清单 + 反 AI 味二次检查 |

---

*最后更新: 2026-04-02*  
*维护者: mi-ma-code (幂码-编程)*
