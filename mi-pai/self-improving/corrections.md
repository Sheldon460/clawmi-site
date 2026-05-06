# mi-pai 错误纠正记录

> 记录运营中的错误、用户纠正、避免重复踩坑

---

## 2026-03-10 | 系统重装后技能恢复

### 问题描述
系统重装后，mi-pai 个人技能目录丢失，需要重新建立技能体系。

### 纠正动作
1. ✅ 创建个人目录：`~/.agents/mi-army/mi-pai/`
2. ✅ 创建 SKILL.md 技能手册
3. ✅ 初始化 self-improving 系统
4. ✅ 更新 TOOLS.md 添加短视频运营工具

### 经验教训
- **根因**: 技能目录未纳入版本控制/备份
- **改进**: 
  - 将 `~/.agents/mi-army/*/` 纳入 Time Machine 备份
  - 在 GitHub 私有仓库备份核心技能文档
  - 建立技能恢复 SOP (参考 main 的 recovery report)

### 待办事项
- [ ] 安装 douyin-cli 工具
- [ ] 安装 channels-cli 工具 (视频号)
- [ ] 配置 browser 自动化脚本
- [ ] 建立视频素材库规范

---

## 待补充
*等待实际运营中的错误记录*
