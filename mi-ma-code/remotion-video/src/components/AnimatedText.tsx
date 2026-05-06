import { useCurrentFrame, interpolate, Easing } from "remotion";
import { THEME } from "../config";

interface AnimatedTextProps {
  text: string;
  delay?: number;
  className?: string;
  size?: "small" | "medium" | "large" | "xlarge";
  weight?: "normal" | "bold" | "extrabold";
  color?: "primary" | "secondary" | "muted" | "accent";
  align?: "left" | "center" | "right";
  glow?: boolean;
}

const sizeMap = {
  small: 24,
  medium: 32,
  large: 48,
  xlarge: 72,
};

const weightMap = {
  normal: 400,
  bold: 600,
  extrabold: 800,
};

const colorMap = {
  primary: THEME.text.primary,
  secondary: THEME.text.secondary,
  muted: THEME.text.muted,
  accent: THEME.primary,
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  delay = 0,
  className = "",
  size = "medium",
  weight = "bold",
  color = "primary",
  align = "left",
  glow = false,
}) => {
  const frame = useCurrentFrame();

  const entranceProgress = interpolate(
    frame,
    [delay, delay + 20],
    [0, 1],
    { easing: Easing.out(Easing.cubic), extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = entranceProgress;
  const translateY = interpolate(entranceProgress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize: sizeMap[size],
        fontWeight: weightMap[weight],
        color: colorMap[color],
        textAlign: align,
        fontFamily: "'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif",
        lineHeight: 1.4,
        textShadow: glow ? `0 0 30px ${THEME.glow}` : "none",
      }}
      className={className}
    >
      {text}
    </div>
  );
};
