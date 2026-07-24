"use client";
import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext(null);
const STORAGE_KEY = "wishlist_v1";

export function WishlistProvider({ children }) {
  const [items, setItems] = useState([]);   // array of full product objects
  const [ready, setReady] = useState(false);

  // Load from localStorage once on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  // Persist on every change
  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const isWishlisted = (id) => items.some((p) => p.id === id);

  const toggleWishlist = (product) => {
    setItems((prev) =>
      prev.some((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product]
    );
  };

  const removeFromWishlist = (id) =>
    setItems((prev) => prev.filter((p) => p.id !== id));

  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider
      value={{ items, count: items.length, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside <WishlistProvider>");
  return ctx;
};
