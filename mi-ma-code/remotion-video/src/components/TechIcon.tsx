import { useCurrentFrame, interpolate, Easing } from "remotion";
import { THEME } from "../config";

interface TechIconProps {
  icon: string;
  size?: number;
  delay?: number;
  pulse?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({
  icon,
  size = 64,
  delay = 0,
  pulse = false,
}) => {
  const frame = useCurrentFrame();

  const entranceProgress = interpolate(
    frame,
    [delay, delay + 15],
    [0, 1],
    { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const pulseScale = pulse
    ? 1 + Math.sin(frame * 0.1) * 0.05
    : 1;

  const opacity = entranceProgress;
  const scale = interpolate(entranceProgress, [0, 1], [0.5, 1]) * pulseScale;
  const rotate = interpolate(entranceProgress, [0, 1], [-10, 0]);

  return (
    <div
      style={{
        width: size,
        height: size,
        opacity,
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${THEME.primary}20, ${THEME.primary}05)`,
        borderRadius: "16px",
        border: `2px solid ${THEME.primary}40`,
        boxShadow: pulse ? `0 0 30px ${THEME.glow}` : "none",
        fontSize: size * 0.5,
        color: THEME.primary,
      }}
    >
      {icon}
    </div>
  );
};
