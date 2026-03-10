# TOOLS.md - 幂家军 COO 工具速查表

## 飞书工具集（用户身份 OAuth）

### 文档管理
| 工具 | 用途 | 关键参数 |
|------|------|---------|
| `feishu_create_doc` | 创建云文档 | `title`, `markdown`, `folder_token`/`wiki_space` |
| `feishu_update_doc` | 更新云文档 | `mode`（7 种）, `selection_with_ellipsis`/`selection_by_title` |
| `feishu_fetch_doc` | 读取文档内容 | `doc_id`, `offset`, `limit` |
| `feishu_doc_comments` | 管理评论 | `action`（list/create/patch）, `elements` |
| `feishu_doc_media` | 插入/下载媒体 | `action`（insert/download）, `file_path` |
| **`skill-feishu-docx-powerwrite`** | **专业文档创作** | **本地 Markdown → 飞书文档** |

### 多维表格（Bitable）
| 工具 | 用途 | 关键约束 |
|------|------|---------|
| `feishu_bitable_app` | 创建/管理 App | `action`（create/list/get/patch/delete/copy） |
| `feishu_bitable_app_table` | 创建/管理数据表 | 支持 `fields` 一次性定义字段 |
| `feishu_bitable_app_table_field` | 管理字段 | 先 list 获取 type/ui_type |
| `feishu_bitable_app_table_record` | 管理记录 | 批量≤500 条，人员字段 `[{id:"ou_xxx"}]` |
| `feishu_bitable_app_table_view` | 管理视图 | `view_type`（grid/kanban/gallery/gantt/form） |

**⚠️ 易错点**：
- 日期字段：毫秒时间戳（`1674206443000`）
- 人员字段：`[{id: "ou_xxx"}]`（数组对象）
- 单选字段：字符串 `"选项名"`（不是数组）
- 多选字段：字符串数组 `["选项 1", "选项 2"]`
- 超链接字段：`{link: "...", text: "..."}`（对象）
- 附件字段：必须先上传到当前表格

### 电子表格（Sheets）
| 工具 | 用途 |
|------|------|
| `feishu_sheet` | 创建/读写/导出电子表格 |

**Actions**: `info`, `read`, `write`, `append`, `find`, `create`, `export`

### 日历与日程
| 工具 | 用途 | 必填参数 |
|------|------|---------|
| `feishu_calendar_calendar` | 管理日历 | `action`（list/get/primary） |
| `feishu_calendar_event` | 管理日程 | `action`, `summary`, `start_time`, `end_time` |
| `feishu_calendar_event_attendee` | 管理参会人 | `calendar_id`, `event_id`, `attendees` |
| `feishu_calendar_freebusy` | 查询忙闲 | `time_min`, `time_max`, `user_ids[]` |

**⚠️ 关键约束**：
- 时间格式：ISO 8601（`2026-02-25T14:00:00+08:00`）
- `create` 时强烈建议传 `user_open_id`（SenderId）
- 参会人类型：`user`（ou_xxx）, `chat`（oc_xxx）, `resource`（omm_xxx）, `third_party`（邮箱）
- 会议室预约是异步流程

### 任务管理
| 工具 | 用途 | 关键参数 |
|------|------|---------|
| `feishu_task_task` | 创建/查询/更新任务 | `action`, `summary`, `current_user_id` |
| `feishu_task_tasklist` | 管理任务清单 | `action`, `name`, `members` |
| `feishu_task_subtask` | 管理子任务 | `action`, `task_guid`, `summary` |
| `feishu_task_comment` | 管理任务评论 | `action`, `task_guid`, `content` |

**⚠️ 关键约束**：
- `current_user_id` 强烈建议（工具会自动添加为 follower）
- 完成任务：`completed_at = "2026-02-26 15:00:00"`
- 反完成：`completed_at = "0"`
- 时间格式：ISO 8601（带时区）

### IM 消息读取
| 工具 | 用途 | 关键参数 |
|------|------|---------|
| `feishu_im_user_get_messages` | 获取历史消息 | `chat_id` 或 `open_id`（二选一） |
| `feishu_im_user_get_thread_messages` | 获取话题回复 | `thread_id`（omt_xxx） |
| `feishu_im_user_search_messages` | 跨会话搜索 | 至少一个过滤条件 |
| `feishu_im_user_fetch_resource` | 下载图片/文件 | `message_id`, `file_key`, `type` |

**⚠️ 关键约束**：
- `open_id` 和 `chat_id` 互斥
- `relative_time` 和 `start_time/end_time` 互斥
- 话题消息不支持时间过滤
- 文件大小限制 100MB

### 云空间文件
| 工具 | 用途 |
|------|------|
| `feishu_drive_file` | 上传/下载/管理云空间文件 |

**Actions**: `list`, `get_meta`, `copy`, `move`, `delete`, `upload`, `download`

### 知识库（Wiki）
| 工具 | 用途 |
|------|------|
| `feishu_wiki_space` | 管理知识空间 |
| `feishu_wiki_space_node` | 管理知识库节点 |

