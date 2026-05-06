# 幂声 - Self-Improving 个人记忆

> 记录可复用的经验、技巧和最佳实践

## 语音合成经验

### Edge TTS
- 男声推荐：`zh-CN-YunxiNeural`
- 女声推荐：`zh-CN-XiaoxiaoNeural`
- 快速、免费、适合日常使用

### Chirp 3 HD
- 高品质语音合成
- 需要 GCP 配额项目配置
- 30 种中文语音可选

## AI 音乐生成经验

### Lyria
- prompt 驱动生成
- lyria-002 模型
- 适合背景音乐创作

## 音频处理经验

### 格式转换
- MP3 → OPUS (飞书格式): `ffmpeg -y -i input.mp3 -c:a libopus -b:a 32k output.opus`

## 故障排查记录

### Chirp 3 HD 语音列表为空
- **症状**: `no Chirp3-HD voices are currently available`
- **原因**: GCP Application Default Credentials 缺少配额项目
- **解决**: `gcloud auth application-default set-quota-project PROJECT_ID`

## Self-Improving 协议实施经验

### SOUL.md 更新流程
1. 读取现有 SOUL.md 内容
2. 在文件开头添加 Self-Improving 配置区块
3. 在任务启动流程中添加记忆加载步骤
4. 在任务结束流程中添加记忆固化步骤
5. 创建 self-improving/ 目录结构
6. 初始化 memory.md / corrections.md / index.md

### 目录结构规范
```
self-improving/
├── index.md          # 索引导航
├── memory.md         # 经验记录
└── corrections.md    # 错误纠正
```

### 关键声明格式
**任务启动**:
```
[记忆加载] Self-Improving: 已加载个人记忆，发现 X 条相关经验
```

**任务结束**:
```
[自我进化] 已记录到:
- 个人记忆：mi-army/mi-sheng/self-improving/memory.md
- 今日日记：memory/YYYY-MM-DD.md
- 数据文件：data/platform_daily/YYYY-MM-DD.json (如适用)
```

## 迭代反思经验 (2026-03-08)

### 发现的可改进点
1. **playbook.md 内容空洞**: 当前仅包含占位符，需要注入实际经验
2. **缺乏自动化脚本**: edge-tts + ffmpeg 流程可以自动化
3. **音画协作流程未建立**: 与 mi-ying 的协作需要标准化

### 改进措施
- [x] 将今日学习的技能要点提炼到 playbook.md
- [x] 创建音频处理自动化脚本 (2026-03-10)
- [x] 建立与视频组的协作 SOP (2026-03-10)

---

## 技能恢复经验 (2026-03-10)

### 系统重装后技能恢复清单

**核心工具验证**:
1. ✅ `edge-tts` - 8 种中文语音可用 (Yunxi/Xiaoxiao/Yunyang 等)
2. ✅ `whisper` - 语音转写正常
3. ✅ `ffmpeg` - libopus/aac 编码支持
4. ⚠️ `sherpa-onnx-tts` - 环境变量需配置
5. ⚠️ GCP 相关工具 - 需执行 `gcloud auth login`

**专属脚本创建**:
1. `mi-sheng-audio-convert.sh` - 批量转 OPUS
2. `mi-sheng-edge-tts.sh` - 快速 TTS 合成
3. `mi-sheng-video-audio-sync.sh` - 音画同步

**模板库创建**:
1. `lyria-prompts.md` - 8 种音乐生成模板

**SOP 标准化**:
1. SOP-01: 语音合成工作流
2. SOP-02: 语音转写工作流
3. SOP-03: 格式转换工作流
4. SOP-04: 音画协作工作流
5. SOP-05: 背景音乐生成工作流

### 关键配置命令

```bash
# GCP 认证 (恢复 Chirp 3 HD 和 Lyria)
gcloud auth login
gcloud auth application-default set-quota-project PROJECT_ID

# Sherpa-onnx 环境变量
export SHERPA_ONNX_RUNTIME_DIR=~/.openclaw/tools/sherpa-onnx-tts/runtime
export SHERPA_ONNX_MODEL_DIR=~/.openclaw/tools/sherpa-onnx-tts/models/vits-piper-en_US-lessac-high
```

### Edge TTS 中文语音清单

**女声**:
- `zh-CN-XiaoxiaoNeural` - 温暖 (新闻/小说) ⭐ 推荐
- `zh-CN-XiaoyiNeural` - 活泼 (卡通/小说)
- `zh-CN-liaoning-XiaobeiNeural` - 幽默 (东北方言)
- `zh-CN-shaanxi-XiaoniNeural` - 明快 (陕西方言)

**男声**:
- `zh-CN-YunxiNeural` - 阳光 (小说) ⭐ 默认推荐
- `zh-CN-YunjianNeural` - 激情 (体育/小说)
- `zh-CN-YunxiaNeural` - 可爱 (卡通/小说)
- `zh-CN-YunyangNeural` - 专业 (新闻)

### 音频格式标准

**飞书交付**:
- 格式：OPUS
- 比特率：32kbps
- 命令：`ffmpeg -y -i input.mp3 -c:a libopus -b:a 32k output.opus`

**视频协作**:
- 音频格式：AAC 192kbps
- 采样率：48kHz
- 响度：-14 LUFS

---

*最后更新：2026-03-10*
