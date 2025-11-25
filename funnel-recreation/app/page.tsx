"use client"

import { useState } from "react"
import { LandingPage } from "@/components/landing-page"
import { QuizSection } from "@/components/quiz-section"
import { LoadingPage } from "@/components/loading-page"
import { ResultsPage } from "@/components/results-page"

export type FunnelStep = "landing" | "quiz" | "loading" | "results"

export interface UserAnswers {
  [key: number]: {
    value: string
    score: number | null
  }
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<FunnelStep>("landing")
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({})
  const [selectedOffer, setSelectedOffer] = useState<string>("")
  const [testosteroneLevel, setTestosteroneLevel] = useState<number>(50)

  return (
    <div className="min-h-screen bg-black text-white">
      {currentStep === "landing" && <LandingPage onStartQuiz={() => setCurrentStep("quiz")} />}

      {currentStep === "quiz" && (
        <QuizSection
          userAnswers={userAnswers}
          setUserAnswers={setUserAnswers}
          onComplete={(offer, level) => {
            setSelectedOffer(offer)
            setTestosteroneLevel(level)
            setCurrentStep("loading")
          }}
        />
      )}

      {currentStep === "loading" && (
        <LoadingPage
          userAnswers={userAnswers}
          selectedOffer={selectedOffer}
          onComplete={() => setCurrentStep("results")}
        />
      )}

      {currentStep === "results" && (
        <ResultsPage selectedOffer={selectedOffer} testosteroneLevel={testosteroneLevel} userAnswers={userAnswers} />
      )}
    </div>
  )
}
