"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Mail, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import toast from "react-hot-toast";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

const faqs = [
  {
    q: "How far in advance should I place a custom bouquet order?",
    a: "We recommend placing custom bouquet orders at least 5-7 business days before your event. Rush orders may be available — contact us directly.",
  },
  {
    q: "Do you ship cookies nationwide?",
    a: "Yes! Our cookies are carefully packaged and shipped nationwide. We use insulated packaging to ensure freshness upon arrival.",
  },
  {
    q: "What denominations can be used in cash bouquets?",
    a: "We work with $20, $50, and $100 bills, or mixed denominations based on your preference and budget.",
  },
  {
    q: "Can I customize the cookie flavors in a gift box?",
    a: "Absolutely! Our assorted boxes can be customized with your choice of flavors. Mention your preferences in the order notes.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Orders can be cancelled up to 48 hours before the delivery date for a full refund. Custom bouquet orders require 72 hours notice.",
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "veloragifts";
  const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "hello@veloragifts.com";
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "123 Artisan Lane, New York, NY 10001";
  const mapsEmbed = process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED || "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        toast.success("Message sent! We'll respond within 24 hours.");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <section className="py-16 bg-beige/30 dark:bg-chocolate/50">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading
            title="Get in Touch"
            subtitle="We'd love to hear from you. Reach out for orders, custom requests, or just to say hello."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="space-y-6">
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl hover:shadow-lg transition-shadow group"
              >
                <div className="p-3 bg-green-500 rounded-full text-white">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-chocolate dark:text-cream group-hover:text-green-600 transition-colors">
                    WhatsApp
                  </p>
                  <p className="text-sm text-brown/60">Chat with us instantly</p>
                </div>
              </a>

              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 bg-beige/30 dark:bg-chocolate/30 rounded-2xl hover:shadow-lg transition-shadow group"
              >
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full text-white">
                  <InstagramIcon className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-chocolate dark:text-cream">@{instagram}</p>
                  <p className="text-sm text-brown/60">Follow our latest creations</p>
                </div>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-6 bg-beige/30 dark:bg-chocolate/30 rounded-2xl hover:shadow-lg transition-shadow"
              >
                <div className="p-3 bg-gold rounded-full text-chocolate">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-chocolate dark:text-cream">{email}</p>
                  <p className="text-sm text-brown/60">Email us anytime</p>
                </div>
              </a>

              <div className="flex items-start gap-4 p-6 bg-beige/30 dark:bg-chocolate/30 rounded-2xl">
                <div className="p-3 bg-chocolate rounded-full text-cream">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-chocolate dark:text-cream">Visit Us</p>
                  <p className="text-sm text-brown/60 mt-1">{address}</p>
                </div>
              </div>
            </div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 space-y-6 bg-cream dark:bg-chocolate/50 rounded-3xl p-8 border border-beige/50"
            >
              <h2 className="font-heading text-2xl text-chocolate dark:text-cream">Send a Message</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  id="name"
                  label="Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  id="subject"
                  label="Subject"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
              <Textarea
                id="message"
                label="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                placeholder="Tell us about your order or inquiry..."
              />
              <Button type="submit" variant="gold" size="lg" disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>
          </div>
        </div>
      </section>

      {mapsEmbed && (
        <section className="py-8">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="rounded-2xl overflow-hidden h-80">
              <iframe
                src={mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Business location"
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-beige/20 dark:bg-chocolate/30">
        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <h2 className="font-heading text-3xl text-chocolate dark:text-cream text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-cream dark:bg-chocolate/50 rounded-xl border border-beige/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className="font-medium text-chocolate dark:text-cream pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gold shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    className="px-6 pb-6"
                  >
                    <p className="text-brown dark:text-beige/80 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
