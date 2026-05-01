import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFIG, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from '../config';

export const Scene07 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springConfig = CONFIG.animation.spring;

  const quoteOpacity = spring({ frame: frame - 10, fps, config: springConfig });
  const actionOpacity = spring({ frame: frame - 180, fps, config: springConfig });

  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.theme.background, justifyContent: 'center', alignItems: 'center', padding: 100 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60, maxWidth: 1400 }}>
        <div style={{ opacity: quoteOpacity, textAlign: 'center' }}>
          <div style={{ fontSize: 72, fontWeight: 'bold', color: CONFIG.theme.text, marginBottom: 40, fontFamily: 'sans-serif', textShadow: `0 0 40px ${CONFIG.theme.primary}`, lineHeight: 1.3 }}>AI时代没有铁饭碗</div>
          <div style={{ fontSize: 72, fontWeight: 'bold', color: CONFIG.theme.primary, fontFamily: 'sans-serif', textShadow: `0 0 40px ${CONFIG.theme.primary}`, lineHeight: 1.3 }}>只有铁能力</div>
        </div>
        <div style={{ opacity: actionOpacity, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 30, width: '100%' }}>
          {[
            { icon: '☕', text: '约一个跨部门同事喝咖啡', color: CONFIG.theme.secondary },
            { icon: '✍️', text: '写一篇文章分享经验', color: 'ffd700' },
            { icon: '💡', text: '主动提出一个技术方案', color: CONFIG.theme.primary }
          ].map((action, i) => (
            <div key={i} style={{ backgroundColor: `rgba(255, 255, 255, 0.05)`, border: `2px solid ${action.color}`, borderRadius: 15, padding: 25, textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 15 }}>{action.icon}</div>
              <div style={{ fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}>{action.text}</div>
            </div>
          ))}
        </div>
        <div style={{ opacity: actionOpacity, fontSize: 28, color: CONFIG.theme.secondary, textAlign: 'center', fontFamily: 'sans-serif', fontStyle: 'italic' }}>改变不需要惊天动地，只需要持续发生</div>
      </div>
    </AbsoluteFill>
  );
};
