import { AbsoluteFill, useCurrentFrame } from "remotion";
import { useMemo } from "react";
import { THEME } from "../config";

// 生成网格线
const generateGrid = () => {
  const lines = [];
  const step = 60;

  // 水平线
  for (let i = 0; i <= 1080; i += step) {
    lines.push(
      <line
        key={`h-${i}`}
        x1="0"
        y1={i}
        x2="1920"
        y2={i}
        stroke={THEME.border}
        strokeWidth="1"
        opacity="0.1"
      />
    );
  }

  // 垂直线
  for (let i = 0; i <= 1920; i += step) {
    lines.push(
      <line
        key={`v-${i}`}
        x1={i}
        y1="0"
        x2={i}
        y2="1080"
        stroke={THEME.border}
        strokeWidth="1"
        opacity="0.1"
      />
    );
  }

  return lines;
};

// 浮动粒子
const FloatingParticles: React.FC = () => {
  const frame = useCurrentFrame();

  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 1920,
      y: Math.random() * 1080,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <svg
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      {particles.map((p) => {
        const y = (p.y - frame * p.speed) % 1080;
        const adjustedY = y < 0 ? y + 1080 : y;

        return (
          <circle
            key={p.id}
            cx={p.x}
            cy={adjustedY}
            r={p.size}
            fill={THEME.primary}
            opacity={p.opacity}
          />
        );
      })}
    </svg>
  );
};

// 光晕效果
const GlowEffect: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame * 0.02) * 0.1 + 0.4;

  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        background: `radial-gradient(ellipse at 50% 50%, ${THEME.glow} ${pulse * 30}%, transparent 70%)`,
        opacity: pulse,
        pointerEvents: "none",
      }}
    />
  );
};

export const Background: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background: THEME.backgroundGradient,
        overflow: "hidden",
      }}
    >
      {/* 网格背景 */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {generateGrid()}
      </svg>

      {/* 浮动粒子 */}
      <FloatingParticles />

      {/* 光晕效果 */}
      <GlowEffect />

      {/* 底部渐变遮罩 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "200px",
          background: "linear-gradient(to top, rgba(10, 10, 15, 0.8), transparent)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
