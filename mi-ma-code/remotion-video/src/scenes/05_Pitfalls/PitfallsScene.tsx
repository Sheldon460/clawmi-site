import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { SceneContainer } from "../../components/SceneContainer";
import { AnimatedText } from "../../components/AnimatedText";
import { THEME } from "../../config";

// 警告卡片
const PitfallCard: React.FC<{
  icon: string;
  title: string;
  subtitle: string;
  tips: string[];
  index: number;
}> = ({ icon, title, subtitle, tips, index }) => {
  const frame = useCurrentFrame();
  const delay = 30 + index * 70;
  const row = Math.floor(index / 2);
  const col = index % 2;

  const entranceProgress = interpolate(
    frame,
    [delay, delay + 25],
    [0, 1],
    { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = entranceProgress;
  const translateX = interpolate(entranceProgress, [0, 1], [col === 0 ? -50 : 50, 0]);

  // 闪烁效果
  const flash = Math.sin(frame * 0.05 + index) * 0.03 + 0.97;

  return (
    <div
      style={{
        position: "absolute",
        left: col === 0 ? 80 : 980,
        top: 220 + row * 380,
        width: 820,
        opacity,
        transform: `translateX(${translateX}px) scale(${flash})`,
      }}
    >
      <div
        style={{
          background: "rgba(255, 100, 100, 0.05)",
          border: "1px solid rgba(255, 100, 100, 0.2)",
          borderRadius: "20px",
          padding: "32px",
          display: "flex",
          gap: 24,
        }}
      >
        {/* 图标区域 */}
        <div
          style={{
            width: 80,
            height: 80,
            background: "rgba(255, 100, 100, 0.1)",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            flexShrink: 0,
          }}
        >
          {icon}
        </div>

        {/* 内容区域 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 28,
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
              color: THEME.primary,
              marginBottom: 16,
            }}
          >
            {subtitle}
          </div>

          {/* Tips 列表 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {tips.map((tip, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  opacity: interpolate(
                    frame,
                    [delay + 25 + i * 8, delay + 35 + i * 8],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                  ),
                }}
              >
                <span style={{ color: "#ff6464", fontSize: 16 }}>✓</span>
                <span style={{ color: THEME.text.secondary, fontSize: 16 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const PitfallsScene: React.FC = () => {
  const pitfalls = [
    {
      icon: "⏰",
      title: "错峰运行",
      subtitle: "避开高峰时段",
      tips: ["凌晨执行大任务", "分散任务时间点", "监控系统负载"],
    },
    {
      icon: "🎯",
      title: "主次分明",
      subtitle: "优先级管理",
      tips: ["区分核心与辅助任务", "先执行高价值任务", "合理分配资源"],
    },
    {
      icon: "🔔",
      title: "失败提醒",
      subtitle: "异常处理机制",
      tips: ["设置失败通知", "自动重试机制", "错误日志记录"],
    },
    {
      icon: "📊",
      title: "频率控制",
      subtitle: "资源优化配置",
      tips: ["合理设置执行频率", "避免重复执行", "动态调整策略"],
    },
  ];

  const frame = useCurrentFrame();

  return (
    <SceneContainer durationInFrames={15 * 30}>
      <AbsoluteFill style={{ padding: 80 }}>
        {/* 标题 */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <AnimatedText
            text="⚠️ 避坑清单"
            size="xlarge"
            weight="extrabold"
            align="center"
            glow
            delay={10}
          />
          <AnimatedText
            text="四大注意事项，让自动化更稳定"
            size="medium"
            color="secondary"
            align="center"
            delay={25}
          />
        </div>

        {/* 避坑卡片网格 */}
        <div style={{ position: "relative", height: 800 }}>
          {pitfalls.map((pitfall, index) => (
            <PitfallCard key={index} {...pitfall} index={index} />
          ))}
        </div>

        {/* 底部提示 */}
        <div
          style={{
            position: "absolute",
            bottom: 100,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: interpolate(
              frame,
              [350, 390],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            ),
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: THEME.text.muted,
              background: "rgba(255, 100, 100, 0.1)",
              padding: "12px 24px",
              borderRadius: "8px",
              border: "1px solid rgba(255, 100, 100, 0.2)",
            }}
          >
            💡 掌握这些要点，让你的自动化之路更顺畅
          </span>
        </div>
      </AbsoluteFill>
    </SceneContainer>
  );
};