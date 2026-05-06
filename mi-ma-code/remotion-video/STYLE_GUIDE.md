# OpenClaw 视频制作指南

## 🎨 设计系统

### 颜色规范

| 名称 | 色值 | 用途 |
|------|------|------|
| Background | `#0a0a0f` | 主背景色 |
| Primary | `#00d4ff` | 主色调 (科技蓝) |
| Primary Dark | `#00a8cc` | 主色暗色变体 |
| Primary Light | `#4de8ff` | 主色亮色变体 |
| Accent | `#7c3aed` | 强调色 (紫色) |
| Text Primary | `#ffffff` | 主文字色 |
| Text Secondary | `rgba(255,255,255,0.7)` | 次要文字色 |
| Text Muted | `rgba(255,255,255,0.5)` | 弱化文字色 |
| Border | `rgba(0,212,255,0.3)` | 边框色 |
| Glow | `rgba(0,212,255,0.5)` | 光晕效果色 |

### 动画时序

```
场景时长分布:
├── 开场痛点   8秒 (240帧)
├── 理念升华  10秒 (300帧)
├── 三件套    20秒 (600帧)
├── 实战四板斧 25秒 (750帧)
├── 避坑清单  15秒 (450帧)
└── 结尾      12秒 (360帧)
─────────────────────────
总计         90秒 (2700帧)
```

### 字幕系统

字幕轨道位于视频底部，预留了以下区域：

- **字幕容器**: 距底部 120px
- **安全区域**: 左右边距 80px
- **字幕样式**: 48px / 粗体 / 白色
- **背景遮罩**: 半透明黑色 + 毛玻璃效果

## 🔧 开发指南

### 添加新场景

1. 在 `src/scenes/` 下创建新目录
2. 创建场景组件文件
3. 在 `MainVideo.tsx` 中添加 Sequence
4. 在 `SubtitleTrack.tsx` 中添加字幕配置

### 自定义动画

所有动画基于 Remotion 的 `interpolate` 和 `Easing` 函数：

```typescript
import { interpolate, Easing } from "remotion";

// 缓动函数示例
const opacity = interpolate(
  frame,
  [0, 30],           // 帧范围
  [0, 1],            // 值范围
  { 
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  }
);
```

### 组件使用示例

```tsx
// 场景容器 - 自动处理入场/出场动画
<SceneContainer durationInFrames={300}>
  {/* 场景内容 */}
</SceneContainer>

// 动画文字
<AnimatedText
  text="标题文字"
  size="large"       // small | medium | large | xlarge
  weight="bold"      // normal | bold | extrabold
  color="primary"    // primary | secondary | muted | accent
  delay={30}         // 延迟帧数
  glow               // 是否发光
/>

// 科技卡片
<TechCard delay={50} highlight>
  {/* 卡片内容 */}
</TechCard>

// 科技图标
<TechIcon icon="🤖" size={64} delay={20} pulse />
```

## 📊 渲染参数

### 推荐输出设置

```json
{
  "format": "mp4",
  "codec": "h264",
  "crf": 18,
  "fps": 30,
  "width": 1920,
  "height": 1080
}
```

### 背景音乐建议

- 风格: 科技感 / 电子 / 氛围
- BPM: 100-120
- 音量: -20dB (作为背景)
- 推荐: Epidemic Sound / Artlist 科技类音乐

### 字幕导出

字幕内容已内置在 `SubtitleTrack.tsx` 中，可通过修改 `SUBTITLES` 对象导出为 SRT 格式。

## 🚀 性能优化

1. **使用 useMemo**: 避免重复计算
2. **延迟加载**: 使用 `Sequence` 组件按需渲染
3. **简化动画**: 减少复杂路径动画
4. **图片优化**: 使用 WebP 格式
5. **帧数控制**: 合理设置关键帧密度

## 📝 常见问题

### Q: 如何修改视频总时长？
A: 编辑 `src/config.ts` 中的 `VIDEO_CONFIG.totalDuration` 和各场景时长。

### Q: 如何更换主题色？
A: 编辑 `src/config.ts` 中的 `THEME` 对象，全局颜色会自动更新。

### Q: 字幕不显示？
A: 检查 `SubtitleTrack` 组件是否在 `MainVideo` 中正确引入，以及 `timeline` 配置是否正确。

### Q: 动画卡顿？
A: 减少同时渲染的元素数量，使用 `Sequence` 分段渲染。

## 📚 参考资源

- [Remotion 官方文档](https://www.remotion.dev/docs)
- [React 动画指南](https://reactjs.org/docs/animation.html)
- [Easing 函数速查](https://easings.net/)
- [CSS 渐变生成器](https://cssgradient.io/)

---

**维护者**: mi-ma-code (幂码-编程)  
**最后更新**: 2026-03-25