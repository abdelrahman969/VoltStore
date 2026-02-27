"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, User, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/components/providers/auth-provider"
import { toast } from "sonner"

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading: authLoading, updateProfile, logout } = useAuth()
  const [firstName, setFirstName] = useState(user?.firstName || "")
  const [lastName, setLastName] = useState(user?.lastName || "")
  const [phone, setPhone] = useState(user?.phone || "")
  const [saving, setSaving] = useState(false)

  // Sync form when user loads
  useState(() => {
    if (user) {
      setFirstName(user.firstName)
      setLastName(user.lastName)
      setPhone(user.phone || "")
    }
  })

  if (!authLoading && !isAuthenticated) {
    router.push("/login")
    return null
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!firstName || !lastName) {
      toast.error("Name fields are required")
      return
    }
    setSaving(true)
    try {
      await updateProfile({ firstName, lastName, phone: phone || undefined })
      toast.success("Profile updated successfully")
    } catch {
      toast.error("Failed to update profile")
    } finally {
      setSaving(false)
    }
  }

  function handleLogout() {
    logout()
    router.push("/")
  }

  if (authLoading || !user) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="h-64 animate-pulse rounded-xl bg-secondary" />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Account</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold tracking-tight">My Account</h1>

      <div className="flex flex-col gap-6">
        {/* Profile Card */}
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
              {user.firstName[0]}{user.lastName[0]}
            </div>
            <div>
              <p className="font-semibold">{user.firstName} {user.lastName}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role} account</p>
            </div>
          </div>

          <Separator className="mb-6" />

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={user.email} disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 123-4567" />
            </div>
            <Button type="submit" disabled={saving} className="mt-2 w-fit">
              {saving && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </form>
        </div>

        {/* Quick Links */}
        <div className="rounded-xl border border-border/50 bg-card p-6">
          <h2 className="mb-4 text-lg font-semibold">Quick Links</h2>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Link href="/orders" className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:bg-secondary">
              <User className="size-5 text-primary" />
              <span className="text-sm font-medium">My Orders</span>
            </Link>
            <Link href="/wishlist" className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:bg-secondary">
              <User className="size-5 text-primary" />
              <span className="text-sm font-medium">Wishlist</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-3 rounded-lg border border-border/50 p-4 transition-colors hover:bg-secondary">
              <User className="size-5 text-primary" />
              <span className="text-sm font-medium">Cart</span>
            </Link>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="rounded-xl border border-destructive/20 bg-card p-6">
          <h2 className="mb-2 text-lg font-semibold">Sign Out</h2>
          <p className="mb-4 text-sm text-muted-foreground">Sign out of your account on this device.</p>
          <Button variant="destructive" onClick={handleLogout}>Sign Out</Button>
        </div>
      </div>
    </div>
  )
}
