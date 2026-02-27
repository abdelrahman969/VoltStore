"use client"

import Link from "next/link"
import { ArrowRight, Zap, Truck, ShieldCheck, Headphones } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/store/product-card"
import { mockProducts, mockCategories } from "@/lib/mock-data"

const featuredProducts = mockProducts.filter((p) => p.isFeatured)
const categories = mockCategories

const perks = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
  { icon: ShieldCheck, title: "2 Year Warranty", desc: "On all electronics" },
  { icon: Headphones, title: "24/7 Support", desc: "Expert assistance" },
  { icon: Zap, title: "Fast Delivery", desc: "Same-day in select areas" },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-4 py-20 text-center md:py-32">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Zap className="size-3.5" />
            New Arrivals - Latest Tech Collection
          </div>
          <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
            Premium Electronics for the <span className="text-primary">Modern World</span>
          </h1>
          <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Discover the latest laptops, phones, tablets, and audio gear from top brands. Experience technology at its finest.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base">
              <Link href="/products">Shop Now <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
              <Link href="/categories/laptops">Browse Laptops</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Perks */}
      <section className="border-y border-border/50 bg-secondary/30">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {perks.map((perk) => (
            <div key={perk.title} className="flex items-center gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <perk.icon className="size-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">{perk.title}</p>
                <p className="text-xs text-muted-foreground">{perk.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
            <p className="mt-1 text-muted-foreground">Find exactly what you need</p>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="group relative flex aspect-square flex-col items-center justify-end overflow-hidden rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/20 hover:shadow-lg"
            >
              <img src={cat.imageUrl} alt={cat.name} className="absolute inset-0 size-full object-cover opacity-60 transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <span className="relative text-sm font-semibold">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
            <p className="mt-1 text-muted-foreground">Hand-picked top sellers</p>
          </div>
          <Link href="/products" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View All <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Deals Banner */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-16">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8 md:p-12">
          <div className="relative max-w-lg">
            <p className="text-sm font-semibold text-primary">Limited Time Offer</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Up to 30% Off on Selected Items</h2>
            <p className="mt-3 text-muted-foreground">
              Get the best deals on laptops, headphones, and accessories. Offer ends soon.
            </p>
            <Button asChild className="mt-6" size="lg">
              <Link href="/products">Shop Deals <ArrowRight className="ml-1 size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* All Products Preview */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Latest Products</h2>
            <p className="mt-1 text-muted-foreground">Explore our newest additions</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/products">View All Products <ArrowRight className="ml-1 size-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
