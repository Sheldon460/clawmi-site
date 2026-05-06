# mi-hua 统一配图任务模板
# 版本: V2.2
# 使用场景: 公众号文章配图全流程

## 任务信息
- **任务名称**: 配图全流程
- **负责 Agent**: mi-hua (幂画)
- **输入**: 文章初稿 (Markdown)
- **输出**: 配图完成的文章 (Markdown + 5 张图片)

---

## 执行步骤

### Step 1: 调用 baoyu-article-illustrator 分析文章

```bash
npx -y bun ~/.openclaw/skills/baoyu-article-illustrator/scripts/main.ts \
  <article.md> \
  --type auto \
  --style notion \
  --density per-section \
  --auto-confirm
```

**预期输出**:
- `outline.md` - 配图大纲
- `prompts/` - 提示词文件

---

### Step 2: 生成封面图（特殊处理）

**尺寸**: 900×383 (2.35:1)
**类型**: scene 或 infographic
**风格**: notion

```bash
# 从 outline.md 提取封面图提示词
COVER_PROMPT=$(grep -A 5 "封面图" outline.md | grep "Prompt" | cut -d':' -f2)

# 生成封面图
npx -y bun generate-image.ts \
  --prompt "$COVER_PROMPT" \
  --aspect 2.35:1 \
  --size 900x383 \
  --output 00_cover.png
```

---

### Step 3: 生成正文图（统一 4:3）

**尺寸**: 800×600 (4:3)
**类型**: 根据 outline.md 自动选择

```bash
# 循环生成 4 张正文图
for i in 1 2 3 4; do
  PROMPT=$(grep -A 5 "Illustration $i" outline.md | grep "Prompt" | cut -d':' -f2)
  
  npx -y bun generate-image.ts \
    --prompt "$PROMPT" \
    --aspect 4:3 \
    --size 800x600 \
    --output "0${i}_section${i}.png"
done
```

---

### Step 4: 自动插入配图

**插入位置**:
1. 引言后 → 封面图
2. 第一部分后 → 01_section1.png
3. 第二部分后 → 02_section2.png
4. 第三部分后 → 03_section3.png
5. 第四部分后 → 04_section4.png

```javascript
// 自动插入逻辑
const insertImages = (article, imageDir) => {
  // 引言后插入封面图
  article = article.replace(
    /(这就是飞书妙搭 OpenClaw 的 slogan。)/,
    `$1\n\n![封面图](${imageDir}00_cover.png)`
  );
  
  // 各章节后插入配图
  article = article.replace(
    /(## 第一部分：.*\n)/,
    `$1\n![第一部分](${imageDir}01_section1.png)\n`
  );
  
  // ... 其他章节
  
  return article;
};
```

---

## 输出检查清单

- [ ] baoyu-article-illustrator 分析完成
- [ ] outline.md 已生成
- [ ] prompts/ 已生成
- [ ] 封面图已生成（900×383, 2.35:1）
- [ ] 正文图已生成（800×600, 4:3）
- [ ] 所有配图已自动插入文章
- [ ] 图片质量已检查（清晰度、风格一致性）

---

## 质量要求

1. **封面图**
   - 尺寸: 900×383 像素
   - 比例: 2.35:1
   - 文件大小: < 2MB
   - 清晰度: 高清，无模糊

2. **正文图**
   - 尺寸: 800×600 像素
   - 比例: 4:3
   - 文件大小: < 2MB
   - 风格: 与封面图统一（notion 风格）

3. **插入位置**
   - 封面图: 引言后
   - 正文图: 各章节标题后
   - 格式: `![描述](路径)`

---

## 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|----------|
| 封面图裁剪失败 | 比例不正确 | 确保 2.35:1 比例 |
| 正文图风格不一致 | 未统一 style 参数 | 全部使用 notion 风格 |
| 图片插入位置错误 | 正则匹配失败 | 手动检查并调整 |
| 图片生成失败 | 提示词问题 | 检查 prompts/ 文件 |

---

*模板版本: V2.2*
*创建时间: 2026-03-11*
