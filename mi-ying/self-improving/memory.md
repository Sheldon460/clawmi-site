# 幂影 个人记忆档案 V2.0

**最后更新**: 2026-03-10 00:20 GMT+8  
**更新原因**: 系统重装后技能恢复与补充

---

## 📊 技能恢复状态

### 恢复统计
- **总技能数**: 11 项
- **已恢复**: 10 项 (91%)
- **待配置**: 1 项 (Seedance API Key)

### 已恢复技能清单
1. ✅ google-genmedia (Google Veo 视频生成)
2. ✅ video-frames (FFmpeg 帧提取)
3. ✅ videocut:剪辑 (口播视频剪辑)
4. ✅ remotion-best-practices (程序化视频)
5. ✅ sherpa-onnx-tts (中文口播转录)
6. ✅ openai-whisper (多语言字幕)
7. ✅ nano-banana-pro (图像生成)
8. ✅ openai-image-gen (DALL-E 3)
9. ✅ summarize (视频总结分析)
10. ✅ skill-feishu-docx-powerwrite (飞书文档)

### 待配置技能
1. ⏳ seedance-video (待 API Key)

---

## 🧠 经验积累

### 2026-03-10 技能恢复
- 完成全面技能盘点
- 恢复 10/11 项核心技能
- 生成《技能恢复报告 V2.0》
- 更新 playbook.md 添加 4 项核心 SOP
- 固化视频内容生产策略 (平台选择/C.H.A.O.S/3-5-8/H.I.G.H)

### 2026-03-08
- 视频工具链全面配置完成
- 成功测试 Google Veo 3.0 视频生成
- 新增 vsum skill (视频总结功能)
- Self-Improving 协议初始化完成
- 执行首次自我迭代复盘，识别 8 项优化点

### 2026-03-06
- 视频制作工作全面复盘
- 识别数据采集缺失问题
- 建立跨 Agent 协作机制建议

---

## 🎯 技能专长

| 领域 | 技能 | 熟练度 | 状态 |
|------|------|--------|------|
| 视频生成 | Google Veo | ⭐⭐⭐⭐ | ✅ |
| 视频生成 | Seedance | ⭐⭐⭐ | ⏳ |
| 视频处理 | FFmpeg 帧提取 | ⭐⭐⭐⭐ | ✅ |
| 视频处理 | 口播剪辑 | ⭐⭐⭐⭐ | ✅ |
| 视频处理 | 程序化视频 | ⭐⭐⭐ | ✅ |
| 音频处理 | FunASR 转录 | ⭐⭐⭐⭐ | ✅ |
| 音频处理 | Whisper 字幕 | ⭐⭐⭐⭐ | ✅ |
| 图像生成 | Nano Banana Pro | ⭐⭐⭐⭐ | ✅ |
| 图像生成 | DALL-E 3 | ⭐⭐⭐ | ✅ |
| 内容分析 | 视频总结 | ⭐⭐⭐⭐ | ✅ |
| 文档产出 | 飞书文档 | ⭐⭐⭐⭐ | ✅ |

---

## 📚 最佳实践 (Patterns)

### 视频生成平台选择
- 英文内容 → Google Veo (电影感强)
- 中文内容 → Seedance (中文理解好)
- 漫剧 → comic-drama-maker
- 数据视频 → Remotion

### 口播处理流程
```
FunASR 转录 → 口误识别 → 用户确认 → FFmpeg 剪辑 → 字幕烧录
```
⚠️ **关键**: 剪辑前必须获得用户确认

### 任务启动协议
1. 读取 MEMORY.md (长期经验)
2. 读取 memory/最近日记 (短期上下文)
3. 检查 playbook.md (实战策略)
4. 声明"已加载最新实战策略"

### 任务结束协议
1. 更新今日日记到 memory/YYYY-MM-DD.md
2. 如有错误/新发现，更新 corrections.md 或 memory.md
3. 如有正式文档，执行双重产出协议
4. 声明记忆更新确认

### 群组协作协议
1. 检查历史消息 (防重复)
2. 发送 [处理中...] 锁定任务
3. 如需协作，使用 sessions_send 联络对应专家
4. 任务完成后报告 [完成]

