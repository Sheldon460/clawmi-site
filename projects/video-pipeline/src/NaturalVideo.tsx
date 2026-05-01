import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence, Audio, staticFile, spring } from "remotion";

const colors = {
  primary: '#e94560',
  secondary: '#0f3460',
  accent: '#16c79a',
  gold: '#FFD700',
  dark: '#1a1a2e',
  light: '#ffffff',
  gray: '#8b8b8b'
};

const scenes = [
  { id: 1, type: 'hook', duration: 121, audio: 'voiceover-natural-01.wav', highlight: '🦐 养虾', highlightSub: '圈子里特别火', subtitles: [{ start: 0, end: 4.04, text: '哎，最近圈子里有个词特别火，叫养虾' }] },
  { id: 2, type: 'hook', duration: 127, audio: 'voiceover-natural-02.wav', highlight: '水产养殖？', highlightSub: '很多人一听...', subtitles: [{ start: 0, end: 4.24, text: '很多人一听，以为我要转行搞水产养殖了？' }] },
  { id: 3, type: 'reveal', duration: 126, audio: 'voiceover-natural-03.wav', highlight: '其实不是！', highlightSub: '我说的是这个', subtitles: [{ start: 0, end: 4.20, text: '其实不是！我说的是这个——OpenClaw' }] },
  { id: 4, type: 'reveal', duration: 136, audio: 'voiceover-natural-04.wav', highlight: '小虾', highlightSub: '图标像个虾螯', subtitles: [{ start: 0, end: 4.52, text: '因为它的图标像个虾螯，大家就叫它小虾' }] },
  { id: 5, type: 'data', duration: 124, audio: 'voiceover-natural-05.wav', highlight: '算笔账', highlightSub: '聪明人都在养', subtitles: [{ start: 0, end: 4.12, text: '那为什么聪明人都在养呢？我给你算笔账' }] },
  { id: 6, type: 'list', duration: 248, audio: 'voiceover-natural-06.wav', highlight: '以前啊...', highlightSub: '做自媒体', subtitles: [{ start: 0, end: 4.0, text: '以前我们做自媒体啊' }, { start: 4.0, end: 8.28, text: '早起刷对标、中午憋文案、下午回私信、晚上写计划' }] },
  { id: 7, type: 'contrast', duration: 59, audio: 'voiceover-natural-07.wav', highlight: '创业？', highlightSub: '你以为是', subtitles: [{ start: 0, end: 1.96, text: '你以为是创业？' }] },
  { id: 8, type: 'contrast', duration: 95, audio: 'voiceover-natural-08.wav', highlight: '复印机！', highlightSub: '其实是把自己当', subtitles: [{ start: 0, end: 3.16, text: '其实是在把自己当复印机！' }] },
  { id: 9, type: 'transition', duration: 50, audio: 'voiceover-natural-09.wav', highlight: '但...', highlightSub: '养虾之后呢？', subtitles: [{ start: 0, end: 1.68, text: '但养虾之后呢？' }] },
  { id: 10, type: 'solution', duration: 280, audio: 'voiceover-natural-10.wav', highlight: '✅ 自动化', highlightSub: '喝咖啡的时候', subtitles: [{ start: 0, end: 4.5, text: '你喝咖啡、陪家人的时候' }, { start: 4.5, end: 9.32, text: '后台有几十只小虾在自动抓取素材、改写文案、同步发布' }] },
  { id: 11, type: 'keywords', duration: 115, audio: 'voiceover-natural-11.wav', highlight: '还不拿工资！', highlightSub: '不睡觉、不喊累', subtitles: [{ start: 0, end: 3.84, text: '它不睡觉、不喊累、还不拿工资！' }] },
  { id: 12, type: 'highlight', duration: 206, audio: 'voiceover-natural-12.wav', highlight: '数字分身', highlightSub: '核心逻辑', subtitles: [{ start: 0, end: 3.5, text: '一人公司的核心逻辑' }, { start: 3.5, end: 6.88, text: '不是压榨自己，而是批量生产数字分身' }] },
  { id: 13, type: 'contrast', duration: 100, audio: 'voiceover-natural-13.wav', highlight: '但没手没脚啊', highlightSub: 'GPT有脑子', subtitles: [{ start: 0, end: 3.32, text: 'GPT有脑子，但没手没脚啊' }] },
  { id: 14, type: 'reveal', duration: 74, audio: 'voiceover-natural-14.wav', highlight: '手脚！', highlightSub: 'OpenClaw就是你的', subtitles: [{ start: 0, end: 2.48, text: 'OpenClaw就是你的手脚！' }] },
  { id: 15, type: 'cta', duration: 190, audio: 'voiceover-natural-15.wav', highlight: '思维转型', highlightSub: '这才是...', subtitles: [{ start: 0, end: 6.32, text: '从手艺人到农场主，这才是AI时代最值钱的思维转型' }] }
];

