---
title: mi-xin 实战策略手册 V1.0
date: 2026-03-10
type: playbook
agent: mi-xin
---

# mi-xin 实战策略手册 V1.0

**版本**: V1.0  
**创建日期**: 2026-03-10  
**适用对象**: 微信公众号自动化运营  
**核心原则**: 高效、稳定、可复现

---

## 一、快速决策树

### 1.1 发布方式选择

```
用户要求发布文章
        ↓
    是否首次配置?
        ↓
    是 → 执行「首次配置检查」
    否 → 继续
        ↓
    是否已配置 IP 白名单?
        ↓
    否 → 配置 IP 白名单
    是 → 继续
        ↓
    使用 API 方式发布 ✅
```

### 1.2 问题诊断树

```
发布失败
    ↓
检查错误码
    ↓
├─ 40164 → IP 白名单问题 → 配置 IP
├─ 40001 → Token 失效 → 自动刷新
├─ 45009 → 接口超限 → 等待 1 小时
└─ 其他 → 查看详细日志 → 人工介入
```

### 1.3 跨组协作决策

```
需要创作 + 配图?
        ↓
    时间是否紧急?
        ↓
    是 → 并行模式（同时 spawn mi-wen + mi-hua）
    否 → 串行模式（先创作后配图）
```

---

## 二、标准操作流程 (SOP)

### 2.1 素材抓取流程

```bash
# Step 1: 准备 URL 列表
cat > /tmp/urls.txt << 'EOF'
https://example.com/article1
https://example.com/article2
https://example.com/article3
EOF

# Step 2: 批量抓取（串行 - 当前）
while read url; do
  npx -y bun scripts/main.ts "$url" -o "output/"
done < /tmp/urls.txt

# Step 3: 保存素材
mv output/* ~/workspace/mi-xin/01-灵感与素材库/1-日常灵感剪报/

# Step 4: 提取选题
# 手动或使用 AI 提取 1-3 个选题
```

### 2.2 文章创作流程

```bash
# Step 1: 读取选题和大纲
cat ~/workspace/mi-xin/03-内容工厂/1-大纲挑选区/选题.md

# Step 2: 调用创作 Agent
sessions_spawn(target="mi-wen", task="根据大纲创作文章")

# Step 3: 等待创作完成
# 监控子 Agent 状态

# Step 4: humanize 处理（手动 - 当前）
# 标记为 L2 中度处理

# Step 5: 保存初稿
mv 文章.md ~/workspace/mi-xin/03-内容工厂/2-初稿打磨区/
```

### 2.3 配图生成流程

```bash
# Step 1: 分析配图需求
# 封面图: 1 张 (900x383)
# 内文图: 3-4 张 (800x600)

# Step 2: 调用配图 Agent
sessions_spawn(target="mi-hua", task="生成配图")

# Step 3: 等待配图完成

# Step 4: 保存配图
mkdir -p ~/workspace/mi-xin/03-内容工厂/2-初稿打磨区/images/
mv *.png ~/workspace/mi-xin/03-内容工厂/2-初稿打磨区/images/
```

### 2.4 API 发布流程

```bash
# Step 1: 前置检查
npx -y bun scripts/check-config.ts

# Step 2: 转换 HTML
cd ~/.openclaw/skills/canghe-markdown-to-html
npx -y bun scripts/main.ts ~/workspace/mi-xin/文章.md --theme simple

# Step 3: API 发布
cd ~/.openclaw/skills/canghe-post-to-wechat
npx -y bun scripts/wechat-api.ts \
  ~/workspace/mi-xin/文章.html \
  --title "文章标题" \
  --author "作者" \
  --summary "摘要" \
  --cover ~/workspace/mi-xin/images/00_cover.png

# Step 4: 验证发布
# 检查返回的 Media ID

# Step 5: 归档
mv ~/workspace/mi-xin/文章.md ~/workspace/mi-xin/04-已发布归档/公众号已发布/
```

---

## 三、关键检查清单

### 3.1 API 发布前置检查

```markdown
## API 发布前置检查清单

### 必需配置 ✅
- [ ] AppID 已配置 (~/.canghe-skills/.env)
- [ ] AppSecret 已配置
- [ ] IP 白名单已添加（最重要！）
- [ ] 图片大小 < 2MB

### 内容检查 ✅
- [ ] 标题已确认（50 字以内）
- [ ] 摘要已填写（50-120 字）
- [ ] 作者已设置
- [ ] 配图已准备
- [ ] 敏感词已检查

### 发布验证 ✅
- [ ] API 响应成功
- [ ] Media ID 已生成
- [ ] 草稿可在后台查看
```

### 3.2 文章质量检查

```markdown
## 文章质量检查清单

### 内容质量 ✅
- [ ] 原创度 > 85%
- [ ] 金句密度 > 每 500 字 1 个
- [ ] 段落长度 3-5 行
- [ ] 无 AI 套话（总而言之、不可否认）

### 风格一致性 ✅
- [ ] 短句为主，换行留白
- [ ] 真诚、专业、极客分享欲
- [ ] 使用 > 引用框突出金句
- [ ] 使用 **加粗** 强调关键词

### 排版规范 ✅
- [ ] 标题层级清晰
- [ ] 列表项格式统一
- [ ] 配图位置合理
- [ ] 阅读流畅度良好
```

### 3.3 配图质量检查

```markdown
## 配图质量检查清单

### 封面图 ✅
- [ ] 主题一眼可识别
- [ ] 有视觉焦点
- [ ] 色调吸引眼球
- [ ] 适合小尺寸展示
- [ ] 与标题呼应

### 内文图 ✅
- [ ] 与内容匹配
- [ ] 风格统一
- [ ] 清晰度高
- [ ] 尺寸合适
```

