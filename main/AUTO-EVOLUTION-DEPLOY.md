# Auto-Evolution 强制部署令

> 所有 Agent 必须遵守的执行标准

## 📋 部署清单

### 每个 Agent 必须完成

- [ ] 1. 确认 `~/auto-evolution/` 目录存在
- [ ] 2. 确认 `~/.openclaw/skills/auto-evolution/` 技能已安装
- [ ] 3. 创建个人进化目录 `workspace/{agent}/auto-evolution/`
- [ ] 4. 配置错峰定时任务
- [ ] 5. 验证首次运行

---

## 🕐 错峰定时任务表

| Agent | 每日复盘 | 午间反思 | 说明 |
|-------|---------|---------|------|
| main | 23:00 | 15:00 | 系统总管 |
| mi-ling | 23:05 | 15:05 | COO |
| xiao-mi | 23:10 | 15:10 | 督办 |
| mi-zhi | 23:15 | 15:15 | CIO |
| mi-ma-arch | 23:20 | 15:20 | 架构 |
| mi-ma-code | 23:25 | 15:25 | 编程 |
| mi-wen | 23:30 | 15:30 | 内容 |
| mi-hua | 23:35 | 15:35 | 视觉 |
| mi-ying | 23:40 | 15:40 | 视频 |
| mi-sheng | 23:45 | 15:45 | 音频 |
| mi-xin | 23:50 | 15:50 | 微信 |
| mi-book | 23:55 | 15:55 | 小红书 |
| mi-tui | 00:00 | 16:00 | Twitter |
| mi-pai | 00:05 | 16:05 | 短视频 |
| mi-bo | 00:10 | 16:10 | 长视频 |
| mi-hu | 00:15 | 16:15 | 知乎 |
| mi-cai | 00:20 | 16:20 | 财务 |
| mi-tou | 00:25 | 16:25 | 投资 |
| mi-ce-invest | 00:30 | 16:30 | 行情 |
| mi-shu-data | 00:35 | 16:35 | 数据 |
| mi-fa | 00:40 | 16:40 | 法务 |
| mi-ren | 00:45 | 16:45 | HR |
| mi-site | 00:50 | 16:50 | 站点 |
| mi-wei-sec | 00:55 | 16:55 | 安全 |
| mi-wei-guard | 01:00 | 17:00 | 防御 |
| mi-ce | 01:05 | 17:05 | 测试 |
| mi-yun | 01:10 | 17:10 | DevOps |
| mi-dang | 01:15 | 17:15 | 知识 |

---

## 🔧 强制配置脚本

```bash
#!/bin/bash
# auto-evolution-force-setup.sh
# 为所有 Agent 强制配置 auto-evolution

AGENTS=(main mi-ling xiao-mi mi-zhi mi-ma-arch mi-ma-code mi-wen mi-hua mi-ying mi-sheng mi-xin mi-book mi-tui mi-pai mi-bo mi-hu mi-cai mi-tou mi-ce-invest mi-shu-data mi-fa mi-ren mi-site mi-wei-sec mi-wei-guard mi-ce mi-yun mi-dang)

for agent in "${AGENTS[@]}"; do
    AGENT_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/${agent}"
    
    # 创建 auto-evolution 目录
    mkdir -p "${AGENT_DIR}/auto-evolution"/{memory,corrections,reflections/{daily,weekly,monthly},triggers}
    
    # 创建必需文件
    touch "${AGENT_DIR}/auto-evolution/memory/hot-memory.md"
    touch "${AGENT_DIR}/auto-evolution/memory/pattern-library.md"
    touch "${AGENT_DIR}/auto-evolution/corrections/immediate.md"
    
    echo "✅ ${agent}"
done
```

---

## 📊 验证命令

```bash
# 检查所有 Agent 的配置
for agent in main mi-ling xiao-mi mi-zhi mi-ma-arch mi-ma-code mi-wen mi-hua mi-ying mi-sheng mi-xin mi-book mi-tui mi-pai mi-bo mi-hu mi-cai mi-tou mi-ce-invest mi-shu-data mi-fa mi-ren mi-site mi-wei-sec mi-wei-guard mi-ce mi-yun mi-dang; do
    echo "=== ${agent} ==="
    ls "/Volumes/My house/Users/Sheldon/.openclaw/workspace/${agent}/auto-evolution/" 2>/dev/null || echo "❌ 未配置"
done
```

---

## ⚡ 立即执行

**所有 Agent 必须在下次对话时：**

1. **检查自身 auto-evolution 目录**
2. **确认定时任务已配置**
3. **执行一次手动测试**
4. **报告状态给 main**

**不执行者，视为违反幂家军纪律。**

---

*部署时间: 2026-03-26*
*执行标准: 零容忍*
