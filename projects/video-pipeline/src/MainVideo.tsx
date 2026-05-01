import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Sequence, Audio, staticFile } from "remotion";

// 场景配置：每个场景的文本和时长（基于真实音频时长）
const scenes = [
  {
    text: "最近圈子里有个词特别火，叫养虾。",
    subText: "很多人以为我要转行搞水产了，其实我说的是这个。",
    highlight: "🦐 养虾",
    duration: 186, // 9.8s * 30fps - 108 frames transition
    audio: "scene-01.wav"
  },
  {
    text: "它不是真的虾，是一个叫 OpenClaw 的自动化工具。",
    subText: "因为它的图标像个虾螯，大家就叫它小虾。",
    highlight: "OpenClaw",
    duration: 204, // 10.2s * 30fps - 102 frames
    audio: "scene-02.wav"
  },
  {
    text: "为什么聪明人都在养虾？",
    subText: "我给你算笔账。",
    highlight: "💡 为什么",
    duration: 123, // 4.1s * 30fps
    audio: "scene-03.wav"
  },
  {
    text: "以前做自媒体，早起刷对标、中午憋文案、下午回私信、晚上写计划。",
    subText: "你以为是创业，其实是把自己当复印机。",
    highlight: "❌ 复印机",
    duration: 369, // 12.3s * 30fps
    audio: "scene-04.wav"
  },
  {
    text: "养虾之后呢？你喝咖啡、陪家人、睡觉的时候，",
    subText: "后台有几十只小虾在自动抓取素材、改写文案、同步发布。",
    highlight: "✅ 自动化",
    duration: 351, // 11.7s * 30fps
    audio: "scene-05.wav"
  },
  {
    text: "它不睡觉、不喊累、不拿工资。",
    subText: "一人公司的核心逻辑，不是压榨自己，而是批量生产数字分身。",
    highlight: "🚀 数字分身",
    duration: 312, // 10.4s * 30fps
    audio: "scene-06.wav"
  },
  {
    text: "GPT 有脑子但没手没脚，OpenClaw 就是你的手脚。",
    subText: "只要会写简单的指令，它就能帮你干活。",
    highlight: "🦾 手脚",
    duration: 303, // 10.1s * 30fps
    audio: "scene-07.wav"
  },
  {
    text: "从手艺人到农场主，这是 AI 时代最值钱的思维转型。",
    subText: "",
    highlight: "💰 思维转型",
    duration: 183, // 6.1s * 30fps
    audio: "scene-08.wav"
  },
  {
    text: "你现在最大的痛点是什么？",
    subText: "评论区告诉我，下期针对性解答。",
    highlight: "💬 互动",
    duration: 192, // 6.4s * 30fps
    audio: "scene-09.wav"
  }
];

// 计算总时长
const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);

// 场景组件
const Scene = ({ scene, index }: { scene: typeof scenes[0]; index: number }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 入场动画
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 15], [0.9, 1], { extrapolateRight: "clamp" });
  const y = interpolate(frame, [0, 15], [30, 0], { extrapolateRight: "clamp" });
  
  // 高亮闪烁效果
  const highlightOpacity = interpolate(
    frame % 30,
    [0, 15, 30],
    [1, 0.7, 1],
    { extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        background: index % 2 === 0 
          ? "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
          : "linear-gradient(135deg, #0f3460 0%, #16213e 50%, #1a1a2e 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity,
        transform: `scale(${scale}) translateY(${y}px)`,
      }}
    >
      {/* 主标题 */}
      <h1
        style={{
          color: "#fff",
          fontSize: 52,
          fontWeight: "bold",
          textAlign: "center",
          lineHeight: 1.4,
          maxWidth: 900,
          marginBottom: 40,
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        {scene.text}
      </h1>
      
      {/* 副标题 */}
      {scene.subText && (
        <p
          style={{
            color: "#ccc",
            fontSize: 36,
            textAlign: "center",
            lineHeight: 1.6,
            maxWidth: 900,
            marginBottom: 50,
          }}
        >
          {scene.subText}
        </p>
      )}
      
      {/* 高亮标签 */}
      <div
        style={{
          padding: "20px 50px",
          background: "rgba(233, 69, 96, 0.25)",
          borderRadius: 20,
          border: "3px solid #e94560",
          opacity: highlightOpacity,
        }}
      >
        <p
          style={{
            color: "#e94560",
            fontSize: 44,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {scene.highlight}
        </p>
      </div>
      
      {/* 场景编号 */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          right: 40,
          color: "rgba(255,255,255,0.3)",
          fontSize: 24,
        }}
      >
        {index + 1} / {scenes.length}
      </div>
    </AbsoluteFill>
  );
};

// 开场动画
const Intro = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const scale = interpolate(frame, [0, 20], [0.8, 1], { extrapolateRight: "clamp" });
  
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
      <div style={{ fontSize: 120, marginBottom: 40 }}>🦐</div>
      <h1 style={{ color: "#fff", fontSize: 56, fontWeight: "bold", textAlign: "center" }}>
        为什么聪明人都在"养虾"？
      </h1>
      <p style={{ color: "#e94560", fontSize: 36, marginTop: 30, fontWeight: "bold" }}>
        看完这笔账你就懂了
      </p>
    </AbsoluteFill>
  );
};

// 主视频组件
export const MainVideo = () => {
  let currentFrame = 0;
  
  return (
    <AbsoluteFill style={{ background: "#1a1a2e" }}>
      {/* 开场 (1秒) */}
      <Sequence from={0} durationInFrames={30}>
        <Intro />
      </Sequence>
      
      {/* 各场景 */}
      {scenes.map((scene, index) => {
        const startFrame = currentFrame + 30; // 开场后
        currentFrame += scene.duration;
        
        return (
          <Sequence key={index} from={startFrame} durationInFrames={scene.duration}>
            <Scene scene={scene} index={index} />
            <Audio src={staticFile(`voiceover/${scene.audio}`)} volume={1} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

// 导出总时长供 Root.tsx 使用
export const VIDEO_DURATION = totalDuration + 30; // 加上开场