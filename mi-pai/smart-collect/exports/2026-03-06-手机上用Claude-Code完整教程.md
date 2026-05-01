# 手机上用 Claude Code 完整教程（小白版）

## 元信息
- **来源**: 飞书PDF文档
- **抓取日期**: 2026-03-06
- **适用人群**: 有云服务器/VPS，想在手机上随时用 Claude Code 的人
- **难度**: 零基础可跟做，全程约15分钟

---

## 三种方案对比

| 方案 | 适合谁 | 优点 | 缺点 |
|:---|:---|:---|:---|
| **tmux + SSH（推荐）** | 有服务器或常开电脑 | 体验和电脑一模一样，所有配置通用 | 需要简单配置一次 |
| **Happy Coder** | 想开箱即用 | 不用配置，装了就能用 | 多会话不太稳定 |
| **Claude 官方 App** | 只用 GitHub 项目 | 最简单 | 只能跑 GitHub 上的项目，不支持本地/服务器项目 |

> 本教程讲的是**方案一：tmux + SSH**，配一次，终身受用。

---

## 你需要准备什么

在开始之前，确认你有以下东西：

1. ✅ 一台云服务器（或家里常开的电脑），上面已经能跑 Claude Code
2. ✅ 一部手机（iPhone 或安卓都行）
3. ✅ 知道你服务器的 IP 地址、用户名、密码（或 SSH 密钥）

---

## 第一步：服务器上装 tmux

### 1.1 检查是否已经装过

用电脑 SSH 登录你的服务器，输入：

```bash
tmux -V
```

- 如果显示类似 `tmux 3.x` → 已经装好了，跳到第二步
- 如果提示 `command not found` → 继续下面的安装

### 1.2 安装 tmux

```bash
# Ubuntu / Debian 系统
apt update && apt install tmux -y

# CentOS / RHEL 系统
yum install tmux -y
```

### 1.3 验证安装成功

```bash
tmux -V
```

看到版本号就说明装好了。

---

## 第二步：在 tmux 里启动 Claude Code

### 2.1 创建一个 tmux 会话

```bash
tmux new -s claude
```

这会创建一个叫 `claude` 的会话，你现在已经"进入"了这个会话里面。

### 2.2 启动 Claude Code

在 tmux 会话里，正常启动：

```bash
claude
```

你会看到熟悉的 Claude Code 界面。

### 2.3 学会"脱离"会话（很重要）

按下这两步：

1. 先按 `Ctrl + b`（同时按住 Ctrl 和 b，然后松开）
2. 再按 `d`

屏幕会回到普通终端，显示类似 `[detached (from session claude)]`。这时候 Claude Code 还在后台跑着，没有关掉。**这就是 tmux 的魔法。**

### 2.4 想回去看看？

重新连上就又回到 Claude Code 的界面了：

```bash
tmux attach -t claude
```

---

## 第三步：优化手机体验（做一次就行）

在服务器上执行以下命令，让 tmux 支持手机触摸滚动：

```bash
cat >> ~/.tmux.conf << 'EOF'
# 开启鼠标/触摸滚动（手机上可以用手指滑动翻页）
set -g mouse on
# 更快响应，减少延迟
set -sg escape-time 0
EOF
```

然后让配置生效：

```bash
tmux source-file ~/.tmux.conf
```

---

## 第四步：手机装 SSH 客户端

### 4.1 下载 Termius

**Termius** 是最好用的手机 SSH 客户端，界面友好，免费版完全够用。

- **iPhone**: App Store 搜索 Termius，免费下载
- **安卓**: Google Play 或应用商店搜索 Termius，免费下载

### 4.2 新建连接

打开 Termius，点击 `+` 新建一个 Host：

| 填写项 | 填什么 | 举例 |
|:---|:---|:---|
| Hostname | 你服务器的 IP 地址 | 123.45.67.89 |
| Port | SSH 端口（默认22） | 22 |
| Username | 你的登录用户名 | root |
| Password | 你的登录密码 | 你的密码 |

如果你用 SSH 密钥登录，在 Termius 的 Keychain 里导入你的私钥文件。

### 4.3 保存并连接

点保存，然后点这个连接，看到终端界面就说明连上了。

---

## 第五步：手机上接管 Claude Code

连上服务器后，在手机终端里输入：

```bash
tmux attach -t claude
```

**搞定！** 你现在在手机上看到的，就是服务器上正在跑的 Claude Code。

你可以：
- ✅ 直接打字给它发指令
- ✅ 用手指上下滑动看历史记录
- ✅ 所有 skills、commands、配置和服务器上完全一样

---

## 日常使用速查表

| 操作 | 命令 |
|:---|:---|
| 查看 tmux 版本 | `tmux -V` |
| 创建新会话 | `tmux new -s <会话名>` |
| 脱离当前会话 | `Ctrl + b`，然后按 `d` |
| 重新连接会话 | `tmux attach -t <会话名>` |
| 列出所有会话 | `tmux ls` |
| 删除会话 | `tmux kill-session -t <会话名>` |

---

## 常见问题

### Q: 为什么推荐 tmux + SSH 而不是其他方案？

A: 因为这种方式最稳定，配置一次之后，无论你用什么设备（手机、平板、另一台电脑）都能获得完全一致的 Claude Code 体验。而且即使网络断开，Claude Code 依然在服务器上运行，不会中断。

### Q: Happy Coder 是什么？

A: Happy Coder 是一个第三方服务，可以让你快速部署 Claude Code 而不用自己配置服务器。但它对多会话的支持不太好，如果你需要同时跑多个任务可能会遇到问题。

### Q: Claude 官方 App 有什么限制？

A: 官方 App 只能连接 GitHub 上的项目，无法访问你自己的服务器或本地文件。适合轻度使用，不适合深度工作。

---

## 进阶技巧

### 同时运行多个 Claude Code 会话

```bash
# 创建第二个会话
tmux new -s coding

# 在另一个窗口创建第三个会话
tmux new -s writing

# 列出所有会话
tmux ls

# 切换到指定会话
tmux attach -t coding
```

### 会话自动恢复

如果你经常掉线，可以配置 tmux 自动保存和恢复会话状态：

```bash
# 安装 tpm (Tmux Plugin Manager)
git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm

# 在 ~/.tmux.conf 中添加：
set -g @plugin 'tmux-plugins/tmux-resurrect'
set -g @plugin 'tmux-plugins/tmux-continuum'
set -g @continuum-restore 'on'

# 重载配置后按 prefix + I 安装插件
```

---

*本文档由 mi-wen 从PDF提取并整理*
*原始来源：飞书文档*