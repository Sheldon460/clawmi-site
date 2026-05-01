# 配音生成脚本

使用 Google Chirp3-HD MCP 生成高质量中文配音。

## 🚀 快速开始

### 1. 单条配音生成

```bash
node generate-voiceover.cjs "要转换的文本" [输出文件名]
```

**示例:**
```bash
# 生成单条配音
node generate-voiceover.cjs "大家好，我是 Sheldon" intro

# 输出: public/voiceover/intro.wav
```

### 2. 批量配音生成

创建一个文本文件 `scripts.txt`，每行一个要转换的文本：

```
大家好，我是 Sheldon
今天我们来聊聊养虾
OpenClaw 是一个强大的自动化工具
```

然后运行：

```bash
node batch-generate-voiceover.cjs scripts.txt scene
```

**输出:**
- `public/voiceover/scene-01.wav`
- `public/voiceover/scene-02.wav`
- `public/voiceover/scene-03.wav`

### 3. 查看可用语音

```bash
node list-voices.cjs
```

## 🔊 推荐语音

| 语音 ID | 性别 | 特点 |
|---------|------|------|
| `cmn-CN-Chirp3-HD-Charon` | 男声 | ⭐ 清晰自然，推荐 |
| `cmn-CN-Chirp3-HD-Achernar` | 女声 | 温柔清晰 |

默认使用 `Charon` 男声。

## 📁 输出位置

所有生成的配音文件保存在：
```
public/voiceover/
├── intro.wav
├── scene-01.wav
├── scene-02.wav
└── ...
```

在 Remotion 视频中使用：

```tsx
import { Audio, staticFile } from "remotion";

<Audio src={staticFile("voiceover/intro.wav")} />
```

## ⚠️ 注意事项

1. 文本不要太长（建议每句不超过 50 字）
2. 如果文本很长，请拆分成多句分别生成
3. 生成过程中需要联网调用 Google Cloud API
4. 首次使用会自动下载模型，可能需要一些时间

## 🔧 技术细节

- **引擎**: Google Chirp3-HD
- **语言**: 中文普通话 (cmn-CN)
- **格式**: WAV
- **采样率**: 24kHz
- **位深度**: 16-bit
