# OpenClaw 自动发布公众号完整教程

> 从零开始配置 Markdown → 排版 → 微信公众号全自动发布流水线

---

## 前言

作为内容创作者，最繁琐的工作莫过于「写好文章 → 排版 → 登录后台 → 复制粘贴 → 调整格式 → 发布」。这套流程不仅耗时，还容易出错。

本文将详细介绍如何使用 **OpenClaw** 搭建一套完整的自动化流水线，实现：

- ✅ Markdown 写作，专注内容
- ✅ 自动转换为微信兼容的精美 HTML
- ✅ 一键发布到公众号草稿箱
- ✅ 支持多种主题风格

整个过程只需一条命令，大幅提升创作效率。

---

## 零、完整工作流概览

从选题到发布的完整流程，基于 **SOP_GZH**（微信公众号内容生产标准作业程序）：

```
┌─────────────────────────────────────────────────────────────┐
│  阶段1: 灵感捕获                                              │
│  └── 抓取微信文章 → 原文归档 → 提炼选题 → 选题入库           │
├─────────────────────────────────────────────────────────────┤
│  阶段2: 素材沉淀                                              │
│  └── 收集金句/框架 → 存入爆款素材片段                          │
├─────────────────────────────────────────────────────────────┤
│  阶段3: 选题立项与大纲生成                                     │
│  └── 列出待写选题 → 用户选择 → 生成3个大纲                     │
├─────────────────────────────────────────────────────────────┤
│  阶段4: 初稿打磨                                              │
│  └── 读取风格 → 生成初稿 → Humanize处理 → 存入初稿区           │
├─────────────────────────────────────────────────────────────┤
│  阶段5-7: 终稿确认与归档                                       │
│  └── 用户确认终稿 → 移动至已发布归档 → 更新状态                │
├─────────────────────────────────────────────────────────────┤
│  阶段8: 自动发布（本教程重点）                                  │
│  └── Markdown → HTML排版 → 一键发布到公众号草稿箱              │
└─────────────────────────────────────────────────────────────┘
```

---

## 一、核心组件介绍

这套方案由三个核心技能组成：

| 技能                        | 功能              | 作用                               |
| :------------------------ | :-------------- | :------------------------------- |
| `canghe-markdown-to-html` | Markdown 转 HTML | 将 Markdown 转换为带内联 CSS 的微信兼容 HTML |
| `canghe-post-to-wechat`   | 发布到公众号          | 自动操作浏览器，将 HTML 发布为草稿             |
| `publish-to-wechat.sh`    | 一键脚本            | 整合上述两个技能，简化操作流程                  |

### 1.1 技能原理

**markdown-to-html**：基于 Remark 生态，支持 GitHub Flavored Markdown，提供三种精美主题（default/grace/simple），自动生成适配微信的 HTML 代码。

**post-to-wechat**：使用 Chrome DevTools Protocol (CDP) 控制浏览器，模拟人工操作：打开编辑器 → 填充标题 → 粘贴正文 → 保存草稿。首次扫码登录后，会话自动保持。

---

## 二、环境准备

### 2.1 系统要求

- macOS（本教程基于 Mac）
- Chrome 浏览器
- Bun 运行时（已随 OpenClaw 安装）

### 2.2 安装依赖

进入 markdown-to-html 技能目录，安装所需依赖：

```bash
cd ~/.openclaw/skills/canghe-markdown-to-html

# 核心依赖
bun add remark remark-html remark-gfm unist-util-visit yaml
bun add front-matter highlight.js marked katex mermaid plantuml-encoder
bun add reading-time remark-parse remark-cjk-friendly unified fflate juice
```

共需安装 12 个包，用于 Markdown 解析、代码高亮、数学公式、图表渲染等功能。

### 2.3 配置环境变量

在 Shell 配置文件（如 `.zshrc`）中添加：

```bash
# Chrome 浏览器路径
export WECHAT_BROWSER_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# URL 抓取时的 Chrome 路径
export URL_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

> 注意：根据你的实际 Chrome 安装位置调整路径。

---

## 三、配置文件设置

### 3.1 创建配置目录

```bash
mkdir -p ~/.canghe-skills/canghe-post-to-wechat
```

### 3.2 编辑 EXTEND.md

创建并编辑配置文件：

```bash
cat > ~/.canghe-skills/canghe-post-to-wechat/EXTEND.md << 'EOF'
default_theme: default              # 默认主题
default_publish_method: browser     # 发布方式：browser 或 api
default_author: ""                  # 默认作者名
need_open_comment: 1                # 开启评论：1=是, 0=否
only_fans_can_comment: 0            # 仅粉丝可评论：1=是, 0=否
chrome_profile_path: ~/.local/share/wechat-browser-profile
EOF
```

**参数说明**：

- `default_theme`：可选 `default`（经典）、`grace`（优雅）、`simple`（简洁）
- `default_publish_method`：`browser` 模式需扫码，`api` 模式需配置 AppID/AppSecret
- `need_open_comment`：是否允许读者评论
- `chrome_profile_path`：登录会话保存位置，下次免登

---

## 四、一键发布脚本

### 4.1 创建脚本

在项目目录下创建 `publish-to-wechat.sh`：

```bash
#!/bin/bash
set -e

