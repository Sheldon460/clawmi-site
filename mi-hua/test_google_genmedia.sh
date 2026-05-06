#!/bin/bash
# Google GenMedia / Gemini 图像生成测试脚本

echo "🎨 Google GenMedia 图像生成测试"
echo "================================"

# 检查 API Key
if [ -z "$GEMINI_API_KEY" ] && [ -z "$GOOGLE_API_KEY" ]; then
    echo "❌ 错误: GEMINI_API_KEY 或 GOOGLE_API_KEY 未设置"
    echo ""
    echo "请设置环境变量:"
    echo "  export GEMINI_API_KEY='your-api-key'"
    echo "  或"
    echo "  export GOOGLE_API_KEY='your-api-key'"
    echo ""
    echo "获取 API Key: https://makersuite.google.com/app/apikey"
    exit 1
fi

echo "✅ API Key 已配置"
echo ""

# 测试提示词
PROMPT="一只可爱的橘猫，在阳光下打盹，写实风格，高质量"

echo "📝 测试提示词: $PROMPT"
echo "📐 尺寸: 1024x1024"
echo "🤖 模型: gemini-3.1-flash-image-preview"
echo ""

# 使用 OpenClaw image_generate 工具测试
echo "🚀 开始生成图像..."

# 注意: 这里需要使用 OpenClaw 的 image_generate 工具
# 由于无法直接调用，这里提供 Python 示例代码

cat << 'PYTHON_CODE'
# Python 测试代码:
import os
from google import genai

client = genai.Client(api_key=os.environ.get('GEMINI_API_KEY') or os.environ.get('GOOGLE_API_KEY'))

response = client.models.generate_image(
    model='gemini-3.1-flash-image-preview',
    prompt='一只可爱的橘猫，在阳光下打盹，写实风格，高质量',
    config=genai.types.GenerateImageConfig(
        number_of_images=1,
        aspect_ratio='1:1'
    )
)

# 保存图像
for i, image in enumerate(response.generated_images):
    with open(f'google_genmedia_test_{i}.png', 'wb') as f:
        f.write(image.image.image_bytes)
    print(f'✅ 图像已保存: google_genmedia_test_{i}.png')

PYTHON_CODE

echo ""
echo "💡 提示: 请安装 google-genai 包: pip install google-genai"
