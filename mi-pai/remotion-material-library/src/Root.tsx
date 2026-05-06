import { Composition } from "remotion";
import { MainVideo } from "./compositions/MainVideo";
import { CONFIG, ESTIMATED_DURATIONS } from "./config";

const fps = CONFIG.fps;

export const RemotionRoot: React.FC = () => {
  // 封面时长 2 秒
  const coverDuration = 2;
  
  // 场景总时长
  const scenesDuration = Object.values(ESTIMATED_DURATIONS).reduce((sum, d) => sum + d, 0);
  
  // 转场时长（帧）- 5 个转场（封面到 scene1 + 4 个场景间转场）
  const transitionDurationFrames = 10;
  const transitionCount = 5;
  const transitionTotalSeconds = (transitionDurationFrames * transitionCount) / fps;
  
  // 总帧数 = 封面 + 场景 - 转场重叠
  const totalFrames = Math.ceil((coverDuration + scenesDuration - transitionTotalSeconds) * fps);
  
  return (
    <>
      <Composition
        id="MaterialLibrary"
        component={MainVideo}
        durationInFrames={totalFrames}
        fps={fps}
        width={CONFIG.width}
        height={CONFIG.height}
      />
    </>
  );
};