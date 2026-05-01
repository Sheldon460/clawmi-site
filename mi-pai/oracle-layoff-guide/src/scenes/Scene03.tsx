import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { CONFIG, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from '../config';

export const Scene03 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const springConfig = CONFIG.animation.spring;

  const card1Opacity = spring({ frame: frame - 10, fps, config: springConfig });
  const card2Opacity = spring({ frame: frame - 140, fps, config: springConfig });
  const card3Opacity = spring({ frame: frame - 280, fps, config: springConfig });

  const features = [
    { title: "特征一：高度标准化", desc: "工作可以用SOP完全描述，每一步都有明确标准", color: CONFIG.theme.secondary, icon: "📋", opacity: card1Opacity },
    { title: "特征二：信息孤岛", desc: "技能只在当前公司有价值，离开平台价值归零", color: "#ffcc00", icon: "🏝️", opacity: card2Opacity },
    { title: "特征三：低决策权重", desc: "每天都在做决策，但这些决策真的重要吗？", color: "#ff6b6b", icon: "🎯", opacity: card3Opacity },
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.theme.background, justifyContent: 'center', alignItems: 'center', padding: 80 }}>
      <div style={{ fontSize: 48, fontWeight: 'bold', color: CONFIG.theme.text, marginBottom: 60, fontFamily: 'sans-serif', textAlign: 'center' }}>什么样的工作最容易被"归档"？</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 40, maxWidth: 1600 }}>
        {features.map((feature, index) => (
          <div key={index} style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: `2px solid ${feature.color}`, borderRadius: 20, padding: 40, opacity: feature.opacity, boxShadow: `0 0 30px ${feature.color}40` }}>
            <div style={{ fontSize: 64, marginBottom: 20, textAlign: 'center' }}>{feature.icon}</div>
            <h3 style={{ fontSize: 28, fontWeight: 'bold', color: feature.color, marginBottom: 20, fontFamily: 'sans-serif' }}>{feature.title}</h3>
            <p style={{ fontSize: 22, color: CONFIG.theme.text, opacity: 0.8, lineHeight: 1.6, fontFamily: 'sans-serif' }}>{feature.desc}</p>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', bottom: 120, fontSize: 28, color: CONFIG.theme.secondary, opacity: card3Opacity, fontFamily: 'sans-serif' }}>⚠️ 执行层是最容易被归档的</div>
    </AbsoluteFill>
  );
};
