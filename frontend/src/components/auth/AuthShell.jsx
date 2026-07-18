import Link from "next/link";

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand panel */}
      <div className="relative hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-neutral-900 via-neutral-800 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,#d4af37_0,transparent_50%)]" />
        <Link href="/" className="relative z-10 text-2xl font-serif tracking-[0.3em]">
          LUXE
        </Link>
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl font-serif leading-tight">
            Refined essentials,<br />crafted for you.
          </h2>
          <p className="text-neutral-300 max-w-md">
            Join thousands of members enjoying exclusive collections, early access,
            and complimentary shipping worldwide.
          </p>
          <div className="flex gap-8 pt-4 border-t border-white/10">
            <div>
              <div className="text-2xl font-serif">50k+</div>
              <div className="text-xs uppercase tracking-widest text-neutral-400">Members</div>
            </div>
            <div>
              <div className="text-2xl font-serif">120+</div>
              <div className="text-xs uppercase tracking-widest text-neutral-400">Countries</div>
            </div>
            <div>
              <div className="text-2xl font-serif">4.9★</div>
              <div className="text-xs uppercase tracking-widest text-neutral-400">Rated</div>
            </div>
          </div>
        </div>
        <p className="relative z-10 text-xs text-neutral-500">
          © {new Date().getFullYear()} LUXE. All rights reserved.
        </p>
      </div>

      {/* Right: Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10 bg-white">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="lg:hidden inline-block mb-8 text-xl font-serif tracking-[0.3em] text-neutral-900"
          >
            LUXE
          </Link>
          <h1 className="text-3xl font-serif text-neutral-900">{title}</h1>
          <p className="mt-2 text-sm text-neutral-500">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && (
            <p className="mt-8 text-center text-sm text-neutral-600">{footer}</p>
          )}
        </div>
      </div>
    </div>
  );
}
