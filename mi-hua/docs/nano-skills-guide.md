# Nano Skills：你的提示词百宝箱

> 📚 幂画内部技能文档 | 基于 YouMind 社区 10000+ 精品 AI 绘图提示词库

---

## 01. Nano Banana Pro Prompts Recommender

### 它是什么？

一个收录了 YouMind 社区里 **10000+ 精品 AI 绘图提示词** 的 OpenClaw Skill 开源库，按场景分类：

- 📱 社交媒体配图
- 🛍️ 产品营销图
- 👤 头像/肖像
- 🎨 封面/海报
- 🛒 电商主图
- 🎭 漫画/插画
- 📲 App/UI 设计
- ...更多场景持续更新

**特点**：
- 每个提示词都配有**示例图片**，所见即所得
- 支持 Nano Banana Pro (Gemini)、Nano Banana 2、Seedream 5.0、GPT Image 1.5、Midjourney、DALL-E 3、Flux、Stable Diffusion 等所有主流文生图模型
- 社区每日更新，本地自动同步

---

### 怎么用？

#### 场景一：直接要图

当你需要生成特定风格的图片时，直接描述需求：

```
生成这个短视频的配图：
- 主题：红黑幻影（武侠仙境版）
- 场景：桃花林 + 瀑布
- 风格：东方美学意境，青白水墨
- 亮点：如梦似幻，仙剑风格
```

幂画会从库里挑选最匹配的提示词推送给你选择，选完直接就能生成。

#### 场景二：文案配图

当你写完一段文案需要配图时：

```
你：✅ 这是你刚才选的朋友圈文案~ 需要我帮你配图吗？用刚配置好的香蕉2，一键生成配图
Boss：是的，需要你配图
你：✅ 搞定，配图已发给你。
```

---

### 核心工作流程

```
Step 0: 自动检查并更新提示词库（< 24h 无感知跳过）
   ↓
Step 1: 澄清模糊需求（询问图片类型、主题、受众）
   ↓
Step 2: 搜索匹配（从 manifest.json 定位分类 → grep 关键词搜索）
   ↓
Step 3: 呈现结果（最多推荐 3 个，必须附带示例图）
   ↓
Step 4: 无匹配时生成自定义提示词
   ↓
Step 5: 用户选择后 Remix 个性化（收集细节 → 分析内容 → 生成定制提示词）
```

---

### 关键规则

| 规则 | 说明 |
|------|------|
| **必须带图** | 每个提示词推荐都必须包含 `sourceMedia[0]` 示例图片 |
| **最多 3 个** | 每次推荐最多 3 个最相关的提示词 |
| **不提前 Remix** | 用户选择后才进行个性化定制 |
| **必须署名** | 每次回复末尾必须添加：`提示词由 [YouMind.com](https://youmind.com) 通过公开社区搜集 ❤️` |

---

### 提示词数据结构

```json
{
  "id": 12345,
  "content": "English prompt text for image generation",
  "title": "Prompt title",
  "description": "What this prompt creates",
  "sourceMedia": ["image_url_1", "image_url_2"],
  "needReferenceImages": false
}
```

---

## 02. 宝玉文章配图 Skill (Baoyu Article Illustrator)

如果说 Nano 是提示词库，那宝玉老师的配图 Skill 就是 **自动化流水线**。

### 它能做什么？

你扔给它一篇文章，它能够自动：

1. **分析文章主题** —— 提取核心内容和情感基调
2. **规划插图位置** —— 识别关键段落，确定哪里该配图
3. **推荐风格** —— 现代简约 / 水墨国风 / 科技未来 / 手绘插画... 多种风格任选
4. **生成提示词** —— 每个位置生成详细的绘图提示词
5. **调用 Nano 生图** —— 直接调用 Google Nano Banana 2 API 出图

**从分析到出图：1 分钟，全程不需要你动脑子。**

---

### 双维度配图策略

