import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { CONFIG } from "../config";

export const Scene04: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const entrance = spring({ frame, fps, config: CONFIG.spring.smooth });
  
  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.colors.background, padding: 60 }}>
      <h2 style={{ fontSize: 40, fontWeight: 800, color: CONFIG.colors.primary, textAlign: "center", marginBottom: 50 }}>
        工作状态的翻天覆地
      </h2>
      
      <div style={{ display: "flex", gap: 60, justifyContent: "center" }}>
        {/* Before */}
        <div style={{
          opacity: interpolate(entrance, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(entrance, [0, 1], [-50, 0])}px)`,
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#ff6b6b", marginBottom: 20, textAlign: "center" }}>
            ❌ 以前
          </div>
          <div style={{
            background: "rgba(255, 50, 50, 0.1)",
            border: "2px solid rgba(255, 50, 50, 0.3)",
            borderRadius: 16,
            padding: 25,
            width: 280,
          }}>
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 15 }}>😫</div>
            <ul style={{ fontSize: 18, color: CONFIG.colors.textMuted, lineHeight: 2 }}>
              <li>找选题 1-2 小时</li>
              <li>焦虑翻手机</li>
              <li>灵感枯竭</li>
            </ul>
          </div>
        </div>
        
        {/* 箭头 */}
        <div style={{
          display: "flex",
          alignItems: "center",
          fontSize: 48,
          color: CONFIG.colors.primary,
          opacity: entrance,
        }}>
          →
        </div>
        
        {/* After */}
        <div style={{
          opacity: interpolate(entrance, [0, 1], [0, 1]),
          transform: `translateX(${interpolate(entrance, [0, 1], [50, 0])}px)`,
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: CONFIG.colors.primary, marginBottom: 20, textAlign: "center" }}>
            ✅ 现在
          </div>
          <div style={{
            background: "rgba(0, 212, 255, 0.1)",
            border: `2px solid ${CONFIG.colors.primary}50`,
            borderRadius: 16,
            padding: 25,
            width: 280,
          }}>
            <div style={{ fontSize: 48, textAlign: "center", marginBottom: 15 }}>🚀</div>
            <ul style={{ fontSize: 18, color: CONFIG.colors.text, lineHeight: 2 }}>
              <li>挑选题 10 分钟</li>
              <li>打开素材库</li>
              <li>十几条选题就绪</li>
            </ul>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};