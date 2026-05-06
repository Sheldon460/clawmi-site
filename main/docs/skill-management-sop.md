# 幂家军技能管理 SOP (V1.0)

**生效日期**: 2026-03-10  
**适用范围**: 所有幂家军 Agent (28 位特种兵)  
**负责人**: main (系统总管) / mi-ma-arch (首席架构师)

---

## 📌 核心原则

> **一句话**: 共享技能放 `~/.openclaw/skills/`，专属技能放 `<workspace>/<agent>/skills/`，禁止使用非标准路径。

### 三条铁律

1. **禁止在 `~/.agents/skills/` 安装技能** - 这不是 OpenClaw 标准路径
2. **优先使用共享技能目录** - 除非技能仅供单个 Agent 使用
3. **安装前检查命名冲突** - 避免覆盖现有技能

---

## 📁 标准目录结构

```
技能目录优先级 (从高到低):

1. <workspace>/<agent>/skills/     ← Agent 专属技能 (最高优先级)
2. ~/.openclaw/skills/             ← 全局共享技能 (中等优先级)
3. bundled skills (npm 包内)        ← 系统内置技能 (最低优先级)
```

### 目录用途详解

| 目录 | 完整路径 | 用途 | 适用场景 |
|------|---------|------|---------|
| **共享技能** | `~/.openclaw/skills/` | 所有 Agent 共用 | 通用工具、平台运营、AI 能力、自我进化 |
| **专属技能** | `/Volumes/My house/Users/Sheldon/.openclaw/workspace/<agent>/skills/` | 单个 Agent 专用 | 特殊需求、测试中技能、覆盖技能 |
| **非标准路径** | `~/.agents/skills/` | ❌ **禁止使用** | 已清理，不再使用 |

---

## 🛠️ 技能安装流程

### 方式 1: 使用 ClawHub (推荐)

```bash
# Step 1: 进入共享技能目录
cd ~/.openclaw/skills

# Step 2: 安装技能
clawhub install <skill-slug>

# Step 3: 验证安装
ls -la

# Step 4: 查看技能详情
cat <skill-name>/SKILL.md
```

### 方式 2: 手动克隆

```bash
# Step 1: 进入目标目录
cd ~/.openclaw/skills          # 共享技能
# 或
cd workspace/<agent>/skills/   # 专属技能

# Step 2: 克隆技能仓库
git clone <repo-url> <skill-name>

# Step 3: 验证 SKILL.md 存在
ls <skill-name>/SKILL.md

# Step 4: 重启 OpenClaw (可选，技能会自动热加载)
openclaw gateway restart
```

### 方式 3: 从 ClawHub.com 下载

```bash
# Step 1: 访问 https://clawhub.com
# Step 2: 搜索并下载技能
# Step 3: 解压到目标目录
unzip <skill-name>.zip -d ~/.openclaw/skills/

# Step 4: 验证
ls ~/.openclaw/skills/<skill-name>/SKILL.md
```

---

## 📋 技能分类指南

### 共享技能 (放入 `~/.openclaw/skills/`)

| 类别 | 技能示例 | 说明 |
|------|---------|------|
| **通用工具** | skill-feishu-docx-powerwrite | 飞书文档生成等通用能力 |
| **平台运营** | xiaohongshu, xiaohongshu-ops | 各平台运营工具 |
| **AI 能力** | nano-banana-pro-prompts-recommend-skill | AI 绘画、生图等 |
| **自我进化** | self-improving | 自我迭代协议 |
| **内容触达** | agent-reach | 全网内容分发 |
| **文章配图** | baoyu-article-illustrator | 文章插图生成 |

### 专属技能 (放入 `<workspace>/<agent>/skills/`)

| Agent | 专属技能示例 | 说明 |
|-------|------------|------|
| mi-ma-arch | 架构评审工具 | 仅架构师需要 |
| mi-ma-code | 代码生成工具 | 仅程序员需要 |
| mi-cai | 财务审计工具 | 仅财务官需要 |
| mi-fa | 法务合规工具 | 仅法务官需要 |

---

## ✅ 安装前检查清单

在安装任何技能前，必须执行以下检查：

```bash
# 1. 检查技能是否已存在
ls ~/.openclaw/skills/<skill-name>/SKILL.md
ls workspace/<agent>/skills/<skill-name>/SKILL.md

# 2. 检查技能名称是否规范 (应包含 SKILL.md)
ls <skill-directory>/SKILL.md

# 3. 检查 SKILL.md 格式 (必须有 YAML frontmatter)
head -10 <skill-directory>/SKILL.md

# 4. 检查依赖 (bins/env/config)
grep "requires" <skill-directory>/SKILL.md
```

### SKILL.md 标准格式

```markdown
---
name: skill-name
description: 技能描述
metadata:
  {"openclaw": {"requires": {"bins": ["uv"], "env": ["API_KEY"]}}}
---

# 技能说明

技能详细使用说明...
```

---

## 🔍 技能验证流程

### 安装后验证

