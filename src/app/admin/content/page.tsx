"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { seedHomepage } from "@/lib/seed-data";

export default function AdminContentPage() {
  const [form, setForm] = useState(seedHomepage);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/homepage")
      .then((res) => res.json())
      .then((data) => {
        if (data.heroTitle) setForm(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Homepage content updated!");
      } else {
        toast.error("Failed to update");
      }
    } catch {
      toast.error("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl text-chocolate dark:text-cream mb-2">Homepage Content</h1>
      <p className="text-brown/60 mb-8">Edit hero section and newsletter content</p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50 space-y-4 max-w-2xl">
        <Input label="Hero Title" value={form.heroTitle} onChange={(e) => setForm({ ...form, heroTitle: e.target.value })} />
        <Input label="Hero Subtitle" value={form.heroSubtitle} onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })} />
        <Input label="Hero Image URL" value={form.heroImage} onChange={(e) => setForm({ ...form, heroImage: e.target.value })} />
        <Textarea label="About Snippet" value={form.aboutSnippet} onChange={(e) => setForm({ ...form, aboutSnippet: e.target.value })} />
        <Input label="Newsletter Title" value={form.newsletterTitle} onChange={(e) => setForm({ ...form, newsletterTitle: e.target.value })} />
        <Input label="Newsletter Subtitle" value={form.newsletterSubtitle} onChange={(e) => setForm({ ...form, newsletterSubtitle: e.target.value })} />
        <Button type="submit" variant="gold" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
