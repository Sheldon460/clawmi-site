import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence, Audio, staticFile, spring } from "remotion";

// 配色系统
const colors = {
  primary: '#00d4ff',
  secondary: '#7c3aed',
  accent: '#f59e0b',
  dark: '#0a0a0f',
  surface: '#1a1a2e',
  light: '#e2e8f0',
  muted: '#64748b',
  success: '#16c79a',
  danger: '#e94560',
};

// BGM 音量
const BGM_VOLUME = 0.12;

// 实际音频时长 (秒 * 30fps)
const VOICE_DURATION = {
  v1: 7.13, v2: 7.02, v3: 9.18, v4: 5.40, v5: 7.85,
  v6: 7.99, v7: 8.17, v8: 6.08, v9: 10.19, v10: 10.44,
};

// 场景配置
const scenes = [
  { id: 1, type: 'intro', duration: Math.ceil(VOICE_DURATION.v1 * 30), audio: 'voiceover-1.mp3', title: '7天分享最后一天', subtitle: '搞钱和涨粉的终极秘密', highlight: '🎯 搞钱 + 涨粉' },
  { id: 2, type: 'reveal', duration: Math.ceil(VOICE_DURATION.v2 * 30), audio: 'voiceover-2.mp3', title: '素材库', subtitle: '自媒体人的直接生产力', highlight: '📚 素材库' },
  { id: 3, type: 'problem', duration: Math.ceil(VOICE_DURATION.v3 * 30), audio: 'voiceover-3.mp3', title: '为什么你总是选题荒？', subtitle: '碎片化堆积的困境', highlight: '❌ 选题荒' },
  { id: 4, type: 'solution', duration: Math.ceil(VOICE_DURATION.v4 * 30), audio: 'voiceover-4.mp3', title: '流动的淡水库', subtitle: '自动吸纳 + 自动过滤', highlight: '✅ 淡水库' },
  { id: 5, type: 'process', duration: Math.ceil(VOICE_DURATION.v5 * 30), audio: 'voiceover-5.mp3', title: 'Step 1: 全网监控', subtitle: '20个头部账号实时监控', highlight: '🔍 监控虾' },
  { id: 6, type: 'process', duration: Math.ceil(VOICE_DURATION.v6 * 30), audio: 'voiceover-6.mp3', title: 'Step 2: 热度初筛', subtitle: 'AI自动判断定位匹配度', highlight: '🤖 AI初筛' },
  { id: 7, type: 'process', duration: Math.ceil(VOICE_DURATION.v7 * 30), audio: 'voiceover-7.mp3', title: 'Step 3: 自动预处理', subtitle: '拆解核心逻辑与情绪钩子', highlight: '⚡ 预处理' },
  { id: 8, type: 'process', duration: Math.ceil(VOICE_DURATION.v8 * 30), audio: 'voiceover-8.mp3', title: 'Step 4: 同步存档', subtitle: '飞书表格 + Obsidian 双备份', highlight: '💾 同步存档' },
  { id: 9, type: 'transform', duration: Math.ceil(VOICE_DURATION.v9 * 30), audio: 'voiceover-9.mp3', title: '从"找选题"到"挑选题"', subtitle: '工作状态的根本转变', highlight: '🔄 转变' },
  { id: 10, type: 'conclusion', duration: Math.ceil(VOICE_DURATION.v10 * 30), audio: 'voiceover-10.mp3', title: '创作的本质', subtitle: '从1到100的整合优化', highlight: '💡 本质' },
];

const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

