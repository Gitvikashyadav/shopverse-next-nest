

export const PAYMENT_METHODS = [
  { id: "upi",  label: "UPI",              hint: "GPay, PhonePe, Paytm", online: true },
  { id: "card", label: "Credit / Debit Card", hint: "Visa, Mastercard, RuPay", online: true },
  { id: "nb",   label: "Net Banking",      hint: "All major banks", online: true },
  { id: "cod",  label: "Cash on Delivery", hint: "Pay when it arrives", online: false },
];

const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:3001/graphql";

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

async function graphqlRequest(query, variables) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GraphQL request failed");
  }
  return json.data;
}

export async function payWithRazorpay({ amount, customer, method }) {
  try {
    const ok = await loadRazorpayScript();
    if (!ok) return { ok: false, error: "Razorpay SDK failed to load" };

    // 1. Create order via GraphQL mutation (backend talks to Razorpay's API)
    const createOrderQuery = `
      mutation CreateRazorpayOrder($input: CreateOrderInput!) {
        createRazorpayOrder(createOrderInput: $input) {
          id
          amount
          currency
        }
      }
    `;

    const { createRazorpayOrder: order } = await graphqlRequest(createOrderQuery, {
      input: { amount },
    });

    // 2. Open Razorpay checkout modal
    return new Promise((resolve) => {
      const rzp = new window.Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,
        name: "Your Store",
        prefill: {
          name: customer.name,
          email: customer.email,
          contact: customer.phone,
        },
        method: method === "upi" ? { upi: true } : undefined,
        theme: { color: "#111111" },

        handler: async (res) => {
          // 3. Verify payment signature via GraphQL mutation
          try {
            const verifyQuery = `
              mutation VerifyRazorpayPayment($input: VerifyPaymentInput!) {
                verifyRazorpayPayment(verifyPaymentInput: $input) {
                  verified
                  paymentId
                }
              }
            `;

            const { verifyRazorpayPayment } = await graphqlRequest(verifyQuery, {
              input: {
                razorpay_order_id: res.razorpay_order_id,
                razorpay_payment_id: res.razorpay_payment_id,
                razorpay_signature: res.razorpay_signature,
              },
            });

            if (verifyRazorpayPayment.verified) {
              resolve({ ok: true, paymentId: verifyRazorpayPayment.paymentId, method });
            } else {
              resolve({ ok: false, error: "Payment verification failed" });
            }
          } catch (err) {
            resolve({ ok: false, error: err.message || "Verification error" });
          }
        },

        modal: {
          ondismiss: () => resolve({ ok: false, error: "Payment cancelled" }),
        },
      });

      rzp.open();
    });
  } catch (error) {
    console.error("Razorpay error:", error);
    return { ok: false, error: error.message || "Payment failed to start" };
  }
}

export async function placeCodOrder(payload) {
  await new Promise((r) => setTimeout(r, 800));
  return { ok: true, paymentId: null, ...payload };
}