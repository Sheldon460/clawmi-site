# 光影效果规范

## 发光效果 (Glow Effects)

### 主发光 (Primary Glow)
```css
/* 电路青发光 - 品牌主发光 */
box-shadow: 0 0 20px rgba(0, 212, 170, 0.5);
box-shadow: 0 0 40px rgba(0, 212, 170, 0.3);

/* 强烈发光 - 悬停/激活状态 */
box-shadow: 0 0 60px rgba(0, 212, 170, 0.4);
```

### 辅助发光 (Secondary Glow)
```css
/* 数据紫发光 */
box-shadow: 0 0 20px rgba(99, 102, 241, 0.4);

/* 警报橙发光 - 警告状态 */
box-shadow: 0 0 20px rgba(249, 115, 22, 0.4);

/* 调试粉发光 - 特殊标记 */
box-shadow: 0 0 20px rgba(236, 72, 153, 0.4);
```

### 内发光 (Inner Glow)
```css
/* 卡片内发光 */
box-shadow: inset 0 0 20px rgba(0, 212, 170, 0.1);

/* 输入框聚焦内发光 */
box-shadow: inset 0 0 0 2px rgba(0, 212, 170, 0.5);
```

## 渐变光晕 (Gradient Halos)

### 中心光晕 (Center Halo)
```css
background: radial-gradient(circle at 50% 50%, 
  rgba(0, 212, 170, 0.3) 0%, 
  transparent 70%);
```

### 角落光晕 (Corner Halo)
```css
/* 右上角光晕 */
background: radial-gradient(circle at 100% 0%, 
  rgba(0, 212, 170, 0.2) 0%, 
  transparent 50%);

/* 左下角光晕 */
background: radial-gradient(circle at 0% 100%, 
  rgba(99, 102, 241, 0.2) 0%, 
  transparent 50%);
```

### 边缘光晕 (Edge Glow)
```css
/* 顶部边缘光晕 */
box-shadow: 0 -10px 40px rgba(0, 212, 170, 0.2);

/* 底部边缘光晕 */
box-shadow: 0 10px 40px rgba(0, 212, 170, 0.2);
```

## 阴影效果 (Shadow Effects)

### 层级阴影 (Layered Shadows)
```css
/* 第一层 - 基础阴影 */
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

/* 第二层 - 中等深度 */
box-shadow: 
  0 2px 4px rgba(0, 0, 0, 0.3),
  0 8px 16px rgba(0, 0, 0, 0.2);

/* 第三层 - 高深度 */
box-shadow: 
  0 2px 4px rgba(0, 0, 0, 0.3),
  0 8px 16px rgba(0, 0, 0, 0.2),
  0 16px 32px rgba(0, 0, 0, 0.1);
```

### 彩色阴影 (Colored Shadows)
```css
/* 电路青彩色阴影 */
box-shadow: 0 8px 24px rgba(0, 212, 170, 0.25);

/* 数据紫彩色阴影 */
box-shadow: 0 8px 24px rgba(99, 102, 241, 0.25);

/* 暖色调阴影 (警报橙) */
box-shadow: 0 8px 24px rgba(249, 115, 22, 0.25);
```

### 长阴影 (Long Shadows)
```css
/* 扁平长阴影效果 */
box-shadow: 
  1px 1px 0 rgba(0, 0, 0, 0.1),
  2px 2px 0 rgba(0, 0, 0, 0.1),
  3px 3px 0 rgba(0, 0, 0, 0.1),
  ...
  20px 20px 0 rgba(0, 0, 0, 0.1);
```

## 扫描线效果 (Scanline Effects)

### 水平扫描线
```css
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 212, 170, 0.03) 2px,
    rgba(0, 212, 170, 0.03) 4px
  );
}
```

