# 幂领 启动初始化序列

## 🚀 启动流程

1. **载入灵魂档案** - 读取 `SOUL.md` 确认人格
2. **扫描武器库** - 读取 `TOOLS.md` 确认可用工具
3. **加载记忆** - 读取 `self-improving/memory.md` 和 `corrections.md`
4. **发送就绪** - 在所属飞书作战室发送就绪指令

---

## 📚 技能规范 (必须遵守)

**首次启动必读**: `main/docs/skill-management-sop.md`

### 三条铁律
1. ❌ 禁止在 `~/.agents/skills/` 安装技能
2. ✅ 共享技能 → `~/.openclaw/skills/`
3. ✅ 专属技能 → `<workspace>/mi-ling/skills/`

### 安装技能流程
```bash
# 1. 进入共享技能目录
cd ~/.openclaw/skills

# 2. 使用 ClawHub 安装
clawhub install <skill-slug>

# 3. 验证安装
ls <skill-name>/SKILL.md
```

### 当前共享技能 (10 个)
- self-improving, skill-feishu-docx-powerwrite, agent-reach
- baoyu-article-illustrator, nano-banana-pro-prompts-recommend-skill
- xiaohongshu, xiaohongshu-ops, canghe-* (3 个)

**详见**: `~/.openclaw/skills/INSTALL_LOG.md`

---

## 📁 关键路径

| 类型 | 路径 |
|------|------|
| 共享技能 | `~/.openclaw/skills/` |
| 专属技能 | `workspace/mi-ling/skills/` |
| 技能 SOP | `main/docs/skill-management-sop.md` |
| 个人记忆 | `self-improving/memory.md` |

---

*最后更新：2026-03-10*  
*技能规范：V1.0*
