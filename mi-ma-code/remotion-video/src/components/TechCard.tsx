import { useCurrentFrame, interpolate, Easing } from "remotion";
import { ReactNode } from "react";
import { THEME } from "../config";

interface TechCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  highlight?: boolean;
}

export const TechCard: React.FC<TechCardProps> = ({
  children,
  delay = 0,
  className = "",
  highlight = false,
}) => {
  const frame = useCurrentFrame();

  const entranceProgress = interpolate(
    frame,
    [delay, delay + 15],
    [0, 1],
    { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = entranceProgress;
  const translateY = interpolate(entranceProgress, [0, 1], [40, 0]);
  const scale = interpolate(entranceProgress, [0, 1], [0.9, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        background: highlight
          ? `linear-gradient(135deg, rgba(0, 212, 255, 0.15) 0%, rgba(0, 212, 255, 0.05) 100%)`
          : "rgba(255, 255, 255, 0.03)",
        border: `1px solid ${highlight ? THEME.primary : THEME.border}`,
        borderRadius: "16px",
        padding: "32px",
        boxShadow: highlight
          ? `0 0 40px ${THEME.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.1)`
          : "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
        transition: "all 0.3s ease",
      }}
      className={className}
    >
      {children}
    </div>
  );
};
