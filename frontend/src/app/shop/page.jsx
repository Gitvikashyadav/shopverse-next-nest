"use client";
import { useEffect, useState, useMemo } from "react";
import ShopGrid from "@/components/shop/ShopGrid";

import { useProducts } from "@/context/ProductsContext";
import { useSearchParams, useRouter } from "next/navigation";
const CATEGORIES = ["All", "Women", "Men", "Accessories", "Footwear"];
export default function ShopPage() {
  // const products = await getProducts();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { products, loaded, loadProducts } = useProducts();
  const activeCategory = searchParams.get("category") || "All";

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);


  //search categories wise
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter(
      (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
    );
  }, [products, activeCategory]);

  const handleCategoryClick = (cat) => {
    if (cat === "All") {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${cat}`);
    }
  };

  return (
    // <main className="min-h-screen bg-white">
    //   {/* Page header */}
    //   <section className="border-b border-neutral-200 bg-neutral-50">
    //     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
    //       <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
    //         The Collection
    //       </p>
    //       <h1 className="text-4xl md:text-5xl font-serif text-neutral-900">
    //         Shop All
    //       </h1>
    //       <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm">
    //         Curated pieces crafted with premium materials and timeless design.
    //       </p>
    //     </div>
    //   </section>

    //   <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    //     <ShopGrid products={products} />
    //   </section>
    // </main>

    <main className="min-h-screen bg-white">
      {/* Page header */}
      <section className="border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-neutral-500 mb-3">
            The Collection
          </p>
          <h1 className="text-4xl md:text-5xl font-serif text-neutral-900">
            {activeCategory === "All" ? "Shop All" : activeCategory}
          </h1>
          <p className="mt-4 text-neutral-600 max-w-xl mx-auto text-sm">
            Curated pieces crafted with premium materials and timeless design.
          </p>
        </div>
      </section>

      {/* Category filter tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap gap-3 justify-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition-colors ${
                activeCategory === cat
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-700 border-neutral-300 hover:border-neutral-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!loaded ? (
          <div className="text-center py-20 text-sm text-neutral-500">
            Loading…
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 text-sm text-neutral-500">
            No products found in this category.
          </div>
        ) : (
          <ShopGrid products={filteredProducts} />
        )}
      </section>
    </main>
  );
}
