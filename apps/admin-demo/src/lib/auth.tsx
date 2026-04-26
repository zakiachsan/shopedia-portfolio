"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  user: { email: string; name: string } | null
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("shopedia_demo_auth")
    if (stored) {
      setIsAuthenticated(true)
      setUser({ email: "admin@shopedia.com", name: "Admin Demo" })
    }
  }, [])

  const login = () => {
    localStorage.setItem("shopedia_demo_auth", "true")
    setIsAuthenticated(true)
    setUser({ email: "admin@shopedia.com", name: "Admin Demo" })
  }

  const logout = () => {
    localStorage.removeItem("shopedia_demo_auth")
    setIsAuthenticated(false)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
