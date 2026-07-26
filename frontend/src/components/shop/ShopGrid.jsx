// "use client";
// import { useMemo, useState } from "react";
// import ProductCard from "./ProductCard";
// import ShopFilters from "./ShopFilters";
// import { SlidersHorizontal, X } from "lucide-react";

// export default function ShopGrid({ products }) {
//   const categories = useMemo(
//     () => [...new Set(products.map((p) => p.category))],
//     [products]
//   );

//   const [active, setActive] = useState("All");
//   const [sort, setSort] = useState("featured");
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const filtered = useMemo(() => {
//     let list = active === "All" ? products : products.filter((p) => p.category === active);
//     if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
//     if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
//     if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
//     return list;
//   }, [products, active, sort]);

//   return (
//     <div className="grid lg:grid-cols-[240px_1fr] gap-10">
//       {/* Desktop filters */}
//       <div className="hidden lg:block">
//         <ShopFilters
//           categories={categories}
//           active={active}
//           onChange={setActive}
//           sort={sort}
//           onSortChange={setSort}
//         />
//       </div>

//       {/* Mobile filter trigger */}
//       <div className="lg:hidden flex items-center justify-between">
//         <button
//           onClick={() => setMobileOpen(true)}
//           className="flex items-center gap-2 border border-neutral-300 px-4 py-2 text-sm"
//         >
//           <SlidersHorizontal className="h-4 w-4" /> Filters
//         </button>
//         <p className="text-sm text-neutral-500">{filtered.length} items</p>
//       </div>

//       {/* Mobile drawer */}
//       {mobileOpen && (
//         <div className="fixed inset-0 z-50 lg:hidden">
//           <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
//           <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-6 overflow-y-auto">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-sm tracking-widest uppercase">Filters</h2>
//               <button onClick={() => setMobileOpen(false)}><X className="h-5 w-5" /></button>
//             </div>
//             <ShopFilters
//               categories={categories}
//               active={active}
//               onChange={(c) => { setActive(c); setMobileOpen(false); }}
//               sort={sort}
//               onSortChange={setSort}
//             />
//           </div>
//         </div>
//       )}

//       <div>
//         <div className="hidden lg:flex justify-between items-center mb-6">
//           <p className="text-sm text-neutral-500">{filtered.length} items</p>
//         </div>

//         {filtered.length === 0 ? (
//           <p className="text-center text-neutral-500 py-20">No products found.</p>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10">
//             {filtered.map((p) => (
//               <ProductCard key={p.id} product={p} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/shop/ProductCard";
import { useCart } from "@/context/CartContext";

export default function ShopGrid({ products = [] }) {
  const { isInCart } = useCart();
  const [hideInCart, setHideInCart] = useState(false);   // toggle filter

  const visible = useMemo(
    () => (hideInCart ? products.filter((p) => !isInCart(p.id)) : products),
    [products, hideInCart, isInCart]
  );

  return (
    <div>
      <label className="mb-6 flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={hideInCart}
          onChange={(e) => setHideInCart(e.target.checked)}
        />
        Hide products already in my bag
      </label>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {visible.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {visible.length === 0 && (
        <p className="py-20 text-center text-sm text-neutral-500">
          All products are already in your bag.
        </p>
      )}
    </div>
  );
}
