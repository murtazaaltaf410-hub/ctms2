import type { Metadata } from "next";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { seedTestimonials } from "@/lib/seed-data";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our customers say about Velora Gifts handcrafted cookies and custom cash bouquets.",
};

export default function TestimonialsPage() {
  const featured = seedTestimonials.filter((t) => t.featured);
  const others = seedTestimonials.filter((t) => !t.featured);

  return (
    <div className="pt-20">
      <section className="py-16 bg-beige/30 dark:bg-chocolate/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Customer Stories"
            subtitle="Real experiences from celebrations made extraordinary with Velora Gifts."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {featured.map((t) => (
              <div
                key={t.name}
                className="relative bg-cream dark:bg-chocolate/50 rounded-2xl p-8 border border-beige/50 dark:border-chocolate/30 shadow-lg"
              >
                <Quote className="w-10 h-10 text-gold/30 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-brown dark:text-beige/80 leading-relaxed mb-6 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <div className="flex items-center gap-4">
                  {t.image && (
                    <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-gold/30">
                      <Image src={t.image} alt={t.name} fill className="object-cover" sizes="56px" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-chocolate dark:text-cream">{t.name}</p>
                    <p className="text-sm text-gold">{t.occasion}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {others.length > 0 && (
            <>
              <h2 className="font-heading text-2xl text-chocolate dark:text-cream text-center mb-8">
                More Happy Customers
              </h2>
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {others.map((t) => (
                  <div
                    key={t.name}
                    className="flex gap-4 p-6 bg-beige/20 dark:bg-chocolate/30 rounded-xl"
                  >
                    {t.image && (
                      <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                        <Image src={t.image} alt={t.name} fill className="object-cover" sizes="48px" />
                      </div>
                    )}
                    <div>
                      <div className="flex gap-1 mb-2">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                        ))}
                      </div>
                      <p className="text-brown dark:text-beige/80 text-sm mb-2">&ldquo;{t.comment}&rdquo;</p>
                      <p className="text-sm font-medium text-chocolate dark:text-cream">
                        {t.name} · <span className="text-gold">{t.occasion}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
