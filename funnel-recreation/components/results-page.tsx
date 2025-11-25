"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Lock, RotateCcw, Medal, CheckCircle2, ChevronDown } from "lucide-react"
import type { UserAnswers } from "@/app/page"

interface ResultsPageProps {
  selectedOffer: string
  testosteroneLevel: number
  userAnswers: UserAnswers
}

const offerData: Record<
  string,
  { increase: number; price: string; originalPrice: string; protocolName: string; cmGain: string }
> = {
  "https://pay.wiapy.com/3DLET2_rC5": {
    increase: 130,
    price: "R$ 14,90",
    originalPrice: "R$ 37,25",
    protocolName: "130%",
    cmGain: "3,1",
  },
  "https://pay.wiapy.com/W4P6mi6Aye": {
    increase: 250,
    price: "R$ 14,90",
    originalPrice: "R$ 37,25",
    protocolName: "250%",
    cmGain: "4,5",
  },
  "https://pay.wiapy.com/nyh0tJhU1T": {
    increase: 370,
    price: "R$ 14,90",
    originalPrice: "R$ 37,25",
    protocolName: "370%",
    cmGain: "6,2",
  },
  "https://pay.wiapy.com/yu7fZsN00_": {
    increase: 500,
    price: "R$ 14,90",
    originalPrice: "R$ 37,25",
    protocolName: "500%",
    cmGain: "7,4",
  },
}

