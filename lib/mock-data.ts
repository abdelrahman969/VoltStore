import type { Category, Product, Order, User, Review, DashboardStats } from "./types"

export const mockCategories: Category[] = [
  { id: "cat-1", name: "Laptops", slug: "laptops", description: "High-performance laptops for work and gaming", imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=300&fit=crop", createdAt: "2025-01-01T00:00:00Z" },
  { id: "cat-2", name: "Phones", slug: "phones", description: "Latest smartphones from top brands", imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop", createdAt: "2025-01-01T00:00:00Z" },
  { id: "cat-3", name: "Tablets", slug: "tablets", description: "Powerful tablets for creativity and entertainment", imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop", createdAt: "2025-01-01T00:00:00Z" },
  { id: "cat-4", name: "Audio", slug: "audio", description: "Premium headphones, earbuds, and speakers", imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop", createdAt: "2025-01-01T00:00:00Z" },
  { id: "cat-5", name: "Accessories", slug: "accessories", description: "Essential tech accessories and peripherals", imageUrl: "https://images.unsplash.com/photo-1625723186993-60a58e51e5e7?w=400&h=300&fit=crop", createdAt: "2025-01-01T00:00:00Z" },
  { id: "cat-6", name: "Gaming", slug: "gaming", description: "Gaming consoles, controllers, and gear", imageUrl: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop", createdAt: "2025-01-01T00:00:00Z" },
]

export const mockProducts: Product[] = [
  {
    id: "prod-1", name: "MacBook Pro 16\" M4 Max", slug: "macbook-pro-16-m4-max", description: "The most powerful MacBook Pro ever. With the M4 Max chip, up to 128GB unified memory, and a stunning Liquid Retina XDR display, this laptop is built for professionals who demand the best.", price: 3499, compareAtPrice: 3699, sku: "MBP-16-M4MAX", stock: 25, categoryId: "cat-1", brand: "Apple",
    images: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&h=600&fit=crop"],
    specs: { "Processor": "Apple M4 Max", "RAM": "64GB Unified Memory", "Storage": "2TB SSD", "Display": "16.2\" Liquid Retina XDR", "Battery": "Up to 24 hours", "Weight": "2.14 kg" },
    rating: 4.9, reviewCount: 156, isFeatured: true, isActive: true, createdAt: "2025-06-01T00:00:00Z", updatedAt: "2025-06-01T00:00:00Z"
  },
  {
    id: "prod-2", name: "Samsung Galaxy S25 Ultra", slug: "samsung-galaxy-s25-ultra", description: "Experience the next level of mobile innovation. Galaxy S25 Ultra features Galaxy AI, a 200MP camera, and the powerful Snapdragon 8 Elite processor.", price: 1299, compareAtPrice: 1399, sku: "SGS25U", stock: 50, categoryId: "cat-2", brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop"],
    specs: { "Processor": "Snapdragon 8 Elite", "RAM": "12GB", "Storage": "512GB", "Display": "6.9\" Dynamic AMOLED 2X", "Camera": "200MP + 50MP + 10MP + 50MP", "Battery": "5000mAh" },
    rating: 4.7, reviewCount: 234, isFeatured: true, isActive: true, createdAt: "2025-05-01T00:00:00Z", updatedAt: "2025-05-01T00:00:00Z"
  },
  {
    id: "prod-3", name: "Sony WH-1000XM6", slug: "sony-wh-1000xm6", description: "Industry-leading noise cancellation meets premium sound quality. The XM6 headphones deliver an immersive audio experience with up to 40 hours of battery life.", price: 399, compareAtPrice: 449, sku: "SONY-XM6", stock: 80, categoryId: "cat-4", brand: "Sony",
    images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&h=600&fit=crop"],
    specs: { "Driver": "40mm", "Noise Cancellation": "Advanced ANC", "Battery": "40 hours", "Connectivity": "Bluetooth 5.3", "Weight": "250g", "Codec": "LDAC, AAC, SBC" },
    rating: 4.8, reviewCount: 412, isFeatured: true, isActive: true, createdAt: "2025-04-01T00:00:00Z", updatedAt: "2025-04-01T00:00:00Z"
  },
  {
    id: "prod-4", name: "iPad Pro 13\" M4", slug: "ipad-pro-13-m4", description: "The ultimate iPad experience. Ultra Thin design, tandem OLED display, and the M4 chip make this the most advanced tablet ever.", price: 1299, compareAtPrice: undefined, sku: "IPAD-PRO-13", stock: 40, categoryId: "cat-3", brand: "Apple",
    images: ["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&h=600&fit=crop"],
    specs: { "Processor": "Apple M4", "RAM": "16GB", "Storage": "512GB", "Display": "13\" Ultra Retina XDR OLED", "Camera": "12MP + LiDAR", "Weight": "579g" },
    rating: 4.8, reviewCount: 89, isFeatured: true, isActive: true, createdAt: "2025-03-01T00:00:00Z", updatedAt: "2025-03-01T00:00:00Z"
  },
  {
    id: "prod-5", name: "Dell XPS 15", slug: "dell-xps-15", description: "Stunning InfinityEdge display, powerful Intel Core Ultra processors, and a premium aluminum chassis. Perfect for creators and professionals.", price: 1799, compareAtPrice: 1999, sku: "DELL-XPS15", stock: 30, categoryId: "cat-1", brand: "Dell",
    images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop"],
    specs: { "Processor": "Intel Core Ultra 9", "RAM": "32GB DDR5", "Storage": "1TB SSD", "Display": "15.6\" OLED 3.5K", "GPU": "NVIDIA RTX 4070", "Weight": "1.86 kg" },
    rating: 4.6, reviewCount: 178, isFeatured: false, isActive: true, createdAt: "2025-02-01T00:00:00Z", updatedAt: "2025-02-01T00:00:00Z"
  },
  {
    id: "prod-6", name: "iPhone 16 Pro Max", slug: "iphone-16-pro-max", description: "Titanium design, A18 Pro chip, 48MP camera system with 5x optical zoom, and Action button. The most powerful iPhone ever.", price: 1199, compareAtPrice: undefined, sku: "IP16PM", stock: 100, categoryId: "cat-2", brand: "Apple",
    images: ["https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop"],
    specs: { "Processor": "A18 Pro", "RAM": "8GB", "Storage": "256GB", "Display": "6.9\" Super Retina XDR", "Camera": "48MP + 12MP + 12MP", "Battery": "4685mAh" },
    rating: 4.7, reviewCount: 534, isFeatured: true, isActive: true, createdAt: "2025-01-15T00:00:00Z", updatedAt: "2025-01-15T00:00:00Z"
  },
  {
    id: "prod-7", name: "Bose QuietComfort Ultra Earbuds", slug: "bose-qc-ultra-earbuds", description: "Immersive audio with world-class noise cancellation in a compact earbud design. CustomTune technology adapts to your ears for a personalized experience.", price: 299, compareAtPrice: 349, sku: "BOSE-QCUE", stock: 60, categoryId: "cat-4", brand: "Bose",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop"],
    specs: { "Driver": "9.3mm", "Noise Cancellation": "Advanced ANC", "Battery": "6h (24h with case)", "Connectivity": "Bluetooth 5.3", "Water Resistance": "IPX4", "Weight": "6.2g per bud" },
    rating: 4.5, reviewCount: 267, isFeatured: false, isActive: true, createdAt: "2025-03-10T00:00:00Z", updatedAt: "2025-03-10T00:00:00Z"
  },
  {
    id: "prod-8", name: "ASUS ROG Strix G16", slug: "asus-rog-strix-g16", description: "Dominate the competition with the ROG Strix G16 gaming laptop. Powered by an Intel Core i9 and NVIDIA RTX 4080, with a blazing 240Hz display.", price: 2199, compareAtPrice: 2499, sku: "ASUS-ROG-G16", stock: 15, categoryId: "cat-6", brand: "ASUS",
    images: ["https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=600&h=600&fit=crop"],
    specs: { "Processor": "Intel Core i9-14900HX", "RAM": "32GB DDR5", "Storage": "1TB SSD", "Display": "16\" QHD 240Hz", "GPU": "NVIDIA RTX 4080", "Weight": "2.5 kg" },
    rating: 4.7, reviewCount: 92, isFeatured: true, isActive: true, createdAt: "2025-04-15T00:00:00Z", updatedAt: "2025-04-15T00:00:00Z"
  },
  {
    id: "prod-9", name: "Logitech MX Master 3S", slug: "logitech-mx-master-3s", description: "The master of precision. 8000 DPI tracking on any surface, quiet clicks, and MagSpeed scroll wheel. The ultimate productivity mouse.", price: 99, compareAtPrice: 109, sku: "LOG-MXM3S", stock: 200, categoryId: "cat-5", brand: "Logitech",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop"],
    specs: { "Sensor": "8000 DPI", "Connectivity": "Bluetooth, USB-C", "Battery": "70 days", "Buttons": "7", "Weight": "141g", "Compatibility": "macOS, Windows, Linux" },
    rating: 4.8, reviewCount: 1023, isFeatured: false, isActive: true, createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z"
  },
  {
    id: "prod-10", name: "Samsung Galaxy Tab S10 Ultra", slug: "samsung-galaxy-tab-s10-ultra", description: "The biggest, most immersive Galaxy Tab yet. 14.6\" AMOLED display, S Pen included, and powered by the Dimensity 9300+.", price: 1199, compareAtPrice: 1299, sku: "SGT-S10U", stock: 35, categoryId: "cat-3", brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=600&h=600&fit=crop"],
    specs: { "Processor": "Dimensity 9300+", "RAM": "16GB", "Storage": "512GB", "Display": "14.6\" Dynamic AMOLED 2X", "Camera": "13MP + 8MP", "Battery": "11200mAh" },
    rating: 4.6, reviewCount: 67, isFeatured: false, isActive: true, createdAt: "2025-05-20T00:00:00Z", updatedAt: "2025-05-20T00:00:00Z"
  },
  {
    id: "prod-11", name: "JBL Charge 6", slug: "jbl-charge-6", description: "Bold sound, built to last. The JBL Charge 6 delivers powerful audio with deep bass, IP67 waterproof rating, and 24 hours of playtime.", price: 179, compareAtPrice: undefined, sku: "JBL-CHG6", stock: 90, categoryId: "cat-4", brand: "JBL",
    images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600&h=600&fit=crop"],
    specs: { "Driver": "Dual drivers + dual bass radiators", "Battery": "24 hours", "Water Resistance": "IP67", "Connectivity": "Bluetooth 5.3", "Charging": "USB-C + Powerbank", "Weight": "955g" },
    rating: 4.6, reviewCount: 189, isFeatured: false, isActive: true, createdAt: "2025-02-15T00:00:00Z", updatedAt: "2025-02-15T00:00:00Z"
  },
  {
    id: "prod-12", name: "Lenovo ThinkPad X1 Carbon Gen 12", slug: "lenovo-thinkpad-x1-carbon-12", description: "The gold standard for business laptops. Ultra-light carbon fiber chassis, Intel Core Ultra vPro, and legendary keyboard.", price: 1649, compareAtPrice: 1849, sku: "LEN-X1C12", stock: 20, categoryId: "cat-1", brand: "Lenovo",
    images: ["https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop"],
    specs: { "Processor": "Intel Core Ultra 7 vPro", "RAM": "32GB LPDDR5x", "Storage": "1TB SSD", "Display": "14\" 2.8K OLED", "Battery": "Up to 15 hours", "Weight": "1.09 kg" },
    rating: 4.7, reviewCount: 145, isFeatured: false, isActive: true, createdAt: "2025-03-20T00:00:00Z", updatedAt: "2025-03-20T00:00:00Z"
  },
  {
    id: "prod-13", name: "PS5 Pro", slug: "ps5-pro", description: "The most powerful PlayStation ever. Enhanced GPU with Ray Tracing, 2TB SSD, and 8K support for the ultimate gaming experience.", price: 699, compareAtPrice: undefined, sku: "SONY-PS5P", stock: 45, categoryId: "cat-6", brand: "Sony",
    images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?w=600&h=600&fit=crop"],
    specs: { "GPU": "Enhanced RDNA 3.5", "CPU": "AMD Zen 2 8-core", "Storage": "2TB SSD", "Resolution": "Up to 8K", "Ray Tracing": "Advanced RT", "Disc Drive": "Detachable" },
    rating: 4.9, reviewCount: 678, isFeatured: true, isActive: true, createdAt: "2025-06-10T00:00:00Z", updatedAt: "2025-06-10T00:00:00Z"
  },
  {
    id: "prod-14", name: "Apple Watch Ultra 3", slug: "apple-watch-ultra-3", description: "Built for extreme adventures. 49mm titanium case, dual-frequency GPS, up to 72 hours battery, and satellite connectivity.", price: 799, compareAtPrice: 849, sku: "AW-ULTRA3", stock: 55, categoryId: "cat-5", brand: "Apple",
    images: ["https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=600&h=600&fit=crop"],
    specs: { "Case": "49mm Titanium", "Display": "Always-On Retina LTPO3", "Battery": "Up to 72 hours", "GPS": "Dual-frequency L1+L5", "Water Resistance": "100m", "Connectivity": "LTE + Satellite SOS" },
    rating: 4.8, reviewCount: 203, isFeatured: false, isActive: true, createdAt: "2025-04-01T00:00:00Z", updatedAt: "2025-04-01T00:00:00Z"
  },
  {
    id: "prod-15", name: "HP Spectre x360 16", slug: "hp-spectre-x360-16", description: "A stunning 2-in-1 convertible with a 16\" OLED display, Intel Core Ultra, and premium gem-cut design. Perfect for creatives on the go.", price: 1599, compareAtPrice: 1799, sku: "HP-SPEC360", stock: 18, categoryId: "cat-1", brand: "HP",
    images: ["https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop"],
    specs: { "Processor": "Intel Core Ultra 7", "RAM": "32GB LPDDR5x", "Storage": "1TB SSD", "Display": "16\" 3K OLED Touch", "GPU": "Intel Arc Graphics", "Weight": "2.04 kg" },
    rating: 4.5, reviewCount: 76, isFeatured: false, isActive: true, createdAt: "2025-02-20T00:00:00Z", updatedAt: "2025-02-20T00:00:00Z"
  },
  {
    id: "prod-16", name: "Samsung Galaxy Buds3 Pro", slug: "samsung-galaxy-buds3-pro", description: "Intelligent ANC, 360 Audio, and crystal-clear calls. The Galaxy Buds3 Pro delivers a premium listening experience with a sleek blade design.", price: 249, compareAtPrice: 279, sku: "SG-BUDS3P", stock: 120, categoryId: "cat-4", brand: "Samsung",
    images: ["https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=600&h=600&fit=crop"],
    specs: { "Driver": "10.5mm dynamic + 6.1mm planar", "ANC": "Intelligent Active Noise Cancellation", "Battery": "7h (30h with case)", "Connectivity": "Bluetooth 5.4", "Water Resistance": "IP57", "Codec": "Samsung Seamless, AAC, SBC" },
    rating: 4.4, reviewCount: 312, isFeatured: false, isActive: true, createdAt: "2025-05-10T00:00:00Z", updatedAt: "2025-05-10T00:00:00Z"
  },
  {
    id: "prod-17", name: "Logitech G Pro X Superlight 2", slug: "logitech-g-pro-x-superlight-2", description: "Ultra-lightweight gaming mouse at just 60g. HERO 2 sensor with 44K DPI, LIGHTSPEED wireless, and 95 hours of battery life.", price: 159, compareAtPrice: undefined, sku: "LOG-GPXSL2", stock: 75, categoryId: "cat-6", brand: "Logitech",
    images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&h=600&fit=crop"],
    specs: { "Sensor": "HERO 2 (44K DPI)", "Weight": "60g", "Battery": "95 hours", "Connectivity": "LIGHTSPEED Wireless", "Switches": "LIGHTFORCE Hybrid", "Polling Rate": "2000Hz" },
    rating: 4.8, reviewCount: 456, isFeatured: false, isActive: true, createdAt: "2025-01-20T00:00:00Z", updatedAt: "2025-01-20T00:00:00Z"
  },
  {
    id: "prod-18", name: "Google Pixel 9 Pro", slug: "google-pixel-9-pro", description: "The best of Google AI in a phone. Tensor G4 chip, 50MP triple camera with Magic Eraser, and 7 years of updates.", price: 999, compareAtPrice: 1099, sku: "GP-9PRO", stock: 65, categoryId: "cat-2", brand: "Google",
    images: ["https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&h=600&fit=crop", "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=600&h=600&fit=crop"],
    specs: { "Processor": "Google Tensor G4", "RAM": "16GB", "Storage": "256GB", "Display": "6.3\" LTPO OLED 120Hz", "Camera": "50MP + 48MP + 48MP", "Battery": "5060mAh" },
    rating: 4.6, reviewCount: 198, isFeatured: false, isActive: true, createdAt: "2025-04-10T00:00:00Z", updatedAt: "2025-04-10T00:00:00Z"
  },
]

export const mockReviews: Review[] = [
  { id: "rev-1", productId: "prod-1", userId: "user-2", user: { firstName: "Sarah", lastName: "Johnson", avatarUrl: undefined }, rating: 5, comment: "Absolutely incredible laptop. The M4 Max handles everything I throw at it. Best purchase I've made this year.", createdAt: "2025-06-15T10:00:00Z" },
  { id: "rev-2", productId: "prod-1", userId: "user-3", user: { firstName: "Mike", lastName: "Chen", avatarUrl: undefined }, rating: 5, comment: "The display is stunning and the performance is unmatched. Worth every penny for professional work.", createdAt: "2025-06-20T14:30:00Z" },
  { id: "rev-3", productId: "prod-2", userId: "user-4", user: { firstName: "Emma", lastName: "Williams", avatarUrl: undefined }, rating: 4, comment: "Great phone with amazing camera. Galaxy AI features are genuinely useful. Battery life could be slightly better.", createdAt: "2025-05-20T09:00:00Z" },
  { id: "rev-4", productId: "prod-3", userId: "user-5", user: { firstName: "James", lastName: "Brown", avatarUrl: undefined }, rating: 5, comment: "The noise cancellation is on another level. Perfect for flights and commuting. Sound quality is phenomenal.", createdAt: "2025-05-10T16:00:00Z" },
  { id: "rev-5", productId: "prod-6", userId: "user-2", user: { firstName: "Sarah", lastName: "Johnson", avatarUrl: undefined }, rating: 5, comment: "Love the titanium design. Camera improvements are significant. The Action button is very convenient.", createdAt: "2025-02-01T11:00:00Z" },
]

export const mockUsers: User[] = [
  { id: "user-1", email: "admin@voltstore.com", firstName: "Admin", lastName: "User", phone: "+1234567890", role: "admin", createdAt: "2025-01-01T00:00:00Z", updatedAt: "2025-01-01T00:00:00Z" },
  { id: "user-2", email: "sarah@example.com", firstName: "Sarah", lastName: "Johnson", phone: "+1234567891", role: "customer", createdAt: "2025-01-15T00:00:00Z", updatedAt: "2025-01-15T00:00:00Z" },
  { id: "user-3", email: "mike@example.com", firstName: "Mike", lastName: "Chen", phone: "+1234567892", role: "customer", createdAt: "2025-02-01T00:00:00Z", updatedAt: "2025-02-01T00:00:00Z" },
  { id: "user-4", email: "emma@example.com", firstName: "Emma", lastName: "Williams", phone: "+1234567893", role: "customer", createdAt: "2025-02-15T00:00:00Z", updatedAt: "2025-02-15T00:00:00Z" },
  { id: "user-5", email: "james@example.com", firstName: "James", lastName: "Brown", phone: "+1234567894", role: "customer", createdAt: "2025-03-01T00:00:00Z", updatedAt: "2025-03-01T00:00:00Z" },
]

export const mockOrders: Order[] = [
  {
    id: "ord-1", userId: "user-2", status: "delivered",
    items: [
      { id: "oi-1", orderId: "ord-1", productId: "prod-1", quantity: 1, price: 3499, productName: "MacBook Pro 16\" M4 Max", productImage: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop" },
    ],
    subtotal: 3499, shippingCost: 0, tax: 279.92, total: 3778.92,
    shippingAddress: { firstName: "Sarah", lastName: "Johnson", address: "123 Main St", city: "San Francisco", state: "CA", zipCode: "94102", country: "US", phone: "+1234567891" },
    createdAt: "2025-06-10T10:00:00Z", updatedAt: "2025-06-15T10:00:00Z"
  },
  {
    id: "ord-2", userId: "user-3", status: "shipped",
    items: [
      { id: "oi-2", orderId: "ord-2", productId: "prod-2", quantity: 1, price: 1299, productName: "Samsung Galaxy S25 Ultra", productImage: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=100&h=100&fit=crop" },
      { id: "oi-3", orderId: "ord-2", productId: "prod-9", quantity: 1, price: 99, productName: "Logitech MX Master 3S", productImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop" },
    ],
    subtotal: 1398, shippingCost: 0, tax: 111.84, total: 1509.84,
    shippingAddress: { firstName: "Mike", lastName: "Chen", address: "456 Oak Ave", city: "New York", state: "NY", zipCode: "10001", country: "US", phone: "+1234567892" },
    createdAt: "2025-06-18T14:00:00Z", updatedAt: "2025-06-20T09:00:00Z"
  },
  {
    id: "ord-3", userId: "user-4", status: "processing",
    items: [
      { id: "oi-4", orderId: "ord-3", productId: "prod-3", quantity: 2, price: 399, productName: "Sony WH-1000XM6", productImage: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100&h=100&fit=crop" },
    ],
    subtotal: 798, shippingCost: 0, tax: 63.84, total: 861.84,
    shippingAddress: { firstName: "Emma", lastName: "Williams", address: "789 Pine Rd", city: "Chicago", state: "IL", zipCode: "60601", country: "US", phone: "+1234567893" },
    createdAt: "2025-06-22T16:00:00Z", updatedAt: "2025-06-22T16:00:00Z"
  },
  {
    id: "ord-4", userId: "user-5", status: "pending",
    items: [
      { id: "oi-5", orderId: "ord-4", productId: "prod-8", quantity: 1, price: 2199, productName: "ASUS ROG Strix G16", productImage: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=100&h=100&fit=crop" },
      { id: "oi-6", orderId: "ord-4", productId: "prod-17", quantity: 1, price: 159, productName: "Logitech G Pro X Superlight 2", productImage: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop" },
    ],
    subtotal: 2358, shippingCost: 0, tax: 188.64, total: 2546.64,
    shippingAddress: { firstName: "James", lastName: "Brown", address: "321 Elm St", city: "Austin", state: "TX", zipCode: "73301", country: "US", phone: "+1234567894" },
    createdAt: "2025-06-25T11:00:00Z", updatedAt: "2025-06-25T11:00:00Z"
  },
]

export const mockDashboardStats: DashboardStats = {
  totalRevenue: 45892.24,
  totalOrders: 156,
  totalProducts: 18,
  totalUsers: 1243,
  revenueChange: 12.5,
  ordersChange: 8.3,
  revenueByMonth: [
    { month: "Jan", revenue: 4200 }, { month: "Feb", revenue: 5100 }, { month: "Mar", revenue: 4800 },
    { month: "Apr", revenue: 6200 }, { month: "May", revenue: 7500 }, { month: "Jun", revenue: 8200 },
    { month: "Jul", revenue: 6800 }, { month: "Aug", revenue: 7400 }, { month: "Sep", revenue: 8900 },
    { month: "Oct", revenue: 9500 }, { month: "Nov", revenue: 11200 }, { month: "Dec", revenue: 13500 },
  ],
  ordersByMonth: [
    { month: "Jan", orders: 12 }, { month: "Feb", orders: 15 }, { month: "Mar", orders: 11 },
    { month: "Apr", orders: 18 }, { month: "May", orders: 22 }, { month: "Jun", orders: 28 },
    { month: "Jul", orders: 20 }, { month: "Aug", orders: 24 }, { month: "Sep", orders: 30 },
    { month: "Oct", orders: 35 }, { month: "Nov", orders: 42 }, { month: "Dec", orders: 50 },
  ],
  recentOrders: [],
  topProducts: [],
}

// Initialize recentOrders and topProducts after declarations
mockDashboardStats.recentOrders = mockOrders
mockDashboardStats.topProducts = mockProducts.slice(0, 5).map((p, i) => ({ ...p, totalSold: [156, 134, 112, 98, 87][i] }))
