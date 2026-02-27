"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Zap, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    try {
      await login(email, password)
      toast.success("Welcome back!")
      router.push("/")
    } catch {
      toast.error("Invalid email or password")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="mb-6 inline-flex items-center gap-2">
            <Zap className="size-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">VoltStore</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-border/50 bg-card p-8">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          <Button type="submit" size="lg" disabled={loading} className="mt-2 w-full">
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Sign In
          </Button>

          <div className="mt-2 rounded-lg bg-secondary/50 p-3">
            <p className="mb-1 text-xs font-medium text-muted-foreground">Demo Accounts:</p>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Admin:</strong> admin@voltstore.com / any password
            </p>
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Customer:</strong> any email / any password
            </p>
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          {"Don't have an account? "}
          <Link href="/register" className="font-medium text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
