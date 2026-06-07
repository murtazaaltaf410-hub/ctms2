"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";

interface RecentlyViewedContextType {
  recentlyViewed: string[];
  addRecentlyViewed: (productId: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined);

const MAX_ITEMS = 8;

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("velora-recently-viewed");
    if (stored) setRecentlyViewed(JSON.parse(stored));
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("velora-recently-viewed", JSON.stringify(recentlyViewed));
    }
  }, [recentlyViewed, loaded]);

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((id) => id !== productId);
      return [productId, ...filtered].slice(0, MAX_ITEMS);
    });
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ recentlyViewed, addRecentlyViewed }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext);
  if (!context) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return context;
}
