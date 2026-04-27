"use client"

import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/lib/cart"
import { ADMIN_URL } from "@/lib/config"
import { ShoppingBag, Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/collections/new-arrivals", label: "New Arrivals" },
  { href: "/collections/flash-sale", label: "Sale" },
]

export function Header() {
  const { count } = useCart()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[56px]">
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <span className="font-bold text-xl tracking-tight text-black uppercase">Shopedia</span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-[13px] font-semibold uppercase tracking-wider text-neutral-700 hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <a
              href={ADMIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block text-[11px] font-medium uppercase tracking-wider text-neutral-400 hover:text-black transition-colors"
            >
              Admin Demo
            </a>
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-[18px] w-[18px] stroke-[1.5]" />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 h-[18px] w-[18px] rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {count}
                </span>
              )}
            </Link>
            <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X className="h-5 w-5 stroke-[1.5]" /> : <Menu className="h-5 w-5 stroke-[1.5]" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm font-semibold uppercase tracking-wider"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={ADMIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2.5 text-sm text-neutral-400 font-medium uppercase tracking-wider"
            >
              Admin Demo →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
