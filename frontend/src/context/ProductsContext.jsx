"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchingRef = useRef(false);

  const loadProducts = useCallback(async () => {
    if (loaded || fetchingRef.current) return products;
    fetchingRef.current = true;
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
      setLoaded(true);
      return data;
    } catch (error) {
      console.error("Error loading products:", error);
      return [];
    } finally {
      fetchingRef.current = false;
    }
  }, [loaded, products]);

  const getBySlug = useCallback(
    (slug) => products.find((p) => p.slug === slug) || null,
    [products]
  );

  return (
    <ProductsContext.Provider value={{ products, loaded, loadProducts, getBySlug }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}