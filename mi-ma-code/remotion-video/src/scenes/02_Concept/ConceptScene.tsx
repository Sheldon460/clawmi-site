import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { SceneContainer } from "../../components/SceneContainer";
import { AnimatedText } from "../../components/AnimatedText";
import { TechCard } from "../../components/TechCard";
import { THEME } from "../../config";

// 对比卡片组件
const ComparisonCard: React.FC<{
  title: string;
  items: string[];
  isHighlight: boolean;
  delay: number;
}> = ({ title, items, isHighlight, delay }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    frame,
    [delay, delay + 20],
    [0.8, 1],
    { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        background: isHighlight
          ? `linear-gradient(135deg, ${THEME.primary}20, ${THEME.primary}05)`
          : "rgba(255, 255, 255, 0.02)",
        border: `2px solid ${isHighlight ? THEME.primary : "rgba(255, 255, 255, 0.1)"}`,
        borderRadius: "24px",
        padding: "40px",
        width: "400px",
        transform: `scale(${scale})`,
        boxShadow: isHighlight ? `0 0 60px ${THEME.glow}` : "none",
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: "bold",
          color: isHighlight ? THEME.primary : THEME.text.muted,
          marginBottom: 32,
          textAlign: "center",
        }}
      >
        {title}
      </div>

      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 20,
            opacity: interpolate(
              frame,
              [delay + 20 + i * 10, delay + 35 + i * 10],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: isHighlight ? THEME.primary : THEME.text.muted,
            }}
          >
            {isHighlight ? "✓" : "✗"}
          </span>
          <span
            style={{
              fontSize: 24,
              color: isHighlight ? THEME.text.primary : THEME.text.muted,
            }}
          >
            {item}
          </span>
        </div>
      ))}
    </div>
  );
};

// VS 标志
const VSIndicator: React.FC = () => {
  const frame = useCurrentFrame();
  const scale = interpolate(
    frame,
    [100, 120],
    [0, 1],
    { easing: Easing.out(Easing.bounce), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        width: 100,
        height: 100,
        background: THEME.primary,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 32,
        fontWeight: "extrabold",
        color: THEME.background,
        transform: `scale(${scale})`,
        boxShadow: `0 0 40px ${THEME.glow}`,
      }}
    >
      VS
    </div>
  );
};

export const ConceptScene: React.FC = () => {
  return (
    <SceneContainer durationInFrames={10 * 30}>
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: 80,
        }}
      >
        {/* 标题 */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <AnimatedText
            text="理念升级"
            size="xlarge"
            weight="extrabold"
            align="center"
            glow
            delay={10}
          />
        </div>

        {/* 对比区域 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 60,
          }}
        >
          <ComparisonCard
            title="传统工具"
            items={["被动等待指令", "需要人工触发", "单一功能"]}
            isHighlight={false}
            delay={40}
          />

          <VSIndicator />

          <ComparisonCard
            title="OpenClaw"
            items={["主动智能管家", "自动执行任务", "全方位自动化"]}
            isHighlight={true}
            delay={60}
          />
        </div>

        {/* 底部标语 */}
        <div style={{ marginTop: 80 }}>
          <AnimatedText
            text="让 AI 为你工作，而不是你为 AI 工作"
            size="large"
            color="accent"
            align="center"
            delay={180}
          />
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};