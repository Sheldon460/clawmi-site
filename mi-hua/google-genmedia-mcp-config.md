# Google GenMedia MCP 配置信息

## 📍 本地安装路径
```
/Volumes/My house/Users/Sheldon/.gemini/extensions/google-genmedia-extension
```

## 🔧 MCP 服务器配置

### 环境变量
| 变量名 | 值 |
|--------|-----|
| `PROJECT_ID` | `fluted-protocol-480308-p8` |
| `GENMEDIA_BUCKET` | `bucket-0713` |
| `LOCATION` | `us-central1` (默认) |

### 可用工具

#### 1. imagen_t2i - 文本生成图像
- **用途**: 根据文本提示生成图像
- **模型选项**:
  - `imagen-4.0-generate-001` (推荐，支持 2K)
  - `imagen-4.0-fast-generate-001` (快速版)
  - `imagen-4.0-ultra-generate-001` (超高质量)
  - `imagen-3.0-generate-001/002` (Imagen 3)
- **支持的宽高比**: 1:1, 3:4, 4:3, 9:16, 16:9
- **支持的分辨率**: 1K, 2K

#### 2. imagen_edit_inpainting_insert - 局部插入
- **用途**: 在图像遮罩区域添加内容

#### 3. imagen_edit_inpainting_remove - 局部删除
- **用途**: 从图像遮罩区域移除内容

## 🚀 使用方法

### 直接调用命令
```bash
export PROJECT_ID="fluted-protocol-480308-p8"
export GENMEDIA_BUCKET="bucket-0713"

echo '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"imagen_t2i","arguments":{"prompt":"你的提示词","aspect_ratio":"16:9","image_size":"2K","model":"imagen-4.0-generate-001","num_images":1,"output_directory":"/tmp"}}}' | mcp-imagen-go
```

### 其他 MCP 服务器
| 服务器 | 命令 | 用途 |
|--------|------|------|
| veo | `mcp-veo-go` | 视频生成 |
| chirp3-hd | `mcp-chirp3-go` | 高清语音合成 |
| lyria | `mcp-lyria-go` | 音乐生成 |
| avtool | `mcp-avtool-go` | 音视频处理 |

## 📁 输出存储
- **GCS 路径**: `gs://bucket-0713/imagen_outputs/`
- **本地输出**: 可指定任意目录（如 `/tmp`）

## ✅ 已验证功能
- [x] 文本生成图像 (imagen_t2i)
- [x] 2K 分辨率支持
- [x] 16:9 宽屏比例
- [x] GCS 自动上传
- [x] 本地文件下载

---
记录时间: 2026-03-06
记录者: mi-hua (幂画)
