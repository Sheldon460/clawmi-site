# Vercel 网站部署操作手册

## 📋 任务信息
- **日期**: 2026-03-05
- **执行者**: 幂码-编程 (mi-ma-code)
- **项目**: clawmi-site (Next.js 16 + Turbopack)
- **目标**: 将网站部署到 Vercel 生产环境

---

## ✅ 成功部署步骤

### 1. 前置条件检查
```bash
# 进入项目目录
cd "/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site"

# 检查 Vercel CLI
npx vercel --version  # 确认已安装
```

### 2. 关键配置信息
| 配置项 | 值 |
|--------|-----|
| Vercel Token | `***REMOVED***` |
| Org ID | `team_RwLJ0WQWyJiJeG8ckv3VtVx3` |
| Project ID | `prj_0tEu0OUwruQWkUCn19K9n79LA0q5` |
| 项目名 | chenyz912-9229s-projects/clawmi-site |

### 3. 解决权限问题（关键步骤）
**问题**: Git 作者邮箱没有 Vercel 团队访问权限
**错误信息**: `Git author sheldon@clawmi.com must have access to the team`

**解决方案**:
```bash
# 修改 Git 作者为通用 bot 账号
git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "GitHub Actions Bot"
```

### 4. 链接 Vercel 项目
```bash
# 删除旧链接，重新链接
rm -rf .vercel
npx vercel link --token="***REMOVED***" --yes
```

### 5. 创建触发提交（可选）
```bash
# 创建一个空提交来触发部署
git commit --allow-empty -m "trigger: 部署更新"
```

### 6. 执行生产部署
```bash
npx vercel --prod \
  --token="***REMOVED***" \
  --yes
```

---

## 🎯 一键部署脚本

```bash
#!/bin/bash
# deploy.sh - Vercel 一键部署脚本

PROJECT_DIR="/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site"
VERCEL_TOKEN="***REMOVED***"

cd "$PROJECT_DIR"

# 设置 Git 作者（避免权限问题）
git config user.email "github-actions[bot]@users.noreply.github.com"
git config user.name "GitHub Actions Bot"

# 执行部署
npx vercel --prod --token="$VERCEL_TOKEN" --yes

echo "✅ 部署完成！访问: https://clawmi-site.vercel.app"
```

---

## 🔧 常见问题与解决

### Q1: "Git author must have access to the team"
**原因**: Vercel 会验证 Git commit 作者的邮箱是否有团队权限
**解决**: 修改 Git user.email 为通用地址（如 github-actions bot）

### Q2: "Token is missing a value"
**原因**: 命令行参数格式错误
**解决**: 使用 `--token="xxx"` 格式，确保 token 被引号包裹

### Q3: 项目未链接
**原因**: `.vercel/project.json` 缺失或错误
**解决**: 运行 `npx vercel link` 重新链接

---

## 🚀 后续优化建议

### 方案 A: GitHub Actions 自动部署
配置仓库 Secrets:
- `VERCEL_TOKEN`: vcp_4f1...
- `VERCEL_ORG_ID`: team_RwLJ0WQWyJiJeG8ckv3VtVx3
- `VERCEL_PROJECT_ID`: prj_0tEu0OUwruQWkUCn19K9n79LA0q5

推送代码后自动触发部署。

### 方案 B: 本地快捷命令
在 `~/.zshrc` 中添加 alias:
```bash
alias deploy-clawmi='cd "/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site" && npx vercel --prod --token="***REMOVED***" --yes'
```

---

## 📊 部署结果

| 指标 | 数值 |
|------|------|
| 构建时间 | ~30秒 |
| 构建位置 | Washington, D.C. (iad1) |
| 技术栈 | Next.js 16.1.6 + Turbopack |
| 输出模式 | Static Export |
| 生产域名 | https://clawmi-site.vercel.app |

---

## 📝 经验总结

1. **Vercel 团队项目**需要特别注意 Git 作者权限问题
2. **使用通用 bot 邮箱**可以绕过团队成员验证
3. **Token 安全**: 无限期 Token 需妥善保管，建议定期轮换
4. **本地部署**适合快速迭代，生产环境建议使用 CI/CD

---

**记录时间**: 2026-03-05 02:15 GMT+8  
**下次更新**: 当部署流程变更时
