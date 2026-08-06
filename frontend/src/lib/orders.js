"use client";

const KEY = "orders";

export function getOrders() {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// 6-digit code the delivery agent asks the customer for
function makeCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export function createOrder({ items, address, amount, method, paymentId }) {
  const order = {
    id: "OD" + Date.now(),
    items, address, amount, method, paymentId,
    status: "booked",              // booked -> delivered
    deliveryCode: makeCode(),
    createdAt: new Date().toISOString(),
  };
  save([order, ...getOrders()]);
  return order;
}

// Customer gives the code -> order becomes delivered
export function confirmWithCode(orderId, code) {
  const list = getOrders();
  const o = list.find((x) => x.id === orderId);
  if (!o) return { ok: false, error: "Order not found" };
  if (o.status === "delivered") return { ok: false, error: "Already delivered" };
  if (String(code).trim() !== o.deliveryCode) return { ok: false, error: "Invalid code" };
  o.status = "delivered";
  o.deliveredAt = new Date().toISOString();
  save(list);
  return { ok: true, order: o };
}
