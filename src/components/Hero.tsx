import { ArrowRight, Play, Check, Sparkles, Bot, Clock, TrendingDown, Zap } from 'lucide-react';

const FEATURES = ['Domain & Hosting Included', 'Mobile Responsive', 'Professional Design'];

const AI_STATS = [
  { icon: Clock, value: '70%', label: 'Time Saved', sub: 'with AI automation' },
  { icon: TrendingDown, value: '45%', label: 'Cost Reduced', sub: 'on repetitive tasks' },
  { icon: Zap, value: '3x', label: 'Faster Delivery', sub: 'AI-powered workflows' },
];

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
    icon: Zap,
    eyebrow: 'EFFICIENCY',
    title: 'Work smarter',
    text: 'Less manual work. More output every day.',
    position: 'right-[5%] top-[25%] lg:right-[7%] lg:top-[23%]',
    animation: 'heroBenefitFloatB',
    delay: '1.2s',
  },
  {
    icon: TrendingDown,
    eyebrow: 'LOWER COST',
    title: 'Reduce busywork',
    text: 'Let automation handle repetitive processes.',
    position: 'right-[8%] bottom-[19%] lg:right-[10%] lg:bottom-[20%]',
    animation: 'heroBenefitFloatC',
    delay: '2.1s',
  },
  {
    icon: Sparkles,
    eyebrow: 'BUSINESS WEBSITE',
    title: 'Turn visits into leads',
    text: 'Build trust and make it easy to contact you.',
    position: 'left-[45%] bottom-[8%] lg:left-[52%] lg:bottom-[9%]',
    animation: 'heroBenefitFloatD',
    delay: '0.7s',
  },
];

