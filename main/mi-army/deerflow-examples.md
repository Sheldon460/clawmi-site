# 🦌 DeerFlow 风格子代理编排示例

## 示例 1: 深度研究报告

### 场景
需要生成一份关于"AI Agent 发展趋势"的深度研究报告

### 执行流程

```bash
# Step 1: 主代理 (main) 启动并行研究任务

# 并行派生 3 个研究代理
sessions_spawn --agent=mi-zhi --task="研究 AI Agent 技术发展历程，重点收集 2024-2026 年的关键突破" --mode=run --runtime=subagent

sessions_spawn --agent=mi-zhi --task="研究 AI Agent 市场现状，包括主要玩家、融资情况、市场规模" --mode=run --runtime=subagent

sessions_spawn --agent=mi-zhi --task="研究 AI Agent 未来趋势，包括技术方向、应用场景、挑战与机遇" --mode=run --runtime=subagent

# Step 2: 等待所有研究代理完成并收集结果
# (结果会自动返回给 main)

# Step 3: 派生写作代理整合报告
sessions_spawn --agent=mi-wen --task="基于以下研究结果，撰写一份深度研究报告：
研究1（技术历程）: {result1}
研究2（市场现状）: {result2}
研究3（未来趋势）: {result3}

要求：
1. 报告结构：摘要、背景、现状分析、趋势预测、结论
2. 字数：3000-5000字
3. 包含数据支撑和引用来源
4. 语言风格：专业、客观、有洞察力" --mode=run --runtime=subagent

# Step 4: 派生审核代理检查质量
sessions_spawn --agent=mi-ling --task="审核以下研究报告，检查内容质量、逻辑性和可读性：
{draft_report}

输出：
1. 质量评分（1-10分）
2. 主要优点
3. 需要改进的地方
4. 最终优化建议" --mode=run --runtime=subagent
```

---

## 示例 2: 全栈应用开发

### 场景
开发一个待办事项管理应用

### 执行流程

```bash
# Step 1: 架构设计
sessions_spawn --agent=mi-ma-arch --task="设计一个待办事项管理应用的系统架构：
需求：
- 支持多用户
- 支持任务分类、优先级、截止日期
- 支持提醒功能
- 前端使用 React，后端使用 Node.js
- 数据库使用 PostgreSQL

输出：
1. 系统架构图描述
2. API 设计
3. 数据库 Schema
4. 技术选型说明" --mode=run --runtime=subagent

# Step 2: 并行开发前后端（基于架构设计结果）
sessions_spawn --agent=mi-ma-code --task="实现待办应用后端：
架构设计：{architecture}
要求：
- Express.js + TypeScript
- RESTful API
- JWT 认证
- 完整的 CRUD 操作

输出：
1. 完整的后端代码
2. API 文档
3. 部署说明" --mode=run --runtime=subagent

sessions_spawn --agent=mi-ma-code --task="实现待办应用前端：
架构设计：{architecture}
后端 API：{backend_api}
要求：
- React + TypeScript
- 使用 Tailwind CSS
- 响应式设计
- 状态管理使用 React Query

输出：
1. 完整的前端代码
2. 组件说明
3. 运行指南" --mode=run --runtime=subagent

# Step 3: 代码审查
sessions_spawn --agent=mi-ce --task="审查以下代码的质量：
后端代码：{backend_code}
前端代码：{frontend_code}

检查项：
1. 代码规范性
2. 安全性
3. 性能
4. 可维护性

输出审查报告。" --mode=run --runtime=subagent
```

---

## 示例 3: 内容创作流水线

### 场景
为新产品发布创建完整的营销内容

### 执行流程

```bash
# Step 1: 市场调研（并行）
sessions_spawn --agent=mi-zhi --task="调研目标用户画像：产品={product}" --mode=run --runtime=subagent
sessions_spawn --agent=mi-zhi --task="调研竞品营销策略：产品={product}" --mode=run --runtime=subagent

# Step 2: 内容创作（并行）
sessions_spawn --agent=mi-wen --task="撰写产品介绍文案：
产品={product}
用户画像={user_persona}
要求：吸引人、突出卖点" --mode=run --runtime=subagent

sessions_spawn --agent=mi-hua --task="设计产品宣传海报：
产品={product}
文案={copy}
尺寸：1200x630px（社交媒体）" --mode=run --runtime=subagent

# Step 3: 发布
sessions_spawn --agent=mi-xin --task="发布到公众号：
标题={title}
正文={content}
封面图={cover_image}
按照公众号SOP执行" --mode=run --runtime=subagent
```

---

## 使用技巧

### 1. 任务分解原则
- 每个子任务应该独立且明确
- 避免任务之间的强依赖
- 设置合理的超时时间

### 2. 结果聚合策略
- **并行任务**：使用 `concatenate` 合并结果
- **研究任务**：使用 `summarize` 提炼要点
- **决策任务**：使用 `vote` 多代理投票

### 3. 错误处理
- 设置 fallback 代理
- 记录失败任务
- 支持手动重试

---

## 高级用法

### 动态任务编排
根据中间结果动态决定下一步任务：

```bash
# 先执行探索性研究
sessions_spawn --agent=mi-zhi --task="快速扫描主题：{topic}" --mode=run --runtime=subagent

# 根据结果决定深入研究方向
if [[ $result == *"技术突破"* ]]; then
    sessions_spawn --agent=mi-zhi --task="深入研究技术细节" --mode=run --runtime=subagent
fi

if [[ $result == *"市场机会"* ]]; then
    sessions_spawn --agent=mi-zhi --task="深入研究市场分析" --mode=run --runtime=subagent
fi
```

### 循环迭代
支持任务结果的迭代优化：

```bash
for i in {1..3}; do
    sessions_spawn --agent=mi-wen --task="优化文案（第$i轮）：{current_draft}" --mode=run --runtime=subagent
    # 检查是否满足质量标准
    if [[ $quality_score -ge 8 ]]; then
        break
    fi
done
```
