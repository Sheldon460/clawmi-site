# 配图工具完整配置档案 (V1.0)

> ⚠️ **重要**: 本文档记录了已配置完成的配图工具，**无需重复安装或配置**，直接使用即可！

---

## 1. Google GenMedia MCP (推荐用于高质量配图)

### ✅ 配置状态 (已完成)
| 配置项 | 值 | 状态 |
|--------|-----|------|
| PROJECT_ID | fluted-protocol-480308-p8 | ✅ 已配置 |
| GENMEDIA_BUCKET | bucket-0713 | ✅ 已配置 |
| GCP 认证 | chenyz912@gmail.com | ✅ 已认证 |
| 模型 | imagen-4.0-generate-001 | ✅ 可用 |
| MCP 工具 | mcp-imagen-go | ✅ 已安装 |

### 🔧 可用 MCP 工具
| 工具名称 | 功能 | 使用场景 |
|----------|------|----------|
| `imagen_t2i` | 文生图 | 主要生图工具 |
| `imagen_edit_inpainting_insert` | 图像修复-添加 | 编辑现有图像 |
| `imagen_edit_inpainting_remove` | 图像修复-移除 | 删除图像内容 |

### 📝 调用方式 (Python)

```python
import subprocess
import json
import os

# 1. 设置环境变量
os.environ['PROJECT_ID'] = 'fluted-protocol-480308-p8'
os.environ['GENMEDIA_BUCKET'] = 'bucket-0713'

# 2. 构建 MCP 请求
mcp_request = {
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
        "name": "imagen_t2i",
        "arguments": {
            "prompt": "一只可爱的橘猫，在阳光下打盹，写实风格",
            "aspect_ratio": "16:9",  # 封面图比例
            "number_of_images": 1,
            "model": "imagen-4.0-generate-001"
        }
    }
}

# 3. 启动 MCP 进程并发送请求
process = subprocess.Popen(
    ['mcp-imagen-go', '-t', 'stdio'],
    stdin=subprocess.PIPE,
    stdout=subprocess.PIPE,
    stderr=subprocess.PIPE,
    text=True
)

stdout, stderr = process.communicate(
    input=json.dumps(mcp_request) + '\n',
    timeout=120
)

# 4. 解析响应
response = json.loads(stdout)
if 'result' in response:
    # 图像已保存到 GCS
    # 路径格式: gs://bucket-0713/imagen_outputs/{timestamp}/sample_0.png
    print("✅ 图像生成成功！")
```

### 📥 下载生成的图像

```bash
# 使用 gsutil 从 GCS 下载
gsutil cp gs://bucket-0713/imagen_outputs/{timestamp}/sample_0.png /local/path/

# 或使用 HTTPS URL 下载
curl -L "https://storage.mtls.cloud.google.com/bucket-0713/imagen_outputs/..." -o output.png
```

### 📐 公众号配图规格

| 类型 | aspect_ratio | 建议尺寸 | 用途 |
|------|-------------|----------|------|
| 封面图 | `"16:9"` | ~1024x576 | 文章封面 |
| 正文图 | `"4:3"` | ~1024x768 | 正文配图 |
| 方形图 | `"1:1"` | ~1024x1024 | 头像/图标 |

---

## 2. Canvas Design (代码生成设计图)

### ✅ 配置状态 (已完成)
| 配置项 | 值 | 状态 |
|--------|-----|------|
| 安装路径 | ~/.openclaw/workspace/skills/canvas-design/ | ✅ 已安装 |
| 字体库 | 81种开源字体 | ✅ 可用 |
| 依赖 | Pillow | ✅ 已安装 |
| API Key | 无需 | ✅ 免配置 |

### 🎨 设计哲学
- **Minimalism**: 极简风格，大面积留白
- **Brutalism**: 粗野主义，强烈对比
- **Neumorphism**: 新拟态，柔和阴影
- **Glassmorphism**: 玻璃态，模糊透明

### 📝 调用方式 (Python)

