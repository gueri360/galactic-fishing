"use client"

import React, { useState, type ReactNode } from "react"

interface TabContentProps {
  id: string
  children: ReactNode
}

export function TabContent({ children }: TabContentProps) {
  return <>{children}</>
}

interface SimpleTabsProps {
  children: ReactNode
}

export function SimpleTabs({ children }: SimpleTabsProps) {
  const [activeTab, setActiveTab] = useState("leaderboard")

  // Filtramos los hijos para encontrar los componentes TabContent
  const tabContents = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && child.type === TabContent,
  ) as React.ReactElement<TabContentProps>[]

  // Encontramos el contenido para cada tab
  const leaderboardContent = tabContents.find((tab) => tab.props.id === "leaderboard")
  const marketContent = tabContents.find((tab) => tab.props.id === "market")

  return (
    <div className="w-full">
      <div className="flex mb-6 border border-blue-500/30 rounded-lg overflow-hidden">
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "leaderboard"
              ? "bg-gradient-to-b from-blue-500/80 to-blue-700/80 text-white"
              : "bg-blue-950/50 text-blue-200 hover:bg-blue-900/30"
          }`}
          onClick={() => setActiveTab("leaderboard")}
        >
          Leaderboard
        </button>
        <button
          className={`flex-1 py-3 px-4 text-center font-medium ${
            activeTab === "market"
              ? "bg-gradient-to-b from-blue-500/80 to-blue-700/80 text-white"
              : "bg-blue-950/50 text-blue-200 hover:bg-blue-900/30"
          }`}
          onClick={() => setActiveTab("market")}
        >
          Market
        </button>
      </div>

      {activeTab === "leaderboard" && leaderboardContent}
      {activeTab === "market" && marketContent}
    </div>
  )
}
