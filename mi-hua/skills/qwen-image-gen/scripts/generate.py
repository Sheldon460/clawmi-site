#!/usr/bin/env python3
"""
Qwen Image 2.0 Pro 图像生成脚本
阿里云百炼平台 API 封装
"""

import argparse
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from qwen_image_gen import generate_image


def main():
    parser = argparse.ArgumentParser(description='使用 Qwen Image 2.0 Pro 生成图像')
    parser.add_argument('prompt', help='图像描述文本')
    parser.add_argument('--size', default='1024x1024', help='图像尺寸 (默认: 1024x1024)')
    parser.add_argument('--style', default=None, help='风格 (写实/动漫/油画等)')
    parser.add_argument('--output', default='/tmp/openclaw/qwen_output.png', help='输出路径')
    parser.add_argument('--n', type=int, default=1, help='生成数量')
    
    args = parser.parse_args()
    
    print(f"🎨 正在生成图像...")
    print(f"提示词: {args.prompt}")
    print(f"尺寸: {args.size}")
    
    try:
        result = generate_image(
            prompt=args.prompt,
            size=args.size,
            n=args.n,
            output_path=os.path.dirname(args.output),
            style=args.style
        )
        print(f"\n✅ 图像生成成功!")
        print(f"保存路径: {result}")
        return 0
    except Exception as e:
        print(f"\n❌ 生成失败: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
