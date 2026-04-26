"use client"

import Link from "next/link"
import { Search, Bell, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { STOREFRONT_URL } from "@/lib/config"
import { useAuth } from "@/lib/auth"

export function Topbar() {
  const { user } = useAuth()

  return (
    <header className="h-14 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Left: Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-9 h-9 bg-muted border-0 text-sm w-full max-w-sm"
            disabled
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
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

        <div className="flex items-center gap-2 pl-3 border-l">
          <Avatar className="h-8 w-8">
            <AvatarImage />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              AD
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium leading-none">{user?.name ?? "Admin Demo"}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{user?.email ?? "admin@shopedia.com"}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