# 设置 Chrome 路径
export WECHAT_BROWSER_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 获取绝对路径
MARKDOWN_FILE="$(cd "$(dirname "$1")" && pwd)/$(basename "$1")"
SKILL_DIR="$HOME/.openclaw/skills"

# 检查文件
if [ ! -f "$MARKDOWN_FILE" ]; then
    echo "错误: 文件不存在: $MARKDOWN_FILE"
    exit 1
fi

echo "🚀 开始发布流程..."

# Step 1: Markdown → HTML
cd "$SKILL_DIR/canghe-markdown-to-html"
bun scripts/main.ts "$MARKDOWN_FILE" --theme default

HTML_FILE="${MARKDOWN_FILE%.md}.html"

# Step 2: 发布到公众号
cd "$SKILL_DIR/canghe-post-to-wechat"
bun scripts/wechat-article.ts --html "$HTML_FILE"

echo "✅ 完成！请去公众号后台确认发布。"
```

### 4.2 添加执行权限

```bash
chmod +x publish-to-wechat.sh
```

---

## 五、Markdown 文件规范

### 5.1 必须包含 Frontmatter

为了让工具正确提取标题和摘要，Markdown 文件必须包含 YAML frontmatter：

```markdown
---
title: "文章标题"
author: "作者名"
description: "文章摘要，用于SEO"
---

# 文章正文

正文内容...
```

### 5.2 常见错误

❌ **错误示例**（缺少 frontmatter）：
```markdown
# 文章标题

正文...
```

这会导致标题显示为 `temp-article`。

✅ **正确示例**：
```markdown
---
title: "GPT-5.4 vs Claude Opus 4.6：一张图看懂Agent王座更迭"
---

# GPT-5.4 vs Claude Opus 4.6：一张图看懂Agent王座更迭

正文...
```

### 5.3 支持的 Markdown 语法

- 标准 Markdown：标题、列表、链接、图片、引用
- GitHub Flavored：表格、任务列表、删除线
- 代码块：语法高亮（需指定语言）
- 数学公式：LaTeX 语法（使用 `$` 或 `$$`）
- Mermaid 图表：流程图、时序图等

---

## 六、使用方法

### 6.1 一键发布

```bash
./publish-to-wechat.sh "你的文章.md"
```

### 6.2 完整流程

1. **编写文章**
   ```bash
   cat > article.md << 'EOF'
   ---
   title: "测试文章"
   ---
   
   # 测试文章
   
   这是正文内容。
   EOF
   ```

2. **运行发布命令**
   ```bash
   ./publish-to-wechat.sh article.md
   ```

3. **扫码登录**（首次使用）
   - 自动打开 Chrome
   - 显示微信公众号二维码
   - 用微信扫码登录

4. **等待自动完成**
   - 脚本自动填充标题
   - 粘贴正文内容
   - 保存为草稿

5. **后台确认群发**
   - 登录 mp.weixin.qq.com
   - 进入「内容管理」→「草稿箱」
   - 预览确认 → 点击「群发」

### 6.3 分步执行（调试使用）

如需单独执行某个步骤：

**仅转换 HTML**：
```bash
cd ~/.openclaw/skills/canghe-markdown-to-html
bun scripts/main.ts article.md --theme grace
```

**仅发布 HTML**：
```bash
cd ~/.openclaw/skills/canghe-post-to-wechat
bun scripts/wechat-article.ts --html article.html
```

---

## 七、主题选择

三种内置主题满足不同风格需求：

### 7.1 Default（经典）⭐推荐

特点：
- 标题居中，带底边装饰
- 二级标题白字彩底
- 表格边框清晰
- 适合专业深度文章

### 7.2 Grace（优雅）

特点：
- 文字阴影效果
- 圆角卡片设计
- 精致引用块
- 适合文艺、品牌调性

### 7.3 Simple（简洁）

特点：
- 现代极简风
- 不对称圆角
- 清爽留白
- 适合轻快、年轻化内容

切换主题：修改脚本中的 `--theme` 参数。

---

## 八、常见问题

| 问题 | 原因 | 解决方案 |
|:---|:---|:---|
| Chrome not found | 环境变量未设置 | 检查 `WECHAT_BROWSER_CHROME_PATH` |
| 标题显示 temp-article | 缺少 frontmatter | 添加 YAML frontmatter |
| 每次都要扫码 | Profile 被清除 | 检查目录权限 |
| 图片无法显示 | 路径错误或不可访问 | 使用 HTTPS 图床链接 |
| 格式错乱 | HTML 生成失败 | 检查依赖是否完整安装 |

---

## 九、最佳实践

1. **文件命名**：`YYYY-MM-DD-文章标题.md`，便于归档
2. **存放位置**：按工作流分区存放（灵感库 → 选题库 → 初稿区 → 已发布）
3. **图片处理**：先上传到图床，使用稳定的外链
4. **首次测试**：用非重要文章验证流程
5. **定期备份**：保留 Markdown 源文件和生成的 HTML

---

## 十、扩展功能

### 10.1 API 模式（全自动）

如需完全自动化（无需扫码）：

1. 获取微信公众号 AppID 和 AppSecret
2. 配置 API 凭证
3. 修改 `EXTEND.md`：`default_publish_method: api`

### 10.2 贴图模式

适合短内容、多图场景：

```bash
bun scripts/wechat-browser.ts \
  --markdown article.md \
  --images ./imgs/
