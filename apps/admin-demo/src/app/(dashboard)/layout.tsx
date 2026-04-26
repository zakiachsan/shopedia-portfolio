"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Sidebar } from "@/components/layout/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-muted-foreground">Redirecting to login...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
