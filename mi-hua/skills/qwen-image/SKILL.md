---
name: qwen-image
description: 使用阿里云百炼 Qwen Image 2.0 Pro 模型生成高质量图像。支持文生图、图像编辑等功能。
---

# Qwen Image 2.0 Pro

阿里云百炼平台提供的 Qwen Image 2.0 Pro 图像生成模型。

## 功能特性

- **文生图 (Text-to-Image)**: 根据文本描述生成高质量图像
- **图像编辑**: 支持对现有图像进行编辑和修改
- **中文优化**: 对中文提示词有更好的理解能力
- **多种风格**: 支持写实、动漫、油画等多种艺术风格

## API 配置

```python
base_http_api_url = "https://dashscope.aliyuncs.com/api/v1"
api_key = "sk-ac30d5abfaf440eda8c96377b922d0ec"
model = "qwen-image-2.0-pro"
```

## 使用示例

### 文生图

```python
import requests
import json

api_key = "sk-ac30d5abfaf440eda8c96377b922d0ec"
url = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

payload = {
    "model": "qwen-image-2.0-pro",
    "input": {
        "prompt": "一只可爱的橘猫，在阳光下打盹，写实风格"
    },
    "parameters": {
        "size": "1024x1024",
        "n": 1
    }
}

response = requests.post(url, headers=headers, json=payload)
result = response.json()
```

## 参数说明

| 参数 | 类型 | 说明 |
|------|------|------|
| prompt | string | 图像描述文本 |
| size | string | 图像尺寸，如 "1024x1024" |
| n | integer | 生成图像数量 |
| style | string | 风格选项：写实、动漫、油画等 |
