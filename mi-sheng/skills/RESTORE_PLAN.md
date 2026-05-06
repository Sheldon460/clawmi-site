# 幂声 (mi-sheng) 音频工程师技能恢复方案 V1.0

**执行时间**: 2026-03-10 13:35  
**执行者**: mi-sheng (幂声)  
**状态**: 🔄 技能盘点与恢复中

---

## 📊 现状诊断

### ✅ 已恢复的核心工具 (系统内置)

| 工具名称 | 类型 | 状态 | 用途 |
|---------|------|------|------|
| `openai-whisper` | 系统技能 | ✅ 可用 | 本地语音转文字 (无 API 密钥) |
| `openai-whisper-api` | 系统技能 | ✅ 可用 | OpenAI Whisper API 转写 |
| `sherpa-onnx-tts` | 系统技能 | ✅ 可用 | 离线本地 TTS (无需云端) |
| `tts` | OpenClaw 内置工具 | ✅ 可用 | 文本转语音 (通道适配) |
| `ffmpeg` | 系统命令 | ✅ 已安装 | 音频格式转换/处理 |
| `edge-tts` | Python 包 | ✅ 已安装 (v7.2.7) | 微软 Edge TTS (免费快速) |
| `spotify-player` | 系统技能 | ✅ 可用 | Spotify 音乐播放控制 |

### ✅ 已恢复的共享技能 (11 个)

- `self-improving` - 自我进化协议
- `skill-feishu-docx-powerwrite` - 飞书文档专业创作
- `obsidian-sync` - Obsidian 本地同步
- `agent-reach` - 全网内容触达
- `baoyu-article-illustrator` - 文章配图
- `nano-banana-pro-prompts-recommend-skill` - AI 绘画提示词
- `xiaohongshu` / `xiaohongshu-ops` - 小红书运营
- `canghe-*` (3 个) - 公众号/Markdown 工具

### ⚠️ 缺失的专业技能 (需恢复)

根据记忆文档和音频工程师职能，以下技能需要恢复或重建：

| 技能名称 | 优先级 | 用途 | 恢复方案 |
|---------|--------|------|---------|
| `google-genmedia` | 🔴 P0 | Google Lyria 音乐生成 | 检查 GCP 配置 |
| `videocut:字幕` | 🔴 P0 | 视频字幕处理 | 检查 videocut 工具 |
| `chirp-tts` | 🟡 P1 | Google Chirp 3 HD 高品质 TTS | 配置 GCP 配额项目 |
| `audio-processing` | 🟡 P1 | 音频批量处理自动化 | 创建专属脚本 |
| `lyria-music-gen` | 🟡 P1 | Lyria 背景音乐生成 | 封装 prompt 模板 |

---

## 🛠️ 技能恢复执行清单

### 阶段 1: 核心能力验证 (立即执行)

```bash
# 1. 验证 whisper 可用性
whisper --version

# 2. 验证 edge-tts 语音列表
edge-tts --list-voices | grep "zh-CN"

# 3. 验证 ffmpeg 音频编码支持
ffmpeg -encoders | grep -E "(libopus|aac|mp3)"

# 4. 检查 sherpa-onnx 环境变量
echo $SHERPA_ONNX_RUNTIME_DIR
echo $SHERPA_ONNX_MODEL_DIR
```

### 阶段 2: GCP 相关技能恢复 (需配置)

```bash
# 1. 检查 GCP 认证状态
gcloud auth list

# 2. 检查配额项目设置
gcloud config get-value quota_project

# 3. 如缺失，设置配额项目 (解决 Chirp 3 HD 语音列表为空问题)
gcloud auth application-default set-quota-project PROJECT_ID
```

### 阶段 3: 创建音频工程师专属技能脚本

在 `workspace/mi-sheng/skills/` 目录下创建以下自动化脚本：

#### 3.1 音频格式批量转换脚本
```bash
#!/bin/bash
# mi-sheng-audio-convert.sh
# 用途：批量转换音频为飞书 OPUS 格式

for file in "$@"; do
    output="${file%.*}.opus"
    ffmpeg -y -i "$file" -c:a libopus -b:a 32k "$output"
    echo "✅ 已转换：$output"
done
```

