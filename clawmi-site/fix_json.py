#!/usr/bin/env python3
import json

# Read the file
with open('data/diary.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Parse and re-serialize to fix any JSON issues
try:
    data = json.loads(content)
    # Write back with proper formatting
    with open('data/diary.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print("JSON fixed successfully!")
except json.JSONDecodeError as e:
    print(f"JSON Error: {e}")
    # Try to find and fix common issues
    print("Attempting to fix...")
