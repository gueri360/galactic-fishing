"use client"

import React from "react"

import { useState } from "react"
import { cn } from "../lib/utils"

interface TabsProps {
  defaultValue: string
  className?: string
  children: React.ReactNode
}

interface TabsListProps {
  className?: string
  children: React.ReactNode
}

interface TabsTriggerProps {
  value: string
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

interface TabsContentProps {
  value: string
  className?: string
  children: React.ReactNode
}

const TabsContext = React.createContext<{
  value: string
  setValue: (value: string) => void
}>({
  value: "",
  setValue: () => {},
})

export function CustomTabs({ defaultValue, className, children }: TabsProps) {
  const [value, setValue] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ value, setValue }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  )
}

export function CustomTabsList({ className, children }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex w-full h-12 items-center justify-center rounded-lg bg-blue-950/80 p-1 text-blue-200 shadow-lg border border-blue-500/30",
        className,
      )}
    >
      {children}
    </div>
  )
}

export function CustomTabsTrigger({ value, className, children, onClick }: TabsTriggerProps) {
  const { value: selectedValue, setValue } = React.useContext(TabsContext)
  const isActive = value === selectedValue

  return (
    <button
      className={cn(
        "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-all",
        isActive
          ? "bg-gradient-to-b from-blue-500/80 to-blue-700/80 text-white shadow-md"
          : "hover:bg-blue-900/20 text-blue-200",
        className,
      )}
      onClick={() => {
        setValue(value)
        if (onClick) onClick()
      }}
    >
      {children}
    </button>
  )
}

export function CustomTabsContent({ value, className, children }: TabsContentProps) {
  const { value: selectedValue } = React.useContext(TabsContext)

  if (value !== selectedValue) return null

  return <div className={cn("mt-4", className)}>{children}</div>
}
