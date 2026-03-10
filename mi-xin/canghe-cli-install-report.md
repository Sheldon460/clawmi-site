# canghe-url-to-markdown CLI 安装报告

## 任务执行摘要

✅ **任务完成**：已成功搜索并安装 canghe-url-to-markdown CLI 工具

---

## 搜索结果

### 1. GitHub 仓库信息

- **仓库**: `freestylefly/canghe-skills`
- **描述**: 苍何分享的 Claude Code 技能集，提升日常工作效率
- **技能分类**: 属于 `utility-skills` 插件包
- **仓库地址**: github.com/freestylefly/canghe-skills

### 2. 独立 CLI 包确认

❌ **不是独立 npm 包**：canghe-url-to-markdown 不是独立的 npm 包，而是 canghe-skills 技能集中的一个技能模块。

✅ **执行方式**: 通过 `npx -y bun <script-path>` 运行

---

## 安装详情

### 安装位置

```
~/.openclaw/skills/canghe-url-to-markdown/
```

### 目录结构

```
canghe-url-to-markdown/
├── SKILL.md          # 技能说明文档
└── scripts/
    ├── main.ts       # CLI 入口脚本
    ├── cdp.ts        # Chrome CDP 连接模块
    ├── html-to-markdown.ts  # HTML 转 Markdown 核心逻辑
    ├── paths.ts      # 路径处理模块
    └── constants.ts  # 常量配置
```

### 安装方法

已手动从 GitHub 仓库复制技能到本地：

```bash
cp -r /tmp/canghe-skills-check/skills/canghe-url-to-markdown ~/.openclaw/skills/
```

---

## 环境验证

### 依赖检查

| 依赖 | 状态 | 版本/路径 |
|------|------|----------|
| Bun | ✅ 已安装 | 1.3.5 |
| npx | ✅ 已安装 | 11.6.1 |
| Chrome | ✅ 已找到 | /Volumes/My house/Applications/Google Chrome.app |

### 环境变量配置

需要设置 Chrome 路径（如未设置）：

```bash
export URL_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

### 命令验证

```bash
# 测试帮助命令
export URL_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx -y bun ~/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts --help

# 输出: Usage: bun main.ts <url> [-o output.md] [--wait] [--timeout ms]
```

✅ **验证通过**: CLI 工具可正常执行

---

## 使用方法

### 基本用法

```bash
# 自动模式（默认）- 页面加载后自动抓取
npx -y bun ~/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts <url>

# 等待模式 - 用户确认后抓取（适用于需要登录的页面）
npx -y bun ~/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts <url> --wait

# 指定输出文件
npx -y bun ~/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts <url> -o output.md
```

### 选项参数

| 选项 | 说明 |
|------|------|
| `<url>` | 要抓取的 URL |
| `-o <path>` | 输出文件路径（默认：自动生成） |
| `--wait` | 等待用户信号后抓取 |
| `--timeout <ms>` | 页面加载超时（默认：30000） |

### 输出格式

自动生成带 YAML frontmatter 的 Markdown 文件：

```yaml
---
url: 文章链接
title: 文章标题
description: 文章描述
author: 作者
published: 发布日期
captured_at: 抓取时间
---

# 文章正文内容
...
```

### 输出目录

```
url-to-markdown/<domain>/<slug>.md
```

---

## 官方安装方式（可选）

如果需要安装完整的 canghe-skills 技能集，可使用官方推荐方式：

```bash
# 方式 1: 快速安装（需要 skills CLI）
npx skills add freestylefly/canghe-skills

# 方式 2: 通过 Claude Code 插件市场
/plugin marketplace add freestylefly/canghe-skills

# 方式 3: 直接告诉 Claude Code
"请帮我安装 github.com/freestylefly/canghe-skills 中的 Skills"
```

---

## 结论

✅ **canghe-url-to-markdown CLI 已成功安装并验证可用**

- 安装位置：`~/.openclaw/skills/canghe-url-to-markdown/`
- 依赖环境：Bun + npx + Chrome CDP
- 使用方法：`npx -y bun <script-path> <url> [options]`
- 适用于：微信公众号文章、需要 JavaScript 渲染的网页抓取

---

**报告生成时间**: 2026-03-09 18:45 GMT+8
**执行 Agent**: mi-xin (subagent: search-canghe-cli)
