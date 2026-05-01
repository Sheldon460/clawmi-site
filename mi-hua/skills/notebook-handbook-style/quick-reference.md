# 手帐风格图片生成 - 快速参考卡

## 🔥 最常用命令

```bash
# 基础用法
python3 ~/.openclaw/skills/skills/notebook-handbook-style/scripts/generate.py \
  --content "文章内容" --title "标题" --output ./result.png

# 从文件读取
python3 ~/.openclaw/skills/skills/notebook-handbook-style/scripts/generate.py \
  --file ./input.txt --output ./output.png

# 仅生成提示词（用于手动调用 MCP）
python3 ~/.openclaw/skills/skills/notebook-handbook-style/scripts/generate.py \
  --content "文章内容" --prompt-only
```

## 🎯 触发关键词

| 用户说 | 行动 |
|--------|------|
| "生成手帐风格图片" | ✅ 调用技能 |
| "小绿书风格" | ✅ 调用技能 |
| "视觉笔记" | ✅ 调用技能 |
| "读书笔记图片" | ✅ 调用技能 |
| "手账/手帐" | ✅ 调用技能 |

## 📝 内容格式建议

**最佳输入格式**：
```
文章标题

一、第一大标题
1. 要点一
2. 要点二

二、第二大标题
1. 要点一
2. 要点二
```

## 🎨 输出特点

- 柔和配色：薄荷绿、粉色、奶油色
- 可爱插画：闹钟、咖啡杯、书籍等
- 清晰层次：数字编号 + 箭头引导
- 装饰元素：星星、爱心、和纸胶带

## 🔧 故障排除

| 问题 | 解决方案 |
|------|----------|
| 无法生成图片 | 检查 Google Media MCP 配置 |
| 内容识别错误 | 确保使用标准标题格式（一、1. 等）|
| 提示词太长 | 技能会自动截断，无需担心 |

## 📂 文件位置

- 技能主目录：`~/.openclaw/skills/skills/notebook-handbook-style/`
- 生成脚本：`scripts/generate.py`
- 技能文档：`SKILL.md`
- 打包文件：`notebook-handbook-style.skill`
