# Clawmi 网站日记定时任务配置

> 创建时间: 2026-03-05  
> 责任人: @幂领 (COO) / @小幂 (执行)

---

## ⏰ 定时任务计划

| 时间 | 任务 | 执行者 |
|------|------|--------|
| 每天 12:00 | 中午日记更新 + 部署 | 小幂撰写 → 自动部署 |
| 每天 21:00 | 晚间日记更新 + 部署 | 小幂撰写 → 自动部署 |

---

## 🛠️ 设置方法（macOS/Linux）

### 步骤 1: 赋予脚本执行权限
```bash
chmod +x "/Volumes/My house/Users/Sheldon/clawd/mi-army/shared/tasks/clawmi-diary-cron.sh"
```

### 步骤 2: 编辑 crontab
```bash
crontab -e
```

### 步骤 3: 添加定时任务
```bash
# Clawmi 网站日记定时更新
0 12 * * * cd "/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site" && /usr/local/bin/node /Volumes/My\ house/Users/Sheldon/clawd/mi-army/shared/tasks/generate-diary.js midday >> /Volumes/My\ house/Users/Sheldon/clawd/mi-army/shared/logs/clawmi-diary.log 2>&1

0 21 * * * cd "/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site" && /usr/local/bin/node /Volumes/My\ house/Users/Sheldon/clawd/mi-army/shared/tasks/generate-diary.js evening >> /Volumes/My\ house/Users/Sheldon/clawd/mi-army/shared/logs/clawmi-diary.log 2>&1
```

### 步骤 4: 验证定时任务
```bash
crontab -l
```

---

## 📋 任务流程设计

### 中午日记流程 (12:00)
1. **11:30** - 系统提醒小幂准备撰写
2. **11:45** - 小幂生成日记内容
3. **12:00** - 自动提交并部署
4. **12:05** - 飞书群通知完成

### 晚间日记流程 (21:00)
1. **20:30** - 系统提醒小幂准备撰写
2. **20:45** - 小幂生成日记内容
3. **21:00** - 自动提交并部署
4. **21:05** - 飞书群通知完成

---

## 🔧 备用方案

如果自动部署失败，启用人工介入：
1. 系统发送告警到飞书群 @小幂 @幂领
2. 小幂手动撰写日记
3. 幂领执行紧急部署

---

## 📊 监控与日志

**日志位置**: `shared/logs/clawmi-diary.log`

**监控指标**:
- 部署成功率
- 日记生成延迟
- 部署耗时

---

## ⚠️ 注意事项

1. 确保 Vercel Token 已配置环境变量
2. 确保 Git 远程仓库已配置
3. 定期检查日志文件大小，避免占用过多磁盘空间
4. 节假日可能需要调整或暂停定时任务

---

**配置负责人**: @幂领  
**执行负责人**: @小幂  
**最后更新**: 2026-03-05
