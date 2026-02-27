"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useSearchParams } from "next/navigation"
import { SlidersHorizontal, Grid3X3, List, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { ProductCard } from "@/components/store/product-card"
import { productsApi } from "@/lib/api-client"
import { BRANDS } from "@/lib/constants"
import { mockCategories } from "@/lib/mock-data"
import type { Product, ProductFilters } from "@/lib/types"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get("search") || ""
  const initialCategory = searchParams.get("category") || ""

  const [products, setProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<"grid" | "list">("grid")
  const [search, setSearch] = useState(initialSearch)
  const [sort, setSort] = useState<ProductFilters["sort"]>("newest")
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 5000])

  const filters: ProductFilters = useMemo(() => ({
    search: search || undefined,
    category: selectedCategory || undefined,
    brand: selectedBrands.length === 1 ? selectedBrands[0] : undefined,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 5000 ? priceRange[1] : undefined,
    sort,
    limit: 50,
  }), [search, selectedCategory, selectedBrands, priceRange, sort])

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const res = await productsApi.getAll(filters)
      let data = res.data
      if (selectedBrands.length > 1) {
        data = data.filter((p) => selectedBrands.includes(p.brand))
      }
      setProducts(data)
      setTotal(res.total)
    } catch {
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [filters, selectedBrands])

  useEffect(() => { fetchProducts() }, [fetchProducts])

  const activeFilterCount = [selectedCategory, selectedBrands.length > 0, priceRange[0] > 0 || priceRange[1] < 5000].filter(Boolean).length

  function clearFilters() {
    setSelectedCategory("")
    setSelectedBrands([])
    setPriceRange([0, 5000])
    setSearch("")
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand])
  }

  const FiltersContent = (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Category</h3>
        <div className="flex flex-col gap-1.5">
          {mockCategories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(selectedCategory === cat.slug ? "" : cat.slug)}
              className={`rounded-lg px-3 py-2 text-left text-sm transition-colors ${selectedCategory === cat.slug ? "bg-primary/10 font-medium text-primary" : "text-muted-foreground hover:bg-secondary"}`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Price Range</h3>
        <Slider min={0} max={5000} step={50} value={priceRange} onValueChange={setPriceRange} className="mb-3" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>${priceRange[0].toLocaleString()}</span>
          <span>${priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h3 className="mb-3 text-sm font-semibold">Brand</h3>
        <div className="flex flex-col gap-2">
          {BRANDS.map((brand) => (
            <label key={brand} className="flex cursor-pointer items-center gap-2.5">
              <Checkbox checked={selectedBrands.includes(brand)} onCheckedChange={() => toggleBrand(brand)} />
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {activeFilterCount > 0 && (
        <Button variant="outline" onClick={clearFilters} className="mt-2">
          <X className="mr-2 size-4" /> Clear All Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
          <p className="mt-1 text-sm text-muted-foreground">{total} products found</p>
        </div>
        <div className="flex items-center gap-3">
          <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-48 sm:w-64" />
          <Select value={sort} onValueChange={(v) => setSort(v as ProductFilters["sort"])}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_asc">Price: Low to High</SelectItem>
              <SelectItem value="price_desc">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="name_asc">Name: A-Z</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden items-center gap-1 lg:flex">
            <Button variant={view === "grid" ? "secondary" : "ghost"} size="icon-sm" onClick={() => setView("grid")}>
              <Grid3X3 className="size-4" />
            </Button>
            <Button variant={view === "list" ? "secondary" : "ghost"} size="icon-sm" onClick={() => setView("list")}>
              <List className="size-4" />
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <SlidersHorizontal className="mr-2 size-4" />Filters
                {activeFilterCount > 0 && <Badge className="ml-2">{activeFilterCount}</Badge>}
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader><SheetTitle>Filters</SheetTitle></SheetHeader>
              <div className="mt-4">{FiltersContent}</div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Active filters badges */}
      {activeFilterCount > 0 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          {selectedCategory && (
            <Badge variant="secondary" className="gap-1">
              {mockCategories.find((c) => c.slug === selectedCategory)?.name}
              <button onClick={() => setSelectedCategory("")}><X className="size-3" /></button>
            </Badge>
          )}
          {selectedBrands.map((b) => (
            <Badge key={b} variant="secondary" className="gap-1">
              {b}
              <button onClick={() => toggleBrand(b)}><X className="size-3" /></button>
            </Badge>
          ))}
          {(priceRange[0] > 0 || priceRange[1] < 5000) && (
            <Badge variant="secondary" className="gap-1">
              ${priceRange[0]} - ${priceRange[1]}
              <button onClick={() => setPriceRange([0, 5000])}><X className="size-3" /></button>
            </Badge>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden w-64 shrink-0 lg:block">
          {FiltersContent}
        </aside>

        {/* Products Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[3/4] animate-pulse rounded-xl bg-secondary" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className="text-lg font-medium">No products found</p>
              <p className="mt-1 text-muted-foreground">Try adjusting your filters or search query</p>
              <Button variant="outline" onClick={clearFilters} className="mt-4">Clear Filters</Button>
            </div>
          ) : (
            <div className={view === "grid" ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-4"}>
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
