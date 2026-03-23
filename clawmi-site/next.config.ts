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

  // Turbopack 配置（Next.js 16 默认启用）
  turbopack: {},
};

export default nextConfig;
