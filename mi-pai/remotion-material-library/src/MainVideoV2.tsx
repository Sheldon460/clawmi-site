import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence, Audio, staticFile, Easing, spring } from "remotion";

// ============================================================
// 场景配置：基于真实音频时长 + 修正后的字幕
// ============================================================

interface SubtitleSegment {
  start: number;  // 相对于当前场景的起始时间（秒）
  end: number;    // 相对于当前场景的结束时间（秒）
  text: string;   // 修正后的字幕文本
}

interface SceneConfig {
  type: 'hook' | 'highlight' | 'list' | 'contrast' | 'data' | 'cta';
  duration: number; // 帧数
  audio: string;
  subtitles: SubtitleSegment[];
  highlight: string; // 中间大字
  highlightSub?: string; // 大字副标题
}

const scenes: SceneConfig[] = [
  // 场景 1：开头钩子 (3.8s)
  {
    type: 'hook',
    duration: 114, // 3.8s * 30fps
    audio: 'voiceover-v2-01.wav',
    subtitles: [
      { start: 0, end: 3.8, text: '最近圈子里有个词特别火，叫"养虾"' }
    ],
    highlight: '🦐 养虾',
    highlightSub: '到底是什么？'
  },
  
  // 场景 2：核心观点 (4.48s)
  {
    type: 'highlight',
    duration: 134, // 4.48s * 30fps
    audio: 'voiceover-v2-02.wav',
    subtitles: [
      { start: 0, end: 2.24, text: '很多人以为是搞水产' },
      { start: 2.24, end: 4.48, text: '其实是个自动化工具' }
    ],
    highlight: '自动化工具',
    highlightSub: 'OpenClaw'
  },
  
  // 场景 3：提问引入 (3.8s)
  {
    type: 'data',
    duration: 114, // 3.8s * 30fps
    audio: 'voiceover-v2-03.wav',
    subtitles: [
      { start: 0, end: 2.2, text: '为什么聪明人都在养？' },
      { start: 2.2, end: 3.8, text: '给你算笔账' }
    ],
    highlight: '算笔账',
    highlightSub: '聪明人的选择'
  },
  
  // 场景 4：对比场景 - 以前 (7.68s)
  {
    type: 'contrast',
    duration: 230, // 7.68s * 30fps
    audio: 'voiceover-v2-04.wav',
    subtitles: [
      { start: 0, end: 3.84, text: '以前做自媒体：早起刷对标、中午憋文案' },
      { start: 3.84, end: 7.68, text: '下午回私信、晚上写计划' }
    ],
    highlight: '❌ 复印机',
    highlightSub: '你以为是创业？'
  },
  
  // 场景 5：对比场景 - 其实 (5s)
  {
    type: 'contrast',
    duration: 150, // 5s * 30fps
    audio: 'voiceover-v2-05.wav',
    subtitles: [
      { start: 0, end: 2.0, text: '你以为是创业？' },
      { start: 2.0, end: 5.0, text: '其实是把自己当复印机' }
    ],
    highlight: '把自己当复印机',
    highlightSub: ''
  },
  
  // 场景 6：列表场景 - 养虾之后 (12s)
  {
    type: 'list',
    duration: 360, // 12s * 30fps
    audio: 'voiceover-v2-06.wav',
    subtitles: [
      { start: 0, end: 4.0, text: '养虾之后呢？你喝咖啡、陪家人的时候' },
      { start: 4.0, end: 8.0, text: '后台有几十只小虾在自动抓取素材、改写文案' },
      { start: 8.0, end: 12.0, text: '同步发布' }
    ],
    highlight: '✅ 自动化',
    highlightSub: '几十只小虾在工作'
  },
  
  // 场景 7：数据强化 (4s)
  {
    type: 'data',
    duration: 120, // 4s * 30fps
    audio: 'voiceover-v2-07.wav',
    subtitles: [
      { start: 0, end: 2.0, text: '它不睡觉、不喊累' },
      { start: 2.0, end: 4.0, text: '不拿工资' }
    ],
    highlight: '不拿工资',
    highlightSub: '24/7 工作'
  },
  
  // 场景 8：核心观点大字 (6.28s)
  {
    type: 'highlight',
    duration: 188, // 6.28s * 30fps
    audio: 'voiceover-v2-08.wav',
    subtitles: [
      { start: 0, end: 3.68, text: '一人公司的核心逻辑' },
      { start: 3.68, end: 6.28, text: '不是压榨自己，而是批量生产数字分身' }
    ],
    highlight: '数字分身',
    highlightSub: '一人公司的秘密'
  },
  
  // 场景 9：对比场景 - GPT vs OpenClaw (5.26s)
  {
    type: 'contrast',
    duration: 158, // 5.26s * 30fps
    audio: 'voiceover-v2-09.wav',
    subtitles: [
      { start: 0, end: 2.82, text: 'GPT 有脑子但没手没脚' },
      { start: 2.82, end: 5.26, text: 'OpenClaw 就是你的手脚' }
    ],
    highlight: '🦾 手脚',
    highlightSub: 'GPT + OpenClaw'
  },
  
  // 场景 10：结尾 CTA (6s)
  {
    type: 'cta',
    duration: 180, // 6s * 30fps
    audio: 'voiceover-v2-10.wav',
    subtitles: [
      { start: 0, end: 3.0, text: '从手艺人到农场主' },
      { start: 3.0, end: 6.0, text: '这是 AI 时代最值钱的思维转型' }
    ],
    highlight: '思维转型',
    highlightSub: '手艺人 → 农场主'
  }
];

