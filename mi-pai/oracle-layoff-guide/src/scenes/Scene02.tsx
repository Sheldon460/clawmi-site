import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFIG, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from '../config';

export const Scene02 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springConfig = CONFIG.animation.spring;

  const archivewordOpacity = spring({ frame: frame - 10, fps, config: springConfig });
  const contrastScale = interpolate(frame, [60, 90], [0.5, 1], { extrapolateRight: 'clamp' });
  const arrowOpacity = spring({ frame: frame - 120, fps, config: springConfig });

  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.theme.background, justifyContent: 'center', alignItems: 'center', padding: 100 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>
        <div style={{ textAlign: 'center', opacity: archivewordOpacity }}>
          <h1 style={{ fontSize: 64, fontWeight: 'bold', color: CONFIG.theme.secondary, marginBottom: 20, fontFamily: 'sans-serif', textShadow: `0 0 30px ${CONFIG.theme.secondary}` }}>"归档"</h1>
          <p style={{ fontSize: 32, color: CONFIG.theme.text, opacity: 0.7, fontFamily: 'sans-serif' }}>不是被裁员，是被归档了</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 40, transform: `scale(${contrastScale})` }}>
          <div style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', border: `2px solid ${CONFIG.theme.secondary}`, borderRadius: 20, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 72, fontWeight: 'bold', color: CONFIG.theme.secondary, fontFamily: 'sans-serif' }}>47</div>
            <div style={{ fontSize: 24, color: CONFIG.theme.text, marginTop: 10, fontFamily: 'sans-serif' }}>资深DBA</div>
          </div>
          <div style={{ fontSize: 48, color: CONFIG.theme.primary, opacity: arrowOpacity }}>→</div>
          <div style={{ backgroundColor: 'rgba(0, 212, 255, 0.1)', border: `2px solid ${CONFIG.theme.primary}`, borderRadius: 20, padding: 40, textAlign: 'center' }}>
            <div style={{ fontSize: 72, fontWeight: 'bold', color: CONFIG.theme.primary, fontFamily: 'sans-serif' }}>3人</div>
            <div style={{ fontSize: 24, color: CONFIG.theme.text, marginTop: 10, fontFamily: 'sans-serif' }}>+ AI系统</div>
            <div style={{ fontSize: 20, color: CONFIG.theme.primary, marginTop: 10, fontFamily: 'sans-serif' }}>94%自动化</div>
          </div>
        </div>
        <div style={{ fontSize: 28, color: CONFIG.theme.secondary, textAlign: 'center', opacity: arrowOpacity, fontFamily: 'sans-serif', fontStyle: 'italic' }}>"这不是优化，这是结构性替代"</div>
      </div>
    </AbsoluteFill>
  );
};
