export type ProductCategory = "cookies" | "bouquets";

export interface Product {
  _id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: ProductCategory;
  images: string[];
  featured: boolean;
  inStock: boolean;
  inventory: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Testimonial {
  _id: string;
  name: string;
  occasion: string;
  rating: number;
  comment: string;
  image?: string;
  featured: boolean;
  createdAt: string;
}

export interface GalleryImage {
  _id: string;
  title: string;
  image: string;
  category: "cookies" | "bouquets" | "events" | "customers";
  featured: boolean;
  createdAt: string;
}

export interface Order {
  _id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";
  deliveryDate?: string;
  notes?: string;
  createdAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface CustomOrder {
  _id: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bouquetType: string;
  occasion: string;
  denomination: string;
  referenceImage?: string;
  specialInstructions?: string;
  deliveryDate: string;
  status: "pending" | "reviewing" | "approved" | "in-progress" | "completed" | "cancelled";
  createdAt: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface HomepageContent {
  _id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  aboutSnippet: string;
  newsletterTitle: string;
  newsletterSubtitle: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

export type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc" | "rating" | "newest";
