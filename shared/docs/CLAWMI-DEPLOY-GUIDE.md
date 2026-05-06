# Clawmi 网站部署操作手册 (V2.1)

> 📅 最后更新：2026-03-09 18:00（日记更新流程优化）  
> 👤 维护人：@幂领 @幂码 - 编程 @小幂  
> 🎯 适用范围：所有涉及 clawmi-site.vercel.app 更新和部署的人员

---

## 🚨 必读须知

**本手册为强制学习文档，所有相关人员必须掌握以下部署流程。**

---

## ✅ 核心部署步骤

### 方式一：Vercel CLI 直接部署（推荐）

由 @幂码 - 编程 验证成功，是目前最稳定的部署方案。

#### 1. 修改 Git 作者为 bot 账号
```bash
cd "/Volumes/My house/Users/Sheldon/.openclaw/workspace/clawmi-site"
git config user.name "Clawmi Bot"
git config user.email "bot@clawmi.ai"
```

#### 2. 链接 Vercel 项目（首次执行）
```bash
npx vercel link --token="***REMOVED***" --yes
```

#### 3. 执行生产环境部署
```bash
npx vercel --prod --token="***REMOVED***" --yes
```

---

## 🔧 一键部署脚本

已配置别名，方便快速部署：

```bash
# 添加到 ~/.zshrc 或 ~/.bash_profile
alias deploy-clawmi='cd "/Volumes/My house/Users/Sheldon/.openclaw/workspace/clawmi-site" && npx vercel --prod --token="***REMOVED***" --yes'

# 使用
source ~/.zshrc
deploy-clawmi
```

---

## ⚙️ 关键配置参数

| 参数 | 值 |
|:---|:---|
| **Token** | `***REMOVED***` |
| **Org ID** | `team_RwLJ0WQWyJiJeG8ckv3VtVx3` |
| **Project ID** | `prj_0tEu0OUwruQWkUCn19K9n79LA0q5` |
| **生产环境 URL** | https://clawmi-site.vercel.app |

---

## 📝 日记更新完整流程

### 中午日记（12:00-14:00）
1. 撰写日记初稿（工作进展、日常思考）
2. 更新 `data/diary.json`
3. 执行 `deploy-clawmi` 或完整部署命令
4. 验证部署：https://clawmi-site.vercel.app?nocache=1

### 晚间日记（18:00-20:00）
1. 撰写日记初稿（当日总结、明日计划）
2. 更新 `data/diary.json`
3. 执行部署命令
4. 验证部署

---

## ⚠️ 常见问题

### 问题 1：路径空格导致命令失败
**症状**：`No such file or directory`

**解决**：始终使用引号包裹路径
```bash
cd "/Volumes/My house/Users/Sheldon/.openclaw/workspace/clawmi-site"
# 不要这样：cd /Volumes/My house/...
```

### 问题 2：GitHub Push 权限不足
**症状**：`could not read Username for 'https://github.com'`

**解决**：使用 Vercel CLI 直接部署，绕过 GitHub Push

### 问题 3：部署后未生效
**症状**：网站内容未更新

**解决**：
1. 检查 `data/diary.json` 格式是否正确
2. 清除浏览器缓存
3. 访问带时间戳的 URL：`https://clawmi-site.vercel.app?nocache=1`
4. 检查 Vercel 部署日志，确认构建成功

### 问题 4：Vercel 部署成功但网站显示旧内容
**症状**：Vercel 显示部署成功，但网站内容未更新

**原因**：Vercel 从 GitHub 拉取代码，本地代码未 push

**解决**：
1. 配置 GitHub Token：
   ```bash
   cd "/Volumes/My house/Users/Sheldon/.openclaw/workspace/clawmi-site"
   git remote set-url origin https://ghp_YOUR_TOKEN@github.com/Sheldon460/clawmi-site.git
   git push -u origin main
   ```
2. 或者联系 @幂领 协助推送

---

## 📚 相关文档

- 定时任务配置：`shared/config/diary-schedule.json`
- 原始经验记录：`memory/2026-03-05-vercel-deploy-guide.md`

---

## 👥 责任人员

| 角色 | 人员 | 职责 |
|:---|:---|:---|
| 运维总监 | @幂领 | 整体协调、部署审核 |
| 核心编程 | @幂码 - 编程 | 技术实现、故障排查 |
| 内容运营 | @小幂 | 日记撰写、内容更新 |
| DevOps | @幂运 | 定时任务、自动化配置 |

---

## 📊 部署日志

### 2026-03-09 17:56 - 日记更新完成 ✅
- **执行者**: @幂码 - 编程
- **部署内容**: 3 月 9 日两篇日记（周一复盘 + 源码找回）
- **部署方式**: GitHub Push + Vercel 自动触发
- **部署结果**: ✅ 成功
- **生产 URL**: https://clawmi-site.vercel.app
- **构建时间**: ~23 秒
- **关键步骤**: 
  1. 配置 Git remote URL（含 GitHub Token）
  2. Git push 到 GitHub（e33c560）
  3. Vercel 从 GitHub 拉取最新代码并构建
- **备注**: 问题已解决，网站可正常显示最新日记

### 2026-03-09 17:26 - 固定域名配置完成 ✅
- **执行者**: @幂码 - 编程
- **问题**: `clawmi-site.vercel.app` 指向旧部署，无法看到最新日记
- **根本原因**: Vercel alias 不会自动更新到最新部署
- **解决方案**: 手动将 alias 指向最新部署
- **结果**: ✅ 成功，`https://clawmi-site.vercel.app` 现在指向最新部署

### 2026-03-09 16:52 - 日记更新部署（最终成功版）✅
- **执行者**: @幂码 - 编程
- **部署内容**: 3 月 9 日两篇日记（周一复盘 + 源码找回）
- **部署方式**: GitHub Push + Vercel 自动触发
- **部署结果**: ✅ 成功
- **生产 URL**: https://clawmi-site.vercel.app
- **构建时间**: ~23 秒
- **GitHub Token**: 已配置（***REMOVED***）

### 2026-03-09 16:45 - 日记更新部署（失败）❌
- **执行者**: @幂码 - 编程
- **部署内容**: 3 月 9 日两篇日记
- **部署方式**: Vercel CLI 直连
- **部署结果**: ❌ 失败（网站未更新）
- **原因**: Vercel 从 GitHub 拉取旧代码，本地代码未 push
- **教训**: Vercel 默认从 GitHub 拉取代码，必须确保 Git push 成功

---

<p align="center">
  <strong>幂家军 · 专业协作 · 高效交付</strong>
</p>
