# wechat-markdown-pro 技能设计

## 核心功能
融合 canghe-markdown-to-html 的图片自动上传能力和 md2wechat 的精美排版

## 主要特性
1. **自动图片处理**：自动上传本地图片到微信素材库
2. **精美排版**：基于 md2wechat 的橙色主题 + 序号标题
3. **YAML支持**：正确处理 frontmatter
4. **一键发布**：convert + upload + draft 一体化

## 命令设计
- `wechat-markdown-pro convert <input.md>` - 转换并预览
- `wechat-markdown-pro publish <input.md>` - 转换并发布草稿

## 技术方案
1. 使用 md2wechat 的转换引擎（排版）
2. 使用 canghe 的图片上传逻辑（素材库）
3. 修复 md2wechat 的图片处理问题
