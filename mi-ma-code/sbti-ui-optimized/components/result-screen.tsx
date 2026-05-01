'use client'

import { useState } from 'react'
import { ArrowLeft, RotateCcw, ChevronDown, ChevronUp, Share2, Download } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Answer, Result } from '@/types/sbti'
import { calculateResult } from '@/lib/utils'

interface ResultScreenProps {
  answers: Answer[]
  onRestart: () => void
  onBack: () => void
}

export function ResultScreen({ answers, onRestart, onBack }: ResultScreenProps) {
  const [authorExpanded, setAuthorExpanded] = useState(false)

  // 模拟计算结果
  const result: Result = calculateResult(answers)

  return (
    <div className="min-h-screen gradient-bg flex flex-col px-4 animate-fade-in">
      {/* 主内容区 */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* 左侧：海报图 */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-card rounded-3xl shadow-light p-8 md:p-12 animate-slide-up">
                <div className="aspect-square flex flex-col items-center justify-center space-y-4">
                  {/* 人格代码大字 */}
                  <h1 className="text-6xl md:text-8xl font-bold text-primary">
                    {result.code}
                  </h1>

                  {/* 类型名称 */}
                  <p className="text-3xl md:text-4xl font-semibold text-text">
                    {result.typeName}
                  </p>

                  {/* 匹配度 */}
                  <div className="text-center space-y-2">
                    <div className="text-lg text-text/60">匹配度</div>
                    <div className="text-5xl md:text-6xl font-bold text-accent">
                      {result.matchRate}%
                    </div>
                  </div>

                  {/* 装饰线条 */}
                  <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full" />
                </div>
              </div>
            </div>

            {/* 右侧：结果信息 */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {/* 结果卡片 */}
              <div className="bg-card rounded-3xl shadow-light p-6 md:p-8">
                <h2 className="text-2xl md:text-3xl font-bold text-text mb-6">
                  你的 SBTI 人格
                </h2>

                {/* 解读 */}
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-text/80 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                {/* 维度评分列表 */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-text mb-4">维度评分</h3>
                  <div className="space-y-3">
                    {result.dimensions.map((dimension, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm md:text-base text-text/80">
                            {dimension.label}
                          </span>
                          <span className="text-sm font-semibold text-accent">
                            {dimension.score} / {dimension.maxScore}
                          </span>
                        </div>
                        <div className="h-3 bg-secondary rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${(dimension.score / dimension.maxScore) * 100}%`
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 作者折叠卡片 */}
              <div className="bg-card rounded-3xl shadow-light overflow-hidden">
                <button
                  onClick={() => setAuthorExpanded(!authorExpanded)}
                  className="w-full flex items-center justify-between p-6 hover:bg-secondary/30 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm text-text/60">作者信息</div>
                      <div className="text-base font-semibold text-text">点击展开</div>
                    </div>
                  </div>
                  {authorExpanded ? (
                    <ChevronUp className="h-5 w-5 text-text/60" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-text/60" />
                  )}
                </button>

                {authorExpanded && (
                  <div className="px-6 pb-6 animate-fade-in">
                    <div className="border-t border-secondary/30 pt-4 space-y-3">
                      <div className="text-sm text-text/80">
                        <p className="font-semibold text-text mb-2">关于作者</p>
                        <p>
                          SBTI 是一个戏仿版 MBTI 人格测试，用于娱乐和社交分享。
                          请勿将结果作为真实的心理评估依据。
                        </p>
                      </div>
                      <div className="text-sm text-text/60 pt-2">
                        版本 1.0.0 · 仅供娱乐
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* 底部操作按钮 */}
          <div className="mt-8 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* 重新测试 */}
              <button
                onClick={onRestart}
                className={cn(
                  "flex items-center justify-center gap-2",
                  "bg-primary hover:bg-accent text-white",
                  "text-base font-semibold py-3 px-6",
                  "rounded-2xl",
                  "shadow-light hover:shadow-light-hover",
                  "btn-hover",
                  "transition-all duration-300"
                )}
              >
                <RotateCcw className="h-5 w-5" />
                重新测试
              </button>

              {/* 分享结果 */}
              <button
                className={cn(
                  "flex items-center justify-center gap-2",
                  "bg-card hover:bg-secondary/30 text-text",
                  "text-base font-semibold py-3 px-6",
                  "rounded-2xl",
                  "shadow-light hover:shadow-light-hover",
                  "btn-hover",
                  "transition-all duration-300"
                )}
              >
                <Share2 className="h-5 w-5" />
                分享结果
              </button>

              {/* 下载图片 */}
              <button
                className={cn(
                  "flex items-center justify-center gap-2",
                  "bg-card hover:bg-secondary/30 text-text",
                  "text-base font-semibold py-3 px-6",
                  "rounded-2xl",
                  "shadow-light-light hover:shadow-light-hover",
                  "btn-hover",
                  "transition-all duration-300"
                )}
              >
                <Download className="h-5 w-5" />
                保存图片
              </button>
            </div>

            {/* 回到首页 */}
            <button
              onClick={onBack}
              className={cn(
                "w-full flex items-center justify-center gap-2",
                "text-text/60 hover:text-text",
                "text-base py-2 px-6",
                "rounded-2xl",
                "hover:bg-secondary/30",
                "transition-colors duration-200"
              )}
            >
              <ArrowLeft className="h-5 w-5" />
              回到首页
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
