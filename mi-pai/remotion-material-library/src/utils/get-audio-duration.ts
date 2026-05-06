import { getAudioDurationInSeconds } from "@remotion/media-utils";

export const getAudioDuration = async (src: string): Promise<number> => {
  try {
    return await getAudioDurationInSeconds(src);
  } catch (err) {
    console.warn(`Failed to get duration for ${src}:`, err);
    return 0;
  }
};
