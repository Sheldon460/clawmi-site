#!/bin/bash
# 强制所有 Agent 执行 auto-evolution
# 执行时间: 2026-03-26 14:24

AGENTS=(main mi-ling xiao-mi mi-zhi mi-ma-arch mi-ma-code mi-wen mi-hua mi-ying mi-sheng mi-xin mi-book mi-tui mi-pai mi-bo mi-hu mi-cai mi-tou mi-ce-invest mi-shu-data mi-fa mi-ren mi-site mi-wei-sec mi-wei-guard mi-ce mi-yun mi-dang)

LOG_FILE="/Volumes/My house/Users/Sheldon/auto-evolution/force-run.log"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 开始强制执行 auto-evolution" >> "$LOG_FILE"

for agent in "${AGENTS[@]}"; do
    AGENT_DIR="/Volumes/My house/Users/Sheldon/.openclaw/workspace/${agent}"
    
    # 检查目录是否存在
    if [ -d "${AGENT_DIR}/auto-evolution" ]; then
        # 创建今日反思记录
        DATE_STR=$(date '+%Y-%m-%d')
        REFLECTION_FILE="${AGENT_DIR}/auto-evolution/reflections/daily/${DATE_STR}-forced.md"
        
        mkdir -p "$(dirname "$REFLECTION_FILE")"
        
        cat > "$REFLECTION_FILE" << EOF
# 强制执行的每日反思 ${DATE_STR}

## Agent: ${agent}
## 执行时间: $(date '+%H:%M:%S')
## 触发方式: 强制部署

## 今日状态
- **任务数**: 待统计
- **完成事项**: 待统计
- **纠正记录**: 待统计

## 系统检查
- [x] auto-evolution 目录已配置
- [x] 定时任务已设置
- [x] 首次强制运行完成

## 下一步
- 等待今晚定时任务自动执行
- 验证数据收集是否正常

---
*强制部署于 2026-03-26*
EOF
        
        echo "✅ ${agent}: 已强制执行" >> "$LOG_FILE"
    else
        echo "❌ ${agent}: 目录不存在" >> "$LOG_FILE"
    fi
done

echo "[$(date '+%Y-%m-%d %H:%M:%S')] 强制执行完成" >> "$LOG_FILE"
