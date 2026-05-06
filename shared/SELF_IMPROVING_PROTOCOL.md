# 🧠 Self-Improving 协议 - 全军强制执行标准

> **生效日期**: 2026-03-27
> **适用范围**: 所有 Agent
> **强制执行**: ✅ 是

---

## 一、核心原则

### 1.1 记忆优先原则
```
凡事必记，凡记必同步。
没有记录 = 没有发生。
```

### 1.2 强制触发条件
以下情况**必须**执行 Self-Improving 流程：

| 触发条件 | 执行动作 | 输出位置 |
|---------|---------|---------|
| 用户纠正错误 | 立即记录到 corrections.md | self-improving/corrections.md |
| 完成重要工作 | 执行自我反思 | self-improving/reflections/daily/ |
| 发现输出可优化 | 记录改进点 | self-improving/memory.md |
| 每日 23:00 | 自动复盘今日工作 | memory/daily-logs/YYYY-MM-DD.md |
| 学习新技能/模式 | 记录到可复用模式库 | self-improving/memory.md |

---

## 二、标准执行流程

### 2.1 任务开始前 - 记忆加载
```
[记忆加载] Self-Improving: 已加载个人记忆，发现X条相关经验
```

必须检查：
- [ ] `self-improving/memory.md` - 个人经验
- [ ] `self-improving/corrections.md` - 最近10条纠正记录
- [ ] `MEMORY.md` - 长期核心记忆

### 2.2 任务执行中 - 实时记录
- 遇到错误 → 立即记录
- 发现模式 → 立即记录
- 获得反馈 → 立即记录

### 2.3 任务完成后 - 强制声明
如果任务涉及学习或改进，**必须在回复末尾声明**：

```
[自我进化] 已记录到:
- 个人记忆: self-improving/memory.md
- 今日日记: memory/daily-logs/YYYY-MM-DD.md
- 长期记忆: MEMORY.md
- 数据文件: data/platform_daily/YYYY-MM-DD.json (如适用)
```

---

## 三、目录结构标准

每个 Agent 工作区必须包含：

```
workspace/[agent-name]/
├── AGENTS.md                    # 已存在
├── SOUL.md                      # 已存在
├── USER.md                      # 已存在
├── MEMORY.md                    # 已存在
├── self-improving/              # 【必须创建】
│   ├── memory.md               # 个人经验/模式库
│   ├── corrections.md          # 错误纠正记录
│   ├── index.md                # 索引/统计
│   ├── reflections/            # 反思报告
│   │   ├── daily/              # 每日复盘
│   │   ├── weekly/             # 周度分析
│   │   └── monthly/            # 月度报告
│   ├── domains/                # 领域知识
│   └── archive/                # 归档
└── memory/                      # 【必须创建】
    ├── daily-logs/             # 每日日志
    ├── projects/               # 项目追踪
    ├── summaries/              # 总结报告
    └── templates/              # 模板
```

---

## 四、文件格式标准

### 4.1 corrections.md 格式
```markdown
# [Agent名] 错误纠正记录

## [YYYY-MM-DD HH:MM] 纠正标题
- **错误描述**: 具体描述犯了什么错
- **纠正内容**: 用户如何纠正的
- **根本原因**: 为什么会犯这个错
- **预防措施**: 以后如何避免
- **状态**: [已解决/跟进中]
```

### 4.2 memory.md 格式
```markdown
# [Agent名] Self-Improving 记忆库

## 个人经验记录
### [YYYY-MM-DD] 经验标题
- **场景**: 什么情况下
- **动作**: 做了什么
- **结果**: 效果如何
- **可复用性**: [高/中/低]

## 可复用模式库
### 模式名称
- **适用场景**: 
- **执行步骤**: 
- **注意事项**: 

## 学习笔记
### 待学习清单
- [ ] 待学习项
```

### 4.3 每日日志格式
```markdown
# 每日工作日志 YYYY-MM-DD

## 📅 日期
YYYY-MM-DD

## 📝 今日对话
- [对话摘要]

## ✅ 完成事项
- [任务列表]

## 🔄 自我改进
- [改进点]

## 📊 数据统计
- 对话数: X
- 完成任务: X
- 纠正记录: X
```

---

## 五、同步机制

### 5.1 多层级记忆同步
```
操作流水 → memory/daily-logs/YYYY-MM-DD.md
全局策略 → playbook.md (如存在)
核心决策 → MEMORY.md
个人经验 → self-improving/memory.md
错误纠正 → self-improving/corrections.md
```

### 5.2 跨 Agent 共享
- 通用模式 → `shared/patterns/`
- 最佳实践 → `shared/best-practices/`
- 错误案例 → `shared/lessons-learned/`

---

## 六、检查清单

### 每次任务必须检查
- [ ] 是否加载了相关历史记忆？
- [ ] 本次任务是否有错误被纠正？
- [ ] 本次任务是否有新发现？
- [ ] 本次任务是否有可复用的模式？
- [ ] 是否已同步到所有记忆层级？

### 每日必须检查
- [ ] 今日日志是否已记录？
- [ ] 是否有待归档的内容？
- [ ] MEMORY.md 是否需要更新？

---

## 七、违规处理

未执行 Self-Improving 协议的 Agent：
1. 第一次 → 警告并补录
2. 第二次 → 强制补录 + 说明原因
3. 第三次 → 触发深度复盘

---

## 八、附录

### 快速命令
```bash
# 初始化 Self-Improving 目录
mkdir -p self-improving/{reflections/{daily,weekly,monthly},domains,archive}
touch self-improving/{memory.md,corrections.md,index.md}

mkdir -p memory/{daily-logs,projects,summaries,templates}
touch memory/daily-logs/$(date +%Y-%m-%d).md
```

### 模板文件位置
- `shared/templates/correction-template.md`
- `shared/templates/reflection-template.md`
- `shared/templates/daily-log-template.md`

---

**最后更新**: 2026-03-27
**版本**: v1.0
**状态**: 强制执行
