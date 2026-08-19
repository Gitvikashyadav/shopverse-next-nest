"use client";
import { use, useEffect, useState } from "react";
import Gallery from "@/components/pdp/Gallery";
import AddToCartBox from "@/components/pdp/AddToCartBox";
import ProductTabs from "@/components/pdp/ProductTabs";
import RelatedProducts from "@/components/pdp/RelatedProducts";
import { api } from "@/lib/api";
import { PRODUCTS } from "@/data/products";
import { slugify } from "@/lib/slugify";
import { useProducts } from "@/context/ProductsContext";

// // const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
// const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export default function ProductPage({ params }) {
  const { slug } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { getBySlug, loaded, loadProducts } = useProducts();
  

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);

      // 1. Already in context (came from Shop page click) — no fetch needed
      let found = getBySlug(slug);

      // 2. Context not loaded yet (direct link / refresh) — load once
      if (!found && !loaded) {
        const data = await loadProducts();
        found = data.find((p) => p.slug === slug) || null;
      }

      if (!cancelled) {
        setProduct(found);
        setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slug, getBySlug, loaded, loadProducts]);
  if (loading)
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-sm text-neutral-500">
        Loading…
      </div>
    );
  if (!product)
    return (
      <div className="mx-auto max-w-6xl px-4 py-20">Product not found.</div>
    );

  const images = product.images?.length
    ? product.images
    : [product.image, product.image, product.image];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      {/* no overflow-hidden here — the zoom panel needs to overflow */}
      <div className="grid gap-10 lg:grid-cols-2">
        <Gallery images={images} name={product.name} />
        <AddToCartBox product={product} />
      </div>
      <ProductTabs product={product} />
      <RelatedProducts current={product} />
    </main>
  );
}
