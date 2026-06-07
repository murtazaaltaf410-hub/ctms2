"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

const sizes = { sm: "w-3.5 h-3.5", md: "w-5 h-5", lg: "w-6 h-6" };

export function StarRating({ rating, size = "md", interactive, onChange }: StarRatingProps) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onChange?.(star)}
          className={cn(interactive && "cursor-pointer hover:scale-110 transition-transform")}
        >
          <Star
            className={cn(
              sizes[size],
              star <= rating ? "fill-gold text-gold" : "text-beige dark:text-chocolate/50"
            )}
          />
        </button>
      ))}
    </div>
  );
}
