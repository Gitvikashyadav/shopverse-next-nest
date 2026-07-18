import { Truck, ShieldCheck, RefreshCcw, Headphones } from "lucide-react";

const ITEMS = [
  { icon: Truck, title: "Free Shipping", desc: "On orders over $150" },
  { icon: RefreshCcw, title: "Easy Returns", desc: "30-day return policy" },
  { icon: ShieldCheck, title: "Secure Payment", desc: "100% encrypted checkout" },
  { icon: Headphones, title: "Expert Support", desc: "Concierge 7 days a week" },
];

export default function TrustBadges() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-4">
        {ITEMS.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="text-center md:text-left flex flex-col md:flex-row items-center md:items-start gap-3">
            <div className="h-12 w-12 grid place-items-center rounded-full bg-[var(--muted)] text-[var(--gold)] shrink-0">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm md:text-base">{title}</h4>
              <p className="text-xs md:text-sm text-[var(--ink-soft)] mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
