"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Minus, Plus, Star } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { ShareButton } from "@/components/shared/ShareButton";
import { StarRating } from "@/components/shared/StarRating";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";

interface ProductDetailProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviews, setReviews] = useState<Array<{ _id: string; userName: string; rating: number; comment: string; createdAt: string }>>([]);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    addRecentlyViewed(product._id);
    fetch(`/api/reviews?productId=${product._id}`)
      .then((res) => res.json())
      .then(setReviews)
      .catch(() => {});
  }, [product._id, addRecentlyViewed]);

  const handleOrder = async () => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: "Guest",
          customerEmail: "guest@velora.com",
          customerPhone: "0000000000",
          items: [
            {
              productId: product._id,
              productName: product.name,
              quantity,
              price: product.price,
            },
          ],
          total: product.price * quantity,
          status: "pending",
        }),
      });
      if (res.ok) {
        toast.success("Order request submitted! We'll contact you shortly.");
      } else {
        toast.error("Failed to submit order. Please contact us directly.");
      }
    } catch {
      toast.error("Failed to submit order.");
    }
  };

  const handleReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) return;

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product._id,
          userName: reviewName,
          rating: reviewRating,
          comment: reviewComment,
        }),
      });
      if (res.ok) {
        const review = await res.json();
        setReviews((prev) => [review, ...prev]);
        setReviewName("");
        setReviewComment("");
        toast.success("Review submitted!");
      }
    } catch {
      toast.error("Failed to submit review.");
    }
  };

  return (
    <div className="pt-20">
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative aspect-square rounded-2xl overflow-hidden bg-beige/30"
            >
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </motion.div>
            {product.images.length > 1 && (
              <div className="flex gap-3 mt-4">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${
                      selectedImage === i ? "border-gold" : "border-transparent"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" sizes="80px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full uppercase tracking-wide">
                {product.category}
              </span>
              {!product.inStock && (
                <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-4xl text-chocolate dark:text-cream">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mt-4">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-gold text-gold" />
                <span className="font-medium text-chocolate dark:text-cream">{product.rating}</span>
              </div>
              <span className="text-brown/60">({product.reviewCount} reviews)</span>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <span className="text-3xl font-semibold text-chocolate dark:text-cream">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && (
                <span className="text-lg text-brown/50 line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            <p className="mt-6 text-brown dark:text-beige/80 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-4 mt-8">
              <div className="flex items-center border border-beige rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-beige/50 rounded-l-full transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-beige/50 rounded-r-full transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button variant="gold" size="lg" onClick={handleOrder} disabled={!product.inStock}>
                Order Now
              </Button>

              <button
                onClick={() => {
                  toggleWishlist(product._id);
                  toast.success(isInWishlist(product._id) ? "Removed from wishlist" : "Added to wishlist");
                }}
                className="p-3 rounded-full border border-beige hover:bg-beige/50 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 ${isInWishlist(product._id) ? "fill-red-500 text-red-500" : "text-chocolate"}`}
                />
              </button>

              <ShareButton
                title={product.name}
                className="p-3 rounded-full border border-beige hover:bg-beige/50 transition-colors text-chocolate"
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-beige/50 text-brown text-sm rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <section className="mt-20">
          <h2 className="font-heading text-2xl text-chocolate dark:text-cream mb-8">Customer Reviews</h2>

          <form onSubmit={handleReview} className="bg-beige/20 dark:bg-chocolate/30 rounded-2xl p-6 mb-8 max-w-xl">
            <h3 className="font-medium text-chocolate dark:text-cream mb-4">Write a Review</h3>
            <StarRating rating={reviewRating} interactive onChange={setReviewRating} />
            <input
              type="text"
              placeholder="Your name"
              value={reviewName}
              onChange={(e) => setReviewName(e.target.value)}
              required
              className="w-full mt-4 px-4 py-3 rounded-xl border border-beige bg-cream dark:bg-chocolate/20 dark:text-cream"
            />
            <textarea
              placeholder="Share your experience..."
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              required
              className="w-full mt-3 px-4 py-3 rounded-xl border border-beige bg-cream dark:bg-chocolate/20 dark:text-cream min-h-[100px]"
            />
            <Button type="submit" variant="primary" className="mt-4">
              Submit Review
            </Button>
          </form>

          <div className="space-y-6">
            {reviews.length === 0 ? (
              <p className="text-brown/60">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="border-b border-beige/50 pb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <StarRating rating={review.rating} size="sm" />
                    <span className="font-medium text-chocolate dark:text-cream">{review.userName}</span>
                  </div>
                  <p className="text-brown dark:text-beige/80">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </section>

        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-heading text-2xl text-chocolate dark:text-cream mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p._id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
