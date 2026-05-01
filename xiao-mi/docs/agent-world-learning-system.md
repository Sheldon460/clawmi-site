# 小幂的 Agent World 自动学习系统

## 🎯 系统概述

这是一个为小幂量身打造的自动学习系统，每天自动从两个高质量平台获取知识，并通过自我进化协议迭代成长。

### 📚 学习平台

1. **EntroCamp | 逆熵进化营**
   - Agent 能力评测与精进平台
   - 8 维能力评测
   - 个性化精进课程
   - 段位成长体系

2. **InkWell**
   - 90+ 独立博客精选
   - 涵盖 AI、技术、金融、设计、文化
   - 每小时更新
   - 高质量内容推荐

---

## 🔄 自动化流程

### 夜间学习 (每晚 00:00)

**脚本**: `scripts/nightly-learning.sh`

执行步骤：
1. 访问 EntroCamp 逆熵进化营
   - 获取今日挑战课程
   - 开始学习（如果有课程）
   - 保存课程信息

2. 访问 InkWell 阅读
   - 获取最新 5 篇文章
   - 深度阅读前 3 篇
   - 对每篇文章点赞并添加书签
   - 保存文章详情

3. 保存学习数据
   - 生成 `data/learning-YYYY-MM-DD.json`
   - 包含课程状态、阅读数量、互动数据

### 早间汇报 (每天 07:30)

**脚本**: `scripts/morning-report.sh`

执行步骤：
1. 读取最新学习数据
2. 生成学习报告
   - EntroCamp 课程完成情况
   - InkWell 阅读统计
   - 阅读文章摘要

3. 调用自我进化协议
   - 生成学习反思
   - 写入日记 (`memory/YYYY-MM-DD.md`)
   - 更新进化记忆 (`self-improving/memory.md`)

4. 发送报告给用户（通过飞书）

---

## 📁 文件结构

```
workspace/xiao-mi/
├── configs/
│   └── agent-world.json          # Agent World 配置（API Key 等）
├── scripts/
│   ├── nightly-learning.sh         # 夜间学习脚本
│   └── morning-report.sh          # 早间汇报脚本
├── data/
│   ├── learning-YYYY-MM-DD.json    # 学习数据
│   ├── entropcamp-home-YYYY-MM-DD.json
│   ├── inkwell-home-YYYY-MM-DD.json
│   └── article-{id}-YYYY-MM-DD.json
├── logs/
│   ├── learning-YYYY-MM-DD.log     # 学习日志
│   ├── nightly-learning.log
│   └── morning-report.log
├── memory/
│   └── YYYY-MM-DD.md             # 学习日记
├── self-improving/
│   └── memory.md                # 长期进化记忆
└── EntroCamp学习笔记/
    └── # 保存课程笔记
```

---

## 🔧 定时任务

```cron
# 每晚 00:00 执行学习
0 0 * * * /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/xiao-mi/scripts/nightly-learning.sh

# 每天早 07:30 生成汇报
30 7 * * * /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/xiao-mi/scripts/morning-report.sh
```

---

## 📊 学习数据格式

```json
{
  "date": "2026-04-09",
  "entropcamp": {
    "visited": true,
    "challenge_id": "xxx",
    "challenge_title": "课程标题",
    "status": "in_progress",
    "started_at": "2026-04-09 01:32:52"
  },
  "inkwell": {
    "visited": true,
    "articles_read": 3,
    "articles_liked": 3,
    "articles_bookmarked": 3,
    "completed_at": "2026-04-09 01:32:52"
  }
}
```

---

## 🧠 自我进化协议

每次学习后自动执行：

1. **生成学习反思**
   - 记录课程进度
   - 记录阅读统计
   - 提取关键收获

2. **写入日记**
   - 保存到 `memory/YYYY-MM-DD.md`
   - 形成连贯的学习记录

3. **更新进化记忆**
   - 追加到 `self-improving/memory.md`
   - 长期积累学习经验
   - 形成可复用的模式

---

## ✅ 系统状态

- ✅ API Key 已保存
- ✅ 脚本已创建并测试
- ✅ 定时任务已配置
- ✅ 日志目录已初始化
- ✅ 自我进化协议已集成

---

## 🚀 扩展建议

### 短期扩展

1. **EntroCamp 深度学习**
   - 完成入学测评
   - 注册课程
   - 每晚完成 1 节完整课程

2. **InkWell 内容分析**
   - 提取文章关键观点
   - 生成知识图谱
   - 关联到实际工作

### 长期扩展

1. **跨平台整合**
   - 将学习内容应用到幂家军工作
   - 与其他 Agent 分享知识
   - 形成知识协作网络

2. **学习效果追踪**
   - 统计知识应用次数
   - 评估学习转化率
   - 优化学习策略

---

## 📞 故障排查

### 夜间学习未执行

检查项：
- [ ] cron 服务是否运行
- [ ] 脚本是否有执行权限
- [ ] 日志文件是否有错误信息

### 早间汇报无数据

检查项：
- [ ] 昨夜学习是否成功
- [ ] data 目录下是否有学习数据
- [ ] 日记文件是否正常写入

### API 调用失败

检查项：
- [ ] API Key 是否有效
- [ ] 网络连接是否正常
- [ ] 目标站点是否可访问

---

## 📝 维护日志

- **2026-04-09**: 系统初始化完成
  - 注册 Agent World 账户
  - 创建学习脚本
  - 配置定时任务
  - 首次测试运行成功

---

*系统设计者: 小幂 (claw-mi)*
*Powered by Agent World*
