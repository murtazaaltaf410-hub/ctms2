"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatPrice } from "@/lib/utils";

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  items: Array<{ productName: string; quantity: number; price: number }>;
  total: number;
  status: string;
  createdAt: string;
  type?: "standard" | "custom";
  bouquetType?: string;
  occasion?: string;
  deliveryDate?: string;
}

const statusOptions = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];
const customStatusOptions = ["pending", "reviewing", "approved", "in-progress", "completed", "cancelled"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [customOrders, setCustomOrders] = useState<Order[]>([]);
  const [tab, setTab] = useState<"standard" | "custom">("standard");

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setOrders(data))
      .catch(() => {});

    fetch("/api/custom-orders")
      .then((res) => res.json())
      .then((data) => Array.isArray(data) && setCustomOrders(data))
      .catch(() => {});
  }, []);

  const updateStatus = async (id: string, status: string, isCustom: boolean) => {
    const endpoint = isCustom ? "/api/custom-orders" : "/api/orders";
    try {
      const res = await fetch(endpoint, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success("Status updated");
        if (isCustom) {
          setCustomOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
        } else {
          setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
        }
      }
    } catch {
      toast.error("Failed to update status");
    }
  };

  const currentOrders = tab === "standard" ? orders : customOrders;
  const options = tab === "standard" ? statusOptions : customStatusOptions;

  return (
    <div>
      <h1 className="font-heading text-3xl text-chocolate dark:text-cream mb-2">Orders</h1>
      <p className="text-brown/60 mb-8">Manage customer orders and custom bouquet requests</p>

      <div className="flex gap-3 mb-8">
        {(["standard", "custom"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${
              tab === t ? "bg-gold text-chocolate" : "bg-beige/30 text-brown hover:bg-beige/50"
            }`}
          >
            {t === "standard" ? `Product Orders (${orders.length})` : `Custom Orders (${customOrders.length})`}
          </button>
        ))}
      </div>

      {currentOrders.length === 0 ? (
        <div className="bg-white dark:bg-chocolate/50 rounded-2xl p-12 text-center border border-beige/50">
          <p className="text-brown/60">No {tab} orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order._id} className="bg-white dark:bg-chocolate/50 rounded-2xl p-6 border border-beige/50">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <p className="font-medium text-chocolate dark:text-cream">{order.customerName}</p>
                  <p className="text-sm text-brown/60">{order.customerEmail} · {order.customerPhone}</p>
                  {order.occasion && (
                    <p className="text-sm text-gold mt-1">{order.bouquetType} — {order.occasion}</p>
                  )}
                </div>
                <div className="text-right">
                  {order.total > 0 && (
                    <p className="font-semibold text-chocolate dark:text-cream">{formatPrice(order.total)}</p>
                  )}
                  <p className="text-xs text-brown/50">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {order.items && (
                <div className="text-sm text-brown/70 mb-4">
                  {order.items.map((item, i) => (
                    <span key={i}>
                      {item.quantity}x {item.productName} ({formatPrice(item.price)})
                      {i < order.items.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-3">
                <span className="text-sm text-brown/60">Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value, tab === "custom")}
                  className="px-3 py-1.5 rounded-lg border border-beige bg-cream text-sm text-chocolate"
                >
                  {options.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
