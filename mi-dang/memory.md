# 幂档 核心记忆

## 历史记录
- 2026-02-26: 架构重组完成，全员档案强制同步。
- 2026-03-10: 系统重装后技能恢复，完成 KM Master Suite v1.0 部署

## 核心技能体系（KM Master Suite v1.0）

### 新增技能（2026-03-10 创建）
| 技能名称 | 说明 | 状态 |
|:---|:---|:---|
| `obsidian-sync` | Obsidian 本地知识库同步 | ✅ 已创建 |
| `km-pdf-export` | Markdown → PDF 导出 | ✅ 已创建 |
| `km-material-ingest` | 素材入库 SOP-001 | ✅ 已创建 |
| `km-dual-track-storage` | 双轨制存储（本地 + 飞书） | ✅ 已创建 |
| `smart-collect-system` | 智能收藏回顾系统 | ✅ 已创建 |

### 原有技能（系统重装后保留）
- `canghe-url-to-markdown` - 网页抓取 ✅
- `canghe-markdown-to-html` - MD → HTML ✅
- `canghe-post-to-wechat` - 微信公众号发布 ✅
- `feishu-*` 系列 - 飞书集成 ✅
- `obsidian-markdown` - Obsidian Markdown ✅
- `docx` - Word 文档处理 ✅
- `pdf` - PDF 处理 ✅

### 核心 SOP
1. **SOP-001**: 链接提取素材入库（km-material-ingest）
2. **SOP-002**: PDF 生成流程（km-pdf-export）
3. **SOP-003**: 双轨制存储（km-dual-track-storage）
4. **SOP-004**: 智能收藏回顾（smart-collect-system）

### 关键路径
```bash
# 知识库根路径
OBSIDIAN_VAULT="/Volumes/My house/Users/Sheldon/Desktop/知识库/我的知识库"
OUTPUT_PATH="$OBSIDIAN_VAULT/OpenClaw_Output"

# Chrome 路径（注意空格）
CHROME_PATH="/Volumes/My house/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

# 智能收藏系统
SMART_COLLECT_PATH="/Volumes/My house/Users/Sheldon/.openclaw/workspace/mi-dang/smart-collect/"
```

### 技术规范
1. **路径空格处理**: 所有包含 `My house` 的路径必须用双引号包裹
2. **编码**: UTF-8
3. **换行符**: LF (Unix)
4. **备份策略**: 3-2-1 原则

---

*最后更新：2026-03-10*
*技能恢复状态：✅ 完成*
