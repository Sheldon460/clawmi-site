# Twitter/X 运营快速启动指南

**适用对象**: mi-tui (幂推) 系统重装后快速恢复  
**预计耗时**: 10 分钟  
**最后更新**: 2026-03-10

---

## 🎯 目标

完成本指南后，你将能够：
- ✅ 使用 xurl CLI 发布推文（文字 + 图片）
- ✅ 使用 xreach CLI 搜索和读取推文
- ✅ 追踪运营数据到飞书多维表格

---

## 📋 前置条件

- [ ] 已安装 OpenClaw
- [ ] 已安装 agent-reach（系统重装时已保留）
- [ ] 有自己的 Twitter/X 账号（建议使用专用小号）

---

## Step 1: 配置 Twitter 认证（5 分钟）

### 方案 A：Cookie-Editor 导入（推荐）

1. **在浏览器登录 Twitter/X**
   - 使用 Chrome 或任意浏览器
   - 登录你的 Twitter 账号

2. **安装 Cookie-Editor 插件**
   - Chrome: https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm
   - 安装后点击插件图标

3. **导出 Cookie**
   - 在 Twitter 页面点击 Cookie-Editor
   - 点击 "Export" 按钮
   - 选择 "Header String" 格式
   - 复制导出的字符串（类似：`auth_token=xxx; ct0=yyy; ...`）

4. **导入到 agent-reach**
   ```bash
   agent-reach configure twitter-cookies "刚才复制的完整字符串"
   ```

### 方案 B：从 Chrome 自动提取（仅限本地电脑）

```bash
agent-reach configure --from-browser chrome
```

---

## Step 2: 验证认证（1 分钟）

```bash
xurl whoami
```

**预期输出**:
```json
{
  "data": {
    "id": "1234567890",
    "name": "你的名字",
    "username": "your_handle"
  }
}
```

如果仍返回 `401 Unauthorized`，请检查：
1. Cookie 是否完整复制（包含 auth_token 和 ct0）
2. Twitter 账号是否已登录
3. 重新执行 Step 1

---

## Step 3: 测试发帖（2 分钟）

### 发布文字推文

```bash
xurl post "Hello from mi-tui! 这是系统重装后的第一条测试推文。#AI #OpenClaw"
```

### 发布带图片的推文

```bash
xurl post "测试配图功能" --media /path/to/image.jpg
```

### 验证发布成功

1. 打开 Twitter 网页版
2. 查看自己的个人主页
3. 确认推文已显示

---

## Step 4: 搜索和互动（2 分钟）

### 搜索热点话题

```bash
# 搜索 AI Agent 相关推文
xreach search "AI Agent" -n 20 --json

# 搜索高互动推文（至少 100 点赞）
xreach search "AI min_faves:100" -n 20 --json
```

### 分析爆款推文

```bash
# 读取特定推文详情
xreach tweet https://x.com/elonmusk/status/1234567890 --json
```

### 互动操作

```bash
# 点赞
xurl like 1234567890

# 转发
xurl repost 1234567890

# 回复
xurl reply 1234567890 "Great insights! Thanks for sharing."

# 关注用户
xurl follow @elonmusk
```

---

## Step 5: 数据追踪（可选，5 分钟）

### 创建飞书多维表格

1. 打开飞书网页版
2. 进入「多维表格」
3. 创建新表格，命名为「Twitter 运营数据追踪」

### 设计字段

| 字段名 | 类型 | 说明 |
|--------|------|------|
| 日期 | 日期 | 发布/统计日期 |
| 推文 ID | 文本 | 推文 ID |
| 推文内容 | 文本 | 推文正文 |
| 转发数 | 数字 | Retweets |
| 点赞数 | 数字 | Likes |
| 评论数 | 数字 | Replies |
| 粉丝增长 | 数字 | 当日粉丝变化 |
| 互动率 | 数字 | (转发 + 点赞 + 评论) / 粉丝数 |

### 每日记录

在 `/mi-tui/data/platform_daily/YYYY-MM-DD.json` 记录数据：

```json
{
  "date": "2026-03-10",
  "platform": "Twitter/X",
  "agent": "mi-tui",
  "metrics": {
    "posts_count": 3,
    "retweets": 15,
    "likes": 42,
    "replies": 8,
    "follower_growth": 5,
    "engagement_rate": 0.023
  },
  "top_performing_post": {
    "id": "1234567890",
    "content": "推文内容",
    "metrics": {...}
  },
  "insights": ["晚间发布互动率更高"]
}
```

---

## 🚀 下一步

完成快速启动后，继续以下任务：

### P0（本周）
- [ ] 发布第一条正式运营推文
- [ ] 记录并发布第一条数据到飞书表格
- [ ] 配置 Exa 搜索：`mcporter config add exa https://mcp.exa.ai/mcp`

### P1（本月）
- [ ] 填充 playbook.md 中的 20 个推文模板
- [ ] 验证最佳发布时段
- [ ] 建立与 mi-wen、mi-hua 的协作 SOP

### P2（下月）
- [ ] 实现定时发布自动化
- [ ] 分析竞品账号策略
- [ ] 创建 Thread 发布脚本

---

## 📚 参考文档

- [mi-tui 技能恢复报告](./skill-recovery-report-2026-03-10.md)
- [mi-tui TOOLS.md](../TOOLS.md)
- [mi-tui playbook.md](../playbook.md)
- [agent-reach 文档](https://github.com/Panniantong/agent-reach)
- [xurl CLI 帮助](https://github.com/Panniantong/agent-reach)

---

## 🆘 故障排查

### xurl whoami 返回 401

**原因**: Cookie 未配置或过期

**解决**:
1. 重新执行 Step 1 配置 Cookie
2. 确保导出的字符串包含 `auth_token` 和 `ct0`
3. 检查 Twitter 账号是否已登录

### xreach search 无结果

**原因**: 搜索词太冷门或 API 限制

**解决**:
1. 尝试更通用的搜索词
2. 使用 `min_faves` 过滤低质量内容
3. 检查网络连接

### 发布推文失败

**原因**: 账号被限制或内容违规

**解决**:
1. 检查推文内容是否违规
2. 降低发布频率
3. 使用住宅 IP 代理

---

*快速启动指南 V1.0 - 2026-03-10*
