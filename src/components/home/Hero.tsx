"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=1920&q=80"
          alt="Luxury gourmet cookies and gift arrangements"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-chocolate/80 via-chocolate/60 to-chocolate/30" />
      </div>

      <div className="absolute top-1/4 right-0 w-1/3 h-1/2 hidden lg:block opacity-30">
        <Image
          src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80"
          alt="Custom cash bouquet"
          fill
          className="object-cover rounded-l-3xl"
          sizes="33vw"
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/20 border border-gold/30 text-gold text-sm font-medium mb-6">
              <span>✦</span> Artisan Luxury Gifts
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-cream font-light leading-tight tracking-tight"
          >
            Handcrafted Cookies &{" "}
            <span className="text-gold italic">Custom Cash Bouquets</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 text-lg md:text-xl text-beige/90 leading-relaxed max-w-lg"
          >
            Thoughtfully crafted gifts for every celebration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/products?category=cookies">
              <Button variant="gold" size="lg">
                Shop Cookies
              </Button>
            </Link>
            <Link href="/custom-order">
              <Button variant="outline" size="lg" className="border-cream text-cream hover:bg-cream hover:text-chocolate">
                Order Custom Bouquet
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 rounded-full border-2 border-cream/50 flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-cream/70 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
