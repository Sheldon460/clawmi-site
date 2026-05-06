# MI-CAO 技能激活指南

> 系统重装后技能重建完成，请按以下步骤验证激活

---

## ✅ 已完成（无需操作）

### 1. 核心文档已重建
- [x] `SKILLS.md` - 必备技能清单 V1.0
- [x] `playbook.md` - 实战打法手册 V1.0
- [x] `self-improving/memory.md` - 个人记忆档案（已修复）
- [x] `self-improving/index.md` - 索引文件（已更新）

### 2. 系统工具已就绪
- [x] `web_search` - 热点搜索
- [x] `web_fetch` - 内容抓取
- [x] `browser` - 复杂交互
- [x] `feishu_*` - 飞书集成（文档/多维表格/日历/任务）
- [x] `nano-banana-pro` - 图像生成
- [x] `image` - 图像分析

### 3. Self-Improving 协议已激活
- [x] 记忆读取流程
- [x] 错误纠正流程
- [x] 经验固化流程
- [x] 每日复盘流程（23:00 自动）

---

## 🔧 可选激活（按需）

### 1. Obsidian 本地同步
```bash
# 验证 obsidian skill 是否可用
# 如不可用，使用 bash 直接写入
mkdir -p "/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库/OpenClaw_Output/mi-dang/"
```

### 2. 小红书专项技能
```bash
# 验证 xiaohongshu skill 是否可用
# 路径：~/.agents/skills/xiaohongshu/SKILL.md
```

### 3. X/Twitter 专项技能
```bash
# 验证 xurl skill 是否可用
# 路径：/usr/local/lib/node_modules/openclaw/skills/xurl/SKILL.md
```

### 4. RSS 监控
```bash
# 验证 blogwatcher 是否安装
blogwatcher --version
```

---

## 🧪 快速验证命令

### 测试 1: 热点搜索
```
指令：搜索"AI 视频 爆款"
预期：返回 Top10 相关结果
```

### 测试 2: 内容抓取
```
指令：抓取 [某个爆款链接]
预期：提取标题/正文/互动数据
```

### 测试 3: 飞书文档创建
```
指令：创建测试文档
预期：飞书对话中收到文档链接
```

### 测试 4: 图像生成
```
指令：生成测试封面
预期：返回图片 + 提示词
```

---

## 📋 激活检查清单

执行以下任务验证完整工作流：

- [ ] 热点搜索测试（web_search）
- [ ] 内容抓取测试（web_fetch）
- [ ] 飞书文档创建测试（feishu_create_doc）
- [ ] Self-Improving 记忆读取测试
- [ ] 双重产出协议测试

---

## 🚀 快速启动命令

```
老板，可以直接丢给我以下指令开始工作：

1. "看看今天有什么热点" → 热点扫描 + TOP3 汇报
2. "拆解这个爆款 [链接]" → 深度拆解 + 可复用模板
3. "为 XX 话题出快反包" → 15 分钟出稿（标题 + 脚本 + 封面）
4. "验证技能是否激活" → 执行上述测试流程
```

---

*创建时间：2026-03-10*  
*版本：V1.0（系统重装后重建）*