---

## 四、常见问题速查

### 4.1 发布问题

| 问题 | 症状 | 解决方案 |
|------|------|----------|
| IP 未在白名单 | errcode: 40164 | 公众号后台添加 IP |
| Token 失效 | errcode: 40001 | 自动刷新或手动获取 |
| 接口超限 | errcode: 45009 | 等待 1 小时后重试 |
| 图片过大 | 上传失败 | 压缩到 2MB 以内 |
| 内容违规 | 发布被拒绝 | 检查敏感词 |

### 4.2 创作问题

| 问题 | 症状 | 解决方案 |
|------|------|----------|
| 风格不一致 | 读起来像 AI | 使用 humanize-zh |
| 原创度低 | 与原文太像 | 增加个人经历 |
| 可读性差 | 长句太多 | 拆分为短句 |
| 金句不足 | 缺乏记忆点 | 强制添加金句 |

### 4.3 配图问题

| 问题 | 症状 | 解决方案 |
|------|------|----------|
| 配图不匹配 | 与内容无关 | 优化提示词 |
| 风格不统一 | 视觉割裂 | 使用风格模板 |
| 封面不吸引 | 点击率低 | 参考爆款封面 |
| 图片模糊 | 质量差 | 提高分辨率要求 |

---

## 五、效率优化技巧

### 5.1 并行化技巧

```bash
# 并行抓取多个 URL
cat urls.txt | xargs -P 4 -I {} npx -y bun scripts/main.ts {} -o output/

# 并行生成配图
for i in 1 2 3 4; do
  sessions_spawn(target="mi-hua", task="生成配图 $i") &
done
wait
```

### 5.2 模板化技巧

```bash
# 使用模板快速创建文章
cp template/article-template.md ~/workspace/mi-xin/03-内容工厂/2-初稿打磨区/新文章.md

# 使用提示词模板生成配图
cat template/cover-prompt.txt | sed "s/{topic}/AI/g" > prompt.txt
```

### 5.3 自动化技巧

```bash
# 一键发布脚本（待创建）
./scripts/publish.sh ~/workspace/mi-xin/文章.md

# 自动检查配置
./scripts/check-config.sh

# 自动归档
./scripts/archive.sh ~/workspace/mi-xin/文章.md
```

---

## 六、风险防控

### 6.1 发布风险

```markdown
## 发布风险防控

### 风险 1: IP 变更
- **概率**: 低
- **影响**: 高
- **防控**: IP 检测脚本 + 备用通道

### 风险 2: Token 过期
- **概率**: 中
- **影响**: 中
- **防控**: 自动刷新 + 失败重试

### 风险 3: 内容违规
- **概率**: 低
- **影响**: 高
- **防控**: 敏感词检测 + 人工审核

### 风险 4: 接口超限
- **概率**: 低
- **影响**: 中
- **防控**: 调用计数 + 限流机制
```

### 6.2 质量风险

```markdown
## 质量风险防控

### 风险 1: 风格不一致
- **概率**: 高
- **影响**: 中
- **防控**: humanize-zh + 质量检查

### 风险 2: 原创度不足
- **概率**: 中
- **影响**: 高
- **防控**: 原创度检测 + 深度改写

### 风险 3: 配图不匹配
- **概率**: 中
- **影响**: 中
- **防控**: 提示词优化 + 人工审核
```

---

## 七、升级路线图

### 7.1 本周目标 (W1)

- [ ] 安装 humanize-zh 技能
- [ ] 创建配置检查脚本
- [ ] 配图提示词模板化
- [ ] 更新 SOP V2.1

### 7.2 本月目标 (M1)

- [ ] 批量并行抓取系统
- [ ] 质量自动化检测
- [ ] 数据追踪看板
- [ ] 定时发布功能

### 7.3 本季度目标 (Q1)

- [ ] 多账号管理支持
- [ ] A/B 测试标题优化
- [ ] 智能选题推荐
- [ ] 素材自动抓取流水线

---

## 八、附录

### 8.1 常用命令速查

```bash
# 抓取素材
npx -y bun scripts/main.ts <url> -o <output>

# 转换 HTML
npx -y bun scripts/main.ts <md> --theme simple

# API 发布
npx -y bun scripts/wechat-api.ts <html> --title "标题"

# 配置检查
npx -y bun scripts/check-config.ts

# 调用 Agent
sessions_spawn(target="mi-wen", task="创作任务")
```

### 8.2 关键文件路径

```
~/workspace/mi-xin/
├── SOP_GZH.md                    # 标准作业程序
├── MEMORY.md                     # 核心记忆
├── playbook.md                   # 本手册
├── changelog.md                  # 版本变更
├── 01-灵感与素材库/
│   ├── 1-日常灵感剪报/
│   └── 2-爆款素材片段/
├── 02-选题库/
│   └── 待写选题库/
├── 03-内容工厂/
│   ├── 1-大纲挑选区/
│   ├── 2-初稿打磨区/
│   └── 3-终稿确认区/
└── 04-已发布归档/
    └── 公众号已发布/
```

### 8.3 关键配置

```bash
# ~/.canghe-skills/.env
WECHAT_APP_ID=your_app_id
WECHAT_APP_SECRET=your_app_secret
WECHAT_BROWSER_CHROME_PATH=/usr/bin/google-chrome
default_publish_method=api
```

---

**手册版本**: V1.0  
**最后更新**: 2026-03-10  
**维护者**: mi-xin (微信运营)
