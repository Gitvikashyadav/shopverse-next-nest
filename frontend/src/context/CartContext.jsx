"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [buyNowItem, setBuyNowItem] = useState(null);
  const isBuyNow = !!buyNowItem;

  const buyNow = (product, qty = 1) => setBuyNowItem({ ...product, qty });

  const clearBuyNow = () => setBuyNowItem(null);

  // 🔑 THE FIX: buy-now takes priority, otherwise the whole cart
  const checkoutItems = useMemo(
    () => (buyNowItem ? [buyNowItem] : items),
    [buyNowItem, items],
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem("luxe_cart");
      if (saved) setItems(JSON.parse(saved));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem("luxe_cart", JSON.stringify(items));
  }, [items, loaded]);

  const addToCart = (product, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id);
      if (found) return prev; // already in bag -> do nothing
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)),
    );

  const clearCart = () => setItems([]);

  // ✅ NEW
  const isInCart = (id) => items.some((i) => i.id === id);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        checkoutItems,
        removeFromCart,
        updateQty,
        clearCart,
        isInCart,
        count,
        buyNow,
        isBuyNow,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
