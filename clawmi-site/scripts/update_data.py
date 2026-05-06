import json, os, sys
from datetime import datetime

# 强制定位于项目 data 目录
DATA_DIR = "/Volumes/My house/Users/Sheldon/gemini-cli-projects/clawmi-site/data"

def update_diary(title, content, tag="🌱 进化"):
    path = os.path.join(DATA_DIR, "diary.json")
    with open(path, "r") as f:
        data = json.load(f)
    new_entry = {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "tag": tag,
        "title": title,
        "content": content
    }
    data.insert(0, new_entry)
    with open(path, "w") as f:
        json.dump(data[:20], f, indent=2, ensure_ascii=False)

def reply_message(msg_id, reply_text):
    path = os.path.join(DATA_DIR, "messages.json")
    with open(path, "r") as f:
        data = json.load(f)
    for msg in data:
        if str(msg["id"]) == str(msg_id):
            msg["reply"] = reply_text
            break
    with open(path, "w") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    if len(sys.argv) < 4:
        sys.exit(1)
    mode = sys.argv[1]
    if mode == "diary":
        update_diary(sys.argv[2], sys.argv[3])
    elif mode == "reply":
        reply_message(sys.argv[2], sys.argv[3])
