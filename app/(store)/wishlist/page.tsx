"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Heart, ChevronRight, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/providers/auth-provider"
import { useCart } from "@/components/providers/cart-provider"
import { wishlistApi } from "@/lib/api-client"
import type { WishlistItem } from "@/lib/types"
import { toast } from "sonner"

export default function WishlistPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { addItem } = useCart()
  const [items, setItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)

  const fetchWishlist = useCallback(async () => {
    try {
      const data = await wishlistApi.getAll()
      setItems(data)
    } catch {
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) { setLoading(false); return }
    fetchWishlist()
  }, [isAuthenticated, authLoading, fetchWishlist])

  async function handleRemove(productId: string) {
    try {
      await wishlistApi.remove(productId)
      setItems((prev) => prev.filter((i) => i.productId !== productId))
      toast.success("Removed from wishlist")
    } catch {
      toast.error("Failed to remove from wishlist")
    }
  }

  async function handleAddToCart(productId: string) {
    try {
      await addItem(productId)
    } catch {
      // toast handled in cart provider
    }
  }

  if (!authLoading && !isAuthenticated) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32">
        <Heart className="size-16 text-muted-foreground/50" />
        <h1 className="mt-4 text-xl font-bold">Sign in to view your wishlist</h1>
        <p className="mt-1 text-muted-foreground">Save your favorite products for later</p>
        <Button asChild className="mt-6">
          <Link href="/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Wishlist</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold tracking-tight">My Wishlist</h1>

      {loading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-secondary" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="size-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium">Your wishlist is empty</p>
          <p className="mt-1 text-muted-foreground">Browse products and add your favorites</p>
          <Button asChild className="mt-6">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card">
              <Link href={`/products/${item.product.slug}`} className="relative aspect-square overflow-hidden bg-secondary/50">
                <img src={item.product.images[0]} alt={item.product.name} className="size-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </Link>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <p className="text-xs font-medium text-primary">{item.product.brand}</p>
                <Link href={`/products/${item.product.slug}`}>
                  <h3 className="line-clamp-2 text-sm font-semibold leading-snug hover:text-primary">{item.product.name}</h3>
                </Link>
                <p className="mt-auto text-lg font-bold">${item.product.price.toLocaleString()}</p>
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1" onClick={() => handleAddToCart(item.productId)}>
                    <ShoppingCart className="mr-1 size-3.5" /> Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleRemove(item.productId)}>
                    <Trash2 className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
