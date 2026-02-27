// ==========================================
// E-Commerce Types
// ==========================================

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  role: "customer" | "admin"
  avatarUrl?: string
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  imageUrl?: string
  parentId?: string
  productCount?: number
  createdAt: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  compareAtPrice?: number
  sku: string
  stock: number
  categoryId: string
  category?: Category
  brand: string
  images: string[]
  specs: Record<string, string>
  rating: number
  reviewCount: number
  isFeatured: boolean
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface CartItem {
  id: string
  productId: string
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export interface ShippingAddress {
  firstName: string
  lastName: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  phone: string
}

export interface Order {
  id: string
  userId: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: OrderItem[]
  subtotal: number
  shippingCost: number
  tax: number
  total: number
  shippingAddress: ShippingAddress
  paymentIntentId?: string
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
  productName: string
  productImage: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  user?: Pick<User, "firstName" | "lastName" | "avatarUrl">
  rating: number
  comment: string
  createdAt: string
}

export interface WishlistItem {
  id: string
  userId: string
  productId: string
  product: Product
  createdAt: string
}

// ==========================================
// API Types
// ==========================================

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface ProductFilters {
  page?: number
  limit?: number
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  sort?: "price_asc" | "price_desc" | "name_asc" | "name_desc" | "newest" | "rating"
  search?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

export interface AuthResponse {
  token: string
  refreshToken: string
  user: User
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalProducts: number
  totalUsers: number
  revenueChange: number
  ordersChange: number
  revenueByMonth: { month: string; revenue: number }[]
  ordersByMonth: { month: string; orders: number }[]
  recentOrders: Order[]
  topProducts: (Product & { totalSold: number })[]
}

export interface CreateProductRequest {
  name: string
  description: string
  price: number
  compareAtPrice?: number
  sku: string
  stock: number
  categoryId: string
  brand: string
  images: string[]
  specs: Record<string, string>
  isFeatured: boolean
}

export interface UpdateOrderStatusRequest {
  status: Order["status"]
}
