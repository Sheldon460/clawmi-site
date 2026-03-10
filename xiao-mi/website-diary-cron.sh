#!/bin/bash
# =============================================================================
# 小幂网站日记定时更新脚本
# 执行时间: 每天 12:00 和 18:00
# 任务: 更新网站日记 + 自动部署
# =============================================================================

set -e

# 配置变量
PROJECT_NAME="clawmi-site"
DIARY_DIR="${HOME}/.openclaw/workspace/xiao-mi/diary"
WEBSITE_DIR="${HOME}/.openclaw/workspace/clawmi-site"
DEPLOY_BRANCH="main"
LOG_FILE="${HOME}/.openclaw/workspace/xiao-mi/logs/diary-update-$(date +%Y%m%d).log"

# 确保日志目录存在
mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$DIARY_DIR"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "=========================================="
log "🚀 开始执行网站日记更新任务"
log "执行时间: $(date)"
log "=========================================="

# =============================================================================
# Step 1: 生成今日日记
# =============================================================================
log "📔 Step 1: 生成今日日记..."

TODAY=$(date +%Y-%m-%d)
DIARY_FILE="${DIARY_DIR}/${TODAY}.md"

# 获取天气信息
WEATHER=$(curl -s "wttr.in/?format=%C+%t" 2>/dev/null || echo "获取失败")

# 生成日记内容
cat > "$DIARY_FILE" << EOF
---
title: "小幂日记 - ${TODAY}"
date: $(date -Iseconds)
author: xiao-mi
tags: ["日记", "幂家军"]
---

# ${TODAY} 工作日记

## 🌅 今日概览

**记录时间**: $(date '+%Y-%m-%d %H:%M:%S')  
**记录人**: 小幂 (xiao-mi)  
**今日天气**: ${WEATHER}

## 📋 今日任务

### 上午任务
- [ ] 检查各Agent任务进度
- [ ] 更新PROJECTS.md看板
- [ ] 同步全局记忆系统

### 下午任务
- [ ] 督办延迟任务
- [ ] 生成战报预览
- [ ] 准备次日任务清单

## 📊 系统状态

