import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6c8d71',      // 清新绿 - 主色
        accent: '#4d6a53',       // 深绿 - 强调色
        secondary: '#dbe8dd',    // 浅绿 - 辅助色
        background: '#f6faf6',   // 淡绿白底 - 背景
        text: '#1e2a22',         // 深绿黑 - 文字
        card: '#ffffff',         // 白 - 卡片
      },
      boxShadow: {
        'light': '0 4px 12px rgba(47, 73, 55, 0.08)',
        'light-hover': '0 8px 20px rgba(47, 73, 55, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
export default config
