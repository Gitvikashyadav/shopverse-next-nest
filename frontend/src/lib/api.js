const BASE = process.env.NEXT_PUBLIC_API_URL || ""; // e.g. http://localhost:4000

async function req(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) throw new Error((await res.text()) || `Request failed: ${res.status}`);
  return res.status === 204 ? null : res.json();
}

export const api = {
  listProducts: () => req("/products"),
  getProduct: (slug) => req(`/products/${slug}`),
  createProduct: (body) => req("/products", { method: "POST", body: JSON.stringify(body) }),
  deleteProduct: (id) => req(`/products/${id}`, { method: "DELETE" }),
  // AI description — Nest.js endpoint later
  generateDescription: (body) =>
    req("/ai/description", { method: "POST", body: JSON.stringify(body) }),
  createOrder: (body) => req("/orders", { method: "POST", body: JSON.stringify(body) }),
};
