"use client";
import { createOrder } from "@/lib/orders";  
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import CheckoutSteps from "@/components/checkout/CheckoutSteps";
import AddressForm from "@/components/checkout/AddressForm";
import PaymentMethods from "@/components/checkout/PaymentMethods";
import OrderSummary from "@/components/cart/OrderSummary";
import { payWithRazorpay, placeCodOrder } from "@/lib/payment";
import { inr } from "@/lib/format";

export default function CheckoutPage() {
  const router = useRouter();
  const { checkoutItems = [], clearCart, clearBuyNow ,isBuyNow} = useCart();

  const [step, setStep] = useState(1);
  const [address, setAddress] = useState({});
  const [errors, setErrors] = useState({});
  const [method, setMethod] = useState("upi");
  const [loading, setLoading] = useState(false);
 console.log("Check out items product ",checkoutItems);
 
  const total =
    checkoutItems.reduce((s, i) => s + i.price * i.qty, 0) +
    (checkoutItems.reduce((s, i) => s + i.price * i.qty, 0) > 499 ? 0 : 40);

  const validate = () => {
    const e = {};
    if (!address.name?.trim()) e.name = "Required";
    if (!/^\d{10}$/.test(address.phone || "")) e.phone = "Enter a 10-digit number";
    if (!/^\d{6}$/.test(address.pincode || "")) e.pincode = "Enter a 6-digit pincode";
    if (!address.city?.trim()) e.city = "Required";
    if (!address.state?.trim()) e.state = "Required";
    if (!address.address?.trim()) e.address = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePay = async () => {
    setLoading(true);
    const payload = { items: checkoutItems, address, amount: total, method };

    const res =
      method === "cod"
        ? await placeCodOrder(payload)
        : await payWithRazorpay({ amount: total, customer: address, method });

    setLoading(false);
    if (!res.ok) return alert(res.error || "Payment failed");

 createOrder({
      items: checkoutItems,
      address,
      amount: total,
      method,
      paymentId: res.paymentId || "cod",
    });
    // Only clear the relevant source — don't wipe the whole cart on a Buy Now purchase
  if (isBuyNow) {
    clearBuyNow?.();
  } else {
    clearCart?.();
  }
    router.push(`/shop/checkout/success?id=${res.paymentId || "cod"}&amt=${total}`);
  };

  if (!checkoutItems.length) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">Nothing to check out</h1>
        <button onClick={() => router.push("/shop")} className="mt-6 rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white">
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <CheckoutSteps current={step} />

      <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {/* STEP 1 — ADDRESS */}
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <header className="flex items-center justify-between border-b px-5 py-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                1 · Delivery Address
              </h2>
              {step > 1 && (
                <button onClick={() => setStep(1)} className="text-xs font-semibold uppercase text-orange-600">
                  Change
                </button>
              )}
            </header>

            {step === 1 ? (
              <div className="p-5">
                <AddressForm value={address} onChange={setAddress} errors={errors} />
                <button
                  onClick={() => validate() && setStep(2)}
                  className="mt-5 h-11 rounded-lg bg-orange-600 px-8 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  DELIVER HERE
                </button>
              </div>
            ) : (
              <p className="px-5 py-4 text-sm text-gray-600">
                <span className="font-medium text-gray-900">{address.name}</span> · {address.phone}
                <br />
                {address.address}, {address.city}, {address.state} — {address.pincode}
              </p>
            )}
          </section>

          {/* STEP 2 — ORDER SUMMARY */}
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <header className="border-b px-5 py-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                2 · Order Summary
              </h2>
            </header>

            {step >= 2 && (
              <div className="p-5">
                {checkoutItems.map((i) => (
                   <div key={i._id || i.slug || `${i.name}-${i.qty}-${Math.random()}`} className="flex gap-4 border-b py-3 last:border-0">
                    <div className="relative h-20 w-16 shrink-0 rounded bg-gray-50">
                      <Image src={i.image} alt={i.name} fill className="object-contain" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium">{i.name}</p>
                      <p className="mt-1 text-gray-500">Qty: {i.qty}</p>
                    </div>
                    <p className="text-sm font-semibold">{inr(i.price * i.qty)}</p>
                  </div>
                ))}

                {step === 2 && (
                  <button
                    onClick={() => setStep(3)}
                    className="mt-5 h-11 rounded-lg bg-orange-600 px-8 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    CONTINUE
                  </button>
                )}
              </div>
            )}
          </section>

          {/* STEP 3 — PAYMENT */}
          <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <header className="border-b px-5 py-3">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-600">
                3 · Payment Options
              </h2>
            </header>

            {step === 3 && (
              <div className="p-5">
                <PaymentMethods value={method} onChange={setMethod} />
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="mt-5 h-12 w-full rounded-lg bg-orange-600 text-sm font-semibold text-white hover:bg-orange-700 disabled:opacity-60"
                >
                  {loading
                    ? "Processing..."
                    : method === "cod"
                    ? `PLACE ORDER · ${inr(total)}`
                    : `PAY ${inr(total)}`}
                </button>
                <p className="mt-3 text-center text-xs text-gray-400">
                  Secured payments · Razorpay
                </p>
              </div>
            )}
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <OrderSummary items={checkoutItems} />
        </aside>
      </div>
    </div>
  );
}