export function ResultsPage({ selectedOffer, testosteroneLevel, userAnswers }: ResultsPageProps) {
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(null)
  const [animated, setAnimated] = useState(false)

  const data = offerData[selectedOffer]
  const newPotential = testosteroneLevel + data.increase
  const currentCm = userAnswers[7]?.value || "N/A"
  const totalCm = (Number.parseFloat(currentCm.replace(",", ".")) + Number.parseFloat(data.cmGain.replace(",", ".")))
    .toFixed(1)
    .replace(".", ",")

  const currentLevelWidth = (testosteroneLevel / 100) * 100
  const potentialIncreaseWidth = (data.increase / 100) * 100

  useEffect(() => {
    setTimeout(() => setAnimated(true), 100)
  }, [])

  const benefits = [
    {
      title: "Libido Explosiva",
      description: "Sinta como seu desejo sexual atinge novos patamares, reavivando a paixão em sua vida.",
    },
    {
      title: "Ereções de Aço",
      description: "Consiga ereções mais firmes, potentes e duradouras para um desempenho inesquecível.",
    },
    {
      title: "Energia Ilimitada",
      description: "Acorde renovado e com energia para enfrentar qualquer desafio, do trabalho ao treino.",
    },
    {
      title: "Corpo Mais Forte",
      description: "Facilite o aumento de massa muscular e a queima de gordura, esculpindo um físico mais masculino.",
    },
    {
      title: "Confiança Inabalável",
      description: "Melhore seu humor, foco e autoconfiança, projetando uma imagem de poder.",
    },
    {
      title: "Sono Restaurador",
      description: "Desfrute de noites de sono profundo que otimizam sua recuperação hormonal e física.",
    },
  ]

  const guarantees = [
    {
      icon: Lock,
      title: "Site Seguro",
      description:
        "Sua privacidade e seus dados são protegidos com a mais avançada tecnologia de criptografia. Você **pode ver** o cadeado na barra de endereços, **sentir** a tranquilidade de que sua informação está segura e **ouvir** a promessa de confidencialidade.",
    },
    {
      icon: RotateCcw,
      title: "Garantia de 7 Dias",
      description:
        "**Sinta** a liberdade de testar o Método Tmax por 7 dias. Se **não sentir** a transformação, devolveremos 100% do seu investimento. Você **pode ver** nossa política clara e **sentir** a segurança.",
    },
    {
      icon: Medal,
      title: "Satisfação Garantida",
      description:
        "Milhares de homens já **sentiram** a diferença, **viram** seus corpos se transformarem e **ouviram** os elogios. Nós **garantimos** que você também **sentirá** essa mudança.",
    },
  ]

  const testimonials = [
    {
      text: "Eu estava cético no início, mas a primeira coisa que notei foi um aumento de energia. Meu desejo sexual aumentou e agora tenho a aparência e me sinto com esse protocolo vale mais que qualquer remédio.",
      author: "Ricardo L, 34 anos, São Paulo",
    },
    {
      text: "Sinceramente, alguém está fazendo isso e está bem. Bem explicado, tudo de forma clara e sem enrolação. Só queria ter encontrado isso antes.",
      author: "Leonardo A., 47 anos, Rio de Janeiro",
    },
    {
      text: "Desejo e autoconfiança entraram em minha vida. Eles explicam tudo de forma clara e sem enrolação. Só queria ter encontrado isso antes.",
      author: "Pedro V., 23 anos, Belo Horizonte",
    },
  ]

  const beforeAfterMetrics = [
    { label: "Equilíbrio Hormonal", before: 35, after: 85 },
    { label: "Controle Ejaculatório", before: 20, after: 95 },
    { label: "Sensibilidade Sexual", before: 25, after: 90 },
    { label: "Tranquilidade Psicológica", before: 15, after: 100 },
    { label: "Nível de Autoestima", before: 20, after: 100 },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          Seu resultado <span className="text-red-500">personalizado</span>
        </h1>
        <p className="text-gray-400 mb-8">Com base em sua análise, descobrimos seu potencial de otimização hormonal.</p>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl mb-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Você pode aumentar sua testosterona em até <span className="text-red-500">{data.increase} %</span>
          </h2>
          <p className="text-gray-400 mb-6">
            Seus níveis hormonais têm o potencial de serem otimizados em apenas 30 dias.
          </p>

          <div className="flex items-center justify-around gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-gray-800 w-1/3">
              <div className="text-gray-400 text-sm">Nível atual</div>
              <div className="text-white text-3xl font-bold">{testosteroneLevel} %</div>
            </div>
            <ArrowRight className="text-red-500" />
            <div className="text-center p-4 rounded-lg bg-red-600 w-1/3">
              <div className="text-white text-sm">Seu potencial máximo</div>
              <div className="text-white text-3xl font-bold">{newPotential} %</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 rounded-2xl mb-6 relative flex items-center h-24 w-full overflow-hidden shadow-2xl border border-gray-700">
          <div
            className={`bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 h-full flex items-center justify-center transition-all duration-1000 ease-out relative ${
              animated ? "" : "w-0"
            }`}
            style={{ width: animated ? `${currentLevelWidth}%` : "0%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <span className="text-2xl font-bold text-white relative z-10 drop-shadow-lg">{testosteroneLevel}%</span>
          </div>
          <div
            className={`bg-gradient-to-r from-red-600 via-red-500 to-red-600 h-full flex items-center justify-center transition-all duration-1000 delay-500 ease-out relative ${
              animated ? "" : "w-0"
            }`}
            style={{ width: animated ? `${potentialIncreaseWidth}%` : "0%" }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-white/10" />
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-2xl font-bold text-white relative z-10 drop-shadow-lg">{newPotential}%</span>
          </div>
          <div
            className="absolute top-1/2 -translate-y-1/2 w-12 h-12 bg-gradient-to-br from-white to-gray-200 rounded-full flex items-center justify-center shadow-2xl transition-all duration-1000 border-4 border-red-500"
            style={{ left: animated ? `calc(${currentLevelWidth}% - 24px)` : "calc(50% - 24px)" }}
          >
            <ArrowRight className="text-red-600" strokeWidth={3} size={24} />
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-xl mb-6">
          <h3 className="text-xl font-bold text-left text-white mb-4">Resumo da sua análise:</h3>
          <table className="w-full text-left">
            <tbody>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-gray-300">Nível atual de testosterona:</td>
                <td className="py-3 font-semibold text-white text-right">{testosteroneLevel}%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-gray-300">Aumento desejado:</td>
                <td className="py-3 font-semibold text-green-400 text-right">+{data.increase}%</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-gray-300">Tamanho Atual:</td>
                <td className="py-3 font-semibold text-white text-right">{currentCm} cm</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-gray-300">Ganho Potencial:</td>
                <td className="py-3 font-semibold text-green-400 text-right">+{data.cmGain} cm</td>
              </tr>
              <tr className="border-b border-gray-700">
                <td className="py-3 text-gray-300 font-semibold">Nível total objetivo:</td>
                <td className="py-3 font-semibold text-white text-lg text-right">{newPotential}%</td>
              </tr>
              <tr>
                <td className="py-3 text-gray-300 font-semibold">Nível CM total:</td>
                <td className="py-3 font-semibold text-white text-lg text-right">{totalCm} cm</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-8 text-left">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            Desbloqueie Sua Melhor Versão com o Método Tmax:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-start">
                <CheckCircle2 className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
                <div>
                  <strong className="text-white">{benefit.title}:</strong> {benefit.description}
                </div>
              </div>
            ))}
            <div className="bg-gray-800 p-4 rounded-lg flex items-start md:col-span-2">
              <CheckCircle2 className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <strong className="text-white">Ganho de Tamanho:</strong> A otimização hormonal cria o ambiente ideal
                para que seu corpo atinja seu potencial máximo de crescimento.
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl mb-12">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-red-500 mb-6">Antes</h3>
              <div className="space-y-4">
                {beforeAfterMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-300">{metric.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-red-400">Baixo</span>
                        <span className="text-white font-semibold min-w-[3rem] text-right">{metric.before}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${metric.before}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-500 mb-6">Depois</h3>
              <div className="space-y-4">
                {beforeAfterMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-gray-300">{metric.label}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-green-400">Alto</span>
                        <span className="text-white font-semibold min-w-[3rem] text-right">{metric.after}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${metric.after}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-white mb-6">Depoimentos de usuários</h3>
          <p className="text-gray-400 mb-8">Diversos homens que aplicaram o método compartilharam suas experiências:</p>
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-900 border-l-4 border-red-500 p-6 rounded-lg text-left">
                <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
                <p className="text-gray-500 text-sm">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">Reconhecimento internacional</h3>
          <p className="text-gray-400 mb-8">
            Os exercícios de Kegel e fortalecimento do assoalho pélvico, que fazem parte do Método TMAX, são
            recomendados por instituições de saúde internacionalmente reconhecidas:
          </p>
          <div className="flex justify-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instituicoes-_white_-1%281%29-bo9ehCOnu35ePsYYjN9R7M9WMehFXR.webp"
              alt="Harvard Medical School, NHS, MensHealth logos"
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-green-500 mb-4 text-center">
            Resultados positivos em 87% dos usuários do método.
          </h3>
          <p className="text-gray-400 mb-6">
            A fórmula desse método revolucionou o sucesso do <strong className="text-white">Método TMAX</strong>, em
            referência à sua origem ancestral nas tribos nativas do Congo.
          </p>
          <p className="text-gray-400 mb-6">
            No Brasil, o protocolo é administrado sob o nome <strong className="text-white">Ditado Máximo</strong>,
            mantendo toda a eficácia da técnica milenar adaptada para o homem moderno.
          </p>
          <p className="text-gray-400 mb-8">
            Veja alguns usuários que experimentaram e relataram diferenças. Confira antes e depois em respeito de nosso
            público:
          </p>
          <div className="flex justify-center mb-8">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/main%281%29%281%29%281%29%281%29%281%29-k6Qj6lYZfryPOFPTMVwbMqfzULfBsc.jpg"
              alt="Resultados antes e depois"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-gray-300 mb-2">
            📊 Os resultados documentados de tratamento de 4 semanas de Lucas Costinha.
          </p>
          <p className="text-white font-bold text-lg mb-2">
            Ele aumentou o pênis 8,4 cm sem usar quaisquer bombas ou pesos.
          </p>
          <p className="text-gray-300 mb-2">
            O seu pênis está 63% mais grosso e consegue ter sexo duas vezes mais rápido.
          </p>
          <p className="text-white font-bold text-lg mb-6">
            Consegue fazer sua parceira gozar todas as vezes que eles fazem sexo.
          </p>
          <p className="text-gray-300 mb-6">
            Por conta do trabalho ele não tinha muita vontade de fazer sexo, agora por ter feito visitado todos os dias.
          </p>
          <p className="text-white font-bold text-xl mb-8">Você quer ter os mesmos resultados?</p>
        </div>

        <div className="bg-gradient-to-br from-green-900/20 to-gray-900 border-2 border-green-500/50 rounded-2xl p-8 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-green-500 mb-4 text-center">Mais Resultados Comprovados</h3>
          <p className="text-gray-300 mb-8 text-center">
            Veja mais evidências documentadas de usuários que transformaram suas vidas com o Método TMAX:
          </p>
          <div className="flex justify-center mb-6">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/resultados%281%29%281%29-IfYVyYT9RLqAGZDAriU6pDchSieyPE.jpg"
              alt="Mais resultados comprovados - collage"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
          <p className="text-gray-400 text-center text-sm">
            📊 Resultados reais de usuários que seguiram o protocolo completo do Método TMAX.
          </p>
        </div>

        <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Como ter acesso ao método?</h3>
          <p className="text-gray-400 mb-8 text-center">
            O Instituto Duranna disponibiliza o protocolo completo do{" "}
            <strong className="text-white">Método TMAX</strong> (Ditado Máximo) em formato digital, incluindo:
          </p>
          <div className="space-y-3 text-left text-gray-300 max-w-2xl mx-auto">
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <span>Técnicas ancestrais africanas passo a passo</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <span>Vídeos demonstrativos com especialistas</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <span>Cronograma de 30 dias para resultados máximos</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <span>Lista de bioativos naturais e onde encontrar</span>
            </div>
            <div className="flex items-start">
              <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <span>Suporte especializado para dúvidas</span>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Sua Jornada é 100% Segura e Sem Riscos!</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => {
              const Icon = guarantee.icon
              return (
                <div
                  key={index}
                  onClick={() => setExpandedAccordion(expandedAccordion === index ? null : index)}
                  className="bg-gradient-to-br from-red-900/10 to-black/80 border border-red-500/30 rounded-2xl p-6 text-center cursor-pointer hover:border-red-500/60 transition-all hover:-translate-y-1"
                >
                  <div className="text-red-500 text-4xl mb-4 flex justify-center">
                    <Icon size={32} />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-3 flex items-center justify-center">
                    {guarantee.title}
                    <ChevronDown
                      className={`ml-2 transition-transform ${expandedAccordion === index ? "rotate-180" : ""}`}
                      size={20}
                    />
                  </h4>
                  <div
                    className={`overflow-hidden transition-all duration-500 ${
                      expandedAccordion === index ? "max-h-[200px]" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-300 text-sm">{guarantee.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6 shadow-xl mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Sua oferta personalizada</h3>
          <p className="text-gray-400 mb-4">Protocolo {data.protocolName} - Otimização Hormonal</p>
          <div className="flex items-center justify-center gap-4">
            <span className="text-4xl font-bold text-green-400">{data.price}</span>
            <div className="text-left">
              <span className="text-lg line-through text-gray-500">{data.originalPrice}</span>
              <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">60% DE DESCONTO</div>
            </div>
          </div>
        </div>

        <a
          href={selectedOffer}
          className="inline-block w-full md:max-w-md text-lg font-medium rounded-md px-10 py-4 bg-red-600 hover:bg-red-700 text-white text-center transition-colors leading-tight mb-12"
        >
          Começar meu protocolo personalizado
        </a>
      </div>
    </div>
  )
}
