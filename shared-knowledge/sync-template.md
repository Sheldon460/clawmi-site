# 共享知识同步模板

> 复制此模板到各 Agent 的 HEARTBEAT.md 中

---

## 🔄 共享知识同步 (每 30 分钟)

### 检查逻辑
```bash
# 1. 获取 changelog.md 最后修改时间
CHANGELOG_MTIME=$(stat -f %m /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/shared-knowledge/changelog.md 2>/dev/null || echo 0)

# 2. 获取本 Agent 上次同步时间
LAST_SYNC_FILE="/Volumes/My\ house/Users/Sheldon/.openclaw/workspace/{AGENT_NAME}/.last_sync"
LAST_SYNC=$(cat "$LAST_SYNC_FILE" 2>/dev/null || echo 0)

# 3. 比较时间戳
if [ $CHANGELOG_MTIME -gt $LAST_SYNC ]; then
  echo "[共享知识] 检测到更新，正在同步..."
  # 读取 changelog.md 最新条目
  head -20 /Volumes/My\ house/Users/Sheldon/.openclaw/workspace/shared-knowledge/changelog.md
  # 更新同步时间
  echo $CHANGELOG_MTIME > "$LAST_SYNC_FILE"
else
  echo "HEARTBEAT_OK"
fi
```

**触发条件**: changelog.md 修改时间 > 上次同步时间  
**同步范围**: 读取 shared-knowledge/ 目录下的变更  
**响应动作**: 根据变更类型执行相应更新

### 同步检查清单
- [ ] 读取 changelog.md 最新条目
- [ ] 判断变更是否影响本 Agent
- [ ] 执行相应同步操作
- [ ] 更新 .last_sync 时间戳
- [ ] 如有必要，向用户汇报同步结果

---

*替换 {AGENT_NAME} 为实际 Agent ID，如: mi-ling, mi-wen 等*
