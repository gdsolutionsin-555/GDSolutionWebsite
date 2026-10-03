import { Rocket, Store, UtensilsCrossed, HeartPulse, Building2, GraduationCap, Briefcase, ShoppingBag } from 'lucide-react';

const INDUSTRIES = [
  { label: 'Startups', icon: Rocket },
  { label: 'Local Businesses', icon: Store },
  { label: 'Restaurants', icon: UtensilsCrossed },
  { label: 'Healthcare', icon: HeartPulse },
  { label: 'Real Estate', icon: Building2 },
  { label: 'Education', icon: GraduationCap },
  { label: 'Professional Services', icon: Briefcase },
  { label: 'Retail', icon: ShoppingBag },
];

export default function TrustSection() {
  return (
    <section className="border-y border-ink-100 bg-ink-50/50 py-16 lg:py-20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink-800 sm:text-3xl">
            Digital solutions built for businesses that want to grow.
          </h2>
        </div>

        <div className="reveal mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {INDUSTRIES.map((item) => (
            <div
              key={item.label}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-transparent bg-white p-5 text-center transition-all duration-300 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-all duration-300 group-hover:bg-brand-600 group-hover:text-white">
                <item.icon className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold text-ink-600 sm:text-sm">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