```

---

## 附录 A：SOP_GZH 完整工作流（从选题到发布）

### 阶段1：灵感捕获（素材收集）

**触发条件**：发现优质内容

**执行流程**：
1. **抓取微信文章**：使用 `canghe-url-to-markdown` 技能
2. **原文归档**：保存到 `01-灵感与素材库/1-日常灵感剪报/`
3. **提炼选题**：基于原文提炼 1-3 个不同角度的选题
4. **选题入库**：保存到 `02-选题库/待写选题库/`

**关键命令**：
```bash
export URL_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx -y bun ~/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts \
  "https://mp.weixin.qq.com/s/xxxxx" \
  -o "01-灵感与素材库/1-日常灵感剪报/2026-03-06-文章标题.md"
```

---

### 阶段2：素材沉淀（片段收集）

**触发条件**：遇到金句、数据、逻辑框架

**操作**：存入 `01-灵感与素材库/2-爆款素材片段/`

---

### 阶段3：选题立项与大纲生成

**触发条件**：用户问「今天写什么」

**执行流程**：
1. 列出待写选题库供用户选择
2. 检索关联的灵感原文
3. 生成 3 个不同切入点的大纲
4. 存入 `03-内容工厂/1-大纲挑选区/`

**大纲角度示例**：
- 大纲A：数据硬核派
- 大纲B：故事叙事派  
- 大纲C：实用指南派

---

### 阶段4：初稿打磨

**触发条件**：用户确认某一大纲

**执行流程**：
1. 读取 USER.md 写作风格
2. 调用爆文工作流生成初稿
3. Humanize 分级处理（L2 中度 50-60%）
4. 存入 `03-内容工厂/2-初稿打磨区/`

---

### 阶段5-7：终稿确认与归档

**触发条件**：用户确认终稿并已发布

**执行流程**：
1. 移动文件：`03-内容工厂/2-初稿打磨区/` → `04-已发布归档/公众号已发布/`
2. 更新 YAML 状态为「已发布」
3. 记录发布数据

---

### 阶段8：自动发布（本教程重点）

即正文所述的完整流程：

```bash
./publish-to-wechat.sh "04-已发布归档/公众号已发布/文章.md"
```

**流程**：Markdown → HTML 排版 → 扫码登录 → 填充内容 → 保存草稿 → 后台群发

---

### 完整目录结构

```
mi-xin/
├── 01-灵感与素材库/
│   ├── 1-日常灵感剪报/          # 抓取的原文
│   └── 2-爆款素材片段/          # 金句、数据
├── 02-选题库/
│   └── 待写选题库/              # 策划好的选题
├── 03-内容工厂/
│   ├── 1-大纲挑选区/            # 3个大纲
│   └── 2-初稿打磨区/            # 初稿和终稿
├── 04-已发布归档/
│   └── 公众号已发布/            # 已发布的文章
└── publish-to-wechat.sh         # 一键发布脚本
```

---

## 结语

通过 OpenClaw 搭建的这套自动化流水线，可以将公众号发布的时间从 30 分钟缩短到 1 分钟。更重要的是，它让你可以专注于内容创作本身，而不是繁琐的排版和发布操作。

希望这篇教程对你有帮助。如有问题，欢迎交流讨论。

---

**相关资源**：
- OpenClaw 官方文档：https://docs.openclaw.ai
- 技能仓库：https://github.com/openclaw/skills

**配置日期**：2026-03-06  
**教程版本**：v1.0