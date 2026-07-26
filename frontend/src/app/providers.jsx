"use client";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

export default function Providers({ children }) {
  return (
    <WishlistProvider>
      <CartProvider>{children}</CartProvider>
    </WishlistProvider>
  );
}
