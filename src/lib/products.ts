import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { seedProducts } from "@/lib/seed-data";
import type { Product as ProductType, SortOption } from "@/types";

function toProduct(doc: {
  _id: unknown;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: ProductType["category"];
  images: string[];
  featured: boolean;
  inStock: boolean;
  inventory: number;
  tags: string[];
  rating: number;
  reviewCount: number;
  createdAt?: Date;
  updatedAt?: Date;
}): ProductType {
  return {
    _id: String(doc._id),
    name: doc.name,
    slug: doc.slug,
    description: doc.description,
    shortDescription: doc.shortDescription,
    price: doc.price,
    compareAtPrice: doc.compareAtPrice,
    category: doc.category,
    images: doc.images,
    featured: doc.featured,
    inStock: doc.inStock,
    inventory: doc.inventory,
    tags: doc.tags,
    rating: doc.rating,
    reviewCount: doc.reviewCount,
    createdAt: doc.createdAt?.toISOString?.() || new Date().toISOString(),
    updatedAt: doc.updatedAt?.toISOString?.() || new Date().toISOString(),
  };
}

function fallbackProducts(): ProductType[] {
  return seedProducts.map((p, i) => ({
    ...p,
    _id: `seed-${i}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));
}

export async function getProducts(options?: {
  category?: string;
  search?: string;
  featured?: boolean;
  sort?: SortOption;
}): Promise<ProductType[]> {
  try {
    await connectDB();
    const query: Record<string, unknown> = {};

    if (options?.category && options.category !== "all") {
      query.category = options.category;
    }
    if (options?.featured) {
      query.featured = true;
    }
    if (options?.search) {
      query.$text = { $search: options.search };
    }

    let sortQuery: Record<string, 1 | -1> = { createdAt: -1 };
    switch (options?.sort) {
      case "price-asc":
        sortQuery = { price: 1 };
        break;
      case "price-desc":
        sortQuery = { price: -1 };
        break;
      case "name-asc":
        sortQuery = { name: 1 };
        break;
      case "name-desc":
        sortQuery = { name: -1 };
        break;
      case "rating":
        sortQuery = { rating: -1 };
        break;
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
    }

    const docs = await Product.find(query).sort(sortQuery).lean();
    if (docs.length === 0 && !options?.search) return fallbackProducts();
    return docs.map((d) => toProduct(d));
  } catch {
    let products = fallbackProducts();
    if (options?.category && options.category !== "all") {
      products = products.filter((p) => p.category === options.category);
    }
    if (options?.featured) {
      products = products.filter((p) => p.featured);
    }
    if (options?.search) {
      const s = options.search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.tags.some((t) => t.toLowerCase().includes(s))
      );
    }
    if (options?.sort) {
      products = [...products].sort((a, b) => {
        switch (options.sort) {
          case "price-asc":
            return a.price - b.price;
          case "price-desc":
            return b.price - a.price;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          case "rating":
            return b.rating - a.rating;
          default:
            return 0;
        }
      });
    }
    return products;
  }
}

export async function getProductBySlug(slug: string): Promise<ProductType | null> {
  try {
    await connectDB();
    const doc = await Product.findOne({ slug }).lean();
    if (!doc) {
      const fallback = fallbackProducts().find((p) => p.slug === slug);
      return fallback || null;
    }
    return toProduct(doc);
  } catch {
    return fallbackProducts().find((p) => p.slug === slug) || null;
  }
}

export async function getRelatedProducts(
  category: string,
  excludeSlug: string,
  limit = 4
): Promise<ProductType[]> {
  const products = await getProducts({ category });
  return products.filter((p) => p.slug !== excludeSlug).slice(0, limit);
}
