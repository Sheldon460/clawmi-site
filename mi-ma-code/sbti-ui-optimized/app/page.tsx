'use client'

import { useState } from 'react'
import { HeroScreen } from '@/components/hero-screen'
import { TestScreen } from '@/components/test-screen'
import { ResultScreen } from '@/components/result-screen'
import { Footer } from '@/components/footer'
import { Answer, Screen } from '@/types/sbti'

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('hero')
  const [answers, setAnswers] = useState<Answer[]>([])

  const handleStart = () => {
    setCurrentScreen('test')
  }

  const handleComplete = (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers)
    setCurrentScreen('result')
  }

  const handleBack = () => {
    setCurrentScreen('hero')
    setAnswers([])
  }

  const handleRestart = () => {
    setCurrentScreen('test')
    setAnswers([])
  }

  return (
    <main className="min-h-screen flex flex-col">
      {currentScreen === 'hero' && (
        <>
          <HeroScreen onStart={handleStart} />
          <Footer />
        </>
      )}

      {currentScreen === 'test' && (
        <TestScreen onBack={handleBack} onComplete={handleComplete} />
      )}

      {currentScreen === 'result' && (
        <>
          <ResultScreen
            answers={answers}
            onRestart={handleRestart}
            onBack={handleBack}
          />
          <Footer />
        </>
      )}
    </main>
  )
}
