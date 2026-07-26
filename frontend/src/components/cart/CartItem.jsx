"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartItem({ item }) {
  const { updateQty, removeFromCart } = useCart();
  console.log("Cart items disply",item);
  

  return (
    <div className="flex gap-4 py-5 border-b border-[var(--border)]">
      <div className="relative w-24 h-32 md:w-28 md:h-36 shrink-0 overflow-hidden bg-neutral-100">
        <img src={item.image} alt={item.name} fill className="object-cover" />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between gap-3">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-neutral-500">{item.category}</p>
          </div>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-neutral-400 hover:text-red-600 transition"
            aria-label="Remove"
          >
            <Trash2 size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-[var(--border)]">
            <button
              onClick={() => updateQty(item.id, item.qty - 1)}
              className="p-2 hover:bg-neutral-100"
              aria-label="Decrease"
            >
              <Minus size={14} />
            </button>
            <span className="px-4 text-sm">{item.qty}</span>
            <button
              onClick={() => updateQty(item.id, item.qty + 1)}
              className="p-2 hover:bg-neutral-100"
              aria-label="Increase"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="font-semibold">${(item.price * item.qty).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
