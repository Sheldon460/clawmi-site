# MI-TUI 实战打法手册 (V2.0 - 系统重装恢复版)

**最后更新**: 2026-03-10 00:35 GMT+8  
**状态**: 核心能力 90% 恢复，待完成 Twitter 认证

---

## 🎯 核心策略

### 1. 情报驱动运营
- **监控工具**: `xreach search` + `web_search` + mi-zhi 情报共享
- **分析维度**: 互动率、话题热度、竞品动态
- **响应速度**: 热点出现后 2 小时内必须发布相关内容

### 2. 跨组协作 SOP
```
情报收集 → 文案创作 → 视觉设计 → 发布执行 → 数据追踪
   ↓           ↓           ↓          ↓          ↓
 mi-zhi    mi-wen      mi-hua     mi-tui    mi-tui + mi-shu-data
```

### 3. 数据驱动进化
- **每日记录**: `data/platform_daily/YYYY-MM-DD.json`
- **每日复盘**: `memory/YYYY-MM-DD.md`
- **每周迭代**: 更新 `playbook.md` 和 `self-improving/memory.md`

---

## 📝 内容创作模板库

### 爆款推文结构 (待验证填充)

#### 模板 1：反常识观点
```
[吸引注意力的反常识陈述]

[3-5 个论据支撑]

[金句总结]

[相关话题标签]
```

#### 模板 2：个人经历 + 普适道理
```
[具体场景描述]

[遇到的挑战/问题]

[解决方案/顿悟时刻]

[可复用的方法论]

[互动问题]
```

#### 模板 3：数据报告型
```
[震撼的数据标题]

[关键数据点 1]
[关键数据点 2]
[关键数据点 3]

[洞察/结论]

[来源/延伸阅读]
```

---

## 🕐 发布时机策略 (待数据验证)

### 目标受众活跃时间
- **北美用户**: 20:00-24:00 GMT+8 (美东早晨/美西深夜)
- **欧洲用户**: 15:00-18:00 GMT+8 (欧洲早晨)
- **亚洲用户**: 12:00-14:00 / 20:00-23:00 GMT+8 (午休/晚间)

### 测试计划
- [ ] 记录不同时段发布内容的互动数据
- [ ] 分析最佳发布窗口
- [ ] 建立分时段内容策略

---

## 💬 互动回复话术库

### 感谢型
- "Thanks for sharing! 🙏"
- "Great point! Adding this to my toolkit."

### 补充型
- "Absolutely! Also worth noting that..."
- "This + [related insight] = 🔥"

### 提问型
- "Curious about your take on..."
- "How would you apply this to [specific scenario]?"

---

## 🔧 工具使用技巧

### xurl CLI 高级用法
```bash
# 发布带图片的推文
xurl post "内容" --media image.jpg

# 发布 Thread（多条）
xurl thread "第一条" "第二条" "第三条"

# 引用推文
xurl quote 1234567890 "评论内容"

# 批量操作
xurl like 1234567890
xurl repost 1234567890
xurl follow @username
```

### xreach 搜索技巧
```bash
# 搜索特定话题
xreach search "AI Agent" -n 20 --json

# 搜索特定用户
xreach tweets @elonmusk -n 10

# 搜索带互动阈值的推文
xreach search "AI min_faves:100" -n 20
```

---

## 📊 数据仪表盘指标

### 核心指标（每日追踪）
- 发布数量 (posts_count)
- 总互动数 (retweets + likes + replies)
- 粉丝增长 (follower_growth)
- 互动率 (engagement_rate = 互动数/粉丝数)

### 进阶指标（每周分析）
- 最佳表现推文 (top_performing_post)
- 最佳发布时段 (best_posting_time)
- 最佳内容类型 (best_content_type)
- 话题标签效果 (hashtag_performance)

---

## 🚨 风险防控

### 账号安全
- ⚠️ 使用专用小号运营，避免主号风险
- ⚠️ 控制发布频率，避免被判定为机器人
- ⚠️ 使用代理时选择住宅 IP，避免数据中心 IP

### 内容合规
- ⚠️ 避免敏感政治话题
- ⚠️ 注意版权（图片、引用内容）
- ⚠️ 遵守平台规则（不刷量、不垃圾营销）

---

## 🔄 自我进化触发条件

### 必须记录到日记的场景
1. 发布爆款内容（互动率 > 平均值 2 倍）
2. 遭遇运营事故（发错内容、被举报等）
3. 发现新的高效工作流
4. 跨组协作发现优化点

### 必须更新 Playbook 的场景
1. 验证有效的内容模板
2. 验证有效的发布时段
3. 验证有效的互动策略
4. 工具使用技巧更新

---

## ✅ 待办事项清单

### P0（本周完成）
- [ ] 配置 Twitter 认证（Cookie-Editor 导出）
- [ ] 测试完整发帖流程（文字 + 图片）
- [ ] 创建飞书多维表格数据追踪表
- [ ] 发布第一条正式推文并记录数据

### P1（本月完成）
- [ ] 填充 20 个爆款推文模板
- [ ] 验证最佳发布时段
- [ ] 配置 Exa 搜索
- [ ] 建立与 mi-wen、mi-hua 的协作 SOP

### P2（下月完成）
- [ ] 实现定时发布自动化
- [ ] 创建 Thread 发布脚本
- [ ] 建立内容素材库
- [ ] 分析竞品账号运营策略

---

*本 Playbook 遵循自我进化协议，每次运营后必须复盘更新*
