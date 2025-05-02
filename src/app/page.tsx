"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Header } from "./components/header"
import { Leaderboard } from "./components/leaderboard"
import { Market } from "./components/market"
import { SimpleTabs, TabContent } from "./components/simple-tabs"
import { fetchWithCache } from "./lib/api"
import { Player, MarketItem } from "./lib/type"


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
      <div className="w-full max-w-5xl mx-auto">
        <Header onRefresh={handleRefresh} lastUpdated={lastUpdated} />

        {error && (
          <div className="w-full mb-4 p-3 bg-red-900/50 border border-red-700 rounded-md text-center">{error}</div>
        )}

        <SimpleTabs>
          <TabContent id="leaderboard">
            <Leaderboard players={players} loading={loading} />
          </TabContent>
          <TabContent id="market">
            <Market items={items} loading={loading} />
          </TabContent>
        </SimpleTabs>

        <footer className="mt-12 text-center text-sm text-blue-300/70">
          <p>Galactic Fishing Game - Bloque Challenge</p>
          <p className="mt-1">
            <Link href="https://www.bloque.app" target="_blank" className="underline hover:text-blue-300">
              www.bloque.app
            </Link>
          </p>
        </footer>
      </div>
    </main>
  )
}
