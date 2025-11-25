"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import type { UserAnswers } from "@/app/page"

interface QuizSectionProps {
  userAnswers: UserAnswers
  setUserAnswers: (answers: UserAnswers) => void
  onComplete: (selectedOffer: string, testosteroneLevel: number) => void
}

interface QuizQuestion {
  question: string
  type: "text" | "radio"
  placeholder?: string
  options?: Array<{ text: string; score: number } | string>
}

const quizData: QuizQuestion[] = [
  {
    question:
      "Quando você acorda, você <strong>sente</strong> a energia <strong>pulsar</strong> em suas veias, pronto para conquistar o dia e a noite, ou <strong>vê</strong> a fadiga <strong>se arrastar</strong> e <strong>ouve</strong> o silêncio onde deveria haver um rugido de vitalidade?",
    type: "radio",
    options: [
      { text: "Minha energia é um sussurro, e vejo a sombra do que poderia ser.", score: 1 },
      {
        text: "A fadiga é uma constante, e o desejo parece ter sido silenciado, deixando um vazio que sinto.",
        score: 2,
      },
      { text: "Às vezes sinto um cansaço que me impede de brilhar, mas sei que posso ir além.", score: 3 },
      { text: "Sinto essa energia vibrante quase sempre, como um predador pronto para a caça!", score: 4 },
    ],
  },
  {
    question: "Você notou mudanças na sua massa muscular ou dificuldade para ganhar músculo, mesmo treinando?",
    type: "radio",
    options: [
      { text: "Perda significativa de massa muscular", score: 1 },
      { text: "Pequena perda ou dificuldade para ganhar", score: 2 },
      { text: "Manutenção da massa muscular", score: 3 },
      { text: "Aumento fácil de massa muscular", score: 4 },
    ],
  },
  {
    question: "Como é a qualidade do seu sono? Você acorda renovado?",
    type: "radio",
    options: [
      { text: "Muito ruim (insônia, sono agitado, acordo exausto)", score: 1 },
      { text: "Ruim (dificuldade para dormir, sono leve)", score: 2 },
      { text: "Regular (durmo, mas nem sempre acordo totalmente descansado)", score: 3 },
      { text: "Boa (durmo profundamente, acordo renovado)", score: 4 },
    ],
  },
  {
    question: "Você já experimentou mudanças de humor, como irritabilidade, ansiedade ou desânimo?",
    type: "radio",
    options: [
      { text: "Frequentemente (irritabilidade, ansiedade, desânimo constante)", score: 1 },
      { text: "Ocasionalmente (alguns momentos de irritabilidade ou desânimo)", score: 2 },
      { text: "Raramente (humor estável, poucas mudanças)", score: 3 },
      { text: "Nunca (sempre de bom humor, positivo)", score: 4 },
    ],
  },
  {
    question:
      "Quando você <strong>pensa</strong> na intimidade, você <strong>sente</strong> o fogo <strong>ardendo</strong> dentro de você, <strong>vê</strong> a chama nos olhos de sua parceira e <strong>ouve</strong> o irresistível convite do desejo? Ou <strong>percebe</strong> um sussurro distante, uma faísca que mal <strong>se acende</strong>, e <strong>sente</strong> a frustração de um potencial não realizado?",
    type: "radio",
    options: [
      { text: "O desejo é uma lembrança distante, e só ouço o eco do que foi.", score: 1 },
      { text: "A chama está quase apagada, e o silêncio é ensurdecedor, sinto a falta desse calor.", score: 2 },
      { text: "Sinto um desejo moderado, mas sei que pode ser muito mais intenso e eu o vejo.", score: 3 },
      { text: "Meu desejo é um vulcão ativo, sempre pronto para explodir com paixão!", score: 4 },
    ],
  },
  {
    question:
      "Ao se preparar para o momento crucial, você <strong>sente</strong> a firmeza e a confiança <strong>se elevarem</strong>, <strong>vê</strong> a potência em cada movimento e <strong>ouve</strong> a certeza do prazer que está por vir? Ou <strong>percebe</strong> uma hesitação, uma fraqueza que você <strong>sente</strong> e que <strong>se reflete</strong> no olhar de decepção?",
    type: "radio",
    options: [
      { text: "A incerteza me assombra, e ouço a voz da dúvida em minha mente.", score: 1 },
      { text: "A dificuldade é constante, e a frustração é visível, sinto o peso da decepção.", score: 2 },
      { text: "Às vezes há uma pequena falha, mas consigo me recuperar e vejo a esperança.", score: 3 },
      { text: "Minhas ereções são rochas, sinto o poder e a dureza em minhas mãos!", score: 4 },
    ],
  },
  {
    question: "Você já teve orgasmos satisfatórios e intensos?",
    type: "radio",
    options: [
      { text: "Não (orgasmos fracos ou ausentes)", score: 1 },
      { text: "Raramente (orgasmos pouco intensos)", score: 2 },
      { text: "Às vezes (orgasmos satisfatórios, mas nem sempre intensos)", score: 3 },
      { text: "Sempre (orgasmos muito intensos e prazerosos)", score: 4 },
    ],
  },
  {
    question: "Qual é o tamanho atual do seu pênis ereto (em centímetros)?",
    type: "text",
    placeholder: "Digite aqui (ex: 15)",
  },
  {
    question: "Quantos centímetros você gostaria de aumentar no tamanho do seu pênis?",
    type: "radio",
    options: ["2 cm", "3 cm", "4 cm", "Mais de 4 cm"],
  },
]

