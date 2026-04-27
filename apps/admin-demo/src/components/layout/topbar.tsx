"use client"

import Link from "next/link"
import { Bell, ExternalLink, Menu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { STOREFRONT_URL } from "@/lib/config"
import { useAuth } from "@/lib/auth"

export function Topbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { user } = useAuth()

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-3 sm:px-6 sticky top-0 z-30">
      {/* Left: Hamburger + Logo (mobile) */}
      <div className="flex items-center gap-2 lg:hidden">
        <button
          onClick={onMenuClick}
          className="p-2 -ml-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5 text-muted-foreground" />
        </button>
        <Link href="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-[10px]">S</span>
          </div>
          <span className="font-bold text-sm tracking-tight">Shopedia</span>
        </Link>
      </div>

      <div className="flex-1 hidden lg:block" />

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href={STOREFRONT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary-hover transition-colors"
        >
          <span>View your shop</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>

        <button className="relative p-2 rounded-md hover:bg-muted transition-colors">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l">
          <Avatar className="h-7 w-7 sm:h-8 sm:w-8">
            <AvatarImage />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-none">{user?.name ?? "Admin Demo"}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{user?.email ?? "admin@shopedia.com"}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
