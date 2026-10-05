import { ArrowRight, Play, Check, Sparkles, Bot, Mic, Globe2 } from 'lucide-react';

const FEATURES = ['AI Automation Ready', 'Mobile Responsive', 'Professional Design'];

const FLOATING_BENEFITS = [
  {
    icon: Bot,
    eyebrow: 'AI AUTOMATION',
    title: 'Save days of work',
    text: 'Automate repetitive tasks and workflows.',
    position: 'left-[51%] top-[18%] lg:left-[52%] lg:top-[17%]',
    animation: 'heroBenefitFloatA',
    delay: '0s',
  },
  {
    icon: Mic,
    eyebrow: 'VOICE BOTS',
    title: 'Round-the-clock support',
    text: 'Voice assistants that handle calls and routine queries.',
    position: 'right-[5%] top-[25%] lg:right-[7%] lg:top-[23%]',
    animation: 'heroBenefitFloatB',
    delay: '1.2s',
  },
  {
    icon: Globe2,
    eyebrow: 'WEBSITES',
    title: 'Turn visits into leads',
    text: 'Professional websites that build trust and convert.',
    position: 'left-[45%] bottom-[8%] lg:left-[52%] lg:bottom-[9%]',
    animation: 'heroBenefitFloatD',
    delay: '0.7s',
  },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#040351] pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Background image — static, no drift/zoom animation */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/hero-globe.jpg"
          alt=""
          className="h-full w-full object-cover object-[75%_center]"
        />
      </div>

      {/* Readability overlay (stronger on mobile where text spans full width) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040351]/90 via-[#040351]/50 to-transparent lg:from-[#040351]/60 lg:via-transparent" />

      {/* Floating benefit cards — the only animated element in this section */}
      <div className="pointer-events-none absolute inset-0 z-[5] hidden lg:block" aria-hidden="true">
        {FLOATING_BENEFITS.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.title}
              className={`hero-benefit-card absolute ${benefit.position} w-[190px] rounded-2xl border border-white/15 bg-[#07115f]/75 p-3 shadow-[0_12px_35px_rgba(0,0,0,0.28)] backdrop-blur-md`}
              style={{
                animation: `${benefit.animation} 5.5s ease-in-out infinite`,
                animationDelay: benefit.delay,
              }}
            >
              <div className="flex items-start gap-2.5">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-300/20">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-brand-300">
                    {benefit.eyebrow}
                  </p>
                  <p className="mt-0.5 text-xs font-bold text-white">{benefit.title}</p>
                  <p className="mt-0.5 text-[10px] leading-snug text-white/60">{benefit.text}</p>
                </div>
              </div>
              <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-brand-300 shadow-[0_0_12px_rgba(74,222,128,0.9)]" />
            </div>
          );
        })}
      </div>

      <div className="container-px relative mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-300" />
            Websites &amp; AI Automation for Indian Businesses
          </div>

          <h1 className="reveal mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[4rem]">
            We Build Digital Experiences That{' '}
            <span className="relative whitespace-nowrap text-brand-400">
              Grow Businesses
              <svg
                className="absolute -bottom-2 left-0 w-full text-brand-500"
                viewBox="0 0 300 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M2 9C60 3 140 3 298 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
            .
          </h1>

          <p className="reveal mt-6 max-w-xl text-lg leading-relaxed text-ink-300">
            Modern websites, AI automation and digital solutions designed to help Indian
            businesses look professional, attract customers and grow online.
          </p>

          <div className="reveal mt-8 flex flex-wrap items-center gap-4">
            <a href="#contact" className="btn-primary">
              Get Your Website
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#portfolio" className="btn-ghost-light">
              <Play className="h-3.5 w-3.5" />
              View Our Work
            </a>
          </div>

          <ul className="reveal mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {FEATURES.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-ink-200">
                <span className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-brand-500/25">
                  <Check className="h-2.5 w-2.5 text-brand-300" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .hero-benefit-card {
          will-change: transform;
          transition: border-color 300ms ease, box-shadow 300ms ease;
        }

        .hero-benefit-card:hover {
          border-color: rgba(74, 222, 128, 0.38);
          box-shadow: 0 16px 42px rgba(0, 0, 0, 0.34), 0 0 28px rgba(74, 222, 128, 0.08);
        }

        @keyframes heroBenefitFloatA {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
          50% { transform: translate3d(0, -10px, 0) rotate(1deg); }
        }

        @keyframes heroBenefitFloatB {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg); }
          50% { transform: translate3d(-7px, 9px, 0) rotate(-1deg); }
        }

        @keyframes heroBenefitFloatD {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg); }
          50% { transform: translate3d(-6px, -9px, 0) rotate(-1deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-benefit-card { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
