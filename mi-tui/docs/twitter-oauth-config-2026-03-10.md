# Twitter API 认证配置报告 V2.0

**配置时间**: 2026-03-10 01:56 GMT+8  
**状态**: ⚠️ 部分认证（只读可用，发帖需 OAuth 1.0a）

---

## ✅ 当前认证状态

### Bearer Token (OAuth 2.0 App-Only) ✅
**状态**: 已配置  
**权限**: **只读**（搜索、读取推文）  
**限制**: 不能发帖、回复、点赞、转发

**可用命令**:
```bash
# ✅ 搜索推文
xreach search "AI Agent" -n 20 --json

# ✅ 获取用户资料
xreach user @mi_tui

# ✅ 读取推文详情
xreach tweet 1234567890

# ✅ 获取用户推文
xreach tweets @username -n 20
```

**已验证功能**:
- ✅ 搜索热点话题
- ✅ 竞品账号分析
- ✅ 爆款推文分析
- ✅ 数据监控和收集

---

## ❌ 发帖功能限制

### 当前尝试（失败）
```bash
xurl post "推文内容"
# 返回：403 Forbidden - Unsupported Authentication
# 原因：Bearer Token 只能读取，不能发帖
```

### 发帖需要的认证

**OAuth 1.0a User Context** - 需要 4 个参数：
1. **Consumer Key** (API Key)
2. **Consumer Secret** (API Secret)
3. **Access Token** (用户访问令牌)
4. **Token Secret** (用户令牌密钥)

---

## 🔑 获取完整 OAuth 1.0a 认证的方法

### 方案 A：Twitter Developer Portal（官方）

1. **访问**: https://developer.twitter.com
2. **登录**你的 Twitter 账号
3. **创建 Project**:
   - 点击 "Create a project"
   - 填写用途说明（AI 运营、内容自动化等）
4. **创建 App**:
   - 在 Project 下创建 App
   - 获取 Keys and tokens
5. **获取 4 个密钥**:
   - API Key (Consumer Key)
   - API Key Secret (Consumer Secret)
   - Access Token
   - Access Token Secret

**配置命令**:
```bash
xurl auth oauth1 \
  --consumer-key "你的 Consumer Key" \
  --consumer-secret "你的 Consumer Secret" \
  --access-token "你的 Access Token" \
  --token-secret "你的 Token Secret"
```

**审核时间**: 通常 1-3 天  
**费用**: 免费（有调用限制）

### 方案 B：使用 Cookie 发帖（无需 API）

使用 browser 工具模拟网页操作：
- 优点：无需 API 审核
- 缺点：速度较慢，不适合批量

### 方案 C：手动发帖（当前推荐）

- 使用 xreach 做情报监控和数据分析
- 通过 Twitter 网页版手动发布
- 等 API 审核通过后再自动化

---

## 📊 当前能力评估

| 功能 | 认证类型 | 状态 | 说明 |
|------|---------|------|------|
| **搜索推文** | Bearer Token | ✅ 可用 | 热点监控 |
| **读取推文** | Bearer Token | ✅ 可用 | 单条/Thread |
| **用户资料** | Bearer Token | ✅ 可用 | 粉丝数等 |
| **用户推文** | Bearer Token | ✅ 可用 | 历史推文 |
| **发布推文** | OAuth 1.0a | ❌ 需配置 | 需要 4 个密钥 |
| **回复推文** | OAuth 1.0a | ❌ 需配置 | 需要 4 个密钥 |
| **点赞** | OAuth 1.0a | ❌ 需配置 | 需要 4 个密钥 |
| **转发** | OAuth 1.0a | ❌ 需配置 | 需要 4 个密钥 |
| **发图片** | OAuth 1.0a + Media | ❌ 需配置 | 需要额外权限 |

---

## 🎯 立即可用的工作流

### 1. 情报监控
```bash
# 搜索 AI Agent 热点
xreach search "AI Agent" -n 20 --json > /tmp/ai_topics.json

# 搜索高互动推文
xreach search "AI min_faves:100" -n 20 --json
```

### 2. 竞品分析
```bash
# 获取竞品资料
xreach user @competitor

# 获取竞品推文
xreach tweets @competitor -n 20
```

### 3. 爆款分析
```bash
# 分析爆款结构
xreach search "AI min_retweets:50" --json | jq '.[] | {text, favoriteCount, retweetCount}'
```

### 4. 内容创作
- 基于搜索结果创作推文
- 分析爆款推文的话术和结构
- **暂时手动发布**到 Twitter 网页版

---

## 📋 下一步行动

### P0（本周）- 使用现有能力开始运营

1. **每日情报收集**:
   ```bash
   xreach search "AI Agent" -n 20 --json
   ```

2. **分析 10-20 条爆款推文**
3. **创作并发布 3-5 条推文**（手动）
4. **记录运营数据**到 `data/platform_daily/`

### P1（1-3 天）- 申请 Twitter API

1. 访问 https://developer.twitter.com
2. 注册开发者账号
3. 创建 Project 和 App
4. 等待审核（通常 1-3 天）
5. 获取 OAuth 1.0a 的 4 个密钥

### P2（审核通过后）- 配置完整认证

```bash
xurl auth oauth1 \
  --consumer-key "xxx" \
  --consumer-secret "xxx" \
  --access-token "xxx" \
  --token-secret "xxx"
```

验证：
```bash
xurl whoami  # 应返回用户信息
xurl post "测试推文"  # 应成功发布
```

---

## 🔐 当前配置的认证

**Bearer Token**: `AAAAAAAAAAAAAAAAAAAAAAiZ8AEAAAAA6wRNffoaM618vzsm28CIn2ZJilQ%3D...`  
**权限**: 只读  
**有效期至**: 永久（除非撤销）

**Cookie**: `~/.agent-reach/twitter-cookies.txt`  
**权限**: 读取（xreach 使用）  
**有效期至**: 约 30 天

---

## 📝 重要提醒

1. **Bearer Token 保密**: 不要公开分享
2. **API 限制**: 免费账号有调用次数限制
3. **合规使用**: 遵守 Twitter Developer Agreement
4. **建议小号**: 运营使用专用小号，避免主号风险

---

*报告生成时间：2026-03-10 01:56 GMT+8*  
*下次检查：申请 Twitter API 后更新*
