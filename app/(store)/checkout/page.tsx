"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronRight, Loader2, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/components/providers/cart-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { ordersApi } from "@/lib/api-client"
import { FREE_SHIPPING_THRESHOLD } from "@/lib/constants"
import { toast } from "sonner"

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, itemCount, clearCart } = useCart()
  const { isAuthenticated } = useAuth()
  const [loading, setLoading] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")

  const [form, setForm] = useState({
    firstName: "", lastName: "", address: "", city: "", state: "", zipCode: "", country: "US", phone: "",
  })

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const required = ["firstName", "lastName", "address", "city", "state", "zipCode", "phone"] as const
    for (const field of required) {
      if (!form[field].trim()) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`)
        return
      }
    }

    setLoading(true)
    try {
      const order = await ordersApi.create({ shippingAddress: form })
      await clearCart()
      setOrderId(order.id)
      setOrderPlaced(true)
      toast.success("Order placed successfully!")
    } catch {
      toast.error("Failed to place order. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (itemCount === 0 && !orderPlaced) {
    router.push("/cart")
    return null
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center justify-center px-4 py-32 text-center">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/10">
          <CheckCircle className="size-8 text-emerald-500" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">Order Confirmed!</h1>
        <p className="mt-2 text-muted-foreground">Thank you for your purchase. Your order <strong className="text-foreground">{orderId}</strong> has been placed.</p>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/products">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/cart" className="hover:text-foreground">Cart</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">Checkout</span>
      </nav>

      <h1 className="mb-8 text-2xl font-bold tracking-tight">Checkout</h1>

      {!isAuthenticated && (
        <div className="mb-6 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <p className="text-sm">
            <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link>
            {" "}for a faster checkout experience, or continue as guest.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Shipping Form */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="rounded-xl border border-border/50 bg-card p-6">
              <h2 className="mb-4 text-lg font-semibold">Shipping Address</h2>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} required />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" value={form.address} onChange={(e) => updateField("address", e.target.value)} required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" value={form.city} onChange={(e) => updateField("city", e.target.value)} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" value={form.state} onChange={(e) => updateField("state", e.target.value)} required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input id="zipCode" value={form.zipCode} onChange={(e) => updateField("zipCode", e.target.value)} required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="h-fit rounded-xl border border-border/50 bg-card p-6">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <Separator className="my-4" />
            <div className="flex flex-col gap-3">
              {cart.items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.product.images[0]} alt="" className="size-12 rounded-lg object-cover" />
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-medium">{item.product.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                  </div>
                  <p className="text-sm font-medium">${(item.product.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <div className="flex flex-col gap-2">
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
              <div className="flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>${cart.total.toFixed(2)}</span>
              </div>
            </div>
            {cart.subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="mt-2 text-xs text-muted-foreground">Add ${(FREE_SHIPPING_THRESHOLD - cart.subtotal).toFixed(2)} more for free shipping</p>
            )}
            <Button type="submit" className="mt-6 w-full" size="lg" disabled={loading}>
              {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
              Place Order
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
