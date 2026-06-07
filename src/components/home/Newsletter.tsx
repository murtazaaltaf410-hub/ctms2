"use client";

import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

export function Newsletter() {
  return (
    <AnimatedSection className="py-24 bg-chocolate">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <span className="text-gold text-sm font-medium tracking-[0.3em] uppercase">Exclusive Access</span>
        <h2 className="font-heading text-3xl md:text-4xl text-cream mt-4 font-light">
          Join Our Exclusive Circle
        </h2>
        <p className="mt-4 text-beige/80 max-w-lg mx-auto">
          Be the first to know about new flavors, seasonal bouquets, and special offers.
        </p>
        <div className="mt-8">
          <NewsletterForm variant="inline" />
        </div>
      </div>
    </AnimatedSection>
  );
}
