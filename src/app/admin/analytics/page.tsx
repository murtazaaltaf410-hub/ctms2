"use client";

import { useEffect, useState } from "react";
import { BarChart3, DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

interface Analytics {
  productCount: number;
  orderCount: number;
  customOrderCount: number;
  unreadMessages: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminAnalyticsPage() {
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

  const metrics = analytics
    ? [
        { label: "Total Revenue", value: `$${analytics.totalRevenue.toLocaleString()}`, icon: DollarSign, change: "+12%" },
        { label: "Product Orders", value: analytics.orderCount, icon: ShoppingCart, change: "+5%" },
        { label: "Custom Orders", value: analytics.customOrderCount, icon: Users, change: "+8%" },
        { label: "Active Products", value: analytics.productCount, icon: Package, change: "—" },
        { label: "Pending Orders", value: analytics.pendingOrders, icon: TrendingUp, change: "—" },
        { label: "Unread Messages", value: analytics.unreadMessages, icon: BarChart3, change: "—" },
      ]
    : [];

  return (
    <div>
      <h1 className="font-heading text-3xl text-chocolate dark:text-cream mb-2">Analytics</h1>
      <p className="text-brown/60 mb-8">Business performance overview</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-gold/10 rounded-xl">
                <metric.icon className="w-6 h-6 text-gold" />
              </div>
              <span className="text-xs text-green-600 font-medium">{metric.change}</span>
            </div>
            <p className="text-3xl font-semibold text-chocolate dark:text-cream">{metric.value}</p>
            <p className="text-sm text-brown/60 mt-1">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-chocolate/50 rounded-2xl p-8 border border-beige/50">
        <h2 className="font-heading text-xl text-chocolate dark:text-cream mb-6">Revenue Overview</h2>
        <div className="h-48 flex items-end justify-around gap-4">
          {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => {
            const height = [40, 55, 45, 70, 60, 80][i];
            return (
              <div key={month} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-full bg-gold/80 rounded-t-lg transition-all hover:bg-gold"
                  style={{ height: `${height}%` }}
                />
                <span className="text-xs text-brown/60">{month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
