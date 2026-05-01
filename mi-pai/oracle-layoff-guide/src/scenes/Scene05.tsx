import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFIG, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from '../config';

export const Scene05 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springConfig = CONFIG.animation.spring;

  const titleOpacity = spring({ frame: frame - 10, fps, config: springConfig });
  const flowOpacity = spring({ frame: frame - 100, fps, config: springConfig });
  const decisionOpacity = spring({ frame: frame - 220, fps, config: springConfig });

  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.theme.background, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>
        <div style={{ textAlign: 'center', opacity: titleOpacity }}>
          <div style={{ fontSize: 56, fontWeight: 'bold', color: CONFIG.theme.primary, marginBottom: 15, fontFamily: 'sans-serif' }}>法则二：从"执行"到"决策"的价值跃迁</div>
        </div>
        <div style={{ opacity: flowOpacity, display: 'flex', gap: 60, alignItems: 'flex-start' }}>
          <div style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', border: `2px solid ${CONFIG.theme.secondary}`, borderRadius: 15, padding: 30, width: 400 }}>
            <h3 style={{ fontSize: 28, fontWeight: 'bold', color: CONFIG.theme.secondary, marginBottom: 20, fontFamily: 'sans-serif' }}>❌ 执行者</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}><span>📥</span><span>接到需求</span></div>
              <div style={{ fontSize: 30, color: CONFIG.theme.secondary, textAlign: 'center', margin: '10px 0' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}><span>⌨️</span><span>写代码</span></div>
              <div style={{ fontSize: 30, color: CONFIG.theme.secondary, textAlign: 'center', margin: '10px 0' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}><span>📤</span><span>交付</span></div>
            </div>
          </div>
          <div style={{ backgroundColor: 'rgba(0, 212, 255, 0.1)', border: `2px solid ${CONFIG.theme.primary}`, borderRadius: 15, padding: 30, width: 400, boxShadow: `0 0 30px ${CONFIG.theme.primary}40` }}>
            <h3 style={{ fontSize: 28, fontWeight: 'bold', color: CONFIG.theme.primary, marginBottom: 20, fontFamily: 'sans-serif' }}>✅ 决策者</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}><span>🧠</span><span>理解问题</span></div>
              <div style={{ fontSize: 30, color: CONFIG.theme.primary, textAlign: 'center', margin: '10px 0' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}><span>📊</span><span>评估方案</span></div>
              <div style={{ fontSize: 30, color: CONFIG.theme.primary, textAlign: 'center', margin: '10px 0' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}><span>🎯</span><span>分配资源</span></div>
              <div style={{ fontSize: 30, color: CONFIG.theme.primary, textAlign: 'center', margin: '10px 0' }}>↓</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 22, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}><span>📈</span><span>承担结果</span></div>
            </div>
          </div>
        </div>
        <div style={{ opacity: decisionOpacity, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 30, textAlign: 'center', maxWidth: 900 }}>
          <div style={{ fontSize: 36, color: CONFIG.theme.primary, marginBottom: 15, fontWeight: 'bold', fontFamily: 'sans-serif' }}>决策的本质是承担不确定性</div>
          <p style={{ fontSize: 24, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}>AI最不擅长的，就是在信息不完整时做出判断</p>
        </div>
      </div>
    </AbsoluteFill>
  );
};
