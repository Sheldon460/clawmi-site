import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { CONFIG } from "../config";

export const Scene05: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  
  const entrance = spring({ frame, fps, config: CONFIG.spring.smooth });
  const glow = Math.sin(frame / 15) * 0.3 + 0.7;
  
  // 结尾停留效果：最后 2 秒显示 "完" 或品牌标识
  const endingStart = durationInFrames - fps * 2;
  const isEnding = frame > endingStart;
  const endingOpacity = isEnding 
    ? interpolate(frame - endingStart, [0, fps * 0.5], [0, 1])
    : 0;
  
  return (
    <AbsoluteFill
      style={{
        backgroundColor: CONFIG.colors.background,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* 背景光效 */}
      <div
        style={{
          position: "absolute",
          width: "800px",
          height: "400px",
          background: `radial-gradient(ellipse, ${CONFIG.colors.primary}30 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: glow,
        }}
      />
      
      {/* 金句 - 与配音同步 */}
      <div
        style={{
          opacity: interpolate(entrance, [0, 1], [0, 1]),
          transform: `scale(${interpolate(entrance, [0, 1], [0.9, 1])})`,
          textAlign: "center",
          maxWidth: "1000px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 900,
            color: CONFIG.colors.text,
            lineHeight: 1.5,
            textShadow: `0 0 40px ${CONFIG.colors.primary}60`,
          }}
        >
          "创作的本质，不是从零到一的虚空创造，
          <br />
          而是从一到一百的整合优化。"
        </div>
        
        <div
          style={{
            marginTop: 40,
            fontSize: 28,
            color: CONFIG.colors.primary,
            fontWeight: 700,
          }}
        >
          —— Sheldon
        </div>
        
        <div
          style={{
            marginTop: 60,
            fontSize: 20,
            color: CONFIG.colors.textMuted,
          }}
        >
          自动化素材库帮你完成了最枯燥的零到一
          <br />
          你只需要注入灵魂和风格
        </div>
      </div>
      
      {/* 结尾品牌标识 */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          opacity: endingOpacity,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: CONFIG.colors.primary,
            fontWeight: 600,
            letterSpacing: 2,
          }}
        >
          🔥 OpenClaw 爆款素材库 🔥
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 14,
            color: CONFIG.colors.textMuted,
          }}
        >
          让创作从挑选题开始
        </div>
      </div>
    </AbsoluteFill>
  );
};