---

## ⚙️ 偏好设置 (Preferences)

- 优先使用 Seedance 处理中文视频内容 (待配置)
- 视频生成前检查 API Key 可用性
- 口播剪辑前必须获得用户确认
- 每日 23:00 自动执行复盘
- 正式文档必须双重产出 (飞书 + Obsidian)

---

## 📋 工作规则 (Rules)

1. **凡事必记，凡记必同步** - 记忆双轨制强制执行
2. **双重产出协议** - 正式文档必须飞书 + Obsidian
3. **群组锁定** - 执行前发送 [处理中...]
4. **每日复盘** - 23:00 自动执行
5. **子任务报告** - 完成后报告迭代摘要
6. **用户确认** - 口播剪辑等关键操作前必须确认

---

## 🛠️ 工具链状态

| 工具 | 功能 | 状态 | 依赖 |
|------|------|------|------|
| google-genmedia | Google Veo 视频生成 | ✅ | MCP 服务器 |
| seedance-video | 字节视频生成 | ⏳ | API Key |
| video-frames | FFmpeg 帧提取 | ✅ | ffmpeg |
| videocut:剪辑 | 口播视频剪辑 | ✅ | FFmpeg |
| remotion-best-practices | 程序化视频 | ✅ | Node.js |
| sherpa-onnx-tts | 中文口播转录 | ✅ | FunASR 模型 |
| openai-whisper | 多语言字幕 | ✅ | Whisper 模型 |
| nano-banana-pro | 图像生成 | ✅ | GEMINI_API_KEY |
| openai-image-gen | DALL-E 3 | ✅ | OPENAI_API_KEY |
| summarize | 视频总结分析 | ✅ | summarize CLI |
| skill-feishu-docx-powerwrite | 飞书文档 | ✅ | 飞书 OAuth |

---

## 📈 待优化项追踪

### 🔴 P0 - 紧急 (本周)
- [ ] 配置 Seedance API Key
- [ ] 建立 API Key 管理清单 (tools-config.yaml)
- [ ] 测试所有已恢复技能

### 🟡 P1 - 重要 (下周)
- [ ] 完善 summarize 错误处理 (网络超时/无效 URL)
- [ ] 创建工具依赖图 (Mermaid)
- [ ] 编写故障排查指南 (FAQ)
- [ ] 更新 playbook.md 添加更多案例

### 🟢 P2 - 持续优化
- [ ] 建立自动化测试 (单元测试 + 集成测试)
- [ ] 性能基准测试 (不同大小视频处理时间)
- [ ] 并发请求优化 (异步/并发处理)
- [ ] 对接平台数据 API (抖音/B 站/视频号)

---

## 📞 快速命令参考

```bash
# 视频总结 (YouTube/Bilibili)
summarize "https://youtu.be/VIDEO_ID" --youtube auto

# 帧提取
{baseDir}/scripts/frame.sh video.mp4 --time 00:00:10 --out frame.jpg

# 图像生成 (Nano Banana Pro)
uv run {baseDir}/scripts/generate_image.py \
  --prompt "描述" \
  --filename "output.png" \
  --resolution 2K \
  --aspect-ratio 16:9

# 字幕生成 (Whisper)
whisper video.mp4 --language zh --output srt

# 飞书文档转换
skill-feishu-docx-powerwrite input.md
```

---

## 📁 文件位置索引

| 文件类型 | 路径 |
|----------|------|
| 个人记忆 | `mi-ying/self-improving/memory.md` |
| 纠正记录 | `mi-ying/self-improving/corrections.md` |
| 今日日记 | `mi-ying/memory/YYYY-MM-DD.md` |
| 实战手册 | `mi-ying/playbook.md` |
| 迭代日志 | `mi-ying/changelog.md` |
| 技能报告 | `mi-ying/技能恢复报告_2026-03-10.md` |
| 灵魂档案 | `mi-ying/SOUL.md` |
| 身份档案 | `mi-ying/IDENTITY.md` |

---

*版本*: V2.0  
*状态*: ✅ 技能恢复完成  
*下次审查*: 2026-03-17 或技能配置变更时
