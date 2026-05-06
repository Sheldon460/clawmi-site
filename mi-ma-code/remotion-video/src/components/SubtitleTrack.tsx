import { useCurrentFrame, interpolate, Easing } from "remotion";
import { THEME, SUBTITLE } from "../config";

interface TimelineScene {
  from: number;
  duration: number;
  to: number;
}

interface Timeline {
  intro: TimelineScene;
  concept: TimelineScene;
  features: TimelineScene;
  workflow: TimelineScene;
  pitfalls: TimelineScene;
  outro: TimelineScene;
}

interface SubtitleTrackProps {
  currentFrame: number;
  timeline: Timeline;
}

// 字幕内容配置
const SUBTITLES: { [key: string]: string[] } = {
  intro: [
    "还在手动点击'运行'?",
    "每次都要盯着屏幕等待?",
    "效率太低了!",
  ],
  concept: [
    "传统工具: 被动等待",
    "OpenClaw: 主动管家",
    "让AI为你工作",
  ],
  features: [
    "心跳系统 - 实时监控",
    "定时任务 - 精准调度",
    "记忆系统 - 持续学习",
  ],
  workflow: [
    "清晨情报 - 自动收集",
    "全天监控 - 实时响应",
    "午间洗稿 - 智能处理",
    "晚间复盘 - 总结优化",
  ],
  pitfalls: [
    "错峰运行 - 避免冲突",
    "主次分明 - 优先级管理",
    "失败提醒 - 异常处理",
    "频率控制 - 资源优化",
  ],
  outro: [
    "OpenClaw",
    "你的智能自动化管家",
    "立即体验",
  ],
};

const getCurrentSubtitle = (frame: number, timeline: Timeline): { text: string; progress: number } | null => {
  const scenes = [
    { key: "intro", ...timeline.intro },
    { key: "concept", ...timeline.concept },
    { key: "features", ...timeline.features },
    { key: "workflow", ...timeline.workflow },
    { key: "pitfalls", ...timeline.pitfalls },
    { key: "outro", ...timeline.outro },
  ];

  for (const scene of scenes) {
    if (frame >= scene.from && frame < scene.to) {
      const subtitles = SUBTITLES[scene.key];
      const sceneProgress = (frame - scene.from) / scene.duration;
      const subtitleIndex = Math.min(
        Math.floor(sceneProgress * subtitles.length),
        subtitles.length - 1
      );
      const subtitleProgress = (sceneProgress * subtitles.length) % 1;

      return {
        text: subtitles[subtitleIndex],
        progress: subtitleProgress,
      };
    }
  }

  return null;
};

export const SubtitleTrack: React.FC<SubtitleTrackProps> = ({
  currentFrame,
  timeline,
}) => {
  const subtitle = getCurrentSubtitle(currentFrame, timeline);

  if (!subtitle) return null;

  const entranceProgress = Math.min(subtitle.progress * 3, 1);
  const exitProgress = subtitle.progress > 0.7
    ? (subtitle.progress - 0.7) / 0.3
    : 0;

  const opacity = interpolate(
    entranceProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 1 - exitProgress],
    { easing: Easing.out(Easing.ease) }
  );

  const translateY = interpolate(
    entranceProgress,
    [0, 1],
    [30, 0],
    { easing: Easing.out(Easing.cubic) }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: SUBTITLE.position.bottom,
        left: SUBTITLE.safeArea.horizontal,
        right: SUBTITLE.safeArea.horizontal,
        textAlign: "center",
        zIndex: 50,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          display: "inline-block",
          ...SUBTITLE.container,
        }}
      >
        <span
          style={{
            fontSize: SUBTITLE.style.fontSize,
            fontFamily: SUBTITLE.style.fontFamily,
            fontWeight: SUBTITLE.style.fontWeight,
            color: SUBTITLE.style.color,
            textShadow: SUBTITLE.style.textShadow,
            WebkitTextStroke: SUBTITLE.style.WebkitTextStroke,
            letterSpacing: SUBTITLE.style.letterSpacing,
          }}
        >
          {subtitle.text}
        </span>
      </div>
    </div>
  );
};