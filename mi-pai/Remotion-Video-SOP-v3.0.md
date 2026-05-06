# Remotion 视频生成标准作业程序 (SOP) v3.0

> **版本**: v3.2  
> **更新日期**: 2026-03-26  
> **整合来源**: Remotion Best Practices + SOP.md + Remotion-制作问题复盘.md  
> **核心改进**: 
> - 整合 Remotion 官方最佳实践
> - 新增 `calculateMetadata` 动态时长计算
> - 新增 `TransitionSeries` 转场系统
> - 新增 Spring 动画配置
> - 优化配音流程（支持 ElevenLabs/Minimax）
> - 完善 sheldon009 配音生成流程和故障排查
> - **新增配音与字幕同步流程** ⚠️
> - **新增转场优化指南** ⚠️

---

## 📋 目录

1. [核心原则](#一核心原则)
2. [前置决策清单](#二前置决策清单)
3. [完整制作流程](#三完整制作流程)
4. [关键代码模式](#四关键代码模式)
5. [问题解决方案](#五问题解决方案)
6. [自动化工具](#六自动化工具)
7. [质量检查清单](#七质量检查清单)
8. [故障排除](#八故障排除)

---

## 一、核心原则

### 0.0 "先规划，后执行"原则 ⚠️⚠️⚠️
**这是最重要的原则！**

**流程顺序（强制执行）**：
```
用户输入 → 规划文档 → 用户确认 → 技术执行 → 渲染输出
```

**禁止行为**：
- ❌ 未经规划直接写代码
- ❌ 未经确认直接生成配音
- ❌ 边做边改，临时调整结构

### 1.1 "动态时长"原则（Remotion 最佳实践）
**使用 `calculateMetadata` 动态计算时长！**

```typescript
// ✅ 正确：动态计算
export const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  const durations = await Promise.all(
    AUDIO_FILES.map((file) => getAudioDuration(staticFile(file)))
  );
  return {
    durationInFrames: Math.ceil(durations.reduce((sum, d) => sum + d * FPS, 0)),
  };
};

// ❌ 错误：硬编码时长
const TOTAL_FRAMES = 300; // 禁止！
```

### 1.2 "组件化复用"原则
所有可变部分抽象为配置，禁止写死。

### 1.3 "Premount 优化"原则
**所有 Sequence 必须添加 `premountFor`！**

```tsx
// ✅ 正确
<Sequence premountFor={1 * fps}>
  <Title />
</Sequence>

// ❌ 错误：没有预加载
<Sequence>
  <Title />
</Sequence>
```

---

## 二、前置决策清单

> ⚠️ **此清单必须在任何代码编写前完成！**

### Step 1: 屏幕方向确认

| 方向 | 分辨率 | 适用平台 | 内容特点 |
|------|--------|----------|----------|
| **横屏** | 1920×1080 | B站、YouTube、公众号 | 适合复杂布局、多列展示、流程图 |
| **竖屏** | 1080×1920 | 抖音、视频号、小红书 | 适合手机观看、单列内容、人物出镜 |

### Step 2: 平台适配确认

| 平台 | 推荐时长 | 字幕要求 | BGM要求 |
|------|----------|----------|---------|
| 抖音 | 15-60秒 | 必须，大字醒目 | 热门音乐 |
| 视频号 | 30-90秒 | 建议，底部居中 | 轻柔背景 |
| B站 | 60-180秒 | 可选，弹幕文化 | 免版权音乐 |
| YouTube | 60-300秒 | 可选，CC字幕 | 免版权音乐 |

### Step 3: 配音方案确认

| 方案 | API | 音色 | 适用场景 |
|------|-----|------|----------|
| **ElevenLabs** | `api.elevenlabs.io` | 多语言高质量 | 国际化、高质量 |
| **Minimax** | `api.minimax.chat` | sheldon009 | 中文、Sheldon IP |

### Step 4: 动画风格确认

| 风格 | Spring 配置 | 适用场景 |
|------|-------------|----------|
| **平滑** | `{ damping: 200 }` | UI 元素、文字显示 |
| **干脆** | `{ damping: 20, stiffness: 200 }` | 按钮、交互反馈 |
| **弹跳** | `{ damping: 8 }` | 娱乐、游戏风格 |
| **沉重** | `{ damping: 15, stiffness: 80, mass: 2 }` | 强调、重点内容 |

---

## 三、完整制作流程

### Phase 0: 规划确认（必须先完成）

#### 0.1 创建规划文档 `PLANNING.md`

```markdown
## 视频规划：[标题]

### 基础信息
- 屏幕方向：横屏/竖屏
- 目标平台：B站/抖音/视频号
- 预估总时长：XXX 秒

### 幕次结构
| 幕次 | 主题 | 配音文案 | 视觉元素 |
|------|------|----------|----------|
| Scene1 | ... | ... | ... |
| ... | ... | ... | ... |

### 视觉风格
- 配色：科技深色/清新浅色
- 动画：Spring 配置
- 转场：fade/slide/wipe

### 音频配置
- 配音：ElevenLabs/Minimax
- BGM：音量 0.12-0.18
```

#### 0.2 用户确认流程
**必须获得用户确认：**
1. [ ] 结构确认（幕次时长分配）
2. [ ] 视觉风格确认（配色/字体/动画）
3. [ ] 配音方案确认（音色/语速）
4. [ ] 开始执行授权

---

### Phase 1: 项目初始化

#### 1.1 安装依赖
```bash
# Remotion 核心
npm install remotion @remotion/cli

# 媒体处理
npx remotion add @remotion/media

# 转场效果
npx remotion add @remotion/transitions

# 可选：Light Leaks
npx remotion add @remotion/light-leaks
```

#### 1.2 项目结构
```
remotion-project/
├── src/
│   ├── compositions/
│   │   └── MainVideo.tsx      # 主合成
│   ├── scenes/                 # 场景组件
│   ├── components/             # 复用组件
│   ├── utils/
│   │   └── get-audio-duration.ts
│   ├── config.ts               # 配置文件
│   └── Root.tsx
├── public/
│   └── audio/
│       ├── bgm.mp3
│       └── voiceover/
│           └── scene-01.mp3
├── scripts/
│   └── generate-voiceover.ts   # 配音生成
└── remotion.config.ts
```

---

### Phase 2: 配音生成

#### 2.1 Minimax TTS（中文推荐 - sheldon009）

**工具位置**: `scripts/generate-voiceover.cjs`

**音色**: `sheldon009`（Minimax 高质量中文男声）

**域名**: `api.minimax.chat`（⚠️ 注意不是 `minimaxi.chat`）

**步骤**:
```bash
# 1. 设置 API Key
export MINIMAX_API_KEY="sk-api-..."

# 2. 运行生成脚本
cd remotion-material-library
node scripts/generate-voiceover.cjs

# 3. 脚本自动输出时长配置
# 4. 手动更新 src/config.ts 中的 ESTIMATED_DURATIONS
```

**配音脚本配置** (`scripts/voiceover-scripts.json`):
```json
{
  "scene-01": {
    "text": "配音文案...",
    "voiceId": "sheldon009",
    "speed": 1.0
  }
}
```

**API 调用示例**:
```typescript
// scripts/generate-tts-minimax.ts
const response = await fetch(
  `https://api.minimax.chat/v1/t2a_v2?GroupId=${GROUP_ID}`,
  {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "speech-01-turbo",
      text: "你的配音文案",
      voice_setting: {
        voice_id: "sheldon009",
        speed: 1.0,
      },
      audio_setting: {
        sample_rate: 32000,
        format: "mp3",
      },
    }),
  }
);
```

#### 2.2 ElevenLabs TTS（高质量多语言）

```typescript
// scripts/generate-voiceover.ts
const response = await fetch(
  `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
  {
    method: "POST",
    headers: {
      "xi-api-key": process.env.ELEVENLABS_API_KEY!,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: "Welcome to the show.",
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
        style: 0.3,
      },
    }),
  }
);
```

---

### Phase 3: 动态时长配置（核心！）

#### 3.1 获取音频时长

```typescript
// src/utils/get-audio-duration.ts
import { getAudioDurationInSeconds } from "@remotion/media-utils";

export const getAudioDuration = async (src: string): Promise<number> => {
  return await getAudioDurationInSeconds(src);
};
```

#### 3.2 calculateMetadata 配置

```typescript
// src/compositions/MainVideo.tsx
import { CalculateMetadataFunction, staticFile } from "remotion";
import { getAudioDuration } from "../utils/get-audio-duration";

const FPS = 30;

const SCENE_AUDIO_FILES = [
  "audio/voiceover/scene-01.mp3",
  "audio/voiceover/scene-02.mp3",
  "audio/voiceover/scene-03.mp3",
];

export const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  // 获取所有音频时长
  const durations = await Promise.all(
    SCENE_AUDIO_FILES.map((file) => getAudioDuration(staticFile(file)))
  );

  // 计算帧数
  const sceneDurations = durations.map((d) => Math.ceil(d * FPS));
  const totalDuration = sceneDurations.reduce((sum, d) => sum + d, 0);

  return {
    durationInFrames: totalDuration,
    props: {
      ...props,
      sceneDurations,
    },
  };
};
```

---

### Phase 4: 场景序列与转场

#### 4.1 使用 TransitionSeries（推荐）

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";

export const MainVideo: React.FC<Props> = ({ sceneDurations }) => {
  const { fps } = useVideoConfig();

  return (
    <TransitionSeries>
      {/* Scene 1 */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations[0]}>
        <Scene1 />
      </TransitionSeries.Sequence>

      {/* 转场：Fade */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* Scene 2 */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations[1]}>
        <Scene2 />
      </TransitionSeries.Sequence>

      {/* 转场：Slide */}
      <TransitionSeries.Transition
        presentation={slide({ direction: "from-right" })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* Scene 3 */}
      <TransitionSeries.Sequence durationInFrames={sceneDurations[2]}>
        <Scene3 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

#### 4.2 转场类型

| 转场 | 导入路径 | 配置 |
|------|----------|------|
| **Fade** | `@remotion/transitions/fade` | `fade()` |
| **Slide** | `@remotion/transitions/slide` | `slide({ direction: "from-left" })` |
| **Wipe** | `@remotion/transitions/wipe` | `wipe()` |
| **Flip** | `@remotion/transitions/flip` | `flip()` |
| **ClockWipe** | `@remotion/transitions/clock-wipe` | `clockWipe()` |

#### 4.3 转场时长计算与优化

**⚠️ 转场会缩短总时长！**

```typescript
// 两个 60 帧场景 + 15 帧转场
// 总时长 = 60 + 60 - 15 = 105 帧

const totalDuration = 
  scene1Duration + 
  scene2Duration + 
  scene3Duration - 
  transition1Duration - 
  transition2Duration;
```

**转场时长建议**:

| 场景类型 | 推荐转场时长 | 说明 |
|----------|-------------|------|
| 快速切换 | 8-10 帧 | 节奏快，信息密度高 |
| 标准切换 | 12-15 帧 | 平衡流畅与节奏 |
| 慢速过渡 | 20-30 帧 | 情感渲染，强调转折 |

**动画衔接优化**:

```typescript
// ✅ 推荐：短转场 + 平滑动画
const transitionDuration = 10;  // 10帧 ≈ 0.33秒

<TransitionSeries.Transition
  presentation={fade()}
  timing={linearTiming({ durationInFrames: 10 })}  // 快速淡入淡出
/>

// 场景内动画使用 Spring 平滑过渡
const entrance = spring({
  frame,
  fps,
  config: { damping: 200 },  // 平滑无弹跳
});
```

**转场类型选择**:

| 转场 | 适用场景 | 注意 |
|------|----------|------|
| `fade()` | 通用，最常用 | 不会分散注意力 |
| `slide({ direction: "from-right" })` | 流程推进 | 方向与内容逻辑一致 |
| `slide({ direction: "from-bottom" })` | 总结升华 | 向上滑动暗示提升 |
| `wipe()` | 强调切换 | 节奏感强 |

**禁止**：连续使用相同转场类型，建议交替使用 fade 和 slide。

---

### Phase 5: 音频与字幕同步

#### 5.0 关键原则：配音驱动时长 ⚠️

**所有时长必须以配音文件为准！**

```typescript
// ✅ 正确流程
// 1. 生成配音文件
// 2. 测量实际时长
// 3. 更新 ESTIMATED_DURATIONS
// 4. 调整字幕时间轴
// 5. 渲染视频

// ❌ 禁止：预估时长
export const ESTIMATED_DURATIONS = {
  "scene-01": 8.2,  // 必须与配音文件实际时长相符
};
```

#### 5.1 字幕时间轴配置

**字幕必须与配音同步**，按句子分段：

```typescript
// src/config.ts
export const SUBTITLE_TIMELINE = {
  "scene-01": [
    { text: "第一句字幕", start: 0, end: 3.5 },    // 对应配音时间点
    { text: "第二句字幕", start: 3.5, end: 5 },
    { text: "第三句字幕", start: 5, end: 8.2 },   // 与 ESTIMATED_DURATIONS 一致
  ],
};
```

**字幕时间轴检查清单**:
- [ ] 每句字幕的 `end` 时间 ≤ 场景总时长
- [ ] 字幕切换点与配音停顿匹配
- [ ] 最后一句字幕的 `end` = 场景总时长

#### 5.2 配音轨道

```tsx
import { Audio, Sequence, staticFile } from "remotion";

export const MainVideo: React.FC<Props> = ({ sceneDurations }) => {
  const { fps } = useVideoConfig();
  let currentFrame = 0;

  return (
    <AbsoluteFill>
      {/* 场景内容 */}
      <Scenes />

      {/* 配音轨道 */}
      {sceneDurations.map((duration, i) => {
        const from = currentFrame;
        currentFrame += duration;
        
        return (
          <Sequence key={i} from={from} durationInFrames={duration}>
            <Audio 
              src={staticFile(`audio/voiceover/scene-${i + 1}.mp3`)} 
              volume={1}
            />
          </Sequence>
        );
      })}

      {/* BGM 轨道 */}
      <Audio 
        src={staticFile("audio/bgm.mp3")} 
        volume={0.15}
        loop
      />
    </AbsoluteFill>
  );
};
```

#### 5.2 音频属性

| 属性 | 说明 | 示例 |
|------|------|------|
| `volume` | 音量 (0-1) | `0.15` 或 `(f) => interpolate(f, [0, 100], [0, 1])` |
| `loop` | 循环播放 | `true` |
| `playbackRate` | 播放速度 | `2` (2倍速) |
| `muted` | 静音 | `frame > 100` |
| `trimBefore` | 裁剪开头 | `2 * fps` |
| `trimAfter` | 裁剪结尾 | `10 * fps` |

---

### Phase 6: Spring 动画

#### 6.1 基础用法

```tsx
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

const frame = useCurrentFrame();
const { fps } = useVideoConfig();

const scale = spring({
  frame,
  fps,
  config: { damping: 200 }, // 平滑无弹跳
});
```

#### 6.2 常用配置

```tsx
// 平滑（推荐）
const smooth = spring({ frame, fps, config: { damping: 200 } });

// 干脆
const snappy = spring({ frame, fps, config: { damping: 20, stiffness: 200 } });

// 弹跳
const bouncy = spring({ frame, fps, config: { damping: 8 } });

// 沉重
const heavy = spring({ frame, fps, config: { damping: 15, stiffness: 80, mass: 2 } });
```

#### 6.3 结合 interpolate

```tsx
const springProgress = spring({ frame, fps, config: { damping: 200 } });

// 映射到旋转
const rotation = interpolate(springProgress, [0, 1], [0, 360]);

// 映射到透明度
const opacity = interpolate(springProgress, [0, 1], [0, 1]);

// 映射到缩放
const scale = interpolate(springProgress, [0, 1], [0.8, 1]);
```

---

### Phase 7: 渲染输出

```bash
# 预览
npx remotion preview

# 渲染
npx remotion render MainVideo out/video.mp4

# 批量渲染（多线程）
npx remotion render MainVideo out/video.mp4 --concurrency 4
```

---

## 四、关键代码模式

### 4.1 场景组件模板

```tsx
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const SceneTemplate: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 入场动画
  const entrance = spring({ frame, fps, config: { damping: 200 } });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateY = interpolate(entrance, [0, 1], [50, 0]);

  return (
    <AbsoluteFill style={{
      backgroundColor: "#0a0a0f",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <div style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}>
        <h1>场景标题</h1>
        <p>场景内容</p>
      </div>
    </AbsoluteFill>
  );
};
```

### 4.2 字幕组件

```tsx
export const SubtitleTrack: React.FC<{ subtitles: string[] }> = ({ subtitles }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // 计算当前字幕
  const subtitleIndex = Math.floor((frame / durationInFrames) * subtitles.length);
  const subtitle = subtitles[Math.min(subtitleIndex, subtitles.length - 1)];

  return (
    <div style={{
      position: "absolute",
      bottom: 100,
      width: "100%",
      textAlign: "center",
    }}>
      <span style={{
        fontSize: 48,
        fontWeight: 800,
        color: "#fff",
        textShadow: "0 0 10px rgba(0, 212, 255, 0.8)",
        padding: "20px 40px",
        background: "rgba(10, 10, 15, 0.75)",
        borderRadius: 12,
      }}>
        {subtitle}
      </span>
    </div>
  );
};
```

---

## 五、问题解决方案

### 问题1: 时长不同步 ✅

**根本原因**: 硬编码时长

**解决方案**: 使用 `calculateMetadata` 动态计算

```typescript
// ✅ 正确
export const calculateMetadata: CalculateMetadataFunction<Props> = async ({ props }) => {
  const durations = await Promise.all(
    AUDIO_FILES.map((file) => getAudioDuration(staticFile(file)))
  );
  return { durationInFrames: Math.ceil(durations.reduce(...) * FPS) };
};

// ❌ 错误
const TOTAL_FRAMES = 300;
```

### 问题2: 转场时长计算错误 ✅

**根本原因**: 转场会缩短总时长

**解决方案**: 使用 `getDurationInFrames()`

```typescript
const timing = linearTiming({ durationInFrames: 15 });
const transitionDuration = timing.getDurationInFrames({ fps: 30 });

const total = scene1 + scene2 - transitionDuration;
```

### 问题3: 配音生成失败 ✅

**根本原因**: API 参数格式错误或域名错误

**解决方案**:
```typescript
// Minimax - 正确域名
const API_HOST = 'api.minimax.chat';  // ✅ 正确
// const API_HOST = 'api.minimaxi.chat';  // ❌ 错误（多了一个i）

// Minimax - 正确参数格式
{
  "voice_setting": { "voice_id": "sheldon009" }  // ✅ 嵌套格式
}

// ElevenLabs
{
  "voice_settings": { "stability": 0.5 }  // ✅ 嵌套格式
}
```

### 问题4: 视频没有配音 ✅

**根本原因**: `ESTIMATED_DURATIONS` 中的场景时长与实际配音文件时长不匹配

**解决方案**:
1. 检查配音文件实际时长：
   ```bash
   for f in public/audio/scene-*.mp3; do
     echo "$f: $(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$f")"
   done
   ```
2. 更新 `src/config.ts` 中的 `ESTIMATED_DURATIONS`
3. 重新渲染：`npm run build`

### 问题4: 场景加载卡顿 ✅

**根本原因**: 未使用 `premountFor`

**解决方案**:
```tsx
<Sequence premountFor={1 * fps}>
  <HeavyScene />
</Sequence>
```

---

## 六、自动化工具

### 6.1 get-audio-duration.ts
自动获取音频时长

### 6.2 generate-voiceover.ts
批量生成配音文件

### 6.3 pre-check.sh
渲染前检查

---

## 七、配音与字幕同步流程（关键！）

### 7.1 完整工作流程

```
┌─────────────────┐
│ 1. 生成配音文件  │
│  (Minimax TTS)  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 2. 测量实际时长  │
│  (ffprobe)      │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 3. 更新配置      │
│  ESTIMATED_     │
│  DURATIONS      │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 4. 调整字幕      │
│  SUBTITLE_      │
│  TIMELINE       │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 5. 预览检查      │
│  (npm run dev)  │
└────────┬────────┘
         ▼
┌─────────────────┐
│ 6. 渲染输出      │
│  (npm run build)│
└─────────────────┘
```

### 7.2 字幕时间轴调整技巧

**步骤 1**: 听配音，标记每句话的开始和结束时间

**步骤 2**: 按句子拆分字幕
```typescript
// 原始文案
"我的爆款素材库闭环流程有四步。第一步，全网监控。"

// 拆分为字幕
[
  { text: "我的爆款素材库闭环流程有四步", start: 0, end: 2.5 },
  { text: "第一步，全网监控", start: 2.5, end: 4 },
]
```

**步骤 3**: 确保字幕与配音同步
- 字幕出现时间 = 配音开始时间
- 字幕消失时间 = 下一句开始时间 或 场景结束

**步骤 4**: 验证最后一句
```typescript
// 最后一句字幕的 end 必须等于场景总时长
{ text: "最后一句", start: 8.5, end: 10.4 }  // ✅ end = ESTIMATED_DURATIONS["scene-05"]
```

### 7.3 常见错误与解决

| 错误 | 现象 | 解决 |
|------|------|------|
| 字幕提前消失 | 配音还没说完，字幕没了 | 延长字幕 `end` 时间 |
| 字幕延迟出现 | 配音开始了，字幕还没出现 | 提前字幕 `start` 时间 |
| 字幕重叠 | 两句字幕同时显示 | 调整时间边界，确保 `end` = 下句 `start` |
| 最后字幕消失 | 场景结束前字幕就没了 | 最后一句 `end` = 场景总时长 |

---

## 七、质量检查清单

### 渲染前检查
- [ ] PLANNING.md 已确认
- [ ] calculateMetadata 已配置
- [ ] 配音文件已生成（Minimax sheldon009）
- [ ] ESTIMATED_DURATIONS 与配音时长同步
- [ ] **字幕时间轴与配音同步** ⚠️
  - [ ] 每句字幕 `end` ≤ 场景总时长
  - [ ] 最后一句 `end` = 场景总时长
  - [ ] 字幕切换与配音停顿匹配
- [ ] Sequence 添加 premountFor
- [ ] 转场时长已计算（推荐 10 帧）

### 渲染后检查
- [ ] 视频时长与配音匹配
- [ ] **字幕与配音同步** ⚠️
  - [ ] 字幕出现/消失与配音一致
  - [ ] 无提前消失或延迟
- [ ] 转场效果流畅
- [ ] BGM 音量适中 (0.12-0.18)
- [ ] 字幕显示正常

---

## 八、故障排除

| 问题 | 原因 | 解决 |
|------|------|------|
| 时长不同步 | 硬编码时长 | 使用 calculateMetadata |
| 转场后时长不对 | 转场缩短时长 | 使用 getDurationInFrames() |
| 场景加载卡顿 | 未预加载 | 添加 premountFor |
| 配音生成失败 | API 格式/域名错误 | 检查 minimax.chat 域名和 voice_setting 嵌套 |
| 视频没有配音 | ESTIMATED_DURATIONS 不匹配 | 同步配音文件实际时长 |
| **字幕与配音不匹配** | 字幕时间轴未按新配音调整 | 重新测量配音时长，更新 SUBTITLE_TIMELINE |
| **字幕提前消失** | 字幕 `end` 时间 < 配音结束时间 | 延长最后一句字幕的 `end` 至场景总时长 |
| **动画衔接卡顿** | 转场时长过长 | 缩短转场至 8-10 帧，使用 fade/slide 交替 |
| Spring 动画抖动 | damping 太低 | 设置 damping: 200 |

---

**制作**: mi-pai (幂拍)  
**版本**: v3.2  
**日期**: 2026-03-26  
**参考**: Remotion Best Practices Skill