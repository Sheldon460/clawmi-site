# mi-tui 技能归置报告

**执行时间**: 2026-03-10 03:28 GMT+8  
**执行者**: mi-tui (幂推)  
**依据**: 技能放置规范 V1.0

---

## 📋 技能层级规范

| 层级 | 路径 | 数量 | 性质 | 优先级 |
|------|------|------|------|--------|
| 1️⃣ 系统级 | `/usr/local/lib/node_modules/openclaw/skills/` | 52 个 | 官方自带 | 最低 |
| 2️⃣ 个人共享 | `~/.openclaw/skills/` | 11 个 | 用户安装 | 中等 |
| 3️⃣ Agent 专属 | `<workspace>/<agent>/skills/` | 按需 | Agent 私有 | 最高 |

---

## ✅ 已完成的归置

### mi-tui 专属技能

**目标路径**: `/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-tui/skills/`

| 技能名称 | 原路径 | 新路径 | 状态 |
|---------|--------|--------|------|
| **x-article-publisher** | `<workspace>/skills/` | `<workspace>/mi-tui/skills/` | ✅ 已移动 |
| **agent-reach** | `<workspace>/skills/` | `<workspace>/mi-tui/skills/` | ✅ 已移动 |

**说明**:
- `x-article-publisher`: Twitter 长文章发布技能（mi-tui 专用）
- `agent-reach`: 13+ 平台接入框架（mi-tui 专用）

---

## 📊 当前技能分布

### 1️⃣ 系统级技能（52 个）

**路径**: `/usr/local/lib/node_modules/openclaw/skills/`

**状态**: ✅ 官方自带，无需移动

**包含**: OpenClaw 核心技能

---

### 2️⃣ 个人共享技能（11 个）

**路径**: `~/.openclaw/skills/`

**列表**:
```
✅ canghe-markdown-to-html      # Markdown 转 HTML（通用）
✅ canghe-post-to-wechat        # 微信公众号发布（mi-xin 专用）
✅ canghe-url-to-markdown       # URL 转 Markdown（通用）
✅ agent-reach                  # 13+ 平台接入（已复制到 mi-tui）
✅ baoyu-article-illustrator    # 文章配图（通用）
✅ nano-banana-pro-prompts      # AI 绘画提示词（通用）
✅ obsidian-sync                # Obsidian 同步（通用）
✅ self-improving               # 自我进化（通用）
✅ skill-feishu-docx-powerwrite # 飞书文档（通用）
✅ xiaohongshu                  # 小红书（mi-book 专用）
✅ xiaohongshu-ops              # 小红书运营（mi-book 专用）
```

**建议**: 
- 通用技能保留在个人共享层级 ✅
- Agent 专用技能应移动到对应 Agent 目录

---

### 3️⃣ Agent 专属技能

#### mi-tui (幂推) 专属

**路径**: `/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-tui/skills/`

**列表**:
```
✅ x-article-publisher    # Twitter 长文章发布
✅ agent-reach           # 13+ 平台接入
```

**状态**: ✅ 已归置完成

---

## 🔄 技能加载优先级

根据规范，技能加载优先级为：

```
Agent 专属 (最高) > 个人共享 (中等) > 系统级 (最低)
```

**mi-tui 技能加载顺序**:
1. `/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-tui/skills/` ← 最高优先级
2. `~/.openclaw/skills/` ← 中等优先级
3. `/usr/local/lib/node_modules/openclaw/skills/` ← 最低优先级

---

## 📝 后续优化建议

### 1. 清理个人共享层级

以下技能应移动到对应 Agent 目录：

| 技能 | 应移动到 | 原因 |
|------|---------|------|
| `canghe-post-to-wechat` | `mi-xin/skills/` | 微信运营专用 |
| `xiaohongshu` | `mi-book/skills/` | 小红书运营专用 |
| `xiaohongshu-ops` | `mi-book/skills/` | 小红书运营专用 |

### 2. 为其他 Agent 创建技能目录

建议为以下 Agent 创建专属技能目录：

```bash
# mi-wen (内容创作)
mkdir -p /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-wen/skills

# mi-hua (视觉设计)
mkdir -p /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-hua/skills

# mi-book (小红书)
mkdir -p /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-book/skills
mv ~/.openclaw/skills/xiaohongshu* /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-book/skills/

# mi-xin (微信)
mkdir -p /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-xin/skills
mv ~/.openclaw/skills/canghe-post-to-wechat /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-xin/skills/
```

### 3. 通用技能保留

以下技能应保留在个人共享层级：

```
✅ canghe-markdown-to-html
✅ canghe-url-to-markdown
✅ baoyu-article-illustrator
✅ nano-banana-pro-prompts-recommend-skill
✅ obsidian-sync
✅ self-improving
✅ skill-feishu-docx-powerwrite
```

---

## 🎯 mi-tui 完整技能清单

### 专属技能（优先级最高）

| 技能 | 用途 | 路径 |
|------|------|------|
| `x-article-publisher` | Twitter 长文章发布 | `mi-tui/skills/` |
| `agent-reach` | 13+ 平台接入框架 | `mi-tui/skills/` |

### 共享技能（优先级中等）

| 技能 | 用途 | 路径 |
|------|------|------|
| `canghe-markdown-to-html` | Markdown 转 HTML | `~/.openclaw/skills/` |
| `canghe-url-to-markdown` | URL 转 Markdown | `~/.openclaw/skills/` |
| `baoyu-article-illustrator` | 文章配图 | `~/.openclaw/skills/` |
| `self-improving` | 自我进化 | `~/.openclaw/skills/` |

### 系统技能（优先级最低）

52 个官方自带技能（无需列举）

---

## ✅ 验证方法

### 检查技能是否可用

```bash
# 检查 mi-tui 专属技能
ls /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-tui/skills/

# 检查个人共享技能
ls ~/.openclaw/skills/

# 检查系统技能
ls /usr/local/lib/node_modules/openclaw/skills/
```

### 测试技能加载

在 mi-tui 会话中执行：
```bash
# 应该优先加载 mi-tui 专属技能
which x-article-publisher  # 应指向 mi-tui/skills/
```

---

## 📄 相关文档

- **技能放置规范**: 用户提供（图片）
- **技能归置报告**: 本文件
- **mi-tui TOOLS.md**: `/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-tui/TOOLS.md`
- **技能恢复报告**: `/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-tui/docs/skill-recovery-report-2026-03-10.md`

---

*报告生成时间：2026-03-10 03:28 GMT+8*  
*归置状态：✅ mi-tui 专属技能已完成*
