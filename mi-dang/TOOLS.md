# 幂档 的武器库

## 核心专业工具
- `obsidian-sync` (知识库入库专用)
- `self-improving-agent`
- `ai-agent-team`
- `personal-assistant`
- `anki`
- `pptx`
- `memory`
- `feishu-wiki`
- `feishu-drive`
- `obsidian-markdown`
- `notebooklm`
- `pdf`
- `docx`
- `pptx`

## 基础通用工具
- `bash` / `run_shell_command` (环境执行)
- `sessions_send` (跨 Agent 通讯)
- `read_file` / `write_file` (文件读写)

## 跨 Agent 核心权限 (V3.0)
- `sessions_send`: 已授权。用于跨 Agent 发送指令。示例: sessions_send(targetAgent="mi-dang", message="处理笔记")
- `sessions_spawn`: 已授权。用于派生独立的任务进程。
- `bindings`: 已授权。已自动绑定至当前活跃群组，确保响应可见。