// 计算总时长
const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

// ============================================================
// 配色方案
// ============================================================
const colors = {
  primary: '#e94560',      // 品牌红
  secondary: '#0f3460',    // 深蓝
  accent: '#16c79a',       // 绿色（正向）
  danger: '#ff6b6b',       // 警示红
  dark: '#1a1a2e',         // 深色背景
  light: '#ffffff',        // 白色
  muted: '#8b8b8b'         // 灰色
};

// ============================================================
// 开场动画组件
// ============================================================
const Intro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = spring({ frame, fps, from: 0.5, to: 1 });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      opacity,
      transform: `scale(${scale})`
    }}>
      <div style={{ fontSize: 120, marginBottom: 30, filter: 'drop-shadow(0 0 30px rgba(233,69,96,0.5))' }}>🦐</div>
      <h1 style={{ color: colors.light, fontSize: 56, fontWeight: 'bold', textAlign: 'center' }}>
        为什么聪明人都在"养虾"？
      </h1>
    </AbsoluteFill>
  );
};

// ============================================================
// 字幕组件
// ============================================================
const SubtitleBar = ({ text, opacity }: { text: string; opacity: number }) => {
  if (!text) return null;
  
  return (
    <div style={{
      position: 'absolute',
      bottom: 80,
      left: 40,
      right: 40,
      display: 'flex',
      justifyContent: 'center',
      opacity
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.7)',
        padding: '16px 32px',
        borderRadius: 12,
        maxWidth: '90%'
      }}>
        <p style={{
          color: colors.light,
          fontSize: 38,
          textAlign: 'center',
          lineHeight: 1.5,
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}>
          {text}
        </p>
      </div>
    </div>
  );
};

// ============================================================
// 场景 1: 开头钩子场景
// ============================================================
const HookScene = ({ scene, frame, fps }: { scene: SceneConfig; frame: number; fps: number }) => {
  const progress = frame / scene.duration;
  
  // 字幕动画
  const subtitleOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
  
  // 找到当前字幕
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  // 高亮脉冲
  const pulse = Math.sin(frame * 0.1) * 0.1 + 1;
  
  // 背景动画
  const bgShift = interpolate(frame, [0, scene.duration], [0, 20], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${135 + bgShift}deg, ${colors.dark} 0%, ${colors.secondary} 50%, ${colors.dark} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 高亮卡片 */}
      <div style={{
        background: `linear-gradient(135deg, rgba(233,69,96,0.2) 0%, rgba(233,69,96,0.1) 100%)`,
        border: `3px solid ${colors.primary}`,
        borderRadius: 30,
        padding: '40px 60px',
        transform: `scale(${pulse})`,
        boxShadow: `0 0 40px rgba(233,69,96,0.3)`
      }}>
        <p style={{ color: colors.primary, fontSize: 72, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
          {scene.highlight}
        </p>
        {scene.highlightSub && (
          <p style={{ color: colors.light, fontSize: 36, textAlign: 'center', marginTop: 20, opacity: 0.8 }}>
            {scene.highlightSub}
          </p>
        )}
      </div>
      
      <SubtitleBar text={currentSubtitle?.text || ''} opacity={subtitleOpacity} />
    </AbsoluteFill>
  );
};

// ============================================================
// 场景 2: 核心观点大字场景
// ============================================================
const HighlightScene = ({ scene, frame, fps }: { scene: SceneConfig; frame: number; fps: number }) => {
  const scale = spring({ frame, fps, from: 0.8, to: 1 });
  
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  // 渐变背景
  const gradientAngle = interpolate(frame, [0, scene.duration], [0, 360], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(${gradientAngle}deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 主标题 */}
      <h1 style={{
        color: colors.light,
        fontSize: 64,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 40,
        transform: `scale(${scale})`,
        textShadow: '0 0 30px rgba(233,69,96,0.3)'
      }}>
        {scene.highlight}
      </h1>
      
      {/* 副标题 */}
      {scene.highlightSub && (
        <p style={{
          color: colors.primary,
          fontSize: 42,
          textAlign: 'center',
          marginBottom: 60,
          fontWeight: 'bold'
        }}>
          {scene.highlightSub}
        </p>
      )}
      
      <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} />
    </AbsoluteFill>
  );
};

