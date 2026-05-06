# canghe-xhs-images 技能安装指南

> **创建日期**: 2026-03-10  
> **状态**: ⚠️ 需要 GitHub 认证  
> **替代方案**: 即梦 AI 网页版 + Python 脚本

---

## 📦 方案 1: 官方技能安装（需要认证）

### 前提条件
- GitHub 账号已配置 SSH 密钥或 Personal Access Token
- 已安装 Node.js 和 npm

### 安装步骤

```bash
# 1. 配置 GitHub 认证（二选一）

# 方式 A: SSH 密钥
ssh-keygen -t ed25519 -C "your_email@example.com"
# 将 ~/.ssh/id_ed25519.pub 添加到 GitHub SSH Keys

# 方式 B: Personal Access Token
# https://github.com/settings/tokens
# 勾选：repo, workflow
export GITHUB_TOKEN="ghp_xxxxxxxxxxxxxxxxxxxx"

# 2. 克隆技能仓库
cd ~/.openclaw/extensions/feishu-openclaw-plugin/skills/
git clone git@github.com:sheldon-empire/canghe-xhs-images.git

# 3. 安装依赖
cd canghe-xhs-images
npm install

# 4. 配置环境变量
cat > .env << EOF
GOOGLE_GENMEDIA_API_KEY=your-api-key-here
JIMENG_API_KEY=your-jimeng-key-here
EOF

# 5. 验证安装
node --version
npm --version
ls -la

# 6. 测试使用
/canghe-xhs-images --help
```

### 使用示例

```bash
# 生成封面图
/canghe-xhs-images content.md \
  --style minimal \
  --layout list \
  --count 1

# 生成完整套装（封面 +5 内页）
/canghe-xhs-images content.md \
  --style notion \
  --layout balanced \
  --count 6

# 参数说明
--style: minimal | notion | bold | cute | study-notes
--layout: sparse | balanced | dense | list | comparison
--count: 生成图片数量（1-9）
```

---

## 🎨 方案 2: 即梦 AI 网页版（推荐，无需安装）

### 访问地址
- **即梦 AI**: https://jimeng.jianying.com
- **需要账号**: 抖音/今日头条账号登录

### 使用流程

#### Step 1: 准备提示词
```
小红书风格封面图，主题"OpenClaw 效率工具包上线"。
蓝紫渐变背景 (#6366F1 → #8B5CF6)，
中央白色大字"效率工具包上线🚀"，
底部"一键解锁 6 大办公模块"，
极简科技感，高清质感，3:4 竖版比例。
```

#### Step 2: 设置参数
- **比例**: 3:4（竖版）
- **尺寸**: 900x1200px 或更大
- **风格**: 简约/科技/商务
- **数量**: 1-4 张

#### Step 3: 生成并下载
1. 点击「生成」按钮
2. 等待 30-60 秒
3. 选择最佳结果
4. 下载高清图片

### 提示词模板库

#### 模板 1: 产品发布
```
小红书风格封面图，主题"[产品名] 上线"。
[品牌色] 渐变背景，
中央白色大字"[主标题]"，
底部"[副标题]"，
[emoji] 装饰元素，
整体氛围 [风格描述]，
高清质感，3:4 竖版比例。
```

#### 模板 2: 工具推荐
```
小红书风格知识分享封面，主题"[数量] 个 [类别] 推荐"。
[配色方案] 背景，
中央大号文字"[核心卖点]"，
装饰元素 [图标/emoji]，
适合 [目标人群]，
专业现代吸睛，高清质感，3:4 竖版。
```

#### 模板 3: 教程步骤
```
小红书风格教程封面，主题"[主题] 完整教程"。
[配色] 背景，
中央"[步骤数] 步搞定]"，
列出关键步骤 [1-2-3]，
适合新手学习，
清晰易懂，高清质感，3:4 竖版。
```

---

## 🐍 方案 3: Python 脚本（已实现，立即可用）

### 使用方式

```bash
# 生成完整配图套装（6 张）
cd /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-book/scripts
python3 generate_images.py --demo --date "2026-03-10"

# 输出
✅ 配图套装生成完成！
📊 生成数量：6 张（1 封面 +5 内页）
```

### 自定义内容

```bash
# 1. 准备内容文件
cat > content.md << 'EOF'
# 我的笔记标题

## 副标题
一键解锁 X 大模块

## 亮点
- 功能 1
- 功能 2
- 功能 3
EOF

# 2. 生成配图
python3 generate_images.py \
  --title "我的笔记标题" \
  --content "content.md" \
  --date "2026-03-10"
```

### 优势
- ✅ 无需安装额外技能
- ✅ 无需 API 密钥
- ✅ 完全自动化
- ✅ 可自定义内容

### 限制
- ⚠️ 字体渲染使用系统默认
- ⚠️ 背景为纯色（非渐变）
- ⚠️ 无 AI 生成创意

---

## 📊 方案对比

| 方案 | 安装难度 | 使用成本 | 图片质量 | 推荐场景 |
|------|---------|---------|---------|---------|
| 官方技能 | ⭐⭐⭐⭐ | API 费用 | ⭐⭐⭐⭐⭐ | 专业运营 |
| 即梦 AI | ⭐⭐ | 免费/付费 | ⭐⭐⭐⭐ | 日常使用 |
| Python 脚本 | ⭐ | 免费 | ⭐⭐⭐ | 快速测试 |

---

## 🔄 推荐方案（当前）

### 立即可用：Python 脚本 + 即梦 AI

```bash
# 1. 使用 Python 脚本生成基础配图
python3 scripts/generate_images.py --demo

# 2. 对封面图要求高时，使用即梦 AI 重新生成
# 访问：https://jimeng.jianying.com
# 使用提示词模板生成高质量封面

# 3. 发布时使用混合方案
# - 封面：即梦 AI 生成（高质量）
# - 内页：Python 脚本生成（快速）
```

### 未来升级：官方技能

当满足以下条件时，升级到官方技能：
1. GitHub 认证已配置
2. 需要批量生成（>10 篇/天）
3. 需要 AI 创意生成
4. 预算充足（API 费用）

---

## 📁 相关文件

| 文件 | 路径 | 说明 |
|------|------|------|
| 视觉设计规范 | `design/visual-design-spec-v1.0.md` | 配色/字体/模板 |
| 配图生成脚本 | `scripts/generate_images.py` | 自动化配图 |
| 提示词模板 | 本文档 | 即梦 AI 使用 |

---

## 📞 有问题找谁？

| 问题类型 | 联系人 | 说明 |
|---------|--------|------|
| 技能安装 | mi-yun | DevOps 支持 |
| 视觉设计 | mi-hua | 设计规范咨询 |
| 即梦 AI 使用 | mi-book | 提示词优化 |
| API 配置 | mi-ma-arch | 技术架构 |

---

*文档版本：V1.0*  
*最后更新：2026-03-10*  
*维护人：mi-book*
