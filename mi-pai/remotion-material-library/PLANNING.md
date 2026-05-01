# 视频规划：爆款素材库

## 基础信息
- **标题**: 终极揭秘：如何用 OpenClaw 搭建爆款素材库，实现选题自由
- **屏幕方向**: 横屏 1920×1080
- **目标平台**: B站
- **预估总时长**: 100 秒

## 幕次结构

| 幕次 | 主题 | 时长 | 视觉元素 |
|------|------|------|----------|
| Scene 1 | 开场+标题 | 8s | 大标题动画 + 发光效果 |
| Scene 2 | 痛点共鸣 | 15s | 对比图：碎片化 vs 淡水库 |
| Scene 3 | 四步流程 | 45s | 四步流程图（监控→初筛→预处理→存档）|
| Scene 4 | 实战转变 | 20s | 前后对比时间轴 |
| Scene 5 | 金句总结 | 12s | 大字金句展示 |

## 视觉风格
- **配色**: 科技深色（深蓝 #0a0a0f + 青色 #00d4ff）
- **字体**: 白色粗体 + 青色发光描边
- **动画**: Spring `{ damping: 200 }` 平滑入场
- **转场**: Fade + Slide 组合

## 配音方案
- **API**: Minimax
- **音色**: sheldon009
- **语速**: 1.0

## 项目文件

```
remotion-material-library/
├── src/
│   ├── compositions/MainVideo.tsx  # 主视频组件
│   ├── scenes/
│   │   ├── Scene01.tsx  # 开场
│   │   ├── Scene02.tsx  # 痛点
│   │   ├── Scene03.tsx  # 四步流程
│   │   ├── Scene04.tsx  # 实战转变
│   │   └── Scene05.tsx  # 金句总结
│   ├── components/Subtitle.tsx  # 字幕组件
│   ├── utils/get-audio-duration.ts
│   ├── config.ts  # 配置文件
│   ├── Root.tsx
│   └── index.ts
├── public/audio/  # 配音和 BGM
├── scripts/
│   ├── voiceover-scripts.json  # 配音文案
│   └── generate-all-voiceover.cjs  # 配音生成脚本
└── remotion.config.ts
```

## 待完成事项

1. [ ] 配置 Minimax API Key
2. [ ] 生成配音文件
3. [ ] 添加 BGM
4. [ ] 渲染测试
5. [ ] 最终输出

## 运行命令

```bash
cd remotion-material-library

# 预览
npm run dev

# 生成配音
node scripts/generate-all-voiceover.cjs

# 渲染
npm run build
```