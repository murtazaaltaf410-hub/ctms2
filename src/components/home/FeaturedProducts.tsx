import Link from "next/link";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { getProducts } from "@/lib/products";

export async function FeaturedProducts() {
  const products = await getProducts({ featured: true });

  return (
    <section className="py-24 bg-cream dark:bg-chocolate/95">
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeading
          title="Featured Creations"
          subtitle="Discover our most beloved handcrafted cookies and stunning cash bouquets, each made with passion and precision."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product, i) => (
            <ProductCard key={product._id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
