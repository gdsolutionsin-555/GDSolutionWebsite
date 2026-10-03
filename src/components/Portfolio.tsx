import { ArrowUpRight } from 'lucide-react';

const PROJECTS = [
  {
    name: 'AURA',
    category: 'Luxury Fashion Store',
    desc: 'An elegant e-commerce experience for a premium fashion brand with curated collections.',
    image: 'https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'MEDICARE',
    category: 'Healthcare Website',
    desc: 'A clean, trustworthy website for a healthcare provider with appointment booking.',
    image: 'https://images.pexels.com/photos/7789616/pexels-photo-7789616.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'URBAN NEST',
    category: 'Real Estate Platform',
    desc: 'A property listing platform with search, filters and immersive photo galleries.',
    image: 'https://images.pexels.com/photos/8482510/pexels-photo-8482510.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'BREW & BEAN',
    category: 'Restaurant Website',
    desc: 'A warm, inviting website for a café with menu, story and online ordering.',
    image: 'https://images.pexels.com/photos/15860802/pexels-photo-15860802.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'NOVA FITNESS',
    category: 'Fitness Studio',
    desc: 'A high-energy website for a fitness studio with class schedules and membership plans.',
    image: 'https://images.pexels.com/photos/38882512/pexels-photo-38882512.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    name: 'CRAFTSPACE',
    category: 'Creative Business',
    desc: 'A portfolio-driven website for a creative studio showcasing their work and services.',
    image: 'https://images.pexels.com/photos/6044300/pexels-photo-6044300.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="bg-ink-50/50 py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
              Portfolio
            </p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
              Selected Work
            </h2>
            <p className="mt-4 text-lg text-ink-500">
              A glimpse of the digital experiences we've crafted for businesses across industries.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <article
              key={p.name}
              className="reveal group relative overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-ink-900/10"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.category}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-ink-700 backdrop-blur-sm">
                  {p.category}
                </span>
                <a
                  href="#contact"
                  className="absolute bottom-4 right-4 flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-brand-600 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  aria-label={`View ${p.name} project`}
                >
                  <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold tracking-tight text-ink-900">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{p.desc}</p>
                <a
                  href="#contact"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  View Project
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
