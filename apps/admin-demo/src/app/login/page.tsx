"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-12 w-12 rounded-lg bg-primary flex items-center justify-center mb-4">
            <span className="text-primary-foreground font-bold text-xl">S</span>
          </div>
          <CardTitle className="text-2xl">Shopedia Admin</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Portfolio Demo</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md bg-amber-50 border border-amber-200 p-3 text-sm text-amber-800">
            <p className="font-medium">Demo Mode</p>
            <p className="text-amber-700 mt-0.5">
              Klik tombol di bawah untuk masuk ke dashboard demo. Tidak diperlukan password.
            </p>
          </div>
          <Button onClick={login} className="w-full">
            Masuk ke Dashboard
          </Button>
          <div className="text-center">
            <a
              href="https://shopedia-storefront.pages.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground underline"
            >
              Lihat Storefront Demo
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
