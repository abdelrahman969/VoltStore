"use client"

import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarRating } from "@/components/store/star-rating"
import { useCart } from "@/components/providers/cart-provider"
import type { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compareAtPrice!) * 100) : 0

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border/50 bg-card transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
      {/* Image */}
      <Link href={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-secondary/50">
        <img
          src={product.images[0]}
          alt={product.name}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {hasDiscount && (
          <Badge className="absolute left-3 top-3 bg-red-500 text-white hover:bg-red-500">-{discountPercent}%</Badge>
        )}
        {product.isFeatured && !hasDiscount && (
          <Badge className="absolute left-3 top-3">Featured</Badge>
        )}
      </Link>

      {/* Wishlist button */}
      <Button variant="ghost" size="icon" className="absolute right-3 top-3 size-8 rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
        <Heart className="size-4" />
        <span className="sr-only">Add to wishlist</span>
      </Button>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium text-primary">{product.brand}</p>
        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug transition-colors hover:text-primary">{product.name}</h3>
        </Link>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${product.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-sm text-muted-foreground line-through">${product.compareAtPrice!.toLocaleString()}</span>
            )}
          </div>
          <Button size="sm" onClick={() => addItem(product.id)} className="shrink-0">
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
