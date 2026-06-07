"use client";

import Image from "next/image";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { seedGallery } from "@/lib/seed-data";

const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "veloragifts";

export function InstagramFeed() {
  const images = seedGallery.slice(0, 6);

  return (
    <AnimatedSection className="py-24 bg-beige/20 dark:bg-chocolate">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <a
            href={`https://instagram.com/${instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors"
          >
            <InstagramIcon className="w-5 h-5" />
            <span className="font-medium tracking-wide">@{instagram}</span>
          </a>
          <h2 className="font-heading text-3xl md:text-4xl text-chocolate dark:text-cream mt-4">
            Follow Our Journey
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {images.map((img) => (
            <a
              key={img.title}
              href={`https://instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <Image
                src={img.image}
                alt={img.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 bg-chocolate/0 group-hover:bg-chocolate/40 transition-colors flex items-center justify-center">
                <InstagramIcon className="w-8 h-8 text-cream opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
