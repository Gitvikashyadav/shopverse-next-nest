"use client";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { PRODUCTS as SEED } from "@/data/products";

const LS_KEY = "admin_products";

export function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const persist = (list) => {
    setProducts(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
  };

  useEffect(() => {
    (async () => {
      try {
        const data = await api.listProducts();     // real backend
        setProducts(data);
      } catch {
        const cached = localStorage.getItem(LS_KEY); // fallback while backend is offline
        setProducts(cached ? JSON.parse(cached) : SEED);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addProduct = useCallback(async (payload) => {
    setError("");
    const optimistic = {
      id: Date.now(),
      slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
      ...payload,
    };
    try {
      const saved = await api.createProduct(payload);
      persist([saved, ...products]);
      return saved;
    } catch {
      persist([optimistic, ...products]); // local-only until API exists
      return optimistic;
    }
  }, [products]);

  const deleteProduct = useCallback(async (id) => {
    const next = products.filter((p) => p.id !== id);
    try { await api.deleteProduct(id); } catch { /* local-only */ }
    persist(next);
  }, [products]);

  return { products, loading, error, addProduct, deleteProduct };
}
