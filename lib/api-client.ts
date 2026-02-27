import { API_URL, IS_MOCK_MODE } from "./constants"
import { mockProducts, mockCategories, mockOrders, mockReviews, mockUsers, mockDashboardStats } from "./mock-data"
import type {
  Product, Category, Order, User, Review, Cart, CartItem, WishlistItem,
  PaginatedResponse, ProductFilters, AuthResponse, DashboardStats,
  CreateProductRequest, UpdateOrderStatusRequest,
} from "./types"
import { PRODUCTS_PER_PAGE, SHIPPING_COST, FREE_SHIPPING_THRESHOLD, TAX_RATE } from "./constants"

// ==========================================
// Token Management
// ==========================================
let accessToken: string | null = null

export function setToken(token: string | null) {
  accessToken = token
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("auth_token", token)
    else localStorage.removeItem("auth_token")
  }
}

export function getToken(): string | null {
  if (accessToken) return accessToken
  if (typeof window !== "undefined") {
    accessToken = localStorage.getItem("auth_token")
  }
  return accessToken
}

// ==========================================
// HTTP Client
// ==========================================
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken()
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(options.headers || {}),
  }

  const res = await fetch(`${API_URL}${endpoint}`, { ...options, headers })

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "An error occurred" }))
    throw new Error(error.message || `HTTP ${res.status}`)
  }

  return res.json()
}

// ==========================================
// Mock Cart (in-memory for demo mode)
// ==========================================
let mockCart: CartItem[] = []

function getMockCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("mock_cart")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveMockCart(cart: CartItem[]) {
  mockCart = cart
  if (typeof window !== "undefined") {
    localStorage.setItem("mock_cart", JSON.stringify(cart))
  }
}

function computeCartTotals(items: CartItem[]): Cart {
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  return { items, subtotal, shipping, tax, total: subtotal + shipping + tax }
}

// ==========================================
// Mock Wishlist
// ==========================================
function getMockWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return []
  try {
    const stored = localStorage.getItem("mock_wishlist")
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveMockWishlist(items: WishlistItem[]) {
  if (typeof window !== "undefined") {
    localStorage.setItem("mock_wishlist", JSON.stringify(items))
  }
}

// ==========================================
// Auth API
// ==========================================
export const authApi = {
  async login(email: string, password: string): Promise<AuthResponse> {
    if (IS_MOCK_MODE) {
      const user = email === "admin@voltstore.com"
        ? mockUsers[0]
        : { ...mockUsers[1], email }
      return { token: "mock-jwt-token-" + Date.now(), refreshToken: "mock-refresh-token", user }
    }
    return apiRequest<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    })
  },

  async register(data: { email: string; password: string; firstName: string; lastName: string; phone?: string }): Promise<AuthResponse> {
    if (IS_MOCK_MODE) {
      const user: User = {
        id: "user-" + Date.now(), email: data.email, firstName: data.firstName, lastName: data.lastName,
        phone: data.phone, role: "customer", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      }
      return { token: "mock-jwt-token-" + Date.now(), refreshToken: "mock-refresh-token", user }
    }
    return apiRequest<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    })
  },

  async getProfile(): Promise<User> {
    if (IS_MOCK_MODE) {
      const stored = typeof window !== "undefined" ? localStorage.getItem("mock_user") : null
      return stored ? JSON.parse(stored) : mockUsers[0]
    }
    return apiRequest<User>("/auth/me")
  },

  async updateProfile(data: { firstName: string; lastName: string; phone?: string }): Promise<User> {
    if (IS_MOCK_MODE) {
      const stored = typeof window !== "undefined" ? localStorage.getItem("mock_user") : null
      const user = stored ? { ...JSON.parse(stored), ...data } : { ...mockUsers[0], ...data }
      if (typeof window !== "undefined") localStorage.setItem("mock_user", JSON.stringify(user))
      return user
    }
    return apiRequest<User>("/auth/me", { method: "PUT", body: JSON.stringify(data) })
  },
}

