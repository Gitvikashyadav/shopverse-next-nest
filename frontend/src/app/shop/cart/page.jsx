"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, clearCart } = useCart();
  console.log("Bag items", items);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">
            Shopping Bag
          </h1>
          <p className="text-neutral-500 mt-1">
            {items.length} item(s) in your bag
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm text-neutral-500 hover:text-red-600 transition"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[var(--border)]">
          <ShoppingBag size={48} className="mx-auto text-neutral-400 mb-4" />
          <h2 className="font-display text-xl mb-2">Your bag is empty</h2>
          <p className="text-neutral-500 mb-6">
            Discover our premium collection.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-[var(--gold-dark)] transition"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </main>
  );
}
