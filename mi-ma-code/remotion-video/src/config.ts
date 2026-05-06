// 视频全局配置
export const VIDEO_CONFIG = {
  // 基础设置
  width: 1920,
  height: 1080,
  fps: 30,

  // 总时长 (帧数) - 约90秒
  totalDuration: 30 * 90,

  // 场景时长配置
  scenes: {
    intro: 8 * 30,      // 开场痛点: 8秒
    concept: 10 * 30,   // 理念升华: 10秒
    features: 20 * 30,  // 三件套详解: 20秒
    workflow: 25 * 30,  // 实战四板斧: 25秒
    pitfalls: 15 * 30,  // 避坑清单: 15秒
    outro: 12 * 30,     // 结尾: 12秒
  },
};

// 颜色主题 - 深色科技感
export const THEME = {
  // 背景色
  background: "#0a0a0f",
  backgroundGradient: "linear-gradient(135deg, #0a0a0f 0%, #12121a 50%, #0a0a0f 100%)",

  // 主色调 - 科技蓝
  primary: "#00d4ff",
  primaryDark: "#00a8cc",
  primaryLight: "#4de8ff",

  // 辅助色
  accent: "#7c3aed",
  accentLight: "#a78bfa",

  // 文字颜色
  text: {
    primary: "#ffffff",
    secondary: "rgba(255, 255, 255, 0.7)",
    muted: "rgba(255, 255, 255, 0.5)",
  },

  // 边框和装饰
  border: "rgba(0, 212, 255, 0.3)",
  glow: "rgba(0, 212, 255, 0.5)",
};

// 动画配置
export const ANIMATION = {
  // 缓动函数
  easing: {
    smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
    enter: "cubic-bezier(0, 0, 0.2, 1)",
    exit: "cubic-bezier(0.4, 0, 1, 1)",
  },

  // 默认持续时间 (帧)
  duration: {
    fast: 10,
    normal: 20,
    slow: 30,
    entrance: 25,
    exit: 15,
  },
};

// 字幕配置 - 科技未来风格（荧光色描边、半透明背景）
export const SUBTITLE = {
  // 字幕样式
  style: {
    fontSize: 56,
    fontFamily: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
    fontWeight: 800,
    color: "#ffffff",
    // 荧光青色描边 + 发光效果
    textShadow: `
      0 0 5px #00d4ff,
      0 0 10px #00d4ff,
      0 0 20px #00d4ff,
      0 0 40px rgba(0, 212, 255, 0.5),
      0 0 80px rgba(0, 212, 255, 0.3),
      -2px -2px 0 #00d4ff,
      2px -2px 0 #00d4ff,
      -2px 2px 0 #00d4ff,
      2px 2px 0 #00d4ff
    `,
    WebkitTextStroke: "1px #00d4ff",
    letterSpacing: "2px",
  },

  // 字幕位置 - 底部居中
  position: {
    bottom: 100,
  },

  // 安全区域
  safeArea: {
    horizontal: 80,
    vertical: 60,
  },

  // 字幕容器样式 - 半透明深色背景
  container: {
    background: "rgba(10, 10, 15, 0.75)",
    borderRadius: "16px",
    border: "2px solid rgba(0, 212, 255, 0.5)",
    boxShadow: "0 0 30px rgba(0, 212, 255, 0.3), inset 0 0 20px rgba(0, 212, 255, 0.1)",
    backdropFilter: "blur(12px)",
    padding: "24px 48px",
  },
};
