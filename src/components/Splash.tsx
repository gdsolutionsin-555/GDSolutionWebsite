import { ArrowRight, Mail, MessageCircle, LayoutGrid, Ticket, Boxes } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const PRODUCTS = [
  {
    icon: LayoutGrid,
    name: 'Attendance Module',
    brief: 'Track attendance, shifts and leave in real time.',
    href: 'https://attendancemodule.vercel.app/',
  },
  {
    icon: Ticket,
    name: 'Ticketing Portal',
    brief: 'Resolve support requests faster with structured ticketing.',
    href: 'https://ticketportal-xi.vercel.app/',
  },
  {
    icon: Boxes,
    name: 'Asset Management Portal',
    brief: 'Track every company asset from purchase to retirement.',
    href: 'https://asset-inventory-gamma.vercel.app/',
  },
];

export default function Splash({ onEnter }: { onEnter: () => void }) {
  useScrollReveal();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-ink-950">
      {/* Single static background image, covers the full screen */}
      <img
        src="/hero-keyboard.jpg"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-[60%_center] brightness-110 saturate-[1.1]"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/35 to-ink-950/55" />

      <div className="container-px relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center gap-10 py-16 text-center">
        {/* Logo + name */}
        <div className="reveal flex flex-col items-center gap-3">
          <img
            src="/gd-logo.png"
            alt="GD Solutions logo"
            className="h-24 w-24 object-contain drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)] sm:h-28 sm:w-28"
          />
          <h1 className="font-sans text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            GD Solutions
          </h1>
          <p className="flex flex-wrap items-baseline justify-center gap-x-2.5 gap-y-0.5">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-300">
              Innovate | Automate | Secure
            </span>
          </p>
        </div>

        {/* Flagship intro */}
        <p className="reveal max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Our flagship products, adopted by small and medium companies to increase efficiency and
          reduce costs.
        </p>

        {/* Primary CTA */}
        <button
          type="button"
          onClick={() =>
            document.getElementById('get-in-touch')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          }
          className="btn-cta-flow reveal inline-flex items-center gap-2 rounded-full px-8 py-3 text-sm font-bold text-white shadow-[0_15px_35px_rgba(16,185,129,0.35)] transition-transform hover:-translate-y-0.5"
        >
          Connect With Us for Free Consultation
        </button>

        {/* Two-column body: products (left) + get in touch (right) */}
        <div className="grid w-full gap-6 text-left lg:grid-cols-[1.15fr_0.85fr]">
          {/* Product list */}
          <div className="flex flex-col gap-5">
            {PRODUCTS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.name}
                  className="reveal flex flex-col gap-4 rounded-2xl bg-white/95 p-7 shadow-[0_16px_40px_rgba(0,0,0,0.3)] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-sans text-xl font-bold text-ink-900">{p.name}</h3>
                      <p className="mt-0.5 text-sm text-ink-500">{p.brief}</p>
                    </div>
                  </div>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
                  >
                    Explore
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              );
            })}
          </div>

          {/* Get in touch panel */}
          <div
            id="get-in-touch"
            className="reveal flex flex-col gap-5 rounded-2xl bg-white/95 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
          >
            <div>
              <h3 className="font-sans text-lg font-bold text-ink-900">Get in Touch</h3>
              <p className="mt-1 text-sm text-ink-500">
                Connect with us now for a free demo and discussion.
              </p>
            </div>

            <div className="rounded-xl bg-brand-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Email Us &middot; General enquiries
              </p>
              <a
                href="mailto:contact@gdsolutions.in"
                className="mt-2 flex items-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-500"
              >
                <Mail className="h-4 w-4" />
                contact@gdsolutions.in
              </a>
            </div>

            <div className="rounded-xl bg-sky-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                WhatsApp &middot; Quick chat
              </p>
              <a
                href="https://wa.me/918282899565"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-500"
              >
                <MessageCircle className="h-4 w-4" />
                +91 82828 99565
              </a>
            </div>
          </div>
        </div>

        {/* Proceed to main site */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onEnter();
          }}
          className="reveal mt-2 inline-flex items-center gap-2 rounded-full border border-white/15 bg-ink-900/70 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-ink-800/80"
        >
          <span className="underline decoration-brand-400 decoration-2 underline-offset-4">
            Click to continue&hellip;
          </span>
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <style>{`
        .btn-cta-flow {
          background-image: linear-gradient(90deg, #10b981, #2dd4bf, #38bdf8, #a78bfa, #38bdf8, #2dd4bf, #10b981);
          background-size: 300% 100%;
          animation: ctaFlow 6s linear infinite;
        }
        @keyframes ctaFlow {
          0% { background-position: 0% 50%; }
          100% { background-position: 150% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .btn-cta-flow { animation: none; background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
