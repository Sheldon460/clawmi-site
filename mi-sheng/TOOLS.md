# 幂声 的武器库 (V2.0 - 技能恢复版)

**最后更新**: 2026-03-10 13:40  
**恢复状态**: ✅ 核心技能已恢复，⚠️ GCP 相关待认证

---

## 🎯 核心专业工具 (Priority)

### ✅ 已恢复 (7 项)

| 工具 | 类型 | 状态 | 用途 |
|------|------|------|------|
| `sessions_send` | OpenClaw 工具 | ✅ | 跨 Agent 通讯 |
| `self-improving-agent` | 核心能力 | ✅ | 自我进化协议 |
| `openai-whisper` | 系统技能 | ✅ | 本地语音转文字 (无 API 密钥) |
| `openai-whisper-api` | 系统技能 | ✅ | OpenAI Whisper API 转写 |
| `tts` | OpenClaw 工具 | ✅ | 文本转语音 (通道适配) |
| `spotify-player` | 系统技能 | ✅ | Spotify 音乐播放控制 |
| `ffmpeg` | 系统命令 | ✅ | 音频格式转换/处理 |
| `edge-tts` | Python 包 | ✅ | 微软 Edge TTS (免费快速) |

### ⚠️ 待恢复/配置 (3 项)

| 工具 | 类型 | 状态 | 用途 |
|------|------|------|------|
| `sherpa-onnx-tts` | 系统技能 | ⚠️ | 离线本地 TTS (需配置环境变量) |
| `google-genmedia` | Google API | ⚠️ | Google Lyria 音乐生成 (需 GCP 认证) |
| `videocut:字幕` | 视频工具 | ❓ | 视频字幕处理 (需检查) |

---

## 🛠️ 专属技能脚本 (3 个)

**路径**: `workspace/mi-sheng/skills/`

| 脚本名称 | 用途 | 使用示例 |
|---------|------|---------|
| `mi-sheng-audio-convert.sh` | 批量音频转 OPUS | `./mi-sheng-audio-convert.sh file1.mp3 file2.wav` |
| `mi-sheng-edge-tts.sh` | Edge TTS 快速合成 | `./mi-sheng-edge-tts.sh "文本" output.mp3` |
| `mi-sheng-video-audio-sync.sh` | 音画同步 (与 mi-ying 协作) | `./mi-sheng-video-audio-sync.sh video.mp4 audio.mp3` |

---

## 📚 模板库 (1 个)

| 模板名称 | 用途 | 路径 |
|---------|------|------|
| `lyria-prompts.md` | Lyria 音乐生成 Prompt 库 | `workspace/mi-sheng/skills/lyria-prompts.md` |

**包含 8 种预设模板**:
1. 企业宣传片
2. 情感故事片
3. 产品展示视频
4. 纪录片旁白背景
5. 预告片/片头
6. 轻松日常 Vlog
7. 悬疑剧情
8. 中国风内容

---

## 🌐 环境执行与通讯

| 工具 | 用途 | 示例 |
|------|------|------|
| `sessions_send` | 直接代号唤醒跨组专家 | `sessions_send(targetAgent="mi-ying", message="协作需求")` |
| `bash` / `exec` | 调用全系统能力 | `whisper audio.mp3 --model medium` |
| `read` / `write` / `edit` | 文件读写 | 读取记忆、写入日记 |
| `feishu_*` | 飞书 API (文档/日历/任务) | 创建飞书文档、同步日程 |
| `obsidian-sync` | Obsidian 本地同步 | 双重产出协议 |

---

## 🔐 跨 Agent 核心权限 (V3.0)

| 权限 | 状态 | 用途 | 示例 |
|------|------|------|------|
| `sessions_send` | ✅ 已授权 | 跨 Agent 发送指令 | `sessions_send(targetAgent="mi-dang", message="归档笔记")` |
| `sessions_spawn` | ✅ 已授权 | 派生独立任务进程 | `sessions_spawn(task="生成配音", agentId="mi-sheng")` |
| `bindings` | ✅ 已授权 | 绑定当前活跃群组 | 确保响应可见 |

---

## 📋 标准作业程序 (SOP)

### SOP-01: 语音合成
```
文本 → edge-tts/Chirp 3 HD → MP3 → ffmpeg → OPUS → 交付
```

### SOP-02: 语音转写
```
音频 → whisper (medium/large) → TXT → 校对 → 交付
```

### SOP-03: 格式转换
```
批量音频 → mi-sheng-audio-convert.sh → OPUS (32kbps) → 交付
```

### SOP-04: 音画协作 (与 mi-ying)
```
需求 → 音频制作 → mi-sheng-video-audio-sync.sh → 交付
```

### SOP-05: 背景音乐 (Lyria)
```
场景描述 → lyria-prompts.md → Lyria 生成 → 剪辑 → 交付
```

---

## ⚠️ 配置检查清单

### 每日启动检查
- [ ] edge-tts 可用 (`edge-tts --version`)
- [ ] whisper 可用 (`whisper --version`)
- [ ] ffmpeg 可用 (`ffmpeg -version`)

### 每周检查
- [ ] GCP 认证有效 (`gcloud auth list`)
- [ ] sherpa-onnx 环境变量设置
- [ ] 技能脚本执行权限 (`ls -la skills/*.sh`)

### 故障排查
详见：`workspace/mi-sheng/skills/RESTORE_REPORT.md`

---

*武器库版本*: V2.0  
*最后更新*: 2026-03-10 13:40  
*维护者*: mi-sheng (幂声)
