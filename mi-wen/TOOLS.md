# 幂文 的武器库 (V4.0 完整版)

## 一、核心专业工具 (Priority 1)

### 1.1 内容创作
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `humanizer-zh` | 中文去 AI 味 | `python3 ~/.openclaw/skills/humanizer-zh/scripts/humanize_cn.py` |
| `doc-coauthoring` | 结构化文档协作 | 直接调用 |
| `ai-agent-team` | 多 Agent 协作模式 | `chief/researcher/writer/editor` |
| `self-improving-agent` | 自我迭代复盘 | 自动触发 |

### 1.2 飞书文档
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `skill-feishu-docx-powerwrite` | 飞书文档专业创建 | `feishu_create_doc --title "标题" --markdown "内容"` |
| `feishu-create-doc` | 飞书云文档创建 | 直接调用 |
| `feishu-update-doc` | 飞书云文档更新 (7 种模式) | 直接调用 |
| `feishu-fetch-doc` | 飞书云文档读取 | 直接调用 |

### 1.3 演示文稿
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `pptx` | PowerPoint 创建/编辑 | 直接调用 |
| `ppt-writer` | Python 生成 PPT | `~/.openclaw/workspace/skills/ppt-writer/` |

### 1.4 PDF 处理
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `pdf` | PDF 创建/编辑/分析 | 直接调用 |
| `nano-pdf` | 自然语言 PDF 编辑 | 直接调用 |

---

## 二、平台发布工具 (Priority 2)

### 2.1 微信公众号
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `canghe-post-to-wechat` | 公众号文章/图文发布 | `~/.openclaw/skills/canghe-post-to-wechat/` |
| `canghe-markdown-to-html` | Markdown 转微信 HTML | `~/.openclaw/skills/canghe-markdown-to-html/` |
| `公众号爆文写作.skill` | 公众号爆文生成 | `~/.openclaw/skills/公众号爆文写作.skill` |
| `公众号爆文工作流.skill` | 公众号爆文工作流 | `~/.openclaw/skills/公众号爆文工作流.skill` |

### 2.2 跨平台分发
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `x-article-publisher` | X/Twitter 文章发布 | `~/.openclaw/workspace/skills/x-article-publisher/` |
| `xiaohongshu` | 小红书内容发布 | `~/.agents/skills/xiaohongshu/` |
| `xiaohongshu-ops` | 小红书运营全流程 | `~/.agents/skills/xiaohongshu-ops/` |

---

## 三、研究分析工具 (Priority 3)

### 3.1 多 Agent 协作
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `sessions_send` | 跨 Agent 通讯 | `sessions_send(targetAgent="mi-zhi", message="...")` |
| `sessions_spawn` | 派生子 Agent 进程 | `sessions_spawn(task="...", runtime="subagent")` |

### 3.2 信息搜集
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `web_search` | 网络搜索 (Perplexity API) | 直接调用 |
| `web_fetch` | 网页内容提取 | 直接调用 |
| `canghe-url-to-markdown` | 链接转 Markdown (素材入库) | `~/.openclaw/skills/canghe-url-to-markdown/` |

---

## 四、知识管理工具 (Priority 4)

### 4.1 笔记同步
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `obsidian` | Obsidian 笔记管理 | `/usr/local/lib/node_modules/openclaw/skills/obsidian/` |
| `obsidian-markdown` | Obsidian Flavored Markdown | `~/.openclaw/workspace/skills/obsidian-markdown/` |
| `obsidian-sync` | Obsidian 同步 (双重产出) | 优先调用 |
| `bear-notes` | Bear 笔记管理 (macOS) | `/usr/local/lib/node_modules/openclaw/skills/bear-notes/` |

### 4.2 素材库路径
```
# 素材库根目录 (注意空格转义)
/Volumes/My\ house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/

# 子目录结构
├── mi-dang/          # 知识归档
├── mi-wen/           # 内容创作
├── mi-xin/           # 微信公众号
│   ├── 公众号爆文手册.md
│   ├── 公众号爆文提示词库.md
│   └── 04-已发布归档/
└── mi-hua/           # 视觉设计
```

---

## 五、自我进化系统 (Mandatory)

