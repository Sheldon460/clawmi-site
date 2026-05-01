import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";
import { ReactNode } from "react";

interface SceneContainerProps {
  children: ReactNode;
  durationInFrames: number;
  className?: string;
}

export const SceneContainer: React.FC<SceneContainerProps> = ({
  children,
  durationInFrames,
  className = "",
}) => {
  const frame = useCurrentFrame();

  // 入场动画 (前 10%)
  const entranceEnd = durationInFrames * 0.1;
  const entranceProgress = Math.min(frame / entranceEnd, 1);

  // 出场动画 (后 10%)
  const exitStart = durationInFrames * 0.9;
  const exitProgress = frame > exitStart
    ? (frame - exitStart) / (durationInFrames - exitStart)
    : 0;

  const opacity = interpolate(
    entranceProgress,
    [0, 1],
    [0, 1],
    { easing: Easing.out(Easing.ease) }
  ) * (1 - interpolate(exitProgress, [0, 1], [0, 1], { easing: Easing.in(Easing.ease) }));

  const scale = interpolate(
    entranceProgress,
    [0, 1],
    [0.95, 1],
    { easing: Easing.out(Easing.cubic) }
  );

  const translateY = interpolate(
    entranceProgress,
    [0, 1],
    [20, 0],
    { easing: Easing.out(Easing.cubic) }
  ) + interpolate(exitProgress, [0, 1], [0, -20], { easing: Easing.in(Easing.cubic) });

  return (
    <AbsoluteFill
      style={{
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
      }}
      className={className}
    >
      {children}
    </AbsoluteFill>
  );
};
