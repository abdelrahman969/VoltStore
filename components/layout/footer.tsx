import Link from "next/link"
import { Zap } from "lucide-react"
import { NAV_CATEGORIES } from "@/lib/constants"

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <Zap className="size-6 text-primary" />
              <span className="text-lg font-bold tracking-tight">VoltStore</span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Premium electronics for the modern world. Discover the latest tech from top brands.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Categories</h3>
            <nav className="flex flex-col gap-2">
              {NAV_CATEGORIES.map((cat) => (
                <Link key={cat.slug} href={`/categories/${cat.slug}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Account */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Account</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/account" className="text-sm text-muted-foreground transition-colors hover:text-primary">My Account</Link>
              <Link href="/orders" className="text-sm text-muted-foreground transition-colors hover:text-primary">Order History</Link>
              <Link href="/wishlist" className="text-sm text-muted-foreground transition-colors hover:text-primary">Wishlist</Link>
              <Link href="/cart" className="text-sm text-muted-foreground transition-colors hover:text-primary">Shopping Cart</Link>
            </nav>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold">Support</h3>
            <nav className="flex flex-col gap-2">
              <span className="text-sm text-muted-foreground">Contact Us</span>
              <span className="text-sm text-muted-foreground">Shipping Policy</span>
              <span className="text-sm text-muted-foreground">Returns & Exchanges</span>
              <span className="text-sm text-muted-foreground">FAQ</span>
            </nav>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} VoltStore. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="text-xs text-muted-foreground">Privacy Policy</span>
            <span className="text-xs text-muted-foreground">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