// ==========================================
// Products API
// ==========================================
export const productsApi = {
  async getAll(filters: ProductFilters = {}): Promise<PaginatedResponse<Product>> {
    if (IS_MOCK_MODE) {
      let products = [...mockProducts].filter((p) => p.isActive)
      if (filters.search) {
        const q = filters.search.toLowerCase()
        products = products.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q))
      }
      if (filters.category) products = products.filter((p) => mockCategories.find((c) => c.id === p.categoryId)?.slug === filters.category)
      if (filters.brand) products = products.filter((p) => p.brand === filters.brand)
      if (filters.minPrice) products = products.filter((p) => p.price >= filters.minPrice!)
      if (filters.maxPrice) products = products.filter((p) => p.price <= filters.maxPrice!)
      if (filters.sort) {
        switch (filters.sort) {
          case "price_asc": products.sort((a, b) => a.price - b.price); break
          case "price_desc": products.sort((a, b) => b.price - a.price); break
          case "name_asc": products.sort((a, b) => a.name.localeCompare(b.name)); break
          case "name_desc": products.sort((a, b) => b.name.localeCompare(a.name)); break
          case "newest": products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break
          case "rating": products.sort((a, b) => b.rating - a.rating); break
        }
      }
      const page = filters.page || 1
      const limit = filters.limit || PRODUCTS_PER_PAGE
      const start = (page - 1) * limit
      return { data: products.slice(start, start + limit), total: products.length, page, limit, totalPages: Math.ceil(products.length / limit) }
    }
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([k, v]) => { if (v !== undefined) params.set(k, String(v)) })
    return apiRequest<PaginatedResponse<Product>>(`/products?${params}`)
  },

  async getBySlug(slug: string): Promise<Product> {
    if (IS_MOCK_MODE) {
      const product = mockProducts.find((p) => p.slug === slug)
      if (!product) throw new Error("Product not found")
      return { ...product, category: mockCategories.find((c) => c.id === product.categoryId) }
    }
    return apiRequest<Product>(`/products/${slug}`)
  },

  async getFeatured(): Promise<Product[]> {
    if (IS_MOCK_MODE) return mockProducts.filter((p) => p.isFeatured)
    return apiRequest<Product[]>("/products/featured")
  },

  async getReviews(productId: string): Promise<Review[]> {
    if (IS_MOCK_MODE) return mockReviews.filter((r) => r.productId === productId)
    return apiRequest<Review[]>(`/products/${productId}/reviews`)
  },

  async addReview(productId: string, data: { rating: number; comment: string }): Promise<Review> {
    if (IS_MOCK_MODE) {
      const review: Review = {
        id: "rev-" + Date.now(), productId, userId: "user-1",
        user: { firstName: "You", lastName: "", avatarUrl: undefined },
        ...data, createdAt: new Date().toISOString(),
      }
      return review
    }
    return apiRequest<Review>(`/products/${productId}/reviews`, { method: "POST", body: JSON.stringify(data) })
  },
}

// ==========================================
// Categories API
// ==========================================
export const categoriesApi = {
  async getAll(): Promise<Category[]> {
    if (IS_MOCK_MODE) return mockCategories
    return apiRequest<Category[]>("/categories")
  },

  async getBySlug(slug: string): Promise<Category & { products: Product[] }> {
    if (IS_MOCK_MODE) {
      const cat = mockCategories.find((c) => c.slug === slug)
      if (!cat) throw new Error("Category not found")
      return { ...cat, products: mockProducts.filter((p) => p.categoryId === cat.id) }
    }
    return apiRequest<Category & { products: Product[] }>(`/categories/${slug}`)
  },
}

