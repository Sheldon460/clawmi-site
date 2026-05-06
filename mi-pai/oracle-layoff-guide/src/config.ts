// 甲骨文裁员启示录 - 配置文件

export const ESTIMATED_DURATIONS = {
  "scene-01": 16.2,
  "scene-02": 22.3,
  "scene-03": 30,
  "scene-04": 29.2,
  "scene-05": 34.5,
  "scene-06": 25.1,
  "scene-07": 28.9,
};

export const SUBTITLE_TIMELINE = {
  "scene-01": [
    { text: "甲骨文裁员启示录：AI时代打工人的3条生存法则", start: 0, end: 6 },
    { text: "2025年，甲骨文可能要裁掉3万人", start: 6, end: 11 },
    { text: "这是一个残酷信号", start: 11, end: 16.2 },
  ],
  "scene-02": [
    { text: "我们不是被裁员，是被归档了", start: 0, end: 6 },
    { text: "47名资深DBA → 3人 + AI系统", start: 6, end: 12 },
    { text: "AI处理了94%的数据库维护工作", start: 12, end: 18 },
    { text: "这不是优化，这是结构性替代", start: 18, end: 22.3 },
  ],
  "scene-03": [
    { text: "特征一：高度标准化", start: 0, end: 9 },
    { text: "特征二：信息孤岛", start: 9, end: 18 },
    { text: "特征三：低决策权重", start: 18, end: 26 },
    { text: "你每天都在做决策，但这些决策真的重要吗？", start: 26, end: 30 },
  ],
  "scene-04": [
    { text: "法则一：从专精到T型能力结构", start: 0, end: 7 },
    { text: "竖线：专业深度，横线：跨领域广度", start: 7, end: 15 },
    { text: "理解业务、判断优先级、协调资源", start: 15, end: 23 },
    { text: "软技能成了稀缺品", start: 23, end: 29.2 },
  ],
  "scene-05": [
    { text: "法则二：从执行到决策的价值跃迁", start: 0, end: 7 },
    { text: "真正保值的是决策权", start: 7, end: 15 },
    { text: "不是能不能做，而是决定做什么", start: 15, end: 25 },
    { text: "未来的高薪岗位是能决定写什么代码的人", start: 25, end: 34.5 },
  ],
  "scene-06": [
    { text: "法则三：从依附到网络的职业形态", start: 0, end: 7 },
    { text: "公司不会为你的忠诚买单", start: 7, end: 14 },
    { text: "你是专业网络的节点", start: 14, end: 20 },
    { text: "最好的职业规划，是永远有选择", start: 20, end: 25.1 },
  ],
  "scene-07": [
    { text: "做自己的存档管理员", start: 0, end: 6 },
    { text: "AI时代没有铁饭碗，只有铁能力", start: 6, end: 15 },
    { text: "焦虑的反面不是安全感，而是行动", start: 15, end: 22 },
    { text: "改变不需要惊天动地，只需要持续发生", start: 22, end: 28.9 },
  ],
};

export const CONFIG = {
  audio: {
    bgmVolume: 0.12,
    voiceVolume: 1.0,
  },
  theme: {
    primary: "#00d4ff",
    secondary: "#ff6b35",
    background: "#1a1a1a",
    text: "#ffffff",
  },
  animation: {
    spring: {
      damping: 200,
      stiffness: 100,
      mass: 1,
    },
  },
};

// 场景顺序
export const SCENE_ORDER = [
  "scene-01",
  "scene-02",
  "scene-03",
  "scene-04",
  "scene-05",
  "scene-06",
  "scene-07",
];
