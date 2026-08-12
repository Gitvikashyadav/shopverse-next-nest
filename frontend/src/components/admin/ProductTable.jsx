"use client";
import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import Pagination from "./Pagination";
import { usePagination } from "@/hooks/usePagination";

const PAGE_SIZE = 8;

export default function ProductTable({ products, onDelete, onEdit }) {
  const { page, totalPages, paged, goTo } = usePagination(products, PAGE_SIZE);

  if (!products.length)
    return (
      <p className="rounded-xl border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500">
        No products yet.
      </p>
    );

  return (
    <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 hidden md:table-cell">Description</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {paged.map((p) => (
              <tr key={p.id} className="hover:bg-neutral-50/60">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={p.image} alt={p.name} className="h-11 w-11 rounded-md object-cover border border-neutral-200" />
                    <div>
                      <p className="font-medium text-neutral-900">{p.name}</p>
                      {p.badge && (
                        <span className="text-[10px] uppercase tracking-wide text-[var(--gold-dark,#9a6b1e)]">
                          {p.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-neutral-600">{p.category}</td>
                <td className="px-4 py-3">
                  <span className="font-medium text-neutral-900">${p.price}</span>
                  {p.oldPrice && (
                    <span className="ml-2 text-xs text-neutral-400 line-through">${p.oldPrice}</span>
                  )}
                </td>
                <td className="px-4 py-3 hidden md:table-cell max-w-md">
                  <span className="line-clamp-2 text-neutral-600">{p.description || "—"}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(p)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-neutral-200 px-3 py-1.5 text-xs text-neutral-600 hover:bg-neutral-50"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </button>
                    )}
                    <button
                      onClick={() => onDelete(p.id)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination page={page} totalPages={totalPages} onChange={goTo} />
    </div>
  );
}