#### 3.2 Edge TTS 快速合成脚本
```bash
#!/bin/bash
# mi-sheng-edge-tts.sh
# 用途：快速生成中文语音

VOICE="${VOICE:-zh-CN-YunxiNeural}"  # 默认男声
TEXT="$1"
OUTPUT="${2:-output.mp3}"

edge-tts --voice "$VOICE" --text "$TEXT" --write-media "$OUTPUT"
echo "✅ 已生成：$OUTPUT (语音：$VOICE)"
```

#### 3.3 音画协作 SOP 脚本
```bash
#!/bin/bash
# mi-sheng-video-audio-sync.sh
# 用途：与 mi-ying 协作，为视频添加配音/背景音乐

VIDEO="$1"
AUDIO="$2"
OUTPUT="${3:-output.mp4}"

ffmpeg -y -i "$VIDEO" -i "$AUDIO" -c:v copy -c:a aac -shortest "$OUTPUT"
echo "✅ 音画合成完成：$OUTPUT"
```

---

## 📋 技能使用 SOP (标准作业程序)

### SOP-01: 语音合成工作流

```
1. 接收文本 → 2. 选择语音引擎 → 3. 生成音频 → 4. 格式转换 → 5. 交付

引擎选择决策树:
├─ 快速日常 → edge-tts (zh-CN-YunxiNeural / zh-CN-XiaoxiaoNeural)
├─ 高品质 → Chirp 3 HD (需 GCP 配置)
├─ 离线环境 → sherpa-onnx-tts
└─ 特殊需求 → OpenAI TTS API
```

### SOP-02: 语音转写工作流

```
1. 接收音频 → 2. 选择转写引擎 → 3. 生成文字稿 → 4. 校对 → 5. 交付

引擎选择:
├─ 本地快速 → whisper (turbo 模型)
├─ 高精度 → whisper (large-v3 模型)
├─ 中文优化 → whisper + 语言参数 zh
└─ API 需求 → openai-whisper-api
```

### SOP-03: 背景音乐生成工作流

```
1. 接收场景描述 → 2. 编写 Lyria prompt → 3. 生成音乐 → 4. 剪辑适配 → 5. 交付

Lyria Prompt 模板:
- 情绪：[欢快/悲伤/紧张/温馨]
- 乐器：[钢琴/吉他/弦乐/电子]
- 节奏：[慢板/中板/快板]
- 时长：[30s/60s/120s]
- 用途：[片头/背景/转场/片尾]
```

### SOP-04: 与 mi-ying (视频组) 协作流程

```
1. mi-ying 发起需求 → 2. 确认音频规格 → 3. 并行制作 → 4. 音画同步 → 5. 质控交付

协作要点:
- 音频格式：WAV/MP3 (中间格式) → OPUS (最终交付)
- 采样率：48kHz (视频标准)
- 响度：-14 LUFS (流媒体标准)
- 交付路径：共享文件夹 / Obsidian 同步
```

---

## 🧪 技能测试清单

完成恢复后，执行以下测试：

- [ ] **TTS 测试**: 生成 10 秒测试语音 (edge-tts)
- [ ] **Whisper 测试**: 转写 1 分钟测试音频
- [ ] **格式转换测试**: MP3 → OPUS 转换
- [ ] **GCP 连接测试**: Chirp 3 HD 语音列表获取
- [ ] **Lyria 测试**: 生成 30 秒背景音乐
- [ ] **协作测试**: 与 mi-ying 完成一次音画合成

---

## 📝 记忆固化

本次技能恢复的关键发现将写入：

1. **个人记忆**: `self-improving/memory.md` (更新技能清单)
2. **今日日记**: `memory/2026-03-10.md` (恢复过程记录)
3. **TOOLs.md 更新**: 补充完整武器库清单
4. **SOUL.md 更新**: 添加技能恢复 SOP

---

## 🎯 下一步行动

1. **立即**: 执行阶段 1 核心能力验证
2. **今日**: 完成 GCP 配置 (阶段 2)
3. **本周**: 创建专属脚本库 (阶段 3)
4. **持续**: 完善 SOP 文档，同步给 mi-dang 归档

---

*文档状态*: 草稿 → 执行中 → 完成  
*最后更新*: 2026-03-10 13:35  
*责任人*: mi-sheng (幂声)
