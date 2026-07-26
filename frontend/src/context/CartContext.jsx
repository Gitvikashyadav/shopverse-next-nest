// "use client";
// import { createContext, useContext, useEffect, useState } from "react";

// const CartContext = createContext(null);
// const STORAGE_KEY = "cart_items";

// export function CartProvider({ children }) {
//   const [items, setItems] = useState([]);
//   const [hydrated, setHydrated] = useState(false);


//   useEffect(() => {
//     try {
//       const saved = localStorage.getItem(STORAGE_KEY);
//       if (saved) setItems(JSON.parse(saved));
//     } catch {}
//     setHydrated(true);
//   }, []);

//   useEffect(() => {
//     if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
//   }, [items, hydrated]);

//   console.log("bagitem Cart context",items);
  
//   const addToCart = (product, qty = 1) => {
//     console.log("Call the Add cart function");
    
//     setItems((prev) => {
//       const found = prev.find((p) => p.id === product.id);
//       if (found) {
//         return prev.map((p) =>
//           p.id === product.id ? { ...p, qty: p.qty + qty } : p
//         );
//       }
//       return [...prev, { ...product, qty }];
//     });
//   };

//   const removeFromCart = (id) =>
//     setItems((prev) => prev.filter((p) => p.id !== id));

//   const updateQty = (id, qty) => {
//     if (qty < 1) return removeFromCart(id);
//     setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
//   };

//   const clearCart = () => setItems([]);

//   const count = items.reduce((s, i) => s + i.qty, 0);
//   const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

//   return (
//     <CartContext.Provider
//       value={{ items, addToCart, removeFromCart, updateQty, clearCart, count, subtotal }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
//   return ctx;
// };
