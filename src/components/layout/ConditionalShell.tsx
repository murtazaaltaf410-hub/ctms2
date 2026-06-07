"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideShell = pathname?.startsWith("/admin") || pathname === "/login";

  if (hideShell) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
