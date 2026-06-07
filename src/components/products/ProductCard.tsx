"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(product._id);
    toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-beige/30 aspect-[4/5] mb-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-chocolate/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {product.compareAtPrice && (
            <span className="absolute top-4 left-4 px-3 py-1 bg-gold text-chocolate text-xs font-bold rounded-full">
              Sale
            </span>
          )}

          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-cream/90 backdrop-blur-sm hover:bg-gold transition-colors z-10"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              className={`w-4 h-4 ${inWishlist ? "fill-red-500 text-red-500" : "text-chocolate"}`}
            />
          </button>

          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <Button variant="gold" size="sm" className="w-full">
              View Details
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="text-sm text-brown dark:text-beige">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
          <h3 className="font-heading text-lg text-chocolate dark:text-cream group-hover:text-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-brown/70 dark:text-beige/60 line-clamp-2">
            {product.shortDescription}
          </p>
          <div className="flex items-center gap-2 pt-1">
            <span className="text-lg font-semibold text-chocolate dark:text-cream">
              From {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-sm text-brown/50 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
