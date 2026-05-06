# Remotion 视频生成 SOP

## 项目概述
基于 Remotion 的自动化视频生产流水线，用于生成知识分享类短视频。

## ✅ 已完成内容

### 视频结构
| 场景 | 配音时长 | 内容 |
|------|---------|------|
| Scene 01 | 8.2秒 | 开场标题：终极揭秘 + 选题自由 |
| Scene 02 | 11.4秒 | 痛点共鸣：碎片化 vs 淡水库 |
| Scene 03 | 26.9秒 | 四步流程：监控→初筛→预处理→存档 |
| Scene 04 | 10.3秒 | 实战转变：找选题 → 挑选题 |
| Scene 05 | 10.4秒 | 金句总结：从一到一百的整合优化 |
| **总计** | **67.2秒** | |

### 技术实现
| 组件 | 状态 | 说明 |
|------|------|------|
| 视频画面 | ✅ | 5 个场景 + Spring 动画 + 转场 |
| 配音 | ✅ | Minimax sheldon009 音色 |
| 字幕 | ✅ | 22 句逐句字幕 |
| BGM | ✅ | Free Music Archive (Enthusiast) |

### 输出文件
```
remotion-material-library/
├── out/MaterialLibrary.mp4          # 最终视频 (6.7 MB)
├── public/audio/
│   ├── scene-01.mp3 ~ scene-05.mp3  # 配音文件 (sheldon009)
│   └── bgm.mp3                       # 背景音乐
└── src/
    ├── compositions/MainVideo.tsx   # 主视频组件
    ├── scenes/Scene01-05.tsx        # 场景组件
    ├── components/Subtitles.tsx     # 字幕组件
    └── config.ts                    # 配置文件
```

## 🎵 BGM 生成方案

### 方案 1: Google Lyria MCP (推荐)

**位置:** `/Volumes/My house/Users/Sheldon/.openclaw/extensions/google-genmedia-extension`

**使用方法:**
```bash
# 设置环境变量
export PROJECT_ID=fluted-protocol-480308-p8
export GENMEDIA_BUCKET=bucket-0713
export LOCATION=us-central1

# 调用 Lyria MCP (需要 MCP 客户端)
# 提示词示例:
# "Create modern tech-inspired background music,
#  electronic ambient, 120 BPM, minimal synth,
#  atmospheric pads, no drums, loopable"

# 注意: Lyria 可能需要项目启用或白名单访问
```

### 方案 2: 免费音乐库
- [YouTube Audio Library](https://studio.youtube.com/channel/audio)
- [Free Music Archive](https://freemusicarchive.org/)
- 选择 Electronic/Ambient 类别

### 方案 3: AI 音乐工具
- Suno AI (suno.ai)
- Udio (udio.com)
- AIVA (aiva.ai)

## 🛠️ 常用命令

```bash
cd remotion-material-library

# 开发预览
npm run dev

# 生成配音（Minimax sheldon009 音色）
export MINIMAX_API_KEY="sk-api-..."
node scripts/generate-voiceover.cjs

# 渲染视频
npm run build

# 输出位置
open out/MaterialLibrary.mp4
```

## 📝 配置说明

### 配音生成流程

**工具：** `scripts/generate-voiceover.cjs`

**音色：** `sheldon009`（Minimax 高质量中文男声）

**步骤：**
```bash
# 1. 设置 API Key
export MINIMAX_API_KEY="sk-api-..."

# 2. 运行生成脚本
cd remotion-material-library
node scripts/generate-voiceover.cjs

# 3. 脚本自动更新 scripts/audio-durations.json

# 4. 手动更新 src/config.ts 中的 ESTIMATED_DURATIONS
```

**配音脚本位置：** `scripts/voiceover-scripts.json`

```json
{
  "scene-01": {
    "text": "配音文案...",
    "voiceId": "sheldon009",
    "speed": 1.0
  }
}
```

### 场景时长同步 (`src/config.ts`)

**重要：** `ESTIMATED_DURATIONS` 必须与配音文件实际时长相符，否则会导致配音被截断。

```typescript
// 检查配音文件时长
ffprobe -v quiet -show_entries format=duration -of csv=p=0 public/audio/scene-01.mp3

// 更新 config.ts 中的时长（配音生成后脚本会自动输出）
export const ESTIMATED_DURATIONS = {
  "scene-01": 8.2,
  "scene-02": 11.4,
  "scene-03": 26.9,
  "scene-04": 10.3,
  "scene-05": 10.4,
};
```

### 字幕时间轴 (`src/config.ts`)
```typescript
export const SUBTITLE_TIMELINE = {
  "scene-01": [
    { text: "字幕内容", start: 0, end: 4 },  // 单位：秒
  ],
};
```

### 音频配置
```typescript
export const CONFIG = {
  audio: {
    bgmVolume: 0.15,      // BGM 音量
    voiceVolume: 1.0,     // 配音音量
  },
};
```

## 🔄 更新记录

- **2026-03-26**: 使用正确 API Key 重新生成 sheldon009 配音
- **2026-03-26**: 修复配音缺失问题 - 同步 `ESTIMATED_DURATIONS` 与实际配音时长
- **2026-03-26**: 视频完成，含配音、字幕、BGM
- **2026-03-26**: Lyria MCP 配置完成（待启用）

## 🐛 故障排查

### 视频没有配音

**症状：** 视频画面正常，但只有 BGM 没有配音。

**原因：** `ESTIMATED_DURATIONS` 中的场景时长与实际配音文件时长不匹配，导致场景提前结束，配音被截断。

**解决：**
1. 检查配音文件实际时长：
   ```bash
   for f in public/audio/scene-*.mp3; do
     echo "$f: $(ffprobe -v quiet -show_entries format=duration -of csv=p=0 "$f")"
   done
   ```
2. 更新 `src/config.ts` 中的 `ESTIMATED_DURATIONS`
3. 重新渲染：`npm run build`