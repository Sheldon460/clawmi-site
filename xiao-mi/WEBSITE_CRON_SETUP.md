# 小幂网站日记定时任务配置指南

## 📋 任务概述

**任务名称**: 网站日记自动更新与部署  
**执行频率**: 每天 2 次 (12:00 和 18:00)  
**执行内容**: 生成日记 → 同步到网站 → 构建 → 部署  

## 🗂️ 文件结构

```
mi-army/xiao-mi/
├── website-diary-cron.sh          # 主执行脚本
├── crontab.config                 # crontab 配置
├── openclaw-scheduled-tasks.yaml  # OpenClaw 定时任务配置
├── WEBSITE_CRON_SETUP.md          # 本说明文档
├── diary/                         # 日记存储目录
│   └── 2026-03-08.md             # 生成的日记文件
└── logs/                          # 日志目录
    ├── cron-12pm.log             # 中午执行日志
    ├── cron-6pm.log              # 晚上执行日志
    └── diary-update-YYYYMMDD.log # 详细执行日志
```

## ⚙️ 配置步骤

### Step 1: 配置网站项目路径

编辑 `website-diary-cron.sh`，修改以下变量：

```bash
# 修改为你的网站项目路径
WEBSITE_DIR="${HOME}/projects/xiao-mi-website"

# 修改部署分支（如果需要）
DEPLOY_BRANCH="main"
```

### Step 2: 安装定时任务 (选择一种方式)

#### 方式 A: 使用系统 crontab (推荐)

```bash
# 安装 crontab
crontab ~/clawd/mi-army/xiao-mi/crontab.config

# 验证安装
crontab -l

# 查看日志
tail -f ~/clawd/mi-army/xiao-mi/logs/cron-12pm.log
```

#### 方式 B: 使用 OpenClaw 定时任务

```bash
# 加载 OpenClaw 定时任务配置
openclaw schedule load ~/clawd/mi-army/xiao-mi/openclaw-scheduled-tasks.yaml

# 查看任务列表
openclaw schedule list

# 手动触发测试
openclaw schedule run xiao-mi-website-diary/diary-update-noon
```

### Step 3: 配置网站部署

根据你的网站类型，确保以下配置正确：

#### Hugo 网站
```bash
# 确保 hugo 已安装
hugo version

# 配置部署
# 脚本会自动检测 config.toml 或 hugo.toml
```

#### Jekyll 网站
```bash
# 确保 bundle 和 jekyll 已安装
bundle exec jekyll --version

# 配置部署
# 脚本会自动检测 _config.yml
```

#### Node.js/VuePress/VitePress
```bash
# 确保 npm 和构建命令可用
npm run build

# 配置部署
# 脚本会自动检测 package.json
```

### Step 4: 配置通知 (可选)

#### 飞书 Webhook 通知

```bash
# 设置环境变量
export FEISHU_WEBHOOK_URL="https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxx"

# 添加到 ~/.zshrc 或 ~/.bash_profile
```

## 🧪 测试任务

### 手动执行测试

```bash
# 执行脚本
~/clawd/mi-army/xiao-mi/website-diary-cron.sh

# 查看输出
cat ~/clawd/mi-army/xiao-mi/logs/diary-update-$(date +%Y%m%d).log
```

### 检查生成的日记

```bash
# 查看最新日记
cat ~/clawd/mi-army/xiao-mi/diary/$(date +%Y-%m-%d).md
```

## 📊 监控与故障排查

### 查看执行日志

```bash
# 查看最新日志
ls -lt ~/clawd/mi-army/xiao-mi/logs/ | head -10

# 实时监控
tail -f ~/clawd/mi-army/xiao-mi/logs/cron-12pm.log
```

### 常见问题

#### Q1: 脚本没有执行
- 检查 crontab 是否正确安装: `crontab -l`
- 检查脚本权限: `chmod +x website-diary-cron.sh`
- 检查日志文件是否有错误

#### Q2: 网站构建失败
- 确认 WEBSITE_DIR 路径正确
- 检查网站依赖是否安装 (npm install / bundle install)
- 查看构建日志获取详细错误

#### Q3: 部署失败
- 确认 Git 仓库已配置远程地址
- 检查是否有写入权限
- 确认部署密钥或 Token 有效

#### Q4: 日记没有生成
- 检查 diary 目录是否存在且有写入权限
- 查看脚本执行日志
- 手动运行脚本测试

## 🔧 高级配置

### 自定义日记模板

编辑 `website-diary-cron.sh` 中的日记生成部分，修改模板内容。

### 添加更多部署目标

在脚本的 Step 4 部分添加自定义部署逻辑：

```bash
# 自定义部署示例
if [[ -f "deploy.sh" ]]; then
    log "执行自定义部署脚本..."
    bash deploy.sh
fi
```

### 集成到 CI/CD

可以将脚本集成到 GitHub Actions / GitLab CI:

```yaml
# .github/workflows/diary-update.yml
name: Diary Update
on:
  schedule:
    - cron: '0 12,18 * * *'
jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update Diary
        run: bash mi-army/xiao-mi/website-diary-cron.sh
```

## 📞 支持与反馈

如有问题，请联系：
- 飞书群: 幂家军作战室
- 负责人: @安东尼

---

**最后更新**: 2026-03-08  
**版本**: v1.0
