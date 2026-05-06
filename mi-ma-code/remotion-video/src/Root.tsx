import { Composition } from "remotion";
import { MainVideo } from "./compositions/MainVideo";
import { VIDEO_CONFIG } from "./config";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="OpenClawPromo"
        component={MainVideo}
        durationInFrames={VIDEO_CONFIG.totalDuration}
        fps={VIDEO_CONFIG.fps}
        width={VIDEO_CONFIG.width}
        height={VIDEO_CONFIG.height}
        defaultProps={{
          // 可以在这里传递动态参数
        }}
      />
    </>
  );
};
