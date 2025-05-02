"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MarketItem, Player } from "./lib/type"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs"
import { Header } from "./components/header"
import { Leaderboard } from "./components/leaderboard"
import { Market } from "./components/market"
import { fetchWithCache } from "./lib/api"


export default function Home() {
  const [players, setPlayers] = useState<Player[]>([])
  const [items, setItems] = useState<MarketItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Fetch leaderboard data
        const leaderboardData = await fetchWithCache("https://api-game.bloque.app/game/leaderboard")
        if (leaderboardData && leaderboardData.players) {
          setPlayers(leaderboardData.players)
        }

        // Fetch market data
        const marketData = await fetchWithCache("https://api-game.bloque.app/game/market")
        if (marketData && marketData.items) {
          setItems(marketData.items)
        }

        setLastUpdated(new Date())
      } catch (err) {
        console.error("Error fetching data:", err)
        setError("No se pudieron cargar los datos. Usando datos en caché si están disponibles.")
      } finally {
        setLoading(false)
      }
    }

    loadData()

    // Set up refresh interval (every 60 seconds)
    const intervalId = setInterval(loadData, 60000)

    return () => clearInterval(intervalId)
  }, [])

  const handleRefresh = () => {
    setLoading(true)
    setError("")

    // Clear cache to force fresh data
    localStorage.removeItem("cache_leaderboard")
    localStorage.removeItem("cache_market")

    // Reload the page to fetch fresh data
    window.location.reload()
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 sm:p-6 md:p-8">
      <Header onRefresh={handleRefresh} lastUpdated={lastUpdated} />

      {error && (
        <div className="w-full max-w-4xl mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-center">
          {error}
        </div>
      )}

      <Tabs defaultValue="leaderboard" className="w-full max-w-4xl">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="market">Market</TabsTrigger>
        </TabsList>

        <TabsContent value="leaderboard">
          <Leaderboard players={players} loading={loading} />
        </TabsContent>

        <TabsContent value="market">
          <Market items={items} loading={loading} />
        </TabsContent>
      </Tabs>

      <footer className="mt-12 text-center text-sm text-blue-300/70">
        <p>Galactic Fishing Game - Bloque Challenge</p>
        <p className="mt-1">
          <Link href="https://www.bloque.app" target="_blank" className="underline hover:text-blue-300">
            www.bloque.app
          </Link>
        </p>
      </footer>
    </main>
  )
}
