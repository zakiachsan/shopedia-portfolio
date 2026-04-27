"use client"

import { useState } from "react"
import { CalendarDays } from "lucide-react"
import { cn } from "@/lib/utils"

export function DateRangePicker() {
  const [from, setFrom] = useState(() => {
    const d = new Date()
    d.setDate(d.getDate() - 30)
    return d.toISOString().split("T")[0]
  })
  const [to, setTo] = useState(() => new Date().toISOString().split("T")[0])

  return (
    <div className="flex items-center gap-2">
      <CalendarDays className="h-4 w-4 text-muted-foreground shrink-0" />
      <input
        type="date"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className={cn(
          "h-8 rounded-md border border-input bg-transparent px-2 text-xs",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        )}
      />
      <span className="text-xs text-muted-foreground">—</span>
      <input
        type="date"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className={cn(
          "h-8 rounded-md border border-input bg-transparent px-2 text-xs",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        )}
      />
    </div>
  )
}
