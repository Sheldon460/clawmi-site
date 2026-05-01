# 配图服务修复与配置指南

## 当前状态

### 已安装工具
- ✅ `doubao-image` - 火山引擎豆包图像生成（~/.openclaw/skills/skills/doubao-image-openclaw/）
- ✅ `qwen-image-gen` - 阿里云 Qwen 图像生成（~/.openclaw/skills/qwen-image-gen/）
- ✅ `baoyu-article-illustrator` - 文章配图分析（~/.openclaw/skills/baoyu-article-illustrator/）
- ✅ OpenClaw `image_generate` - 内置图像生成工具

### 缺失工具
- ❌ `google-genmedia` - 未找到安装源
- ❌ `canvas-design` - 已安装 pls-canvas-design（但非 AI 生图工具）
- ❌ `jimeng` - 未找到
- ❌ `nano-banana-pro` - 只有提示词推荐技能

---

## 修复方案

### 方案 A：配置豆包 API（推荐，已安装）

需要用户提供火山引擎 API Key：

```bash
# 添加到 ~/.zshrc
export VOLCENGINE_IMAGE_API_KEY="your-api-key"

# 立即生效
source ~/.zshrc
```

**获取 API Key**:
1. 访问 https://console.volces.com/
2. 注册/登录账号
3. 进入 API Key 管理
4. 创建并复制 API Key

### 方案 B：配置 FAL API（OpenClaw 内置）

```bash
# 添加到 ~/.zshrc
export FAL_KEY="your-fal-key"

# 立即生效
source ~/.zshrc
```

**获取 API Key**:
1. 访问 https://fal.ai/
2. 注册账号
3. 进入 Dashboard > API Keys
4. 创建并复制 API Key

### 方案 C：配置 Google Gemini API

```bash
# 添加到 ~/.zshrc
export GEMINI_API_KEY="your-gemini-key"
# 或
export GOOGLE_API_KEY="your-google-key"

# 立即生效
source ~/.zshrc
```

**获取 API Key**:
1. 访问 https://makersuite.google.com/app/apikey
2. 创建 API Key

---

## 测试命令

### 测试豆包图像生成
```bash
python3 ~/.openclaw/skills/skills/doubao-image-openclaw/scripts/generate.py \
  "一只可爱的橘猫，写实风格" \
  --size 1024x1024
```

### 测试 OpenClaw 内置图像生成
```bash
# 需要配置 FAL_KEY 或 GEMINI_API_KEY
```

---

## 配图工作流程（修复后）

### 标准流程
1. **分析文章**: 使用 `baoyu-article-illustrator` 分析配图需求
2. **生成封面**: 使用 `doubao-image` 生成 900×383 封面图
3. **生成正文图**: 使用 `doubao-image` 生成 800×600 正文配图
4. **保存文件**: 保存到 `mi-xin/03-内容工厂/3-配图成品区/`
5. **更新 Markdown**: 替换为绝对路径

### 示例命令
```bash
# 生成封面图
python3 ~/.openclaw/skills/skills/doubao-image-openclaw/scripts/generate.py \
  "封面图提示词" \
  --size 1280x720 \
  --output /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/00_cover.png

# 生成正文图
python3 ~/.openclaw/skills/skills/doubao-image-openclaw/scripts/generate.py \
  "正文配图提示词" \
  --size 1024x768 \
  --output /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/mi-xin/03-内容工厂/3-配图成品区/01_illustration.png
```

---

## 下一步行动

请提供以下任一 API Key，我将立即配置并测试配图服务：

1. **火山引擎 API Key**（推荐，豆包图像生成）
2. **FAL API Key**（Flux 模型）
3. **Google Gemini API Key**（Gemini 图像生成）

配置完成后，配图服务将立即恢复正常工作。

---

*创建时间: 2026-04-01*
