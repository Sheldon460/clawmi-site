# 📒 Notebook Handbook Style 技能快速指南

## 一句话描述
将文章内容转换为**小绿书手帐风格**的视觉笔记图片。

## 何时使用
- 用户说："生成手帐风格图片"
- 用户说："小绿书风格"
- 用户说："视觉笔记"
- 用户说："读书笔记图片"
- 需要将文章/笔记转换为美观的分享图片

## 快速调用

### 方式一：直接调用脚本
```bash
python3 ~/.openclaw/skills/skills/notebook-handbook-style/scripts/generate.py \
  --content "文章内容..." \
  --title "标题" \
  --output ./output.png
```

### 方式二：从文件读取
```bash
python3 ~/.openclaw/skills/skills/notebook-handbook-style/scripts/generate.py \
  --file ./article.txt \
  --title "我的读书笔记" \
  --output ./notebook.png
```

### 方式三：仅生成提示词（用于 Google Media MCP）
```bash
python3 ~/.openclaw/skills/skills/notebook-handbook-style/scripts/generate.py \
  --content "文章内容..." \
  --title "标题" \
  --prompt-only
```

## 工作流程

1. **分析内容** → 识别标题层级和核心内容
2. **生成提示词** → 构建优化后的 Imagen 提示词
3. **调用图像生成** → 使用 Google Media MCP (Imagen) 生成图片
4. **输出结果** → 保存手帐风格图片

## 输出特征

- ✅ 柔和配色（薄荷绿、粉色、奶油色）
- ✅ 层次清晰的标题结构
- ✅ 可爱卡通插画装饰
- ✅ 数字编号和视觉引导
- ✅ 和纸胶带、星星、爱心等装饰元素

## 示例

**输入内容**：
```
如何建立高效的晨间 routine

一、早起的好处
1. 大脑更清晰
2. 时间更充裕
3. 心态更积极

二、核心要素
1. 不碰手机
2. 喝温水
3. 轻度运动
```

**输出**：美观的手帐风格视觉笔记图片

## 技术细节

- **技能路径**: `~/.openclaw/skills/skills/notebook-handbook-style/`
- **主脚本**: `scripts/generate.py`
- **图像生成**: Google Imagen 4.0 Fast (via Media MCP)
- **输出格式**: PNG
- **默认尺寸**: 1024x1024

## 记忆锚点

> 当用户需要生成手帐风格图片时，调用 `notebook-handbook-style` 技能，使用 `--content` 或 `--file` 参数传入内容，自动生成优化提示词并通过 Google Media MCP 生成图片。
