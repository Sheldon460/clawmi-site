# OpenClaw 宣传视频

基于 Remotion 构建的科技感深色主题宣传视频项目。

## 🎬 项目概述

- **分辨率**: 1920×1080 (横版)
- **帧率**: 30 FPS
- **总时长**: 约 90 秒
- **主题色**: #0a0a0f (背景) / #00d4ff (主色)

## 📁 项目结构

```
remotion-video/
├── package.json           # 项目依赖
├── tsconfig.json          # TypeScript 配置
├── remotion.config.ts     # Remotion 配置
├── src/
│   ├── index.ts           # 入口文件
│   ├── Root.tsx           # 根组件
│   ├── config.ts          # 全局配置 (主题、动画、字幕)
│   ├── compositions/
│   │   └── MainVideo.tsx  # 主视频编排
│   ├── components/
│   │   ├── Background.tsx     # 背景效果 (网格、粒子、光晕)
│   │   ├── ProgressBar.tsx    # 进度条
│   │   ├── SubtitleTrack.tsx  # 字幕轨道
│   │   ├── SceneContainer.tsx # 场景容器 (入场/出场动画)
│   │   ├── TechCard.tsx       # 科技卡片组件
│   │   ├── AnimatedText.tsx   # 动画文字组件
│   │   └── TechIcon.tsx       # 科技图标组件
│   └── scenes/
│       ├── 01_Intro/
│       │   └── IntroScene.tsx     # 开场痛点场景
│       ├── 02_Concept/
│       │   └── ConceptScene.tsx   # 理念升华场景
│       ├── 03_Features/
│       │   └── FeaturesScene.tsx  # 三件套详解场景
│       ├── 04_Workflow/
│       │   └── WorkflowScene.tsx  # 实战四板斧场景
│       ├── 05_Pitfalls/
│       │   └── PitfallsScene.tsx  # 避坑清单场景
│       └── 06_Outro/
│           └── OutroScene.tsx     # 结尾场景
```

## 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动预览
npm start

# 渲染视频
npm run build
```

## 🎨 场景说明

### 1. 开场痛点 (0-8秒)
- 模拟终端窗口
- 展示手动操作的痛点
- 引出问题：效率太低

### 2. 理念升华 (8-18秒)
- 传统工具 vs OpenClaw 对比
- VS 对战形式展示
- 突出"主动管家"理念

### 3. 三件套详解 (18-38秒)
- Heartbeat 心跳系统
- Cron 定时任务
- Memory 记忆系统
- 卡片式布局 + 连接线动画

### 4. 实战四板斧 (38-63秒)
- 时间轴形式展示
- 清晨情报 → 全天监控 → 午间洗稿 → 晚间复盘
- 24小时运营闭环

### 5. 避坑清单 (63-78秒)
- 四大注意事项
- 网格卡片布局
- 错峰运行、主次分明、失败提醒、频率控制

### 6. 结尾 (78-90秒)
- Logo 动画
- 品牌标语
- CTA 按钮

## 🎯 设计特点

- **深色科技主题**: 纯黑背景 + 青色主色
- **流畅动画**: 所有元素都有入场/出场动画
- **字幕轨道**: 底部预留字幕显示区域
- **组件化**: 所有场景和元素都是独立组件
- **可配置**: 主题色、时长等可在 config.ts 中调整

## 📝 自定义

### 修改主题色

编辑 `src/config.ts`:

```typescript
export const THEME = {
  background: "#0a0a0f",
  primary: "#00d4ff",
  // ...
};
```

### 修改字幕内容

编辑 `src/components/SubtitleTrack.tsx` 中的 `SUBTITLES` 对象。

### 调整场景时长

编辑 `src/config.ts` 中的 `VIDEO_CONFIG.scenes`。

## 📦 依赖

- remotion: ^4.0.0
- react: ^18.2.0
- typescript: ^5.3.3

## 📄 License

MIT