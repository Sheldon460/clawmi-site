import { Composition } from 'remotion';
import { MainVideo } from './compositions/MainVideo';
import { ESTIMATED_DURATIONS, SCENE_ORDER } from './config';

// 计算总时长
const totalDuration = SCENE_ORDER.reduce(
  (sum, sceneId) => sum + ESTIMATED_DURATIONS[sceneId],
  0
);

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={Math.round(totalDuration * 30)}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
