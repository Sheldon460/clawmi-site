import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFIG, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from '../config';

export const Scene04 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springConfig = CONFIG.animation.spring;

  const titleOpacity = spring({ frame: frame - 10, fps, config: springConfig });
  const tshapeOpacity = spring({ frame: frame - 120, fps, config: springConfig });
  const tipsOpacity = spring({ frame: frame - 240, fps, config: springConfig });

  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.theme.background, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 50 }}>
        <div style={{ textAlign: 'center', opacity: titleOpacity }}>
          <div style={{ fontSize: 56, fontWeight: 'bold', color: CONFIG.theme.primary, marginBottom: 15, fontFamily: 'sans-serif' }}>法则一：从"专精"到"T型"能力结构</div>
        </div>
        <div style={{ opacity: tshapeOpacity, display: 'flex', gap: 80, alignItems: 'center' }}>
          <div style={{ backgroundColor: 'rgba(255, 107, 53, 0.1)', border: `2px solid ${CONFIG.theme.secondary}`, borderRadius: 15, padding: 30, textAlign: 'center', width: 280 }}>
            <div style={{ fontSize: 40, color: CONFIG.theme.secondary, marginBottom: 15, fontFamily: 'sans-serif' }}>📏</div>
            <h3 style={{ fontSize: 26, fontWeight: 'bold', color: CONFIG.theme.secondary, marginBottom: 15, fontFamily: 'sans-serif' }}>专精型</h3>
            <p style={{ fontSize: 20, color: CONFIG.theme.text, opacity: 0.7, fontFamily: 'sans-serif' }}>深度顶尖<br/>知识孤岛</p>
          </div>
          <div style={{ backgroundColor: 'rgba(0, 212, 255, 0.1)', border: `2px solid ${CONFIG.theme.primary}`, borderRadius: 15, padding: 30, textAlign: 'center', width: 280, boxShadow: `0 0 30px ${CONFIG.theme.primary}40` }}>
            <div style={{ fontSize: 40, color: CONFIG.theme.primary, marginBottom: 15, fontFamily: 'sans-serif' }}>📐</div>
            <h3 style={{ fontSize: 26, fontWeight: 'bold', color: CONFIG.theme.primary, marginBottom: 15, fontFamily: 'sans-serif' }}>T型能力</h3>
            <p style={{ fontSize: 20, color: CONFIG.theme.text, opacity: 0.9, fontFamily: 'sans-serif' }}>深度 + 广度<br/>跨领域连接</p>
          </div>
        </div>
        <div style={{ opacity: tipsOpacity, backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 15, padding: 30, textAlign: 'center', maxWidth: 800 }}>
          <div style={{ fontSize: 32, color: CONFIG.theme.primary, marginBottom: 15, fontWeight: 'bold', fontFamily: 'sans-serif' }}>当AI处理技术细节时，这些软技能成了稀缺品：</div>
          <div style={{ fontSize: 24, color: CONFIG.theme.text, fontFamily: 'sans-serif' }}>理解业务 • 判断优先级 • 协调资源 • 跨团队协作</div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
