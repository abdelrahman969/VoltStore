"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Search, ShoppingCart, Heart, User, Menu, LogOut, Package, Settings, LayoutDashboard, Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/components/providers/auth-provider"
import { useCart } from "@/components/providers/cart-provider"
import { NAV_CATEGORIES } from "@/lib/constants"
import { SearchDialog } from "@/components/layout/search-dialog"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const { user, isAuthenticated, logout } = useAuth()
  const { itemCount } = useCart()
  const [searchOpen, setSearchOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-3">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="size-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2">
                    <Zap className="size-5 text-primary" />
                    VoltStore
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-1 px-2 pt-4">
                  {NAV_CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/categories/${cat.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary",
                        pathname === `/categories/${cat.slug}` && "bg-secondary text-primary"
                      )}
                    >
                      {cat.name}
                    </Link>
                  ))}
                  <div className="my-2 border-t border-border" />
                  <Link href="/products" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary">
                    All Products
                  </Link>
                  {isAuthenticated && (
                    <>
                      <Link href="/orders" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary">
                        My Orders
                      </Link>
                      <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-secondary">
                        Wishlist
                      </Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="flex items-center gap-2">
              <Zap className="size-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">VoltStore</span>
            </Link>
          </div>

          {/* Center: Nav links */}
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_CATEGORIES.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categories/${cat.slug}`}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === `/categories/${cat.slug}` ? "text-primary" : "text-muted-foreground"
                )}
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)} className="text-muted-foreground hover:text-foreground">
              <Search className="size-5" />
              <span className="sr-only">Search</span>
            </Button>

            {isAuthenticated && (
              <Button variant="ghost" size="icon" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/wishlist">
                  <Heart className="size-5" />
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>
            )}

            <Button variant="ghost" size="icon" asChild className="relative text-muted-foreground hover:text-foreground">
              <Link href="/cart">
                <ShoppingCart className="size-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full p-0 text-[10px]">
                    {itemCount}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Link>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <User className="size-5" />
                    <span className="sr-only">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account"><Settings className="mr-2 size-4" />Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders"><Package className="mr-2 size-4" />Orders</Link>
                  </DropdownMenuItem>
                  {user?.role === "admin" && (
                    <DropdownMenuItem asChild>
                      <Link href="/admin"><LayoutDashboard className="mr-2 size-4" />Admin</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 size-4" />Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="ml-2">
                <Link href="/login">Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </header>
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
