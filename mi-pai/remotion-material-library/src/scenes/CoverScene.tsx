import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, staticFile } from "remotion";
import { CONFIG } from "../config";

export const CoverScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 入场动画
  const entrance = spring({
    frame,
    fps,
    config: { damping: 150, stiffness: 100 },
  });
  
  // 背景光效呼吸
  const glow = Math.sin(frame / 20) * 0.2 + 0.8;
  
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const scale = interpolate(entrance, [0, 1], [0.95, 1]);
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CONFIG.colors.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* 背景光效 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(ellipse at center, ${CONFIG.colors.primary}15 0%, transparent 60%)`,
          opacity: glow,
        }}
      />
      
      {/* 封面图容器 */}
      <div
        style={{
          opacity,
          transform: `scale(${scale})`,
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {/* 使用生成的封面图 */}
        <img
          src={staticFile("cover.png")}
          alt="Cover"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        
        {/* 渐变遮罩 - 底部 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "200px",
            background: `linear-gradient(to top, ${CONFIG.colors.background} 0%, transparent 100%)`,
          }}
        />
      </div>
      
      {/* 播放按钮提示 */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          opacity: interpolate(frame, [fps, fps * 2], [0, 1]),
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: CONFIG.colors.textMuted,
            letterSpacing: 2,
          }}
        >
          ▶ 点击播放
        </div>
      </div>
    </AbsoluteFill>
  );
};
