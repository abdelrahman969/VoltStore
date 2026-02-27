export const APP_NAME = "VoltStore"
export const APP_DESCRIPTION = "Premium Electronics Store"

export const API_URL = process.env.NEXT_PUBLIC_API_URL || ""
export const IS_MOCK_MODE = !process.env.NEXT_PUBLIC_API_URL

export const CURRENCY = "USD"
export const CURRENCY_SYMBOL = "$"

export const SHIPPING_COST = 9.99
export const FREE_SHIPPING_THRESHOLD = 100
export const TAX_RATE = 0.08

export const PRODUCTS_PER_PAGE = 12

export const ORDER_STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
}

export const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-500",
  processing: "bg-blue-500/10 text-blue-500",
  shipped: "bg-purple-500/10 text-purple-500",
  delivered: "bg-emerald-500/10 text-emerald-500",
  cancelled: "bg-red-500/10 text-red-500",
}

export const BRANDS = [
  "Apple",
  "Samsung",
  "Sony",
  "Dell",
  "HP",
  "Lenovo",
  "ASUS",
  "Bose",
  "JBL",
  "Logitech",
]

export const NAV_CATEGORIES = [
  { name: "Laptops", slug: "laptops" },
  { name: "Phones", slug: "phones" },
  { name: "Tablets", slug: "tablets" },
  { name: "Audio", slug: "audio" },
  { name: "Accessories", slug: "accessories" },
  { name: "Gaming", slug: "gaming" },
]