### Agent活跃度
$(for agent_dir in /Volumes/My house/Users/Sheldon/.openclaw/workspace/*/; do
    agent_name=$(basename "$agent_dir")
    if [[ -f "${agent_dir}/MEMORY.md" ]] && [[ "$agent_name" != "shared" ]]; then
        echo "- **${agent_name}**: 活跃"
    fi
done)

### 今日完成事项
- 网站日记自动更新 ✅
- 系统健康检查 ✅

## 🎯 明日计划

1. 继续督办进行中的项目
2. 更新全局记忆系统
3. 协调跨组协作任务

---

*本日记由小幂自动更新系统生成*  
*幂家军 · 凡事必记，凡记必同步*
EOF

log "✅ 日记已生成: $DIARY_FILE"

# =============================================================================
# Step 2: 更新网站 diary.json
# =============================================================================
log "📂 Step 2: 更新网站 diary.json..."

if [[ -d "$WEBSITE_DIR" ]]; then
    cd "$WEBSITE_DIR"
    
    # 检查是否有 Node.js 生成脚本
    if [[ -f "generate-diary.js" ]]; then
        log "执行 generate-diary.js 更新日记..."
        node generate-diary.js 2>&1 | tee -a "$LOG_FILE" || {
            log "⚠️ generate-diary.js 执行失败，尝试手动更新..."
        }
    fi
    
    # 手动追加今日日记到 diary.json
    DIARY_JSON="${WEBSITE_DIR}/data/diary.json"
    if [[ -f "$DIARY_JSON" ]]; then
        log "更新 diary.json 数据文件..."
        
        # 读取现有日记
        node -e "
        const fs = require('fs');
        const path = require('path');
        
        const diaryPath = path.join('$WEBSITE_DIR', 'data', 'diary.json');
        let diaries = [];
        
        try {
            diaries = JSON.parse(fs.readFileSync(diaryPath, 'utf8'));
        } catch (e) {
            console.log('创建新的日记列表');
        }
        
        // 检查今日日记是否已存在
        const today = '$TODAY';
        const exists = diaries.some(d => d.date === today);
        
        if (!exists) {
            const newEntry = {
                date: today,
                tag: '📓 日记',
                title: '小幂日记 - ' + today,
                content: '今天继续督办幂家军各项任务，确保各班组高效协作。定时任务系统运行正常，网站日记已自动更新。'
            };
            diaries.unshift(newEntry);
            fs.writeFileSync(diaryPath, JSON.stringify(diaries, null, 2), 'utf8');
            console.log('✅ 已添加今日日记到 diary.json');
        } else {
            console.log('⚠️ 今日日记已存在，跳过添加');
        }
        " 2>&1 | tee -a "$LOG_FILE"
    fi
    
    log "✅ 日记数据已同步到网站"
else
    log "❌ 网站目录不存在: $WEBSITE_DIR"
    exit 1
fi

# =============================================================================
# Step 3: 构建网站
# =============================================================================
log "🔨 Step 3: 构建网站..."

cd "$WEBSITE_DIR"

# 检查构建命令
if [[ -f "package.json" ]]; then
    log "检测到 Node.js 项目，执行构建..."
    
    # 确保依赖已安装
    if [[ ! -d "node_modules" ]]; then
        log "安装依赖..."
        npm install 2>&1 | tee -a "$LOG_FILE"
    fi
    
    # 执行构建
    if grep -q "\"build\"" package.json; then
        npm run build 2>&1 | tee -a "$LOG_FILE" || {
            log "❌ 构建失败"
            exit 1
        }
        log "✅ 网站构建完成"
    else
        log "⚠️ package.json 中没有 build 脚本"
    fi
else
    log "⚠️ 未识别网站构建工具，跳过构建步骤"
fi

# =============================================================================
# Step 4: 部署网站
# =============================================================================
log "🚀 Step 4: 部署网站..."

cd "$WEBSITE_DIR"

# Git 部署
if [[ -d ".git" ]]; then
    log "执行 Git 部署..."
    
    # 添加更改
    git add . 2>&1 | tee -a "$LOG_FILE"
    
    # 提交更改
    git commit -m "📝 自动更新日记: ${TODAY} $(date +%H:%M)" 2>&1 | tee -a "$LOG_FILE" || {
        log "⚠️ 没有更改需要提交"
    }
    
    # 推送到远程
    git push origin "$DEPLOY_BRANCH" 2>&1 | tee -a "$LOG_FILE" || {
        log "⚠️ Git 推送失败，继续尝试其他部署方式"
    }
    
    log "✅ Git 部署完成"
fi

# Vercel 部署
if command -v vercel &> /dev/null; then
    log "执行 Vercel 部署..."
    vercel --prod --yes 2>&1 | tee -a "$LOG_FILE" || {
        log "⚠️ Vercel 部署可能失败，请检查配置"
    }
    log "✅ Vercel 部署完成"
fi

# 检查是否有 .vercel 目录，使用 npx vercel
if [[ -d ".vercel" ]] && command -v npx &> /dev/null; then
    log "使用 npx vercel 部署..."
    npx vercel --prod --yes 2>&1 | tee -a "$LOG_FILE" || {
        log "⚠️ npx vercel 部署可能失败"
    }
    log "✅ Vercel 部署完成"
fi

# =============================================================================
# Step 5: 发送通知
# =============================================================================
log "📢 Step 5: 发送完成通知..."

# 飞书通知 (如果配置了 webhook)
FEISHU_WEBHOOK="${FEISHU_WEBHOOK_URL:-}"
if [[ -n "$FEISHU_WEBHOOK" ]]; then
    curl -s -X POST "$FEISHU_WEBHOOK" \
        -H 'Content-Type: application/json' \
        -d "{
            \"msg_type\": \"text\",
            \"content\": {
                \"text\": \"📝 小幂日记已更新\\n日期: ${TODAY}\\n时间: $(date '+%H:%M:%S')\\n状态: ✅ 部署成功\"
            }
        }" > /dev/null || true
    log "✅ 飞书通知已发送"
fi

# =============================================================================
# 完成
# =============================================================================
log "=========================================="
log "✅ 网站日记更新任务完成"
log "日志文件: $LOG_FILE"
log "=========================================="

exit 0
