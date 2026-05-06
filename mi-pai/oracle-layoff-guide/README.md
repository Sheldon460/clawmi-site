# 甲骨文裁员启示录 - Remotion视频项目

基于 Remotion 的自动化视频生成项目，用于制作知识分享类短视频。

## 项目信息

- **标题**: 甲骨文裁员启示录：AI时代打工人的3条生存法则
- **总时长**: 约142秒（7个场景）
- **分辨率**: 1920×1080
- **帧率**: 30fps
- **配色**: 警示系（深灰 #1a1a1a + 橙红 #ff6b35 + 青色 #00d4ff）

## 场景结构

| 场景 | 内容 | 预估时长 |
|------|------|----------|
| Scene 01 | 开场标题 + 裁员数据可视化 | 8s |
| Scene 02 | "归档"新词 + 47→3对比 | 25s |
| Scene 03 | 三个高危特征诊断 | 30s |
| Scene 04 | 法则1：T型能力结构 | 22s |
| Scene 05 | 法则2：决策权跃迁 | 22s |
| Scene 06 | 法则3：网络型职业 | 20s |
| Scene 07 | 结语 + 行动建议 | 15s |

## 🔑 Minimax API 配置

**API Key**: `sk-api-6SUheWyeLR7VDODrdPPblE1gDmkkwP6mbtUohxu84_KEGfMBTqcD2SYDL-HHi0V6MXWKRteFzphH74Mc4L81Ym8CW6hBdsrmMDlnVBltKJoPZiJmiNX745s`

**音色**: `sheldon009`（高质量中文男声）

## 快速开始

### 1. 安装依赖

```bash
cd oracle-layoff-guide
npm install
```

### 2. 生成配音

```bash
# 设置 Minimax API Key
export MINIMAX_API_KEY="sk-api-6SUheWyeLR7VDODrdPPblE1gDmkkwP6mbtUohxu84_KEGfMBTqcD2SYDL-HHi0V6MXWKRteFzphH74Mc4L81Ym8CW6hBdsrmMDlnVBltKJoPZiJmiNX745s"

# 生成所有场景配音
node scripts/generate-all-voiceover.cjs
```

### 3. 开发预览

```bash
npm run dev
```

### 4. 渲染输出

```bash
npm run build
```

视频会输出到 `out/OracleLayoffGuide.mp4`

## 配置说明

重要：`src/config.ts` 中的 `ESTIMATED_DURATIONS` 必须与配音文件实际时长相符。

配音生成后，脚本会输出实际时长，请手动更新 `config.ts`。

## 故障排查

### 视频没有配音

**原因**: `ESTIMATED_DURATIONS` 与实际配音时长不匹配。

**解决**:
1. 检查配音文件实际时长
2. 更新 `src/config.ts` 中的 `ESTIMATED_DURATIONS`
3. 重新渲染：`npm run build`
