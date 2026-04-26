"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tag,
  FolderOpen,
  Settings,
  Warehouse,
  ChevronDown,
  ChevronRight,
  LogOut,
  ExternalLink,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { STOREFRONT_URL } from "@/lib/config"

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/products", label: "Products", icon: Package },
  { href: "/orders", label: "Orders", icon: ShoppingCart },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/collections", label: "Collections", icon: FolderOpen },
  { href: "/promotions", label: "Promotions", icon: Tag },
  {
    href: "/wms",
    label: "Warehouse",
    icon: Warehouse,
    children: [
      { href: "/wms", label: "Overview" },
      { href: "/wms/inbound", label: "Inbound" },
      { href: "/wms/outbound", label: "Outbound" },
      { href: "/wms/opname", label: "Opname" },
      { href: "/wms/stock", label: "Stock" },
      { href: "/wms/transactions", label: "History" },
    ],
  },
  { href: "/settings", label: "Settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const { logout } = useAuth()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ warehouse: true })

  return (
    <aside className="w-60 border-r bg-sidebar-background flex flex-col">
      <div className="px-4 py-4 border-b">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">Shopedia</span>
        </Link>
        <div className="mt-2 text-[10px] font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded px-2 py-0.5 inline-block">
          PORTFOLIO DEMO
        </div>
      </div>

      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
          const hasChildren = item.children && item.children.length > 0
          const isWarehouse = item.href === "/wms"
          const isExpanded = isWarehouse ? expanded.warehouse : false

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault()
                    setExpanded((prev) => ({ ...prev, warehouse: !prev.warehouse }))
                  }
                }}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-sidebar-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{item.label}</span>
                {hasChildren && (
                  isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />
                )}
              </Link>
              {hasChildren && isExpanded && (
                <div className="ml-5 mt-0.5 space-y-0.5">
                  {item.children.map((child) => {
                    const childActive = pathname === child.href
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-1.5 rounded-md text-sm transition-colors",
                          childActive
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      <div className="border-t p-3 space-y-2">
        <a
          href={STOREFRONT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Storefront</span>
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
