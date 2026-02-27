"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/store/product-card"
import { categoriesApi } from "@/lib/api-client"
import type { Product, Category } from "@/lib/types"

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [category, setCategory] = useState<(Category & { products: Product[] }) | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await categoriesApi.getBySlug(slug)
        setCategory(data)
      } catch {
        setCategory(null)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [slug])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 h-8 w-48 animate-pulse rounded-lg bg-secondary" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-secondary" />
          ))}
        </div>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <p className="text-lg font-medium">Category not found</p>
        <Link href="/products" className="mt-2 text-sm text-primary hover:underline">Back to Products</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="size-3.5" />
        <Link href="/products" className="hover:text-foreground">Products</Link>
        <ChevronRight className="size-3.5" />
        <span className="text-foreground">{category.name}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">{category.name}</h1>
        {category.description && <p className="mt-1 text-muted-foreground">{category.description}</p>}
        <p className="mt-2 text-sm text-muted-foreground">{category.products.length} products</p>
      </div>

      {category.products.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-muted-foreground">No products in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {category.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
