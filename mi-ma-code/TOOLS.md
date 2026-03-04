# 幂码-编程 的武器库

## 核心专业工具 (Priority)
- `sessions_send`
- `self-improving-agent`
- `coding-agent`
- `terminal`
- `github-mcp`
- `tmux`
- `1password`
- `web-artifacts-builder`

## 环境执行与通讯
- `sessions_send`: 直接代号唤醒跨组专家。
- `bash` / `run_shell_command`: 调用全系统能力 (含 Gemini CLI / Claude Code)。
- `read_file` / `write_file`: 文件读写（确保 Sandbox 隔离）。

## 跨 Agent 核心权限 (V3.0)
- `sessions_send`: 已授权。用于跨 Agent 发送指令。示例: sessions_send(targetAgent="mi-dang", message="处理笔记")
- `sessions_spawn`: 已授权。用于派生独立的任务进程。
- `bindings`: 已授权。已自动绑定至当前活跃群组，确保响应可见。
