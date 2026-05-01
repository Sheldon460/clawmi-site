import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFIG, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from '../config';

export const Scene01 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const duration = ESTIMATED_DURATIONS['scene-01'] * fps;
  const springConfig = CONFIG.animation.spring;

  const titleOpacity = spring({ frame, fps, config: springConfig });
  const numberScale = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.theme.background, justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ fontSize: 300, fontWeight: 'bold', color: CONFIG.theme.secondary, opacity: 0.15, transform: `scale(${numberScale})`, fontFamily: 'sans-serif' }}>30,000</div>
      <div style={{ textAlign: 'center', opacity: titleOpacity }}>
        <h1 style={{ fontSize: 72, fontWeight: 'bold', color: CONFIG.theme.text, marginBottom: 20, fontFamily: 'sans-serif', textShadow: `0 0 30px ${CONFIG.theme.primary}` }}>甲骨文裁员启示录</h1>
        <h2 style={{ fontSize: 48, fontWeight: 600, color: CONFIG.theme.primary, marginBottom: 40, fontFamily: 'sans-serif' }}>AI时代打工人的3条生存法则</h2>
        <p style={{ fontSize: 32, color: CONFIG.theme.secondary, fontFamily: 'sans-serif' }}>从"被归档"到"不可归档"的转型指南</p>
      </div>
      <div style={{ position: 'absolute', bottom: 150, left: 100, fontSize: 24, color: CONFIG.theme.text, opacity: 0.8, fontFamily: 'sans-serif' }}>
        <div style={{ color: CONFIG.theme.secondary, marginBottom: 10 }}>裁员规模：20,000-30,000人</div>
        <div style={{ color: CONFIG.theme.primary }}>占员工总数：18%</div>
      </div>
    </AbsoluteFill>
  );
};