// 开场动画
const IntroScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = spring({ frame, fps, from: 0.8, to: 1 });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.surface} 50%, ${colors.secondary}20 100%)`,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, transform: `scale(${scale})`
    }}>
      <div style={{ fontSize: 120, marginBottom: 40, filter: `drop-shadow(0 0 40px ${colors.primary}60)` }}>📦</div>
      <h1 style={{ color: colors.light, fontSize: 64, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>24小时自动更新的</h1>
      <h2 style={{ color: colors.primary, fontSize: 72, fontWeight: 'bold', textAlign: 'center', textShadow: `0 0 30px ${colors.primary}50` }}>"爆款内容弹药库"</h2>
      <p style={{ color: colors.muted, fontSize: 32, marginTop: 40 }}>OpenClaw 自动化实战指南</p>
    </AbsoluteFill>
  );
};

// 场景渲染器
const SceneRenderer = ({ scene, index }: { scene: typeof scenes[0]; index: number }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 15], [0.92, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 15], [30, 0], { extrapolateRight: 'clamp' });
  
  const bgGradients: Record<string, string> = {
    intro: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.surface} 100%)`,
    reveal: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.dark} 100%)`,
    problem: `linear-gradient(135deg, ${colors.danger}10 0%, ${colors.dark} 100%)`,
    solution: `linear-gradient(135deg, ${colors.success}10 0%, ${colors.dark} 100%)`,
    process: `linear-gradient(135deg, ${colors.primary}10 0%, ${colors.dark} 100%)`,
    transform: `linear-gradient(135deg, ${colors.accent}10 0%, ${colors.dark} 100%)`,
    conclusion: `linear-gradient(135deg, ${colors.secondary}30 0%, ${colors.primary}20 100%)`,
  };
  
  const isPositive = scene.highlight.includes('✅') || scene.highlight.includes('💡');
  const isNegative = scene.highlight.includes('❌');
  const accentColor = isPositive ? colors.success : isNegative ? colors.danger : colors.primary;
  
  return (
    <AbsoluteFill style={{
      background: bgGradients[scene.type] || bgGradients.intro,
      display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 80, opacity, transform: `scale(${scale}) translateY(${y}px)`
    }}>
      {/* 流程步骤指示器 */}
      {scene.type === 'process' && (
        <div style={{ position: 'absolute', top: 50, left: 80, display: 'flex', gap: 12, alignItems: 'center' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{
              width: i === (index - 3) ? 48 : 12, height: 12,
              background: i <= (index - 3) ? colors.primary : `${colors.primary}30`,
              borderRadius: 6
            }} />
          ))}
          <span style={{ color: colors.muted, fontSize: 22, marginLeft: 12 }}>Step {index - 3}/4</span>
        </div>
      )}
      
      {/* 场景编号 */}
      <div style={{ position: 'absolute', top: 50, right: 80, padding: '10px 24px', background: `${colors.primary}20`, borderRadius: 20, border: `1px solid ${colors.primary}50` }}>
        <span style={{ color: colors.primary, fontSize: 22 }}>{index + 1} / {scenes.length}</span>
      </div>
      
      {/* 主标题 */}
      <h1 style={{ color: colors.light, fontSize: 56, fontWeight: 'bold', textAlign: 'center', lineHeight: 1.3, maxWidth: 1400, marginBottom: 24 }}>
        {scene.title}
      </h1>
      
      {/* 副标题 */}
      <p style={{ color: colors.muted, fontSize: 32, textAlign: 'center', marginBottom: 60 }}>
        {scene.subtitle}
      </p>
      
      {/* 高亮标签 */}
      <div style={{
        padding: '24px 60px', background: `${accentColor}20`, border: `3px solid ${accentColor}`,
        borderRadius: 24, boxShadow: `0 0 40px ${accentColor}40`
      }}>
        <p style={{ color: accentColor, fontSize: 52, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
          {scene.highlight}
        </p>
      </div>
    </AbsoluteFill>
  );
};

// 主视频组件
export const ContentArsenalVideo = () => {
  let currentFrame = 0;
  return (
    <AbsoluteFill style={{ background: colors.dark }}>
      {/* BGM - 循环播放 */}
      <Audio src={staticFile("bgm.mp3")} volume={BGM_VOLUME} loop />
      
      {/* 开场 (1秒) */}
      <Sequence from={0} durationInFrames={30}>
        <IntroScene />
      </Sequence>
      
      {/* 各场景 */}
      {scenes.map((scene, index) => {
        const startFrame = currentFrame + 30;
        currentFrame += scene.duration;
        return (
          <Sequence key={index} from={startFrame} durationInFrames={scene.duration}>
            <SceneRenderer scene={scene} index={index} />
            <Audio src={staticFile(`voiceover/${scene.audio}`)} volume={1} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const VIDEO_DURATION_CONTENT_ARSENAL = totalDuration + 30;
