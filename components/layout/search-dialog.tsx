"use client"

import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { mockProducts } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])

  const search = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); return }
    const lower = q.toLowerCase()
    setResults(
      mockProducts
        .filter((p) => p.name.toLowerCase().includes(lower) || p.brand.toLowerCase().includes(lower) || p.description.toLowerCase().includes(lower))
        .slice(0, 5)
    )
  }, [])

  useEffect(() => {
    search(query)
  }, [query, search])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        onOpenChange(true)
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [onOpenChange])

  function handleSelect(slug: string) {
    setQuery("")
    onOpenChange(false)
    router.push(`/products/${slug}`)
  }

  function handleSearchAll() {
    onOpenChange(false)
    router.push(`/products?search=${encodeURIComponent(query)}`)
    setQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <div className="flex items-center border-b px-4">
          <Search className="mr-2 size-4 shrink-0 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) handleSearchAll() }}
            className="border-0 bg-transparent py-6 shadow-none focus-visible:ring-0"
          />
          <kbd className="hidden rounded-md border bg-muted px-2 py-0.5 text-xs text-muted-foreground sm:inline-block">ESC</kbd>
        </div>
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2">
            {results.map((product) => (
              <button
                key={product.id}
                onClick={() => handleSelect(product.slug)}
                className="flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors hover:bg-secondary"
              >
                <img src={product.images[0]} alt="" className="size-10 rounded-md object-cover" />
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">{product.brand} - ${product.price.toLocaleString()}</p>
                </div>
              </button>
            ))}
            {query.trim() && (
              <button onClick={handleSearchAll} className="mt-1 flex w-full items-center gap-2 rounded-lg p-3 text-sm text-primary transition-colors hover:bg-secondary">
                <Search className="size-4" />
                Search all for &quot;{query}&quot;
              </button>
            )}
          </div>
        )}
        {query.trim() && results.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">No products found for &quot;{query}&quot;</div>
        )}
      </DialogContent>
    </Dialog>
  )
}
