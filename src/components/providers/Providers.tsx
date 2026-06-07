"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";
import { WishlistProvider } from "@/context/WishlistContext";
import { RecentlyViewedProvider } from "@/context/RecentlyViewedContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <WishlistProvider>
        <RecentlyViewedProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#3E2723",
                color: "#FFF8F0",
                borderRadius: "12px",
              },
            }}
          />
        </RecentlyViewedProvider>
      </WishlistProvider>
    </ThemeProvider>
  );
}
