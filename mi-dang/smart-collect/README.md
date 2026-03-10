# 📚 智能收藏回顾系统

基于艾宾浩斯遗忘曲线的知识管理工具，自动抓取、智能提醒、自然语言交互。

## ✨ 核心功能

1. **🔗 自动抓取** - 发送链接自动获取标题、摘要、标签
2. **🧠 艾宾浩斯提醒** - 按遗忘曲线定时提醒回顾（1天→2天→4天→7天→15天）
3. **💬 自然语言管理** - 支持"推迟3天"、"已看完归档"等指令
4. **📝 Markdown存储** - 数据保存在本地知识库，随时可导出

## 📁 项目结构

```
smart-collect/
├── config.js           # 配置文件
├── utils.js            # 工具函数库
├── smart-collect.js    # 自然语言处理入口
├── shoucang-add.js     # 添加新收藏
├── shoucang-review.js  # 每日回顾推送
├── cron-setup.sh       # 定时任务设置脚本
├── package.json        # 项目配置
└── README.md           # 使用说明
```

## 🚀 快速开始

### 1. 安装依赖

系统需要安装:
- Node.js (v16+)
- Google Chrome (用于网页抓取)
- pandoc (可选，用于PDF导出)

```bash
# 进入项目目录
cd smart-collect

# 安装Node依赖 (如有需要)
# npm install
```

### 2. 配置Chrome路径

编辑 `config.js`，确保 `CHROME_PATH` 指向正确的Chrome位置:

```javascript
CHROME_PATH: '/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
```

### 3. 设置定时任务

```bash
chmod +x cron-setup.sh
./cron-setup.sh
```

这会在你的系统上设置每天9:30自动运行回顾推送。

## 📖 使用指南

### 添加收藏

```bash
# 基础用法
node smart-collect.js "添加链接 https://example.com/article"

# 指定分类
node smart-collect.js "保存 https://example.com 到技术"

# 直接发送URL
node smart-collect.js "https://example.com"

# 使用专用脚本
node shoucang-add.js "https://example.com" "产品"
```

### 查看回顾

```bash
# 查看今日待回顾
node smart-collect.js "今天回顾什么"

# 或使用专用脚本
node shoucang-review.js --list
```

### 标记已回顾

```bash
# 自然语言
node smart-collect.js "已回顾 20260308-001"

# 或
node shoucang-review.js --review 20260308-001
```

### 推迟提醒

```bash
# 自然语言
node smart-collect.js "推迟3天 20260308-001"

# 或
node shoucang-review.js --snooze 20260308-001 3
```

### 归档收藏

```bash
# 自然语言
node smart-collect.js "归档 20260308-001"

# 或
node shoucang-review.js --archive 20260308-001
```

### 查询统计

```bash
# 查看统计
node smart-collect.js "统计"

# 搜索收藏
node smart-collect.js "查询 AI"

# 列出所有
node smart-collect.js "列出所有收藏"
```

## 📊 数据结构

每条收藏包含以下字段:

```json
{
  "id": "20260308-001",
  "url": "https://example.com/article",
  "title": "文章标题",
  "tags": ["AI", "技术"],
  "category": "技术",
  "summary": ["要点1", "要点2", "要点3"],
  "content": "原文内容前5000字符",
  "status": "reviewing",
  "createdAt": "2026-03-08T14:30:00.000Z",
  "nextReview": "2026-03-09T09:30:00.000Z",
  "reviewCount": 0,
  "reviewHistory": []
}
```

## 🔄 艾宾浩斯回顾周期

系统按照以下间隔提醒回顾:

| 次数 | 间隔 | 累计时间 |
|------|------|----------|
| 1    | 1天  | 1天      |
| 2    | 2天  | 3天      |
| 3    | 4天  | 7天      |
| 4    | 7天  | 14天     |
| 5    | 15天 | 29天     |

完成5次回顾后，收藏自动归档。

## 📂 数据存储

- **JSON数据库**: `~/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/smart-collect/collections.json`
- **Markdown导出**: `~/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/smart-collect/exports/`
- **活动日志**: `~/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/smart-collect/activity.log`

## 🔧 高级用法

### 批量导入

```bash
# 从Markdown文件导入所有链接
node shoucang-add.js --import /path/to/bookmarks.md

# 批量添加多个URL
node shoucang-add.js --batch "url1" "url2" "url3" "分类"
```

### 手动触发推送

```bash
node shoucang-review.js --push
```

### 查看所有待回顾

```bash
node shoucang-review.js --all
```

## 🛠️ 故障排除

### 网页抓取失败

1. 检查Chrome路径配置
2. 确保Chrome可以正常启动
3. 尝试手动运行抓取脚本测试

#### canghe-url-to-markdown 技能使用说明

该技能使用 Chrome CDP (Chrome DevTools Protocol) 抓取网页内容。

**环境要求:**
- 必须设置 `URL_CHROME_PATH` 环境变量
- Chrome 必须能够正常启动

**手动测试命令:**
```bash
export URL_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx -y bun ~/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts "<URL>" -o "/tmp/article.md"
```

**常见问题:**
1. **Chrome 路径错误**: 确保路径指向 Chrome 可执行文件，不是 .app 包
2. **权限问题**: 首次运行可能需要授予终端控制 Chrome 的权限
3. **微信文章**: 微信文章需要特殊处理，可能需要登录态

### 定时任务不执行

1. 检查系统日志:
   - macOS: `tail -f ~/Library/Logs/smart-collect.log`
   - Linux: `journalctl --user -u smart-collect`

2. 手动测试脚本:
   ```bash
   node shoucang-review.js --push
   ```

### 数据丢失

系统会自动备份，检查:
- `collections.json` 是否存在
- 文件权限是否正确

## 📝 更新日志

### v1.0.0 (2026-03-08)
- ✅ 基础框架搭建
- ✅ 自动抓取功能
- ✅ 艾宾浩斯提醒
- ✅ 自然语言交互
- ✅ Markdown存储
- ✅ 定时任务支持

## 🤝 协作说明

本系统由 **幂档 (mi-dang)** 维护，是幂家军知识管理体系的一部分。

如有问题或建议，请联系:
- 飞书: @幂档
- 邮箱: (待补充)

---

*Made with ❤️ by 幂家军*
