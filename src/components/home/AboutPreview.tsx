"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Button } from "@/components/ui/Button";

export function AboutPreview() {
  return (
    <AnimatedSection className="py-24 bg-beige/30 dark:bg-chocolate">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80"
                alt="Handcrafted gourmet cookies"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 rounded-2xl overflow-hidden shadow-2xl hidden md:block border-4 border-cream dark:border-chocolate">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80"
                alt="Wedding cash bouquet"
                fill
                className="object-cover"
                sizes="200px"
              />
            </div>
          </div>

          <div>
            <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Our Story</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-chocolate dark:text-cream mt-4 font-light leading-tight">
              Where Passion Meets <span className="text-gold italic">Artistry</span>
            </h2>
            <p className="mt-6 text-brown dark:text-beige/80 text-lg leading-relaxed">
              Velora Gifts was born from a simple belief: every celebration deserves something extraordinary.
              What started as a home kitchen experiment with gourmet cookies has blossomed into a luxury boutique
              offering handcrafted treats and bespoke cash bouquets.
            </p>
            <p className="mt-4 text-brown dark:text-beige/80 leading-relaxed">
              We use only the finest ingredients — real butter, premium chocolate, and fresh-baked perfection —
              alongside meticulously crafted currency arrangements that transform ordinary gifts into unforgettable memories.
            </p>
            <Link href="/about" className="inline-block mt-8">
              <Button variant="primary">Discover Our Story</Button>
            </Link>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
