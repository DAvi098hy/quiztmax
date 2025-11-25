"use client"

import { useEffect, useState } from "react"
import type { UserAnswers } from "@/app/page"

interface LoadingPageProps {
  userAnswers: UserAnswers
  selectedOffer: string
  onComplete: () => void
}

const offerData: Record<string, { increase: number; cmGain: string }> = {
  "https://pay.wiapy.com/3DLET2_rC5": { increase: 130, cmGain: "3,1" },
  "https://pay.wiapy.com/W4P6mi6Aye": { increase: 250, cmGain: "4,5" },
  "https://pay.wiapy.com/nyh0tJhU1T": { increase: 370, cmGain: "6,2" },
  "https://pay.wiapy.com/yu7fZsN00_": { increase: 500, cmGain: "7,4" },
}

export function LoadingPage({ userAnswers, selectedOffer, onComplete }: LoadingPageProps) {
  const [percentage, setPercentage] = useState(0)
  const [activeSteps, setActiveSteps] = useState<number[]>([])

  const calculateTestosteroneLevel = () => {
    let totalScore = 0
    let questionsScored = 0

    for (let i = 1; i < 9; i++) {
      if (userAnswers[i] && userAnswers[i].score !== null) {
        totalScore += userAnswers[i].score!
        questionsScored++
      }
    }

    if (questionsScored === 0) return 50

    const maxScore = questionsScored * 4
    const minScore = questionsScored * 1

    if (maxScore === minScore) return 50

    const percentage = 20 + ((totalScore - minScore) / (maxScore - minScore)) * (95 - 20)
    return Math.round(percentage)
  }

  const currentLevel = calculateTestosteroneLevel()
  const offerInfo = offerData[selectedOffer]
  const currentCm = userAnswers[7]?.value || "N/A"
  const totalCm =
    currentCm !== "N/A"
      ? (Number.parseFloat(currentCm.replace(",", ".")) + Number.parseFloat(offerInfo.cmGain.replace(",", ".")))
          .toFixed(1)
          .replace(".", ",")
      : "N/A"

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 500)
          return 100
        }
        return prev + 1
      })
    }, 80)

    return () => clearInterval(interval)
  }, [onComplete])

  useEffect(() => {
    if (percentage >= 10) setActiveSteps((prev) => [...new Set([...prev, 0])])
    if (percentage >= 30) setActiveSteps((prev) => [...new Set([...prev, 1])])
    if (percentage >= 50) setActiveSteps((prev) => [...new Set([...prev, 2])])
    if (percentage >= 70) setActiveSteps((prev) => [...new Set([...prev, 3])])
    if (percentage >= 90) setActiveSteps((prev) => [...new Set([...prev, 4])])
  }, [percentage])

  const steps = [
    "Analisando seu perfil hormonal...",
    "Calculando seu potencial de aumento...",
    "Determinando o protocolo ideal...",
    "Gerando seu plano personalizado...",
    "Finalizando seu diagnóstico...",
  ]

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Analisando seu potencial de <span className="text-red-500">testosterona</span>
        </h1>
        <p className="text-gray-400 mb-8">Estamos criando seu protocolo de maximização...</p>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Progresso da Análise</span>
            <span className="text-red-500 font-bold">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
            <div
              className="bg-red-500 h-3 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>

          {percentage >= 10 && (
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <table className="w-full text-left">
                <tbody className="space-y-2">
                  <tr className="border-b border-gray-700">
                    <td className="py-3 text-gray-400 font-medium">Testosterona atual:</td>
                    <td className="py-3 text-white font-bold text-right">{currentLevel}%</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 text-gray-400 font-medium">Testosterona objetivo:</td>
                    <td className="py-3 text-white font-bold text-right">{currentLevel + offerInfo.increase}%</td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 text-gray-400 font-medium">Tamanho atual:</td>
                    <td className="py-3 text-white font-bold text-right">{currentCm} cm</td>
                  </tr>
                  <tr>
                    <td className="py-3 text-gray-400 font-medium">Tamanho objetivo:</td>
                    <td className="py-3 text-white font-bold text-right">{totalCm} cm</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="space-y-4 text-left">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg transition-opacity duration-500 ${
                  activeSteps.includes(index) ? "opacity-100" : "opacity-0"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full mr-4 transition-colors duration-500 ${
                    percentage >= (index + 1) * 20 + 10 ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span>{step}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center">
            <div className="loader border-4 border-gray-300/30 border-t-red-500 rounded-full w-10 h-10 animate-spin" />
            <p className="text-gray-400 mt-4">
              Espere enquanto processamos seus dados para revelar seu nível máximo possível.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
