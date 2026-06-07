"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, Moon, Sun, ShoppingBag } from "lucide-react";
import { useTheme } from "next-themes";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/custom-order", label: "Custom Order" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { wishlist } = useWishlist();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/95 dark:bg-chocolate/95 backdrop-blur-md shadow-lg shadow-chocolate/5"
          : "bg-transparent"
      )}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-gold text-2xl">✦</span>
            <span className="font-heading text-2xl text-chocolate dark:text-cream tracking-wide group-hover:text-gold transition-colors">
              Velora
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors relative py-1",
                  pathname === link.href
                    ? "text-gold"
                    : "text-chocolate/80 dark:text-cream/80 hover:text-gold"
                )}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/wishlist"
              className="relative p-2 rounded-full hover:bg-beige/50 dark:hover:bg-chocolate/50 transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 text-chocolate dark:text-cream" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-chocolate text-xs rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-beige/50 dark:hover:bg-chocolate/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5 text-cream" />
                ) : (
                  <Moon className="w-5 h-5 text-chocolate" />
                )}
              </button>
            )}

            <Link
              href="/products"
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-gold text-chocolate rounded-full text-sm font-semibold hover:bg-gold/90 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Now
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-beige/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-chocolate dark:text-cream" />
              ) : (
                <Menu className="w-6 h-6 text-chocolate dark:text-cream" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-cream dark:bg-chocolate border-t border-beige dark:border-chocolate/30 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 text-lg font-medium border-b border-beige/50 dark:border-chocolate/30",
                      pathname === link.href
                        ? "text-gold"
                        : "text-chocolate dark:text-cream"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
