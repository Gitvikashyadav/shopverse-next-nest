

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
      {/* ============ MOBILE: card list, shown below md ============ */}
      {/* NEW BLOCK — a table can't be read on a phone, so under md we render
          each product as a stacked card instead of a <table>. */}
      <div className="divide-y divide-neutral-100 md:hidden">
        {paged.map((p) => (
          <div key={p.id} className="flex gap-3 p-4">
            <img
              src={p.image}
              alt={p.name}
              className="h-16 w-16 flex-shrink-0 rounded-md object-cover border border-neutral-200"
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium text-neutral-900">{p.name}</p>
                  <p className="text-xs text-neutral-500">{p.category}</p>
                </div>
                <div className="flex-shrink-0 text-right">
                  <p className="font-medium text-neutral-900">${p.price}</p>
                  {p.oldPrice && (
                    <p className="text-xs text-neutral-400 line-through">
                      ${p.oldPrice}
                    </p>
                  )}
                </div>
              </div>

              {p.badge && (
                <span className="mt-1 inline-block text-[10px] uppercase tracking-wide text-[var(--gold-dark,#9a6b1e)]">
                  {p.badge}
                </span>
              )}

              {p.description && (
                <p className="mt-1 line-clamp-2 text-xs text-neutral-600">
                  {p.description}
                </p>
              )}

              <div className="mt-2 flex gap-2">
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
            </div>
          </div>
        ))}
      </div>

      {/* ============ DESKTOP/TABLET: original table, hidden below md ============ */}
      {/* CHANGED: wrapped the whole table in `hidden md:block` so it only
          renders once there's room for it; the overflow-x-auto is kept as a
          safety net for anything in between. */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3 hidden lg:table-cell">Description</th>
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
                {/* CHANGED: hidden until lg: (was md:) — on a tablet-width table
                    the description column was still cramped next to the others */}
                <td className="px-4 py-3 hidden lg:table-cell max-w-md">
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