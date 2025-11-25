"use client"

import { Button } from "@/components/ui/button"

interface AgeVerificationProps {
  onConfirm: () => void
}

export function AgeVerification({ onConfirm }: AgeVerificationProps) {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">Você tem mais de 18 anos?</h1>
          <div className="h-1 w-32 bg-[#ED1C24] mx-auto" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Button
            onClick={onConfirm}
            className="bg-[#ED1C24] hover:bg-[#c91820] text-white font-bold text-xl px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 min-w-[200px] h-auto"
          >
            SIM
          </Button>
          <Button
            onClick={() => (window.location.href = "https://www.google.com")}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-xl px-12 py-6 rounded-lg transition-all duration-300 hover:scale-105 min-w-[200px] h-auto"
          >
            NÃO
          </Button>
        </div>
      </div>
    </div>
  )
}
