import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence, Audio, staticFile, spring, Easing } from "remotion";

// ============================================================
// Sheldon "养虾" 第一天短视频 - Remotion 组件
// 时长：~50秒 | 比例：9:16 竖屏
// 风格：极简、科技感、高对比度、动态文字驱动
// ============================================================

// 配色方案
const colors = {
  primary: '#e94560',      // 品牌红
  secondary: '#0f3460',    // 深蓝
  accent: '#16c79a',       // 绿色
  gold: '#FFD700',         // 金色
  dark: '#1a1a2e',         // 深色背景
  light: '#ffffff',        // 白色
  gray: '#8b8b8b',         // 灰色
  aqua: '#00CED1'          // 水蓝色
};

// 场景配置
const scenes = [
  {
    id: 'hook',
    duration: 150, // 5s * 30fps
    audio: 'voiceover-v3-01.wav',
    type: 'hook'
  },
  {
    id: 'pain1',
    duration: 150, // 5s
    audio: 'voiceover-v3-02.wav',
    type: 'pain'
  },
  {
    id: 'pain2',
    duration: 240, // 8s
    audio: 'voiceover-v3-02.wav',
    type: 'pain-transition'
  },
  {
    id: 'solution1',
    duration: 150, // 5s
    audio: 'voiceover-v3-03.wav',
    type: 'solution'
  },
  {
    id: 'solution2',
    duration: 210, // 7s
    audio: 'voiceover-v3-03.wav',
    type: 'solution-highlight'
  },
  {
    id: 'core',
    duration: 120, // 4s
    audio: 'voiceover-v3-04.wav',
    type: 'core-logic'
  },
  {
    id: 'mindset',
    duration: 240, // 8s
    audio: 'voiceover-v3-05.wav',
    type: 'mindset'
  },
  {
    id: 'cta',
    duration: 150, // 5s
    audio: 'voiceover-v3-06.wav',
    type: 'cta'
  }
];

// ============================================================
// 工具组件
// ============================================================

// 弹性文字动画
const SpringText = ({ text, fontSize, color, delay = 0, frame, fps }: any) => {
  const scale = spring({
    frame: frame - delay,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 }
  });
  
  return (
    <div style={{
      fontSize,
      color,
      fontWeight: 'bold',
      textAlign: 'center',
      transform: `scale(${scale})`,
      textShadow: '0 0 30px rgba(233,69,96,0.5)'
    }}>
      {text}
    </div>
  );
};

// 抖动效果
const ShakeText = ({ text, fontSize, color, frame }: any) => {
  const shake = Math.sin(frame * 0.5) * 3;
  
  return (
    <div style={{
      fontSize,
      color,
      fontWeight: 'bold',
      textAlign: 'center',
      transform: `translateX(${shake}px)`,
      textShadow: '0 0 20px rgba(255,0,0,0.5)'
    }}>
      {text}
    </div>
  );
};

