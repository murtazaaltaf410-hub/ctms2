"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { seedProducts } from "@/lib/seed-data";
import type { Product } from "@/types";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const allProducts: Product[] = Array.isArray(data) && data.length > 0
          ? data.map((p: Record<string, unknown>) => ({
              _id: String(p._id),
              name: p.name as string,
              slug: p.slug as string,
              description: p.description as string,
              shortDescription: p.shortDescription as string,
              price: p.price as number,
              compareAtPrice: p.compareAtPrice as number | undefined,
              category: p.category as Product["category"],
              images: p.images as string[],
              featured: p.featured as boolean,
              inStock: p.inStock as boolean,
              inventory: p.inventory as number,
              tags: p.tags as string[],
              rating: p.rating as number,
              reviewCount: p.reviewCount as number,
              createdAt: "",
              updatedAt: "",
            }))
          : seedProducts.map((p, i) => ({
              ...p,
              _id: `seed-${i}`,
              createdAt: "",
              updatedAt: "",
            }));

        setProducts(allProducts.filter((p) => wishlist.includes(p._id)));
      })
      .catch(() => {
        const fallback = seedProducts
          .map((p, i) => ({ ...p, _id: `seed-${i}`, createdAt: "", updatedAt: "" }))
          .filter((p) => wishlist.includes(p._id));
        setProducts(fallback);
      });
  }, [wishlist]);

  return (
    <div className="pt-20">
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Your Wishlist"
            subtitle={
              products.length > 0
                ? `${products.length} saved item${products.length > 1 ? "s" : ""}`
                : "Save your favorite products to revisit later."
            }
          />

          {products.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-beige mx-auto mb-6" />
              <p className="text-brown dark:text-beige text-lg mb-8">Your wishlist is empty.</p>
              <Link href="/products">
                <Button variant="gold">Browse Products</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
