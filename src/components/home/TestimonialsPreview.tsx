import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { seedTestimonials } from "@/lib/seed-data";

export function TestimonialsPreview() {
  const testimonials = seedTestimonials.filter((t) => t.featured).slice(0, 3);

  return (
    <section className="py-24 bg-cream dark:bg-chocolate/95">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Loved by Our Customers"
          subtitle="Real stories from celebrations made extraordinary with Velora Gifts."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-beige/40 dark:bg-chocolate/50 rounded-2xl p-8 border border-beige/50 dark:border-chocolate/30"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-brown dark:text-beige/80 leading-relaxed italic mb-6">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-4">
                {t.image && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={t.image} alt={t.name} fill className="object-cover" sizes="48px" />
                  </div>
                )}
                <div>
                  <p className="font-medium text-chocolate dark:text-cream">{t.name}</p>
                  <p className="text-sm text-brown/60 dark:text-beige/50">{t.occasion}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/testimonials">
            <Button variant="outline">Read All Reviews</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
