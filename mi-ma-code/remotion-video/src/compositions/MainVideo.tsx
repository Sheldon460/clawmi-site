import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, Audio, staticFile } from "remotion";
import { useMemo } from "react";
import { VIDEO_CONFIG } from "../config";

// 场景组件
import { IntroScene } from "../scenes/01_Intro/IntroScene";
import { ConceptScene } from "../scenes/02_Concept/ConceptScene";
import { FeaturesScene } from "../scenes/03_Features/FeaturesScene";
import { WorkflowScene } from "../scenes/04_Workflow/WorkflowScene";
import { PitfallsScene } from "../scenes/05_Pitfalls/PitfallsScene";
import { OutroScene } from "../scenes/06_Outro/OutroScene";

// 全局组件
import { Background } from "../components/Background";
import { ProgressBar } from "../components/ProgressBar";
import { SubtitleTrack } from "../components/SubtitleTrack";

// 计算场景时间线
const calculateTimeline = () => {
  const { scenes } = VIDEO_CONFIG;
  let currentFrame = 0;

  return {
    intro: { from: currentFrame, duration: scenes.intro, to: currentFrame + scenes.intro },
    concept: { from: currentFrame + scenes.intro, duration: scenes.concept, to: currentFrame + scenes.intro + scenes.concept },
    features: { from: currentFrame + scenes.intro + scenes.concept, duration: scenes.features, to: currentFrame + scenes.intro + scenes.concept + scenes.features },
    workflow: { from: currentFrame + scenes.intro + scenes.concept + scenes.features, duration: scenes.workflow, to: currentFrame + scenes.intro + scenes.concept + scenes.features + scenes.workflow },
    pitfalls: { from: currentFrame + scenes.intro + scenes.concept + scenes.features + scenes.workflow, duration: scenes.pitfalls, to: currentFrame + scenes.intro + scenes.concept + scenes.features + scenes.workflow + scenes.pitfalls },
    outro: { from: currentFrame + scenes.intro + scenes.concept + scenes.features + scenes.workflow + scenes.pitfalls, duration: scenes.outro, to: currentFrame + VIDEO_CONFIG.totalDuration },
  };
};

export const MainVideo: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const timeline = useMemo(() => calculateTimeline(), []);

  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      {/* 全局背景 */}
      <Background />

      {/* 场景序列 */}
      <Sequence from={timeline.intro.from} durationInFrames={timeline.intro.duration}>
        <IntroScene />
      </Sequence>

      <Sequence from={timeline.concept.from} durationInFrames={timeline.concept.duration}>
        <ConceptScene />
      </Sequence>

      <Sequence from={timeline.features.from} durationInFrames={timeline.features.duration}>
        <FeaturesScene />
      </Sequence>

      <Sequence from={timeline.workflow.from} durationInFrames={timeline.workflow.duration}>
        <WorkflowScene />
      </Sequence>

      <Sequence from={timeline.pitfalls.from} durationInFrames={timeline.pitfalls.duration}>
        <PitfallsScene />
      </Sequence>

      <Sequence from={timeline.outro.from} durationInFrames={timeline.outro.duration}>
        <OutroScene />
      </Sequence>

      {/* 全局进度条 */}
      <ProgressBar totalFrames={durationInFrames} />

      {/* 字幕轨道 */}
      <SubtitleTrack currentFrame={frame} timeline={timeline} />

      {/* BGM 音频轨道 - 循环播放，音量与配音均衡 */}
      <Audio
        src={staticFile("bgm.mp3")}
        volume={0.15}
        loop={true}
      />
    </AbsoluteFill>
  );
};
