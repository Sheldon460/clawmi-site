import { useCurrentFrame } from "remotion";
import { THEME } from "../config";

interface ProgressBarProps {
  totalFrames: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ totalFrames }) => {
  const frame = useCurrentFrame();
  const progress = Math.min((frame / totalFrames) * 100, 100);

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "4px",
        background: "rgba(0, 212, 255, 0.1)",
        zIndex: 100,
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          height: "100%",
          background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.primaryLight})`,
          boxShadow: `0 0 10px ${THEME.glow}`,
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
};
