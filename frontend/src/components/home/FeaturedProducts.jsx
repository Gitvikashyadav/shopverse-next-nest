// import Link from "next/link";
// import { Heart } from "lucide-react";

// const PRODUCTS = [
//   { id: 1, name: "Cashmere Overcoat", price: 890, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80", badge: "New" },
//   { id: 2, name: "Silk Evening Dress", price: 620, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
//   { id: 3, name: "Leather Weekender", price: 1240, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80", badge: "Bestseller" },
//   { id: 4, name: "Wool Blazer", price: 720, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80" },
// ];

// export default function FeaturedProducts() {
//   return (
//     <section className="bg-[var(--muted)] py-16 md:py-24">
//       <div className="max-w-7xl mx-auto px-4 md:px-6">
//         <div className="text-center mb-12">
//           <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">Curated Selection</p>
//           <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">Featured Pieces</h2>
//           <p className="mt-3 text-[var(--ink-soft)] max-w-lg mx-auto">Hand-picked signatures from our latest collection.</p>
//         </div>

//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
//           {PRODUCTS.map((p) => (
//             <Link key={p.id} href={`/product/${p.id}`} className="group">
//               <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white">
//                 <div
//                   className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
//                   style={{ backgroundImage: `url(${p.img})` }}
//                 />
//                 {p.badge && (
//                   <span className="absolute top-3 left-3 bg-[var(--ink)] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
//                     {p.badge}
//                   </span>
//                 )}
//                 <button className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-white/90 hover:bg-white text-[var(--ink)] shadow" aria-label="Wishlist">
//                   <Heart className="h-4 w-4" />
//                 </button>
//               </div>
//               <div className="mt-3 md:mt-4">
//                 <h3 className="text-sm md:text-base font-medium group-hover:text-[var(--gold)] transition">{p.name}</h3>
//                 <p className="mt-1 text-sm md:text-base font-semibold">${p.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
// const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
import Link from "next/link";
import { useEffect } from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { slugify } from "@/lib/slugify";
import { useProducts } from "@/context/ProductsContext";
const PRODUCTS = [
  {
    id: 4,
    slug: "cashmere-sweater",
    name: "Cashmere Sweater",
    price: 199,
    oldPrice: 249,
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800",
    badge: "Sale",
    description:
      "Pure cashmere knit with a relaxed fit and ribbed cuffs. Lightweight yet insulating, designed to soften with every wear.",
  },
  {
    id: 3,
    slug: "silk-evening-dress",
    name: "Silk Evening Dress",
    price: 620,
    oldPrice: 925,
    category: "Dresses",
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    description:
      "A fluid silk dress cut for evening occasions, with a soft drape and subtle sheen. Designed to move effortlessly while holding a refined, tailored shape.",
  },
  {
    id: 2,
    slug: "leather-weekender",
    name: "Leather Weekender",
    price: 1240,
    category: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    badge: "Bestseller",
    description:
      "A full-grain leather weekender bag built for travel, with a spacious interior and reinforced handles. Ages beautifully with use, developing a rich patina over time.",
  },

  {
    id: 1,
    slug: "wool-blazer",
    name: "Wool Blazer",
    price: 720,
    category: "Outerwear",
    image:
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
    description:
      "A structured wool blazer with clean lines and a modern fit. Versatile enough to dress up for formal settings or dress down over casual layers.",
  },
];

export default function FeaturedProducts() {
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { products, loaded, loadProducts } = useProducts();
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Pick first 4 as "featured" — or filter by badge if you prefer
  const featured = products.slice(0, 4);

   if (!loaded) {
    return (
      <section className="bg-[var(--muted)] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-sm text-[var(--ink-soft)]">
          Loading…
        </div>
      </section>
    );
  }

  // return (
  //   <section className="bg-[var(--muted)] py-16 md:py-24">
  //     <div className="max-w-7xl mx-auto px-4 md:px-6">
  //       <div className="text-center mb-12">
  //         <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">
  //           Curated Selection
  //         </p>
  //         <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">
  //           Featured Pieces
  //         </h2>
  //         <p className="mt-3 text-[var(--ink-soft)] max-w-lg mx-auto">
  //           Hand-picked signatures from our latest collection.
  //         </p>
  //       </div>

  //       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
  //         {PRODUCTS.map((p) => {
  //           const inWishlist = isWishlisted(p.id);

  //           const handleWishlistClick = (e) => {
  //             e.preventDefault();
  //             e.stopPropagation();
  //             toggleWishlist(p);
  //           };

  //           return (
  //             <Link
  //               key={p.id}
  //               href={`/shop/product/${p.slug || slugify(p.name)}`}
  //               className="group"
  //             >
  //               <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white">
  //                 <div
  //                   className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
  //                   style={{ backgroundImage: `url(${p.image})` }}
  //                 />
  //                 {p.badge && (
  //                   <span className="absolute top-3 left-3 bg-[var(--ink)] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
  //                     {p.badge}
  //                   </span>
  //                 )}
  //                 <button
  //                   onClick={handleWishlistClick}
  //                   className={`absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full shadow transition-colors ${
  //                     inWishlist
  //                       ? "bg-red-500 text-white"
  //                       : "bg-white/90 hover:bg-white text-[var(--ink)]"
  //                   }`}
  //                   aria-label={
  //                     inWishlist ? "Remove from wishlist" : "Add to wishlist"
  //                   }
  //                 >
  //                   <Heart
  //                     className="h-4 w-4"
  //                     fill={inWishlist ? "currentColor" : "none"}
  //                   />
  //                 </button>
  //               </div>
  //               <div className="mt-3 md:mt-4">
  //                 <h3 className="text-sm md:text-base font-medium group-hover:text-[var(--gold)] transition">
  //                   {p.name}
  //                 </h3>
  //                 <p className="mt-1 text-sm md:text-base font-semibold">
  //                   ${p.price}
  //                 </p>
  //               </div>
  //             </Link>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="bg-[var(--muted)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">
            Curated Selection
          </p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">
            Featured Pieces
          </h2>
          <p className="mt-3 text-[var(--ink-soft)] max-w-lg mx-auto">
            Hand-picked signatures from our latest collection.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map((p) => {
            const inWishlist = isWishlisted(p.id);

            const handleWishlistClick = (e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(p);
            };

            return (
              <Link
                key={p.id}
                href={`/shop/product/${p.slug || slugify(p.name)}`}
                className="group"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white">
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${p.image})` }}
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 bg-[var(--ink)] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                      {p.badge}
                    </span>
                  )}
                  <button
                    onClick={handleWishlistClick}
                    className={`absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full shadow transition-colors ${
                      inWishlist
                        ? "bg-red-500 text-white"
                        : "bg-white/90 hover:bg-white text-[var(--ink)]"
                    }`}
                    aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart className="h-4 w-4" fill={inWishlist ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="mt-3 md:mt-4">
                  <h3 className="text-sm md:text-base font-medium group-hover:text-[var(--gold)] transition">
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm md:text-base font-semibold">
                    ${p.price}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
