---
name: qwen-image-pro
description: "使用阿里云百炼 Qwen Image 2.0 Pro 模型生成高质量图像。支持文生图、多种风格和尺寸。Use when: (1) 需要生成 AI 图像, (2) 需要使用中文提示词生图, (3) 需要阿里云图像生成能力。注意：如遇 SSL 错误请检查网络环境或代理设置。"
---

# Qwen Image Pro

阿里云百炼平台提供的 Qwen Image 2.0 Pro 图像生成模型，针对中文提示词优化。

## 快速开始

```python
import sys
sys.path.insert(0, '~/.openclaw/skills/qwen-image-pro')
from scripts.qwen_image import generate_image

# 生成图像
result = generate_image(
    prompt="一只可爱的橘猫，在阳光下打盹，写实风格",
    size="1024x1024",
    output_path="/tmp/openclaw"
)
print(f"图像已保存: {result}")
```

## API 配置

| 参数 | 值 |
|------|-----|
| API Key | `sk-ac30d5abfaf440eda8c96377b922d0ec` |
| Base URL | `https://dashscope.aliyuncs.com/api/v1` |
| Model | `qwen-image-2.0-pro` |

## 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| prompt | string | 必填 | 图像描述文本 |
| size | string | 1024x1024 | 图像尺寸 |
| n | int | 1 | 生成数量 |
| style | string | None | 风格 (写实/动漫/油画等) |
| output_path | string | /tmp/openclaw | 输出目录 |

## 命令行使用

```bash
python ~/.openclaw/skills/qwen-image-pro/scripts/generate.py "提示词" --size 1024x1024
```

## 网络问题处理

如果遇到 SSL 连接错误，可设置代理环境变量：

```bash
export HTTP_PROXY=http://127.0.0.1:7890
export HTTPS_PROXY=http://127.0.0.1:7890
```

## 参考文档

- [API 文档](references/api_docs.md)
