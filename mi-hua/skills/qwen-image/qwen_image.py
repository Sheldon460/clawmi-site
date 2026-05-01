#!/usr/bin/env python3
"""
Qwen Image 2.0 Pro 图像生成工具
阿里云百炼平台 API 封装
"""

import requests
import json
import base64
import os
import time
from typing import Optional, List

class QwenImageClient:
    """Qwen Image 2.0 Pro 客户端"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or "sk-ac30d5abfaf440eda8c96377b922d0ec"
        self.base_url = "https://dashscope.aliyuncs.com/api/v1"
        self.model = "qwen-image-2.0-pro"
    
    def generate_image(
        self,
        prompt: str,
        size: str = "1024x1024",
        n: int = 1,
        output_path: Optional[str] = None,
        style: Optional[str] = None
    ) -> List[str]:
        """
        生成图像
        
        Args:
            prompt: 图像描述文本
            size: 图像尺寸 (默认 1024x1024)
            n: 生成数量 (默认 1)
            output_path: 输出路径 (可选)
            style: 风格 (写实、动漫、油画等)
        
        Returns:
            生成的图像路径列表
        """
        url = f"{self.base_url}/services/aigc/text2image/image-synthesis"
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "input": {
                "prompt": prompt
            },
            "parameters": {
                "size": size,
                "n": n
            }
        }
        
        if style:
            payload["parameters"]["style"] = style
        
        # 提交任务
        response = requests.post(url, headers=headers, json=payload)
        response.raise_for_status()
        result = response.json()
        
        if "output" not in result or "task_id" not in result["output"]:
            raise Exception(f"API 响应异常: {result}")
        
        task_id = result["output"]["task_id"]
        print(f"任务已提交，ID: {task_id}")
        
        # 轮询获取结果
        return self._wait_for_result(task_id, output_path, n)
    
    def _wait_for_result(
        self,
        task_id: str,
        output_path: Optional[str],
        n: int
    ) -> List[str]:
        """等待任务完成并获取结果"""
        url = f"{self.base_url}/tasks/{task_id}"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        
        max_retries = 60
        for i in range(max_retries):
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            result = response.json()
            
            status = result.get("output", {}).get("task_status", "UNKNOWN")
            print(f"[{i+1}/{max_retries}] 任务状态: {status}")
            
            if status == "SUCCEEDED":
                return self._save_images(result, output_path, n)
            elif status in ["FAILED", "CANCELLED"]:
                raise Exception(f"任务失败: {result}")
            
            time.sleep(2)
        
        raise Exception("任务超时")
    
    def _save_images(
        self,
        result: dict,
        output_path: Optional[str],
        n: int
    ) -> List[str]:
        """保存生成的图像"""
        output_dir = output_path or "/tmp/openclaw"
        os.makedirs(output_dir, exist_ok=True)
        
        saved_paths = []
        results = result.get("output", {}).get("results", [])
        
        for i, img_data in enumerate(results):
            # 获取 base64 图像数据
            b64_data = img_data.get("b64_image")
            if not b64_data:
                continue
            
            # 解码并保存
            img_bytes = base64.b64decode(b64_data)
            timestamp = int(time.time())
            filename = f"qwen_image_{timestamp}_{i+1}.png"
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, "wb") as f:
                f.write(img_bytes)
            
            saved_paths.append(filepath)
            print(f"✅ 图像已保存: {filepath}")
        
        return saved_paths


def generate_image(
    prompt: str,
    size: str = "1024x1024",
    output_path: Optional[str] = None,
    style: Optional[str] = None
) -> str:
    """
    生成单张图像的便捷函数
    
    Args:
        prompt: 图像描述文本
        size: 图像尺寸
        output_path: 输出路径
        style: 风格
    
    Returns:
        生成的图像路径
    """
    client = QwenImageClient()
    paths = client.generate_image(prompt, size=size, n=1, output_path=output_path, style=style)
    return paths[0] if paths else ""


if __name__ == "__main__":
    # 测试
    result = generate_image(
        prompt="一只可爱的橘猫，在阳光下打盹，写实风格",
        size="1024x1024"
    )
    print(f"生成结果: {result}")
