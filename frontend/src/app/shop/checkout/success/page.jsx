"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { inr } from "@/lib/format";

function Success() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const amt = sp.get("amt");

  return (
    <div className="mx-auto max-w-md px-4 py-16 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
        ✓
      </div>
      <h1 className="mt-5 text-xl font-semibold text-gray-900">Order placed successfully</h1>
      <p className="mt-2 text-sm text-gray-500">
        Your order is confirmed and will be delivered in 3–5 days.
      </p>

      <dl className="mt-6 space-y-2 rounded-xl border border-gray-200 bg-white p-5 text-left text-sm">
        <div className="flex justify-between">
          <dt className="text-gray-500">Payment ID</dt>
          <dd className="font-medium">{id === "cod" ? "Cash on Delivery" : id}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-gray-500">Amount</dt>
          <dd className="font-semibold">{inr(amt)}</dd>
        </div>
      </dl>

      <div className="mt-6 flex gap-3">
        <Link href="/shop/orders" className="h-11 flex-1 rounded-lg border border-gray-300 pt-3 text-sm font-semibold">
          My Orders
        </Link>
        <Link href="/shop" className="h-11 flex-1 rounded-lg bg-orange-600 pt-3 text-sm font-semibold text-white">
          Keep Shopping
        </Link>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Success />
    </Suspense>
  );
}
