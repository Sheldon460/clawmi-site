# 幂码-架构 (mi-ma-arch) 色彩规范

## 主色 Primary Colors

| 名称 | 色值 | Hex | RGB | 用途 |
|------|------|-----|-----|------|
| **架构蓝** | ![#0A1628](https://via.placeholder.com/20/0A1628/0A1628) | `#0A1628` | `rgb(10, 22, 40)` | 品牌主色，深色背景，标题文字 |
| **电路青** | ![#00D4AA](https://via.placeholder.com/20/00D4AA/00D4AA) | `#00D4AA` | `rgb(0, 212, 170)` | 品牌辅色，高亮，按钮，强调 |

## 辅助色 Secondary Colors

| 名称 | 色值 | Hex | RGB | 用途 |
|------|------|-----|-----|------|
| **数据紫** | ![#6366F1](https://via.placeholder.com/20/6366F1/6366F1) | `#6366F1` | `rgb(99, 102, 241)` | 数据可视化，代码高亮，链接 |
| **警报橙** | ![#F97316](https://via.placeholder.com/20/F97316/F97316) | `#F97316` | `rgb(249, 115, 22)` | 警告状态，重点提示，CTA |
| **调试粉** | ![#EC4899](https://via.placeholder.com/20/EC4899/EC4899) | `#EC4899` | `rgb(236, 72, 153)` | 特殊标记，调试信息，装饰 |

## 中性色 Neutral Colors

| 名称 | 色值 | Hex | RGB | 用途 |
|------|------|-----|-----|------|
| **纯白** | ![#FFFFFF](https://via.placeholder.com/20/FFFFFF/FFFFFF) | `#FFFFFF` | `rgb(255, 255, 255)` | 浅色背景，反白文字 |
| **极浅灰** | ![#F8FAFC](https://via.placeholder.com/20/F8FAFC/F8FAFC) | `#F8FAFC` | `rgb(248, 250, 252)` | 卡片背景，悬停状态 |
| **浅灰** | ![#E2E8F0](https://via.placeholder.com/20/E2E8F0/E2E8F0) | `#E2E8F0` | `rgb(226, 232, 240)` | 分割线，边框 |
| **中灰** | ![#94A3B8](https://via.placeholder.com/20/94A3B8/94A3B8) | `#94A3B8` | `rgb(148, 163, 184)` | 次要文字，禁用状态 |
| **深灰** | ![#475569](https://via.placeholder.com/20/475569/475569) | `#475569` | `rgb(71, 85, 105)` | 正文内容 |
| **暗黑** | ![#1E293B](https://via.placeholder.com/20/1E293B/1E293B) | `#1E293B` | `rgb(30, 41, 59)` | 深色背景 |
| **纯黑** | ![#0F172A](https://via.placeholder.com/20/0F172A/0F172A) | `#0F172A` | `rgb(15, 23, 42)` | 标题文字，深色卡片 |

## 强调色 Accent Colors (状态)

| 名称 | 色值 | Hex | RGB | 用途 |
|------|------|-----|-----|------|
| **成功绿** | ![#22C55E](https://via.placeholder.com/20/22C55E/22C55E) | `#22C55E` | `rgb(34, 197, 94)` | 成功状态，完成提示 |
| **错误红** | ![#EF4444](https://via.placeholder.com/20/EF4444/EF4444) | `#EF4444` | `rgb(239, 68, 68)` | 错误状态，删除操作 |
| **警告黄** | ![#EAB308](https://via.placeholder.com/20/EAB308/EAB308) | `#EAB308` | `rgb(234, 179, 8)` | 警告提示，注意信息 |
| **信息蓝** | ![#3B82F6](https://via.placeholder.com/20/3B82F6/3B82F6) | `#3B82F6` | `#3B82F6` | 信息提示，帮助链接 |

## 渐变规范 Gradients

### 品牌主渐变
```css
background: linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #00D4AA 100%);
```

### 霓虹赛博渐变
```css
background: linear-gradient(90deg, #00D4AA 0%, #6366F1 50%, #EC4899 100%);
```

### 深色背景渐变
```css
background: linear-gradient(180deg, #0A1628 0%, #0F172A 100%);
```

### 电路青光晕
```css
background: radial-gradient(circle at 30% 30%, 
  rgba(0, 212, 170, 0.3) 0%, 
  transparent 70%);
```

## 色彩使用比例

在界面设计中，推荐以下色彩分配比例：

- **60%** - 主色/中性色（背景、大面积色块）
- **30%** - 辅助色（卡片、次级区块）
- **10%** - 强调色（按钮、CTA、重点标记）

## Adobe/设计软件色板

### ASE 色板导出
```
; Photoshop/GIMP Palette
; Name: mi-ma-arch-brand
; Columns: 4

#0A1628 架构蓝
#00D4AA 电路青
#6366F1 数据紫
#F97316 警报橙
#EC4899 调试粉
#FFFFFF 纯白
#F8FAFC 极浅灰
#E2E8F0 浅灰
#94A3B8 中灰
#475569 深灰
#1E293B 暗黑
#0F172A 纯黑
#22C55E 成功绿
#EF4444 错误红
#EAB308 警告黄
#3B82F6 信息蓝
```

---

*© 2026 mi-ma-arch Brand Guidelines. Design by mi-hua.*
