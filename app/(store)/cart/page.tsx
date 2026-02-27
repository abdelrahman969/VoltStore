"use client"

import Link from "next/link"
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/providers/cart-provider"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants"

export default function CartPage() {
  const { cart, itemCount, updateQuantity, removeItem, clearCart } = useCart()

  if (itemCount === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32">
        <ShoppingBag className="size-16 text-muted-foreground/50" />
        <h1 className="mt-4 text-xl font-bold">Your cart is empty</h1>
        <p className="mt-1 text-muted-foreground">Start shopping to add items to your cart</p>
        <Button asChild className="mt-6">
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Shopping Cart ({itemCount})</h1>
        <Button variant="ghost" size="sm" onClick={() => clearCart()} className="text-muted-foreground">
          Clear All
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4 rounded-xl border border-border/50 bg-card p-4">
              <Link href={`/products/${item.product.slug}`} className="size-24 shrink-0 overflow-hidden rounded-lg bg-secondary/50">
                <img src={item.product.images[0]} alt={item.product.name} className="size-full object-cover" />
              </Link>
              <div className="flex flex-1 flex-col gap-1">
                <Link href={`/products/${item.product.slug}`} className="text-sm font-semibold hover:text-primary">{item.product.name}</Link>
                <p className="text-xs text-muted-foreground">{item.product.brand}</p>
                <p className="mt-auto text-sm font-bold">${item.product.price.toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <Button variant="ghost" size="icon-sm" onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="size-4" />
                </Button>
                <div className="flex items-center rounded-lg border border-border">
                  <Button variant="ghost" size="icon-sm" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                    <Minus className="size-3" />
                  </Button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <Button variant="ghost" size="icon-sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    <Plus className="size-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-xl border border-border/50 bg-card p-6">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <Separator className="my-4" />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${cart.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{cart.shipping === 0 ? "Free" : `$${cart.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${cart.tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>
          {cart.subtotal < FREE_SHIPPING_THRESHOLD && (
            <p className="mt-3 text-xs text-muted-foreground">Add ${(FREE_SHIPPING_THRESHOLD - cart.subtotal).toFixed(2)} more for free shipping</p>
          )}
          <Button asChild className="mt-6 w-full" size="lg">
            <Link href="/checkout">Checkout <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
          <Button asChild variant="outline" className="mt-2 w-full">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
