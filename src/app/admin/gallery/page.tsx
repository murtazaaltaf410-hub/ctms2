"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Plus, Trash2 } from "lucide-react";
import { seedGallery } from "@/lib/seed-data";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<Array<Record<string, unknown>>>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "cookies",
    featured: false,
  });

  const fetchGallery = () => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => setImages(Array.isArray(data) && data.length > 0 ? data : seedGallery))
      .catch(() => setImages(seedGallery));
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Image added!");
        setShowForm(false);
        setForm({ title: "", image: "", category: "cookies", featured: false });
        fetchGallery();
      }
    } catch {
      toast.error("Failed to add image");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;
    try {
      await fetch("/api/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Deleted");
      fetchGallery();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-chocolate dark:text-cream">Gallery</h1>
          <p className="text-brown/60 mt-1">Manage gallery images</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> Add Image
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50 mb-8 space-y-4">
          <Input label="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
          <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} required />
          <Select
            label="Category"
            options={[
              { value: "cookies", label: "Cookies" },
              { value: "bouquets", label: "Bouquets" },
              { value: "events", label: "Events" },
              { value: "customers", label: "Customers" },
            ]}
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />
          <Button type="submit" variant="gold">Save</Button>
        </form>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={String(img._id || img.title)} className="relative group rounded-xl overflow-hidden">
            <div className="relative aspect-square">
              <Image src={img.image as string} alt={img.title as string} fill className="object-cover" sizes="250px" />
            </div>
            <div className="absolute inset-0 bg-chocolate/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-4">
              <div>
                <p className="text-cream text-sm font-medium">{img.title as string}</p>
                <p className="text-beige/70 text-xs capitalize">{img.category as string}</p>
              </div>
              {img._id != null && (
                <button onClick={() => handleDelete(String(img._id))} className="p-2 bg-red-500 rounded-lg">
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
