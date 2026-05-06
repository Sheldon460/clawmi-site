import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { CONFIG } from "../config";

interface SubtitleItem {
  text: string;
  startFrame: number;
  endFrame: number;
}

interface SubtitlesProps {
  subtitles: SubtitleItem[];
}

export const Subtitles: React.FC<SubtitlesProps> = ({ subtitles }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 找到当前应该显示的字幕
  const currentSubtitle = subtitles.find(
    (s) => frame >= s.startFrame && frame <= s.endFrame
  );
  
  if (!currentSubtitle) return null;
  
  // 入场动画
  const entrance = spring({
    frame: frame - currentSubtitle.startFrame,
    fps,
    config: CONFIG.spring.smooth,
  });
  
  // 退场动画 (最后 0.5 秒开始退场)
  const exitProgress = interpolate(
    frame,
    [currentSubtitle.endFrame - fps * 0.5, currentSubtitle.endFrame],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  
  const opacity = interpolate(entrance, [0, 1], [0, 1]) * (1 - exitProgress);
  const translateY = interpolate(entrance, [0, 1], [20, 0]);
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 80,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          maxWidth: "85%",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "16px 32px",
            background: "rgba(10, 10, 15, 0.85)",
            borderRadius: 12,
            border: `1px solid ${CONFIG.colors.primary}40`,
          }}
        >
          <span
            style={{
              fontSize: 36,
              fontFamily: "'PingFang SC', 'SF Pro Display', sans-serif",
              fontWeight: 600,
              color: "#ffffff",
              textShadow: `
                0 0 10px rgba(0, 212, 255, 0.5),
                0 0 20px rgba(0, 0, 0, 0.5)
              `,
              lineHeight: 1.5,
            }}
          >
            {currentSubtitle.text}
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