const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

const SubtitleBar = ({ text, frame }: { text: string; frame: number }) => {
  if (!text) return null;
  const y = interpolate(frame, [0, 10], [20, 0], { extrapolateRight: 'clamp' });
  return (
    <div style={{ position: 'absolute', bottom: 80, left: 40, right: 40, display: 'flex', justifyContent: 'center', transform: `translateY(${y}px)` }}>
      <div style={{ background: 'rgba(0,0,0,0.8)', padding: '16px 28px', borderRadius: 12, maxWidth: '100%' }}>
        <p style={{ color: colors.light, fontSize: 34, textAlign: 'center', lineHeight: 1.5, margin: 0 }}>{text}</p>
      </div>
    </div>
  );
};

const CenterHighlight = ({ text, subText, frame, fps }: any) => {
  const scale = spring({ frame: frame - 10, fps, from: 0.8, to: 1, config: { damping: 10, stiffness: 100 } });
  const isNegative = text.includes('？') || text.includes('❌');
  const isPositive = text.includes('！') || text.includes('✅');
  const accentColor = isNegative ? '#ff6b6b' : isPositive ? colors.accent : colors.gold;
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', transform: `scale(${scale})` }}>
      <div style={{ background: `linear-gradient(135deg, ${accentColor}25 0%, ${accentColor}10 100%)`, border: `3px solid ${accentColor}`, borderRadius: 20, padding: '35px 50px', boxShadow: `0 0 30px ${accentColor}50` }}>
        <p style={{ color: accentColor, fontSize: 56, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>{text}</p>
      </div>
      {subText && <p style={{ color: colors.light, fontSize: 32, textAlign: 'center', marginTop: 15, opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' }) }}>{subText}</p>}
    </div>
  );
};

const SceneRenderer = ({ scene }: { scene: typeof scenes[0] }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  const bgColors: Record<string, string> = {
    hook: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
    reveal: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.dark} 100%)`,
    data: `linear-gradient(135deg, ${colors.dark} 0%, #1e3a5f 100%)`,
    list: `linear-gradient(135deg, ${colors.dark} 0%, #2d1f1f 100%)`,
    contrast: `linear-gradient(135deg, #2d1f1f 0%, ${colors.dark} 100%)`,
    solution: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.dark} 100%)`,
    keywords: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
    highlight: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
    transition: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.primary}30 100%)`,
    cta: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 50%, ${colors.primary}30 100%)`
  };

  if (scene.type === 'list') {
    const steps = ['早起刷对标', '中午憋文案', '下午回私信', '晚上写计划'];
    return (
      <AbsoluteFill style={{ background: bgColors.list, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 50 }}>
        <CenterHighlight text={scene.highlight} subText={scene.highlightSub} frame={frame} fps={fps} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 50 }}>
          {steps.map((step, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.1)', padding: '18px 35px', borderRadius: 12, borderLeft: `4px solid ${colors.primary}` }}>
              <p style={{ color: colors.light, fontSize: 30, margin: 0 }}>{i + 1}. {step}</p>
            </div>
          ))}
        </div>
        <SubtitleBar text={currentSubtitle?.text || ''} frame={frame} />
      </AbsoluteFill>
    );
  }

  if (scene.type === 'solution') {
    return (
      <AbsoluteFill style={{ background: bgColors.solution, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 50 }}>
        <CenterHighlight text={scene.highlight} subText={scene.highlightSub} frame={frame} fps={fps} />
        <div style={{ display: 'flex', gap: 15, marginTop: 50 }}>
          {['自动抓取', '改写文案', '同步发布'].map((feat, i) => (
            <div key={i} style={{ background: colors.accent, padding: '18px 28px', borderRadius: 12, transform: `scale(${spring({ frame: frame - 60 - i * 10, fps, from: 0, to: 1 })})` }}>
              <p style={{ color: colors.dark, fontSize: 26, fontWeight: 'bold', margin: 0 }}>✓ {feat}</p>
            </div>
          ))}
        </div>
        <SubtitleBar text={currentSubtitle?.text || ''} frame={frame} />
      </AbsoluteFill>
    );
  }

  // 默认场景
  return (
    <AbsoluteFill style={{ background: bgColors[scene.type] || bgColors.hook, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 50 }}>
      <CenterHighlight text={scene.highlight} subText={scene.highlightSub} frame={frame} fps={fps} />
      <SubtitleBar text={currentSubtitle?.text || ''} frame={frame} />
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
      <h1 style={{ color: colors.light, fontSize: 52, fontWeight: 'bold', textAlign: 'center' }}>为什么聪明人都在"养虾"？</h1>
    </AbsoluteFill>
  );
};

// 主视频组件
export const NaturalVideo = () => {
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

export const VIDEO_DURATION_NATURAL = totalDuration + 30;