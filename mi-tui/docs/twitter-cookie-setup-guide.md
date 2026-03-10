# Twitter Cookie 配置指南

**问题**: `agent-reach configure --from-browser chrome` 失败  
**原因**: Chrome 安装在外置卷 (`/Volumes/My house/`)，cookie 解密需要特殊权限

---

## ✅ 解决方案：使用 Cookie-Editor 手动导出

### Step 1: 安装 Cookie-Editor 插件

1. **打开 Chrome 浏览器**
2. **访问 Chrome 网上应用店**:
   ```
   https://chromewebstore.google.com/detail/cookie-editor/hlkenndednhfkekhgcdicdfddnkalmdm
   ```
3. **点击"添加至 Chrome"**
4. **等待安装完成**

---

### Step 2: 登录 Twitter/X

1. **打开新标签页**
2. **访问**: `https://x.com`
3. **登录你的 Twitter 账号**
4. **确保成功进入首页**

---

### Step 3: 导出 Cookie

1. **点击 Cookie-Editor 插件图标**（在浏览器右上角）
2. **在弹出的窗口中**:
   - 确保当前在 `x.com` 标签页
   - 看到 cookie 列表

3. **点击 "Export" 按钮**（在窗口底部）
4. **选择 "Header String" 格式**
5. **点击复制按钮** 📋

导出的字符串格式类似：
```
auth_token=xxxxxxxxxxxxxxxxxxxx; ct0=yyyyyyyyyyyyyyyy; kdt=zzzz; ...
```

---

### Step 4: 发送 Cookie 给 mi-tui

**把复制的完整字符串发送给 mi-tui**，我会执行：

```bash
agent-reach configure twitter-cookies "你提供的字符串"
```

---

## 🔍 验证配置成功

配置后，我会执行以下命令验证：

```bash
xurl whoami
```

**预期输出**（成功）：
```json
{
  "data": {
    "id": "1234567890",
    "name": "你的名字",
    "username": "your_handle"
  }
}
```

如果仍返回 `401 Unauthorized`，请重新导出 cookie 并确保：
1. 包含 `auth_token` 和 `ct0` 两个关键 cookie
2. 复制完整的字符串（不要截断）
3. Twitter 账号已登录

---

## 📝 注意事项

1. **Cookie 有效期**: 通常 30 天，过期后需要重新导出
2. **账号安全**: 建议使用专用小号运营，避免主号风险
3. **保密**: Cookie 包含登录凭证，不要分享给他人

---

## 🆘 故障排查

### 问题 1: Cookie-Editor 找不到 x.com 的 cookie

**解决**:
1. 确保已登录 Twitter
2. 在 Twitter 页面点击 Cookie-Editor
3. 如果仍为空，刷新页面后重试

### 问题 2: 导出的字符串太短

**正常长度**: 至少包含 5-10 个 cookie 键值对  
**如果只有 1-2 个**: 可能只复制了部分，重新点击 Export → Header String

### 问题 3: 配置后 xurl whoami 仍返回 401

**解决**:
1. 检查导出的字符串是否包含 `auth_token`
2. 重新登录 Twitter 后再次导出
3. 尝试退出账号后重新登录

---

*指南版本：V1.0*  
*更新时间：2026-03-10 01:25 GMT+8*
