import { ShoppingCart, Zap, Clock, Skull } from "lucide-react"
import { MarketItem } from "../lib/type"
import { Skeleton } from "./ui/skeleton"

interface MarketProps {
  items: MarketItem[]
  loading: boolean
}

export function Market({ items, loading }: MarketProps) {
  if (loading && items.length === 0) {
    return <MarketSkeleton />
  }

  // Function to get icon based on item type
  const getItemIcon = (type: string) => {
    switch (type) {
      case "fishing_rod":
        return <Zap className="h-5 w-5 text-blue-400" />
      case "poison_leveling":
        return <Skull className="h-5 w-5 text-purple-400" />
      case "poison_delay":
        return <Clock className="h-5 w-5 text-red-400" />
      case "poison_recovery":
        return <Zap className="h-5 w-5 text-green-400" />
      default:
        return <ShoppingCart className="h-5 w-5" />
    }
  }

  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Mercado Galáctico</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 border border-blue-500/30 rounded-md hover:border-blue-400/60 transition-colors bg-blue-900/20 hover:bg-blue-900/30"
          >
            <div className="flex items-center gap-3 mb-2">
              {getItemIcon(item.type)}
              <h3 className="font-bold">{item.name}</h3>
            </div>

            <p className="text-sm text-gray-300 mb-3">{item.description}</p>

            <div className="flex justify-between items-center">
              <span className="text-xs uppercase tracking-wider text-blue-300/70">{item.type.replace("_", " ")}</span>
              <span className="font-medium text-yellow-400">{item.cost.toLocaleString()} oro</span>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="col-span-2 py-8 text-center text-gray-400">No hay items para mostrar en el mercado</div>
        )}
      </div>
    </div>
  )
}

function MarketSkeleton() {
  return (
    <div className="card p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Mercado Galáctico</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-4 border border-blue-500/30 rounded-md">
            <div className="flex items-center gap-3 mb-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-5 w-32" />
            </div>

            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4 mb-3" />

            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-16" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