### CRT显示器效果
```css
.crt-effect {
  position: relative;
  overflow: hidden;
}

.crt-effect::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.15),
    rgba(0, 0, 0, 0.15) 1px,
    transparent 1px,
    transparent 2px
  );
  pointer-events: none;
}

/* 轻微闪烁动画 */
@keyframes flicker {
  0% { opacity: 0.97; }
  5% { opacity: 0.95; }
  10% { opacity: 0.9; }
  15% { opacity: 0.95; }
  20% { opacity: 0.99; }
  100% { opacity: 0.97; }
}

.crt-effect {
  animation: flicker 0.15s infinite;
}
```

## 故障艺术效果 (Glitch Effects)

**谨慎使用**: 故障效果仅用于特殊强调，不宜大面积使用。

```css
.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch::before {
  left: 2px;
  text-shadow: -2px 0 #00D4AA;
  clip: rect(24px, 550px, 90px, 0);
  animation: glitch-anim-2 3s infinite linear alternate-reverse;
}

.glitch::after {
  left: -2px;
  text-shadow: -2px 0 #6366F1;
  clip: rect(85px, 550px, 140px, 0);
  animation: glitch-anim 2.5s infinite linear alternate-reverse;
}

@keyframes glitch-anim {
  0% { clip: rect(14px, 9999px, 76px, 0); }
  20% { clip: rect(89px, 9999px, 21px, 0); }
  40% { clip: rect(3px, 9999px, 96px, 0); }
  60% { clip: rect(67px, 9999px, 34px, 0); }
  80% { clip: rect(23px, 9999px, 87px, 0); }
  100% { clip: rect(45px, 9999px, 12px, 0); }
}

@keyframes glitch-anim-2 {
  0% { clip: rect(65px, 9999px, 99px, 0); }
  20% { clip: rect(12px, 9999px, 54px, 0); }
  40% { clip: rect(78px, 9999px, 32px, 0); }
  60% { clip: rect(43px, 9999px, 87px, 0); }
  80% { clip: rect(91px, 9999px, 15px, 0); }
  100% { clip: rect(56px, 9999px, 68px, 0); }
}
```

## 动态效果 (Animation Effects)

### 脉冲动画 (Pulse Animation)
```css
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(0, 212, 170, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 212, 170, 0);
  }
}

.pulse-effect {
  animation: pulse 2s infinite;
}
```

### 呼吸动画 (Breathing Animation)
```css
@keyframes breathe {
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
}

.breathe-effect {
  animation: breathe 3s ease-in-out infinite;
}
```

### 扫描动画 (Scan Animation)
```css
@keyframes scan {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}

.scan-effect::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(0, 212, 170, 0.8), 
    transparent
  );
  animation: scan 2s linear infinite;
}
```

### 数据流动画 (Data Flow Animation)
```css
@keyframes dataFlow {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

.data-flow {
  stroke-dasharray: 10 5;
  animation: dataFlow 2s linear infinite;
}
```

---

## 效果使用建议

### 优先级推荐

| 优先级 | 效果 | 使用频率 | 适用场景 |
|--------|------|----------|----------|
| ★★★★★ | 发光效果 | 高频 | 按钮、卡片、Logo |
| ★★★★★ | 渐变光晕 | 高频 | 背景、Hero区域 |
| ★★★★☆ | 阴影效果 | 高频 | 卡片、浮动元素 |
| ★★★☆☆ | 扫描线 | 中频 | 复古科技风格 |
| ★★☆☆☆ | 故障艺术 | 低频 | 特殊强调、标题 |
| ★☆☆☆☆ | 动画效果 | 低频 | 交互动效 |

### 注意事项

1. **适度原则**: 不要在一个页面上使用过多效果
2. **性能考虑**: 动画效果可能影响性能，谨慎使用
3. **一致性**: 保持整个产品中使用的效果风格一致
4. **可访问性**: 确保效果不影响内容的可读性
5. **响应式**: 某些效果在小屏幕上可能需要禁用或简化

---

*© 2026 mi-ma-arch Brand Guidelines. Design by mi-hua.*
