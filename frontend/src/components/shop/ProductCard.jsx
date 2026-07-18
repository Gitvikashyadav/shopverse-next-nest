"use client";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#b8860b] transition-all duration-500">
      {/* Image */}
      <Link href={`/product/${product.id}`} className="block relative h-[600px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#b8860b] text-black text-[10px] font-bold tracking-widest px-3 py-1 uppercase">
            {product.badge}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <button className="bg-[#b8860b] hover:bg-[#a07608] text-black font-semibold text-sm px-6 py-3 flex items-center gap-2 uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            <ShoppingBag size={16} />
            Quick Add
          </button>
        </div>

        {/* Wishlist */}
        <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:text-[#b8860b] transition">
          <Heart size={16} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-[11px] uppercase tracking-widest text-[#b8860b] mb-1">
          {product.category}
        </p>
        <h3 className="text-white font-medium text-sm mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-white font-semibold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-neutral-500 text-sm line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
