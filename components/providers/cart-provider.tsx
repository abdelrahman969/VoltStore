"use client"

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react"
import type { Cart, CartItem } from "@/lib/types"
import { cartApi } from "@/lib/api-client"
import { toast } from "sonner"

interface CartContextType {
  cart: Cart
  isLoading: boolean
  itemCount: number
  addItem: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeItem: (itemId: string) => Promise<void>
  clearCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const emptyCart: Cart = { items: [], subtotal: 0, shipping: 0, tax: 0, total: 0 }

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>(emptyCart)
  const [isLoading, setIsLoading] = useState(true)

  const refreshCart = useCallback(async () => {
    try {
      const data = await cartApi.get()
      setCart(data)
    } catch {
      setCart(emptyCart)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const addItem = useCallback(async (productId: string, quantity: number = 1) => {
    try {
      const updated = await cartApi.addItem(productId, quantity)
      setCart(updated)
      toast.success("Added to cart")
    } catch (err) {
      toast.error("Failed to add to cart")
      throw err
    }
  }, [])

  const updateQuantity = useCallback(async (itemId: string, quantity: number) => {
    try {
      const updated = await cartApi.updateQuantity(itemId, quantity)
      setCart(updated)
    } catch (err) {
      toast.error("Failed to update cart")
      throw err
    }
  }, [])

  const removeItem = useCallback(async (itemId: string) => {
    try {
      const updated = await cartApi.removeItem(itemId)
      setCart(updated)
      toast.success("Removed from cart")
    } catch (err) {
      toast.error("Failed to remove item")
      throw err
    }
  }, [])

  const clearCart = useCallback(async () => {
    try {
      await cartApi.clear()
      setCart(emptyCart)
    } catch (err) {
      toast.error("Failed to clear cart")
      throw err
    }
  }, [])

  const itemCount = cart.items.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)

  return (
    <CartContext.Provider value={{ cart, isLoading, itemCount, addItem, updateQuantity, removeItem, clearCart, refreshCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
