import { Config } from "@remotion/cli/config";

const config: Config = {
  outDir: "out",
  previewServer: {
    port: 3000,
  },
  concurrency: 4,
  logLevel: "verbose",
};

export default config;
