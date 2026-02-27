import { Suspense } from "react"
import ProductsPageClient from "./products-page-client"

export default function ProductsPage() {
  return (
    <Suspense fallback={null}>
      <ProductsPageClient />
    </Suspense>
  )
}
