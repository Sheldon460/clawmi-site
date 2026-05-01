'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Question, Answer } from '@/types/sbti'
import { SAMPLE_QUESTIONS } from '@/lib/utils'

interface TestScreenProps {
  onBack: () => void
  onComplete: (answers: Answer[]) => void
}

export function TestScreen({ onBack, onComplete }: TestScreenProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selectedOption, setSelectedOption] = useState<number | null>(null)

  const totalQuestions = 31 // 可以从实际数据中获取
  const currentQuestion = SAMPLE_QUESTIONS[currentQuestionIndex % SAMPLE_QUESTIONS.length]

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
  }

  const handleNext = () => {
    if (selectedOption === null) return

    // 保存当前答案
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      selectedOption
    }
    const updatedAnswers = [...answers, newAnswer]
    setAnswers(updatedAnswers)

    // 清除选择
    setSelectedOption(null)

    // 进入下一题或完成
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      onComplete(updatedAnswers)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
      // 恢复上一题的选择
      const prevAnswer = answers[answers.length - 1]
      if (prevAnswer && prevAnswer.questionId === SAMPLE_QUESTIONS[currentQuestionIndex - 1]?.id) {
        setSelectedOption(prevAnswer.selectedOption)
        setAnswers(answers.slice(0, -1))
      }
    } else {
      onBack()
    }
  }

  const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100

  return (
    <div className="min-h-screen gradient-bg flex flex-col px-4 animate-fade-in">
      {/* 顶部进度条 */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-secondary/30">
        <div className="max-w-2xl mx-auto">
          {/* 进度条 */}
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* 进度文字 */}
          <div className="flex justify-between items-center py-3">
            <button
              onClick={handlePrevious}
              className={cn(
                "flex items-center gap-2 text-text/60 hover:text-text",
                "transition-colors duration-200",
                "px-3 py-1.5 rounded-xl",
                "hover:bg-secondary/50"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">
                {currentQuestionIndex === 0 ? '返回首页' : '上一题'}
              </span>
            </button>

            <span className="text-lg font-semibold text-text">
              {currentQuestionIndex + 1} / {totalQuestions}
            </span>

            <div className="w-20" /> {/* 占位，保持居中 */}
          </div>
        </div>
      </div>

      {/* 问题区域 */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full space-y-6 animate-slide-up">
          {/* 问题卡片 */}
          <div className="bg-card rounded-3xl p-6 md:p-8 shadow-light">
            <div className="space-y-4">
              {/* 问题标题 */}
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {currentQuestionIndex + 1}
                  </span>
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-text leading-relaxed">
                  {currentQuestion.text}
                </h2>
              </div>

              {/* 选项列表 */}
              <div className="space-y-3 pt-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(index)}
                    className={cn(
                      "w-full text-left p-4 rounded-2xl",
                      "border-2 transition-all duration-200",
                      "hover:border-primary hover:bg-primary/5",
                      selectedOption === index
                        ? "border-primary bg-primary/10 text-text"
                        : "border-secondary/30 bg-secondary/20 text-text/80"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn(
                        "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                        selectedOption === index
                          ? "border-primary bg-primary"
                          : "border-secondary/50"
                      )}>
                        {selectedOption === index && (
                          <div className="w-2.5 h-2.5 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-base md:text-lg">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 下一题按钮 */}
          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={cn(
              "w-full flex items-center justify-center gap-3",
              "bg-primary hover:bg-accent text-white",
              "text-lg font-semibold py-4 px-6",
              "rounded-2xl",
              "shadow-light hover:shadow-light-hover",
              "btn-hover",
              "transition-all duration-300",
              selectedOption === null && "opacity-50 cursor-not-allowed hover:transform-none"
            )}
          >
            {currentQuestionIndex < totalQuestions - 1 ? '下一题' : '查看结果'}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
