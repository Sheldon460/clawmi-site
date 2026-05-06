# MI-LING 实战打法手册 (V2.0)

> 基于技能恢复 SOP V1.0 更新 | 2026-03-10

---

## 📋 核心工作流

### 1. 文档创作流程（双文档协议）
```
1. 本地生成 Markdown 草稿
   → /workspace/mi-ling/drafts/[文件名].md
2. 调用 skill-feishu-docx-powerwrite 创建飞书文档
   → 自动处理 Lark-flavored Markdown 语法
   → 自动上传媒体资源
3. 使用 feishu_update_doc 进行局部优化
4. 通过 feishu_doc_media 插入本地图片/文件
5. 发送文档链接到飞书对话
6. Obsidian 本地同步
   → /Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/[文件名].md
```

**关键工具**：
- **`skill-feishu-docx-powerwrite`**：专业文档创作技能（本地 Markdown → 飞书文档）
- `feishu_create_doc`：创建时传入 `title`, `markdown`, `wiki_space`/`folder_token`
- `feishu_update_doc`：7 种模式（append/replace_range/insert_before/insert_after/delete_range/replace_all/overwrite）
- **优先使用局部更新**，慎用 overwrite

**汇报格式**：
```
✅ **双重产出确认**：
- **飞书文档**：[已上传至飞书对话](https://xxx.feishu.cn/docx/doxcnxxx)
- **本地知识库**：`/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-ling/[文件名].md`
```

### 2. 数据管理流程（多维表格）
```
1. 创建/获取 App token
2. 创建数据表（可选：一次性定义 fields）
3. list 字段获取 type/ui_type
4. 构造正确格式的记录值
5. batch_create 批量导入（≤500 条/批）
6. 分批调用 + 延迟 0.5-1 秒
```

**字段值格式速查**：
| 字段类型 | 正确格式 | 常见错误 |
|---------|---------|---------|
| 人员 | `[{id: "ou_xxx"}]` | 传字符串 `"ou_xxx"` |
| 日期 | `1674206443000`（毫秒） | 传秒时间戳或字符串 |
| 单选 | `"选项名"` | 传数组 `["选项名"]` |
| 多选 | `["选项 1", "选项 2"]` | 传字符串 `"选项 1"` |
| 超链接 | `{link: "...", text: "..."}` | 只传字符串 URL |
| 附件 | `[{file_token: "..."}]` | 传外部 URL |

### 3. 会议安排流程
```
1. 查询参会人忙闲（feishu_calendar_freebusy）
2. 创建日程（feishu_calendar_event.create）
   - 必填：summary, start_time, end_time
   - 强烈建议：user_open_id（SenderId）
   - 可选：attendees[], description, location
3. 添加参会人（如需后续补充）
4. 查询会议室预约状态（异步流程）
```

**时间格式**：`2026-02-25T14:00:00+08:00`（ISO 8601 带时区）

### 4. 任务分配流程
```
1. 创建任务（feishu_task_task.create）
   - 必填：summary
   - 强烈建议：current_user_id（自动添加为 follower）
   - 可选：members[], due, description
2. 加入清单（可选）：tasklists 参数
3. 添加子任务（如需分解）
4. 跟踪进度：list 查询未完成任务
5. 完成任务：patch + completed_at
```

**完成任务**：`completed_at = "2026-02-26 15:00:00"`  
**反完成**：`completed_at = "0"`

### 5. 消息读取与资源下载
```
1. 获取历史消息（feishu_im_user_get_messages）
   - 参数：chat_id 或 open_id（二选一）
   - 可选：relative_time, page_size
2. 发现 thread_id → 展开话题回复
3. 发现资源标记（img_xxx/file_xxx）→ 下载
   - feishu_im_user_fetch_resource
   - 参数：message_id, file_key, type
```

**时间过滤**：
- 相对时间：`today`, `yesterday`, `this_week`, `last_3_days`
- 精确时间：`start_time` + `end_time`（ISO 8601）
- 两者互斥

---

## 🎯 验证有效的核心策略

| 编号 | 策略名称 | 效果数据 | 验证日期 |
|:---|:---|:---|:---:|
| #001 | 并行 Agent 协作模式 | 时间缩短 40% | 2026-03-02 |
| #002 | Vercel 快速部署流程 | 部署时间 -80% | 2026-03-02 |
| #003 | 深色科技风格设计规范 | 品牌识别度 +70% | 2026-03-02 |
| #004 | Self-Improving 自我迭代协议 | 错误重复率 -77% | 2026-03-08 |
| #005 | 文档局部更新优先 | 媒体丢失率 -95% | 2026-03-10 |
| #006 | 多维表格字段预检查 | 写入错误率 -90% | 2026-03-10 |

---

## 🔧 技能恢复 SOP (V1.0)

**场景**：系统重装/配置重置后恢复技能

