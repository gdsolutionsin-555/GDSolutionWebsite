import { ArrowRight, Check, Shield, Globe, Smartphone, Lock, Search, Layout } from 'lucide-react';

const INCLUDED = [
  { icon: Globe, label: 'Domain Included' },
  { icon: Shield, label: 'Hosting Included' },
  { icon: Smartphone, label: 'Responsive Design' },
  { icon: Lock, label: 'SSL Certificate' },
  { icon: Search, label: 'Basic SEO' },
  { icon: Layout, label: 'Professional Layout' },
];

export default function OfferSection() {
  return (
    <section className="relative overflow-hidden bg-ink-900 py-20 lg:py-28">
      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-brand-600/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 h-[300px] w-[300px] rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="container-px relative mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — copy */}
          <div className="reveal">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">
              Featured Offer
            </p>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your Business Deserves a Professional Website.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-300">
              Get started with a professionally designed website that helps your business
              look credible and reach more customers.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#contact" className="btn-primary">
                Start My Website
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right — included features grid */}
          <div className="reveal grid grid-cols-2 gap-4 sm:grid-cols-3">
            {INCLUDED.map((item) => (
              <div
                key={item.label}
                className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-300 hover:border-brand-400/40 hover:bg-white/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/20 text-brand-400 transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white">
                  <item.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-white">
                  <Check className="h-3.5 w-3.5 text-brand-400" />
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
