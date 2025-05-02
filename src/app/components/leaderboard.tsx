import { Trophy, Medal, Award } from "lucide-react"
import { Player } from "../lib/type"
import { Skeleton } from "./ui/skeleton"


interface LeaderboardProps {
  players: Player[]
  loading: boolean
}

export function Leaderboard({ players, loading }: LeaderboardProps) {
  if (loading && players.length === 0) {
    return <LeaderboardSkeleton />
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Pescadores Galácticos</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="border-b border-blue-500/30">
              <th className="px-4 py-3 text-left first:rounded-tl-md last:rounded-tr-md">Rank</th>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-right">Nivel</th>
              <th className="px-4 py-3 text-right">XP</th>
              <th className="px-4 py-3 text-right last:rounded-tr-md">Oro</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.username} className="border-b border-blue-500/20 hover:bg-blue-900/20">
                <td className="px-4 py-3">
                  {player.rank === 1 ? (
                    <Trophy className="h-5 w-5 text-yellow-400" />
                  ) : player.rank === 2 ? (
                    <Medal className="h-5 w-5 text-gray-300" />
                  ) : player.rank === 3 ? (
                    <Award className="h-5 w-5 text-amber-700" />
                  ) : (
                    player.rank
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{player.username}</td>
                <td className="px-4 py-3 text-right">{player.level}</td>
                <td className="px-4 py-3 text-right">{player.xp}</td>
                <td className="px-4 py-3 text-right font-medium text-yellow-400">{player.gold.toLocaleString()}</td>
              </tr>
            ))}

            {players.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-400">
                  No hay jugadores para mostrar
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function LeaderboardSkeleton() {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Top Pescadores Galácticos</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-blue-500/30">
              <th className="px-4 py-3 text-left">Rank</th>
              <th className="px-4 py-3 text-left">Usuario</th>
              <th className="px-4 py-3 text-right">Nivel</th>
              <th className="px-4 py-3 text-right">XP</th>
              <th className="px-4 py-3 text-right">Oro</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, i) => (
              <tr key={i} className="border-b border-blue-500/20">
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-5" />
                </td>
                <td className="px-4 py-3">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="px-4 py-3 text-right">
                  <Skeleton className="h-5 w-8 ml-auto" />
                </td>
                <td className="px-4 py-3 text-right">
                  <Skeleton className="h-5 w-12 ml-auto" />
                </td>
                <td className="px-4 py-3 text-right">
                  <Skeleton className="h-5 w-16 ml-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
