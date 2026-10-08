import { useEffect, useRef, useState, type MouseEvent } from 'react';
import {
  ArrowRight,
  Code,
  Mail,
  Bot,
  Camera,
  Server,
  LifeBuoy,
  Search,
  Headset,
} from 'lucide-react';
import { SERVICE_ART, type ServiceArtKey } from '@/components/ServiceArt';

interface Service {
  num: string;
  icon: typeof Code;
  title: string;
  desc: string;
  art: ServiceArtKey;
  /** Optional real photo (e.g. '/services/cctv.jpg' placed in /public). Replaces the illustration. */
  image?: string;
  featured?: boolean;
  isNew?: boolean;
  wide?: boolean;
  subtitle?: string;
  tags?: string[];
  /** Optional bold-label bullet list shown instead of the plain description. */
  points?: { label: string; text: string }[];
}

const SERVICES: Service[] = [
  {
    num: '01',
    art: 'web',
    icon: Code,
    title: 'Website Design and Development',
    desc: 'Modern, responsive and conversion-focused websites for businesses of every size.',
    featured: true,
  },
  {
    num: '02',
    art: 'hosting',
    icon: Mail,
    title: 'Hosting and Business Email setup and Maintenance',
    desc: 'Reliable hosting plus professional business email, set up and maintained for you.',
  },
  {
    num: '03',
    art: 'ai',
    icon: Bot,
    title: 'AI automation and Voice bots',
    desc: 'Smart automation and voice assistants that handle repetitive work and customer queries.',
  },
  {
    num: '04',
    art: 'cctv',
    icon: Camera,
    title: 'CCTV installation and AMC support',
    desc: 'Professional CCTV setup with annual maintenance support to keep your premises secure.',
  },
  {
    num: '05',
    art: 'infra',
    icon: Server,
    title: 'IT Infrastructure Projects',
    desc: 'LAN & structured cabling, fibre-optic cabling, network racks and professional installation, testing and maintenance.',
    points: [
      { label: 'LAN & Structured Cabling', text: 'Reliable network cabling for seamless connectivity.' },
      { label: 'Fibre-Optic Cabling', text: 'High-speed fibre connectivity for business networks.' },
      { label: 'Network Racks & Infrastructure', text: 'Organised racks and reliable networking components.' },
      { label: 'Installation, Testing & Maintenance', text: 'Professional installation and dependable network support.' },
    ],
  },
  {
    num: '06',
    art: 'support',
    icon: LifeBuoy,
    title: 'IT Support and AMC',
    desc: 'Ongoing IT support and annual maintenance contracts to keep your systems running smoothly.',
  },
  {
    num: '07',
    art: 'seo',
    icon: Search,
    title: 'SEO and Digital Marketing',
    desc: 'Strategies designed to improve visibility, traffic and online presence.',
  },
  {
    num: '08',
    art: 'comms',
    icon: Headset,
    isNew: true,
    wide: true,
    title: 'Connect. Communicate. Collaborate',
    subtitle: 'Professional Audio-Video & Unified Communication Solutions',
    desc: 'Reliable conferencing systems and IP telephony for modern workplaces, plus wired, wireless, USB, Bluetooth and noise-cancelling headsets for offices, contact centres and remote teams.',
    tags: ['Conferencing', 'IP Telephony', 'Professional Headsets', 'Call-Centre Headsets'],
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotionPreference = () => setReduceMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener?.('change', updateMotionPreference);

    return () => mediaQuery.removeEventListener?.('change', updateMotionPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (reduceMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduceMotion]);

  const handleCardMove = (event: MouseEvent<HTMLElement>) => {
    if (reduceMotion) return;

    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleCardLeave = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget;
    card.style.setProperty('--mouse-x', '50%');
    card.style.setProperty('--mouse-y', '50%');
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative overflow-hidden bg-white py-20 lg:py-28"
    >
      {/* Soft ambient background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className={`absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl ${
            reduceMotion ? '' : 'animate-[servicesFloat_10s_ease-in-out_infinite]'
          }`}
        />
        <div
          className={`absolute -right-32 bottom-10 h-80 w-80 rounded-full bg-brand-50 blur-3xl ${
            reduceMotion ? '' : 'animate-[servicesFloatReverse_12s_ease-in-out_infinite]'
          }`}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-200/70 to-transparent" />
      </div>

      <style>{`
        @keyframes servicesFloat {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(45px, -24px, 0) scale(1.08); }
        }
        @keyframes servicesFloatReverse {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-38px, 24px, 0) scale(1.06); }
        }
        @keyframes servicesPulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: .8; transform: scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="container-px relative z-10 mx-auto max-w-7xl">
        {/* Section heading */}
        <div
          className={`max-w-3xl transition-all duration-700 ease-out ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">
            <span
              className={`relative flex h-2.5 w-2.5 items-center justify-center rounded-full bg-brand-600 ${
                reduceMotion ? '' : 'animate-[servicesPulse_2s_ease-in-out_infinite]'
              }`}
            >
              <span className="absolute h-full w-full rounded-full bg-brand-600/30" />
            </span>
            What We Do
          </div>

          <p className="mt-3 text-sm font-semibold uppercase tracking-wider text-brand-600">
            Our Services
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            Everything You Need to Build{' '}
            <span className="text-brand-600">Your Digital Presence</span>
          </h2>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-500">
            From websites to branding, we cover the full spectrum of digital services your
            business needs to succeed online.
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            const delay = reduceMotion ? 0 : 120 + index * 90;

            return (
              <article
                key={service.num}
                onMouseMove={handleCardMove}
                onMouseLeave={handleCardLeave}
                style={{
                  transitionDelay: `${delay}ms`,
                  ['--mouse-x' as string]: '50%',
                  ['--mouse-y' as string]: '50%',
                }}
                className={`group relative min-h-[300px] overflow-hidden ${service.wide ? 'lg:col-span-2' : ''} rounded-2xl border bg-white p-7 transition-[transform,opacity,box-shadow,border-color] duration-700 ease-out will-change-transform ${
                  isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                } ${
                  service.featured
                    ? 'border-brand-200 shadow-[0_12px_45px_rgba(0,80,40,0.08)]'
                    : 'border-ink-100 shadow-sm'
                } hover:-translate-y-2 hover:border-brand-300 hover:shadow-[0_22px_55px_rgba(0,80,40,0.13)]`}
              >
                {/* Cursor-following glow */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(180px circle at var(--mouse-x) var(--mouse-y), rgba(0,96,48,0.11), transparent 70%)',
                  }}
                />

                {/* Background picture: photo if provided, otherwise line-art illustration */}
                <div
                  className={`pointer-events-none absolute inset-y-0 right-0 text-brand-600 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 ${
                    service.wide ? 'w-[62%] opacity-60' : 'w-[78%] opacity-50'
                  }`}
                  style={{
                    WebkitMaskImage: 'linear-gradient(to left, #000 35%, transparent 100%)',
                    maskImage: 'linear-gradient(to left, #000 35%, transparent 100%)',
                  }}
                  aria-hidden="true"
                >
                  {service.image ? (
                    <img
                      src={service.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover opacity-40"
                    />
                  ) : (
                    (() => {
                      const ArtComponent = SERVICE_ART[service.art];
                      return (
                        <div className="h-full w-full p-4 pt-10 opacity-60">
                          <ArtComponent />
                        </div>
                      );
                    })()
                  )}
                </div>

                {/* Animated top accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-brand-600 transition-transform duration-500 ease-out group-hover:scale-x-100" />

                {/* Decorative corner */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-50 opacity-0 transition-all duration-500 ease-out group-hover:scale-125 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <div className="relative">
                    <span
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-brand-600 transition-all duration-500 ease-out group-hover:rotate-[-4deg] group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-brand-600/25 ${
                        service.featured ? 'bg-brand-100' : 'bg-brand-50'
                      }`}
                    >
                      <Icon className="h-6 w-6 transition-transform duration-500 group-hover:scale-110" />
                    </span>
                    {service.isNew && (
                      <span className="absolute -right-3 -top-2 rounded-full bg-ink-900 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                        New
                      </span>
                    )}
                    {service.featured && (
                      <span className="absolute -right-2 -top-2 rounded-full bg-brand-600 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md">
                        Core
                      </span>
                    )}
                  </div>

                  <span className="text-4xl font-extrabold leading-none text-ink-100 transition-all duration-500 group-hover:-translate-y-1 group-hover:text-brand-200">
                    {service.num}
                  </span>
                </div>

                <div className="relative mt-7">
                  <h3 className="text-xl font-bold tracking-tight text-ink-900 transition-colors duration-300 group-hover:text-brand-700">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="mt-1.5 text-sm font-semibold text-brand-600">{service.subtitle}</p>
                  )}
                  {service.points ? (
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-ink-500">
                      {service.points.map((point) => (
                        <li key={point.label} className="flex gap-2">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" aria-hidden="true" />
                          <span>
                            <strong className="font-semibold text-ink-800">{point.label}:</strong> {point.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={`mt-3 text-sm leading-6 text-ink-500 ${service.wide ? 'max-w-xl' : ''}`}>
                      {service.desc}
                    </p>
                  )}
                  {service.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-xs font-semibold text-brand-700"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="#contact"
                  className="group/link relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition-colors duration-200 hover:text-brand-700"
                >
                  <span>Explore Service</span>
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-brand-200 bg-brand-50 transition-all duration-300 group-hover/link:border-brand-600 group-hover/link:bg-brand-600 group-hover/link:text-white">
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5" />
                  </span>
                </a>

                {/* Bottom progress line */}
                <div className="absolute bottom-0 left-7 right-7 h-px overflow-hidden bg-ink-100">
                  <div className="h-full w-full origin-left scale-x-0 bg-brand-500 transition-transform duration-700 ease-out group-hover:scale-x-100" />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
