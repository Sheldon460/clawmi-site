# OpenClaw 技能目录结构详解

**版本**: V2.0  
**更新日期**: 2026-03-10  
**适用范围**: 所有幂家军 Agent

---

## 📚 三层技能目录结构

OpenClaw 技能系统采用**三层目录结构**，每层有不同的用途和优先级。

```
优先级从高到低：

1. <workspace>/<agent>/skills/     ← Agent 专属技能 (最高优先级)
2. ~/.openclaw/skills/             ← 个人共享技能 (中等优先级)
3. /usr/local/lib/node_modules/openclaw/skills/ ← 系统内置技能 (最低优先级)
```

---

## 1️⃣ 系统级技能库 (内置)

**路径**: `/usr/local/lib/node_modules/openclaw/skills/`

**数量**: 52 个

**性质**: ✅ **官方自带**

### 特点

| 特性 | 说明 |
|------|------|
| **来源** | OpenClaw 安装包自带 |
| **更新** | 随 OpenClaw 更新自动更新 |
| **修改** | ❌ 不建议修改 (只读) |
| **可见性** | 所有 Agent 默认可用 |
| **优先级** | 最低 (可被覆盖) |

### 典型技能列表

```
/usr/local/lib/node_modules/openclaw/skills/
├── 1password                    # 1Password 集成
├── apple-notes                  # Apple Notes
├── apple-reminders              # Apple Reminders
├── bear-notes                   # Bear Notes
├── blogwatcher                  # 博客监控
├── blucli                       # Bluebubbles CLI
├── camsnap                      # 摄像头快照
├── canvas                       # Canvas 控制
├── clawhub                      # ClawHub 技能市场
├── coding-agent                 # 编码 Agent
├── discord                      # Discord 集成
├── eightctl                     # Eight 控制
├── gemini                       # Gemini CLI
├── gh-issues                    # GitHub Issues
├── github                       # GitHub CLI
├── gifgrep                      # GIF 搜索
├── himalaya                     # 邮件 CLI
├── imsg                         # iMessage
├── mcporter                     # MCP 客户端
├── nano-pdf                     # PDF 编辑
├── obsidian                     # Obsidian CLI
├── openai-whisper               # 语音转文字
├── peekaboo                     # macOS UI 自动化
├── summarize                    # 内容摘要
├── things-mac                   # Things 3
├── video-frames                 # 视频帧提取
├── weather                      # 天气查询
└── ... (更多)
```

### 使用建议

- ✅ 直接使用，无需安装
- ✅ 可作为技能开发参考
- ❌ 不要直接修改文件
- ⚠️ 如需定制，请在共享技能目录创建同名技能覆盖

---

## 2️⃣ 个人技能目录 (共享)

**路径**: `~/.openclaw/skills/`

**数量**: 11 个 (截至 2026-03-10)

**性质**: ✅ **用户安装**

### 特点

| 特性 | 说明 |
|------|------|
| **来源** | 用户从 ClawHub 安装或手动克隆 |
| **更新** | 用户手动更新 (`clawhub update`) |
| **修改** | ✅ 可自由修改 |
| **可见性** | 所有 Agent 共享 |
| **优先级** | 中等 (可覆盖系统技能，可被专属技能覆盖) |

### 当前技能列表 (幂家军)

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

### 安装方式

```bash
# 方式 1: ClawHub (推荐)
cd ~/.openclaw/skills
clawhub install <skill-slug>

# 方式 2: 手动克隆
cd ~/.openclaw/skills
git clone <repo-url> <skill-name>

# 方式 3: 从 ClawHub.com 下载
# 访问 https://clawhub.com → 下载 → 解压到 ~/.openclaw/skills/
```

### 使用建议

- ✅ 优先安装共享技能 (所有 Agent 可用)
- ✅ 从 ClawHub 安装 (自动更新)
- ✅ 定期更新 (`clawhub update --all`)
- ⚠️ 修改前备份原文件

---

## 3️⃣ Agent 专属技能 (私有)

**路径**: `<workspace>/<agent>/skills/`

**数量**: 根据需求安装

**性质**: ⚠️ **仅当前 Agent 使用**

### 特点

