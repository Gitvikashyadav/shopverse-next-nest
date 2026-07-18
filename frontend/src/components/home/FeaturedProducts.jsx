import Link from "next/link";
import { Heart } from "lucide-react";

const PRODUCTS = [
  { id: 1, name: "Cashmere Overcoat", price: 890, img: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=600&q=80", badge: "New" },
  { id: 2, name: "Silk Evening Dress", price: 620, img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80" },
  { id: 3, name: "Leather Weekender", price: 1240, img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80", badge: "Bestseller" },
  { id: 4, name: "Wool Blazer", price: 720, img: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80" },
];

export default function FeaturedProducts() {
  return (
    <section className="bg-[var(--muted)] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">Curated Selection</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">Featured Pieces</h2>
          <p className="mt-3 text-[var(--ink-soft)] max-w-lg mx-auto">Hand-picked signatures from our latest collection.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.map((p) => (
            <Link key={p.id} href={`/product/${p.id}`} className="group">
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
                {p.badge && (
                  <span className="absolute top-3 left-3 bg-[var(--ink)] text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded">
                    {p.badge}
                  </span>
                )}
                <button className="absolute top-3 right-3 h-9 w-9 grid place-items-center rounded-full bg-white/90 hover:bg-white text-[var(--ink)] shadow" aria-label="Wishlist">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-3 md:mt-4">
                <h3 className="text-sm md:text-base font-medium group-hover:text-[var(--gold)] transition">{p.name}</h3>
                <p className="mt-1 text-sm md:text-base font-semibold">${p.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