// ==========================================
// Cart API
// ==========================================
export const cartApi = {
  async get(): Promise<Cart> {
    if (IS_MOCK_MODE) {
      mockCart = getMockCartFromStorage()
      return computeCartTotals(mockCart)
    }
    return apiRequest<Cart>("/cart")
  },

  async addItem(productId: string, quantity: number = 1): Promise<Cart> {
    if (IS_MOCK_MODE) {
      mockCart = getMockCartFromStorage()
      const existing = mockCart.find((item) => item.productId === productId)
      if (existing) {
        existing.quantity += quantity
      } else {
        const product = mockProducts.find((p) => p.id === productId)
        if (!product) throw new Error("Product not found")
        mockCart.push({ id: "ci-" + Date.now(), productId, product, quantity })
      }
      saveMockCart(mockCart)
      return computeCartTotals(mockCart)
    }
    return apiRequest<Cart>("/cart", { method: "POST", body: JSON.stringify({ productId, quantity }) })
  },

  async updateQuantity(itemId: string, quantity: number): Promise<Cart> {
    if (IS_MOCK_MODE) {
      mockCart = getMockCartFromStorage()
      const item = mockCart.find((i) => i.id === itemId)
      if (item) item.quantity = quantity
      saveMockCart(mockCart)
      return computeCartTotals(mockCart)
    }
    return apiRequest<Cart>(`/cart/${itemId}`, { method: "PUT", body: JSON.stringify({ quantity }) })
  },

  async removeItem(itemId: string): Promise<Cart> {
    if (IS_MOCK_MODE) {
      mockCart = getMockCartFromStorage()
      mockCart = mockCart.filter((i) => i.id !== itemId)
      saveMockCart(mockCart)
      return computeCartTotals(mockCart)
    }
    return apiRequest<Cart>(`/cart/${itemId}`, { method: "DELETE" })
  },

  async clear(): Promise<void> {
    if (IS_MOCK_MODE) {
      mockCart = []
      saveMockCart(mockCart)
      return
    }
    await apiRequest("/cart", { method: "DELETE" })
  },
}

// ==========================================
// Orders API
// ==========================================
export const ordersApi = {
  async getAll(): Promise<Order[]> {
    if (IS_MOCK_MODE) return mockOrders
    return apiRequest<Order[]>("/orders")
  },

  async getById(id: string): Promise<Order> {
    if (IS_MOCK_MODE) {
      const order = mockOrders.find((o) => o.id === id)
      if (!order) throw new Error("Order not found")
      return order
    }
    return apiRequest<Order>(`/orders/${id}`)
  },

  async create(data: { shippingAddress: Record<string, string> }): Promise<Order> {
    if (IS_MOCK_MODE) {
      mockCart = getMockCartFromStorage()
      const cart = computeCartTotals(mockCart)
      const order: Order = {
        id: "ord-" + Date.now(), userId: "user-1", status: "pending",
        items: cart.items.map((item) => ({
          id: "oi-" + Date.now() + Math.random(), orderId: "", productId: item.productId,
          quantity: item.quantity, price: item.product.price, productName: item.product.name, productImage: item.product.images[0],
        })),
        subtotal: cart.subtotal, shippingCost: cart.shipping, tax: cart.tax, total: cart.total,
        shippingAddress: data.shippingAddress as Order["shippingAddress"],
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
      }
      mockCart = []
      saveMockCart(mockCart)
      return order
    }
    return apiRequest<Order>("/orders", { method: "POST", body: JSON.stringify(data) })
  },
}

