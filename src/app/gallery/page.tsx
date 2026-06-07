"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seedGallery } from "@/lib/seed-data";

const categories = [
  { value: "all", label: "All" },
  { value: "cookies", label: "Cookies" },
  { value: "bouquets", label: "Bouquets" },
  { value: "events", label: "Events" },
  { value: "customers", label: "Customers" },
];

export default function GalleryPage() {
  const [category, setCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filtered =
    category === "all" ? seedGallery : seedGallery.filter((img) => img.category === category);

  return (
    <div className="pt-20">
      <section className="py-16 bg-beige/30 dark:bg-chocolate/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Our Gallery"
            subtitle="A visual journey through our handcrafted creations and customer celebrations."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                  category === cat.value
                    ? "bg-gold text-chocolate"
                    : "bg-cream dark:bg-chocolate/50 text-brown dark:text-beige hover:bg-beige"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 pb-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <motion.div
                key={img.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="break-inside-avoid"
              >
                <button
                  onClick={() => setSelectedImage(img.image)}
                  className="relative w-full rounded-2xl overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={img.image}
                    alt={img.title}
                    width={600}
                    height={i % 3 === 0 ? 800 : i % 3 === 1 ? 500 : 650}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <div>
                      <p className="text-cream font-medium">{img.title}</p>
                      <p className="text-beige/70 text-sm capitalize">{img.category}</p>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-chocolate/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
          >
            <Image
              src={selectedImage}
              alt="Gallery preview"
              width={1200}
              height={800}
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl"
            />
          </motion.div>
        </div>
      )}
    </div>
  );
}
