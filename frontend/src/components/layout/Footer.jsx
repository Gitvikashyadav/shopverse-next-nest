import Link from "next/link";
import {
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { FOOTER_LINKS, SITE_NAME } from "@/constants/site";

export default function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand */}
          <div className="md:col-span-4">
            <h3 className="font-display text-3xl font-bold">
              {SITE_NAME}<span className="text-[var(--gold)]">.</span>
            </h3>
            <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
              Curated premium fashion & lifestyle essentials, crafted for the modern connoisseur.
            </p>

            <div className="mt-6 flex gap-3">
              {[FaInstagram, FaFacebook, FaTwitter, FaYoutube].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full border border-white/15 hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-sm font-semibold tracking-wider uppercase text-white/90">{title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-white/60 hover:text-[var(--gold)] transition">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="text-sm font-semibold tracking-wider uppercase">Newsletter</h4>
            <p className="text-xs text-white/60 mt-3">Get 10% off your first order.</p>
            <form className="mt-4 flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2.5 rounded-md bg-white/5 border border-white/15 text-sm placeholder:text-white/40 focus:outline-none focus:border-[var(--gold)]"
              />
              <button className="w-full px-4 py-2.5 rounded-md bg-[var(--gold)] hover:bg-[var(--gold-dark)] text-white text-sm font-semibold transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