// ==========================================
// Wishlist API
// ==========================================
export const wishlistApi = {
  async getAll(): Promise<WishlistItem[]> {
    if (IS_MOCK_MODE) return getMockWishlist()
    return apiRequest<WishlistItem[]>("/wishlist")
  },

  async add(productId: string): Promise<WishlistItem> {
    if (IS_MOCK_MODE) {
      const items = getMockWishlist()
      const product = mockProducts.find((p) => p.id === productId)
      if (!product) throw new Error("Product not found")
      const item: WishlistItem = { id: "wl-" + Date.now(), userId: "user-1", productId, product, createdAt: new Date().toISOString() }
      items.push(item)
      saveMockWishlist(items)
      return item
    }
    return apiRequest<WishlistItem>("/wishlist", { method: "POST", body: JSON.stringify({ productId }) })
  },

  async remove(productId: string): Promise<void> {
    if (IS_MOCK_MODE) {
      const items = getMockWishlist().filter((i) => i.productId !== productId)
      saveMockWishlist(items)
      return
    }
    await apiRequest(`/wishlist/${productId}`, { method: "DELETE" })
  },
}

// ==========================================
// Admin API
// ==========================================
export const adminApi = {
  async getDashboard(): Promise<DashboardStats> {
    if (IS_MOCK_MODE) return mockDashboardStats
    return apiRequest<DashboardStats>("/admin/dashboard")
  },

  async getProducts(page: number = 1, limit: number = 20): Promise<PaginatedResponse<Product>> {
    if (IS_MOCK_MODE) {
      const start = (page - 1) * limit
      return { data: mockProducts.slice(start, start + limit), total: mockProducts.length, page, limit, totalPages: Math.ceil(mockProducts.length / limit) }
    }
    return apiRequest<PaginatedResponse<Product>>(`/admin/products?page=${page}&limit=${limit}`)
  },

  async createProduct(data: CreateProductRequest): Promise<Product> {
    if (IS_MOCK_MODE) {
      const product: Product = {
        ...data, id: "prod-" + Date.now(), slug: data.name.toLowerCase().replace(/\s+/g, "-"),
        rating: 0, reviewCount: 0, isActive: true, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
        specs: data.specs || {},
      }
      return product
    }
    return apiRequest<Product>("/admin/products", { method: "POST", body: JSON.stringify(data) })
  },

  async updateProduct(id: string, data: Partial<CreateProductRequest>): Promise<Product> {
    if (IS_MOCK_MODE) {
      const product = mockProducts.find((p) => p.id === id)
      if (!product) throw new Error("Product not found")
      return { ...product, ...data, updatedAt: new Date().toISOString() } as Product
    }
    return apiRequest<Product>(`/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) })
  },

  async deleteProduct(id: string): Promise<void> {
    if (IS_MOCK_MODE) return
    await apiRequest(`/admin/products/${id}`, { method: "DELETE" })
  },

  async getOrders(page: number = 1): Promise<PaginatedResponse<Order>> {
    if (IS_MOCK_MODE) {
      return { data: mockOrders, total: mockOrders.length, page, limit: 20, totalPages: 1 }
    }
    return apiRequest<PaginatedResponse<Order>>(`/admin/orders?page=${page}`)
  },

  async updateOrderStatus(id: string, data: UpdateOrderStatusRequest): Promise<Order> {
    if (IS_MOCK_MODE) {
      const order = mockOrders.find((o) => o.id === id)
      if (!order) throw new Error("Order not found")
      return { ...order, status: data.status, updatedAt: new Date().toISOString() }
    }
    return apiRequest<Order>(`/admin/orders/${id}/status`, { method: "PUT", body: JSON.stringify(data) })
  },

  async getUsers(page: number = 1): Promise<PaginatedResponse<User>> {
    if (IS_MOCK_MODE) {
      return { data: mockUsers, total: mockUsers.length, page, limit: 20, totalPages: 1 }
    }
    return apiRequest<PaginatedResponse<User>>(`/admin/users?page=${page}`)
  },

  async updateUserRole(id: string, role: "customer" | "admin"): Promise<User> {
    if (IS_MOCK_MODE) {
      const user = mockUsers.find((u) => u.id === id)
      if (!user) throw new Error("User not found")
      return { ...user, role }
    }
    return apiRequest<User>(`/admin/users/${id}/role`, { method: "PUT", body: JSON.stringify({ role }) })
  },
}
