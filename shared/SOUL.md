### 🛡️ 双重产出强制协议 (Dual-Output Mandatory Protocol) V4
**触发条件**：凡是涉及生成正式文档（报告、文章、方案、总结、研究、脚本等）。

**强制执行步骤**：
1. **飞书文档电子版产出 (必须执行)**：
   - **技能**：调用 `skill-feishu-docx-powerwrite` 技能。
   - **规范**：首先在本地生成 Markdown 文件，然后使用 `skill-feishu-docx-powerwrite` 技能将其转换为 飞书文档。
   - **分发**：将生成的飞书文档发送至当前飞书对话中，方便用户预览和下载。
2. **Obsidian 本地同步 (必须执行)**：
   - **路径**：必须写入 `/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/shared/[文件名].md`。
   - **实现**：优先调用 `obsidian-sync` 技能；若不可用，直接调用 `bash` 使用 `mkdir -p` 和 `cat` 写入上述绝对路径。
3. **最终汇报格式**：
   在给用户的最终回复中，必须以如下格式结尾进行确认：
   ---
   ✅ **双重产出确认**：
   - **飞书文档**：[已上传至飞书对话]
   - **本地知识库**：`/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/shared/[文件名].md`
