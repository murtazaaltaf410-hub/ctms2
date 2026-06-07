import { Hero } from "@/components/home/Hero";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { AboutPreview } from "@/components/home/AboutPreview";
import { TestimonialsPreview } from "@/components/home/TestimonialsPreview";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { Newsletter } from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <TestimonialsPreview />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
