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
  Search,
  ChevronUp,
} from "lucide-react"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"
import { STOREFRONT_URL } from "@/lib/config"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface NavItem {
  href: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  children?: { href: string; label: string }[]
}

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/orders/", label: "Orders", icon: ShoppingCart },
  {
    href: "#catalog",
    label: "Catalog",
    icon: Package,
    children: [
      { href: "/products/", label: "Products" },
      { href: "/collections/", label: "Collections" },
      { href: "/categories/", label: "Categories" },
    ],
  },
  { href: "/customers/", label: "Customers", icon: Users },
  { href: "/promotions/", label: "Promotions", icon: Tag },
  {
    href: "#warehouse",
    label: "Warehouse",
    icon: Warehouse,
    children: [
      { href: "/wms/", label: "Overview" },
      { href: "/wms/inbound/", label: "Inbound" },
      { href: "/wms/outbound/", label: "Outbound" },
      { href: "/wms/opname/", label: "Opname" },
      { href: "/wms/stock/", label: "Stock" },
      { href: "/wms/transactions/", label: "History" },
    ],
  },
  { href: "/settings/", label: "Settings", icon: Settings },
]

function isActive(pathname: string, href: string, children?: { href: string }[]) {
  if (href === "/") return pathname === "/"
  if (pathname.startsWith(href) && href !== "#catalog" && href !== "#warehouse") return true
  if (children) {
    return children.some((c) => pathname.startsWith(c.href))
  }
  return false
}

export function Sidebar() {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    catalog: pathname.startsWith("/products") || pathname.startsWith("/collections") || pathname.startsWith("/categories"),
    warehouse: pathname.startsWith("/wms"),
  })

  return (
    <aside className="w-64 min-h-screen bg-sidebar-background border-r border-sidebar-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center shadow-sm">
            <span className="text-primary-foreground font-bold text-sm">S</span>
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-foreground">Shopedia</span>
            <span className="block text-[10px] text-muted-foreground -mt-0.5">Admin Panel</span>
          </div>
        </Link>
      </div>

      {/* User Profile */}
      <div className="px-4 py-3 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              {user?.name?.split(" ").map((n) => n[0]).join("") ?? "AD"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{user?.name ?? "Admin Demo"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email ?? "admin@shopedia.com"}</p>
          </div>
          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
        </div>
      </div>

      {/* Sidebar Search */}
      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search menu..."
            className="w-full h-8 pl-8 pr-3 text-xs rounded-md border border-border bg-white focus:outline-none focus:ring-1 focus:ring-ring"
            disabled
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-1 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href, item.children)
          const hasChildren = item.children && item.children.length > 0
          const key = item.label.toLowerCase()
          const isExpanded = expanded[key] ?? false

          return (
            <div key={item.label}>
              <button
                onClick={() => {
                  if (hasChildren) {
                    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }))
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                  active
                    ? "bg-[#e5e7eb] text-foreground font-medium"
                    : "text-sidebar-foreground hover:bg-[#e5e7eb]/60"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {hasChildren && (
                  isExpanded ? <ChevronDown className="h-3.5 w-3.5 shrink-0" /> : <ChevronRight className="h-3.5 w-3.5 shrink-0" />
                )}
              </button>
              {hasChildren && isExpanded && (
                <div className="ml-6 mt-0.5 space-y-0.5">
                  {item.children!.map((child) => {
                    const childActive = pathname === child.href || pathname.startsWith(child.href)
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "block px-3 py-1.5 rounded-md text-sm transition-colors",
                          childActive
                            ? "bg-[#e5e7eb] text-foreground font-medium"
                            : "text-muted-foreground hover:text-foreground hover:bg-[#e5e7eb]/40"
                        )}
                      >
                        {child.label}
                      </Link>
                    )
                  })}
                </div>
              )}
              {!hasChildren && (
                <Link href={item.href} className="hidden" />
              )}
            </div>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-sidebar-border p-3 space-y-2">
        {/* Storage usage */}
        <div className="px-2">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Storage usage</span>
            <span className="font-medium">25%</span>
          </div>
          <div className="h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full w-[25%] bg-primary rounded-full" />
          </div>
        </div>

        <a
          href={STOREFRONT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-[#e5e7eb]/60 transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Storefront</span>
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-muted-foreground hover:bg-[#e5e7eb]/60 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
