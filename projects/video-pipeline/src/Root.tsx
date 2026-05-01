import { Composition } from "remotion";
import { MainVideo, VIDEO_DURATION } from "./MainVideo";
import { MainVideoV2, VIDEO_DURATION_V2 } from "./MainVideoV2";
import { SheldonVideo, VIDEO_DURATION_SHELDON } from "./SheldonVideo";
import { FinalVideo, VIDEO_DURATION_FINAL } from "./FinalVideo";
import { NaturalVideo, VIDEO_DURATION_NATURAL } from "./NaturalVideo";
import { Cover, COVER_DURATION } from "./Cover";

export const RemotionRoot = () => {
  return (
    <>
      <Composition id="Main" component={MainVideo} durationInFrames={VIDEO_DURATION} fps={30} width={1080} height={1920} />
      <Composition id="MainV2" component={MainVideoV2} durationInFrames={VIDEO_DURATION_V2} fps={30} width={1080} height={1920} />
      <Composition id="Sheldon" component={SheldonVideo} durationInFrames={VIDEO_DURATION_SHELDON} fps={30} width={1080} height={1920} />
      <Composition id="Final" component={FinalVideo} durationInFrames={VIDEO_DURATION_FINAL} fps={30} width={1080} height={1920} />
      <Composition id="Natural" component={NaturalVideo} durationInFrames={VIDEO_DURATION_NATURAL} fps={30} width={1080} height={1920} />
      <Composition id="Cover" component={Cover} durationInFrames={COVER_DURATION} fps={30} width={1080} height={1920} />
    </>
  );
};