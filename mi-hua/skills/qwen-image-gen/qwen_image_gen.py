"""
Qwen Image 2.0 Pro 图像生成模块
支持代理设置
"""

import urllib.request
import urllib.error
import json
import base64
import os
import time
import ssl
from typing import Optional, List

# API 配置
API_KEY = "sk-ac30d5abfaf440eda8c96377b922d0ec"
BASE_URL = "https://dashscope.aliyuncs.com/api/v1"
MODEL = "qwen-image-2.0-pro"

# 代理设置 (可选)
# 如果网络环境需要代理，设置此项
HTTP_PROXY = os.getenv("HTTP_PROXY", "")
HTTPS_PROXY = os.getenv("HTTPS_PROXY", "")


class QwenImageClient:
    """Qwen Image 2.0 Pro 客户端"""
    
    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or API_KEY
        self.base_url = BASE_URL
        self.model = MODEL
    
    def _get_opener(self):
        """创建带有代理和 SSL 配置的 opener"""
        handlers = []
        
        # 代理设置
        proxy_dict = {}
        if HTTP_PROXY:
            proxy_dict['http'] = HTTP_PROXY
        if HTTPS_PROXY:
            proxy_dict['https'] = HTTPS_PROXY
        
        if proxy_dict:
            handlers.append(urllib.request.ProxyHandler(proxy_dict))
        
        # SSL 设置
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        handlers.append(urllib.request.HTTPSHandler(context=ctx))
        
        return urllib.request.build_opener(*handlers)
    
    def _make_request(self, url: str, headers: dict, data: dict) -> dict:
        """使用 urllib 发送请求"""
        opener = self._get_opener()
        
        req = urllib.request.Request(
            url,
            data=json.dumps(data).encode('utf-8'),
            headers=headers,
            method='POST'
        )
        
        try:
            with opener.open(req, timeout=60) as response:
                return json.loads(response.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            error_body = e.read().decode('utf-8')
            raise Exception(f"HTTP Error {e.code}: {error_body}")
        except urllib.error.URLError as e:
            raise Exception(f"网络连接错误: {e.reason}\n请检查网络环境或设置 HTTP_PROXY/HTTPS_PROXY 环境变量")
    
    def _make_get_request(self, url: str, headers: dict) -> dict:
        """使用 urllib 发送 GET 请求"""
        opener = self._get_opener()
        req = urllib.request.Request(url, headers=headers, method='GET')
        
        try:
            with opener.open(req, timeout=60) as response:
                return json.loads(response.read().decode('utf-8'))
        except urllib.error.HTTPError as e:
            raise Exception(f"HTTP Error {e.code}: {e.read().decode('utf-8')}")
        except urllib.error.URLError as e:
            raise Exception(f"网络连接错误: {e.reason}")

    def generate_image(
        self,
        prompt: str,
        size: str = "1024x1024",
        n: int = 1,
        output_path: Optional[str] = None,
        style: Optional[str] = None
    ) -> List[str]:
        """生成图像"""
        url = f"{self.base_url}/services/aigc/text2image/image-synthesis"
        
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model,
            "input": {"prompt": prompt},
            "parameters": {"size": size, "n": n}
        }
        
        if style:
            payload["parameters"]["style"] = style
        
        # 提交任务
        result = self._make_request(url, headers, payload)
        
        if "output" not in result or "task_id" not in result["output"]:
            raise Exception(f"API 响应异常: {json.dumps(result, indent=2)}")
        
        task_id = result["output"]["task_id"]
        print(f"📋 任务 ID: {task_id}")
        
        # 等待结果
        return self._wait_for_result(task_id, output_path, n)
    
    def _wait_for_result(self, task_id: str, output_path: Optional[str], n: int) -> List[str]:
        """等待任务完成"""
        url = f"{self.base_url}/tasks/{task_id}"
        headers = {"Authorization": f"Bearer {self.api_key}"}
        
        max_retries = 60
        for i in range(max_retries):
            result = self._make_get_request(url, headers)
            
            status = result.get("output", {}).get("task_status", "UNKNOWN")
            
            if status == "SUCCEEDED":
                return self._save_images(result, output_path, n)
            elif status in ["FAILED", "CANCELLED"]:
                raise Exception(f"任务失败: {json.dumps(result, indent=2)}")
            
            if i % 5 == 0:
                print(f"⏳ 等待中... [{i}/{max_retries}] 状态: {status}")
            time.sleep(2)
        
        raise Exception("任务超时")
    
    def _save_images(self, result: dict, output_path: Optional[str], n: int) -> List[str]:
        """保存图像"""
        output_dir = output_path or "/tmp/openclaw"
        os.makedirs(output_dir, exist_ok=True)
        
        saved_paths = []
        results = result.get("output", {}).get("results", [])
        
        for i, img_data in enumerate(results):
            b64_data = img_data.get("b64_image")
            if not b64_data:
                continue
            
            img_bytes = base64.b64decode(b64_data)
            timestamp = int(time.time())
            filename = f"qwen_{timestamp}_{i+1}.png"
            filepath = os.path.join(output_dir, filename)
            
            with open(filepath, "wb") as f:
                f.write(img_bytes)
            
            saved_paths.append(filepath)
        
        return saved_paths


def generate_image(
    prompt: str,
    size: str = "1024x1024",
    n: int = 1,
    output_path: Optional[str] = None,
    style: Optional[str] = None
) -> str:
    """生成单张图像的便捷函数"""
    client = QwenImageClient()
    paths = client.generate_image(prompt, size=size, n=n, output_path=output_path, style=style)
    return paths[0] if paths else ""
