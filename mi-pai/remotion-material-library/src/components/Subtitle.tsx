import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { CONFIG } from "../config";

interface SubtitleProps {
  text: string;
  startFrame: number;
  endFrame: number;
}

export const Subtitle: React.FC<SubtitleProps> = ({ text, startFrame, endFrame }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 入场动画
  const entrance = spring({
    frame: frame - startFrame,
    fps,
    config: CONFIG.spring.smooth,
  });
  
  // 退场动画
  const exitProgress = interpolate(
    frame,
    [endFrame - fps, endFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const opacity = interpolate(entrance, [0, 1], [0, 1]) * (1 - exitProgress);
  const translateY = interpolate(entrance, [0, 1], [30, 0]);
  
  // 只在显示范围内渲染
  if (frame < startFrame || frame > endFrame) return null;
  
  return (
    <div
      style={{
        position: "absolute",
        bottom: CONFIG.subtitle.position.bottom,
        width: "100%",
        textAlign: "center",
        zIndex: 100,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: CONFIG.subtitle.padding,
          background: CONFIG.subtitle.background,
          borderRadius: CONFIG.subtitle.borderRadius,
          maxWidth: "80%",
        }}
      >
        <span
          style={{
            fontSize: CONFIG.subtitle.fontSize,
            fontFamily: CONFIG.subtitle.fontFamily,
            fontWeight: CONFIG.subtitle.fontWeight,
            color: CONFIG.subtitle.color,
            textShadow: CONFIG.subtitle.textShadow,
            lineHeight: 1.4,
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
};