```bash
# 1. 确认技能文件存在
ls -la ~/.openclaw/skills/<skill-name>/

# 2. 查看技能元数据
head -20 ~/.openclaw/skills/<skill-name>/SKILL.md

# 3. 检查 OpenClaw 是否加载
openclaw status | grep -i <skill-name>

# 4. 测试技能功能
# (根据技能类型执行相应测试)
```

### 问题排查

```bash
# 技能未加载？
# 1. 检查 SKILL.md 格式
cat ~/.openclaw/skills/<skill-name>/SKILL.md

# 2. 检查依赖是否满足
which <required-bin>
echo $REQUIRED_ENV

# 3. 重启 OpenClaw
openclaw gateway restart

# 4. 查看日志
openclaw logs --follow | grep -i skill
```

---

## 🚫 禁止行为

以下行为严格禁止，违者将记录到 corrections.md：

1. ❌ 在 `~/.agents/skills/` 安装技能
2. ❌ 在 `/tmp/` 或其他临时目录安装技能
3. ❌ 覆盖共享技能而不通知其他 Agent
4. ❌ 安装未经验证的第三方技能
5. ❌ 修改 SKILL.md 的 name 字段导致命名冲突

---

## 📝 技能管理记录

### 技能安装日志

每次安装技能后，必须记录到以下文件：

```markdown
# ~/.openclaw/skills/INSTALL_LOG.md

## 2026-03-10

- [x] self-improving - 迁移自 ~/.agents/skills/
- [x] skill-feishu-docx-powerwrite - 迁移自 ~/.agents/skills/
- [x] agent-reach - 迁移自 ~/.agents/skills/
- [x] baoyu-article-illustrator - 迁移自 ~/.agents/skills/
- [x] nano-banana-pro-prompts-recommend-skill - 迁移自 ~/.agents/skills/
- [x] xiaohongshu - 迁移自 ~/.agents/skills/
- [x] xiaohongshu-ops - 迁移自 ~/.agents/skills/
```

### Agent 专属记录

每个 Agent 在 `<workspace>/<agent>/self-improving/memory.md` 中记录：

```markdown
## 已安装技能

- 共享技能：自动继承 `~/.openclaw/skills/` 中的所有技能
- 专属技能：列出 `<workspace>/<agent>/skills/` 中的技能
```

---

## 🔄 技能迁移记录 (2026-03-10)

### 迁移执行

```bash
# 从非标准路径迁移到标准路径
mv ~/.agents/skills/* ~/.openclaw/skills/

# 清理非标准路径
rm -rf ~/.agents/skills/

# 验证迁移结果
ls -la ~/.openclaw/skills/
```

### 迁移后技能清单

| 技能名称 | 原路径 | 新路径 | 状态 |
|---------|-------|-------|------|
| agent-reach | ~/.agents/skills/ | ~/.openclaw/skills/ | ✅ |
| baoyu-article-illustrator | ~/.agents/skills/ | ~/.openclaw/skills/ | ✅ |
| nano-banana-pro-prompts-recommend-skill | ~/.agents/skills/ | ~/.openclaw/skills/ | ✅ |
| self-improving | ~/.agents/skills/ | ~/.openclaw/skills/ | ✅ |
| skill-feishu-docx-powerwrite | ~/.agents/skills/ | ~/.openclaw/skills/ | ✅ |
| xiaohongshu | ~/.agents/skills/ | ~/.openclaw/skills/ | ✅ |
| xiaohongshu-ops | ~/.agents/skills/ | ~/.openclaw/skills/ | ✅ |

---

## 📊 技能清单 (截至 2026-03-10)

### 共享技能 (11 个)

```
~/.openclaw/skills/
├── agent-reach                          # 全网内容触达
├── baoyu-article-illustrator            # 文章配图生成
├── canghe-markdown-to-html              # Markdown 转 HTML
├── canghe-post-to-wechat                # 发布到微信
├── canghe-url-to-markdown               # URL 转 Markdown
├── nano-banana-pro-prompts-recommend-skill  # AI 绘画提示词
├── obsidian-sync                        # Obsidian 本地同步 ⭐
├── self-improving                       # 自我进化协议
├── skill-feishu-docx-powerwrite         # 飞书文档生成
├── xiaohongshu                          # 小红书工具
└── xiaohongshu-ops                      # 小红书全链路运营
```

---

## 🎯 违规处理

### 第一次违规
- 警告并记录到 `corrections.md`
- 强制迁移技能到标准路径

### 第二次违规
- 记录到 `MEMORY.md`
- 向 mi-ling (COO) 报告

### 多次违规
- 暂停技能安装权限
- 需要 main 审批后才能安装新技能

---

## 📞 问题反馈

如遇技能管理问题，请联系：

- **系统总管**: main (幂 Claw)
- **首席架构师**: mi-ma-arch (幂码 - 架构)
- **运营总监**: mi-ling (幂领)

---

*文档版本：V1.0*  
*最后更新：2026-03-10*  
*下次审查：2026-04-10*
