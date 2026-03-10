import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  distDir: 'dist',
  
  images: {
    unoptimized: true,
  },

  // 忽略 TypeScript 类型错误（临时解决子项目冲突）
  typescript: {
    ignoreBuildErrors: true,
  },

  // 忽略 ESLint 错误
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 排除子项目目录
  webpack: (config, { isServer }) => {
    config.watchOptions = {
      ignored: ['**/shared/projects/**'],
    };
    return config;
  },
};

export default nextConfig;
