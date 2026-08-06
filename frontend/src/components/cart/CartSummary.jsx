"use client";
import { useCart } from "@/context/CartContext";
import OrderSummary from "@/components/cart/OrderSummary";
import { useRouter } from "next/navigation";


export default function CartSummary() {
  const { subtotal, count } = useCart();
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 10;
  const total = subtotal + shipping;
  const { items, updateQty, removeFromCart, clearBuyNow } = useCart();
  const router = useRouter();
  const handleOrderBook = () => {
    
    
    clearBuyNow?.();           // ensure we check out the cart, not a buy-now item
    router.push("/shop/checkout");
  };


  return (
    <aside className="border border-[var(--border)] p-6 bg-white h-fit sticky top-24">
      <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({count} items)</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        <div className="border-t border-[var(--border)] pt-3 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <button
        disabled={count === 0}
        className="w-full mt-6 bg-black text-white py-3 text-sm tracking-wider hover:bg-[var(--gold-dark)] transition disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleOrderBook}
      >
        ORDER BOOK
        {/* <OrderSummary items={items} cta="ORDER BOOK" onCta={handleOrderBook} /> */}
      </button>
      <p className="text-xs text-neutral-500 mt-3 text-center">
        Free shipping on orders over $100
      </p>
    </aside>
  );
}
