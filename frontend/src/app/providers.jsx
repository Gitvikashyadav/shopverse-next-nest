"use client";

import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { ProductsProvider } from "@/context/ProductsContext";
export default function Providers({ children }) {
  return (
    <ProductsProvider>
    <WishlistProvider>
      <CartProvider>{children}</CartProvider>
    </WishlistProvider>
    </ProductsProvider>
  );
}
