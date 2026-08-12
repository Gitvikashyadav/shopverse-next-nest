"use client";

import { useMemo } from "react";
import PageHero from "@/components/shop/PageHero";
import ProductCollection from "@/components/shop/ProductCollection";
import { useProducts } from "@/hooks/useProducts";

export default function NewArrivalsPage() {
  const { products, loading, error } = useProducts();

  const arrivals = useMemo(() => {
    return [...products]
      .sort((a, b) => {
        const da = new Date(a.createdAt || 0).getTime();
        const db = new Date(b.createdAt || 0).getTime();
        return db - da;
      })
      .filter((p) => p.isNew ?? true)
      .slice(0, 24);
  }, [products]);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Just landed"
        title="New Arrivals"
        description="The latest additions to the LUXE collection — limited pieces, crafted with premium materials and released in small drops."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex items-center justify-between border-b border-black/5 pb-4">
          <p className="text-sm text-neutral-500">
            {loading ? "Loading…" : `${arrivals.length} pieces`}
          </p>
          <span className="text-xs uppercase tracking-[0.2em] text-[var(--gold,#c9a84c)]">
            Fresh drop
          </span>
        </div>

        <ProductCollection
          products={arrivals}
          loading={loading}
          error={error}
          emptyText="No new arrivals yet. Check back soon."
        />
      </section>
    </main>
  );
}
