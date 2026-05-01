# OpenClaw Video Pipeline

OpenClaw 短视频生成流水线 - 基于 Remotion 的视频自动化生产工具

## 🚀 快速开始

### 启动预览
```bash
npm run dev
```

### 渲染视频
```bash
npm run render
```

### 生成配音
```bash
# 单条配音
node scripts/generate-voiceover.cjs "大家好，我是 Sheldon" intro

# 批量生成 (从文本文件)
node scripts/batch-generate-voiceover.cjs scripts.txt scene
```

## 📁 项目结构

```
video-pipeline/
├── src/
│   ├── Root.tsx          # 视频根组件
│   ├── MainVideo.tsx     # 主视频组件
│   └── index.ts          # 入口文件
├── public/
│   └── voiceover/        # 配音文件目录
├── scripts/
│   ├── generate-voiceover.cjs    # 单条配音生成
│   ├── batch-generate-voiceover.cjs  # 批量配音生成
│   ├── list-voices.cjs           # 列出可用语音
│   └── README.md
├── venv/                 # Python 虚拟环境 (faster-whisper)
├── out/                  # 输出视频目录
├── remotion.config.ts
└── package.json
```

## 🛠️ 环境要求

| 组件 | 状态 | 版本 |
|------|------|------|
| Node.js | ✅ | v24.10.0 |
| npm | ✅ | 11.6.1 |
| ffmpeg | ✅ | 7.1.1 |
| Chrome | ✅ | 已安装 |
| Python | ✅ | 3.13.3 |
| faster-whisper | ✅ | 1.2.1 |
| **Google Chirp3-HD** | ✅ | MCP 已配置 |

## 🎙️ 配音生成

### 使用 Google Chirp3-HD

本流水线已集成 Google Chirp3-HD MCP，支持高质量中文配音生成。

**单条配音:**
```bash
node scripts/generate-voiceover.cjs "你的文本" 输出文件名
```

**批量生成:**
```bash
# 1. 创建文本文件 scripts.txt
大家好，这是第一句
这是第二句内容
这是第三句内容

# 2. 批量生成
node scripts/batch-generate-voiceover.cjs scripts.txt scene

# 输出: scene-01.wav, scene-02.wav, scene-03.wav
```

### 推荐语音

| 语音 ID | 性别 | 特点 |
|---------|------|------|
| `cmn-CN-Chirp3-HD-Charon` | 男声 | ⭐ 清晰自然，推荐 |
| `cmn-CN-Chirp3-HD-Achernar` | 女声 | 温柔清晰 |

## 📝 在视频中添加配音

```tsx
import { Audio, staticFile } from "remotion";

export const MyVideo = () => {
  return (
    <AbsoluteFill>
      {/* 视频内容 */}
      
      {/* 添加配音 */}
      <Audio src={staticFile("voiceover/intro.wav")} volume={1} />
    </AbsoluteFill>
  );
};
```

## 📚 相关链接

- [Remotion 文档](https://www.remotion.dev/docs)
- [faster-whisper](https://github.com/SYSTRAN/faster-whisper)
- [Google Cloud TTS](https://cloud.google.com/text-to-speech)

## ✅ 状态检查

运行以下命令检查环境:

```bash
# 检查 Node.js
node --version

# 检查 ffmpeg
ffmpeg -version

# 测试配音生成
node scripts/generate-voiceover.cjs "测试" test
```