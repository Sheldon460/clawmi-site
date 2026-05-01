import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { CONFIG } from "../config";

export const Scene02: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const entrance = spring({ frame, fps, config: CONFIG.spring.smooth });
  const opacity = interpolate(entrance, [0, 1], [0, 1]);
  const translateX = interpolate(entrance, [0, 1], [-100, 0]);
  
  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.colors.background, padding: 60 }}>
      {/* 标题 */}
      <div style={{ opacity, transform: `translateX(${translateX}px)`, marginBottom: 40 }}>
        <h2 style={{ fontSize: 42, fontWeight: 800, color: CONFIG.colors.primary }}>
          为什么你总是"选题荒"？
        </h2>
      </div>
      
      {/* 对比卡片 */}
      <div style={{ display: "flex", gap: 40, opacity }}>
        {/* 碎片化堆积 */}
        <div style={{
          flex: 1,
          background: "rgba(255, 50, 50, 0.1)",
          border: "2px solid rgba(255, 50, 50, 0.3)",
          borderRadius: 16,
          padding: 30,
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "#ff6b6b", marginBottom: 20 }}>
            ❌ 碎片化堆积
          </div>
          <ul style={{ fontSize: 20, color: CONFIG.colors.textMuted, lineHeight: 1.8 }}>
            <li>刷到就随手存</li>
            <li>想用时找不到</li>
            <li>想起来已过时</li>
          </ul>
        </div>
        
        {/* 流动的淡水库 */}
        <div style={{
          flex: 1,
          background: "rgba(0, 212, 255, 0.1)",
          border: `2px solid ${CONFIG.colors.primary}50`,
          borderRadius: 16,
          padding: 30,
        }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: CONFIG.colors.primary, marginBottom: 20 }}>
            ✅ 流动的淡水库
          </div>
          <ul style={{ fontSize: 20, color: CONFIG.colors.text, lineHeight: 1.8 }}>
            <li>自动抓取新信息</li>
            <li>智能过滤死水</li>
            <li>源源不断供给</li>
          </ul>
        </div>
      </div>
    </AbsoluteFill>
  );
};
