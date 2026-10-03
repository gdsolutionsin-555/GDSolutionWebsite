import { Check, ArrowRight, MessageCircle } from 'lucide-react';

const INCLUDED = [
  'Professional website',
  'Free domain',
  'Free hosting',
  'Mobile responsive design',
  'SSL certificate',
  'Contact form',
  'Basic SEO setup',
  'WhatsApp integration',
  'Maintenance / support',
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Start Your Website Today
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Transparent pricing designed for small businesses and startups. No hidden costs.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-md">
          <div className="reveal relative overflow-hidden rounded-3xl border-2 border-brand-500 bg-white p-8 shadow-2xl shadow-brand-600/10 lg:p-10">
            <div className="absolute right-0 top-0 rounded-bl-2xl bg-brand-600 px-4 py-1.5 text-xs font-bold text-white">
              POPULAR
            </div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand-600">
              Starter Website
            </p>
            <div className="mt-4 flex items-end gap-1.5">
              <span className="text-5xl font-extrabold text-ink-900">₹999</span>
              <span className="mb-1.5 text-base font-medium text-ink-400">/ month</span>
            </div>
            <p className="mt-2 text-sm text-ink-500">
              Everything you need to get your business online, professionally.
            </p>

            <ul className="mt-7 space-y-3">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink-700">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-100">
                    <Check className="h-3 w-3 text-brand-600" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <a href="#contact" className="btn-primary mt-8 w-full">
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* Custom pricing */}
        <div className="reveal mx-auto mt-10 max-w-3xl rounded-2xl border border-ink-100 bg-ink-50 p-8 text-center lg:p-10">
          <h3 className="text-xl font-bold text-ink-900">Need something more advanced?</h3>
          <p className="mt-2 text-sm text-ink-500">
            Custom websites, eCommerce, web applications and advanced features are available with
            custom pricing.
          </p>
          <a href="#contact" className="btn-secondary mt-6">
            <MessageCircle className="h-4 w-4" />
            Talk to Us
          </a>
        </div>
      </div>
    </section>
  );
}
