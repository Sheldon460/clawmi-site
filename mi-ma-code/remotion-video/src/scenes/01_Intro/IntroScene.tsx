import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { SceneContainer } from "../../components/SceneContainer";
import { AnimatedText } from "../../components/AnimatedText";
import { TechCard } from "../../components/TechCard";
import { THEME } from "../../config";

// 模拟终端窗口
const TerminalWindow: React.FC = () => {
  const frame = useCurrentFrame();
  const lines = [
    "🔴 手动点击运行中...",
    "⏳ 等待任务完成...",
    "❌ 人工操作效率低下",
  ];

  const currentLineIndex = Math.min(
    Math.floor(frame / 60),
    lines.length - 1
  );

  return (
    <div
      style={{
        background: "rgba(0, 0, 0, 0.8)",
        borderRadius: "12px",
        border: `1px solid ${THEME.border}`,
        overflow: "hidden",
        width: "600px",
      }}
    >
      {/* 终端标题栏 */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          borderBottom: `1px solid ${THEME.border}`,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f56" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ffbd2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#27ca40" }} />
        <span style={{ marginLeft: 16, color: THEME.text.muted, fontSize: 14 }}>终端</span>
      </div>

      {/* 终端内容 */}
      <div style={{ padding: "20px", fontFamily: "monospace", fontSize: 18 }}>
        {lines.slice(0, currentLineIndex + 1).map((line, i) => {
          const opacity = interpolate(
            frame,
            [i * 60, i * 60 + 20],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );

          return (
            <div key={i} style={{ opacity, color: THEME.text.primary, marginBottom: 12 }}>
              <span style={{ color: THEME.primary }}>$ </span>
              {line}
              {i === currentLineIndex && (
                <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0 }}>▌</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const VIDEO_CONFIG = { scenes: { intro: 8 * 30 } };

  return (
    <SceneContainer durationInFrames={VIDEO_CONFIG.scenes.intro}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        {/* 主标题 */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <AnimatedText
            text="还在手动操作?"
            size="xlarge"
            weight="extrabold"
            align="center"
            glow
            delay={10}
          />
          <AnimatedText
            text="效率太低了!"
            size="large"
            color="accent"
            align="center"
            delay={30}
          />
        </div>

        {/* 终端演示 */}
        <TerminalWindow />

        {/* 痛点卡片 */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 80,
          }}
        >
          <TechCard delay={90} highlight>
            <AnimatedText text="重复劳动" size="medium" color="secondary" delay={100} />
          </TechCard>
          <TechCard delay={100}>
            <AnimatedText text="效率低下" size="medium" color="muted" delay={110} />
          </TechCard>
          <TechCard delay={110}>
            <AnimatedText text="容易出错" size="medium" color="muted" delay={120} />
          </TechCard>
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};