import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "green" | "red" | "orange" | "blue" | "gray"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors",
        {
          "border-transparent bg-primary text-primary-foreground shadow-sm": variant === "default",
          "border-transparent bg-secondary text-secondary-foreground": variant === "secondary",
          "border-transparent bg-destructive text-destructive-foreground shadow-sm": variant === "destructive",
          "text-foreground border-border": variant === "outline",
          "border-transparent bg-status-green-bg text-status-green": variant === "green",
          "border-transparent bg-status-red-bg text-status-red": variant === "red",
          "border-transparent bg-status-orange-bg text-status-orange": variant === "orange",
          "border-transparent bg-status-blue-bg text-status-blue": variant === "blue",
          "border-transparent bg-status-gray-bg text-status-gray": variant === "gray",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }
