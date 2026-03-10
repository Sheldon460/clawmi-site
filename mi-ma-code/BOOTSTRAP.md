# 幂码 - 编程 启动初始化序列

## 🚀 启动流程

1. **载入灵魂档案** - 读取 `SOUL.md` 确认人格
2. **扫描武器库** - 读取 `TOOLS.md` 确认可用工具
3. **加载记忆** - 读取 `self-improving/memory.md` 和 `corrections.md`
4. **发送就绪** - 在所属飞书作战室发送就绪指令

---

## 📚 技能目录结构 (重要)

OpenClaw 技能分为**三个层级**：

### 1️⃣ 系统级技能库 (内置)
**路径**: `/usr/local/lib/node_modules/openclaw/skills/`  
**数量**: 52 个  
**性质**: ✅ **官方自带**，随 OpenClaw 安装自动部署  
**示例**: 1password, apple-notes, blogwatcher, coding-agent, gemini, github, weather 等

**特点**:
- 只读，不建议修改
- 所有 Agent 默认可用
- 更新 OpenClaw 时自动更新

### 2️⃣ 个人技能目录 (共享)
**路径**: `~/.openclaw/skills/`  
**数量**: 11 个  
**性质**: ✅ **用户安装**，所有 Agent 共享  
**示例**: self-improving, skill-feishu-docx-powerwrite, obsidian-sync, xiaohongshu 等

**特点**:
- 可自由添加/删除
- 所有 Agent 共享
- 推荐从 ClawHub 安装

### 3️⃣ Agent 专属技能 (私有)
**路径**: `<workspace>/mi-ma-code/skills/`  
**数量**: 根据需求安装  
**性质**: ⚠️ **仅 mi-ma-code 使用**  
**示例**: 编程专用工具、架构师定制技能等

**特点**:
- 仅当前 Agent 可用
- 优先级最高 (可覆盖共享技能)
- 用于特殊需求

---

## 📊 优先级规则

```
专属技能 (最高) → 个人共享技能 → 系统内置技能 (最低)
```

**示例**: 如果同名技能在三个目录都存在：
- `<workspace>/mi-ma-code/skills/nano-banana/SKILL.md` ✅ 优先使用
- `~/.openclaw/skills/nano-banana/SKILL.md` ⚠️ 被覆盖
- `/usr/local/lib/node_modules/openclaw/skills/nano-banana/SKILL.md` ⚠️ 被覆盖

---

## 📚 技能规范 (必须遵守)

**首次启动必读**: `main/docs/skill-management-sop.md`

### 三条铁律
1. ❌ 禁止在 `~/.agents/skills/` 安装技能
2. ✅ 共享技能 → `~/.openclaw/skills/`
3. ✅ 专属技能 → `<workspace>/mi-ma-code/skills/`

### 安装技能流程
```bash
# 1. 进入共享技能目录
cd ~/.openclaw/skills

# 2. 使用 ClawHub 安装
clawhub install <skill-slug>

# 3. 验证安装
ls <skill-name>/SKILL.md
```

### 当前共享技能 (11 个)
- self-improving, skill-feishu-docx-powerwrite, agent-reach
- baoyu-article-illustrator, nano-banana-pro-prompts-recommend-skill
- xiaohongshu, xiaohongshu-ops, canghe-* (3 个)
- obsidian-sync

**详见**: `~/.openclaw/skills/INSTALL_LOG.md`

---

## 📁 关键路径

| 类型 | 路径 | 数量 | 说明 |
|------|------|------|------|
| 系统内置 | `/usr/local/lib/node_modules/openclaw/skills/` | 52 个 | 官方自带 |
| 共享技能 | `~/.openclaw/skills/` | 11 个 | 用户安装 |
| 专属技能 | `workspace/mi-ma-code/skills/` | 0 个 | 按需安装 |
| 技能 SOP | `main/docs/skill-management-sop.md` | - | 管理规范 |
| 个人记忆 | `self-improving/memory.md` | - | 经验记录 |

---

*最后更新：2026-03-10*  
*技能规范：V1.0*  
*目录结构：V2.0 (澄清三层结构)*