| 特性 | 说明 |
|------|------|
| **来源** | Agent 专属安装或开发 |
| **更新** | Agent 自行维护 |
| **修改** | ✅ 完全控制 |
| **可见性** | 仅当前 Agent 可用 |
| **优先级** | 最高 (覆盖所有同名技能) |

### 典型使用场景

| Agent | 专属技能示例 |
|-------|------------|
| mi-ma-arch | 架构评审工具、设计模式库 |
| mi-ma-code | 代码生成器、单元测试工具 |
| mi-cai | 财务审计工具、Token 精算器 |
| mi-fa | 法务合规检查器、版权管理工具 |
| mi-wen | 文案风格库、修辞工具 |

### 安装方式

```bash
# 进入专属技能目录
cd /Volumes/"My house"/Users/Sheldon/.openclaw/workspace/<agent>/skills/

# 安装专属技能
git clone <repo-url> <skill-name>

# 验证
ls <skill-name>/SKILL.md
```

### 使用建议

- ⚠️ 仅在特殊需求时使用
- ✅ 优先使用共享技能
- ✅ 命名避免与共享技能冲突
- ⚠️ 定期审查是否可迁移到共享目录

---

## 🔄 优先级覆盖规则

### 覆盖示例

假设同名技能 `nano-banana` 在三个目录都存在：

```bash
# 1. 专属技能 (最高优先级)
/workspace/mi-hua/skills/nano-banana/SKILL.md  ✅ 优先使用

# 2. 共享技能 (中等优先级)
~/.openclaw/skills/nano-banana/SKILL.md        ⚠️ 被覆盖

# 3. 系统技能 (最低优先级)
/usr/local/lib/node_modules/openclaw/skills/nano-banana/SKILL.md  ⚠️ 被覆盖
```

### 覆盖场景

| 场景 | 推荐做法 |
|------|---------|
| 修改系统技能行为 | 在共享目录创建同名技能 |
| Agent 特殊需求 | 在专属目录创建技能 |
| 临时测试 | 在专属目录创建，测试后删除或迁移 |
| 共享定制版本 | 在共享目录创建，命名加后缀 (如 `nano-banana-custom`) |

---

## 📊 技能加载流程

OpenClaw 启动时按以下顺序加载技能：

```
1. 加载系统内置技能 (52 个)
   ↓
2. 加载个人共享技能 (11 个) - 覆盖同名系统技能
   ↓
3. 加载 Agent 专属技能 - 覆盖同名共享技能
   ↓
4. 构建最终技能列表 (去重后)
   ↓
5. 注入到 Agent 提示词
```

---

## 🎯 技能管理最佳实践

### 推荐做法

1. **优先共享**: 能共享的技能不专属
2. **命名规范**: 避免同名冲突
3. **定期清理**: 删除不再使用的专属技能
4. **文档化**: 在技能目录添加 README.md
5. **版本控制**: 使用 Git 管理专属技能

### 禁止行为

1. ❌ 修改系统技能目录文件
2. ❌ 在 `~/.agents/skills/` 安装技能 (非标准路径)
3. ❌ 覆盖共享技能不通知其他 Agent
4. ❌ 安装未经验证的第三方技能

---

## 📁 当前状态总览 (截至 2026-03-10)

| 目录类型 | 路径 | 技能数 | 状态 |
|---------|------|--------|------|
| 系统内置 | `/usr/local/lib/node_modules/openclaw/skills/` | 52 个 | ✅ 完整 |
| 个人共享 | `~/.openclaw/skills/` | 11 个 | ✅ 规范 |
| Agent 专属 | `<workspace>/*/skills/` |  varies | ⚠️ 按需 |

---

## 📞 相关文档

- **技能管理 SOP**: `main/docs/skill-management-sop.md`
- **安装日志**: `~/.openclaw/skills/INSTALL_LOG.md`
- **技能迁移报告**: `main/docs/skill-migration-report-2026-03-10.md`
- **obsidian-sync 迁移**: `main/docs/obsidian-sync-migration-2026-03-10.md`

---

*文档版本：V2.0*  
*最后更新：2026-03-10*  
*下次审查：2026-04-10*
