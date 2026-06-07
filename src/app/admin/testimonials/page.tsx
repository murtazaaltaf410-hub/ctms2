"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Plus, Trash2 } from "lucide-react";
import { seedTestimonials } from "@/lib/seed-data";

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Array<Record<string, unknown>>>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    occasion: "",
    rating: 5,
    comment: "",
    image: "",
    featured: false,
  });

  const fetchTestimonials = () => {
    fetch("/api/testimonials")
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) && data.length > 0 ? data : seedTestimonials);
      })
      .catch(() => setTestimonials(seedTestimonials));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Testimonial added!");
        setShowForm(false);
        setForm({ name: "", occasion: "", rating: 5, comment: "", image: "", featured: false });
        fetchTestimonials();
      }
    } catch {
      toast.error("Failed to add testimonial");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await fetch("/api/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      toast.success("Deleted");
      fetchTestimonials();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl text-chocolate dark:text-cream">Testimonials</h1>
          <p className="text-brown/60 mt-1">Manage customer reviews and stories</p>
        </div>
        <Button variant="gold" onClick={() => setShowForm(!showForm)}>
          <Plus className="w-4 h-4" /> Add Testimonial
        </Button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50 mb-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <Input label="Occasion" value={form.occasion} onChange={(e) => setForm({ ...form, occasion: e.target.value })} required />
          </div>
          <Input label="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          <Input label="Rating (1-5)" type="number" min={1} max={5} value={form.rating} onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })} />
          <Textarea label="Comment" value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} required />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured on homepage
          </label>
          <Button type="submit" variant="gold">Save</Button>
        </form>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={String(t._id || t.name)} className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50 flex justify-between gap-4">
            <div>
              <p className="font-medium text-chocolate dark:text-cream">{t.name as string}</p>
              <p className="text-sm text-gold">{t.occasion as string} · {"★".repeat(t.rating as number)}</p>
              <p className="text-brown/70 mt-2 text-sm">&ldquo;{t.comment as string}&rdquo;</p>
            </div>
            {t._id != null && (
              <button onClick={() => handleDelete(String(t._id))} className="p-2 hover:bg-red-50 rounded-lg shrink-0">
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
