# 小红书 MCP 技能 (xiaohongshu-mcp)

## 简介

本技能基于 [xpzouying/xiaohongshu-mcp](https://github.com/xpzouying/xiaohongshu-mcp) 项目，为幂书 (mi-book) 提供小红书平台运营能力。

## 安装状态

- **安装路径**: `~/.openclaw/skills/xiaohongshu-mcp/`
- **MCP Server**: `xiaohongshu-mcp-darwin-arm64`
- **登录工具**: `xiaohongshu-login-darwin-arm64`
- **服务地址**: `http://localhost:18060/mcp`
- **Chrome 路径**: `/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`
- **CDP 端口**: `http://127.0.0.1:56684`
- **mcporter 配置**: 已添加至项目配置
- **登录状态**: ✅ 已登录

## 登录流程

### 首次登录

```bash
# 1. 获取登录二维码
mcporter call xiaohongshu-mcp.get_login_qrcode

# 2. 使用小红书 App 扫码登录
# 3. 验证登录状态
mcporter call xiaohongshu-mcp.check_login_status
```

### 退出登录

```bash
mcporter call xiaohongshu-mcp.delete_cookies
```

## 可用工具

| 工具名称 | 功能描述 | 必需参数 |
|---------|---------|---------|
| `check_login_status` | 检查登录状态 | 无 |
| `get_login_qrcode` | 获取登录二维码 | 无 |
| `delete_cookies` | 删除 cookies，退出登录 | 无 |
| `publish_content` | 发布图文内容 | `title`, `content`, `images` |
| `publish_with_video` | 发布视频内容 | `title`, `content`, `video` |
| `list_feeds` | 获取推荐列表 | 无 |
| `search_feeds` | 搜索内容 | `keyword` |
| `get_feed_detail` | 获取笔记详情 | `feed_id`, `xsec_token` |
| `post_comment_to_feed` | 发表评论 | `feed_id`, `xsec_token`, `content` |
| `reply_comment_in_feed` | 回复评论 | `feed_id`, `xsec_token`, `content`, `comment_id`/`user_id` |
| `like_feed` | 点赞/取消点赞 | `feed_id`, `xsec_token` |
| `favorite_feed` | 收藏/取消收藏 | `feed_id`, `xsec_token` |
| `user_profile` | 获取用户主页 | `user_id`, `xsec_token` |

## 使用示例

### 发布图文内容

```bash
mcporter call xiaohongshu-mcp.publish_content \
  --title "春天的第一杯奶茶" \
  --content "今天发现了一家超棒的奶茶店，推荐给大家！" \
  --images '["/path/to/image1.jpg", "/path/to/image2.jpg"]' \
  --tags '["美食", "奶茶", "探店"]'
```

### 搜索内容

```bash
mcporter call xiaohongshu-mcp.search_feeds --keyword "美食"
```

### 获取推荐列表

```bash
mcporter call xiaohongshu-mcp.list_feeds
```

## 注意事项

1. **登录状态**: 大部分功能需要登录后才能使用
2. **图片路径**: 支持本地绝对路径或 HTTP/HTTPS URL，推荐使用本地路径
3. **视频路径**: 仅支持本地视频文件绝对路径
4. **发布时间**: 支持定时发布，ISO8601 格式，范围为 1 小时至 14 天内
5. **可见范围**: 支持 `公开可见`（默认）、`仅自己可见`、`仅互关好友可见`

## 故障排查

- 如果 MCP Server 无法启动，检查端口 18060 是否被占用
- 如果登录失败，尝试删除 cookies 后重新登录
- 如果发布失败，检查图片路径是否正确，图片大小是否过大

## 更新日志

- 2026-03-07: 初始安装，版本 v2026.03.04.0231-db81fd8
