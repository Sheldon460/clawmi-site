# Qwen Image 2.0 Pro API 文档

## 接口地址

```
POST https://dashscope.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis
```

## 请求头

```
Authorization: Bearer {api_key}
Content-Type: application/json
```

## 请求参数

### Body 参数

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| model | string | 是 | 模型名称: `qwen-image-2.0-pro` |
| input.prompt | string | 是 | 图像描述文本 |
| parameters.size | string | 否 | 图像尺寸，默认 1024x1024 |
| parameters.n | int | 否 | 生成数量，默认 1 |
| parameters.style | string | 否 | 风格: 写实/动漫/油画等 |

## 响应格式

### 提交成功响应

```json
{
  "output": {
    "task_id": "task-xxx",
    "task_status": "PENDING"
  },
  "request_id": "req-xxx"
}
```

### 查询任务结果

```
GET https://dashscope.aliyuncs.com/api/v1/tasks/{task_id}
```

### 成功结果

```json
{
  "output": {
    "task_id": "task-xxx",
    "task_status": "SUCCEEDED",
    "results": [
      {
        "b64_image": "base64encoded..."
      }
    ]
  }
}
```

## 支持的尺寸

- 1024x1024 (默认)
- 1024x768
- 768x1024
- 1280x720
- 720x1280

## 风格选项

- 写实
- 动漫
- 油画
- 水彩
- 素描
- 3D
