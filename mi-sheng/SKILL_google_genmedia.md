# Google GenMedia MCP 技能 ✅ 已学习

## 概述
Google GenMedia 提供5个MCP服务器，用于AI媒体生成：

| 服务器 | 命令 | 功能 | 状态 |
|--------|------|------|------|
| **veo** | `mcp-veo-go` | 视频生成 | 可用 |
| **imagen** | `mcp-imagen-go` | 高质量图像生成 | 可用 |
| **chirp3-hd** | `mcp-chirp3-go` | 高级语音合成 (TTS) | ✅ **已修复可用** |
| **lyria** | `mcp-lyria-go` | AI音乐生成 | ✅ 可用 |
| **avtool** | `mcp-avtool-go` | 音视频处理工具 | 可用 |

## 配置
环境变量：
- `PROJECT_ID`: fluted-protocol-480308-p8
- `GENMEDIA_BUCKET`: bucket-0713

## mcporter 配置
已添加到: `/Volumes/My house/Users/Sheldon/clawd/mi-army/mi-sheng/config/mcporter.json`

```bash
mcporter config add chirp3-hd "mcp-chirp3-go"
mcporter config add lyria "mcp-lyria-go"
```

## 工具调用方式

### 通过 mcporter (推荐)
```bash
# 查看工具文档
mcporter list lyria --schema

# 生成音乐
mcporter call lyria.lyria_generate_music prompt="upbeat electronic music" local_path:"./output"

# 语音合成
mcporter call chirp3-hd.chirp_tts \
  text:"你好" \
  voice_name:"cmn-CN-Chirp3-HD-Aoede" \
  output_directory:"./output"
```

### 工具调用格式
使用 `server.tool` 格式：
- `lyria.lyria_generate_music`
- `chirp3-hd.chirp_tts`
- `chirp3-hd.list_chirp_voices`

## Chirp 3 HD - 语音合成 ✅ 已修复可用

### 故障修复记录
**问题**: Chirp 3 无法获取语音列表  
**原因**: 缺少 GCP 配额项目配置  
**解决**: 
```bash
gcloud auth application-default set-quota-project fluted-protocol-480308-p8
```

### 功能
- 高质量文本转语音 (HD品质)
- 多语言支持（含中文）
- **30种中文语音**可选

### 中文语音列表 (部分)

| 语音名称 | 性别 | 特点 |
|----------|------|------|
| `cmn-CN-Chirp3-HD-Aoede` | 女声 | 标准女声 |
| `cmn-CN-Chirp3-HD-Kore` | 女声 | 温柔女声 |
| `cmn-CN-Chirp3-HD-Algenib` | 男声 | 成熟男声 |
| `cmn-CN-Chirp3-HD-Algieba` | 男声 | 标准男声 |
| `cmn-CN-Chirp3-HD-Puck` | 男声 | 活泼男声 |
| `cmn-CN-Chirp3-HD-Zephyr` | 女声 | 清脆女声 |

**完整列表**: 30种中文语音（22男 + 8女）

### 调用示例
```bash
mcporter call chirp3-hd.chirp_tts \
  text:"你好，我是三万" \
  voice_name:"cmn-CN-Chirp3-HD-Aoede" \
  output_directory:"./audio_output" \
  output_filename_prefix:"demo"
```

### 输出文件
- 格式: WAV
- 命名: `{prefix}-{voice_name}-{timestamp}.wav`

## Lyria - AI音乐生成 ✅ 可用

### 功能
- 从文本描述生成音乐
- 支持风格、情绪、乐器指定
- 可生成带歌词或纯器乐
- 默认模型: `lyria-002`

### 参数
| 参数 | 类型 | 说明 |
|------|------|------|
| `prompt` | string | **必填** 音乐描述 |
| `negative_prompt` | string | 负面提示（避免的风格） |
| `local_path` | string | 本地保存路径 |
| `file_name` | string | 文件名 (如 'my_song.wav') |
| `output_gcs_bucket` | string | GCS存储桶名 |
| `model_id` | string | 模型ID (默认 lyria-002) |
| `sample_count` | number | 生成样本数 (默认1) |
| `seed` | number | 随机种子 |

### 示例调用
```bash
mcporter call lyria.lyria_generate_music \
  prompt:"upbeat electronic music with driving synth bass" \
  local_path:"/Volumes/My house/Users/Sheldon/clawd/mi-army/mi-sheng/audio_output" \
  file_name:"lyria_demo.wav"
```

## AVTool - 音视频处理

### 功能
- 音量调整
- 格式转换
- 音频合并/剪辑

### 工具列表
- `avtool__ffmpeg_adjust_volume` - 调整音量
- `avtool__ffmpeg_convert` - 格式转换

## 工作流程

### 语音合成流程
```
1. 选择语音 (list_chirp_voices)
2. 调用 chirp_tts 生成
3. 使用 avtool 进行后期处理（如需）
4. 输出到指定目录
```

### 音乐生成流程
```
1. 编写音乐描述 prompt
2. 调用 lyria.generate_music
3. 质量验证
4. 使用 avtool 调整（如需）
```

## 注意事项
1. 必须使用 `server__tool` 前缀调用
2. 输出目录需有写入权限
3. 生成内容受Google使用政策约束
4. 注意API配额和费用
