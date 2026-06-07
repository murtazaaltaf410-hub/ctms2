"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/products/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Select } from "@/components/ui/Select";
import type { Product, SortOption } from "@/types";

interface ProductsClientProps {
  products: Product[];
}

const categories = [
  { value: "all", label: "All Products" },
  { value: "cookies", label: "Cookies" },
  { value: "bouquets", label: "Cash Bouquets" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "rating", label: "Top Rated" },
];

export function ProductsClient({ products }: ProductsClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState<SortOption>("newest");

  const filtered = useMemo(() => {
    let result = [...products];

    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    if (search) {
      const s = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(s) ||
          p.description.toLowerCase().includes(s) ||
          p.tags.some((t) => t.toLowerCase().includes(s))
      );
    }

    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [products, category, search, sort]);

  return (
    <div className="pt-20">
      <section className="py-16 bg-beige/30 dark:bg-chocolate/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Our Collection"
            subtitle="Explore our handcrafted cookies and bespoke cash bouquets."
          />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-12 p-6 bg-beige/20 dark:bg-chocolate/30 rounded-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brown/50" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-beige bg-cream text-chocolate placeholder:text-brown/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 dark:bg-chocolate/20 dark:text-cream dark:border-chocolate/30"
              />
            </div>
            <Select
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="lg:w-48"
            />
            <Select
              options={sortOptions}
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="lg:w-52"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-brown dark:text-beige text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filtered.map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
