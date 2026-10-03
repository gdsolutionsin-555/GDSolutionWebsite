import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Monitor, Smartphone, Zap, Target, Headphones, Bot, Mic, ArrowRight } from 'lucide-react';

const FEATURES = [
  {
    num: '01',
    icon: ShieldCheck,
    title: 'Transparent',
    desc: 'Clear communication and no surprises from kickoff to launch.',
  },
  {
    num: '02',
    icon: Monitor,
    title: 'Modern Design',
    desc: 'Clean, modern interfaces designed to make your business look credible.',
  },
  {
    num: '03',
    icon: Bot,
    title: 'AI-Powered Automation',
    desc: 'We automate repetitive tasks like follow-ups, reporting and data entry, freeing up your team for higher-value work.',
  },
  {
    num: '04',
    icon: Mic,
    title: 'Voice Bots & Virtual Assistants',
    desc: 'Voice-driven assistants that handle routine customer queries and calls, so your team only steps in when it matters.',
  },
  {
    num: '05',
    icon: Smartphone,
    title: 'Mobile First',
    desc: 'Every website is designed to work beautifully across phones, tablets and desktops.',
  },
  {
    num: '06',
    icon: Zap,
    title: 'Fast & Optimized',
    desc: 'Performance-focused websites with clean implementation.',
  },
  {
    num: '07',
    icon: Target,
    title: 'Business Focused',
    desc: 'Every page is designed around your business goals and customer journey.',
  },
  {
    num: '08',
    icon: Headphones,
    title: 'Ongoing Support',
    desc: 'We help businesses maintain and improve their digital presence.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-ink-50 via-white to-brand-50/40 py-20 lg:py-28"
    >
      {/* Decorative animated background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-400/10 blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
        <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-brand-300/10 blur-3xl animate-[pulse_6s_ease-in-out_infinite_1s]" />
        <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-300/40 to-transparent" />
      </div>

      <div className="container-px relative mx-auto max-w-7xl">
        {/* Section heading */}
        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-1000 ease-out ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-700 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
            </span>
            Why GD Solutions
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Why Businesses Choose{' '}
            <span className="relative inline-block text-brand-600">
              GD Solutions
              <span className="absolute -bottom-1 left-0 h-1 w-full origin-left rounded-full bg-brand-500/20" />
            </span>
          </h2>

          <p className="mt-5 text-lg leading-relaxed text-ink-500">
            We combine design, technology and business understanding to deliver websites that
            actually work for your business.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, index) => (
            <article
              key={f.num}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
                event.currentTarget.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
              }}
              className={`group relative overflow-hidden rounded-3xl border border-ink-100/80 bg-white/90 p-7 shadow-sm backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-2 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-600/10 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDelay: `${150 + index * 90}ms`,
              }}
            >
              {/* Cursor-following glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(220px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(22,163,74,0.12),transparent_70%)]" />

              {/* Animated top accent */}
              <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-brand-500 via-brand-600 to-brand-400 transition-transform duration-500 group-hover:scale-x-100" />

              <div className="relative flex items-center justify-between">
                <div className="relative">
                  <span className="absolute inset-0 rounded-2xl bg-brand-500/20 blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                    <f.icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                  </span>
                </div>

                <span className="text-4xl font-black tracking-tight text-ink-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brand-100">
                  {f.num}
                </span>
              </div>

              <h3 className="relative mt-6 text-xl font-bold text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                {f.title}
              </h3>

              <p className="relative mt-3 text-sm leading-7 text-ink-500">
                {f.desc}
              </p>

              <div className="relative mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600 opacity-70 transition-all duration-300 group-hover:gap-3 group-hover:opacity-100">
                <span>Built for your business</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              {/* Bottom progress line */}
              <div className="absolute bottom-0 left-7 right-7 h-px overflow-hidden bg-ink-100">
                <div className="h-full w-0 bg-brand-500 transition-all duration-700 group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>

        {/* Bottom reassurance strip */}
        <div
          className={`mx-auto mt-12 flex max-w-3xl items-center justify-center gap-3 rounded-2xl border border-brand-100 bg-white/70 px-5 py-4 text-center text-sm text-ink-500 shadow-sm backdrop-blur-sm transition-all duration-1000 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
          style={{ transitionDelay: '850ms' }}
        >
          <ShieldCheck className="h-5 w-5 shrink-0 text-brand-600" />
          <span>
            Thoughtful design, reliable technology and ongoing support — from first idea to launch and beyond.
          </span>
        </div>
      </div>
    </section>
  );
}
