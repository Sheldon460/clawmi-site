import { Config } from "@remotion/cli/config";

const config: Config = {
  outDir: "out",
  previewServer: {
    port: 3000,
  },
  concurrency: 4,
  logLevel: "verbose",
  // 视频配置
  video: {
    width: 1920,
    height: 1080,
    fps: 30,
  },
};

export default config;