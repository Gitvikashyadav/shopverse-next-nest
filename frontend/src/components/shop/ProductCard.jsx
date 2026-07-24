// "use client";
// import Link from "next/link";
// import { Heart, ShoppingBag } from "lucide-react";

// export default function ProductCard({ product }) {
//   return (
//     <div className="group relative overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 hover:border-[#b8860b] transition-all duration-500">
//       {/* Image */}
//       <Link href={`/product/${product.id}`} className="block relative h-[600px] overflow-hidden">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
//         />
//         {product.badge && (
//           <span className="absolute top-3 left-3 bg-[#b8860b] text-black text-[10px] font-bold tracking-widest px-3 py-1 uppercase">
//             {product.badge}
//           </span>
//         )}

//         {/* Hover overlay */}
//         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
//           <button className="bg-[#b8860b] hover:bg-[#a07608] text-black font-semibold text-sm px-6 py-3 flex items-center gap-2 uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//             <ShoppingBag size={16} />
//             Quick Add
//           </button>
//         </div>

//         {/* Wishlist */}
//         <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center text-white hover:text-[#b8860b] transition">
//           <Heart size={16} />
//         </button>
//       </Link>

//       {/* Info */}
//       <div className="p-4">
//         <p className="text-[11px] uppercase tracking-widest text-[#b8860b] mb-1">
//           {product.category}
//         </p>
//         <h3 className="text-white font-medium text-sm mb-2 line-clamp-1">
//           {product.name}
//         </h3>
//         <div className="flex items-center gap-2">
//           <span className="text-white font-semibold">${product.price}</span>
//           {product.oldPrice && (
//             <span className="text-neutral-500 text-sm line-through">
//               ${product.oldPrice}
//             </span>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import { Heart, ShoppingBag } from "lucide-react";

// export default function ProductCard({ product }) {
//   return (
//     <div className="group relative">
//       <Link href={`/product/${product.id}`} className="block">
//         <div className="relative aspect-[3/4] overflow-hidden bg-neutral-100 rounded-lg">
//           <img
//             src={product.image}
//             alt={product.name}
//             fill
//             sizes="(max-width: 768px) 50vw, 25vw"
//             className="object-cover transition-transform duration-700 group-hover:scale-105"
//           />
//           {product.badge && (
//             <span className="absolute top-3 left-3 bg-neutral-900 text-white text-[10px] tracking-widest px-2.5 py-1 uppercase">
//               {product.badge}
//             </span>
//           )}
//           <button
//             aria-label="Add to wishlist"
//             className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-white/90 backdrop-blur opacity-0 group-hover:opacity-100 transition"
//           >
//             <Heart className="h-4 w-4" />
//           </button>
//           <button className="absolute bottom-3 left-3 right-3 bg-neutral-900 text-white text-xs tracking-widest uppercase py-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition flex items-center justify-center gap-2">
//             <ShoppingBag className="h-4 w-4" /> Add to Bag
//           </button>
//         </div>
//         <div className="mt-4 space-y-1">
//           <p className="text-[11px] tracking-widest uppercase text-neutral-500">{product.category}</p>
//           <h3 className="text-sm font-medium text-neutral-900">{product.name}</h3>
//           <div className="flex items-center gap-2">
//             <span className="text-sm font-semibold text-neutral-900">${product.price}</span>
//             {product.oldPrice && (
//               <span className="text-xs text-neutral-400 line-through">${product.oldPrice}</span>
//             )}
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// }
"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const active = isWishlisted(product.id);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition">
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-black text-white text-[10px] tracking-widest px-2 py-1 rounded">
            {product.badge.toUpperCase()}
          </span>
        )}
      </Link>

      {/* Heart button */}
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleWishlist(product);
        }}
        aria-label={active ? "Remove from wishlist" : "Add to wishlist"}
        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow hover:scale-110 transition"
      >
        <Heart
          size={18}
          className={active ? "fill-rose-500 stroke-rose-500" : "stroke-neutral-700"}
        />
      </button>

      <div className="p-4">
        <p className="text-xs uppercase tracking-widest text-neutral-500">{product.category}</p>
        <h3 className="mt-1 font-medium text-neutral-900 line-clamp-1">{product.name}</h3>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-semibold">${product.price}</span>
          {product.oldPrice && (
            <span className="text-sm text-neutral-400 line-through">${product.oldPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
}
