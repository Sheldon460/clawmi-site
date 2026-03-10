# 微信公众号自动发布指南

## 🎉 方案四配置完成！

你已拥有完整的 **Markdown → 排版 → 发布** 自动化流水线。

---

## 📦 已安装的组件

| 组件 | 路径 | 功能 |
|:---|:---|:---|
| `canghe-markdown-to-html` | `~/.openclaw/skills/` | Markdown 转微信 HTML |
| `canghe-post-to-wechat` | `~/.openclaw/skills/` | 发布到微信公众号 |
| 一键发布脚本 | `publish-to-wechat.sh` | 整合上述两个工具 |

---

## 🚀 使用方法

### 方式一：使用一键发布脚本（推荐）

```bash
# 进入项目目录
cd /Volumes/My house/Users/Sheldon/clawd/mi-army/mi-xin

# 发布文章
./publish-to-wechat.sh "04-已发布归档/公众号已发布/2026-03-06-GPT-5.4-vs-Claude-Opus-Agent之王之争.md"
```

**流程：**
1. 自动将 Markdown 转换为微信兼容的 HTML（default 主题）
2. 打开 Chrome 浏览器
3. 首次使用：扫码登录微信公众号
4. 自动发布为草稿

### 方式二：分步手动执行

#### Step 1: Markdown → HTML
```bash
cd ~/.openclaw/skills/canghe-markdown-to-html
bun scripts/main.ts "/path/to/article.md" --theme default
```

**可选主题：**
- `default` - 经典主题（推荐）
- `grace` - 优雅主题
- `simple` - 简洁主题

#### Step 2: HTML → 微信公众号
```bash
cd ~/.openclaw/skills/canghe-post-to-wechat
bun scripts/wechat-article.ts --html "/path/to/article.html"
```

---

## ⚙️ 配置说明

配置文件位置：`mi-xin/.canghe-skills/canghe-post-to-wechat/EXTEND.md`

```yaml
default_theme: default        # 默认主题
default_publish_method: browser  # 发布方式 (browser/api)
need_open_comment: 1          # 是否开启评论 (1=开启, 0=关闭)
only_fans_can_comment: 0      # 仅粉丝可评论 (1=是, 0=否)
```

---

## 📝 首次使用流程

1. **运行发布命令**
   ```bash
   ./publish-to-wechat.sh "你的文章.md"
   ```

2. **扫码登录**
   - 会自动打开 Chrome
   - 显示微信公众号登录二维码
   - 用微信扫码登录

3. **等待发布完成**
   - 脚本会自动操作浏览器
   - 将文章保存为草稿

4. **后台确认发布**
   - 登录 [mp.weixin.qq.com](https://mp.weixin.qq.com)
   - 进入「内容管理」→「草稿箱」
   - 找到文章，预览并正式发布

---

## 🔧 常见问题

### Q: 提示 "Chrome not found"
**解决：** 设置环境变量
```bash
export WECHAT_BROWSER_CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

### Q: 首次登录后还需要每次都扫码吗？
**答：** 不需要。登录会话会保存在 Chrome Profile 中，下次自动使用。

### Q: 如何切换主题？
**答：** 修改脚本中的 `--theme` 参数，可选 `default` / `grace` / `simple`

### Q: 发布后在哪里找到文章？
**答：** 登录公众号后台 → 内容管理 → 草稿箱

### Q: 支持图片吗？
**答：** 支持。Markdown 中的图片链接会自动处理，但需确保图片可访问。

---

## 📋 完整工作流示例

```bash
# 1. 写完文章，保存到初稿打磨区
# 2. 一键发布
./publish-to-wechat.sh "03-内容工厂/2-初稿打磨区/新文章.md"

# 3. 去后台确认发布
# 打开 https://mp.weixin.qq.com → 草稿箱 → 预览 → 群发
```

---

*配置完成时间：2026-03-06*