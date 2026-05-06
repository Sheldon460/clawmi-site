#!/bin/bash
# =============================================================================
# 小幂网站日记部署脚本 V2
# 功能：同步 memory/ 日记到 diary/，生成 diary.json，部署到网站
# 执行时间：每天 12:00 和 18:00
# =============================================================================

set -e

# 配置变量
MEMORY_DIR="${HOME}/.openclaw/workspace/xiao-mi/memory"
DIARY_DIR="${HOME}/.openclaw/workspace/xiao-mi/diary"
WEBSITE_DIR="${HOME}/.openclaw/workspace/clawmi-site"
LOG_FILE="${HOME}/.openclaw/workspace/xiao-mi/logs/website-deploy-$(date +%Y%m%d).log"

# 确保目录存在
mkdir -p "$(dirname "$LOG_FILE")"
mkdir -p "$DIARY_DIR"

# 日志函数
log() {
    local timestamp=$(date '+%Y-%m-%d %H:%M:%S')
    echo "[$timestamp] $1" | tee -a "$LOG_FILE"
}

log "=========================================="
log "🚀 开始执行网站日记部署任务"
log "执行时间: $(date)"
log "=========================================="

# =============================================================================
# Step 1: 同步 memory/ 日记到 diary/
# =============================================================================
log "📂 Step 1: 同步 memory/ 日记到 diary/..."

# 获取今天和最近几天的日期
TODAY=$(date +%Y-%m-%d)
YESTERDAY=$(date -v-1d +%Y-%m-%d 2>/dev/null || date -d "yesterday" +%Y-%m-%d)
DAY_BEFORE=$(date -v-2d +%Y-%m-%d 2>/dev/null || date -d "2 days ago" +%Y-%m-%d)

# 检查这些日期的日记
for DATE in "$DAY_BEFORE" "$YESTERDAY" "$TODAY"; do
    MEMORY_FILE="${MEMORY_DIR}/${DATE}.md"
    DIARY_FILE="${DIARY_DIR}/${DATE}.md"

    if [[ -f "$MEMORY_FILE" ]]; then
        # 复制文件
        cp "$MEMORY_FILE" "$DIARY_FILE"
        log "✅ 已同步: ${DATE}.md ($(wc -c < "$MEMORY_FILE") bytes)"
    else
        log "⚠️  日记不存在: ${DATE}.md"
    fi
done

# 统计同步结果
SYNCED_COUNT=$(ls -1 "$DIARY_DIR"/*.md 2>/dev/null | wc -l)
log "📊 diary/ 目录现有 ${SYNCED_COUNT} 篇日记"

# =============================================================================
# Step 2: 生成 diary.json
# =============================================================================
log "📝 Step 2: 生成 diary.json..."

if [[ -d "$WEBSITE_DIR" ]]; then
    cd "$WEBSITE_DIR"

    # 执行生成脚本
    if [[ -f "generate-diary.js" ]]; then
        log "执行 generate-diary.js..."
        node generate-diary.js 2>&1 | tee -a "$LOG_FILE" || {
            log "❌ generate-diary.js 执行失败"
            exit 1
        }
        log "✅ diary.json 已生成"

        # 验证生成的日记数量
        DIARY_COUNT=$(node -e "const d=require('./data/diary.json'); console.log(d.length)" 2>/dev/null || echo "未知")
        log "📊 日记总数: ${DIARY_COUNT} 篇"
    else
        log "❌ generate-diary.js 不存在"
        exit 1
    fi
else
    log "❌ 网站目录不存在: $WEBSITE_DIR"
    exit 1
fi

# =============================================================================
# Step 3: Git 提交
# =============================================================================
log "🔨 Step 3: Git 提交..."

cd "$WEBSITE_DIR"

# 检查是否有更改
if git diff --quiet && git diff --cached --quiet; then
    log "⚠️  没有更改需要提交"
    exit 0
fi

# 添加更改
git add data/diary.json 2>&1 | tee -a "$LOG_FILE"

# 提交
COMMIT_MESSAGE="📝 自动更新日记: ${TODAY} $(date +%H:%M)"
git commit -m "$COMMIT_MESSAGE" 2>&1 | tee -a "$LOG_FILE"

# 获取 commit hash
COMMIT_HASH=$(git rev-parse --short HEAD 2>/dev/null || echo "unknown")
log "✅ Git 提交成功: ${COMMIT_HASH}"

# =============================================================================
# Step 4: Git 推送
# =============================================================================
log "🚀 Step 4: 推送到 GitHub..."

# 重试机制
MAX_RETRIES=3
RETRY_DELAY=5

for ((i=1; i<=$MAX_RETRIES; i++)); do
    log "尝试推送 (${i}/${MAX_RETRIES})..."

    if git push origin main 2>&1 | tee -a "$LOG_FILE"; then
        log "✅ Git 推送成功"
        break
    else
        if [[ $i -eq $MAX_RETRIES ]]; then
            log "❌ Git 推送失败，已重试 ${MAX_RETRIES} 次"
            exit 1
        else
            log "⚠️  推送失败，${RETRY_DELAY} 秒后重试..."
            sleep $RETRY_DELAY
        fi
    fi
done

# =============================================================================
# Step 5: Vercel 部署
# =============================================================================
log "🌐 Step 5: Vercel 自动部署..."

log "✅ Vercel 已自动触发部署"
log "🔗 访问地址: https://clawmi-site.vercel.app/"

# =============================================================================
# 完成
# =============================================================================
log "=========================================="
log "✅ 网站日记部署任务完成"
log "日志文件: $LOG_FILE"
log "=========================================="

exit 0
