import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence, Audio, staticFile, spring } from "remotion";

// ============================================================
// 优化版短视频 - FinalVideo
// 时长：~58秒 | 比例：9:16 竖屏
// 特点：字幕清楚、断句自然、画面丰富、节奏更好
// ============================================================

const colors = {
  primary: '#e94560',
  secondary: '#0f3460',
  accent: '#16c79a',
  gold: '#FFD700',
  dark: '#1a1a2e',
  light: '#ffffff',
  gray: '#8b8b8b'
};

// 场景配置：基于真实音频时长
const scenes = [
  { id: 1, type: 'hook', duration: 116, audio: 'voiceover-final-01.wav', highlight: '🦐 养虾', highlightSub: '到底是什么？', subtitles: [{ start: 0, end: 3.88, text: '最近圈子里有个词特别火，叫"养虾"' }] },
  { id: 2, type: 'reveal', duration: 156, audio: 'voiceover-final-02.wav', highlight: '自动化工具', highlightSub: 'OpenClaw', subtitles: [{ start: 0, end: 2.56, text: '很多人以为是搞水产' }, { start: 2.56, end: 5.2, text: '其实是个自动化工具' }] },
  { id: 3, type: 'data', duration: 114, audio: 'voiceover-final-03.wav', highlight: '算笔账', highlightSub: '聪明人的选择', subtitles: [{ start: 0, end: 3.8, text: '为什么聪明人都在养？给你算笔账' }] },
  { id: 4, type: 'list', duration: 270, audio: 'voiceover-final-04.wav', highlight: '❌ 24小时', highlightSub: '以前做自媒体', subtitles: [{ start: 0, end: 4.5, text: '以前做自媒体：早起刷对标、中午憋文案' }, { start: 4.5, end: 9.0, text: '下午回私信、晚上写计划' }] },
  { id: 5, type: 'contrast', duration: 143, audio: 'voiceover-final-05.wav', highlight: '❌ 复印机', highlightSub: '你以为是创业？', subtitles: [{ start: 0, end: 2.0, text: '你以为是创业？' }, { start: 2.0, end: 4.76, text: '其实是把自己当复印机' }] },
  { id: 6, type: 'solution', duration: 316, audio: 'voiceover-final-06.wav', highlight: '✅ 自动化', highlightSub: '养虾之后', subtitles: [{ start: 0, end: 3.5, text: '养虾之后呢？你喝咖啡、陪家人的时候' }, { start: 3.5, end: 7.0, text: '后台有几十只小虾在自动抓取素材、改写文案' }, { start: 7.0, end: 10.52, text: '同步发布' }] },
  { id: 7, type: 'keywords', duration: 97, audio: 'voiceover-final-07.wav', highlight: '不拿工资', highlightSub: '24/7 工作', subtitles: [{ start: 0, end: 3.24, text: '它不睡觉、不喊累、不拿工资' }] },
  { id: 8, type: 'highlight', duration: 196, audio: 'voiceover-final-08.wav', highlight: '数字分身', highlightSub: '一人公司的秘密', subtitles: [{ start: 0, end: 3.26, text: '一人公司的核心逻辑' }, { start: 3.26, end: 6.52, text: '不是压榨自己，而是批量生产数字分身' }] },
  { id: 9, type: 'contrast', duration: 179, audio: 'voiceover-final-09.wav', highlight: '🦾 手脚', highlightSub: 'GPT + OpenClaw', subtitles: [{ start: 0, end: 3.5, text: 'GPT有脑子但没手没脚' }, { start: 3.5, end: 5.96, text: 'OpenClaw就是你的手脚' }] },
  { id: 10, type: 'cta', duration: 152, audio: 'voiceover-final-10.wav', highlight: '思维转型', highlightSub: '手艺人 → 农场主', subtitles: [{ start: 0, end: 5.08, text: '从手艺人到农场主，这是AI时代最值钱的思维转型' }] }
];

const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

// 字幕组件
const SubtitleBar = ({ text, opacity, frame }: { text: string; opacity: number; frame: number }) => {
  if (!text || opacity <= 0) return null;
  const y = interpolate(frame, [0, 15], [30, 0], { extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', bottom: 100, left: 60, right: 60, display: 'flex', justifyContent: 'center', opacity, transform: `translateY(${y}px)` }}>
      <div style={{ background: 'rgba(0,0,0,0.75)', padding: '20px 36px', borderRadius: 16, maxWidth: '100%' }}>
        <p style={{ color: colors.light, fontSize: 36, textAlign: 'center', lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{text}</p>
      </div>
    </div>
  );
};

// 中间大字组件
const CenterHighlight = ({ text, subText, frame, fps, type }: any) => {
  const scale = spring({ frame: frame - 15, fps, from: 0.7, to: 1, config: { damping: 12, stiffness: 150 } });
  const isNegative = text.includes('❌');
  const isPositive = text.includes('✅');
  const accentColor = isNegative ? '#ff6b6b' : isPositive ? colors.accent : colors.gold;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: `scale(${scale})` }}>
      <div style={{ background: `linear-gradient(135deg, ${accentColor}20 0%, ${accentColor}10 100%)`, border: `3px solid ${accentColor}`, borderRadius: 24, padding: '40px 60px', boxShadow: `0 0 40px ${accentColor}40` }}>
        <p style={{ color: accentColor, fontSize: 64, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>{text}</p>
      </div>
      {subText && <p style={{ color: colors.light, fontSize: 36, textAlign: 'center', marginTop: 20, opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }) }}>{subText}</p>}
    </div>
  );
};

