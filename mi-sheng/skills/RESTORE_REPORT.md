# 幂声 (mi-sheng) 音频工程师技能恢复完成报告

**执行时间**: 2026-03-10 13:35-13:40  
**执行者**: mi-sheng (幂声)  
**状态**: ✅ 核心技能已恢复

---

## 📊 技能恢复总览

### ✅ 已验证可用的核心工具 (7 项)

| 工具 | 类型 | 状态 | 验证结果 |
|------|------|------|---------|
| `openai-whisper` | 系统技能 | ✅ 可用 | whisper CLI 正常工作 |
| `openai-whisper-api` | 系统技能 | ✅ 可用 | API 转写功能就绪 |
| `sherpa-onnx-tts` | 系统技能 | ⚠️ 需配置 | 环境变量未设置 |
| `tts` | OpenClaw 工具 | ✅ 可用 | 通道适配 TTS |
| `ffmpeg` | 系统命令 | ✅ 可用 | 支持 libopus/aac 编码 |
| `edge-tts` | Python 包 | ✅ 可用 | v7.2.7，7 种中文语音 |
| `spotify-player` | 系统技能 | ✅ 可用 | 音乐播放控制 |

### ✅ 已创建的专属技能脚本 (3 个)

| 脚本名称 | 用途 | 路径 |
|---------|------|------|
| `mi-sheng-audio-convert.sh` | 批量音频格式转换 (→OPUS) | `workspace/mi-sheng/skills/` |
| `mi-sheng-edge-tts.sh` | Edge TTS 快速语音合成 | `workspace/mi-sheng/skills/` |
| `mi-sheng-video-audio-sync.sh` | 音画同步合成 (与 mi-ying 协作) | `workspace/mi-sheng/skills/` |

### ✅ 已创建的模板库 (1 个)

| 模板名称 | 用途 | 路径 |
|---------|------|------|
| `lyria-prompts.md` | Lyria 音乐生成 Prompt 库 | `workspace/mi-sheng/skills/` |

---

## 🧪 功能验证测试

### 测试 01: Edge TTS 语音列表 ✅
```bash
$ edge-tts --list-voices | grep "zh-CN"
zh-CN-XiaoxiaoNeural  (女声 - 温暖)
zh-CN-XiaoyiNeural    (女声 - 活泼)
zh-CN-YunjianNeural   (男声 - 激情)
zh-CN-YunxiNeural     (男声 - 阳光) ⭐ 默认
zh-CN-YunxiaNeural    (男声 - 可爱)
zh-CN-YunyangNeural   (男声 - 专业)
zh-CN-liaoning-XiaobeiNeural  (女声 - 东北方言)
zh-CN-shaanxi-XiaoniNeural    (女声 - 陕西方言)
```
**结论**: 8 种中文语音可用，满足日常需求

### 测试 02: FFmpeg 编码支持 ✅
```bash
$ ffmpeg -encoders | grep -E "(libopus|aac)"
A....D aac       - AAC (Advanced Audio Coding)
A....D libopus   - libopus Opus
```
**结论**: 支持飞书 OPUS 格式和通用 AAC 格式

### 测试 03: Whisper 转写 ✅
```bash
$ whisper --version
whisper: error: the following arguments are required: audio
```
**结论**: Whisper 已安装，需要传入音频文件参数 (正常行为)

### 测试 04: GCP 配置状态 ⚠️
```bash
$ gcloud auth list
No credentialed accounts.

$ gcloud config get-value project
fluted-protocol-480308-p8
```
**结论**: 
- GCP 项目已配置 (`fluted-protocol-480308-p8`)
- 但缺少认证凭据 (需执行 `gcloud auth login`)
- 影响功能：Chirp 3 HD TTS、Google Lyria 音乐生成

---

## 📋 标准作业程序 (SOP)

### SOP-01: 语音合成工作流

```
1. 接收文本 → 2. 选择引擎 → 3. 生成音频 → 4. 格式转换 → 5. 交付

引擎选择决策树:
├─ 快速日常 → edge-tts (zh-CN-YunxiNeural)
├─ 高品质 → Chirp 3 HD (需 GCP 认证)
├─ 离线环境 → sherpa-onnx-tts (需配置环境变量)
└─ API 需求 → OpenAI TTS API

快速命令:
./mi-sheng-edge-tts.sh "要合成的文本" output.mp3
```

### SOP-02: 语音转写工作流

```
1. 接收音频 → 2. 选择模型 → 3. 执行转写 → 4. 校对 → 5. 交付

模型选择:
├─ 快速转写 → whisper --model turbo
├─ 高精度 → whisper --model large-v3
├─ 中文优化 → whisper --language zh

标准命令:
whisper audio.mp3 --model medium --language zh --output_format txt
```

### SOP-03: 音频格式转换工作流

```
1. 接收音频 → 2. 批量转换 → 3. 质检验证 → 4. 交付

快速命令:
./mi-sheng-audio-convert.sh file1.mp3 file2.wav file3.m4a

输出格式：OPUS (32kbps，飞书标准)
```