### 搜索
| 工具 | 用途 |
|------|------|
| `feishu_search_doc_wiki` | 搜索文档和 Wiki |
| `feishu_search_user` | 搜索员工信息 |

### 用户与群组
| 工具 | 用途 |
|------|------|
| `feishu_get_user` | 获取用户信息 |
| `feishu_chat` | 搜索/获取群组信息 |
| `feishu_chat_members` | 获取群组成员 |

---

## 核心执行工具

| 工具 | 用途 | 关键参数 |
|------|------|---------|
| `read` / `write` / `edit` | 文件操作 | `path`, `content` |
| `exec` / `process` | Shell 命令 | `command`, `yieldMs`, `pty` |
| `sessions_send` | 跨 Agent 通讯 | `sessionKey`/`label`, `message` |
| `sessions_spawn` | 派生子 Agent | `task`, `runtime`（subagent/acp）, `mode` |
| `subagents` | 管理子 Agent | `action`（list/kill/steer） |
| `session_status` | 查看用量/成本 | `sessionKey`, `model` |
| `web_search` | 网络搜索 | `query`, `count`, `freshness` |
| `web_fetch` | 网页内容提取 | `url`, `extractMode` |
| `browser` | 浏览器自动化 | `action`, `url`, `request` |

---

## 常用错误码速查

### 多维表格
| 错误码 | 原因 | 解决方案 |
|--------|------|---------|
| 1254064 | DatetimeFieldConvFail | 日期必须用毫秒时间戳 |
| 1254068 | URLFieldConvFail | 超链接必须用对象 `{text, link}` |
| 1254066 | UserFieldConvFail | 人员字段格式错误或 ID 类型不匹配 |
| 1254015 | Field types do not match | 字段值格式与类型不匹配 |
| 1254104 | RecordAddOnceExceedLimit | 批量创建超过 500 条 |
| 1254291 | Write conflict | 并发写冲突（串行 + 延迟） |

---

## 最佳实践

### 1. 文档更新
- 优先使用 `replace_range`/`append`/`insert_before`/`insert_after`
- 慎用 `overwrite`（会清空文档重写）
- 定位范围越小越安全

### 2. 多维表格
- 写记录前先 list 字段获取 type/ui_type
- 批量操作前删除默认表的空行
- 同一数据表串行调用 + 延迟 0.5-1 秒

### 3. 任务管理
- 创建任务时始终传 `current_user_id`
- 使用 `completed_at="0"` 反完成任务

### 4. 日历管理
- `create` 时传 `user_open_id`（SenderId）
- 会议室预约是异步流程，需后续查询状态

### 5. 消息读取
- 发现 `thread_id` 时主动展开话题
- 根据用户意图推断合适的 `relative_time`
- `has_more=true` 时用 `page_token` 翻页

---

## 短视频运营工具集 (mi-pai)

### 视频处理
| 工具 | 用途 | 命令示例 |
|------|------|---------|
| `ffmpeg` | 视频剪辑/转码/提取 | `ffmpeg -i input.mp4 -ss 00:30 -t 00:15 output.mp4` |
| `video-frames` | 视频帧提取 | OpenClaw 内置技能 |

### 图像生成
| 工具 | 用途 | 关键参数 |
|------|------|---------|
| `nano-banana-pro` | AI 图像生成 | `prompt`, `style`, `type` |
| `nano-banana-pro-prompts-recommend-skill` | 提示词推荐 | `use_case`, `style` |
| `baoyu-article-illustrator` | 文章配图 | `article`, `positions` |

### 平台运营
| 平台 | 工具 | 状态 |
|------|------|------|
| 小红书 | `xiaohongshu` / `xiaohongshu-ops` | ✅ 已恢复 |
| 抖音 | 待安装 (browser 自动化替代) | 🔄 待补充 |
| 视频号 | 待安装 (browser 自动化替代) | 🔄 待补充 |
| TikTok | `agent-reach` | ✅ 已恢复 |

### 数据分析
| 工具 | 用途 |
|------|------|
| `feishu_bitable_app_table_record` | 数据记录与分析 |
| `feishu_sheet` | 数据报表导出 |

---

## 最佳实践 (短视频)

### 1. 视频处理
- 使用 `ffmpeg` 提取关键帧作为封面候选
- 生成 GIF 预览用于内容审核
- 压缩视频至 1080p/30fps 平衡质量与体积

### 2. 封面设计
- 调用 `nano-banana-pro` 生成高质量封面
- 文字占比≤30% 避免限流
- 保持统一视觉风格

### 3. 数据记录
- 发布后 1h/6h/24h/7d 记录关键指标
- 使用飞书多维表格建立数据看板
- 每周复盘优化策略

### 4. 跨平台分发
- 优先抖音/视频号 (国内流量)
- 同步小红书 (种草转化)
- 海外分发 TikTok/YouTube

---

*最后更新：2026-03-10*
*技能恢复 SOP V1.0 执行完成*
*mi-pai 技能体系 V1.0 已建立*
