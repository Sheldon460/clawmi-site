# 幂人 启动序列

## 🚀 启动流程

1. **Initialize components** - 加载系统组件
2. **载入灵魂档案** - 读取 `SOUL.md` 确认人格
3. **扫描武器库** - 读取 `TOOLS.md` 确认可用工具
4. **加载记忆** - 读取 `self-improving/memory.md`

---

## 📚 技能规范 (必须遵守)

**首次启动必读**: `main/docs/skill-management-sop.md`

### 三条铁律
1. ❌ 禁止在 `~/.agents/skills/` 安装技能
2. ✅ 共享技能 → `~/.openclaw/skills/`
3. ✅ 专属技能 → `<workspace>/mi-ren/skills/`

### 安装技能流程
```bash
# 1. 进入共享技能目录
cd ~/.openclaw/skills

# 2. 使用 ClawHub 安装
clawhub install <skill-slug>

# 3. 验证安装
ls <skill-name>/SKILL.md
```

---

## 👥 HR Onboarding 流程

### 新 Agent 入职检查清单

- [ ] **身份确认**
  - 读取 `AGENTS.md` 确认职位和职能
  - 读取 `SOUL.md` 确认性格定位

- [ ] **技能规范培训** ⭐ **新增**
  - 学习 `main/docs/skill-management-sop.md`
  - 确认理解三条铁律
  - 验证技能目录路径正确

- [ ] **工具链验证**
  - 检查 `~/.openclaw/skills/` 共享技能
  - 检查 `<workspace>/<agent>/skills/` 专属技能
  - 确认无 `~/.agents/skills/` 非标准路径

- [ ] **记忆系统初始化**
  - 创建 `self-improving/memory.md`
  - 创建 `self-improving/corrections.md`
  - 创建 `self-improving/index.md`

- [ ] **协作协议确认**
  - 学习指挥链优先级：mi-ling > mi-zhi > mi-ma-arch
  - 理解任务认领规则 (3 秒法则)
  - 掌握并行协作流程

### Onboarding 文档

**必读文档**:
1. `main/docs/skill-management-sop.md` - 技能管理规范
2. `AGENTS.md` - 全员通讯录
3. `MEMORY.md` - 核心决策记忆
4. `playbook.md` - 实战打法手册

**选读文档**:
- `main/TOOLS.md` - 工具速查表
- `main/docs/skill-migration-report-2026-03-10.md` - 技能迁移历史

---

## 📁 关键路径

| 类型 | 路径 |
|------|------|
| 共享技能 | `~/.openclaw/skills/` |
| 专属技能 | `workspace/mi-ren/skills/` |
| 技能 SOP | `main/docs/skill-management-sop.md` |
| 个人记忆 | `self-improving/memory.md` |

---

*最后更新：2026-03-10*  
*技能规范：V1.0*  
*Onboarding 流程：V2.0 (加入技能规范培训)*
