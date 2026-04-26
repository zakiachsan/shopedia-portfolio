"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()

  useEffect(() => {
    login()
    router.push("/")
  }, [login, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="text-center">
        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-md">
          <span className="text-primary-foreground font-bold text-lg">S</span>
        </div>
        <h1 className="text-lg font-semibold text-foreground">Shopedia Admin</h1>
        <p className="text-sm text-muted-foreground mt-1">Logging you in...</p>
        <div className="mt-4 h-1.5 w-32 bg-border rounded-full mx-auto overflow-hidden">
          <div className="h-full w-full bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  )
}
