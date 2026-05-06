# AI音乐生成技能 (Music Generator)

## 技能概述
基于结构化Composition Plan生成高质量AI音乐的执行引擎。

## 核心能力
- 从JSON格式的作曲计划生成音乐
- 精确控制时长（±0.5秒误差容忍）
- 自动质量验证与重试机制
- 支持多段落结构控制

## Composition Plan 结构

```json
{
  "positive_global_styles": ["风格1", "风格2"],
  "negative_global_styles": ["避免的风格"],
  "sections": [
    {
      "section_name": "段落名称",
      "positive_local_styles": ["局部风格"],
      "negative_local_styles": ["避免的局部风格"],
      "duration_ms": 时长毫秒,
      "lines": ["歌词行"] // 纯器乐留空
    }
  ]
}
```

## 工作流程

### 1. 创建Composition Plan
- 定义全局风格（positive/negative）
- 规划段落结构（Intro/Verse/Chorus/Outro等）
- 设置各段落时长

### 2. 配置生成参数
- `duration_ms`: 总时长（3秒-10分钟）
- `output_format`: WAV（制作）/ MP3（交付）
- `instrumental`: true（纯器乐）
- `respect_sections_durations`: true（严格遵守段落时长）

### 3. 质量验证 (QV)
- ✅ 时长匹配（±0.5秒）
- ✅ 风格一致性检查
- ✅ 音频质量检查（无失真、噪音）
- ✅ 段落过渡自然

### 4. 错误处理
- 失败自动重试（最多3次）
- 调整风格参数重新生成
- 超过3次失败转人工

## 版权限制
❌ 禁止提及乐队/音乐家名称  
❌ 禁止使用版权歌词  
❌ 禁止模仿特定受版权保护歌曲

## 常用风格关键词

| 类别 | 关键词 |
|------|--------|
| 风格 | electronic, acoustic, orchestral, jazz, rock |
| 情绪 | upbeat, melancholic, energetic, calm, epic |
| 乐器 | synth, piano, guitar, strings, drums, bass |
| 节奏 | fast-paced, slow, driving, groovy |

## 示例场景
- 短视频背景音乐
- 播客片头/片尾
- 广告配乐
- 游戏音效
- 冥想/放松音乐
