# canghe-post-to-wechat 问题修复记录

**日期**: 2026-03-09 23:45
**问题**: 发布脚本只复制标题，正文粘贴和保存草稿失败

---

## 🔍 问题分析

### 症状
1. 标题正确填写
2. 作者正确填写
3. 日志显示"Body content verified OK"
4. 日志显示"Saving as draft..."
5. 日志显示"Done"
6. **但实际公众号后台没有正文，也没有保存草稿**

### 根因

#### 1. 保存逻辑缺陷 (wechat-article.ts:647-656)

```javascript
console.log('[wechat] Saving as draft...');
await evaluate(session, `document.querySelector('#js_submit button').click()`);
await sleep(3000);

const saved = await evaluate<boolean>(session, `!!document.querySelector('.weui-desktop-toast')`);
if (saved) {
  console.log('[wechat] Draft saved successfully!');
} else {
  console.log('[wechat] Waiting for save confirmation...');
  await sleep(5000);  // ❌ 只是等待，没有重试或报错
}
```

**问题**：
- 保存按钮 selector `#js_submit button` 可能不正确
- 保存成功检测依赖 `.weui-desktop-toast` 元素，但该元素可能不出现
- 检测失败时只是多等 5 秒，没有重试机制

#### 2. 粘贴后等待时间不足 (wechat-article.ts:557)

```javascript
await pasteFromClipboardInEditor(session);
await sleep(3000);  // ⚠️ 对于大 HTML 文件可能不够
```

#### 3. pasteInEditor vs sendPaste 混用

- `pasteInEditor` (line 103): 使用 CDP 发送键盘事件
- `sendPaste` (line 109): 使用 `osascript` 系统级粘贴

**问题**：`pasteInEditor` 在 macOS 上可能不可靠，应该统一使用 `sendPaste`

---

## 🔧 修复方案

### 方案 1：修复 wechat-article.ts（推荐）

修改保存逻辑，添加重试和更可靠的 selector：

```javascript
// 修复保存逻辑
console.log('[wechat] Saving as draft...');

// 尝试多种保存按钮 selector
const saveSelectors = [
  '#js_submit button',
  '.weui-desktop-btn_primary',
  'button[type="button"]',
];

let saved = false;
for (const selector of saveSelectors) {
  try {
    await evaluate(session, `
      (function() {
        const btn = document.querySelector('${selector}');
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      })()
    `);
    await sleep(2000);
    
    // 检查是否出现保存成功提示或草稿箱页面
    const saveSuccess = await evaluate<boolean>(session, `
      !!document.querySelector('.weui-desktop-toast') ||
      !!document.querySelector('.save_success') ||
      window.location.href.includes('draft')
    `);
    
    if (saveSuccess) {
      console.log('[wechat] Draft saved successfully!');
      saved = true;
      break;
    }
  } catch (err) {
    console.warn(`[wechat] Save attempt with selector "${selector}" failed:`, err.message);
  }
}

if (!saved) {
  console.error('[wechat] Failed to save draft after all attempts.');
  console.error('[wechat] Please save manually in the browser.');
  // 不要直接退出，保持浏览器打开让用户手动保存
}
```

### 方案 2：使用浏览器自动化库

考虑使用 Playwright 或 Puppeteer 替代原生 CDP，提供更可靠的自动化。

### 方案 3：半自动化流程（临时方案）

1. 脚本负责：转换 HTML + 打开编辑器 + 填写标题作者 + 复制内容
2. 人工负责：粘贴内容 + 点击保存

---

## 📝 临时解决方案

创建简化版发布脚本 `publish-to-wechat-simple.sh`：

```bash
#!/bin/bash
# 只负责转换 HTML，粘贴和保存由人工完成
```

---

## ✅ 验证步骤

1. 手动测试保存按钮 selector
2. 测试保存成功提示元素
3. 增加等待时间到 10 秒
4. 添加保存失败时的错误提示

---

*记录者：mi-xin*
*时间：2026-03-09 23:45*
