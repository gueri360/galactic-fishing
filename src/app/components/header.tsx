"use client"

import { RefreshCcw, Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

interface HeaderProps {
  onRefresh: () => void
  lastUpdated: Date | null
}

export function Header({ onRefresh, lastUpdated }: HeaderProps) {
  const [isOnline, setIsOnline] = useState(true)

  useEffect(() => {
    // Set initial online status
    setIsOnline(navigator.onLine)

    // Add event listeners for online/offline status
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <div className="w-full max-w-4xl mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold glow mb-2 sm:mb-0">Galactic Fishing Game</h1>

        <div className="flex items-center gap-2">
          {isOnline ? (
            <span className="flex items-center text-green-400 text-sm">
              <Wifi className="h-4 w-4 mr-1" /> Online
            </span>
          ) : (
            <span className="flex items-center text-yellow-400 text-sm">
              <WifiOff className="h-4 w-4 mr-1" /> Offline
            </span>
          )}

          <Button variant="outline" size="sm" onClick={onRefresh} className="ml-2">
            <RefreshCcw className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-blue-300/70">Leaderboard y Market para el desafío de Bloque</p>

        {lastUpdated && (
          <p className="text-xs text-blue-300/70">Última actualización: {lastUpdated.toLocaleTimeString()}</p>
        )}
      </div>
    </div>
  )
}
