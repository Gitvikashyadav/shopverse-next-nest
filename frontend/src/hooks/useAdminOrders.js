"use client";
import { useState, useEffect, useCallback } from "react";

export function useAdminOrders(skip, take) {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?skip=${skip}&take=${take}`, { cache: "no-store" });
      const data = await res.json();
      setOrders(data.orders || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setOrders([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [skip, take]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return { orders, total, loading, refetch: fetchOrders };
}