import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const shippingSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  address: z.string().min(5, "Required"),
  city: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  zipCode: z.string().min(4, "Required"),
  country: z.string().min(2, "Required"),
  phone: z.string().min(8, "Required"),
})

export const productSchema = z.object({
  name: z.string().min(3, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  compareAtPrice: z.coerce.number().positive().optional().or(z.literal(0)),
  sku: z.string().min(2, "SKU is required"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  specs: z.record(z.string(), z.string()).optional(),
  isFeatured: z.boolean().default(false),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5, "Review must be at least 5 characters"),
})

export const profileSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  phone: z.string().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>
export type ShippingFormData = z.infer<typeof shippingSchema>
export type ProductFormData = z.infer<typeof productSchema>
export type ReviewFormData = z.infer<typeof reviewSchema>
export type ProfileFormData = z.infer<typeof profileSchema>
