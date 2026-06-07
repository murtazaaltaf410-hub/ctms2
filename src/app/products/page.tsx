import type { Metadata } from "next";
import { Suspense } from "react";
import { ProductsClient } from "@/components/products/ProductsClient";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "Browse our collection of handcrafted gourmet cookies and custom cash bouquets. Filter by category, search, and sort by price.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<div className="pt-20 min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsClient products={products} />
    </Suspense>
  );
}
