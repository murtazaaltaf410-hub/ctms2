"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
}

const variants = {
  primary: "bg-chocolate text-cream hover:bg-chocolate/90 shadow-lg shadow-chocolate/20",
  secondary: "bg-beige text-chocolate hover:bg-beige/80",
  outline: "border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-cream",
  ghost: "text-chocolate hover:bg-beige/50",
  gold: "bg-gold text-chocolate hover:bg-gold/90 shadow-lg shadow-gold/30 font-semibold",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
