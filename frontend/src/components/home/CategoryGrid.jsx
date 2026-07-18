import Link from "next/link";

const CATS = [
  { name: "Women", href: "/category/women", img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" },
  { name: "Men", href: "/category/men", img: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=800&q=80" },
  { name: "Accessories", href: "/category/accessories", img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80" },
  { name: "Footwear", href: "/category/footwear", img: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80" },
];

export default function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">Explore</p>
          <h2 className="mt-2 font-display text-3xl md:text-5xl font-bold">Shop by Category</h2>
        </div>
        <Link href="/category/all" className="hidden md:inline text-sm font-medium text-[var(--ink-soft)] hover:text-[var(--ink)] underline underline-offset-4">
          View all
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {CATS.map((c) => (
          <Link key={c.name} href={c.href} className="group relative overflow-hidden rounded-2xl aspect-[3/4] bg-[var(--muted)]">
            <div
              className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
              style={{ backgroundImage: `url(${c.img})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
              <h3 className="font-display text-xl md:text-2xl font-semibold">{c.name}</h3>
              <span className="text-xs md:text-sm text-white/80 group-hover:text-[var(--gold)] transition">Shop now →</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
