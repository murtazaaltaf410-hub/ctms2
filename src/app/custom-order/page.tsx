"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";

const bouquetTypes = [
  { value: "birthday", label: "Birthday Bouquet" },
  { value: "wedding", label: "Wedding Bouquet" },
  { value: "graduation", label: "Graduation Bouquet" },
  { value: "anniversary", label: "Anniversary Bouquet" },
  { value: "luxury", label: "Luxury Premium Bouquet" },
  { value: "custom", label: "Fully Custom Design" },
];

const denominations = [
  { value: "20", label: "$20 bills" },
  { value: "50", label: "$50 bills" },
  { value: "100", label: "$100 bills" },
  { value: "mixed", label: "Mixed denominations" },
];

export default function CustomOrderPage() {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    bouquetType: "birthday",
    occasion: "",
    denomination: "100",
    specialInstructions: "",
    deliveryDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          referenceImage: previewImage,
          deliveryDate: new Date(form.deliveryDate),
        }),
      });

      if (res.ok) {
        toast.success("Custom order request submitted! We'll be in touch within 24 hours.");
        setForm({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          bouquetType: "birthday",
          occasion: "",
          denomination: "100",
          specialInstructions: "",
          deliveryDate: "",
        });
        setPreviewImage(null);
      } else {
        toast.error("Failed to submit. Please try again or contact us directly.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 3);
  const minDateStr = minDate.toISOString().split("T")[0];

  return (
    <div className="pt-20">
      <section className="relative py-20 bg-chocolate text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl md:text-5xl font-light"
          >
            Custom Cash Bouquet Order
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-beige/80 text-lg max-w-xl mx-auto"
          >
            Tell us your vision and we&apos;ll create a bespoke arrangement tailored to your celebration.
          </motion.p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <SectionHeading
            title="Order Details"
            subtitle="Fill in the details below and our artisans will craft your perfect bouquet."
          />

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6 bg-beige/20 dark:bg-chocolate/30 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                id="customerName"
                name="customerName"
                label="Full Name"
                value={form.customerName}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
              <Input
                id="customerEmail"
                name="customerEmail"
                label="Email Address"
                type="email"
                value={form.customerEmail}
                onChange={handleChange}
                required
                placeholder="john@example.com"
              />
            </div>

            <Input
              id="customerPhone"
              name="customerPhone"
              label="Phone Number"
              type="tel"
              value={form.customerPhone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 000-0000"
            />

            <div className="grid md:grid-cols-2 gap-6">
              <Select
                id="bouquetType"
                name="bouquetType"
                label="Bouquet Type"
                options={bouquetTypes}
                value={form.bouquetType}
                onChange={handleChange}
              />
              <Select
                id="denomination"
                name="denomination"
                label="Note Denomination"
                options={denominations}
                value={form.denomination}
                onChange={handleChange}
              />
            </div>

            <Input
              id="occasion"
              name="occasion"
              label="Occasion"
              value={form.occasion}
              onChange={handleChange}
              required
              placeholder="e.g. 30th Birthday, Wedding Anniversary"
            />

            <Input
              id="deliveryDate"
              name="deliveryDate"
              label="Preferred Delivery Date"
              type="date"
              value={form.deliveryDate}
              onChange={handleChange}
              required
              min={minDateStr}
            />

            <div>
              <label className="block text-sm font-medium text-chocolate dark:text-cream mb-2">
                Reference Image (Optional)
              </label>
              <div className="border-2 border-dashed border-beige rounded-xl p-8 text-center hover:border-gold transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="referenceImage"
                />
                <label htmlFor="referenceImage" className="cursor-pointer">
                  {previewImage ? (
                    <div className="relative w-40 h-40 mx-auto rounded-xl overflow-hidden">
                      <Image src={previewImage} alt="Reference" fill className="object-cover" />
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-brown/50 mx-auto mb-3" />
                      <p className="text-brown/60">Click to upload inspiration image</p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <Textarea
              id="specialInstructions"
              name="specialInstructions"
              label="Special Instructions"
              value={form.specialInstructions}
              onChange={handleChange}
              placeholder="Color preferences, budget, specific decorations, message card text..."
            />

            <Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Custom Order Request"}
            </Button>
          </motion.form>
        </div>
      </section>
    </div>
  );
}
