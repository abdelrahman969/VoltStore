"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { User } from "@/lib/types"
import { authApi, setToken, getToken } from "@/lib/api-client"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => Promise<void>
  logout: () => void
  updateProfile: (data: { firstName: string; lastName: string; phone?: string }) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (token) {
      authApi.getProfile()
        .then(setUser)
        .catch(() => { setToken(null) })
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login(email, password)
    setToken(res.token)
    setUser(res.user)
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_user", JSON.stringify(res.user))
    }
  }, [])

  const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string; phone?: string }) => {
    const res = await authApi.register(data)
    setToken(res.token)
    setUser(res.user)
    if (typeof window !== "undefined") {
      localStorage.setItem("mock_user", JSON.stringify(res.user))
    }
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem("mock_user")
      localStorage.removeItem("mock_cart")
      localStorage.removeItem("mock_wishlist")
    }
  }, [])

  const updateProfile = useCallback(async (data: { firstName: string; lastName: string; phone?: string }) => {
    const updated = await authApi.updateProfile(data)
    setUser(updated)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth must be used within AuthProvider")
  return context
}
