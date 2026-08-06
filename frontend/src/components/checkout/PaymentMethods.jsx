"use client";

import { PAYMENT_METHODS } from "@/lib/payment";

export default function PaymentMethods({ value, onChange }) {
  return (
    <div className="divide-y rounded-xl border border-gray-200 bg-white">
      {PAYMENT_METHODS.map((m) => (
        <label
          key={m.id}
          className={`flex cursor-pointer items-center gap-3 p-4 ${
            value === m.id ? "bg-orange-50" : "hover:bg-gray-50"
          }`}
        >
          <input
            type="radio"
            name="payment"
            checked={value === m.id}
            onChange={() => onChange(m.id)}
            className="h-4 w-4 accent-orange-600"
          />
          <span className="flex-1">
            <span className="block text-sm font-medium text-gray-900">{m.label}</span>
            <span className="block text-xs text-gray-500">{m.hint}</span>
          </span>
          {m.online && (
            <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-semibold uppercase text-gray-500">
              Razorpay
            </span>
          )}
        </label>
      ))}
    </div>
  );
}
