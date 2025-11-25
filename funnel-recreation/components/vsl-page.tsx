"use client"

import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Volume2 } from "lucide-react"

interface VSLPageProps {
  onContinue: () => void
}

export function VSLPage({ onContinue }: VSLPageProps) {
  const [showButton, setShowButton] = useState(false)
  const [showUnmuteOverlay, setShowUnmuteOverlay] = useState(true)
  const [videoProgress, setVideoProgress] = useState(0)
  const playerRef = useRef<any>(null)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true)
    }, 360000) // 6 minutes in milliseconds

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // @ts-ignore
    window.onYouTubeIframeAPIReady = () => {
      // @ts-ignore
      playerRef.current = new window.YT.Player("youtube-player", {
        videoId: "TP3_9Uz3rXQ",
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0, // Hide controls
          disablekb: 1, // Disable keyboard controls
          fs: 0, // Hide fullscreen button
          modestbranding: 1, // Minimal YouTube branding
          rel: 0, // Don't show related videos
          showinfo: 0, // Hide video info
          iv_load_policy: 3, // Hide annotations
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo()
            startProgressTracking()
          },
          onStateChange: (event: any) => {
            // @ts-ignore
            if (event.data === window.YT.PlayerState.PAUSED && !showUnmuteOverlay) {
              event.target.playVideo()
            }
          },
        },
      })
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
      }
    }
  }, [])

  const startProgressTracking = () => {
    progressIntervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime && playerRef.current.getDuration) {
        const currentTime = playerRef.current.getCurrentTime()
        const duration = playerRef.current.getDuration()
        if (duration > 0) {
          const progress = (currentTime / duration) * 100
          setVideoProgress(progress)
        }
      }
    }, 500)
  }

  const handleUnmute = () => {
    if (playerRef.current) {
      playerRef.current.unMute()
      playerRef.current.seekTo(0)
      playerRef.current.playVideo()
      setShowUnmuteOverlay(false)
      startProgressTracking()
    }
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-start px-4 py-12 md:py-16">
        <div className="max-w-4xl w-full space-y-6 md:space-y-8">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              NÃO É CULPA SUA: Descubra O Bloqueio Hormonal Que Travou Seu Cajado (E O Método Natural Para Liberar Até
              7cm
            </h1>
            <div className="h-1 w-32 bg-[#ED1C24] mx-auto" />
          </div>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto leading-relaxed">
            Enquanto a maioria permanece travada para sempre, você pode destravar seu potencial máximo hoje - antes que
            removam este vídeo....
          </p>

          {/* Video Player with Unmute Overlay */}
          <div className="w-full max-w-3xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <div id="youtube-player" className="absolute top-0 left-0 w-full h-full rounded-lg overflow-hidden" />

              {showUnmuteOverlay && (
                <div
                  onClick={handleUnmute}
                  className="absolute top-0 left-0 w-full h-full bg-black/60 flex flex-col items-center justify-center cursor-pointer z-10 hover:bg-black/70 transition-all rounded-lg"
                >
                  <div className="bg-[#ED1C24] rounded-full p-6 mb-4 animate-pulse">
                    <Volume2 className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-white text-xl md:text-2xl font-bold">Clique para ouvir</p>
                  <p className="text-gray-300 text-sm md:text-base mt-2">O vídeo será reiniciado com som</p>
                </div>
              )}
            </div>

            {!showUnmuteOverlay && (
              <div className="w-full bg-gray-800 h-2 rounded-full mt-4 overflow-hidden">
                <div
                  className="bg-[#ED1C24] h-full transition-all duration-500 ease-linear"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
            )}
          </div>

          {/* CTA Button - Shows after 6 minutes */}
          {showButton && (
            <div className="flex justify-center pt-8 animate-in fade-in duration-500">
              <Button
                onClick={onContinue}
                className="bg-[#ED1C24] hover:bg-[#c91820] text-white font-bold text-lg md:text-xl px-8 md:px-12 py-6 md:py-8 rounded-lg transition-all duration-300 hover:scale-105 max-w-md w-full h-auto text-center"
              >
                IR PARA O QUIZ PERSONALIZADO
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-gray-800">
        <p className="text-gray-400 text-sm">Todos os direitos reservados</p>
      </footer>
    </div>
  )
}
