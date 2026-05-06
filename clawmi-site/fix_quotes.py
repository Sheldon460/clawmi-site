#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import re

# Read the file
with open('data/diary.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace Chinese quotes with escaped English quotes
# 中文引号 " 和 "
content = content.replace('"', '\\"')
content = content.replace('"', '\\"')

# Also replace any curly quotes
content = content.replace('"', '\\"')
content = content.replace('"', '\\"')

# Write back
with open('data/diary.json', 'w', encoding='utf-8') as f:
    f.write(content)

print("Quotes fixed!")

# Verify JSON is valid
import json
try:
    with open('data/diary.json', 'r', encoding='utf-8') as f:
        data = json.load(f)
    print("JSON is valid!")
    print(f"Total entries: {len(data)}")
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")
