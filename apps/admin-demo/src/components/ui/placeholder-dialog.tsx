"use client"

import { useState, ReactNode } from "react"
import { X, Construction } from "lucide-react"
import { cn } from "@/lib/utils"

interface PlaceholderDialogProps {
  title: string
  children: ReactNode
}

export function PlaceholderDialog({ title, children }: PlaceholderDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div onClick={() => setOpen(true)}>{children}</div>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative z-50 w-full max-w-md rounded-lg border bg-background p-6 shadow-lg">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Construction className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fitur ini sedang dalam pengembangan dan belum tersedia di versi demo.
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className={cn(
                  "h-9 px-4 rounded-md text-sm font-medium",
                  "bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
