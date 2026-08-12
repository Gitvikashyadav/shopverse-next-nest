"use client";

import ProductCard from "@/components/shop/ProductCard";

export default function ProductCollection({ products, loading, error, emptyText }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-[3/4] w-full rounded-lg bg-neutral-200" />
            <div className="mt-3 h-3 w-2/3 rounded bg-neutral-200" />
            <div className="mt-2 h-3 w-1/3 rounded bg-neutral-200" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="py-24 text-center text-sm text-red-600">{error}</p>;
  }

  if (!products.length) {
    return <p className="py-24 text-center text-sm text-neutral-500">{emptyText}</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard key={p.id || p._id} product={p} />
      ))}
    </div>
  );
}
