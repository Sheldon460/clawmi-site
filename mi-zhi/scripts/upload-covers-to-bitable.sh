#!/bin/bash
# AI热点情报封面图自动上传脚本
# 将生成的封面图上传到飞书多维表格

set -e

# 配置
APP_TOKEN="EVxlb7yTHaw9GjsyPgncypMTnec"
TABLE_ID="tbl6yIyjpyZfTHzK"
COVERS_DIR="/Volumes/My house/Users/Sheldon/clawd/mi-army/mi-hua/output/covers"

# 封面图与分类对应关系
declare -A COVER_MAP=(
  ["cover_01_controversy.png"]=":争议监管"
  ["cover_02_breakthrough.png"]=":技术突破"
  ["cover_03_product.png"]=":产品发布"
  ["cover_04_enterprise.png"]=":企业动态"
  ["cover_05_investment.png"]=":投融资"
)

echo "🎨 AI热点情报封面图上传工具"
echo "=============================="
echo ""

# 检查封面图是否存在
check_covers() {
  echo "📁 检查封面图文件..."
  local found=0
  local missing=0
  
  for cover in "${!COVER_MAP[@]}"; do
    if [ -f "$COVERS_DIR/$cover" ]; then
      echo "  ✅ $cover (${COVER_MAP[$cover]})"
      ((found++))
    else
      echo "  ❌ $cover 缺失"
      ((missing++))
    fi
  done
  
  echo ""
  echo "📊 统计: 找到 $found 张, 缺失 $missing 张"
  echo ""
  
  if [ $missing -gt 0 ]; then
    echo "⚠️ 请先运行封面图生成脚本"
    exit 1
  fi
}

# 上传到飞书多维表格
upload_to_bitable() {
  echo "📤 上传到飞书多维表格..."
  echo ""
  echo "⚠️ 注意: 飞书附件上传需要以下步骤:"
  echo ""
  echo "方式1 - 手动上传:"
  echo "  1. 打开飞书表格: https://my.feishu.cn/base/$APP_TOKEN"
  echo "  2. 切换到'📰 热点新闻画册'视图"
  echo "  3. 点击每条记录的'封面图'字段"
  echo "  4. 选择对应的封面图上传"
  echo ""
  echo "方式2 - 使用飞书开放平台API:"
  echo "  需要先调用素材上传接口获取file_token"
  echo "  然后更新记录的附件字段"
  echo ""
  echo "方式3 - 使用OpenClaw的飞书插件:"
  echo "  等待后续版本支持自动附件上传"
  echo ""
  
  # 显示对应关系
  echo "📋 封面图与新闻分类对应关系:"
  echo ""
  for cover in "${!COVER_MAP[@]}"; do
    echo "  $cover → ${COVER_MAP[$cover]}"
  done
}

# 生成上传指南
generate_guide() {
  local guide_file="/tmp/upload_guide.md"
  
  cat > "$guide_file" << EOF
# AI热点情报封面图上传指南

## 📁 封面图位置
\`$COVERS_DIR\`

## 🎨 封面图列表

| 文件名 | 分类 | 用途 |
|--------|------|------|
| cover_01_controversy.png | 🔴 争议监管 | 监管争议、法律诉讼类新闻 |
| cover_02_breakthrough.png | 🟣 技术突破 | 技术创新、研究突破类新闻 |
| cover_03_product.png | 🔵 产品发布 | 新产品、功能发布类新闻 |
| cover_04_enterprise.png | ⚪ 企业动态 | 企业合作、人事变动类新闻 |
| cover_05_investment.png | 🟡 投融资 | 融资、并购、财报类新闻 |

## 📤 上传步骤

### 方式1: 飞书网页端手动上传 (推荐)

1. 打开飞书多维表格
   - 链接: https://my.feishu.cn/base/$APP_TOKEN
   - 表格: 🔥 AI热点资讯周报 2026-03-08

2. 切换到画册视图
   - 点击左上角视图切换
   - 选择 "📰 热点新闻画册"

3. 上传封面图
   - 找到对应分类的新闻记录
   - 点击 "封面图" 字段
   - 拖拽或选择对应的封面图文件

### 方式2: 批量上传 (待开发)

等待OpenClaw飞书插件支持自动附件上传功能

## ✅ 验证

上传完成后，在画册视图中应该能看到:
- 每张卡片显示对应的封面图
- 标题和摘要正常显示
- 分类标签和热度评分可见

## 🎯 效果预览

上传后的画册视图将显示为:

\`\`\`
┌─────────────────────┐
│   [封面图 16:9]     │
│                     │
├─────────────────────┤
│ 📰 新闻标题         │
│ 📝 内容摘要...      │
│ ⚔️ 争议监管 🔥9.1   │
└─────────────────────┘
\`\`\`

---
生成时间: $(date)
EOF

  echo "📄 上传指南已生成: $guide_file"
  cat "$guide_file"
}

# 主函数
main() {
  check_covers
  upload_to_bitable
  generate_guide
  
  echo ""
  echo "✅ 封面图上传准备完成!"
  echo ""
  echo "💡 提示: 由于飞书API限制，当前版本需要手动上传封面图"
  echo "   后续将支持全自动上传"
}

# 执行
main
