
"use client";
import { slugify } from "@/lib/slugify";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Eye,Check } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const inWishlist = isWishlisted(product.id);
  const inCart = isInCart(product.id);
  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Call Add to cart handle functionn");
    if (inCart) return;
    addToCart(product);
  };

  return (
    <div className="group relative bg-[var(--surface)] border border-[var(--border)] rounded-lg overflow-hidden transition-all hover:shadow-lg">
      {/* Image */}
      <Link
        href={`/shop/product/${product.slug || slugify(product.name)}`}
        className="block relative aspect-[3/4] overflow-hidden"
      >
        <img
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[var(--gold-dark)] text-white text-[10px] font-semibold px-2 py-1 rounded">
            {product.badge}
          </span>
        )}

        {/* Hover actions */}
        {/* <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"> */}
        <div className="absolute right-3 top-3 flex flex-col gap-2 opacity-100 translate-x-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-x-2 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-x-0 transition-all duration-300">
          <button
            onClick={handleWishlistClick}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
              inWishlist
                ? "bg-red-500 text-white"
                : "bg-white text-[var(--text-primary)] hover:bg-[var(--gold)] hover:text-white"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
          </button>

          {/* <button
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-full bg-white text-[var(--text-primary)] hover:bg-[var(--gold)] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button> */}
          {inCart ? (
            <Link
              href="/cart"
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-full bg-[var(--gold)] text-white flex items-center justify-center"
              aria-label="In bag — view bag"
              title="Already in bag"
            >
              <Check size={16} />
            </Link>
          ) : (
            <button
            onClick={handleAddToCart}
            className="w-9 h-9 rounded-full bg-white text-[var(--text-primary)] hover:bg-[var(--gold)] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
          )}

          <Link
           href={`/shop/product/${product.slug || slugify(product.name)}`}
            className="w-9 h-9 rounded-full bg-white text-[var(--text-primary)] hover:bg-[var(--gold)] hover:text-white flex items-center justify-center transition-colors"
            aria-label="Quick view"
          >
            <Eye size={16} />
          </Link>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <Link href={`/shop/product/${product.slug || slugify(product.name)}`}>
          <h3 className="font-display font-medium text-[var(--text-primary)] hover:text-[var(--gold-dark)] transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-semibold text-[var(--text-primary)]">
            ${product.price}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-[var(--text-muted)] line-through">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