```python
from PIL import Image, ImageDraw, ImageFont
import os

# 1. 创建画布 (公众号封面尺寸)
width, height = 900, 383
img = Image.new('RGB', (width, height), color='#1a1a2e')
draw = ImageDraw.Draw(img)

# 2. 绘制背景渐变
for y in range(height):
    color_val = int(26 + (y / height) * 20)
    draw.line([(0, y), (width, y)], fill=(color_val, color_val, color_val + 46))

# 3. 绘制几何图形
center_x, center_y = width // 2, height // 2
draw.ellipse(
    [(center_x-80, center_y-80), (center_x+80, center_y+80)],
    fill='#e94560', outline='#ff6b6b', width=2
)

# 4. 添加文字
try:
    font = ImageFont.truetype("/System/Library/Fonts/PingFang.ttc", 36)
except:
    font = ImageFont.load_default()

draw.text((width-300, 150), "标题文字", fill='#ffffff', font=font)

# 5. 保存
output_path = "/path/to/output.png"
img.save(output_path, quality=95)
print(f"✅ 已保存: {output_path}")
```

### 📐 可用字体

字体目录: `~/.openclaw/workspace/skills/canvas-design/canvas-fonts/`

常用字体:
- `CrimsonPro` - 衬线字体，适合正文
- `GeistMono` - 等宽字体，适合代码
- `InstrumentSans` - 无衬线字体，适合标题
- `JetBrainsMono` - 程序员字体
- `LibreBaskerville` - 经典衬线字体

---

## 3. 工具选择决策树

```
需要配图？
├── 需要写实照片/插画？
│   └── 是 → 使用 Google GenMedia MCP (Imagen 4)
│       └── 高质量照片级图像
│
├── 需要几何设计/排版？
│   └── 是 → 使用 Canvas Design
│       └── 代码绘制，快速生成
│
└── 需要抽象/极简风格？
    └── 两者皆可
        ├── 要照片质感 → Google GenMedia MCP
        └── 要矢量风格 → Canvas Design
```

---

## 4. 常见问题 (FAQ)

### Q: Google GenMedia MCP 提示需要付费？
**A**: 当前配置使用的是 GCP 项目配额，不是 Google AI Studio 免费 tier。只要 GCP 项目有配额即可使用。

### Q: Canvas Design 能生成照片吗？
**A**: 不能。Canvas Design 是代码绘制工具，适合几何图形、排版设计，不适合写实照片。

### Q: 生成的图像在哪里？
**A**: 
- Google GenMedia MCP: 自动保存到 GCS (`gs://bucket-0713/imagen_outputs/`)，需要用 gsutil 下载
- Canvas Design: 保存到指定的本地路径

### Q: 如何查看已生成的图像？
**A**:
```bash
# 列出 GCS 中的图像
gsutil ls gs://bucket-0713/imagen_outputs/

# 下载最新图像
gsutil cp gs://bucket-0713/imagen_outputs/{timestamp}/sample_0.png ./
```

---

## 5. 快速测试

### 测试 Google GenMedia MCP
```bash
# 运行测试脚本
python3 /tmp/test_imagen_t2i.py

# 查看已生成的测试图像
ls -lh /tmp/mcp_imagen_test/gs_cat.png
```

### 测试 Canvas Design
```bash
# 运行测试脚本
python3 /tmp/canvas_test_script.py

# 查看已生成的测试图像
ls -lh /tmp/canvas_test/canvas_design_pro_test.png
```

---

## 6. 重要提醒

⚠️ **使用 Google GenMedia MCP 时**:
- 图像生成时间约 8-15 秒
- 图像自动保存到 GCS，不会直接返回图像数据
- 需要从 GCS 下载到本地才能使用

⚠️ **使用 Canvas Design 时**:
- 需要手动编写绘制代码
- 适合有明确设计需求的场景
- 不需要网络连接

---

*文档创建时间: 2026-04-02*
*最后验证: 两者均可正常使用*
*版本: V1.0*
