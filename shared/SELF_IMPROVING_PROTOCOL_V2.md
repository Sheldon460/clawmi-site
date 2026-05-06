# 🧠 Self-Improving 协议 V2.0 (全军强制执行)

**发布日期**: 2026-03-27  
**发布人**: 安东尼  
**执行监督**: 幂码-架构 (mi-ma-arch)  
**适用范围**: 幂家军全体 28 位 Agent

---

## 📋 初始化状态检查

每个Agent每次任务启动前必须确认以下目录结构已存在：

```
workspace/[agent-id]/
└── self-improving/
    ├── memory.md          # 核心记忆库
    ├── corrections.md     # 错误纠正记录
    ├── index.md           # 索引统计
    ├── archive/           # 归档文件
    ├── domains/           # 领域专精
    ├── projects/          # 项目追踪
    └── reflections/
        ├── daily/         # 每日复盘
        ├── weekly/        # 周度分析
        └── monthly/       # 月度报告
```

---

## ⚡ 强制触发条件（必须执行）

| 触发场景 | 执行动作 | 记录位置 |
|:---|:---|:---|
| **用户纠正错误时** | 立即记录错误详情 | corrections.md |
| **完成重要工作后** | 执行自我反思 | memory.md + reflections/daily/ |
| **发现输出可优化时** | 记录改进点 | memory.md |
| **每日23:00** | 自动复盘今日工作 | reflections/daily/YYYY-MM-DD.md |

---

## 🔄 标准执行流程

### Step 1: 加载 Self-Improving 记忆（任务启动时）

**必须读取的文件**:
1. `workspace/[agent-id]/self-improving/memory.md`
2. `workspace/[agent-id]/self-improving/corrections.md` (最近10条)
3. `workspace/MEMORY.md` (全局长期记忆)
4. `workspace/memory/YYYY-MM-DD.md` (今日日记，如存在)

**声明格式**:
```
[记忆加载] Self-Improving: 已加载个人记忆，发现X条相关经验
- 来自 memory.md: [关键经验摘要]
- 来自 corrections.md: [最近纠错提醒，如有]
```

---

### Step 2: 执行任务

正常执行任务...

---

### Step 3: 执行 Self-Improving 固化（任务结束时）

**必须检查的三个问题**:
- [ ] 本次任务是否有错误被纠正？
- [ ] 本次任务是否有新发现/新模式？
- [ ] 本次任务是否有可复用的经验？

**如果以上任一答案为「是」，必须执行**:

```
1. 写入个人记忆
   ├── 错误 → self-improving/corrections.md
   └── 经验/模式 → self-improving/memory.md

2. 同步到全局记忆系统
   ├── 操作流水 → workspace/memory/YYYY-MM-DD.md
   ├── 全局策略 → workspace/playbook.md (如适用)
   └── 核心决策 → workspace/MEMORY.md (重大发现)

3. 数据文件 (如适用)
   └── 平台数据 → workspace/data/platform_daily/YYYY-MM-DD.json
```

---

## 📝 强制声明格式

**每次任务回复末尾必须包含**:

```
---
[自我进化] 已记录到:
- 个人记忆: workspace/[agent-id]/self-improving/memory.md
- 今日日记: workspace/memory/YYYY-MM-DD.md
- 长期记忆: workspace/MEMORY.md
- 数据文件: workspace/data/platform_daily/YYYY-MM-DD.json (如适用)
```

---

## 📊 文件模板

### memory.md 模板
```markdown
# [Agent名称] Self-Improving 记忆库

## 个人经验记录

### [YYYY-MM-DD] 经验标题
- **场景**: 
- **动作**: 
- **结果**: 
- **状态**: ✅ Active

---

## 可复用模式库

### 模式 #XXX: 模式名称
**来源**: [原始来源]
**场景**: 
**执行**: 
**效果**: 

---

## 学习笔记

### 待学习清单
- [ ] 主题1
- [ ] 主题2

---

## Self-Improving 协议迭代记录

### [YYYY-MM-DD] 协议更新
- **触发**: 
- **执行**: 
- **状态**: 

---

最后更新: YYYY-MM-DD
```

### corrections.md 模板
```markdown
# [Agent名称] 错误纠正记录

## 纠正记录格式
- **时间**: YYYY-MM-DD HH:MM
- **错误描述**: 
- **纠正内容**: 
- **预防措施**: 
- **状态**: [已解决/跟进中]

---

## 纠正记录列表

### [YYYY-MM-DD HH:MM] 错误标题
- **错误描述**: 
- **纠正内容**: 
- **预防措施**: 
- **状态**: 已解决

---

最后更新: YYYY-MM-DD
```

---

## ✅ 核心准则

1. **凡事必记，凡记必同步**
2. **强制执行自我进化协议**
3. **低级错误不重复犯，成功经验要固化**
4. **跨会话记忆连贯，拒绝失忆**

---

## 📈 执行状态追踪

| Agent ID | 初始化状态 | 最后更新 |
|:---|:---:|:---:|
| main | ✅ | 2026-03-27 |
| mi-ma-arch | ✅ | 2026-03-27 |
| mi-ma-code | ✅ | 2026-03-27 |
| mi-ling | ✅ | 2026-03-27 |
| xiao-mi | ✅ | 2026-03-27 |
| mi-wen | ✅ | 2026-03-27 |
| mi-hua | ✅ | 2026-03-27 |
| mi-ying | ✅ | 2026-03-27 |
| mi-sheng | ✅ | 2026-03-27 |
| mi-zhi | ✅ | 2026-03-27 |
| mi-xin | ✅ | 2026-03-27 |
| mi-book | ✅ | 2026-03-27 |
| mi-tui | ✅ | 2026-03-27 |
| mi-bo | ✅ | 2026-03-27 |
| mi-pai | ✅ | 2026-03-27 |
| mi-hu | ✅ | 2026-03-27 |
| mi-cai | ✅ | 2026-03-27 |
| mi-tou | ✅ | 2026-03-27 |
| mi-ce-invest | ✅ | 2026-03-27 |
| mi-shu-data | ✅ | 2026-03-27 |
| mi-fa | ✅ | 2026-03-27 |
| mi-ren | ✅ | 2026-03-27 |
| mi-site | ✅ | 2026-03-27 |
| mi-wei-sec | ✅ | 2026-03-27 |
| mi-wei-guard | ✅ | 2026-03-27 |
| mi-ce | ✅ | 2026-03-27 |
| mi-yun | ✅ | 2026-03-27 |
| mi-dang | ✅ | 2026-03-27 |

---

**下次审查**: 2026-04-03 (7天后)
