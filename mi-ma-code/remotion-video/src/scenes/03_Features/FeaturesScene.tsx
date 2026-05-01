import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { SceneContainer } from "../../components/SceneContainer";
import { AnimatedText } from "../../components/AnimatedText";
import { THEME } from "../../config";

// 功能卡片组件
const FeatureCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  delay: number;
  x: number;
  y: number;
}> = ({ icon, title, subtitle, description, delay, x, y }) => {
  const frame = useCurrentFrame();

  const entranceProgress = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = entranceProgress;
  const scale = interpolate(entranceProgress, [0, 1], [0.5, 1]);
  const translateY = interpolate(entranceProgress, [0, 1], [50, 0]);

  // 脉冲动画
  const pulse = Math.sin(frame * 0.05) * 0.02 + 1;

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 400,
        opacity,
        transform: `scale(${scale * pulse}) translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          background: `linear-gradient(135deg, ${THEME.primary}15, ${THEME.primary}05)`,
          border: `2px solid ${THEME.primary}40`,
          borderRadius: "24px",
          padding: "32px",
          boxShadow: `0 0 40px ${THEME.glow}40`,
        }}
      >
        {/* 图标 */}
        <div
          style={{
            width: 80,
            height: 80,
            background: `linear-gradient(135deg, ${THEME.primary}, ${THEME.primaryDark})`,
            borderRadius: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            marginBottom: 24,
            boxShadow: `0 10px 40px ${THEME.glow}60`,
          }}
        >
          {icon}
        </div>

        {/* 标题 */}
        <div
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: THEME.text.primary,
            marginBottom: 8,
          }}
        >
          {title}
        </div>

        {/* 副标题 */}
        <div
          style={{
            fontSize: 20,
            color: THEME.primary,
            marginBottom: 16,
          }}
        >
          {subtitle}
        </div>

        {/* 描述 */}
        <div
          style={{
            fontSize: 18,
            color: THEME.text.secondary,
            lineHeight: 1.6,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <SceneContainer durationInFrames={20 * 30}>
      <AbsoluteFill style={{ padding: 80 }}>
        {/* 标题 */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <AnimatedText
            text="三件套核心功能"
            size="xlarge"
            weight="extrabold"
            align="center"
            glow
            delay={10}
          />
        </div>

        {/* 功能卡片网格 */}
        <div style={{ position: "relative", height: 700 }}>
          <FeatureCard
            icon="💓"
            title="Heartbeat"
            subtitle="心跳系统"
            description="实时监控系统状态，保持任务持续运行，自动恢复中断的任务"
            delay={30}
            x={80}
            y={50}
          />

          <FeatureCard
            icon="⏰"
            title="Cron"
            subtitle="定时任务"
            description="灵活的定时调度系统，支持复杂的执行规则，精准到秒"
            delay={60}
            x={760}
            y={50}
          />

          <FeatureCard
            icon="🧠"
            title="Memory"
            subtitle="记忆系统"
            description="持久化存储运行数据，上下文学习，越用越智能"
            delay={90}
            x={420}
            y={350}
          />
        </div>

        {/* 连接线动画 */}
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {/* 心跳到定时 */}
          <line
            x1="480"
            y1="200"
            x2="760"
            y2="200"
            stroke={THEME.primary}
            strokeWidth="2"
            strokeDasharray="10,5"
            opacity={interpolate(
              frame,
              [120, 150],
              [0, 0.3],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          />
          {/* 定时到记忆 */}
          <line
            x1="860"
            y1="350"
            x2="720"
            y2="500"
            stroke={THEME.primary}
            strokeWidth="2"
            strokeDasharray="10,5"
            opacity={interpolate(
              frame,
              [150, 180],
              [0, 0.3],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          />
          {/* 记忆到心跳 */}
          <line
            x1="620"
            y1="500"
            x2="380"
            y2="350"
            stroke={THEME.primary}
            strokeWidth="2"
            strokeDasharray="10,5"
            opacity={interpolate(
              frame,
              [180, 210],
              [0, 0.3],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            )}
          />
        </svg>
      </AbsoluteFill>
    </SceneContainer>
  );
};