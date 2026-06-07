"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      <div className={cn("flex items-center gap-4 mb-4", align === "center" && "justify-center")}>
        <span className="h-px w-12 bg-gold" />
        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Velora</span>
        <span className="h-px w-12 bg-gold" />
      </div>
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-chocolate dark:text-cream font-light tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-brown dark:text-beige/80 text-lg max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