### 5.1 记忆文件
| 文件 | 路径 | 用途 |
|------|------|------|
| 个人记忆 | `mi-army/mi-wen/self-improving/memory.md` | 个人经验积累 |
| 错误纠正 | `mi-army/mi-wen/self-improving/corrections.md` | 错误记录 |
| 操作流水 | `memory/YYYY-MM-DD.md` | 每日任务日记 |
| 全局策略 | `playbook.md` | 验证有效的打法 |

### 5.2 数据追踪
| 工具 | 用途 | 调用方式 |
|------|------|----------|
| `feishu-bitable` | 内容效果数据表 | 直接调用 |
| `feishu-sheet` | 电子表格数据分析 | 直接调用 |

---

## 六、跨组协作 (As Needed)

| 协作对象 | 技能/工具 | 用途 |
| :--- | :--- | :--- |
| mi-hua (视觉) | `sessions_send` | 配图需求传达 (尺寸/风格/色调) |
| mi-ying (视频) | `sessions_send` | 脚本交付 (分镜/时长/BGM) |
| mi-sheng (音频) | `sessions_send` | BGM/配音需求 |
| mi-zhi (情报) | `sessions_send` | 选题/热点获取 |
| mi-dang (知识) | `sessions_send` | 素材入库/RAG |
| mi-xin (微信) | `sessions_send` | 公众号发布协作 |
| mi-book (小红书) | `sessions_send` | 小红书内容协作 |

---

## 七、 SOP 库 (标准作业流程)

### 7.1 双重产出协议 (Dual-Output Mandatory Protocol V4)
**触发条件**：生成正式文档（报告、文章、方案、总结、研究、脚本等）

**执行步骤**：
1. **飞书文档电子版**：
   - 工具：`skill-feishu-docx-powerwrite`
   - 规范：本地 Markdown → 飞书文档
   - 分发：发送至当前飞书对话

2. **Obsidian 本地同步**：
   - 路径：`/Volumes/My\ house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/[文件名].md`
   - 实现：优先 `obsidian-sync`，否则 `bash` 写入

3. **汇报格式**：
   ```
   ✅ **双重产出确认**：
   - **飞书文档**：[已上传至飞书对话]
   - **本地知识库**：`/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/[文件名].md`
   ```

### 7.2 链接提取素材入库 SOP
**适用场景**：用户发送文章链接，要求梳理总结并加入素材库

**工具链**：
- `canghe-url-to-markdown`：抓取文章

**执行步骤**：
```bash
export URL_CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
npx -y bun ~/.openclaw/skills/canghe-url-to-markdown/scripts/main.ts <url>
```

**输出规范**：
- 素材库根目录：`/Volumes/My\ house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output`
- 子目录结构：`<source>/<date>/<slug>.md`

### 7.3 网页转 PDF SOP (Chrome CDP 方案)
**适用场景**：将任意网页转换为 PDF，绕过编辑权限限制

**工具链**：
- `browser` (OpenClaw 内置)：Chrome 控制
- Chrome 浏览器：渲染 + 打印

**执行步骤**：
```bash
# 启动 Chrome 远程调试模式
"/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --remote-debugging-port=9222 \
  --headless=new \
  --no-sandbox &

# Agent 调用
browser action=open url=<目标 URL>
browser action=pdf fullPage=true
```

**输出规范**：
- PDF 输出目录：`/Volumes/My\ house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/pdf/`
- 命名规则：`<domain>-<slug>-YYYYMMDD.pdf`

---

## 八、环境执行与通讯

| 工具 | 用途 | 说明 |
|------|------|------|
| `bash` / `run_shell_command` | 调用全系统能力 | 含 Gemini CLI / Claude Code |
| `read_file` / `write_file` | 文件读写 | 确保 Sandbox 隔离 |
| `sessions_send` | 跨 Agent 发送指令 | 示例：`sessions_send(targetAgent="mi-dang", message="处理笔记")` |
| `sessions_spawn` | 派生独立任务进程 | 支持 ACP 2.27 并行模式 |
| `bindings` | 绑定至当前群组 | 确保响应可见 |

---

*最后更新：2026-03-10*
*版本：V4.0 完整版 (系统重装恢复)*