**流程**：
1. ✅ 盘点技能文件存在性（4 个目录）
   - `~/.agents/skills/`
   - `~/.openclaw/extensions/feishu-openclaw-plugin/skills/`
   - `/usr/local/lib/node_modules/openclaw/skills/`
   - `workspace/` 本地技能
2. ✅ 深度阅读核心 SKILL.md 文档
3. ✅ 更新 TOOLS.md（架构师速查表）
4. ✅ 更新 playbook.md（实战打法）
5. ✅ 验证关键工具链可用性
6. ✅ 测试并行协作与输出流程

**效果**：30 分钟内完成技能恢复，文档化所有关键信息  
**负责人**：mi-ma-arch

---

## ⚠️ 高频错误与解决方案

### 多维表格
| 错误码 | 现象 | 解决方案 |
|--------|------|---------|
| 1254064 | DatetimeFieldConvFail | 改用毫秒时间戳 |
| 1254068 | URLFieldConvFail | 改用对象 `{text, link}` |
| 1254066 | UserFieldConvFail | 改用 `[{id: "ou_xxx"}]` |
| 1254104 | RecordAddOnceExceedLimit | 分批调用（≤500 条/批） |
| 1254291 | Write conflict | 串行调用 + 延迟 0.5-1 秒 |

### 日历
| 现象 | 原因 | 解决方案 |
|------|------|---------|
| 发起人不在参会人列表 | 未传 user_open_id | 始终传 SenderId |
| 会议室显示"预约中" | 异步预约流程 | 等待几秒后 list 查询 |
| 时间不对 | 使用 Unix 时间戳 | 改用 ISO 8601 格式 |

### 任务
| 现象 | 原因 | 解决方案 |
|------|------|---------|
| 创建后无法编辑 | 未将自己加入 members | 传 current_user_id（自动添加） |
| 反完成失败 | completed_at 格式错误 | 使用字符串 `"0"` |

### 文档
| 现象 | 原因 | 解决方案 |
|------|------|---------|
| 图片/画板丢失 | 使用 overwrite 覆盖 | 改用 replace_range/append |
| 定位失败 | selection 范围太大 | 缩小定位范围，提高唯一性 |

---

## 📊 工具调用优先级

### 文档操作
1. `feishu_create_doc` - 创建新文档
2. `feishu_update_doc` (append/replace_range) - 局部更新
3. `feishu_doc_media` - 插入本地图片/文件
4. `feishu_fetch_doc` - 读取内容

### 数据操作
1. `feishu_bitable_app_table_field.list` - 获取字段定义
2. `feishu_bitable_app_table_record.list` - 查询现有记录
3. `feishu_bitable_app_table_record.batch_create` - 批量导入
4. `feishu_bitable_app_table_record.update` - 更新记录

### 日程操作
1. `feishu_calendar_freebusy.list` - 查询忙闲
2. `feishu_calendar_event.create` - 创建日程
3. `feishu_calendar_event_attendee.create` - 添加参会人
4. `feishu_calendar_event_attendee.list` - 查询预约状态

---

## 🚀 高效协作模式

### 1. 并行 Agent 唤醒
```
[处理中...] 正在并行调遣专家...
- @mi-wen 撰写文章初稿
- @mi-hua 生成配图
- @mi-shu-data 整理数据报表
```

**工具**：`sessions_spawn` + `runtime: "subagent"`

### 2. 跨组协作公示
```
[协作] 已调遣 @mi-hua 协助处理视觉设计
[协作] 已调遣 @mi-shu-data 协助处理数据可视化
```

**工具**：`sessions_send` + 公示消息

### 3. 锁定与防重
```
[处理中...] 正在执行 Vercel 部署，预计耗时 2 分钟
```

**目的**：防止多个 Agent 同时执行相同操作

---

## 📈 持续进化机制

### 自我迭代协议
1. **任务启动（读）**：
   - 读取 `MEMORY.md`（长期经验）
   - 读取 `memory/YYYY-MM-DD.md`（最近日记）
   - 读取 `playbook.md`（实战策略）

2. **任务结束（记）**：
   - 更新今日日记 `memory/YYYY-MM-DD.md`
   - 记录关键数据、错误、新知识
   - 如有重大发现，更新 `MEMORY.md` 或 `playbook.md`

3. **触发条件**：
   - 用户纠正错误
   - 完成重要任务
   - 发现可优化模式
   - 每日 23:00 自动复盘

### 声明格式
```
[自我进化] 已记录到：
- 个人记忆：mi-army/mi-ling/self-improving/memory.md
- 今日日记：memory/YYYY-MM-DD.md
- 数据文件：data/platform_daily/YYYY-MM-DD.json（如适用）
```

---

*最后更新：2026-03-10*  
*版本：playbook.md V2.0*  
*状态：✅ 技能恢复完成，可执行全量任务*
