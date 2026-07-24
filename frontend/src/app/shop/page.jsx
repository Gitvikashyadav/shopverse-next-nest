import ShopGrid from "@/components/shop/ShopGrid";
import { PRODUCTS } from "@/data/products";

export const metadata = {
  title: "Shop All | Maison",
  description: "Browse the full collection of premium apparel and accessories.",
};

export default function ShopPage() {
  // TODO: Replace with backend API call
  // const res = await fetch(`${process.env.API_URL}/api/products`, { cache: "no-store" });
  // const products = await res.json();
  const products = PRODUCTS;

  return (
    <main className="min-h-screen bg-white">
      {/* Page header */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-900">
            Shop All
          </h1>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm">
            Curated pieces crafted with premium materials and timeless design.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ShopGrid products={products} />
      </section>
    </main>
  );
}
