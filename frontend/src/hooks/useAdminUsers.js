"use client";
import { useState, useEffect, useCallback } from "react";

export function useAdminUsers(skip, take) {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/users?skip=${skip}&take=${take}`, { cache: "no-store" });
      const data = await res.json();
      
      setUsers(data.users || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [skip, take]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, total, loading, refetch: fetchUsers };
}