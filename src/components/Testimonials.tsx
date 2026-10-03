import { Quote, Plus } from 'lucide-react';

const TESTIMONIALS = [
  {
    text: 'Add your first customer testimonial here.',
    name: 'Customer Name',
    business: 'Business Name',
    location: 'Location',
  },
  {
    text: 'Add your second customer testimonial here.',
    name: 'Customer Name',
    business: 'Business Name',
    location: 'Location',
  },
  {
    text: 'Add your third customer testimonial here.',
    name: 'Customer Name',
    business: 'Business Name',
    location: 'Location',
  },
];

export default function Testimonials() {
  return (
    <section className="bg-ink-50/50 py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Testimonials
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            Real feedback from businesses we've helped grow online. (Placeholder content —
            replace with genuine testimonials.)
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="reveal relative flex flex-col rounded-2xl border border-ink-100 border-dashed bg-white p-7"
            >
              <Quote className="h-8 w-8 text-brand-200" />
              <p className="mt-4 flex-1 text-sm italic leading-relaxed text-ink-400">
                {t.text}
              </p>
              <div className="mt-6 border-t border-ink-100 pt-4">
                <p className="text-sm font-bold text-ink-700">{t.name}</p>
                <p className="text-xs text-ink-400">
                  {t.business} — {t.location}
                </p>
              </div>
              <span className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-ink-50 px-2.5 py-1 text-[10px] font-semibold text-ink-400">
                <Plus className="h-3 w-3" />
                Placeholder
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
