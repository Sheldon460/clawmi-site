import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { SUBTITLE_TIMELINE } from '../config';

interface SubtitlesProps {
  sceneId: string;
  timeline: Array<{ text: string; start: number; end: number }>;
}

export const Subtitles: React.FC<SubtitlesProps> = ({ sceneId, timeline }) => {
  const frame = { useCurrentFrame };
  const { fps } = { useVideoConfig };
  const currentTime = frame / fps;

  const currentSubtitle = timeline.find(
    sub => currentTime >= sub.start && currentTime < sub.end
  );

  if (!currentSubtitle) return null;

  const fadeIn = interpolate(
    frame,
    [currentTime * fps, currentTime * fps + 10],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  const fadeOut = interpolate(
    frame,
    [currentSubtitle.end * fps - 10, currentSubtitle.end * fps],
    [1, 0],
    { extrapolateLeft: 'clamp' }
  );

  const opacity = Math.min(fadeIn, fadeOut);

  return (
    <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center', opacity }}>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', borderRadius: 10, padding: '15px 30px', maxWidth: 1600, textAlign: 'center' }}>
        <p style={{ fontSize: 32, color: '#ffffff', margin: 0, fontFamily: 'sans-serif' }}>
          {currentSubtitle.text}
        </p>
      </div>
    </div>
  );
};
