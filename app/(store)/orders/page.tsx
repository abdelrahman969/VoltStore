"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/components/providers/auth-provider"
import { ordersApi } from "@/lib/api-client"
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from "@/lib/constants"
import type { Order } from "@/lib/types"

export default function OrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (authLoading) return
    if (!isAuthenticated) return
    ordersApi.getAll()
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false))
  }, [isAuthenticated, authLoading])

  if (!authLoading && !isAuthenticated) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-32">
        <Package className="size-16 text-muted-foreground/50" />
        <h1 className="mt-4 text-xl font-bold">Sign in to view orders</h1>
        <p className="mt-1 text-muted-foreground">You need to be signed in to see your order history</p>
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
        <span className="text-foreground">My Orders</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold tracking-tight">My Orders</h1>

      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-xl bg-secondary" />
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Package className="size-12 text-muted-foreground/50" />
          <p className="mt-4 text-lg font-medium">No orders yet</p>
          <p className="mt-1 text-muted-foreground">Start shopping to see your orders here</p>
          <Button asChild className="mt-6">
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-border/50 bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-semibold">Order {order.id}</p>
                    <Badge className={ORDER_STATUS_COLORS[order.status]}>{ORDER_STATUS_LABELS[order.status]}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Placed on {new Date(order.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img src={item.productImage} alt={item.productName} className="size-12 rounded-lg object-cover" />
                    <div className="flex-1 overflow-hidden">
                      <p className="truncate text-sm font-medium">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity} x ${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4 border-t border-border/50 pt-4">
                <div className="text-xs text-muted-foreground">
                  Ship to: {order.shippingAddress.firstName} {order.shippingAddress.lastName}, {order.shippingAddress.city}, {order.shippingAddress.state}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
