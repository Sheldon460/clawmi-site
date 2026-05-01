import React from "react";
import { AbsoluteFill, Sequence, Audio, staticFile, useVideoConfig } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { Scene01 } from "../scenes/Scene01";
import { Scene02 } from "../scenes/Scene02";
import { Scene03 } from "../scenes/Scene03";
import { Scene04 } from "../scenes/Scene04";
import { Scene05 } from "../scenes/Scene05";
import { CoverScene } from "../scenes/CoverScene";
import { Subtitles } from "../components/Subtitles";
import { CONFIG, SCRIPTS, ESTIMATED_DURATIONS, SUBTITLE_TIMELINE } from "../config";

interface MainVideoProps {
  sceneDurations?: number[];
}

export const MainVideo: React.FC<MainVideoProps> = ({ sceneDurations }) => {
  const { fps } = useVideoConfig();
  
  // 封面展示时长（2秒）
  const coverDuration = 2 * fps;
  
  // 使用实际时长（帧）
  const durations = sceneDurations || [
    Math.ceil(ESTIMATED_DURATIONS["scene-01"] * fps),
    Math.ceil(ESTIMATED_DURATIONS["scene-02"] * fps),
    Math.ceil(ESTIMATED_DURATIONS["scene-03"] * fps),
    Math.ceil(ESTIMATED_DURATIONS["scene-04"] * fps),
    Math.ceil(ESTIMATED_DURATIONS["scene-05"] * fps),
  ];
  
  // 转场时长（帧）- 缩短为 10 帧使衔接更流畅
  const transitionDuration = 10;
  
  // 计算每个场景的起始帧（考虑转场，封面之后开始）
  const sceneStartFrames: number[] = [];
  let currentFrame = coverDuration; // 从封面之后开始
  for (let i = 0; i < durations.length; i++) {
    sceneStartFrames.push(currentFrame);
    currentFrame += durations[i] + (i < durations.length - 1 ? transitionDuration : 0);
  }
  
  // 构建字幕时间轴
  const allSubtitles: { text: string; startFrame: number; endFrame: number }[] = [];
  
  Object.entries(SUBTITLE_TIMELINE).forEach(([sceneKey, subtitles]) => {
    const sceneIndex = parseInt(sceneKey.split("-")[1]) - 1;
    const sceneStart = sceneStartFrames[sceneIndex];
    
    subtitles.forEach((sub) => {
      allSubtitles.push({
        text: sub.text,
        startFrame: sceneStart + Math.ceil(sub.start * fps),
        endFrame: sceneStart + Math.ceil(sub.end * fps),
      });
    });
  });
  
  return (
    <AbsoluteFill>
      <TransitionSeries>
        {/* Cover: 封面展示 */}
        <TransitionSeries.Sequence durationInFrames={coverDuration}>
          <CoverScene />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        
        {/* Scene 1: 开场 */}
        <TransitionSeries.Sequence durationInFrames={durations[0]}>
          <Scene01 />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        
        {/* Scene 2: 痛点 */}
        <TransitionSeries.Sequence durationInFrames={durations[1]}>
          <Scene02 />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        
        {/* Scene 3: 四步流程 */}
        <TransitionSeries.Sequence durationInFrames={durations[2]}>
          <Scene03 />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        
        {/* Scene 4: 实战转变 */}
        <TransitionSeries.Sequence durationInFrames={durations[3]}>
          <Scene04 />
        </TransitionSeries.Sequence>
        
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: transitionDuration })}
        />
        
        {/* Scene 5: 金句总结 */}
        <TransitionSeries.Sequence durationInFrames={durations[4]}>
          <Scene05 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      
      {/* 配音轨道 - 每个场景独立，与场景同步（封面无配音） */}
      {durations.map((duration, i) => {
        const key = `scene-0${i + 1}`;
        return (
          <Sequence key={i} from={sceneStartFrames[i]} durationInFrames={duration}>
            <Audio src={staticFile(`audio/${key}.mp3`)} volume={CONFIG.audio.voiceVolume} />
          </Sequence>
        );
      })}
      
      {/* BGM 轨道（从封面开始） */}
      <Audio src={staticFile("audio/bgm.mp3")} volume={CONFIG.audio.bgmVolume} loop />
      
      {/* 字幕轨道 */}
      <Subtitles subtitles={allSubtitles} />
    </AbsoluteFill>
  );
};
