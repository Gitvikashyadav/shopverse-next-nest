"use client";

const GRAPHQL_ENDPOINT =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:5000/graphql";

async function graphqlRequest(query, variables) {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0]?.message || "Request failed");
  return json.data;
}

export async function createOrder({
  items,
  address,
  amount,
  method,
  paymentId,
}) {
  const query = `mutation CreateOrder($input: PlaceOrderInput!) {
    createOrder(createOrderInput: $input) {
      id
      status
      deliveryCode
      createdAt
    }
  }`;

  const input = {
    customerName: address.name,
    customerEmail: address.email || undefined,
    items: items.map((i) => ({
      productId: i.id || i._id || i.slug,
      name: i.name,
      image: i.image,
      price: i.price,
      qty: i.qty,
    })),
    address,
    amount,
    method,
    paymentId,
  };

  const data = await graphqlRequest(query, { input });

  if (typeof window !== "undefined") {
    const myIds = JSON.parse(localStorage.getItem("my_order_ids") || "[]");
    const updated = [data.createOrder.id, ...myIds];
    localStorage.setItem("my_order_ids", JSON.stringify(updated));
  }

  return data.createOrder;
}
export async function confirmWithCode(orderId, code) {
  const query = `mutation ConfirmDelivery($orderId: String!, $code: String!) {
    confirmDelivery(orderId: $orderId, code: $code) {
      ok
      error
      order { id status deliveredAt }
    }
  }`;

  const data = await graphqlRequest(query, { orderId, code });
  return data.confirmDelivery;
}

// Fetch ALL orders (used by Admin)
export async function getAllOrders(skip = 0, take = 50) {
  const res = await fetch(`/api/orders?skip=${skip}&take=${take}`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.orders || [];
}

export async function getOrders() {
  if (typeof window === "undefined") return [];

  const myIds = JSON.parse(localStorage.getItem("my_order_ids") || "[]");

  if (!myIds.length) return [];

  const all = await getAllOrders(0, 100);

  console.log(
    "returnn value",
    all.filter((o) => myIds.includes(o.id)),
  );

  return all.filter((o) => myIds.includes(o.id));
}
