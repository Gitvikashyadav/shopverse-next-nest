"use client";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, clearCart } = useCart();
  console.log("Bag items", items);

  return (
    <main className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-16">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-semibold">
            Shopping Bag
          </h1>
          <p className="text-neutral-500 mt-1">
            {items.length} item(s) in your bag
          </p>
        </div>
        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm text-neutral-500 hover:text-red-600 transition"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[var(--border)]">
          <ShoppingBag size={48} className="mx-auto text-neutral-400 mb-4" />
          <h2 className="font-display text-xl mb-2">Your bag is empty</h2>
          <p className="text-neutral-500 mb-6">
            Discover our premium collection.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-[var(--gold-dark)] transition"
          >
            CONTINUE SHOPPING
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
          <CartSummary />
        </div>
      )}
    </main>
  );
}

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";
// import OrderSummary from "@/components/cart/OrderSummary";
// import { inr } from "@/lib/format";

// export default function CartPage() {
//   const router = useRouter();
//   const { items, updateQty, removeFromCart, clearBuyNow } = useCart();

//   const handleOrderBook = () => {
//     clearBuyNow?.();           // ensure we check out the cart, not a buy-now item
//     router.push("/shop/checkout");
//   };

//   if (!items.length) {
//     return (
//       <div className="mx-auto max-w-md px-4 py-20 text-center">
//         <h1 className="text-xl font-semibold text-gray-900">Your cart is empty</h1>
//         <p className="mt-2 text-sm text-gray-500">Add items to it now.</p>
//         <Link
//           href="/products"
//           className="mt-6 inline-block rounded-lg bg-orange-600 px-6 py-3 text-sm font-semibold text-white"
//         >
//           Shop now
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-6xl px-4 py-6">
//       <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
//         <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
//           <h1 className="border-b px-5 py-4 text-lg font-semibold">
//             My Cart ({items.length})
//           </h1>

//           {items.map((item) => (
//             <div key={item._id || item.slug} className="flex gap-4 border-b p-5 last:border-0">
//               <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-50">
//                 <img src={item.image} alt={item.name} fill className="object-contain" />
//               </div>

//               <div className="flex-1">
//                 <Link href={`/product/${item.slug}`} className="text-sm font-medium hover:text-orange-600">
//                   {item.name}
//                 </Link>
//                 <div className="mt-1 flex items-center gap-2">
//                   <span className="text-lg font-semibold">{inr(item.price)}</span>
//                   {item.mrp > item.price && (
//                     <span className="text-sm text-gray-400 line-through">{inr(item.mrp)}</span>
//                   )}
//                 </div>

//                 <div className="mt-3 flex items-center gap-5">
//                   <div className="flex items-center rounded-full border border-gray-300">
//                     <button onClick={() => updateQty(item, item.qty - 1)} className="h-8 w-8" aria-label="Decrease">−</button>
//                     <span className="w-8 text-center text-sm">{item.qty}</span>
//                     <button onClick={() => updateQty(item, item.qty + 1)} className="h-8 w-8" aria-label="Increase">+</button>
//                   </div>
//                   <button
//                     onClick={() => removeFromCart(item)}
//                     className="text-sm font-medium uppercase text-gray-600 hover:text-red-600"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </section>

//         <aside className="lg:sticky lg:top-6 lg:self-start">
//           <OrderSummary items={items} cta="ORDER BOOK" onCta={handleOrderBook} />
//         </aside>
//       </div>
//     </div>
//   );
// }
