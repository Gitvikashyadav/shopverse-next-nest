"use client";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SLIDES = [
  {
    eyebrow: "Winter Collection 2026",
    title: "Timeless Elegance,\nRedefined.",
    desc: "Discover handcrafted pieces from world-renowned ateliers.",
    cta: "Shop Women",
    href: "/category/women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "New Arrivals",
    title: "Modern Tailoring\nFor Modern Icons.",
    desc: "Precision cuts and premium fabrics for the contemporary gentleman.",
    cta: "Shop Men",
    href: "/category/men",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=80",
  },
  {
    eyebrow: "Signature Series",
    title: "Accessories That\nDefine You.",
    desc: "From leather goods to fine jewelry, crafted to last generations.",
    cta: "Explore",
    href: "/category/accessories",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1920&q=80",
  },
];

export default function Hero() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((p) => (p + 1) % SLIDES.length), []);
  const prev = () => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative h-[75vh] min-h-[520px] md:h-[88vh] w-full overflow-hidden">
      {SLIDES.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: `url(${s.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />

          <div className="relative h-full max-w-7xl mx-auto px-6 md:px-10 flex items-center">
            <div className={`max-w-xl text-white transition-all duration-1000 ${idx === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="inline-block text-xs md:text-sm tracking-[0.3em] uppercase text-[var(--gold)] font-medium">
                {s.eyebrow}
              </span>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.05] whitespace-pre-line">
                {s.title}
              </h1>
              <p className="mt-5 text-base md:text-lg text-white/80 max-w-md">{s.desc}</p>
              <Link
                href={s.href}
                className="mt-8 inline-flex items-center gap-2 px-8 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white font-semibold tracking-wide transition group"
              >
                {s.cta}
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={prev}
        className="hidden md:grid absolute left-5 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition"
        aria-label="Previous"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="hidden md:grid absolute right-5 top-1/2 -translate-y-1/2 h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition"
        aria-label="Next"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-[var(--gold)]" : "w-5 bg-white/50 hover:bg-white/80"}`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