// 逐字蹦出效果
const BounceText = ({ text, fontSize, color, startFrame, frame, fps }: any) => {
  const chars = text.split('');
  
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {chars.map((char: string, i: number) => {
        const delay = i * 3;
        const charFrame = frame - startFrame - delay;
        const y = spring({
          frame: charFrame,
          fps,
          from: -50,
          to: 0,
          config: { damping: 12, stiffness: 200 }
        });
        const opacity = interpolate(charFrame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });
        
        return (
          <span key={i} style={{
            fontSize,
            color,
            fontWeight: 'bold',
            transform: `translateY(${y}px)`,
            opacity,
            display: 'inline-block'
          }}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

// ============================================================
// Sequence 1: The Hook (00:00 - 00:05)
// ============================================================
const HookScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 背景渐变动画
  const bgProgress = interpolate(frame, [0, 150], [0, 1], { extrapolateRight: 'clamp' });
  
  // 问号掉落
  const questionY = spring({
    frame: frame - 30,
    fps,
    from: -200,
    to: 100,
    config: { damping: 8, stiffness: 50 }
  });
  
  // 虾螯缩放
  const clawScale = spring({
    frame: frame - 90,
    fps,
    from: 0,
    to: 1,
    config: { damping: 10, stiffness: 100 }
  });
  
  return (
    <AbsoluteFill style={{
      background: frame < 90 
        ? `linear-gradient(180deg, ${colors.aqua}20 0%, ${colors.dark} 100%)`
        : `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 第一阶段：水产养殖背景 */}
      {frame < 90 && (
        <>
          {/* 问号 */}
          <div style={{
            position: 'absolute',
            top: questionY,
            fontSize: 120,
            color: colors.primary,
            fontWeight: 'bold',
            textShadow: '0 0 30px rgba(233,69,96,0.8)'
          }}>
            ?
          </div>
          
          {/* 红色大字 */}
          <div style={{ marginTop: 200 }}>
            <ShakeText 
              text="Sheldon 搞养殖？" 
              fontSize={56} 
              color={colors.primary}
              frame={frame}
            />
          </div>
        </>
      )}
      
      {/* 第二阶段：科技感虾螯 */}
      {frame >= 90 && (
        <>
          {/* 机械虾螯图标 */}
          <div style={{
            fontSize: 150,
            transform: `scale(${clawScale})`,
            filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.6))'
          }}>
            🦐
          </div>
          
          {/* 金色大字 */}
          <div style={{ marginTop: 40 }}>
            <SpringText 
              text='"养虾" = OpenClaw' 
              fontSize={52} 
              color={colors.gold}
              delay={90}
              frame={frame}
              fps={fps}
            />
          </div>
          
          {/* 副标题 */}
          <div style={{ marginTop: 30 }}>
            <p style={{
              fontSize: 32,
              color: colors.light,
              opacity: interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' })
            }}>
              此"虾"非彼虾
            </p>
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};

// ============================================================
// Sequence 2: The Pain Point (00:05 - 00:18)
// ============================================================
const PainScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 时钟旋转
  const clockRotation = interpolate(frame, [0, 300], [0, 720], { extrapolateRight: 'clamp' });
  
  // 灰度效果
  const grayScale = interpolate(frame, [150, 180], [1, 0.3], { extrapolateRight: 'clamp' });
  
  // 恢复彩色
  const colorRestore = interpolate(frame, [210, 240], [0.3, 1], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(180deg, ${colors.dark} 0%, #2d2d3d 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60,
      filter: frame < 210 ? `grayscale(${1 - grayScale})` : `grayscale(${1 - colorRestore})`
    }}>
      {/* 时钟图标 */}
      <div style={{
        fontSize: 100,
        transform: `rotate(${clockRotation}deg)`,
        opacity: frame < 150 ? 1 : 0.3
      }}>
        ⏰
      </div>
      
      {/* 标题 */}
      <div style={{ marginTop: 40 }}>
        <SpringText 
          text="以前的你：24小时复印机" 
          fontSize={44} 
          color={colors.primary}
          delay={0}
          frame={frame}
          fps={fps}
        />
      </div>
      
      {/* 时间线列表 */}
      <div style={{ 
        marginTop: 50, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 20,
        opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        {['早起：找素材', '中午：憋文案', '下午：回私信', '晚上：看数据'].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 30px',
            borderRadius: 10,
            borderLeft: `4px solid ${colors.primary}`,
            transform: `translateX(${interpolate(frame, [90 + i*20, 120 + i*20], [-100, 0], { extrapolateRight: 'clamp' })}px)`
          }}>
            <p style={{ color: colors.light, fontSize: 28, margin: 0 }}>{item}</p>
          </div>
        ))}
      </div>
      
      {/* 断更警告 */}
      {frame >= 150 && (
        <div style={{
          position: 'absolute',
          bottom: 150,
          background: colors.primary,
          padding: '20px 40px',
            borderRadius: 15,
          transform: `scale(${spring({ frame: frame - 150, fps, from: 0, to: 1 })})`
        }}>
          <p style={{ color: colors.light, fontSize: 36, fontWeight: 'bold', margin: 0 }}>
            ⚠️ 规模化能力 = 0
          </p>
        </div>
      )}
      
      {/* 人力消耗战 */}
      {frame >= 210 && (
        <div style={{
          position: 'absolute',
          top: 100,
          right: 60,
          background: 'rgba(255,0,0,0.3)',
          padding: '15px 30px',
          borderRadius: 10,
          border: `2px solid ${colors.primary}`
        }}>
          <p style={{ color: colors.primary, fontSize: 28, fontWeight: 'bold', margin: 0 }}>
            人力消耗战 ❌
          </p>
        </div>
      )}
    </AbsoluteFill>
  );
};

// ============================================================
// Sequence 3: The Solution (00:18 - 00:35)
// ============================================================
const SolutionScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 小虾数量增长
  const shrimpCount = Math.min(Math.floor(frame / 10), 20);
  
  // 金币掉落
  const coins = Array.from({ length: 10 }, (_, i) => ({
    y: interpolate(frame % 60 + i * 6, [0, 60], [-50, 800], { extrapolateRight: 'clamp' }),
    x: 100 + i * 80
  }));
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.dark} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 小虾群 */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
        maxWidth: 800,
        marginBottom: 40
      }}>
        {Array.from({ length: shrimpCount }, (_, i) => (
          <div key={i} style={{
            fontSize: 40,
            transform: `scale(${spring({ frame: frame - i*5, fps, from: 0, to: 1 })})`,
            filter: 'drop-shadow(0 0 10px rgba(0,206,209,0.5))'
          }}>
            🦐
          </div>
        ))}
      </div>
      
      {/* 标题 */}
      <div style={{ marginBottom: 30 }}>
        <SpringText 
          text='一人公司老板都在"养虾"' 
          fontSize={44} 
          color={colors.gold}
          delay={0}
          frame={frame}
          fps={fps}
        />
      </div>
      
      {/* 副标题 */}
      <p style={{
        fontSize: 28,
        color: colors.aqua,
        marginBottom: 40,
        opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        基于大模型的自动化工具
      </p>
      
      {/* 金币动画 */}
      {frame >= 90 && coins.map((coin, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: coin.x,
          top: coin.y,
          fontSize: 30,
          opacity: coin.y > 700 ? 0 : 1
        }}>
          🪙
        </div>
      ))}
      
      {/* 核心卖点 */}
      {frame >= 120 && (
        <div style={{
          display: 'flex',
          gap: 20,
          marginTop: 20
        }}>
          {['不睡觉', '不喊累', '不拿工资'].map((item, i) => (
            <div key={i} style={{
              background: 'rgba(22,199,154,0.2)',
              border: `2px solid ${colors.accent}`,
              padding: '15px 25px',
              borderRadius: 10,
              transform: `scale(${spring({ frame: frame - 120 - i*10, fps, from: 0, to: 1 })})`
            }}>
              <p style={{ color: colors.accent, fontSize: 24, fontWeight: 'bold', margin: 0 }}>
                ✓ {item}
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* 自动化流程 */}
      {frame >= 180 && (
        <div style={{
          display: 'flex',
          gap: 15,
          marginTop: 40,
          opacity: interpolate(frame, [180, 210], [0, 1], { extrapolateRight: 'clamp' })
        }}>
          {['自动抓取', '自动重洗', '自动分类'].map((item, i) => (
            <div key={i} style={{
              background: colors.accent,
              padding: '12px 20px',
              borderRadius: 8
            }}>
              <p style={{ color: colors.dark, fontSize: 22, fontWeight: 'bold', margin: 0 }}>
                {item}
              </p>
            </div>
          ))}
        </div>
      )}
    </AbsoluteFill>
  );
};

// ============================================================
// Sequence 4: Core Logic (00:35 - 00:39)
// ============================================================
const CoreLogicScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.dark} 0%, ${colors.secondary} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 核心逻辑标题 */}
      <p style={{
        fontSize: 32,
        color: colors.gray,
        marginBottom: 30,
        opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        核心逻辑
      </p>
      
      {/* 金句逐字蹦出 */}
      <div style={{ marginBottom: 40 }}>
        <BounceText 
          text='批量生产"数字分身"' 
          fontSize={56} 
          color={colors.gold}
          startFrame={30}
          frame={frame}
          fps={fps}
        />
      </div>
      
      {/* 分身效果 */}
      <div style={{
        display: 'flex',
        gap: 20,
        marginTop: 30
      }}>
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.gold} 100%)`,
            transform: `scale(${spring({ frame: frame - 60 - i*8, fps, from: 0, to: 1 })})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 30
          }}>
            👤
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Sequence 5: Mindset Shift (00:39 - 00:47)
// ============================================================
const MindsetScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 对比滑入
  const leftX = interpolate(frame, [0, 60], [-400, 100], { extrapolateRight: 'clamp' });
  const rightX = interpolate(frame, [30, 90], [400, 100], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill style={{
      background: colors.dark,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 标题 */}
      <p style={{
        fontSize: 36,
        color: colors.light,
        marginBottom: 50,
        opacity: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        思维转型
      </p>
      
      {/* 对比区域 */}
      <div style={{
        display: 'flex',
        gap: 40,
        alignItems: 'center'
      }}>
        {/* 左边：手艺人 */}
        <div style={{
          transform: `translateX(${leftX}px)`,
          opacity: interpolate(frame, [60, 90], [1, 0.3], { extrapolateRight: 'clamp' }),
          textAlign: 'center'
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>👷</div>
          <p style={{ fontSize: 36, color: colors.gray, fontWeight: 'bold' }}>手艺人</p>
          <p style={{ fontSize: 24, color: colors.gray }}>每天搬砖</p>
        </div>
        
        {/* 箭头 */}
        <div style={{
          fontSize: 60,
          color: colors.gold,
          opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `scale(${spring({ frame: frame - 90, fps, from: 0, to: 1 })})`
        }}>
          →
        </div>
        
        {/* 右边：农场主 */}
        <div style={{
          transform: `translateX(${-rightX}px)`,
          opacity: interpolate(frame, [90, 120], [0.3, 1], { extrapolateRight: 'clamp' }),
          textAlign: 'center',
          filter: `drop-shadow(0 0 30px rgba(255,215,0,${interpolate(frame, [90, 150], [0, 0.5], { extrapolateRight: 'clamp' })}))`
        }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🕴️</div>
          <p style={{ fontSize: 36, color: colors.gold, fontWeight: 'bold' }}>农场主</p>
          <p style={{ fontSize: 24, color: colors.light }}>优雅指挥</p>
        </div>
      </div>
      
      {/* 核心竞争力 */}
      <div style={{
        marginTop: 60,
        background: 'rgba(233,69,96,0.2)',
        border: `2px solid ${colors.primary}`,
        padding: '25px 40px',
        borderRadius: 15,
        opacity: interpolate(frame, [150, 180], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        <p style={{ color: colors.light, fontSize: 28, textAlign: 'center', margin: 0 }}>
          核心竞争力：<span style={{ color: colors.gold, fontWeight: 'bold' }}>让工具写得又快又好</span>
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// Sequence 6: CTA (00:47 - 00:52)
// ============================================================
const CtaScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 气泡弹出
  const bubbleScale = spring({
    frame: frame - 30,
    fps,
    from: 0,
    to: 1,
    config: { damping: 8, stiffness: 150 }
  });
  
  return (
    <AbsoluteFill style={{
      background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.dark} 100%)`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60
    }}>
      {/* 互动问题 */}
      <div style={{
        background: colors.primary,
        padding: '30px 50px',
        borderRadius: 20,
        marginBottom: 40,
        transform: `scale(${spring({ frame, fps, from: 0, to: 1 })})`
      }}>
        <p style={{ color: colors.light, fontSize: 36, fontWeight: 'bold', margin: 0 }}>
          👇 你最大的痛点是什么？
        </p>
      </div>
      
      {/* 评论区提示 */}
      <div style={{
        display: 'flex',
        gap: 20,
        marginBottom: 50
      }}>
        {['💬 评论区', '告诉我'].map((item, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 30px',
            borderRadius: 30,
            transform: `scale(${spring({ frame: frame - 30 - i*10, fps, from: 0, to: 1 })})`
          }}>
            <p style={{ color: colors.light, fontSize: 28, margin: 0 }}>{item}</p>
          </div>
        ))}
      </div>
      
      {/* 明天预告 */}
      <div style={{
        background: colors.gold,
        padding: '25px 40px',
        borderRadius: 15,
        marginBottom: 40,
        transform: `scale(${bubbleScale})`
      }}>
        <p style={{ color: colors.dark, fontSize: 32, fontWeight: 'bold', margin: 0 }}>
          📅 明天预告：选"虾"的家
        </p>
        <p style={{ color: colors.dark, fontSize: 24, margin: '10px 0 0 0' }}>
          让你少折腾3天！
        </p>
      </div>
      
      {/* 关注提示 */}
      <div style={{
        marginTop: 20,
        opacity: interpolate(frame, [90, 120], [0, 1], { extrapolateRight: 'clamp' })
      }}>
        <p style={{ color: colors.light, fontSize: 28 }}>
          记得关注 <span style={{ color: colors.gold, fontWeight: 'bold' }}>Sheldon</span>！
        </p>
      </div>
    </AbsoluteFill>
  );
};

// ============================================================
// 场景渲染器
// ============================================================
const SceneRenderer = ({ type }: { type: string }) => {
  switch (type) {
    case 'hook':
      return <HookScene />;
    case 'pain':
    case 'pain-transition':
      return <PainScene />;
    case 'solution':
    case 'solution-highlight':
      return <SolutionScene />;
    case 'core-logic':
      return <CoreLogicScene />;
    case 'mindset':
      return <MindsetScene />;
    case 'cta':
      return <CtaScene />;
    default:
      return <HookScene />;
  }
};

// ============================================================
// 主视频组件
// ============================================================
export const SheldonVideo = () => {
  let currentFrame = 0;
  
  return (
    <AbsoluteFill style={{ background: colors.dark }}>
      {scenes.map((scene, index) => {
        const startFrame = currentFrame;
        currentFrame += scene.duration;
        
        return (
          <Sequence key={index} from={startFrame} durationInFrames={scene.duration}>
            <SceneRenderer type={scene.type} />
            <Audio src={staticFile(`voiceover/${scene.audio}`)} volume={1} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// 导出总时长
export const VIDEO_DURATION_SHELDON = scenes.reduce((sum, s) => sum + s.duration, 0);
