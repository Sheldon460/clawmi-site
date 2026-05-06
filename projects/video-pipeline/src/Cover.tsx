import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

// 封面组件 - 用于生成封面图
export const Cover = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 20], [0.9, 1], { extrapolateRight: "clamp" });
  
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ fontSize: 150, marginBottom: 50 }}>🦐</div>
      <h1 
        style={{ 
          color: "#fff", 
          fontSize: 72, 
          fontWeight: "bold", 
          textAlign: "center",
          lineHeight: 1.3,
          maxWidth: 900,
          marginBottom: 40,
          textShadow: "3px 3px 6px rgba(0,0,0,0.4)",
        }}
      >
        为什么聪明人
        <br />
        都在"养虾"？
      </h1>
      <div
        style={{
          padding: "25px 60px",
          background: "rgba(233, 69, 96, 0.3)",
          borderRadius: 20,
          border: "4px solid #e94560",
          marginTop: 30,
        }}
      >
        <p style={{ color: "#e94560", fontSize: 40, fontWeight: "bold" }}>
          看完这笔账你就懂了
        </p>
      </div>
      <p style={{ color: "#888", fontSize: 28, marginTop: 80 }}>
        @Sheldon · AI工具分享
      </p>
    </AbsoluteFill>
  );
};

// 导出封面时长（单帧即可）
export const COVER_DURATION = 30;