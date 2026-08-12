"use client";

import { useMemo } from "react";
import PageHero from "@/components/shop/PageHero";
import ProductCollection from "@/components/shop/ProductCollection";
import { useProducts } from "@/hooks/useProducts";

export default function SalePage() {
  const { products, loading, error } = useProducts();

  const onSale = useMemo(() => {
    return products
      .filter((p) => {
        const old = Number(p.oldPrice ?? p.mrp ?? 0);
        const price = Number(p.price ?? 0);
        return p.onSale || (old > 0 && old > price);
      })
      .sort((a, b) => {
        const disc = (x) => {
          const old = Number(x.oldPrice ?? x.mrp ?? 0);
          const price = Number(x.price ?? 0);
          return old > 0 ? (old - price) / old : 0;
        };
        return disc(b) - disc(a);
      });
  }, [products]);

  return (
    <main className="min-h-screen bg-white">
      <PageHero
        eyebrow="Limited time"
        title="Sale"
        description="Selected pieces at reduced prices. Once they're gone, they're gone — no restocks on sale styles."
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-black/5 pb-4">
          <p className="text-sm text-neutral-500">
            {loading ? "Loading…" : `${onSale.length} styles reduced`}
          </p>
          <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Up to 50% off
          </span>
        </div>

        <ProductCollection
          products={onSale}
          loading={loading}
          error={error}
          emptyText="No sale items right now."
        />
      </section>
    </main>
  );
}
