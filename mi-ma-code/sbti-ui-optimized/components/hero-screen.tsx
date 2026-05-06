'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroScreenProps {
  onStart: () => void
}

export function HeroScreen({ onStart }: HeroScreenProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center px-4 animate-fade-in">
      {/* 主内容区 */}
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* 大标题 */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-text leading-tight">
            MBTI已经过时，
            <span className="text-primary block mt-2">SBTI来了。</span>
          </h1>

          {/* 副标题 */}
          <p className="text-xl md:text-2xl text-accent/80 font-light">
            31道荒诞幽默的戏仿人格测试
          </p>
          <p className="text-lg text-text/60">
            测出你的隐藏人格——死者、草者、吗喽、屌丝...
          </p>
        </div>

        {/* 开始测试按钮 */}
        <div className="pt-8">
          <button
            onClick={onStart}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "group relative inline-flex items-center gap-3",
              "bg-primary hover:bg-accent text-white",
              "text-xl font-semibold px-12 py-4",
              "rounded-3xl",
              "shadow-light hover:shadow-light-hover",
              "btn-hover",
              "transition-all duration-300"
            )}
          >
            开始测试
            <ArrowRight
              className={cn(
                "h-6 w-6 transition-transform duration-300",
                isHovered && "translate-x-1"
              )}
            />
          </button>
        </div>

        {/* 底部提示 */}
        <p className="text-sm text-text/40 pt-8">
          仅供娱乐 · 请勿认真
        </p>
      </div>
    </div>
  )
}
