"use client";
import { useState } from "react";
import Pagination from "./Pagination";
import { useAdminOrders } from "@/hooks/useAdminOrders";

const PAGE_SIZE = 8;

const STATUS_STYLES = {
  placed: "bg-neutral-100 text-neutral-700",
  shipped: "bg-blue-50 text-blue-700",
  delivered: "bg-green-50 text-green-700",
  cancelled: "bg-red-50 text-red-700",
};

export default function OrdersTable() {
  const [page, setPage] = useState(1);
  const skip = (page - 1) * PAGE_SIZE;
  const { orders, total, loading } = useAdminOrders(skip, PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200">
        <h3 className="text-sm font-semibold text-neutral-900">
          Booked items <span className="text-neutral-400 font-normal">({total})</span>
        </h3>
      </div>

      {loading ? (
        <p className="p-10 text-center text-sm text-neutral-500">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="p-10 text-center text-sm text-neutral-500">No orders yet.</p>
      ) : (
        <div className="divide-y divide-neutral-100">
          {orders.map((o) => (
            <div key={o.id} className="p-4 hover:bg-neutral-50/60">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-neutral-900">
                    {o.customerName || o.address?.name || "Guest"}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {o.customerEmail || o.address?.phone} · {o.address?.city}, {o.address?.state}
                  </p>
                  <p className="mt-1 text-xs text-neutral-400">
                    {o.createdAt ? new Date(o.createdAt).toLocaleString() : "—"} · {o.method?.toUpperCase()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-neutral-900">${o.amount}</p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      STATUS_STYLES[o.status] || STATUS_STYLES.placed
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {o.items?.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-md border border-neutral-200 px-2 py-1.5"
                  >
                    <img src={item.image} alt={item.name} className="h-8 w-8 rounded object-cover" />
                    <div className="text-xs">
                      <p className="font-medium text-neutral-800 line-clamp-1">{item.name}</p>
                      <p className="text-neutral-500">Qty {item.qty} · ${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={setPage} />
    </div>
  );
}