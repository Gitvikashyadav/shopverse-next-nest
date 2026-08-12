// "use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { getOrders, confirmWithCode } from "@/lib/orders";
// import { inr } from "@/lib/format";

// export default function MyOrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [codes, setCodes] = useState({});
//   const [msg, setMsg] = useState({});

//   useEffect(() => setOrders(getOrders()), []);

//   const submitCode = (id) => {
//     const res = confirmWithCode(id, codes[id] || "");
//     setMsg((m) => ({ ...m, [id]: res.ok ? "Delivered ✓" : res.error }));
//     if (res.ok) setOrders(getOrders());
//   };
// console.log("oders");

//   if (!orders.length) {
//     return (
//       <div className="mx-auto max-w-3xl px-4 py-20 text-center">
//         <h1 className="text-xl font-semibold">No orders yet</h1>
//         <Link href="/shop" className="mt-6 inline-block rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white">
//           Start shopping
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-3xl px-4 py-10">
//       <h1 className="mb-6 text-2xl font-bold">My Orders</h1>

//       <div className="space-y-5">
//         {orders.map((o) => (
//           <div key={o.id} className="rounded-xl border bg-white p-5">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm font-semibold">{o.id}</p>
//                 <p className="text-xs text-gray-500">
//                   {new Date(o.createdAt).toLocaleDateString()} · {inr(o.amount)}
//                 </p>
//               </div>

//               {/* STATUS BADGE — "Booked" until the code is entered */}
//               <span
//                 className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
//                   o.status === "delivered"
//                     ? "bg-green-100 text-green-700"
//                     : "bg-amber-100 text-amber-700"
//                 }`}
//               >
//                 {o.status === "delivered" ? "Delivered" : "Booked"}
//               </span>
//             </div>

//             <div className="mt-4 space-y-3">
//               {o.items.map((i) => (
//                 <div key={i.id ?? i.name} className="flex items-center gap-3">
//                   <Image src={i.image} alt={i.name} width={48} height={48} className="rounded-md object-cover" />
//                   <div className="flex-1">
//                     <p className="text-sm font-medium">{i.name}</p>
//                     <p className="text-xs text-gray-500">Qty: {i.qty}</p>
//                   </div>
//                   <p className="text-sm font-semibold">{inr(i.price * i.qty)}</p>
//                 </div>
//               ))}
//             </div>

//             {/* DELIVERY CODE — shown to customer, entered by agent on delivery */}
//             {o.status === "booked" ? (
//               <div className="mt-5 rounded-lg bg-gray-50 p-4">
//                 <p className="text-xs text-gray-600">
//                   Share this code with the delivery agent:{" "}
//                   <span className="font-mono font-bold tracking-widest">{o.deliveryCode}</span>
//                 </p>
//                 <div className="mt-3 flex gap-2">
//                   <input
//                     value={codes[o.id] || ""}
//                     onChange={(e) => setCodes((c) => ({ ...c, [o.id]: e.target.value }))}
//                     placeholder="Enter delivery code"
//                     maxLength={6}
//                     className="h-10 w-40 rounded-lg border px-3 text-sm"
//                   />
//                   <button
//                     onClick={() => submitCode(o.id)}
//                     className="h-10 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700"
//                   >
//                     CONFIRM DELIVERY
//                   </button>
//                 </div>
//                 {msg[o.id] && <p className="mt-2 text-xs text-red-600">{msg[o.id]}</p>}
//               </div>
//             ) : (
//               <p className="mt-4 text-xs font-semibold text-green-700">
//                 Delivered on {new Date(o.deliveredAt).toLocaleString()}
//               </p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getOrders, confirmWithCode } from "@/lib/orders";
import { inr } from "@/lib/format";

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [codes, setCodes] = useState({});
  const [msg, setMsg] = useState({});

  // Reads the email used at checkout (stored when the address form was submitted).
  // Swap this for your real auth user's email once login is wired up.
  // const getCurrentUserEmail = () => {
  //   if (typeof window === "undefined") return null;
  //   try {
  //     const saved = JSON.parse(localStorage.getItem("checkout_address") || "null");
  //     return saved?.email || null;
  //   } catch {
  //     return null;
  //   }
  // };

  // const loadOrders = async () => {
  //   setLoading(true);
  //   try {
  //     const email = getCurrentUserEmail();
  //     const data = await getOrders(email);
  //     setOrders(data);
  //   } catch (err) {
  //     console.error("Error loading orders:", err);
  //     setOrders([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const loadOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrders(); // ← no argument now
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };
  console.log("get oders",orders);
  

  useEffect(() => {
    loadOrders();
  }, []);

  const submitCode = async (id) => {
    try {
      const res = await confirmWithCode(id, codes[id] || "");
      setMsg((m) => ({ ...m, [id]: res.ok ? "Delivered ✓" : res.error }));
      if (res.ok) loadOrders();
    } catch (err) {
      console.error("Error confirming delivery:", err);
      setMsg((m) => ({ ...m, [id]: "Something went wrong" }));
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center text-sm text-gray-500">
        Loading your orders…
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-xl font-semibold">No orders yet</h1>
        <Link
          href="/shop"
          className="mt-6 inline-block rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">My Orders</h1>

      <div className="space-y-5">
        {orders.map((o) => (
          <div key={o.id} className="rounded-xl border bg-white p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{o.id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(o.createdAt).toLocaleDateString()} · {inr(o.amount)}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                  o.status === "delivered"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {o.status === "delivered" ? "Delivered" : "Booked"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {o.items.map((i) => (
                <div
                  key={i.productId ?? i.name}
                  className="flex items-center gap-3"
                >
                  <Image
                    src={i.image}
                    alt={i.name}
                    width={48}
                    height={48}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{i.name}</p>
                    <p className="text-xs text-gray-500">Qty: {i.qty}</p>
                  </div>
                  <p className="text-sm font-semibold">
                    {inr(i.price * i.qty)}
                  </p>
                </div>
              ))}
            </div>

            {o.status !== "delivered" ? (
              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-600">
                  Share this code with the delivery agent:{" "}
                  <span className="font-mono font-bold tracking-widest">
                    {o.deliveryCode}
                  </span>
                </p>
                <div className="mt-3 flex gap-2">
                  <input
                    value={codes[o.id] || ""}
                    onChange={(e) =>
                      setCodes((c) => ({ ...c, [o.id]: e.target.value }))
                    }
                    placeholder="Enter delivery code"
                    maxLength={6}
                    className="h-10 w-40 rounded-lg border px-3 text-sm"
                  />
                  <button
                    onClick={() => submitCode(o.id)}
                    className="h-10 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white hover:bg-orange-700"
                  >
                    CONFIRM DELIVERY
                  </button>
                </div>
                {msg[o.id] && (
                  <p className="mt-2 text-xs text-red-600">{msg[o.id]}</p>
                )}
              </div>
            ) : (
              <p className="mt-4 text-xs font-semibold text-green-700">
                Delivered on {new Date(o.deliveredAt).toLocaleString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
