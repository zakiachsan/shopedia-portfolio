"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart"
import { ADMIN_URL } from "@/lib/config"
import { ShoppingBag, Menu, X, Search } from "lucide-react"

export function Header() {
  const { count } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">S</span>
            </div>
            <span className="font-semibold text-xl tracking-tight">Shopedia</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-muted-foreground transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium hover:text-muted-foreground transition-colors">Products</Link>
            <Link href="/collections/new-arrivals" className="text-sm font-medium hover:text-muted-foreground transition-colors">New Arrivals</Link>
            <Link href="/collections/flash-sale" className="text-sm font-medium hover:text-muted-foreground transition-colors">Sale</Link>
          </nav>

          <div className="flex items-center gap-4">
            <a
              href={ADMIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Admin Demo
            </a>
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-primary text-primary-foreground text-[10px] font-medium flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-3 space-y-2">
            <Link href="/" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/products" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Products</Link>
            <Link href="/collections/new-arrivals" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>New Arrivals</Link>
            <Link href="/collections/flash-sale" className="block py-2 text-sm font-medium" onClick={() => setMobileOpen(false)}>Sale</Link>
            <a
              href={ADMIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-sm text-muted-foreground"
            >
              Admin Demo →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
