# 幂码-架构 (mi-ma-arch) 字体规范

## 字体家族 Font Families

### 中文字体 Chinese Typefaces

| 用途 | 首选字体 | 备选字体 | 备选字体2 |
|------|----------|----------|-----------|
| **标题** | 思源黑体 Bold | 阿里巴巴普惠体 Bold | 微软雅黑 Bold |
| **正文** | 思源黑体 Regular | 阿里巴巴普惠体 Regular | 微软雅黑 |
| **等宽** | 思源黑体 Mono | 阿里巴巴普惠体 Mono | Noto Sans Mono |

**字体下载/引用**:
```css
/* Google Fonts (Web) */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap');

/* 阿里巴巴普惠体 (Web) */
@import url('https://cdn.jsdelivr.net/npm/alibaba-puhuiti-2/Alibaba-PuHuiTi-Bold/Alibaba-PuHuiTi-Bold.css');
```

### 英文字体 English Typefaces

| 用途 | 首选字体 | 备选字体 | 备选字体2 |
|------|----------|----------|-----------|
| **标题** | Inter Bold | SF Pro Display Bold | Roboto Bold |
| **正文** | Inter Regular | SF Pro Text | Roboto Regular |
| **等宽代码** | JetBrains Mono | Fira Code | Source Code Pro |
| **Logo/展示** | Space Grotesk | Sora | Syne |

**字体下载/引用**:
```css
/* Google Fonts (Web) */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600&display=swap');
```

---

## 字体层级 Typography Scale

### 中文层级 Chinese Scale

| 层级 | 用途 | 字号 | 字重 | 行高 | 字间距 |
|------|------|------|------|------|--------|
| **H1** | 页面主标题 | 48px / 3rem | Bold (700) | 1.4 | 0.02em |
| **H2** | 章节标题 | 36px / 2.25rem | Bold (700) | 1.5 | 0.02em |
| **H3** | 小节标题 | 28px / 1.75rem | Medium (500) | 1.6 | 0.01em |
| **H4** | 卡片标题 | 22px / 1.375rem | Medium (500) | 1.5 | 0.01em |
| **H5** | 标签/小标题 | 18px / 1.125rem | Medium (500) | 1.6 | 0.02em |
| **H6** | 注释标签 | 14px / 0.875rem | Medium (500) | 1.5 | 0.02em |
| **Body Large** | 大段正文 | 18px / 1.125rem | Regular (400) | 1.8 | 0.02em |
| **Body** | 标准正文 | 16px / 1rem | Regular (400) | 1.75 | 0.02em |
| **Body Small** | 小字正文 | 14px / 0.875rem | Regular (400) | 1.6 | 0.02em |
| **Caption** | 辅助说明 | 12px / 0.75rem | Regular (400) | 1.5 | 0.02em |

### 英文层级 English Scale

| 层级 | 用途 | 字号 | 字重 | 行高 | 字间距 |
|------|------|------|------|------|--------|
| **H1** | Hero Title | 64px / 4rem | Bold (700) | 1.1 | -0.02em |
| **H2** | Section Title | 48px / 3rem | Bold (700) | 1.2 | -0.01em |
| **H3** | Subsection | 32px / 2rem | SemiBold (600) | 1.3 | -0.01em |
| **H4** | Card Title | 24px / 1.5rem | SemiBold (600) | 1.4 | 0 |
| **Body Large** | Lead Text | 20px / 1.25rem | Regular (400) | 1.6 | 0 |
| **Body** | Body Text | 16px / 1rem | Regular (400) | 1.6 | 0 |
| **Small** | Small Text | 14px / 0.875rem | Regular (400) | 1.5 | 0.01em |
| **Caption** | Caption | 12px / 0.75rem | Medium (500) | 1.4 | 0.02em |
| **Code** | Code | 14px / 0.875rem | Regular (400) | 1.6 | 0 |

---

## 代码字体规范 Code Typography

### 代码展示样式

```css
.code-block {
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 14px;
  line-height: 1.6;
  background-color: #0A1628;
  color: #E2E8F0;
  padding: 16px;
  border-radius: 8px;
  border-left: 3px solid #00D4AA;
}
```

### 代码语法高亮配色

| Token | 颜色 | 用途 |
|-------|------|------|
| **Keyword** | `#EC4899` (调试粉) | 关键字、保留字 |
| **Function** | `#00D4AA` (电路青) | 函数名、方法 |
| **String** | `#22C55E` (成功绿) | 字符串 |
| **Number** | `#F97316` (警报橙) | 数字、常量 |
| **Comment** | `#94A3B8` (中灰) | 注释 |
| **Variable** | `#E2E8F0` (浅灰) | 变量 |
| **Type** | `#6366F1` (数据紫) | 类型、类名 |
| **Operator** | `#00D4AA` (电路青) | 运算符 |

---

## 排版规则 Typography Rules

### 中文排版

1. **标点挤压**: 中文标点使用全角，与文字间距自动挤压
2. **行首避头尾**: 标点符号不出现在行首
3. **中西文混排**: 中英文之间添加 0.125em 间距
4. **数字处理**: 阿拉伯数字使用比例字体，避免使用全角数字

### 响应式排版

| 断点 | 基础字号 | 比例因子 |
|------|----------|----------|
| < 768px (Mobile) | 14px | 0.875 |
| 768px - 1024px (Tablet) | 15px | 0.9375 |
| > 1024px (Desktop) | 16px | 1 |

### 文本对比度

- **正文文字**: 对比度 ≥ 4.5:1 (AA级)
- **大文字/标题**: 对比度 ≥ 3:1 (AA级)
- **高对比度推荐**: 7:1 (AAA级)

---

## 字体资源链接

### Google Fonts (推荐)
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+SC:wght@400;500;700&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
```

### 本地安装包
- **思源黑体**: https://github.com/adobe-fonts/source-han-sans/releases
- **阿里巴巴普惠体**: https://www.alibabafonts.com/
- **JetBrains Mono**: https://www.jetbrains.com/lp/mono/
- **Inter**: https://rsms.me/inter/

---

*© 2026 mi-ma-arch Typography Guidelines. Design by mi-hua.*
