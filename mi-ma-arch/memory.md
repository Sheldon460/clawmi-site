# 幂码-架构 核心长期记忆

## 系统状态
- 2026-02-26: 全军战备升级完成，档案深度对齐。状态：✅ Active

## 关键经验库

### 经验 #001: 并行Agent协作模式 [2026-03-02验证有效]
**场景**: 需要同时完成设计和开发的大型项目
**执行**: 
1. 同时spawn mi-hua(设计) 和 mi-ma-code(开发)
2. 通过共享目录 /shared/projects/[项目名]/ 进行文件协作
3. 设计输出: design.md, 开发输出: 完整代码
**效果**: 整体时间缩短约40%, 质量符合预期
**适用范围**: 网站开发、产品设计、复杂报告生成

### 经验 #002: Vercel快速部署流程 [2026-03-02]
**流程**:
1. 确保next.config.js设置 `output: 'export', distDir: 'dist'`
2. `npm run build` 生成静态文件
3. `npx vercel --yes --prod` 部署到生产环境
**注意**: 首次部署需要配置VERCEL_TOKEN或本地登录

### 经验 #003: 深色科技风格设计规范 [2026-03-02]
**配色**:
- 背景: #030303 (深黑)
- 卡片: #0a0a0a / rgba(255,255,255,0.03)
- 主文字: #ffffff
- 强调: #a78bfa (紫色)
- 渐变: 蓝->紫->粉
**动画**:
- 入场: slideUp + fadeIn
- Hover: translateY(-8px) + border高亮
- 时长: 300-500ms
- 缓动: cubic-bezier(0.4, 0, 0.2, 1)

## 活跃项目追踪
- [x] 幂家军官方网站 (mi-jiajun-website) - 2026-03-02 已完成并部署
  - 在线地址: https://mi-jiajun-website.vercel.app
  - 源码位置: /shared/projects/mi-jiajun-website/

## 协作规则强化
1. 遇到跨组任务 → 立即spawn对应Agent并行处理
2. 设计+开发类项目 → 采用 #001 并行协作模式
3. 产出交付 → 优先PDF + 知识库双轨输出
4. 部署上线 → 使用 #002 Vercel快速部署流程

---
最后更新: 2026-03-02 by mi-ma-arch
状态: ✅ Active
