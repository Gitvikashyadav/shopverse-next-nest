"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Trash2, ShoppingBag } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistPage() {
  const { items, removeFromWishlist, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 mx-auto rounded-full bg-neutral-100 flex items-center justify-center">
            <Heart size={32} className="text-neutral-400" />
          </div>
          <h1 className="mt-6 font-display text-3xl font-semibold">Your wishlist is empty</h1>
          <p className="mt-3 text-neutral-600">
            Tap the heart on any product to save it here for later.
          </p>
          <Link
            href="/shop"
            className="inline-block mt-6 px-6 py-3 bg-black text-white rounded-full hover:bg-neutral-800 transition"
          >
            Browse products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Saved for you</p>
          <h1 className="font-display text-3xl md:text-4xl font-semibold mt-2">
            My Wishlist <span className="text-neutral-400">({items.length})</span>
          </h1>
        </div>
        <button
          onClick={clearWishlist}
          className="text-sm text-neutral-600 hover:text-rose-600 underline underline-offset-4"
        >
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {items.map((product) => (
          <div key={product.id} className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition">
            <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </Link>

            <button
              onClick={() => removeFromWishlist(product.id)}
              aria-label="Remove"
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:bg-rose-50 transition"
            >
              <Trash2 size={16} className="text-rose-500" />
            </button>

            <div className="p-4">
              <p className="text-xs uppercase tracking-widest text-neutral-500">{product.category}</p>
              <h3 className="mt-1 font-medium line-clamp-1">{product.name}</h3>
              <div className="mt-2 flex items-center gap-2">
                <span className="font-semibold">${product.price}</span>
                {product.oldPrice && (
                  <span className="text-sm text-neutral-400 line-through">${product.oldPrice}</span>
                )}
              </div>

              <button
                className="mt-4 w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-full bg-black text-white text-sm hover:bg-neutral-800 transition"
                // TODO: hook to cart later
              >
                <ShoppingBag size={16} />
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
