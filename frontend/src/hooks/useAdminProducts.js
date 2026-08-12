// "use client";
// import { useCallback, useEffect, useState } from "react";
// 
// import { PRODUCTS as SEED } from "@/data/products";

// const LS_KEY = "admin_products";

// export function useAdminProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const persist = (list) => {
//     setProducts(list);
//     localStorage.setItem(LS_KEY, JSON.stringify(list));
//   };

//   useEffect(() => {
//     (async () => {
//       try {
//         const data = await api.listProducts();     // real backend
//         setProducts(data);
//       } catch {
//         const cached = localStorage.getItem(LS_KEY); // fallback while backend is offline
//         setProducts(cached ? JSON.parse(cached) : SEED);
//       } finally {
//         setLoading(false);
//       }
//     })();
//   }, []);

//   const addProduct = useCallback(async (payload) => {
//     setError("");
//     const optimistic = {
//       id: Date.now(),
//       slug: payload.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
//       ...payload,
//     };
//     try {
//       const saved = await api.createProduct(payload);
//       persist([saved, ...products]);
//       return saved;
//     } catch {
//       persist([optimistic, ...products]); // local-only until API exists
//       return optimistic;
//     }
//   }, [products]);

//   const deleteProduct = useCallback(async (id) => {
//     const next = products.filter((p) => p.id !== id);
//     try { await api.deleteProduct(id); } catch { /* local-only */ }
//     persist(next);
//   }, [products]);

//   const updateProduct = useCallback(async (id, payload) => {
//   setError("");
//   try {
//     const res = await fetch(`/api/products/${id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });
//     const updated = await res.json();

//     if (!res.ok) throw new Error(updated.error || "Failed to update product");

//     setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
//     return updated;
//   } catch (err) {
//     console.error("Error updating product:", err);
//     setError(err.message || "Failed to update product");
//     throw err;
//   }
// }, []);

//   return { products, loading, error, addProduct, deleteProduct, updateProduct, refetch: fetchProducts };
// }

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