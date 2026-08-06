

"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext";

export default function ShopGrid({ products = [] }) {
  console.log("Product data in shop grid",products);
  
  const { isInCart } = useCart();
  const [hideInCart, setHideInCart] = useState(false);   // toggle filter

  const visible = useMemo(
    () => (hideInCart ? products.filter((p) => !isInCart(p.id)) : products),
    [products, hideInCart, isInCart]
  );

  return (
    <div>
      <label className="mb-6 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hideInCart}
          onChange={(e) => setHideInCart(e.target.checked)}
        />
        Hide products already in my bag
      </label>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-sm text-neutral-500">
          All products are already in your bag.
        </p>
      )}
    </div>
  );
}
