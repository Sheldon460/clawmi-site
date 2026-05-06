// 视频配置
export const CONFIG = {
  // 屏幕配置
  width: 1920,
  height: 1080,
  fps: 30,
  
  // 配色
  colors: {
    background: "#0a0a0f",
    primary: "#00d4ff",
    secondary: "#7c3aed",
    text: "#ffffff",
    textMuted: "#a1a1aa",
  },
  
  // 字幕样式
  subtitle: {
    fontSize: 48,
    fontFamily: "'PingFang SC', 'SF Pro Display', sans-serif",
    fontWeight: 800,
    color: "#ffffff",
    textShadow: `
      0 0 10px rgba(0, 212, 255, 0.8),
      0 0 20px rgba(0, 212, 255, 0.4)
    `,
    background: "rgba(10, 10, 15, 0.75)",
    borderRadius: 12,
    padding: "20px 40px",
    position: { bottom: 100 },
  },
  
  // Spring 动画配置
  spring: {
    smooth: { damping: 200 },
    snappy: { damping: 20, stiffness: 200 },
    bouncy: { damping: 8 },
  },
  
  // 音频配置
  audio: {
    bgmVolume: 0.15,
    voiceVolume: 1.0,
  },
};

// 场景文案
export const SCRIPTS = {
  "scene-01": "终极揭秘：如何用 OpenClaw 搭建爆款素材库，实现选题自由。我是 Sheldon，今天是我们 7 天分享的最后一天。",
  "scene-02": "为什么你总是选题荒？大多数人的选题是刷朋友圈、刷小红书时随手存的，这叫碎片化堆积。真正需要的是流动的淡水库，能源源不断吸纳新信息，又能自动过滤死水。",
  "scene-03": "我的爆款素材库闭环流程有四步。第一步，全网监控。配置监控虾盯着 20 个头部账号，新内容自动抓取。第二步，热度初筛。AI 判断选题是否符合我的定位，不符合直接过滤。第三步，自动预处理。AI 拆解爆款文章的核心逻辑、情绪钩子、金句提炼，甚至预演我会怎么写。第四步，同步存档。处理完的内容自动同步到飞书多维表格或 Obsidian，按标签分类。",
  "scene-04": "用了这套系统，我的工作状态彻底变了。以前我是找选题，现在我是挑选题。每天早上打开素材库，十几条预处理好的新鲜选题等着我。",
  "scene-05": "创作的本质，不是从零到一的虚空创造，而是从一到一百的整合优化。自动化素材库帮你完成了最枯燥的零到一，你只需要注入灵魂和风格。",
};

// 实际音频时长（秒）- 已根据配音文件更新
export const ESTIMATED_DURATIONS = {
  "scene-01": 8.2,
  "scene-02": 11.4,
  "scene-03": 26.9,
  "scene-04": 10.3,
  "scene-05": 10.44,  // 精确匹配配音文件时长
};

// 字幕时间轴（按句子分段，单位：秒）- 已根据 sheldon009 新配音调整
export const SUBTITLE_TIMELINE = {
  "scene-01": [
    { text: "终极揭秘：如何用 OpenClaw 搭建爆款素材库", start: 0, end: 3.5 },
    { text: "实现选题自由", start: 3.5, end: 5 },
    { text: "我是 Sheldon，今天是我们 7 天分享的最后一天", start: 5, end: 8.2 },
  ],
  "scene-02": [
    { text: "为什么你总是选题荒？", start: 0, end: 2 },
    { text: "大多数人的选题是刷朋友圈、刷小红书时随手存的", start: 2, end: 6 },
    { text: "这叫碎片化堆积", start: 6, end: 7.5 },
    { text: "真正需要的是流动的淡水库", start: 7.5, end: 9.5 },
    { text: "能源源不断吸纳新信息，又能自动过滤死水", start: 9.5, end: 11.4 },
  ],
  "scene-03": [
    { text: "我的爆款素材库闭环流程有四步", start: 0, end: 2.5 },
    { text: "第一步，全网监控", start: 2.5, end: 4 },
    { text: "配置监控虾盯着 20 个头部账号，新内容自动抓取", start: 4, end: 8 },
    { text: "第二步，热度初筛", start: 8, end: 9.5 },
    { text: "AI 判断选题是否符合我的定位，不符合直接过滤", start: 9.5, end: 13 },
    { text: "第三步，自动预处理", start: 13, end: 15 },
    { text: "AI 拆解爆款文章的核心逻辑、情绪钩子、金句提炼", start: 15, end: 20 },
    { text: "甚至预演我会怎么写", start: 20, end: 22 },
    { text: "第四步，同步存档", start: 22, end: 24 },
    { text: "处理完的内容自动同步到飞书多维表格或 Obsidian，按标签分类", start: 24, end: 26.9 },
  ],
  "scene-04": [
    { text: "用了这套系统，我的工作状态彻底变了", start: 0, end: 3 },
    { text: "以前我是找选题，现在我是挑选题", start: 3, end: 6.5 },
    { text: "每天早上打开素材库", start: 6.5, end: 8.5 },
    { text: "十几条预处理好的新鲜选题等着我", start: 8.5, end: 10.3 },
  ],
  "scene-05": [
    { text: "创作的本质", start: 0, end: 1.5 },
    { text: "不是从零到一的虚空创造", start: 1.5, end: 4 },
    { text: "而是从一到一百的整合优化", start: 4, end: 6.5 },
    { text: "自动化素材库帮你完成了最枯燥的零到一", start: 6.5, end: 8.5 },
    { text: "你只需要注入灵魂和风格", start: 8.5, end: 10.44 },  // 精确匹配配音时长
  ],
};
