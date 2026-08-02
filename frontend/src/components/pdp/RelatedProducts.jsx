"use client";
import ProductCard from "@/components/shop/ProductCard";
import { PRODUCTS } from "@/data/products";

export default function RelatedProducts({ current }) {
  const items = PRODUCTS.filter((p) => p.id !== current.id).slice(0, 4);
  return (
    <section className="mt-16">
      <h2 className="mb-6 text-xl font-semibold">You may also like</h2>
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </section>
  );
}