const offerData = {
  "https://pay.wiapy.com/3DLET2_rC5": { increase: 130, cmGain: "3,1" },
  "https://pay.wiapy.com/W4P6mi6Aye": { increase: 250, cmGain: "4,5" },
  "https://pay.wiapy.com/nyh0tJhU1T": { increase: 370, cmGain: "6,2" },
  "https://pay.wiapy.com/yu7fZsN00_": { increase: 500, cmGain: "7,4" },
}

export function QuizSection({ userAnswers, setUserAnswers, onComplete }: QuizSectionProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [currentAnswer, setCurrentAnswer] = useState("")
  const totalSteps = quizData.length + 1

  const calculateTestosteroneLevel = () => {
    let totalScore = 0
    let questionsScored = 0

    for (let i = 0; i < quizData.length; i++) {
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

  const handleNext = () => {
    if (currentStep < quizData.length) {
      const questionData = quizData[currentStep]

      if (questionData.type === "text") {
        if (!currentAnswer.trim()) return
        setUserAnswers({
          ...userAnswers,
          [currentStep]: { value: currentAnswer, score: null },
        })
      } else {
        if (!currentAnswer) return
        const option = questionData.options?.find((opt) =>
          typeof opt === "object" ? opt.text === currentAnswer : opt === currentAnswer,
        )
        const score = typeof option === "object" ? option.score : null
        setUserAnswers({
          ...userAnswers,
          [currentStep]: { value: currentAnswer, score },
        })
      }

      setCurrentAnswer("")
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setCurrentAnswer(userAnswers[currentStep - 1]?.value || "")
    }
  }

  const handleSubmit = () => {
    if (!currentAnswer) {
      alert("Por favor, selecione uma oferta para continuar.")
      return
    }

    const testosteroneLevel = calculateTestosteroneLevel()
    onComplete(currentAnswer, testosteroneLevel)
  }

  const progress = ((currentStep + 1) / totalSteps) * 100

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {currentStep < quizData.length ? (
          <div className="animate-fade-in">
            <div className="w-full mb-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Diagnóstico <span className="text-red-500">Personalizado</span>
                </h1>
                <p className="text-gray-400">
                  Pergunta {currentStep + 1} de {totalSteps}
                </p>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                <div
                  className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-400">{Math.round(progress)}% completo</span>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl">
              <h2
                className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-tight"
                dangerouslySetInnerHTML={{
                  __html: quizData[currentStep].question,
                }}
              />

              {quizData[currentStep].type === "text" ? (
                <div className="mb-6">
                  <Input
                    type="text"
                    placeholder={quizData[currentStep].placeholder}
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    className="w-full p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white placeholder-gray-400 focus:border-red-500"
                  />
                </div>
              ) : (
                <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
                  <div className="space-y-4">
                    {quizData[currentStep].options?.map((option, index) => {
                      const optionValue = typeof option === "object" ? option.text : option
                      return (
                        <Label
                          key={index}
                          htmlFor={`option-${index}`}
                          className="flex items-center p-4 bg-gray-800 border-2 border-gray-700 rounded-xl text-white cursor-pointer hover:border-red-500 transition-colors"
                        >
                          <RadioGroupItem
                            value={optionValue}
                            id={`option-${index}`}
                            className="h-6 w-6 border-2 text-red-500"
                          />
                          <span className="ml-4">{optionValue}</span>
                        </Label>
                      )
                    })}
                  </div>
                </RadioGroup>
              )}

              <div className={`flex ${currentStep > 0 ? "justify-between" : "justify-end"} items-center mt-8`}>
                {currentStep > 0 && (
                  <Button onClick={handlePrev} variant="ghost" className="bg-gray-800 text-gray-400 hover:bg-gray-700">
                    Anterior
                  </Button>
                )}
                <Button onClick={handleNext} className="bg-red-600 hover:bg-red-700 text-white">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="w-full mb-8">
              <div className="text-center mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Diagnóstico <span className="text-red-500">Personalizado</span>
                </h1>
                <p className="text-gray-400">
                  Pergunta {totalSteps} de {totalSteps}
                </p>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2 mb-4">
                <div className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full w-full" />
              </div>
              <div className="text-center">
                <span className="text-sm text-gray-400">100% completo</span>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-6 leading-tight">
                Quanto você gostaria de aumentar seu nível de testosterona em 30 dias?
              </h2>
            </div>

            <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer}>
              <div className="space-y-4">
                {Object.entries(offerData).map(([url, data], index) => (
                  <Label
                    key={url}
                    htmlFor={`offer-${index}`}
                    className={`relative flex items-center p-4 bg-gray-800 border-2 rounded-xl text-white cursor-pointer hover:border-red-500 transition-colors ${
                      index === 2 ? "border-red-500" : "border-gray-700"
                    }`}
                  >
                    {index === 2 && (
                      <div className="absolute -top-3 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        MAIS POPULAR
                      </div>
                    )}
                    <RadioGroupItem value={url} id={`offer-${index}`} className="h-6 w-6 border-2" />
                    <span className="ml-4">
                      {data.increase}% (Potencial de aumento de {data.cmGain} cm de 'lápis')
                    </span>
                  </Label>
                ))}
              </div>
            </RadioGroup>

            <div className="flex justify-between items-center mt-8">
              <Button onClick={handlePrev} variant="ghost" className="bg-gray-800 text-gray-400 hover:bg-gray-700">
                Anterior
              </Button>
              <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                Finalizar Pedido
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
