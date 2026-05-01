# 幂家军记忆系统

> 本地文件 + Obsidian 双向同步

## 📁 目录结构

```
memory/
├── README.md              # 本文件
├── daily-logs/            # 每日工作日志
│   ├── 2026-03-26.md
│   └── 2026-03-25.md
├── projects/              # 项目追踪
│   ├── active/            # 进行中
│   └── archived/          # 已归档
├── summaries/             # 讨论摘要
│   └── 20260326-0630-xxx.md
└── templates/             # 模板文件
    ├── daily-log-template.md
    └── project-template.md
```

## 🔗 Obsidian 同步路径

```
/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/memory-system/
    ↓ 双向同步 ↓
workspace/main/memory/
```

## 🚀 使用方法

### 自动记录
每次对话结束后，我会自动追加记录到 `daily-logs/YYYY-MM-DD.md`

### 手动查询
你可以问我：
- "今天做了什么"
- "查看 3 月 25 日的日志"
- "项目 xxx 进展如何"

### Obsidian 查看
打开 Obsidian → 浏览 `OpenClaw_Output/memory-system/`

## 📊 统计
- 总对话数: {{total_conversations}}
- 活跃项目: {{active_projects}}
- 本月记录: {{monthly_logs}}
