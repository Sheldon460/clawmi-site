import { AbsoluteFill, Audio, useCurrentFrame, useVideoConfig } from 'remotion';
import { Scene01 } from '../scenes/Scene01';
import { Scene02 } from '../scenes/Scene02';
import { Scene03 } from '../scenes/Scene03';
import { Scene04 } from '../scenes/Scene04';
import { Scene05 } from '../scenes/Scene05';
import { Scene06 } from '../scenes/Scene06';
import { Scene07 } from '../scenes/Scene07';
import { ESTIMATED_DURATIONS, SCENE_ORDER, CONFIG } from '../config';

export const MainVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 计算每个场景的帧数范围
  const sceneRanges = SCENE_ORDER.reduce((acc, sceneId, index) => {
    const startFrame = acc.totalFrames;
    const duration = ESTIMATED_DURATIONS[sceneId] * fps;
    const endFrame = startFrame + duration;

    acc.ranges[sceneId] = { start: startFrame, end: endFrame };
    acc.totalFrames = endFrame;

    return acc;
  }, { ranges: {}, totalFrames: 0 });

  // 计算配音开始时间
  const voiceoverStartTimes = SCENE_ORDER.reduce((acc, sceneId, index) => {
    acc[sceneId] = index > 0
      ? acc[SCENE_ORDER[index - 1]] + ESTIMATED_DURATIONS[SCENE_ORDER[index - 1]]
      : 0;
    return acc;
  }, {});

  // 渲染当前场景
  const renderScene = () => {
    for (const [sceneId, range] of Object.entries(sceneRanges.ranges)) {
      if (frame >= range.start && frame < range.end) {
        switch (sceneId) {
          case 'scene-01':
            return <Scene01 key={sceneId} />;
          case 'scene-02':
            return <Scene02 key={sceneId} />;
          case 'scene-03':
            return <Scene03 key={sceneId} />;
          case 'scene-04':
            return <Scene04 key={sceneId} />;
          case 'scene-05':
            return <Scene05 key={sceneId} />;
          case 'scene-06':
            return <Scene06 key={sceneId} />;
          case 'scene-07':
            return <Scene07 key={sceneId} />;
          default:
            return null;
        }
      }
    }
    return null;
  };

  return (
    <AbsoluteFill>
      {renderScene()}

      {/* 配音 */}
      {SCENE_ORDER.map(sceneId => (
        <Audio
          key={sceneId}
          src={`public/audio/${sceneId}.mp3`}
          startFrom={voiceoverStartTimes[sceneId]}
          volume={CONFIG.audio.voiceVolume}
        />
      ))}

      {/* BGM */}
      <Audio
        src="public/audio/bgm.mp3"
        volume={CONFIG.audio.bgmVolume}
      />
    </AbsoluteFill>
  );
};
