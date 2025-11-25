"use client"

import { useState, useEffect } from "react"

export function OfferBanner() {
  const [timeLeft, setTimeLeft] = useState(5760) // 1:36:00 in seconds

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`
  }

  return (
    <div className="w-full bg-red-600 text-white text-center py-2 text-sm font-bold relative">
      <p className="mb-1">
        OFERTA RELÂMPAGO: 60% DE DESCONTO! Termina em: <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
      </p>
      <p className="text-xs opacity-80">Esta oferta está ativa há 2 semanas e hoje é o último dia!</p>
    </div>
  )
}
