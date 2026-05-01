import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { CONFIG } from "../config";

export const Scene01: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 标题入场动画
  const titleEntrance = spring({
    frame,
    fps,
    config: CONFIG.spring.smooth,
  });
  
  // 副标题延迟入场
  const subtitleEntrance = spring({
    frame: frame - fps * 0.5,
    fps,
    config: CONFIG.spring.smooth,
  });
  
  const titleOpacity = interpolate(titleEntrance, [0, 1], [0, 1]);
  const titleScale = interpolate(titleEntrance, [0, 1], [0.8, 1]);
  const titleY = interpolate(titleEntrance, [0, 1], [50, 0]);
  
  const subtitleOpacity = interpolate(subtitleEntrance, [0, 1], [0, 1]);
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CONFIG.colors.background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 背景装饰 */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: `radial-gradient(circle, ${CONFIG.colors.primary}20 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />
      
      {/* 主标题 */}
      <div
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale}) translateY(${titleY}px)`,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: CONFIG.colors.primary,
            textShadow: `0 0 30px ${CONFIG.colors.primary}80`,
            marginBottom: 20,
          }}
        >
          🔥 终极揭秘 🔥
        </div>
        <h1
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: CONFIG.colors.text,
            maxWidth: "900px",
            lineHeight: 1.3,
          }}
        >
          如何用 OpenClaw 搭建爆款素材库
        </h1>
        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: CONFIG.colors.primary,
            marginTop: 10,
          }}
        >
          实现选题自由
        </div>
      </div>
      
      {/* 副标题 */}
      <div
        style={{
          opacity: subtitleOpacity,
          marginTop: 40,
          textAlign: "center",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: CONFIG.colors.textMuted,
          }}
        >
          我是 Sheldon · 7天分享最后一天
        </div>
      </div>
    </AbsoluteFill>
  );
};
