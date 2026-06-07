"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  BarChart3,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  ShoppingCart,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/testimonials", label: "Testimonials", icon: Star },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/content", label: "Homepage", icon: Home },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-chocolate text-cream min-h-screen p-6 flex flex-col shrink-0">
      <div className="flex items-center gap-2 mb-10">
        <span className="text-gold text-xl">✦</span>
        <span className="font-heading text-xl">Velora Admin</span>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold text-chocolate"
                  : "text-beige/80 hover:bg-cream/10 hover:text-cream"
              )}
            >
              <link.icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 pt-6 border-t border-cream/10">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-beige/80 hover:bg-cream/10 hover:text-cream transition-colors"
        >
          <Home className="w-5 h-5" />
          View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-beige/80 hover:bg-red-500/20 hover:text-red-300 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
