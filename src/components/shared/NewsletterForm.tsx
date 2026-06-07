"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  variant?: "default" | "footer" | "inline";
  className?: string;
}

export function NewsletterForm({ variant = "default", className }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        toast.success("Welcome to the Velora circle!");
        setEmail("");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className={cn("space-y-3", className)}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="w-full rounded-xl bg-cream/10 border border-cream/20 px-4 py-3 text-cream placeholder:text-beige/50 focus:border-gold focus:outline-none"
        />
        <Button type="submit" variant="gold" size="sm" className="w-full" disabled={loading}>
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
        variant === "inline" && "max-w-lg",
        className
      )}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 rounded-full border border-beige bg-cream px-6 py-3 text-chocolate placeholder:text-brown/50 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 dark:bg-chocolate/20 dark:text-cream dark:border-chocolate/30"
      />
      <Button type="submit" variant="gold" disabled={loading}>
        {loading ? "..." : "Subscribe"}
      </Button>
    </form>
  );
}
