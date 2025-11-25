"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface LandingPageProps {
  onStartQuiz: () => void
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100)
  }, [])

  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-12">
        <div
          className="absolute inset-0 z-0 bg-black"
          style={{
            backgroundImage: "radial-gradient(circle at center, #111 0%, #000 100%)",
          }}
        />

        <div className="container mx-auto px-6 z-10 relative max-w-6xl">
          <div className="flex flex-col items-center text-center">
            {/* Red line animation */}
            <div className="relative mb-6">
              <div
                className={`absolute top-[-25%] left-1/2 transform -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#ED1C24] to-transparent transition-all duration-500 ${
                  animated ? "h-[150%] opacity-100" : "h-0 opacity-0"
                }`}
              />
              <div
                className={`transition-all duration-500 ${animated ? "opacity-100 scale-100" : "opacity-0 scale-80"}`}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter text-balance">
                  <span className="text-white">MÉTODO</span> <span className="text-[#ED1C24]">TMAX</span>
                </h1>
              </div>
            </div>

            <div
              className={`text-lg sm:text-xl md:text-2xl text-[#F2EAD3] font-light mb-6 transition-all duration-700 delay-300 max-w-4xl ${
                animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <p className="mb-4 text-pretty">
                <strong className="text-white">Sinta o pulso da energia renovada.</strong> Imagine acordar todos os dias
                com uma vitalidade que você pensou ter perdido para sempre. O Método Tmax é a chave para desbloquear o
                seu verdadeiro potencial masculino.
              </p>

              <p className="mb-4 text-pretty">
                <strong className="text-white">A testosterona é o alicerce da vitalidade masculina.</strong> Ela define
                sua energia, sua força, sua confiança e até mesmo sua capacidade de conquistar. Quando seus níveis estão
                baixos, você sente o impacto em cada área da sua vida.
              </p>

              <p className="text-pretty">
                <strong className="text-white">Transforme sua vida em apenas 30 dias.</strong> Com o Método Tmax, você
                vai descobrir como aumentar naturalmente seus níveis de testosterona em até 500% e adicionar até 7,4 cm,
                sem medicamentos, sem efeitos colaterais, apenas resultados reais e duradouros.
              </p>
            </div>

            {/* CTA Section */}
            <div
              className={`flex flex-col items-center w-full transition-all duration-700 delay-500 ${
                animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <Button
                onClick={onStartQuiz}
                className="inline-flex items-center justify-center text-center font-bold rounded-md px-8 py-6 mb-3 w-full sm:w-auto max-w-md bg-[#ED1C24] hover:bg-[#ED1C24]/90 text-white text-base h-auto"
              >
                <span className="flex flex-col items-center justify-center text-center gap-1">
                  <span className="leading-tight">DESPERTE O MONSTRO EM VOCÊ:</span>
                  <span className="leading-tight">AVALIE SUA POTÊNCIA AGORA!</span>
                </span>
              </Button>
              <span className="text-[#AFAFAF] text-xs sm:text-sm">Teste personalizado em 2 minutos</span>
            </div>

            {/* Stats Section */}
            <div
              className={`mt-8 md:mt-12 w-full max-w-4xl mx-auto transition-all duration-700 delay-700 ${
                animated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ED1C24]">+500%</div>
                  <div className="text-[#AFAFAF] text-xs sm:text-sm leading-tight mt-1">Aumento de Testosterona</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ED1C24]">10 min</div>
                  <div className="text-[#AFAFAF] text-xs sm:text-sm leading-tight mt-1">Por dia</div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#ED1C24]">21 dias</div>
                  <div className="text-[#AFAFAF] text-xs sm:text-sm leading-tight mt-1">Resultados visíveis</div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-[#111111] pt-8 mt-16">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-[#AFAFAF] text-sm text-center">© 2025 Método Tmax. Todos os direitos reservados.</p>
              <p className="text-[#AFAFAF] text-xs mt-4 md:mt-0 max-w-md text-center md:text-right">
                Este site não é afiliado a nenhuma empresa farmacêutica ou médica. Os resultados podem variar de pessoa
                para pessoa.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
