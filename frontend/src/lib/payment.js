// Swap the body of payWithRazorpay() when you wire the real gateway.
// Everything else in the app stays unchanged.

export const PAYMENT_METHODS = [
  { id: "upi",  label: "UPI",              hint: "GPay, PhonePe, Paytm", online: true },
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay", online: true },
  { id: "nb",   label: "Net Banking",      hint: "All major banks", online: true },
  { id: "cod",  label: "Cash on Delivery", hint: "Pay when it arrives", online: false },
];

function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

/**
 * TODO(real): POST /orders -> backend creates Razorpay order, returns
 * { orderId, amount, currency, key }. Then open checkout with those values.
 */
export async function payWithRazorpay({ amount, customer, method }) {
  // ---- STUB: remove this block when backend is ready ----
  await new Promise((r) => setTimeout(r, 1200));
  return {
    ok: true,
    paymentId: "pay_stub_" + Math.random().toString(36).slice(2, 10),
    method,
  };
  // ---- END STUB ----

  /* REAL IMPLEMENTATION:
  const ok = await loadRazorpayScript();
  if (!ok) return { ok: false, error: "Razorpay SDK failed to load" };

  const order = await fetch("/api/payment/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  }).then((r) => r.json());

  return new Promise((resolve) => {
    const rzp = new window.Razorpay({
      key: order.key,
      amount: order.amount,
      currency: "INR",
      order_id: order.orderId,
      name: "Your Store",
      prefill: { name: customer.name, email: customer.email, contact: customer.phone },
      method: method === "upi" ? { upi: true } : undefined,
      handler: (res) => resolve({ ok: true, paymentId: res.razorpay_payment_id }),
      modal: { ondismiss: () => resolve({ ok: false, error: "Payment cancelled" }) },
    });
    rzp.open();
  });
  */
}

export async function placeCodOrder(payload) {
  await new Promise((r) => setTimeout(r, 800));
  return { ok: true, paymentId: null, ...payload };
}
