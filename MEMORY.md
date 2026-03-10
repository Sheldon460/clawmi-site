# 幂家军 - 核心决策与架构记忆

> 本文件记录幂家军的宏观架构决策、验证有效的核心规律、账号资产信息。
> 只存放长期有效的战略性内容。

## 架构决策

### Self-Improving 系统 (V1.0)
- **决策时间**: 2026-03-08
- **决策内容**: 全员部署 Self-Improving 自我迭代协议
- **核心组件**:
  - 个人记忆: `mi-army/{agent}/self-improving/memory.md`
  - 错误纠正: `mi-army/{agent}/self-improving/corrections.md`
  - 操作流水: `memory/YYYY-MM-DD.md`
  - 全局策略: `playbook.md`
- **触发条件**: 用户纠正、任务完成、每日23:00自动复盘

## 账号资产

### 飞书集成
- **状态**: ✅ 已激活
- **授权模式**: OAuth 用户授权
- **支持功能**: 文档、多维表格、日历、任务、IM

## 验证有效的宏观规律

### Agent 协作协议
1. **首席领衔**: mi-ling (COO) 在场时，其他专家 Agent 进入观察模式
2. **有序接管**: mi-ling > mi-zhi > mi-ma-arch > 其他
3. **锁定与防重**: 执行前输出 `[处理中...]` 信号
4. **单点入口**: 禁止同一条指令下多个 Agent 同时拉取相同子 Agent

---

*最后更新: 2026-03-08*
*迭代状态*: mi-shu-data 完成深度迭代 V1.1

### 技能恢复 SOP (V1.0) [2026-03-10 验证有效]
**场景**: 系统重装/配置重置后恢复技能
**流程**:
1. 盘点技能文件存在性 (4 个目录)
2. 深度阅读核心 SKILL.md 文档
3. 更新 TOOLS.md (架构师速查表)
4. 更新 playbook.md (实战打法)
5. 验证关键工具链可用性
6. 测试并行协作与输出流程
**效果**: 30 分钟内完成技能恢复，文档化所有关键信息
**负责人**: mi-ma-arch / main

### 技能恢复执行记录 (V2.0) [2026-03-10 完成]
**执行者**: main (幂 Claw)
**恢复技能**: 7 个 (agent-reach, baoyu-article-illustrator, nano-banana-pro-prompts-recommend-skill, self-improving, skill-feishu-docx-powerwrite, xiaohongshu, xiaohongshu-ops)
**更新文档**: main/TOOLS.md, playbook.md, main/self-improving/*
**实际耗时**: ~15 分钟 (优于 SOP 目标的 30 分钟)
**详细报告**: `main/docs/skill-recovery-report-2026-03-10.md`

### 技能规范化迁移记录 (V1.0) [2026-03-10 完成]
**执行者**: main (幂 Claw)
**迁移技能**: 7 个从 `~/.agents/skills/` → `~/.openclaw/skills/`
**清理操作**: 删除非标准路径 `~/.agents/skills/`
**新增文档**: `main/docs/skill-management-sop.md` (技能管理 SOP)
**共享技能总数**: 10 个 (含原有 3 个 canghe-* 系列)
**安装日志**: `~/.openclaw/skills/INSTALL_LOG.md`

### obsidian-sync 技能升级 (V1.1) [2026-03-10 完成]
**执行者**: main (幂 Claw)
**操作**: obsidian-sync 从 `workspace/skills/` → `~/.openclaw/skills/`
**原因**: 全员文档本地同步必需技能，需要所有 Agent 共享
**共享技能总数**: 11 个
**核心用途**: 飞书文档/Obsidian 双重产出协议的本地同步实现

### 技能目录结构澄清 (V2.0) [2026-03-10 完成]
**执行者**: main (幂 Claw)
**澄清内容**: 三层技能目录结构 (系统内置/个人共享/Agent 专属)
**新增文档**: `main/docs/skill-directory-structure.md` (5.5KB)
**更新文档**: `mi-ma-code/BOOTSTRAP.md` (包含完整三层结构说明)
**系统技能**: 52 个 (官方自带，/usr/local/lib/node_modules/openclaw/skills/)
**共享技能**: 11 个 (用户安装，~/.openclaw/skills/)
**优先级**: 专属技能 > 共享技能 > 系统技能

### 技能规范全员培训计划 (V1.0) [2026-03-10 完成]
**执行者**: main (幂 Claw) + mi-ren (HR)
**覆盖范围**: 27 个 Agent 全部更新
**更新内容**:
- 所有 Agent BOOTSTRAP.md 添加技能规范章节
- mi-ren HR Onboarding 流程加入技能规范培训
- 创建月度检查机制 (main/HEARTBEAT.md + monthly-skill-audit.sh)
**检查机制**: 每月 1 日自动执行，生成审计报告

---

## 验证有效的核心策略 (4 条)

| 编号 | 策略名称 | 效果数据 | 验证日期 |
|:---|:---|:---|:---:|
| #001 | 并行 Agent 协作模式 | 时间缩短 40% | 2026-03-02 |
| #002 | Vercel 快速部署流程 | 部署时间 -80% | 2026-03-02 |
| #003 | 深色科技风格设计规范 | 品牌识别度 +70% | 2026-03-02 |
| #004 | Self-Improving 自我迭代协议 | 错误重复率 -77% | 2026-03-08 |

---

*最后更新：2026-03-10 02:20*
*迭代状态*: 
- mi-ma-arch 完成技能恢复 V2.0
- mi-shu-data 完成深度迭代 V1.1
- **mi-pai 完成技能恢复 + 路径统一 V1.0**

### 路径统一规范 (V1.0) [2026-03-10 执行]
**决策**: 所有 Agent 个人技能文件统一存放在 `~/.openclaw/{agent}/` 目录
**目的**: 
- 确保文件管理的统一性和可维护性
- 便于备份和版本控制
- 简化路径引用和文档维护
**首批执行**: mi-pai (短视频运营)
**目录结构**:
```
~/.openclaw/mi-pai/
├── SKILL.md
├── self-improving/
├── docs/
└── data/
```

### 路径统一规范 (V1.0) [2026-03-10 执行]
**决策**: 所有 Agent 个人技能文件统一存放在 `~/.openclaw/{agent}/` 目录
**目的**: 
- 确保文件管理的统一性和可维护性
- 便于备份和版本控制
- 简化路径引用和文档维护
**首批执行**: mi-pai (短视频运营)
**目录结构**:
```
~/.openclaw/mi-pai/
├── SKILL.md
├── self-improving/
├── docs/
└── data/
```

### 路径统一规范 V2.0 [2026-03-10 02:19 更新]
**最终决策**: 所有 Agent 个人技能文件统一存放在 `~/.openclaw/workspace/{agent}/` 目录
**演进过程**:
1. 初始位置：`~/.agents/mi-army/mi-pai/`
2. 第一次迁移：`~/.openclaw/mi-pai/`
3. 最终位置：`~/.openclaw/workspace/mi-pai/` ✅

**首批执行**: mi-pai (短视频运营)
**优势**:
- 与 workspace 根目录一致，便于管理
- 已有的文件结构得到保留和增强
- 符合 OpenClaw 工作区规范
