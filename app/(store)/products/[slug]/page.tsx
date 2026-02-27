"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { ChevronRight, Minus, Plus, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarRating } from "@/components/store/star-rating"
import { ProductCard } from "@/components/store/product-card"
import { useCart } from "@/components/providers/cart-provider"
import { productsApi } from "@/lib/api-client"
import { mockProducts, mockReviews } from "@/lib/mock-data"
import type { Product, Review } from "@/lib/types"

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { addItem } = useCart()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const p = await productsApi.getBySlug(slug)
        setProduct(p)
        const r = await productsApi.getReviews(p.id)
        setReviews(r)
      } catch {
        setProduct(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-2xl bg-secondary" />
          <div className="flex flex-col gap-4">
            <div className="h-8 w-48 animate-pulse rounded-lg bg-secondary" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-secondary" />
            <div className="h-24 w-full animate-pulse rounded-lg bg-secondary" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-lg font-medium">Product not found</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  const hasDiscount = product.compareAtPrice && product.compareAtPrice > product.price
  const relatedProducts = mockProducts.filter((p) => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="size-3.5" />
        {product.category && (
          <>
            <Link href={`/categories/${product.category.slug}`} className="hover:text-foreground">{product.category.name}</Link>
            <ChevronRight className="size-3.5" />
          </>
        )}
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      {/* Product Layout */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Images */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-border/50 bg-secondary/30">
            <img src={product.images[selectedImage]} alt={product.name} className="size-full object-cover" />
            {hasDiscount && <Badge className="absolute left-4 top-4 bg-red-500 text-white hover:bg-red-500">Save ${(product.compareAtPrice! - product.price).toLocaleString()}</Badge>}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`size-20 overflow-hidden rounded-xl border-2 transition-all ${i === selectedImage ? "border-primary" : "border-border/50 hover:border-border"}`}
                >
                  <img src={img} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm font-semibold text-primary">{product.brand}</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{product.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <StarRating rating={product.rating} size="md" showValue reviewCount={product.reviewCount} />
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">${product.price.toLocaleString()}</span>
            {hasDiscount && (
              <span className="text-lg text-muted-foreground line-through">${product.compareAtPrice!.toLocaleString()}</span>
            )}
          </div>
          <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          <Separator />

          {/* Stock */}
          <div className="flex items-center gap-2">
            <div className={`size-2 rounded-full ${product.stock > 0 ? "bg-emerald-500" : "bg-red-500"}`} />
            <span className="text-sm">{product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}</span>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <Button variant="ghost" size="icon-sm" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={quantity <= 1}>
                <Minus className="size-4" />
              </Button>
              <span className="w-12 text-center text-sm font-medium">{quantity}</span>
              <Button variant="ghost" size="icon-sm" onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} disabled={quantity >= product.stock}>
                <Plus className="size-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1" onClick={() => addItem(product.id, quantity)} disabled={product.stock === 0}>
              <ShoppingCart className="mr-2 size-4" />Add to Cart
            </Button>
            <Button variant="outline" size="icon-lg">
              <Heart className="size-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>

          {/* Perks */}
          <div className="mt-2 grid grid-cols-1 gap-3 rounded-xl border border-border/50 bg-secondary/30 p-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Truck className="size-4 text-primary" />
              <span className="text-xs">Free shipping over $100</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-primary" />
              <span className="text-xs">2 year warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="size-4 text-primary" />
              <span className="text-xs">30-day returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specs, Reviews */}
      <Tabs defaultValue="specs" className="mt-12">
        <TabsList>
          <TabsTrigger value="specs">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="specs" className="mt-6">
          <div className="rounded-xl border border-border/50">
            {Object.entries(product.specs).map(([key, value], i) => (
              <div key={key} className={`flex items-center justify-between px-6 py-3.5 ${i % 2 === 0 ? "bg-secondary/30" : ""}`}>
                <span className="text-sm font-medium text-muted-foreground">{key}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          {reviews.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No reviews yet. Be the first to review!</p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-xl border border-border/50 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                        {review.user?.firstName?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{review.user?.firstName} {review.user?.lastName}</p>
                        <p className="text-xs text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-xl font-bold">Related Products</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