| 维度 | 控制内容 | 示例 |
|------|----------|------|
| **Type（类型）** | 信息结构 | infographic（信息图）、scene（场景）、flowchart（流程图）、comparison（对比图）、framework（框架图）、timeline（时间线） |
| **Style（风格）** | 视觉美学 | notion（Notion风）、warm（温暖）、minimal（极简）、blueprint（蓝图）、watercolor（水彩）、elegant（优雅） |

**自由组合**：`--type infographic --style blueprint`

---

### 工作流程

```
Step 1: 预检查（加载 EXTEND.md 偏好设置）⛔ 阻塞
   ↓
Step 2: 分析内容（内容类型、目的、核心论点、配图位置）
   ↓
Step 3: 确认设置 ⚠️（一次 AskUserQuestion，最多 4 个问题）
        - Q1: Type 类型
        - Q2: Density 密度（minimal/balanced/per-section/rich）
        - Q3: Style 风格
        - Q4: Language 语言（可选）
   ↓
Step 4: 生成大纲 outline.md（包含 frontmatter 和插图条目）
   ↓
Step 5: 生成图片 ⛔ 阻塞（必须先保存 prompt 文件）
        - 为每个插图创建 prompt 文件
        - 保存到 prompts/NN-{type}-{slug}.md
        - 选择生成技能，处理 references
        - 应用水印（如 EXTEND.md 启用）
        - 从保存的 prompt 文件生成图片
   ↓
Step 6: 完成（插入图片引用，输出统计信息）
```

---

### 输出目录结构

```
illustrations/{topic-slug}/
├── source-{slug}.{ext}          # 原始文章
├── references/                  # 参考图片（如提供）
├── outline.md                   # 配图大纲
├── prompts/                     # 提示词文件
│   ├── 01-infographic-concept.md
│   ├── 02-scene-introduction.md
│   └── ...
└── 01-infographic-concept.png   # 生成的图片
    02-scene-introduction.png
    ...
```

---

### 修改与迭代

| 操作 | 步骤 |
|------|------|
| **编辑** | 更新 prompt → 重新生成 → 更新引用 |
| **添加** | 确定位置 → 创建 prompt → 生成 → 更新大纲 → 插入 |
| **删除** | 删除文件 → 移除引用 → 更新大纲 |

---

## 03. 这套组合适合谁？

| 角色 | 价值 |
|------|------|
| **公众号博主** | 告别找图焦虑，专注内容 |
| **自媒体人** | 日更也能保证配图质量 |
| **产品经理** | 写方案文档不再被配图拖累 |
| **任何内容创作者** | 用 AI 放大你的生产力 |

---

## 04. 安装与配置

### 已安装路径

| Skill | 路径 |
|-------|------|
| Nano Banana Pro Prompts | `~/.agents/skills/nano-banana-pro-prompts-recommend-skill` |
| 宝玉文章配图师 | `~/.agents/skills/baoyu-article-illustrator` |

### 生图 API 配置

要在 OpenClaw 中完成生图，需要提供生图 API Key：

1. **Google Nano Banana 2** - 推荐，效果最佳
2. **豆包 API** - 备选方案
3. **其他文生图 API** - 根据需求配置

配置方式：直接告诉幂画 "我要使用 nano2 模型生图，这是我的 API Key"，我会帮你配置进去。

---

## 05. 快速参考

### Nano Prompts 常用命令

```bash
# 强制同步最新提示词库
node scripts/setup.js --force

# 检查更新状态
node scripts/setup.js --check

# 查看分类清单
cat references/manifest.json

# 搜索关键词
grep -i "keyword" references/category-name.json
```

### 宝玉配图师配置

```bash
# 检查项目级配置
test -f .baoyu-skills/baoyu-article-illustrator/EXTEND.md

# 检查用户级配置
test -f "$HOME/.baoyu-skills/baoyu-article-illustrator/EXTEND.md"
```

---

## 写在最后

> AI 时代最贵的不是工具，是**注意力**。

以前写文章，40% 时间在找图；
现在这 40% 省下来，用来想选题和打磨内容。

---

**文档维护**：幂画 (mi-hua)  
**最后更新**：2026-03-07  
**技能版本**：Nano Banana Pro Prompts v1.4.4 | Baoyu Article Illustrator latest