// ============================================================
// 场景 3: 列表/步骤场景
// ============================================================
const ListScene = ({ scene, frame, fps }: { scene: SceneConfig; frame: number; fps: number }) => {
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  // 分步骤显示
  const steps = ['抓取素材', '改写文案', '同步发布'];
  const stepDuration = scene.duration / steps.length;
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.dark} 0%, #1e3a5f 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 高亮卡片 */}
      <div style={{
        background: 'rgba(22,199,154,0.15)',
        border: `2px solid ${colors.accent}`,
        borderRadius: 20,
        padding: '30px 50px',
        marginBottom: 50
      }}>
        <p style={{ color: colors.accent, fontSize: 56, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
          {scene.highlight}
        </p>
        {scene.highlightSub && (
          <p style={{ color: colors.light, fontSize: 32, textAlign: 'center', marginTop: 15, opacity: 0.8 }}>
            {scene.highlightSub}
          </p>
        )}
      </div>
      
      {/* 步骤列表 */}
      <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
        {steps.map((step, i) => {
          const isActive = frame >= i * stepDuration && frame < (i + 1) * stepDuration;
          const isDone = frame >= (i + 1) * stepDuration;
          
          return (
            <div key={i} style={{
              background: isDone ? colors.accent : isActive ? colors.primary : 'rgba(255,255,255,0.1)',
              padding: '20px 30px',
              borderRadius: 15,
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s'
            }}>
              <p style={{
                color: isDone || isActive ? colors.light : colors.muted,
                fontSize: 28,
                fontWeight: isActive ? 'bold' : 'normal',
                margin: 0
              }}>
                {isDone ? '✓' : i + 1}. {step}
              </p>
            </div>
          );
        })}
      </div>
      
      <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} />
    </AbsoluteFill>
  );
};

// ============================================================
// 场景 4: 对比场景
// ============================================================
const ContrastScene = ({ scene, frame, fps }: { scene: SceneConfig; frame: number; fps: number }) => {
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  // 判断是正向还是负向对比
  const isNegative = scene.highlight.includes('❌') || scene.highlight.includes('复印机');
  const accentColor = isNegative ? colors.danger : colors.accent;
  
  // 滑入动画
  const slideX = spring({ frame, fps, from: -100, to: 0 });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.dark} 0%, ${isNegative ? '#2d1f1f' : '#1f2d1f'} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 对比卡片 */}
      <div style={{
        background: `rgba(${isNegative ? '255,107,107' : '22,199,154'},0.15)`,
        border: `3px solid ${accentColor}`,
        borderRadius: 25,
        padding: '40px 50px',
        transform: `translateX(${slideX}px)`,
        boxShadow: `0 0 30px rgba(${isNegative ? '255,107,107' : '22,199,154'},0.3)`
      }}>
        <p style={{ color: accentColor, fontSize: 64, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
          {scene.highlight}
        </p>
        {scene.highlightSub && (
          <p style={{ color: colors.light, fontSize: 34, textAlign: 'center', marginTop: 20 }}>
            {scene.highlightSub}
          </p>
        )}
      </div>
      
      <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} />
    </AbsoluteFill>
  );
};

