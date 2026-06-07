import type { Metadata } from "next";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { Heart, Leaf, Palette, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Discover the story behind Velora Gifts — artisan gourmet cookies and custom cash bouquets crafted with passion and premium ingredients.",
};

const values = [
  {
    icon: Heart,
    title: "Handmade Quality",
    description:
      "Every cookie is baked in small batches by hand. Every bouquet is individually crafted with meticulous attention to detail.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We source only premium ingredients — real butter, Belgian chocolate, farm-fresh eggs, and the finest decorative materials.",
  },
  {
    icon: Palette,
    title: "Custom Design Process",
    description:
      "From concept to creation, we work closely with you to design bouquets and gift arrangements that reflect your vision perfectly.",
  },
  {
    icon: Sparkles,
    title: "Celebration Focused",
    description:
      "We believe gifts should create moments of joy. Every creation is designed to make celebrations truly unforgettable.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative py-24 bg-chocolate text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1548365328-8967dc22c2e2?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <span className="text-gold text-sm tracking-[0.3em] uppercase">Our Story</span>
          <h1 className="font-heading text-4xl md:text-6xl mt-4 font-light">
            Crafting Joy, One Gift at a Time
          </h1>
          <p className="mt-6 text-beige/80 text-lg max-w-2xl mx-auto">
            From a home kitchen dream to a luxury boutique brand loved by thousands.
          </p>
        </div>
      </section>

      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80"
                alt="Artisan baking"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-chocolate dark:text-cream">
                The Velora Story
              </h2>
              <p className="mt-6 text-brown dark:text-beige/80 leading-relaxed">
                Velora Gifts began in a small home kitchen, where our founder experimented with gourmet
                cookie recipes passed down through generations. What started as gifts for friends and family
                quickly gained a devoted following.
              </p>
              <p className="mt-4 text-brown dark:text-beige/80 leading-relaxed">
                Inspired by the joy these creations brought, we expanded into custom cash bouquets — a unique
                fusion of artistry and practicality that has redefined gift-giving for birthdays, weddings,
                graduations, and every celebration in between.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <section className="py-24 bg-beige/30 dark:bg-chocolate/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Mission & Vision" />
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-cream dark:bg-chocolate/80 rounded-2xl p-8 border border-beige">
              <h3 className="font-heading text-2xl text-gold mb-4">Our Mission</h3>
              <p className="text-brown dark:text-beige/80 leading-relaxed">
                To create extraordinary handcrafted gifts that transform ordinary moments into cherished
                memories, using only the finest ingredients and artisan craftsmanship.
              </p>
            </div>
            <div className="bg-cream dark:bg-chocolate/80 rounded-2xl p-8 border border-beige">
              <h3 className="font-heading text-2xl text-gold mb-4">Our Vision</h3>
              <p className="text-brown dark:text-beige/80 leading-relaxed">
                To become the world&apos;s most trusted luxury boutique for gourmet cookies and custom
                currency bouquets, setting the standard for quality, creativity, and customer delight.
              </p>
            </div>
          </div>
        </div>
      </section>

      <AnimatedSection className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Our Promise"
            subtitle="Four pillars that define everything we create at Velora Gifts."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="text-center p-8 rounded-2xl bg-beige/20 dark:bg-chocolate/30 border border-beige/50 dark:border-chocolate/30 hover:border-gold/50 transition-colors"
              >
                <div className="inline-flex p-4 rounded-full bg-gold/10 mb-6">
                  <value.icon className="w-8 h-8 text-gold" />
                </div>
                <h3 className="font-heading text-xl text-chocolate dark:text-cream mb-3">
                  {value.title}
                </h3>
                <p className="text-brown/70 dark:text-beige/60 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