// Approximate positions of "nodes" on the globe, as a % of the hero section box.
// Tuned loosely around where a globe usually sits when object-position is 75% center —
// nudge these if they don't line up with your actual image.
const GLOBE_NODES = [
  { top: '26%', left: '66%', size: 9, delay: 0 },
  { top: '20%', left: '78%', size: 8, delay: 0.7 },
  { top: '35%', left: '88%', size: 11, delay: 1.4 },
  { top: '46%', left: '73%', size: 8, delay: 2.1 },
  { top: '52%', left: '84%', size: 10, delay: 0.4 },
  { top: '60%', left: '69%', size: 8, delay: 1.8 },
  { top: '63%', left: '90%', size: 7, delay: 2.6 },
  { top: '40%', left: '80%', size: 7, delay: 1.1 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#040351] pt-32 pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Background image — globe sits on the right, empty space on the left for copy.
          Animated with a slow drift + gentle zoom to suggest movement. */}
      <div className="hero-globe-wrap pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <img
          src="/hero-globe.jpg"
          alt=""
          className="hero-globe-img h-full w-full object-cover object-[75%_center]"
        />
      </div>

      {/* Readability overlay (stronger on mobile where text spans full width) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#040351]/90 via-[#040351]/50 to-transparent lg:from-[#040351]/60 lg:via-transparent" />

      {/* Dramatic AI network overlay — intentionally brighter and larger so it
          reads immediately against the globe rather than blending into it. */}
      <div className="hero-ai-network pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-ai-bloom" />
        <div className="hero-ai-core">
          <span />
          <span />
          <span />
        </div>

        <svg className="hero-ai-lines absolute inset-0 h-full w-full" viewBox="0 0 100 100"
             preserveAspectRatio="none">
          <g className="hero-ai-line-group">
            <line x1="66" y1="26" x2="78" y2="20" />
            <line x1="78" y1="20" x2="88" y2="35" />
            <line x1="88" y1="35" x2="80" y2="40" />
            <line x1="80" y1="40" x2="73" y2="46" />
            <line x1="73" y1="46" x2="84" y2="52" />
            <line x1="84" y1="52" x2="90" y2="63" />
            <line x1="84" y1="52" x2="69" y2="60" />
            <line x1="69" y1="60" x2="66" y2="26" />
            <line x1="73" y1="46" x2="80" y2="40" />
            <line x1="66" y1="26" x2="80" y2="40" />
          </g>
        </svg>

        {GLOBE_NODES.map((node, i) => (
          <span
            key={i}
            className="hero-globe-node"
            style={{
              top: node.top,
              left: node.left,
              width: node.size,
              height: node.size,
              animationDelay: `${node.delay}s`,
            }}
          >
            <span className="hero-globe-node-ring" />
          </span>
        ))}

        <div className="hero-ai-scan" />
      </div>

      {/* Small floating benefit cards — intentionally kept away from the main copy on desktop. */}
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

          {/* AI Automation Benefits */}
          <div className="reveal mt-8 max-w-lg rounded-2xl border border-white/15 bg-white/5 p-5 shadow-lg shadow-black/20 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-white">
                <Bot className="h-4 w-4" />
              </span>
              <p className="text-sm font-bold text-white">AI Automation Benefits</p>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {AI_STATS.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-xl bg-white/10">
                    <stat.icon className="h-4 w-4 text-brand-300" />
                  </div>
                  <p className="mt-2 text-2xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs font-semibold text-ink-200">{stat.label}</p>
                  <p className="text-[10px] text-ink-400">{stat.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scoped animation styles for the globe drift + node glow. If this project
          keeps custom keyframes in a global stylesheet or tailwind.config instead,
          these can be moved there — kept local here since only Hero.tsx/App.tsx
          were shared. */}
      <style>{`
        .hero-globe-img {
          transform-origin: 75% center;
          animation: heroGlobeDrift 24s ease-in-out infinite;
          will-change: transform;
        }
        @keyframes heroGlobeDrift {
          0%   { transform: scale(1.06) translate(0%, 0%); }
          50%  { transform: scale(1.12) translate(-1.6%, -0.8%); }
          100% { transform: scale(1.06) translate(0%, 0%); }
        }
        .hero-ai-network {
          z-index: 2;
          overflow: hidden;
          mix-blend-mode: screen;
        }

        .hero-ai-bloom {
          position: absolute;
          top: 42%;
          left: 79%;
          width: 420px;
          height: 420px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background:
            radial-gradient(circle,
              rgba(80, 210, 255, 0.24) 0%,
              rgba(55, 130, 255, 0.13) 28%,
              rgba(40, 90, 255, 0.06) 48%,
              transparent 72%);
          filter: blur(10px);
          animation: heroAiBloom 5s ease-in-out infinite;
        }

        .hero-ai-core {
          position: absolute;
          top: 42%;
          left: 79%;
          width: 24px;
          height: 24px;
          transform: translate(-50%, -50%);
        }

        .hero-ai-core span {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 1px solid rgba(160, 235, 255, 0.8);
          box-shadow: 0 0 18px rgba(80, 205, 255, 0.8);
          animation: heroCoreRing 3.2s ease-out infinite;
        }

        .hero-ai-core span:nth-child(2) { animation-delay: 1s; }
        .hero-ai-core span:nth-child(3) { animation-delay: 2s; }

        .hero-ai-lines {
          overflow: visible;
        }

        .hero-ai-line-group line {
          stroke: rgba(105, 218, 255, 0.72);
          stroke-width: 0.22;
          stroke-linecap: round;
          filter: drop-shadow(0 0 2px rgba(75, 210, 255, 0.95));
          stroke-dasharray: 1.2 1.8;
          animation: heroAiLines 3s linear infinite;
        }

        .hero-globe-node {
          position: absolute;
          z-index: 4;
          border-radius: 9999px;
          background: #e9fbff;
          border: 2px solid rgba(255,255,255,0.95);
          box-shadow:
            0 0 5px 2px rgba(235, 252, 255, 1),
            0 0 18px 7px rgba(82, 211, 255, 0.95),
            0 0 42px 13px rgba(55, 125, 255, 0.65);
          animation: heroGlobeNodePulse 2.6s ease-in-out infinite;
        }

        .hero-globe-node-ring {
          position: absolute;
          inset: -10px;
          border: 1px solid rgba(120, 225, 255, 0.65);
          border-radius: 9999px;
          animation: heroNodeRing 2.6s ease-out infinite;
        }

        .hero-ai-scan {
          position: absolute;
          top: 12%;
          left: 62%;
          width: 1px;
          height: 76%;
          background: linear-gradient(
            to bottom,
            transparent,
            rgba(110, 225, 255, 0.85),
            transparent
          );
          box-shadow: 0 0 18px rgba(80, 210, 255, 0.8);
          transform: rotate(28deg);
          opacity: 0.4;
          animation: heroAiScan 5s ease-in-out infinite;
        }

        @keyframes heroGlobeNodePulse {
          0%, 100% { opacity: 0.78; transform: scale(0.78); }
          45% { opacity: 1; transform: scale(1.08); }
          55% { opacity: 1; transform: scale(1.28); }
        }

        @keyframes heroNodeRing {
          0% { opacity: 0.8; transform: scale(0.45); }
          100% { opacity: 0; transform: scale(2.2); }
        }

        @keyframes heroAiLines {
          to { stroke-dashoffset: -6; }
        }

        @keyframes heroCoreRing {
          0% { opacity: 0.8; transform: scale(0.5); }
          100% { opacity: 0; transform: scale(7); }
        }

        @keyframes heroAiBloom {
          0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scale(0.92); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }

        @keyframes heroAiScan {
          0%, 100% { opacity: 0; transform: translateX(-30px) rotate(28deg); }
          35%, 65% { opacity: 0.5; }
          100% { transform: translateX(110px) rotate(28deg); }
        }

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

        @keyframes heroBenefitFloatC {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-1deg); }
          50% { transform: translate3d(7px, -8px, 0) rotate(1deg); }
        }

        @keyframes heroBenefitFloatD {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(1deg); }
          50% { transform: translate3d(-6px, -9px, 0) rotate(-1deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-globe-img { animation: none; }
          .hero-globe-node { animation: none; opacity: 1; }
          .hero-ai-core span,
          .hero-globe-node-ring,
          .hero-ai-scan,
          .hero-ai-bloom,
          .hero-ai-line-group line,
          .hero-benefit-card { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