// ============================================================
// 场景 5: 数据/关键词强化场景
// ============================================================
const DataScene = ({ scene, frame, fps }: { scene: SceneConfig; frame: number; fps: number }) => {
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  // 数字跳动效果
  const bounce = Math.abs(Math.sin(frame * 0.15)) * 0.1 + 1;
  
  // 粒子背景效果（简化版）
  const particles = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 50 + frame * 0.5) % 1080,
    y: (i * 30 + frame * 0.3) % 1920,
    size: 3 + (i % 5)
  }));
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, #0f3460 0%, ${colors.dark} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 背景粒子 */}
      {particles.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: p.x,
          top: p.y,
          width: p.size,
          height: p.size,
          background: colors.primary,
          borderRadius: '50%',
          opacity: 0.2
        }} />
      ))}
      
      {/* 数据卡片 */}
      <div style={{
        background: 'rgba(233,69,96,0.1)',
        border: `3px solid ${colors.primary}`,
        borderRadius: 20,
        padding: '50px 70px',
        transform: `scale(${bounce})`
      }}>
        <p style={{ color: colors.primary, fontSize: 68, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
          {scene.highlight}
        </p>
        {scene.highlightSub && (
          <p style={{ color: colors.light, fontSize: 36, textAlign: 'center', marginTop: 20 }}>
            {scene.highlightSub}
          </p>
        )}
      </div>
      
      <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} />
    </AbsoluteFill>
  );
};

// ============================================================
// 场景 6: 结尾 CTA 场景
// ============================================================
const CtaScene = ({ scene, frame, fps }: { scene: SceneConfig; frame: number; fps: number }) => {
  const currentTime = frame / fps;
  const currentSubtitle = scene.subtitles.find(s => currentTime >= s.start && currentTime < s.end);
  
  // 闪烁效果
  const flash = interpolate(frame % 30, [0, 15, 30], [1, 1.2, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 50%, ${colors.primary}30 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 主题卡片 */}
      <div style={{
        background: `linear-gradient(135deg, rgba(233,69,96,0.2) 0%, rgba(233,69,96,0.1) 100%)`,
        border: `4px solid ${colors.primary}`,
        borderRadius: 30,
        padding: '50px 70px',
        transform: `scale(${flash})`,
        boxShadow: `0 0 50px rgba(233,69,96,0.4)`
      }}>
        <p style={{ color: colors.primary, fontSize: 72, fontWeight: 'bold', textAlign: 'center', margin: 0 }}>
          {scene.highlight}
        </p>
        {scene.highlightSub && (
          <p style={{ color: colors.light, fontSize: 38, textAlign: 'center', marginTop: 25 }}>
            {scene.highlightSub}
          </p>
        )}
      </div>
      
      {/* CTA 按钮 */}
      <div style={{
        marginTop: 50,
        background: colors.primary,
        padding: '20px 50px',
        borderRadius: 50,
        opacity: interpolate(frame, [scene.duration - 60, scene.duration], [1, 0], { extrapolateRight: 'clamp' })
      }}>
        <p style={{ color: colors.light, fontSize: 32, fontWeight: 'bold', margin: 0 }}>
          关注了解更多 👆
        </p>
      </div>
      
      <SubtitleBar text={currentSubtitle?.text || ''} opacity={1} />
    </AbsoluteFill>
  );
};

// ============================================================
// 场景渲染器
// ============================================================
const SceneRenderer = ({ scene, index }: { scene: SceneConfig; index: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const props = { scene, frame, fps };
  
  switch (scene.type) {
    case 'hook':
      return <HookScene {...props} />;
    case 'highlight':
      return <HighlightScene {...props} />;
    case 'list':
      return <ListScene {...props} />;
    case 'contrast':
      return <ContrastScene {...props} />;
    case 'data':
      return <DataScene {...props} />;
    case 'cta':
      return <CtaScene {...props} />;
    default:
      return <HighlightScene {...props} />;
  }
};

// ============================================================
// 主视频组件
// ============================================================
export const MainVideoV2 = () => {
  let currentFrame = 0;
  
  return (
    <AbsoluteFill style={{ background: colors.dark }}>
      {/* 开场 (1秒) */}
      <Sequence from={0} durationInFrames={30}>
        <Intro />
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

// 导出总时长
export const VIDEO_DURATION_V2 = totalDuration + 30;