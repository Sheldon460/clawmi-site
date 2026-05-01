#!/usr/bin/env python3
import requests
from bs4 import BeautifulSoup
import re

url = 'https://mp.weixin.qq.com/s/j8cqrhmHuYFzv6tuuAa2PQ'
headers = {
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1 WeChat/7.0.18'
}

response = requests.get(url, headers=headers, timeout=30)
soup = BeautifulSoup(response.text, 'html.parser')

# 提取标题
title = soup.find('h1', class_='rich_media_title')
if not title:
    title = soup.find('h2', class_='rich_media_title')
title_text = title.get_text(strip=True) if title else 'Unknown Title'

# 提取作者
author = soup.find('span', class_='rich_media_meta_nickname')
author_text = author.get_text(strip=True) if author else 'Unknown'

# 提取正文
content_div = soup.find('div', id='js_content')
if not content_div:
    content_div = soup.find('div', class_='rich_media_content')

# 提取所有段落和图像
markdown_content = []
markdown_content.append(f"# {title_text}\n")
markdown_content.append(f"**作者**: {author_text}\n")
markdown_content.append(f"**来源**: {url}\n")
markdown_content.append("---\n")

if content_div:
    # 提取图片
    images = content_div.find_all('img')
    for i, img in enumerate(images):
        img_src = img.get('data-src') or img.get('src')
        if img_src:
            markdown_content.append(f"![图片 {i+1}]({img_src})\n")
    
    # 提取文本段落
    paragraphs = content_div.find_all(['p', 'section'])
    for p in paragraphs:
        text = p.get_text(strip=True)
        if text and len(text) > 10:  # 过滤太短的内容
            # 检查是否是引用
            if p.get('style') and 'blockquote' in p.get('style', ''):
                markdown_content.append(f"> {text}\n")
            else:
                markdown_content.append(f"{text}\n")

# 输出
output = '\n'.join(markdown_content)
print(output)

# 保存到文件
with open('./temp/article_content.md', 'w', encoding='utf-8') as f:
    f.write(output)

print("\n\n=== 已保存到 ./temp/article_content.md ===")
