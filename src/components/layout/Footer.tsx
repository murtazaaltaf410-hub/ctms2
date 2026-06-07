"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { NewsletterForm } from "@/components/shared/NewsletterForm";

const footerLinks = {
  shop: [
    { href: "/products?category=cookies", label: "Cookies" },
    { href: "/products?category=bouquets", label: "Cash Bouquets" },
    { href: "/custom-order", label: "Custom Orders" },
    { href: "/wishlist", label: "Wishlist" },
  ],
  company: [
    { href: "/about", label: "Our Story" },
    { href: "/gallery", label: "Gallery" },
    { href: "/testimonials", label: "Reviews" },
    { href: "/contact", label: "Contact" },
  ],
};

export function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "1234567890";
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "veloragifts";
  const email = process.env.NEXT_PUBLIC_BUSINESS_EMAIL || "hello@veloragifts.com";
  const address = process.env.NEXT_PUBLIC_BUSINESS_ADDRESS || "123 Artisan Lane, New York, NY";

  return (
    <footer className="bg-chocolate text-cream">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-gold text-2xl">✦</span>
              <span className="font-heading text-2xl tracking-wide">Velora Gifts</span>
            </div>
            <p className="text-beige/80 leading-relaxed mb-6">
              Handcrafted gourmet cookies and custom cash bouquets for life&apos;s most cherished moments.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://instagram.com/${instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-cream/10 hover:bg-gold hover:text-chocolate transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-cream/10 hover:bg-gold hover:text-chocolate transition-colors"
                aria-label="WhatsApp"
              >
                <Phone className="w-5 h-5" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2 rounded-full bg-cream/10 hover:bg-gold hover:text-chocolate transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-6 text-gold">Shop</h3>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-beige/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-6 text-gold">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-beige/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading text-lg mb-6 text-gold">Stay Connected</h3>
            <NewsletterForm variant="footer" />
            <div className="mt-6 flex items-start gap-3 text-beige/80 text-sm">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-gold" />
              <span>{address}</span>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col md:flex-row justify-between items-center gap-4 text-beige/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Velora Gifts. All rights reserved.</p>
          <p className="text-gold/80">Crafted with love for every celebration</p>
        </div>
      </div>
    </footer>
  );
}
