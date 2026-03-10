# Memory (HOT Tier) - mi-hua

## Preferences
- 图像生成首选: Google GenMedia MCP (Imagen)
- 备用方案: Canvas Design (代码绘图)
- 输出格式: PNG (默认), 支持 WebP 压缩
- 常用比例: 16:9 (视频封面), 1:1 (社交媒体), 2.35:1 (电影感)

## Patterns
1. **图像生成流程**: 分析需求 → 选择工具 → 优化提示词 → 生成 → 质量检查 → 交付
2. **提示词优化**: 风格 + 主体 + 细节 + 光影 + 氛围
3. **质量检查点**: 分辨率、风格一致性、文字可读性(如有)

## Rules
- 优先使用已配置且可用的工具 (Google GenMedia MCP)
- Nano Banana Pro 配额耗尽时自动降级到 Canvas Design
- 所有生成任务记录到今日日记
- 图像文件保存到 `/tmp/openclaw/` 目录

## Tool Status (2026-03-10)
| 工具 | 状态 | 备注 |
|------|------|------|
| Google GenMedia MCP | ✅ 可用 | 首选工具 |
| Canvas Design | ✅ 可用 | 备用方案 |
| Nano Banana Pro | ✅ 已安装 | 10,000+ 提示词库 |
| 即梦 AI | ⚠️ 未配置 | 需配置密钥 |
| 通义万象 | ⚠️ 未配置 | 需配置密钥 |

## Recent Learnings
- 2026-03-08: SOUL.md 更新完成，新增 Self-Improving 固化流程
- 2026-03-08: 完成第一轮 Self-Improving 迭代，建立完整记忆体系

## Self-Improving 迭代记录

### Iteration #1 - 2026-03-08
**触发条件**: 用户指令 (安东尼) - 执行自我迭代协议

**回顾发现**:
1. ✅ 记忆文件结构完整 (memory.md, corrections.md, index.md)
2. ✅ 工具状态追踪已建立
3. ⚠️ 发现改进点: 缺少图像生成效果的反馈追踪机制
4. ⚠️ 发现改进点: 提示词模板库尚未建立

**改进动作**:
- [ ] 建立图像生成效果评分机制 (1-5分制)
- [ ] 收集并固化优质提示词模板
- [ ] 建立风格偏好档案 (用户喜好记录)

**已验证模式**:
- 工具降级策略: Google GenMedia → Canvas Design (有效)
- 输出格式优先级: PNG > WebP (平衡质量与大小)
- 比例选择: 16:9(视频) / 1:1(社交) / 2.35:1(电影感)

### Iteration #2 - 2026-03-10
**触发条件**: 系统重装后技能恢复 (安东尼指令)

**回顾发现**:
1. ✅ 核心能力保留完整 (Google Imagen、Canvas Design、Nano Banana Pro)
2. ✅ 视觉体系成熟 (品牌色、隐喻词典、QC 清单)
3. ✅ playbook.md 完成 V2.0 更新，新增提示词模板库和 SOP
4. ⚠️ 飞书文档权限待完善 (缺少 docs:document.media:upload)
5. ⚠️ 备用工具密钥待配置 (即梦 AI、通义万象)

**改进动作**:
- [x] 提示词模板库固化到 playbook.md (4 大场景)
- [x] 图像 QC 检查清单固化到 playbook.md
- [x] 成功案例 SOP 提炼 (封面设计 4 步流程)
- [ ] 飞书文档权限配置
- [ ] 备用工具密钥配置

**已验证模式**:
- 技能恢复流程：读取记忆 → 审计能力 → 固化 playbook → 实战验证
- 文档驱动恢复：playbook.md 是技能恢复的核心载体
- 双重产出策略：飞书文档 + 本地知识库同步
