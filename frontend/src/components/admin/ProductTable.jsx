"use client";
import { Trash2 } from "lucide-react";

export default function ProductTable({ products, onDelete }) {
  if (!products.length)
    return <p className="rounded-xl border border-dashed border-neutral-300 p-10 text-center text-sm text-neutral-500">No products yet.</p>;

  return (
    <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white">
      <table className="w-full text-sm">
        <thead className="bg-neutral-50 text-left text-xs uppercase tracking-wide text-neutral-500">
          <tr>
            <th className="px-4 py-3">Product</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 hidden md:table-cell">Description</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {products.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img src={p.image} alt={p.name} className="h-12 w-12 rounded object-cover" />
                  <span className="font-medium">{p.name}</span>
                </div>
              </td>
              <td className="px-4 py-3">${p.price}</td>
              <td className="px-4 py-3 hidden md:table-cell max-w-md">
                <span className="line-clamp-2 text-neutral-600">{p.description || "—"}</span>
              </td>
              <td className="px-4 py-3 text-right">
                <button onClick={() => onDelete(p.id)}
                  className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50">
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
