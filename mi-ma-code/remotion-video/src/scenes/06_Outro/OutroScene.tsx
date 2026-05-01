import { AbsoluteFill, useCurrentFrame, interpolate, Easing, spring } from "remotion";
import { SceneContainer } from "../../components/SceneContainer";
import { AnimatedText } from "../../components/AnimatedText";
import { THEME } from "../../config";

// Logo 动画组件
const AnimatedLogo: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = spring({
    frame,
    fps: 30,
    config: {
      damping: 12,
      stiffness: 200,
      mass: 0.5,
    },
  });

  const rotation = interpolate(
    frame,
    [0, 60],
    [180, 0],
    { easing: Easing.out(Easing.cubic), extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: 200,
        height: 200,
        background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
        borderRadius: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 80,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        boxShadow: `0 20px 60px ${THEME.glow}, 0 0 100px ${THEME.glow}40`,
      }}
    >
      🤖
    </div>
  );
};

// 标语文字动画
const TaglineText: React.FC<{ text: string; delay: number }> = ({ text, delay }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [delay, delay + 20],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const translateY = interpolate(
    frame,
    [delay, delay + 20],
    [30, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) }
  );

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      {text}
    </div>
  );
};

// CTA 按钮
const CTAButton: React.FC = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [200, 220],
    [0.8, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.bounce) }
  );

  const glow = Math.sin(frame * 0.1) * 0.3 + 0.7;

  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.accent})`,
        borderRadius: "16px",
        padding: "20px 60px",
        transform: `scale(${scale})`,
        boxShadow: `0 10px 40px ${THEME.glow}, 0 0 ${glow * 60}px ${THEME.glow}`,
        cursor: "pointer",
      }}
    >
      <span
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: THEME.background,
        }}
      >
        立即体验 →
      </span>
    </div>
  );
};

// 特性标签
const FeatureTag: React.FC<{ text: string; index: number }> = ({ text, index }) => {
  const frame = useCurrentFrame();
  const delay = 240 + index * 15;

  const opacity = interpolate(
    frame,
    [delay, delay + 15],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        background: `${THEME.primary}20`,
        border: `1px solid ${THEME.primary}40`,
        borderRadius: "20px",
        padding: "10px 20px",
        opacity,
      }}
    >
      <span style={{ fontSize: 16, color: THEME.primary }}>{text}</span>
    </div>
  );
};

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer durationInFrames={12 * 30}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
          background: `radial-gradient(ellipse at 50% 50%, ${THEME.primary}10 0%, transparent 60%)`,
        }}
      >
        {/* Logo */}
        <AnimatedLogo />

        {/* 品牌名 */}
        <div style={{ marginTop: 60, textAlign: "center" }}>
          <AnimatedText
            text="OpenClaw"
            size="xlarge"
            weight="extrabold"
            align="center"
            glow
            delay={60}
          />
        </div>

        {/* 标语 */}
        <div
          style={{
            marginTop: 24,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, color: THEME.text.secondary }}>
            <TaglineText text="你的智能自动化管家" delay={90} />
          </div>
        </div>

        {/* 核心价值 */}
        <div style={{ marginTop: 60, textAlign: "center" }}>
          <div style={{ fontSize: 24, color: THEME.text.muted }}>
            <TaglineText text="让 AI 为你工作，释放你的时间" delay={120} />
          </div>
        </div>

        {/* CTA 按钮 */}
        <div style={{ marginTop: 60 }}>
          <CTAButton />
        </div>

        {/* 特性标签 */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginTop: 60,
          }}
        >
          {["Heartbeat", "Cron", "Memory", "自动化"].map((tag, index) => (
            <FeatureTag key={index} text={tag} index={index} />
          ))}
        </div>

        {/* 底部版权 */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(
              frame,
              [300, 330],
              [0, 0.6],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <span style={{ fontSize: 14, color: THEME.text.muted }}>
            © 2026 OpenClaw · 让自动化触手可及
          </span>
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};