// 场景渲染器
const SceneRenderer = ({ scene }: { scene: typeof scenes[0] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  // 背景颜色根据类型变化
  const bgColors: Record<string, string> = {
    hook: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
    reveal: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.dark} 100%)`,
    data: `linear-gradient(135deg, ${colors.dark} 0%, #1e3a5f 100%)`,
    list: `linear-gradient(135deg, ${colors.dark} 0%, #2d1f1f 100%)`,
    contrast: `linear-gradient(135deg, #2d1f1f 0%, ${colors.dark} 100%)`,
    solution: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.dark} 100%)`,
    keywords: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
    highlight: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
    cta: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 50%, ${colors.primary}30 100%)`
  };

  // 列表场景特殊处理
  if (scene.type === 'list') {
    const steps = ['早起刷对标', '中午憋文案', '下午回私信', '晚上写计划'];
    const stepDelay = scene.duration / steps.length;
    return (
      <AbsoluteFill style={{ background: bgColors.list, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 60 }}>
        <CenterHighlight text={scene.highlight} subText={scene.highlightSub} frame={frame} fps={fps} type={scene.type} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 60 }}>
          {steps.map((step, i) => {
            const isActive = frame >= i * stepDelay && frame < (i + 1) * stepDelay;
            const isDone = frame >= (i + 1) * stepDelay;
            return (
              <div key={i} style={{ background: isDone ? colors.primary : isActive ? 'rgba(233,69,96,0.3)' : 'rgba(255,255,255,0.1)', padding: '20px 40px', borderRadius: 15, transform: `scale(${isActive ? 1.05 : 1})`, transition: 'all 0.3s' }}>
                <p style={{ color: isDone || isActive ? colors.light : colors.gray, fontSize: 32, fontWeight: isActive ? 'bold' : 'normal', margin: 0 }}>{isDone ? '✓' : i + 1}. {step}</p>
              </div>
            );
          })}
        </div>
        <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} frame={frame} />
      </AbsoluteFill>
    );
  }

  // 解决方案场景特殊处理
  if (scene.type === 'solution') {
    const features = ['自动抓取', '改写文案', '同步发布'];
    return (
      <AbsoluteFill style={{ background: bgColors.solution, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 60 }}>
        <CenterHighlight text={scene.highlight} subText={scene.highlightSub} frame={frame} fps={fps} type={scene.type} />
        <div style={{ display: 'flex', gap: 20, marginTop: 60 }}>
          {features.map((feat, i) => (
            <div key={i} style={{ background: colors.accent, padding: '20px 30px', borderRadius: 12, transform: `scale(${spring({ frame: frame - 60 - i * 10, fps, from: 0, to: 1 })})` }}>
              <p style={{ color: colors.dark, fontSize: 28, fontWeight: 'bold', margin: 0 }}>✓ {feat}</p>
            </div>
          ))}
        </div>
        <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} frame={frame} />
      </AbsoluteFill>
    );
  }

  // 默认场景
  return (
    <AbsoluteFill style={{ background: bgColors[scene.type] || bgColors.hook, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 60 }}>
      <CenterHighlight text={scene.highlight} subText={scene.highlightSub} frame={frame} fps={fps} type={scene.type} />
      <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} frame={frame} />
    </AbsoluteFill>
  );
};

// 开场动画
const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, from: 0.5, to: 1 });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <AbsoluteFill style={{ background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity, transform: `scale(${scale})` }}>
      <div style={{ fontSize: 120, marginBottom: 30, filter: 'drop-shadow(0 0 30px rgba(233,69,96,0.5))' }}>🦐</div>
      <h1 style={{ color: colors.light, fontSize: 56, fontWeight: 'bold', textAlign: 'center' }}>为什么聪明人都在"养虾"？</h1>
    </AbsoluteFill>
  );
};

// 主视频组件
export const FinalVideo = () => {
  let currentFrame = 0;
  return (
    <AbsoluteFill style={{ background: colors.dark }}>
      <Sequence from={0} durationInFrames={30}><Intro /></Sequence>
      {scenes.map((scene, index) => {
        const startFrame = currentFrame + 30;
        currentFrame += scene.duration;
        return (
          <Sequence key={index} from={startFrame} durationInFrames={scene.duration}>
            <SceneRenderer scene={scene} />
            <Audio src={staticFile(`voiceover/${scene.audio}`)} volume={1} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export const VIDEO_DURATION_FINAL = totalDuration + 30;