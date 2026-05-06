import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFIG, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from '../config';

export const Scene06 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springConfig = CONFIG.animation.spring;

  const titleOpacity = spring({ frame: frame - 10, fps, config: springConfig });
  const linearOpacity = spring({ frame: frame - 100, fps, config: springConfig });
  const networkOpacity = spring({ frame: frame - 200, fps, config: springConfig });

  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.theme.background, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50 }}>
        <div style={{ textAlign: 'center', opacity: titleOpacity }}>
          <div style={{ fontSize: 56, fontWeight: 'bold', color: CONFIG.theme.primary, marginBottom: 15, fontFamily: 'sans-serif' }}>法则三：从"依附"到"网络"的职业形态</div>
        </div>
        <div style={{ opacity: linearOpacity, display: 'flex', gap: 80, alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', border: `2px solid ${CONFIG.theme.secondary}`, borderRadius: 15, padding: 30, width: 350 }}>
            <h3 style={{ fontSize: 26, fontWeight: 'bold', color: CONFIG.theme.secondary, marginBottom: 20, fontFamily: 'sans-serif' }}>❌ 线性依附</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['🎓 学校', '🏢 大厂', '📈 晋升', '🏢 更高的大厂', '👴 退休'].map((step, i) => (
                <div key={i} style={{ fontSize: 22, color: CONFIG.theme.text, padding: 10, backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 8, fontFamily: 'sans-serif' }}>{step}</div>
              ))}
            </div>
          </div>
          <div style={{ opacity: networkOpacity, backgroundColor: 'rgba(0, 212, 255, 0.1)', border: `2px solid ${CONFIG.theme.primary}`, borderRadius: 15, padding: 30, width: 350, boxShadow: `0 0 30px ${CONFIG.theme.primary}40` }}>
            <h3 style={{ fontSize: 26, fontWeight: 'bold', color: CONFIG.theme.primary, marginBottom: 20, fontFamily: 'sans-serif' }}>✅ 网络型</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 15, textAlign: 'center' }}>
              <div style={{ fontSize: 40, colSpan: 3, gridColumn: '1 / -1' }}>🌐</div>
              <div style={{ fontSize: 20, color: CONFIG.theme.text, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, borderRadius: 8, fontFamily: 'sans-serif' }}>前同事</div>
              <div style={{ fontSize: 20, color: CONFIG.theme.primary, backgroundColor: 'rgba(0, 212, 255, 0.2)', padding: 10, borderRadius: 8, fontFamily: 'sans-serif', fontWeight: 'bold' }}>你</div>
              <div style={{ fontSize: 20, color: CONFIG.theme.text, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, borderRadius: 8, fontFamily: 'sans-serif' }}>行业朋友</div>
              <div style={{ fontSize: 20, color: CONFIG.theme.text, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, borderRadius: 8, fontFamily: 'sans-serif' }}>开源社区</div>
              <div style={{ fontSize: 20, color: CONFIG.theme.text, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, borderRadius: 8, fontFamily: 'sans-serif' }}>媒体读者</div>
              <div style={{ fontSize: 20, color: CONFIG.theme.text, backgroundColor: 'rgba(255, 255, 255, 0.05)', padding: 10, borderRadius: 8, fontFamily: 'sans-serif' }}>客户</div>
            </div>
          </div>
        </div>
        <div style={{ opacity: networkOpacity, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 30, textAlign: 'center', maxWidth: 800 }}>
          <div style={{ fontSize: 32, color: CONFIG.theme.primary, marginBottom: 15, fontWeight: 'bold', fontFamily: 'sans-serif' }}>你的价值不取决于职级，而取决于连接的数量和质量</div>
          <p style={{ fontSize: 24, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}>最好的职业规划，是永远有选择</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
