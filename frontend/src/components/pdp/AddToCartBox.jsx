"use client";
import { useState } from "react";
import { Heart, ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const SIZES = ["XS", "S", "M", "L", "XL"];

export default function AddToCartBox({ product }) {
  const { addToCart, isInCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const inCart = isInCart(product.id);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">{product.category}</p>
        <h1 className="mt-1 text-3xl font-semibold">{product.name}</h1>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-2xl">${product.price}</span>
          {product.oldPrice && <span className="text-neutral-400 line-through">${product.oldPrice}</span>}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs uppercase tracking-wide text-neutral-500">Size</p>
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button key={s} onClick={() => setSize(s)}
              className={`h-10 min-w-10 rounded-md border px-3 text-sm transition
                ${size === s ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300 hover:border-neutral-900"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border border-neutral-300">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-2">−</button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button onClick={() => setQty((q) => q + 1)} className="px-3 py-2">+</button>
        </div>

        <button onClick={() => addToCart({ ...product, size, qty })} disabled={inCart}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-neutral-900 py-3 text-sm font-medium text-white disabled:opacity-60">
          {inCart ? <><Check className="h-4 w-4" /> In bag</> : <><ShoppingBag className="h-4 w-4" /> Add to bag</>}
        </button>

        <button onClick={() => toggleWishlist(product)} aria-label="Wishlist"
          className="rounded-md border border-neutral-300 p-3 hover:border-neutral-900">
          <Heart className={`h-4 w-4 ${isWishlisted(product.id) ? "fill-red-500 text-red-500" : ""}`} />
        </button>
      </div>

      <ul className="space-y-1 border-t border-neutral-200 pt-4 text-sm text-neutral-600">
        <li>Free shipping over $150</li>
        <li>30-day returns</li>
        <li>Authenticity guaranteed</li>
      </ul>
    </div>
  );
}
