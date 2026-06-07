"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { DollarSign, MessageSquare, Package, ShoppingCart } from "lucide-react";

interface Analytics {
  productCount: number;
  orderCount: number;
  customOrderCount: number;
  unreadMessages: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then(setAnalytics)
      .catch(() =>
        setAnalytics({
          productCount: 11,
          orderCount: 0,
          customOrderCount: 0,
          unreadMessages: 0,
          totalRevenue: 0,
          pendingOrders: 0,
        })
      );
  }, []);

  const stats = [
    {
      label: "Total Products",
      value: analytics?.productCount ?? "—",
      icon: Package,
      href: "/admin/products",
      color: "bg-gold/10 text-gold",
    },
    {
      label: "Total Orders",
      value: analytics?.orderCount ?? "—",
      icon: ShoppingCart,
      href: "/admin/orders",
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Revenue",
      value: analytics ? `$${analytics.totalRevenue.toLocaleString()}` : "—",
      icon: DollarSign,
      href: "/admin/analytics",
      color: "bg-green-500/10 text-green-500",
    },
    {
      label: "Unread Messages",
      value: analytics?.unreadMessages ?? "—",
      icon: MessageSquare,
      href: "/admin/messages",
      color: "bg-purple-500/10 text-purple-500",
    },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl text-chocolate dark:text-cream mb-2">Dashboard</h1>
      <p className="text-brown/60 dark:text-beige/60 mb-8">Welcome to Velora Gifts admin panel</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50 hover:shadow-lg transition-shadow"
          >
            <div className={`inline-flex p-3 rounded-xl ${stat.color} mb-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-2xl font-semibold text-chocolate dark:text-cream">{stat.value}</p>
            <p className="text-sm text-brown/60 dark:text-beige/60 mt-1">{stat.label}</p>
          </Link>
        ))}
      </div>

      {analytics && analytics.pendingOrders > 0 && (
        <div className="bg-gold/10 border border-gold/30 rounded-2xl p-6 mb-8">
          <p className="text-chocolate dark:text-cream font-medium">
            You have {analytics.pendingOrders} pending order(s) requiring attention.
          </p>
          <Link href="/admin/orders" className="text-gold text-sm hover:underline mt-2 inline-block">
            View orders →
          </Link>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50">
          <h2 className="font-heading text-xl text-chocolate dark:text-cream mb-4">Quick Actions</h2>
          <div className="space-y-3">
            {[
              { href: "/admin/products", label: "Add New Product" },
              { href: "/admin/orders", label: "Manage Orders" },
              { href: "/admin/testimonials", label: "Add Testimonial" },
              { href: "/admin/gallery", label: "Upload Gallery Image" },
              { href: "/admin/content", label: "Edit Homepage Content" },
            ].map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="block px-4 py-3 rounded-xl bg-beige/20 dark:bg-chocolate/30 hover:bg-gold/10 text-chocolate dark:text-cream transition-colors"
              >
                {action.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50">
          <h2 className="font-heading text-xl text-chocolate dark:text-cream mb-4">Getting Started</h2>
          <ol className="space-y-3 text-brown/70 dark:text-beige/70 text-sm list-decimal list-inside">
            <li>Run <code className="bg-beige/50 px-2 py-0.5 rounded">npm run seed</code> to populate the database</li>
            <li>Configure your <code className="bg-beige/50 px-2 py-0.5 rounded">.env</code> file with MongoDB URI</li>
            <li>Add products and manage inventory from the Products page</li>
            <li>Monitor orders and custom requests from the Orders page</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
