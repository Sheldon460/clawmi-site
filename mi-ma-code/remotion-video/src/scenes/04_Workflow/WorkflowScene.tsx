import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { SceneContainer } from "../../components/SceneContainer";
import { AnimatedText } from "../../components/AnimatedText";
import { THEME } from "../../config";

// 时间轴节点
const TimelineNode: React.FC<{
  time: string;
  title: string;
  description: string;
  index: number;
  totalNodes: number;
}> = ({ time, title, description, index, totalNodes }) => {
  const frame = useCurrentFrame();
  const delay = 30 + index * 60;

  const entranceProgress = interpolate(
    frame,
    [delay, delay + 30],
    [0, 1],
    { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = entranceProgress;
  const translateX = interpolate(entranceProgress, [0, 1], [-30, 0]);

  // 脉冲效果
  const isActive = frame > delay + 30;
  const pulse = isActive ? Math.sin(frame * 0.1 + index) * 0.05 + 1 : 1;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 40,
        opacity,
        transform: `translateX(${translateX}px) scale(${pulse})`,
      }}
    >
      {/* 时间标签 */}
      <div
        style={{
          width: 140,
          textAlign: "right",
          paddingTop: 8,
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: THEME.primary,
          }}
        >
          {time}
        </div>
      </div>

      {/* 节点圆点 */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: THEME.primary,
          border: `4px solid ${THEME.background}`,
          boxShadow: isActive ? `0 0 20px ${THEME.glow}` : "none",
          marginTop: 12,
          flexShrink: 0,
        }}
      />

      {/* 内容卡片 */}
      <div
        style={{
          background: `linear-gradient(135deg, ${THEME.primary}10, transparent)`,
          border: `1px solid ${THEME.primary}30`,
          borderRadius: "16px",
          padding: "24px 32px",
          flex: 1,
          maxWidth: 400,
        }}
      >
        <div
          style={{
            fontSize: 24,
            fontWeight: "bold",
            color: THEME.text.primary,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 18,
            color: THEME.text.secondary,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
};

// 时间轴连接线
const TimelineLine: React.FC = () => {
  const frame = useCurrentFrame();

  const lineProgress = interpolate(
    frame,
    [60, 420],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        left: 316,
        top: 100,
        width: 4,
        height: 700,
        background: THEME.border,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: `${lineProgress * 100}%`,
          background: `linear-gradient(to bottom, ${THEME.primary}, ${THEME.primaryDark})`,
          boxShadow: `0 0 20px ${THEME.glow}`,
        }}
      />
    </div>
  );
};

export const WorkflowScene: React.FC = () => {
  const workflows = [
    {
      time: "07:00",
      title: "清晨情报",
      description: "自动收集行业资讯、热点趋势，推送精选内容",
    },
    {
      time: "09:00-18:00",
      title: "全天监控",
      description: "实时监控数据变化，异常自动告警，关键事件即时通知",
    },
    {
      time: "12:00",
      title: "午间洗稿",
      description: "智能改写热门内容，生成多版本文案，提升创作效率",
    },
    {
      time: "22:00",
      title: "晚间复盘",
      description: "汇总当日数据，生成运营报告，优化明日策略",
    },
  ];

  return (
    <SceneContainer durationInFrames={25 * 30}>
      <AbsoluteFill style={{ padding: 80 }}>
        {/* 标题 */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <AnimatedText
            text="实战四板斧"
            size="xlarge"
            weight="extrabold"
            align="center"
            glow
            delay={10}
          />
          <AnimatedText
            text="24小时自动化运营闭环"
            size="large"
            color="accent"
            align="center"
            delay={30}
          />
        </div>

        {/* 时间轴 */}
        <div style={{ position: "relative", paddingLeft: 80, marginTop: 40 }}>
          <TimelineLine />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 40,
            }}
          >
            {workflows.map((workflow, index) => (
              <TimelineNode
                key={index}
                {...workflow}
                index={index}
                totalNodes={workflows.length}
              />
            ))}
          </div>
        </div>

        {/* 循环图标 */}
        <div
          style={{
            position: "absolute",
            right: 100,
            bottom: 120,
            width: 200,
            height: 200,
            opacity: interpolate(
              useCurrentFrame(),
              [480, 520],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              border: `3px solid ${THEME.primary}`,
              borderRadius: "50%",
              borderStyle: "dashed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "spin 10s linear infinite",
              color: THEME.primary,
              fontSize: 48,
            }}
          >
            🔄
          </div>
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};