export default function Announcement() {
  return (
    <div className="w-full bg-[var(--ink)] text-white text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2.5 text-center tracking-wide">
        Free shipping on orders over <span className="text-[var(--gold)] font-semibold">$150</span> · Easy 30-day returns
      </div>
    </div>
  );
}
