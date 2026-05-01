import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { CONFIG } from "../config";

const steps = [
  { icon: "🕵️", title: "全网监控", desc: "20个头部账号", detail: "新内容自动抓取" },
  { icon: "🔍", title: "热度初筛", desc: "AI判断定位", detail: "不符合直接过滤" },
  { icon: "📝", title: "自动预处理", desc: "拆解+预演", detail: "核心逻辑、情绪钩子" },
  { icon: "📂", title: "同步存档", desc: "飞书/Obsidian", detail: "按标签分类" },
];

export const Scene03: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <AbsoluteFill style={{ backgroundColor: CONFIG.colors.background, padding: 40 }}>
      {/* 标题 */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, color: CONFIG.colors.primary }}>
          🔥 爆款素材库闭环流程
        </h2>
      </div>
      
      {/* 四步流程 */}
      <div style={{ display: "flex", gap: 20, justifyContent: "center" }}>
        {steps.map((step, i) => {
          const stepEntrance = spring({
            frame: frame - i * fps * 0.3,
            fps,
            config: CONFIG.spring.smooth,
          });
          const opacity = interpolate(stepEntrance, [0, 1], [0, 1]);
          const translateY = interpolate(stepEntrance, [0, 1], [50, 0]);
          
          return (
            <div
              key={i}
              style={{
                width: 220,
                background: "rgba(0, 212, 255, 0.1)",
                border: `2px solid ${CONFIG.colors.primary}30`,
                borderRadius: 16,
                padding: 20,
                opacity,
                transform: `translateY(${translateY}px)`,
              }}
            >
              <div style={{ fontSize: 48, textAlign: "center", marginBottom: 10 }}>
                {step.icon}
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: CONFIG.colors.primary, textAlign: "center" }}>
                {step.title}
              </div>
              <div style={{ fontSize: 16, color: CONFIG.colors.text, textAlign: "center", marginTop: 8 }}>
                {step.desc}
              </div>
              <div style={{ fontSize: 14, color: CONFIG.colors.textMuted, textAlign: "center", marginTop: 4 }}>
                {step.detail}
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 箭头连接 */}
      <div style={{ display: "flex", justifyContent: "center", gap: 180, marginTop: -200, pointerEvents: "none" }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ fontSize: 30, color: CONFIG.colors.primary }}>
            →
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
