"use client";
import { useState } from "react";

const TABS = ["Description", "Details", "Shipping"];

export default function ProductTabs({ product }) {
  const [tab, setTab] = useState("Description");
  return (
    <div className="mt-14 border-t border-neutral-200 pt-8">
      <div className="flex gap-6">
        {TABS.map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`pb-2 text-sm transition ${tab === t ? "border-b-2 border-neutral-900 font-medium" : "text-neutral-500"}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="mt-5 max-w-2xl text-sm leading-relaxed text-neutral-600">
        {tab === "Description" && <p>{product.description || "No description yet."}</p>}
        {tab === "Details" && (
          <ul className="list-disc space-y-1 pl-5">
            <li>Category: {product.category || "—"}</li>
            <li>SKU: {product.id}</li>
            <li>Premium materials, ethically sourced</li>
          </ul>
        )}
        {tab === "Shipping" && <p>Ships in 1–2 business days. Free returns within 30 days.</p>}
      </div>
    </div>
  );
}
