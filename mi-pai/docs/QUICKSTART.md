# mi-pai 快速启动指南

## 🚀 5 分钟上手

### 1. 确认技能状态
```bash
# 检查个人技能目录
ls -la ~/.openclaw/workspace/mi-pai/

# 检查 ffmpeg 可用性
ffmpeg -version

# 检查 nano-banana-pro 技能
# (在 OpenClaw 中调用即可)
```

### 2. 接收任务后的标准流程

```
Step 1: 读取任务 brief
  → 确认内容主题/目标平台/发布时间

Step 2: 内容评估
  → 是否需要 @mi-fa 合规审查？
  → 是否需要 @mi-wen 脚本优化？

Step 3: 素材准备
  → 调用 @mi-hua 生成封面
  → 调用 @mi-ying 剪辑视频
  → 调用 @mi-sheng 处理音频

Step 4: 发布准备
  → 使用 script-template.md 优化脚本
  → 使用 title-library.md 选择标题
  → 使用 hashtag-library.md 配置标签

Step 5: 多平台分发
  → 抖音 (手动/browser 自动化)
  → 视频号 (手动/browser 自动化)
  → 小红书 (xiaohongshu 技能)

Step 6: 数据记录
  → 发布后 1h/6h/24h/7d 记录数据
  → 写入 data/platform_daily/YYYY-MM-DD.json

Step 7: 复盘优化
  → 23:00 自动复盘
  → 更新 self-improving/memory.md
```

---

## 📋 常用命令速查

### 视频处理
```bash
# 提取封面帧
ffmpeg -i input.mp4 -vf "select=eq(n\,0)" -vframes 1 cover.jpg

# 生成 GIF 预览
ffmpeg -i input.mp4 -vf "fps=10,scale=320:-1" preview.gif

# 截取片段
ffmpeg -i input.mp4 -ss 00:00:30 -t 00:00:15 -c copy clip.mp4

# 压缩视频
ffmpeg -i input.mp4 -vf "scale=1080:1920" -c:v libx264 -crf 23 output.mp4
```

### 数据记录
```bash
# 创建今日数据文件
cat > ~/.openclaw/workspace/mi-pai/data/platform_daily/2026-03-10.json <<EOF
{
  "date": "2026-03-10",
  "platforms": {
    "douyin": {
      "videos_posted": 1,
      "total_views": 0,
      "total_likes": 0
    }
  }
}
EOF
```

---

## 🎯 内容创作检查清单

### 发布前必查 ✅
- [ ] 前 3 秒有钩子
- [ ] 视频时长≤60s (新手建议)
- [ ] 字幕清晰无错字
- [ ] BGM 音量适中 (不盖过人声)
- [ ] 封面图清晰 (1080x1920)
- [ ] 标题含关键词
- [ ] 话题标签 3-5 个
- [ ] 评论区有置顶引导

### 合规审查 ⚠️
- [ ] 无硬广营销 (二维码/微信号)
- [ ] 无敏感词汇 (政治/医疗/金融)
- [ ] 无低质内容 (模糊/黑屏/无声)
- [ ] 无搬运抄袭 (需二次创作)
- [ ] BGM 有版权或使用平台音乐库

---

## 📊 数据指标参考

### 新手基准线 (单条视频)
| 指标 | 及格线 | 良好线 | 优秀线 |
|------|--------|--------|--------|
| 播放量 | 500+ | 5000+ | 5w+ |
| 完播率 | 30%+ | 50%+ | 70%+ |
| 点赞率 | 3%+ | 8%+ | 15%+ |
| 评论率 | 0.5%+ | 2%+ | 5%+ |
| 转发率 | 0.3%+ | 1%+ | 3%+ |

### 发布节奏建议
- **新手期** (0-1w 粉): 日更 1 条，测试内容方向
- **成长期** (1w-10w 粉): 日更 1-2 条，稳定输出
- **成熟期** (10w+ 粉): 日更 2-3 条，矩阵运营

---

## 🆘 常见问题

### Q1: 视频限流怎么办？
**A**: 
1. 停止发布 24-48 小时
2. 检查是否有违规内容
3. 发布高质量原创内容 (3-5 条)
4. 增加互动 (回复评论)
5. 必要时申诉

### Q2: 如何提升完播率？
**A**:
1. 前 3 秒必须有钩子
2. 节奏紧凑，每 5 秒一个信息点
3. 设置悬念，引导看到最后
4. 控制时长 (新手建议 30-45s)

### Q3: 什么时候发布最好？
**A**:
- **最佳**: 20:00-22:00 (晚间高峰)
- **次优**: 12:00-13:00 (午休时间)
- **测试**: 不同时段发布，看数据反馈

### Q4: 如何选择合适的 BGM？
**A**:
1. 使用平台热门音乐 (蹭流量)
2. BGM 节奏与内容匹配
3. 音量控制：人声 > BGM
4. 注意版权 (使用平台音乐库)

---

## 📞 寻求协作

需要支持时，使用 `sessions_send` 联系对应专家：

```
@mi-wen  → 脚本创作/文案优化
@mi-hua  → 封面设计/视觉规范
@mi-ying → 视频剪辑/成片合成
@mi-sheng → 配音/BGM 处理
@mi-zhi  → 热点选题/趋势分析
@mi-fa  → 内容合规审查
@mi-shu-data → 数据可视化
@mi-book → 小红书同步
```

---

## 📚 进阶学习

### 内部文档
- [SKILL.md](../SKILL.md) - 完整技能手册
- [memory.md](../self-improving/memory.md) - 运营策略库
- [script-template.md](../self-improving/templates/script-template.md) - 脚本模板
- [title-library.md](../self-improving/templates/title-library.md) - 标题库
- [corrections.md](../self-improving/corrections.md) - 错误纠正

### 外部资源
- 抖音创作者服务中心
- 视频号创作学院
- 小红书成长笔记

---

*版本：V1.0*
*创建：2026-03-10*
*随时根据实战经验更新*
