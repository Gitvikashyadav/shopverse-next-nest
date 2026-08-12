export default function PageHero({ eyebrow, title, description }) {
  return (
    <section className="relative overflow-hidden border-b border-black/5 bg-[var(--bg-soft,#faf8f5)]">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[var(--gold,#c9a84c)]/20 blur-3xl"
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--gold,#c9a84c)]">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl font-light tracking-tight text-[var(--text-primary,#111)] sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-neutral-600 sm:text-base">
          {description}
        </p>
      </div>
    </section>
  );
}
