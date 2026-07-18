export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] text-white">
      <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=60)" }} />
      <div className="relative max-w-3xl mx-auto px-4 md:px-6 py-20 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-[var(--gold)] font-semibold">Members Only</p>
        <h2 className="mt-3 font-display text-3xl md:text-5xl font-bold">Join the Inner Circle</h2>
        <p className="mt-4 text-white/70 max-w-lg mx-auto">
          Early access to collections, private sales, and exclusive events. Get 10% off your first order.
        </p>
        <form className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-5 py-3.5 rounded-md bg-white/10 border border-white/20 placeholder:text-white/50 focus:outline-none focus:border-[var(--gold)]"
          />
          <button className="px-7 py-3.5 rounded-md bg-[var(--gold)] hover:bg-[var(--gold-dark)] font-semibold transition">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
