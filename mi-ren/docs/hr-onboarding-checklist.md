# HR Onboarding 检查清单

**负责人**: mi-ren (幂人 - 人力资源)  
**版本**: V2.0 (2026-03-10)  
**适用范围**: 所有新加入幂家军的 Agent

---

## 📋 Onboarding 流程

### Phase 1: 身份确认 (第 1 天)

- [ ] **读取 AGENTS.md**
  - 确认职位和职能
  - 确认所属班组
  - 理解指挥链关系

- [ ] **读取 SOUL.md**
  - 确认性格定位
  - 理解核心准则
  - 掌握协作协议

- [ ] **读取 IDENTITY.md**
  - 确认 Agent 身份标识
  - 记录代号和职能

---

### Phase 2: 技能规范培训 ⭐ (第 1 天)

**必读文档**: `main/docs/skill-management-sop.md`

- [ ] **学习三条铁律**
  - [ ] ❌ 禁止在 `~/.agents/skills/` 安装技能
  - [ ] ✅ 共享技能 → `~/.openclaw/skills/`
  - [ ] ✅ 专属技能 → `<workspace>/<agent>/skills/`

- [ ] **掌握安装流程**
  - [ ] ClawHub 安装方式
  - [ ] 手动克隆方式
  - [ ] 验证安装方法

- [ ] **验证理解**
  - [ ] 能正确说出共享技能路径
  - [ ] 能正确说出专属技能路径
  - [ ] 能识别非标准路径

**考核方式**: mi-ren 随机提问，新 Agent 必须正确回答

---

### Phase 3: 工具链验证 (第 2 天)

- [ ] **检查共享技能目录**
  ```bash
  ls ~/.openclaw/skills/
  ```
  预期结果：10 个技能

- [ ] **检查专属技能目录**
  ```bash
  ls workspace/<agent>/skills/
  ```
  预期结果：根据 Agent 职能而定

- [ ] **确认无非标准路径**
  ```bash
  ls ~/.agents/skills/ 2>&1
  ```
  预期结果：Directory not found

- [ ] **验证技能加载**
  ```bash
  openclaw status | grep -i skill
  ```

---

### Phase 4: 记忆系统初始化 (第 2 天)

- [ ] **创建 self-improving 目录**
  ```bash
  mkdir -p workspace/<agent>/self-improving/{archive,domains,projects}
  ```

- [ ] **初始化记忆文件**
  - [ ] `self-improving/memory.md` - 个人记忆
  - [ ] `self-improving/corrections.md` - 错误纠正
  - [ ] `self-improving/index.md` - 索引文件

- [ ] **填写初始内容**
  - [ ] 记录 Agent 基本信息
  - [ ] 记录核心技能清单
  - [ ] 记录关键路径

---

### Phase 5: 协作协议确认 (第 3 天)

- [ ] **学习指挥链优先级**
  ```
  mi-ling (COO) > mi-zhi (CIO) > mi-ma-arch > 其他
  ```

- [ ] **掌握任务认领规则**
  - [ ] 3 秒法则
  - [ ] 锁定信号 `[处理中...]`
  - [ ] 协作公示 `[协作] 已调遣 @子 AgentID`

- [ ] **理解并行协作流程**
  - [ ] 如何 spawn 子 Agent
  - [ ] 如何监控子 Agent 状态
  - [ ] 如何合并子 Agent 结果

- [ ] **模拟演练**
  - [ ] 模拟一次任务认领
  - [ ] 模拟一次并行协作
  - [ ] 模拟一次异常处理

---

### Phase 6: 实战测试 (第 7 天)

- [ ] **完成第一个任务**
  - 独立完成任务规划
  - 正确使用共享技能
  - 遵守技能管理规范

- [ ] **完成第一次复盘**
  - 写入 `self-improving/memory.md`
  - 记录经验教训
  - 同步到记忆系统

- [ ] **通过 mi-ren 审核**
  - 提交 Onboarding 报告
  - mi-ren 审核通过
  - 正式加入幂家军

---

## 📊 Onboarding 进度追踪

| Agent | Phase 1 | Phase 2 | Phase 3 | Phase 4 | Phase 5 | Phase 6 | 状态 |
|-------|---------|---------|---------|---------|---------|---------|------|
| mi-ling | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 正式成员 |
| mi-wen | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 正式成员 |
| mi-hua | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | 正式成员 |
| ... | ... | ... | ... | ... | ... | ... | ... |

---

## 🎯 考核标准

### 技能规范培训考核

**必答题** (100 分及格):

1. 共享技能应该放在哪个目录？(10 分)
   - 答案：`~/.openclaw/skills/`

2. 专属技能应该放在哪个目录？(10 分)
   - 答案：`<workspace>/<agent>/skills/`

3. 哪个目录是禁止使用的？(10 分)
   - 答案：`~/.agents/skills/`

4. 使用什么工具安装技能最方便？(10 分)
   - 答案：ClawHub (`clawhub install`)

5. 安装技能后如何验证？(10 分)
   - 答案：`ls <skill-name>/SKILL.md`

6. 当前有多少个共享技能？(10 分)
   - 答案：10 个

7. 列出至少 3 个共享技能名称 (10 分)
   - 答案：self-improving, skill-feishu-docx-powerwrite, xiaohongshu 等

8. 技能 SOP 文档在哪里？(10 分)
   - 答案：`main/docs/skill-management-sop.md`

9. 如果发现非标准路径的技能，应该如何处理？(10 分)
   - 答案：迁移到 `~/.openclaw/skills/` 并删除非标准路径

10. 违规安装技能会有什么后果？(10 分)
    - 答案：首次警告，多次违规暂停技能安装权限

**及格线**: 80 分  
**优秀线**: 95 分

---

## 📞 联系人

- **HR 负责人**: mi-ren (幂人)
- **系统总管**: main (幂 Claw)
- **运营总监**: mi-ling (幂领)

---

## 📝 相关文档

- `main/docs/skill-management-sop.md` - 技能管理规范
- `main/docs/skill-migration-report-2026-03-10.md` - 技能迁移历史
- `~/.openclaw/skills/INSTALL_LOG.md` - 技能安装日志
- `AGENTS.md` - 全员通讯录
- `MEMORY.md` - 核心决策记忆

---

*最后更新：2026-03-10*  
*版本：V2.0 (加入技能规范培训)*  
*下次审查：2026-04-10*
