# Twitter App 权限配置完整指南

**更新时间**: 2026-03-10 02:05 GMT+8

---

## 🎯 目标

升级 Twitter App 权限，实现自动发帖功能

---

## 📋 配置步骤

### Step 1: 访问 Twitter Developer Portal

打开：https://developer.twitter.com

登录你的 Twitter 账号

---

### Step 2: 进入 App 设置

1. 点击你的 **Project**
2. 点击 **App**（在 Project 下）
3. 点击 **Settings** 或 **App settings**

---

### Step 3: 配置 App permissions

**App permissions (required)**

选择：**Read and write** ✅

```
┌─────────────────────────────────────────┐
│ ○ Read                                  │
│   Read Posts and profile information    │
├─────────────────────────────────────────┤
│ ● Read and write                        │ ← 选这个
│   Read and Post Posts and profile info  │
├─────────────────────────────────────────┤
│ ○ Read and write and Direct message     │
│   Read Posts and profile information,   │
│   read and post Direct messages         │
└─────────────────────────────────────────┘
```

**Request email from users**: 关闭（不需要）

---

### Step 4: 配置 Type of App

**Type of App (required)**

选择：**Web App, Automated App or Bot** ✅

```
┌─────────────────────────────────────────┐
│ ○ Native App                            │
│   Public client                         │
├─────────────────────────────────────────┤
│ ● Web App, Automated App or Bot         │ ← 选这个
│   Confidential client                   │
└─────────────────────────────────────────┘
```

---

### Step 5: 填写 App info

**Callback URI / Redirect URL (required)**

填写：`https://localhost/callback`

**Website URL (required)**

填写：`https://localhost`

**Organization name (optional)**

填写：你的用户名 或 留空

```
┌─────────────────────────────────────────┐
│ Callback URI / Redirect URL:            │
│ https://localhost/callback              │
├─────────────────────────────────────────┤
│ Website URL:                            │
│ https://localhost                       │
├─────────────────────────────────────────┤
│ Organization name:                      │
│ [你的名字]                              │
└─────────────────────────────────────────┘
```

---

### Step 6: 保存设置

点击 **Save** 或 **Update** 按钮

---

### Step 7: 重新生成 Access Token

1. 在 App 页面找到 **Keys and tokens** 标签
2. 找到 **Access token and secret**
3. 点击 **Regenerate** 按钮
4. 复制新生成的 4 个密钥：
   - **API Key** (Consumer Key)
   - **API Key Secret** (Consumer Secret)
   - **Access Token**
   - **Access Token Secret**

**⚠️ 重要**: Access Token Secret 只显示一次，务必立即复制保存！

---

### Step 8: 重新配置 xurl

```bash
xurl auth oauth1 \
  --consumer-key "你的 API Key" \
  --consumer-secret "你的 API Key Secret" \
  --access-token "你的 Access Token" \
  --token-secret "你的 Access Token Secret"
```

---

### Step 9: 验证配置

```bash
# 检查认证状态
xurl auth status
# 应显示：oauth1: ✓

# 验证用户信息
xurl whoami
# 应返回你的用户信息

# 测试发帖
xurl post "权限升级成功！现在可以自动发帖了 🎉"
# 应成功发布
```

---

## 🔍 常见问题

### Q1: 找不到 Regenerate 按钮？

**A**: 有些 App 需要先保存权限设置才能重新生成 Token。确保：
1. 已保存权限设置
2. 刷新页面
3. 在 Keys and tokens 标签下查找

### Q2: 发帖仍返回 403 错误？

**A**: 可能原因：
1. 权限设置未生效 - 等待 5-10 分钟
2. 需要重新生成 Token - 执行 Step 7
3. 需要重新配置 - 执行 Step 8

### Q3: Callback URL 必须填真实的吗？

**A**: 不需要。对于命令行工具，使用 `https://localhost/callback` 即可。

---

## 📊 配置检查清单

- [ ] App permissions 设置为 **Read and write**
- [ ] Type of App 设置为 **Web App, Automated App or Bot**
- [ ] Callback URI 填写 `https://localhost/callback`
- [ ] Website URL 填写 `https://localhost`
- [ ] 保存设置
- [ ] 重新生成 Access Token
- [ ] 复制 4 个密钥并保存
- [ ] 执行 `xurl auth oauth1` 重新配置
- [ ] 执行 `xurl whoami` 验证
- [ ] 执行 `xurl post "测试"` 测试发帖

---

## 🎉 完成后效果

配置成功后，你可以：

```bash
# ✅ 发布文字推文
xurl post "推文内容"

# ✅ 发布带图片的推文
xurl post "推文内容" --media /path/to/image.jpg

# ✅ 回复推文
xurl reply 1234567890 "回复内容"

# ✅ 点赞
xurl like 1234567890

# ✅ 转发
xurl repost 1234567890

# ✅ 关注用户
xurl follow @username
```

---

*指南版本：V1.0*  
*创建时间：2026-03-10 02:05 GMT+8*
