#!/usr/bin/env python3
"""测试 Qwen Image 2.0 Pro"""

import sys
sys.path.insert(0, '/Users/Sheldon/.openclaw/skills/qwen-image')

from qwen_image import QwenImageClient, generate_image

# 测试生成图像
print("=" * 50)
print("测试 Qwen Image 2.0 Pro 图像生成")
print("=" * 50)

try:
    result = generate_image(
        prompt="极简主义风格海报，白色背景，中央写着 'LESS IS MORE'，现代字体设计，柔和阴影",
        size="1024x1024",
        output_path="/tmp/openclaw"
    )
    print(f"\n✅ 测试成功！图像保存至: {result}")
except Exception as e:
    print(f"\n❌ 测试失败: {e}")
    import traceback
    traceback.print_exc()