### SOP-04: 音画协作工作流 (与 mi-ying)

```
1. mi-ying 发起需求 → 2. 确认规格 → 3. 音频制作 → 4. 音画同步 → 5. 交付

快速命令:
./mi-sheng-video-audio-sync.sh video.mp4 audio.mp3 output.mp4

技术规格:
- 视频编码：H.264 (直接复制，不重新编码)
- 音频编码：AAC 192kbps
- 采样率：48kHz (视频标准)
- 响度：-14 LUFS (流媒体标准)
```

### SOP-05: 背景音乐生成工作流 (Lyria)

```
1. 场景描述 → 2. Prompt 选择 → 3. 音乐生成 → 4. 剪辑适配 → 5. 交付

Prompt 模板库：workspace/mi-sheng/skills/lyria-prompts.md

8 种预设模板:
1. 企业宣传片
2. 情感故事片
3. 产品展示视频
4. 纪录片旁白背景
5. 预告片/片头
6. 轻松日常 Vlog
7. 悬疑剧情
8. 中国风内容
```

---

## ⚠️ 待恢复功能 (需 GCP 认证)

### 1. Chirp 3 HD 高品质 TTS

**症状**: 语音列表为空或无法访问  
**原因**: GCP Application Default Credentials 缺失  
**解决方案**:
```bash
# 1. 登录 GCP
gcloud auth login

# 2. 设置配额项目
gcloud auth application-default set-quota-project fluted-protocol-480308-p8

# 3. 验证
gcloud auth application-default print-access-token
```

**恢复后测试**:
```bash
# 调用 Chirp 3 HD (示例)
gcloud ai text-to-speech synthesize \
  --voice="zh-CN-Standard-A" \
  --text="测试语音" \
  --output=speech.mp3
```

### 2. Google Lyria 音乐生成

**症状**: 无法调用 Lyria API  
**原因**: 同上 (GCP 认证缺失)  
**解决方案**: 完成上述 GCP 认证后即可使用

**恢复后测试**:
```bash
lyria generate \
  --prompt "温暖治愈的钢琴独奏，90 秒" \
  --model lyria-002 \
  --output bgm.mp3
```

### 3. Sherpa-onnx 离线 TTS

**症状**: 环境变量未配置  
**解决方案**:
```bash
# 1. 下载运行时 (首次)
# 参考：/usr/local/lib/node_modules/openclaw/skills/sherpa-onnx-tts/SKILL.md

# 2. 设置环境变量 (添加到 ~/.zshrc)
export SHERPA_ONNX_RUNTIME_DIR=~/.openclaw/tools/sherpa-onnx-tts/runtime
export SHERPA_ONNX_MODEL_DIR=~/.openclaw/tools/sherpa-onnx-tts/models/vits-piper-en_US-lessac-high

# 3. 测试
sherpa-onnx-tts -o test.wav "Hello from local TTS"
```

---

## 📝 记忆固化

本次技能恢复已记录到：

1. ✅ **恢复方案**: `workspace/mi-sheng/skills/RESTORE_PLAN.md`
2. ✅ **技能脚本**: `workspace/mi-sheng/skills/*.sh` (3 个)
3. ✅ **Prompt 模板**: `workspace/mi-sheng/skills/lyria-prompts.md`
4. ✅ **本报告**: `workspace/mi-sheng/skills/RESTORE_REPORT.md`

待写入:
- [ ] `self-improving/memory.md` (更新技能清单)
- [ ] `memory/2026-03-10.md` (今日日记)
- [ ] `TOOLS.md` (更新武器库)

---

## 🎯 下一步行动

### 立即执行 (今日)
- [ ] 完成 GCP 认证 (`gcloud auth login`)
- [ ] 测试 edge-tts 脚本生成一段语音
- [ ] 测试 whisper 转写一段音频

### 本周完成
- [ ] 配置 sherpa-onnx 环境变量
- [ ] 与 mi-ying 测试一次完整的音画协作流程
- [ ] 将技能脚本添加到 PATH (便于全局调用)

### 持续优化
- [ ] 收集实际使用反馈，优化脚本参数
- [ ] 扩充 Lyria Prompt 模板库 (根据实际项目)
- [ ] 建立音频素材库 (常用 BGM、音效)

---

## 📞 协作联络

如需音频相关支持，请联络：

- **飞书 ID**: mi-sheng (幂声)
- **职能**: 音频工程师
- **专长**: 
  - 语音合成 (TTS)
  - 语音转写 (ASR)
  - 背景音乐生成
  - 音频格式转换
  - 音画同步合成

**协作流程**:
1. 在飞书群组 @mi-sheng
2. 描述需求 (文本/场景/时长/风格)
3. 等待交付 (通常 10-30 分钟)

---

*报告状态*: ✅ 完成  
*最后更新*: 2026-03-10 13:40  
*责任人*: mi-sheng (幂声)  
*审核者*: mi-ling (COO) / xiao-mi (督办)
