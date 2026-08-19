

"use client";
import { useCallback, useEffect, useState } from "react";
export function useAdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const addProduct = useCallback(async (payload) => {
    setError("");
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const saved = await res.json();

      if (!res.ok) throw new Error(saved.error || "Failed to add product");

      setProducts((prev) => [saved, ...prev]);
      return saved;
    } catch (err) {
      
      setError(err.message || "Failed to add product");
      throw err;
    }
  }, []);

  const deleteProduct = useCallback(async (id) => {
    setError("");
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || "Failed to delete product");

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      setError(err.message || "Failed to delete product");
    }
  }, []);

  const updateProduct = useCallback(async (id, payload) => {
    setError("print pay load and id ",id,payload);
    try {
      console.log("");
      
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const updated = await res.json();

      if (!res.ok) throw new Error(updated.error || "Failed to update product");

      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
      return updated;
    } catch (err) {
      console.error("Error updating product:", err);
      setError(err.message || "Failed to update product");
      throw err;
    }
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    deleteProduct,
    updateProduct,
    refetch: fetchProducts,
  };
}