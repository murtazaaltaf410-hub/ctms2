"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { formatPrice } from "@/lib/utils";
import { seedProducts } from "@/lib/seed-data";

interface ProductForm {
  _id?: string;
  name: string;
  description: string;
  shortDescription: string;
  price: number;
  compareAtPrice?: number;
  category: "cookies" | "bouquets";
  images: string;
  featured: boolean;
  inStock: boolean;
  inventory: number;
  tags: string;
}

const emptyForm: ProductForm = {
  name: "",
  description: "",
  shortDescription: "",
  price: 0,
  category: "cookies",
  images: "",
  featured: false,
  inStock: true,
  inventory: 100,
  tags: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Array<Record<string, unknown>>>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [loading, setLoading] = useState(false);

  const fetchProducts = () => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(seedProducts.map((p, i) => ({ ...p, _id: `seed-${i}` })));
        }
      })
      .catch(() => setProducts(seedProducts.map((p, i) => ({ ...p, _id: `seed-${i}` }))));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...form,
      images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
      tags: form.tags.split(",").map((s) => s.trim()).filter(Boolean),
      price: Number(form.price),
      compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : undefined,
      inventory: Number(form.inventory),
    };

    try {
      const url = editing ? `/api/products/${editing}` : "/api/products";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success(editing ? "Product updated!" : "Product created!");
        setShowForm(false);
        setEditing(null);
        setForm(emptyForm);
        fetchProducts();
      } else {
        toast.error("Failed to save product");
      }
    } catch {
      toast.error("Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Record<string, unknown>) => {
    setEditing(String(product._id));
    setForm({
      name: product.name as string,
      description: product.description as string,
      shortDescription: product.shortDescription as string,
      price: product.price as number,
      compareAtPrice: product.compareAtPrice as number | undefined,
      category: product.category as "cookies" | "bouquets",
      images: (product.images as string[]).join(", "),
      featured: product.featured as boolean,
      inStock: product.inStock as boolean,
      inventory: product.inventory as number,
      tags: (product.tags as string[]).join(", "),
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product deleted");
        fetchProducts();
      }
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-chocolate dark:text-cream">Products</h1>
          <p className="text-brown/60 mt-1">Manage your product catalog</p>
        </div>
        <Button
          variant="gold"
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setForm(emptyForm);
          }}
        >
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50 mb-8 space-y-4"
        >
          <h2 className="font-heading text-xl text-chocolate dark:text-cream">
            {editing ? "Edit Product" : "New Product"}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Select
              label="Category"
              options={[
                { value: "cookies", label: "Cookies" },
                { value: "bouquets", label: "Bouquets" },
              ]}
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value as "cookies" | "bouquets" })}
            />
          </div>
          <Input label="Short Description" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} required />
          <Textarea label="Full Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
          <div className="grid md:grid-cols-3 gap-4">
            <Input label="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} required />
            <Input label="Compare At Price" type="number" value={form.compareAtPrice || ""} onChange={(e) => setForm({ ...form, compareAtPrice: Number(e.target.value) })} />
            <Input label="Inventory" type="number" value={form.inventory} onChange={(e) => setForm({ ...form, inventory: Number(e.target.value) })} />
          </div>
          <Input label="Image URLs (comma separated)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} required />
          <Input label="Tags (comma separated)" value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} />
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-sm text-chocolate dark:text-cream">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-chocolate dark:text-cream">
              <input type="checkbox" checked={form.inStock} onChange={(e) => setForm({ ...form, inStock: e.target.checked })} />
              In Stock
            </label>
          </div>
          <div className="flex gap-3">
            <Button type="submit" variant="gold" disabled={loading}>
              {loading ? "Saving..." : "Save Product"}
            </Button>
            <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditing(null); }}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="bg-white dark:bg-chocolate/50 rounded-2xl border border-beige/50 overflow-hidden">
        <table className="w-full">
          <thead className="bg-beige/30 dark:bg-chocolate/30">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-brown">Product</th>
              <th className="text-left p-4 text-sm font-medium text-brown">Category</th>
              <th className="text-left p-4 text-sm font-medium text-brown">Price</th>
              <th className="text-left p-4 text-sm font-medium text-brown">Stock</th>
              <th className="text-right p-4 text-sm font-medium text-brown">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={String(product._id)} className="border-t border-beige/30">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <Image
                        src={(product.images as string[])[0]}
                        alt={product.name as string}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="font-medium text-chocolate dark:text-cream">{product.name as string}</span>
                  </div>
                </td>
                <td className="p-4 text-brown/70 capitalize">{product.category as string}</td>
                <td className="p-4 text-chocolate dark:text-cream">{formatPrice(product.price as number)}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${product.inStock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {product.inStock ? `${product.inventory} in stock` : "Out of stock"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => handleEdit(product)} className="p-2 hover:bg-beige/50 rounded-lg">
                      <Pencil className="w-4 h-4 text-brown" />
                    </button>
                    <button onClick={() => handleDelete(String(product._id))} className="p-2 hover:bg-red-50 rounded-lg">
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
