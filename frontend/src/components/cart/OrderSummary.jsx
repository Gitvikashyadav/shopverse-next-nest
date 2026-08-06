"use client";

import { inr } from "@/lib/format";

export default function OrderSummary({ items, cta, onCta, loading }) {
  const mrpTotal = items.reduce((s, i) => s + (i.mrp || i.price) * i.qty, 0);
  const price = items.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = mrpTotal - price;
  const delivery = price > 499 || price === 0 ? 0 : 40;
  const total = price + delivery;

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <h3 className="border-b px-5 py-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
        Price Details
      </h3>

      <dl className="space-y-3 px-5 py-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-600">Price ({items.length} item{items.length !== 1 && "s"})</dt>
          <dd>{inr(mrpTotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Discount</dt>
          <dd className="text-green-600">− {inr(discount)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-600">Delivery Charges</dt>
          <dd className={delivery === 0 ? "text-green-600" : ""}>
            {delivery === 0 ? "FREE" : inr(delivery)}
          </dd>
        </div>
        <div className="flex justify-between border-t border-dashed pt-3 text-base font-semibold">
          <dt>Total Amount</dt>
          <dd>{inr(total)}</dd>
        </div>
      </dl>

      {discount > 0 && (
        <p className="border-t px-5 py-3 text-sm font-medium text-green-600">
          You will save {inr(discount)} on this order
        </p>
      )}

      {cta && (
        <div className="border-t p-4">
          <button
            onClick={onCta}
            disabled={loading || items.length === 0}
            className="h-12 w-full rounded-lg bg-orange-600 text-sm font-semibold tracking-wide text-white shadow hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? "Please wait..." : cta}
          </button>
        </div>
      )}
    </div>
  );
}
