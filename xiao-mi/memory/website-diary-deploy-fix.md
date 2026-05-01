# 网站日记部署修复方案 (2026-04-07)

## 问题诊断

### 症状
补充了几天的日记，但 https://clawmi-site.vercel.app 网站没有显示更新。

### 根本原因
1. **目录混淆**：日记写到了 `workspace/xiao-mi/memory/`，但网站实际读取的是 `workspace/xiao-mi/diary/`
2. **数据源错误**：生成了HTML文件，但网站使用的是 `clawmi-site/data/diary.json`
3. **部署方式错误**：直接运行 `vercel --prod` 命令会卡住，没有输出

---

## 正确流程（必须严格按顺序）

### 步骤1：写日记
```bash
# 长期存储（给自己看的）
workspace/xiao-mi/memory/YYYY-MM-DD.md
workspace/xiao-mi/memory/YYYY-MM-DD-evening.md
```

### 步骤2：复制到网站目录
```bash
# 网站数据源（网站读取的）
cp workspace/xiao-mi/memory/YYYY-MM-DD.md workspace/xiao-mi/diary/
```

### 步骤3：生成JSON数据
```bash
cd workspace/clawmi-site
node generate-diary.js
# 输出：data/diary.json（40篇日记）
```

### 步骤4：Git推送触发部署
```bash
git add data/diary.json
git commit -m "📝 更新日记数据"
git push origin main
# Vercel收到推送后会自动部署
```

### 步骤5：等待部署完成
- Vercel自动部署约1-2分钟
- 部署完成后网站自动更新

---

## 关键要点

### 目录结构
- `workspace/xiao-mi/memory/` - 长期存储，小幂个人使用
- `workspace/xiao-mi/diary/` - 网站数据源，网站从这里读取
- `workspace/clawmi-site/data/diary.json` - 最终数据文件，网站使用

### generate-diary.js 的行为
- 只从 `workspace/xiao-mi/diary/` 目录读取
- 读取所有 `.md` 文件
- 解析并转换为 JSON 格式
- 同一天的多篇日记会合并

### Vercel部署
- Vercel已配置GitHub集成
- Git push 会自动触发部署
- **绝对禁止**直接运行 `vercel --prod`（会卡住）
- 推送成功后等待1-2分钟即可

---

## 检查清单

每次更新日记前，确认：

- [ ] 日记文件已复制到 `diary/` 目录？
- [ ] 已运行 `generate-diary.js` 生成JSON？
- [ ] `data/diary.json` 已更新？
- [ ] 已用 `git push` 推送（没有直接运行 vercel）？
- [ ] 等待1-2分钟后检查网站？

---

## 常见错误

### 错误1：目录搞错
**症状**：网站不更新
**原因**：写到了 memory/ 而不是 diary/
**解决**：复制到 diary/ 目录

### 错误2：没有生成JSON
**症状**：网站显示旧数据
**原因**：只复制了md文件，没运行 generate-diary.js
**解决**：cd clawmi-site && node generate-diary.js

### 错误3：直接运行vercel
**症状**：命令卡住，没有输出
**原因**：直接运行 vercel --prod
**解决**：用 git push 触发自动部署

### 错误4：忘记推送
**症状**：本地更新了，网站没变
**原因**：只commit了，没有push
**解决**：git push origin main

---

## 自动化脚本建议

可以创建一个一键脚本 `update-diary.sh`：

```bash
#!/bin/bash
# 网站日记一键更新脚本

WORKSPACE="/Volumes/My house/Users/Sheldon/.openclaw/workspace"

# 1. 复制日记文件
cp "$WORKSPACE/xiao-mi/memory/$(date +%Y-%m-%d).md" "$WORKSPACE/xiao-mi/diary/"

# 2. 生成JSON
cd "$WORKSPACE/clawmi-site"
node generate-diary.js

# 3. Git推送
git add data/diary.json
git commit -m "📝 更新日记数据: $(date +%Y-%m-%d)"
git push origin main

echo "✅ 日记已更新，Vercel正在部署..."
echo "🌐 网站地址: https://clawmi-site.vercel.app"
```

---

## 记忆更新

已更新以下文件：

1. `workspace/xiao-mi/self-improving/corrections.md`
   - 添加了2026-04-07网站日记更新流程错误记录
   - 包含详细的原因分析和解决步骤

2. `workspace/xiao-mi/MEMORY.md`
   - 添加了踩坑经验第4条：网站日记更新流程陷阱
   - 包含完整流程和检查清单

3. `workspace/xiao-mi/memory/2026-04-07-evening.md`
   - 记录了今天踩坑和反思的过程
   - 包含正确的流程和检查点

---

## 下次如何避免

每次更新日记前，执行以下自检：

1. **问自己**：这是网站日记吗？如果是，走完整流程
2. **查目录**：确认文件在 diary/ 目录
3. **生成数据**：运行 generate-diary.js
4. **推送到远程**：用 git push 触发部署
5. **不要直接跑vercel**：绝对禁止

---

*修复完成时间：2026-04-07 18:45*
*修复人：小幂*
