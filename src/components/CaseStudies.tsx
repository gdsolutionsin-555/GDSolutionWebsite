import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, X, ZoomIn } from 'lucide-react';

type CaseStudy = {
  image: string;
  alt: string;
  tag: string;
  title: string;
  client: string;
  summary: string;
  points: string[];
};

const CASES: CaseStudy[] = [
  {
    image: '/case-studies/karnish-group.webp',
    alt: 'Home page of the Karnish Group of India website',
    tag: 'Website · Splash Screen · Business Email',
    title: 'Website, Splash Screen & Business Email for Karnish Group of India',
    client: 'Karnish Group of India · Solar & power engineering',
    summary:
      'We created the website for Karnish Group of India along with a splash screen, and set up Google Workspace with their own domain and professional business emails.',
    points: [
      'Business website with a custom splash screen',
      'Google Workspace set up for the business',
      'Own domain with professional business emails',
    ],
  },
  {
    image: '/case-studies/mps-relocations.webp',
    alt: 'Home page of the MPS Relocations website with a free moving quote form',
    tag: 'Website',
    title: 'Lead-Focused Website for a Packers & Movers Company',
    client: 'MPS Relocations',
    summary:
      'A clean, modern website for a packers, movers and local delivery business, built around getting visitors to request a quote.',
    points: [
      'Free moving quote form right on the home page',
      'Call Now and WhatsApp buttons in the header',
      'Instant Delivery and Track Shipment pages, plus service sections',
    ],
  },
  {
    image: '/case-studies/paws-and-wellness.webp',
    alt: 'Home page of the Paws & Wellness pet store and vet clinic website',
    tag: 'Website',
    title: 'Website for a Pet Store, Grooming & Vet Clinic',
    client: 'Paws & Wellness',
    summary:
      'A warm, modern website that brings a pet store, grooming, vaccination and in-house veterinary care together in one place.',
    points: [
      'Book an Appointment and WhatsApp buttons throughout',
      'Shop by pet, with online enquiries for availability',
      'Sections for grooming, vaccination and vet consultation',
    ],
  },
  {
    image: '/case-studies/lucky-voice-assistant.webp',
    alt: 'Infographic explaining Lucky, the multilingual AI voice assistant by GD Solutions',
    tag: 'AI Voice Assistant',
    title: 'Lucky: A Multilingual AI Voice Assistant',
    client: 'GD Solutions · In-house product',
    summary:
      'Lucky answers calls in English, Hindi and Bengali, qualifies leads, and hands them to the team, with a call report and confirmation email sent automatically.',
    points: [
      "Detects the caller's language and switches naturally",
      'Captures contact details and business requirements',
      'Call reports and confirmation emails through Vapi and Make.com',
    ],
  },
  {
    image: '/case-studies/sahayak-ai.webp',
    alt: 'Sahayak AI dashboard showing case triage, priorities and statuses',
    tag: 'AI Application',
    title: 'AI-Assisted Case Triage Dashboard',
    client: 'Sahayak AI',
    summary:
      'A support dashboard that takes in requests, sorts them by category and priority with AI, and tracks each case through to resolution, with people making the final decisions.',
    points: [
      'AI triage breakdown by category and priority',
      'Case tracking from needs review to resolved',
      'Responsible AI notice: AI suggests, humans decide',
    ],
  },
  {
    image: '/case-studies/invoice-automation.webp',
    alt: 'Infographic of the automated invoice and receipt management workflow',
    tag: 'Workflow Automation',
    title: 'Automated Invoice & Receipt Management',
    client: 'Gmail · AI document processing',
    summary:
      'A workflow that watches a Gmail inbox, sorts incoming PDFs into invoices and receipts, extracts the key data with AI and records each one in a ledger.',
    points: [
      'AI classification of invoices and receipts',
      'Validation, with manual review only when errors occur',
      'Duplicate check on invoice numbers before the ledger entry',
    ],
  },
  {
    image: '/case-studies/whatsapp-follow-ups.webp',
    alt: 'Make.com scenario connecting Google Sheets to WhatsApp Business Cloud',
    tag: 'Workflow Automation',
    title: 'Scheduled WhatsApp Follow-Ups from Google Sheets',
    client: 'Make.com · Google Sheets · WhatsApp Business Cloud',
    summary:
      'A scheduled automation that finds leads in a Google Sheet and sends them a WhatsApp Business template message, with no manual follow-up needed.',
    points: [
      'Reads leads straight from Google Sheets',
      'Sends approved WhatsApp Business template messages',
      'Runs on a schedule, so nothing is forgotten',
    ],
  },
  {
    image: '/case-studies/telegram-store-bot.webp',
    alt: 'Infographic showing how a Telegram cloth store order bot works',
    tag: 'Chatbot',
    title: 'Telegram Order Bot for a Cloth Store',
    client: 'Telegram · Google Sheets',
    summary:
      'A Telegram bot that recognises returning customers and guides them through the menu, item selection and checkout, syncing order data to Google Sheets.',
    points: [
      'Customer record lookup for returning customers',
      'Five-path router: menu, item selection, checkout and more',
      'Orders and payment data synced to Sheets and data stores',
    ],
  },
  {
    image: '/case-studies/data-workflow.webp',
    alt: 'Infographic of an automated data workflow from webhook to Gmail',
    tag: 'Workflow Automation',
    title: 'From Webhook to Inbox: An Automated Data Workflow',
    client: 'Webhooks · Google Sheets · Drive · Gmail',
    summary:
      'An automation that receives incoming data by webhook, updates Google Sheets records, retrieves the right files from Google Drive and emails them out through Gmail.',
    points: [
      'Webhook trigger with JSON parsed into usable fields',
      'Records cross-checked in a data store before Sheets updates',
      'Files fetched from Google Drive and sent through Gmail',
    ],
  },
];

const AUTOPLAY_MS = 4500; // auto-scroll every 4.5 seconds
const SLIDE_MS = 700;

const desktopQuery = '(min-width: 1024px)';

function usePerView() {
  const [perView, setPerView] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(desktopQuery).matches ? 2 : 1,
  );
  useEffect(() => {
    const mq = window.matchMedia(desktopQuery);
    const update = () => setPerView(mq.matches ? 2 : 1);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);
  return perView;
}

export default function CaseStudies() {
  const n = CASES.length;
  const perView = usePerView();
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [zoomed, setZoomed] = useState<CaseStudy | null>(null);
  const snapping = useRef(false);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Clone the first cards at the end so the loop never visibly rewinds.
  const items = [...CASES, ...CASES.slice(0, perView)];

  const next = useCallback(() => {
    if (snapping.current) return;
    setIndex((i) => (i >= n ? i : i + 1));
  }, [n]);

  const prev = useCallback(() => {
    if (snapping.current) return;
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    // At the start: jump (without animation) to the cloned end, then slide back one.
    snapping.current = true;
    setAnimate(false);
    setIndex(n);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(n - 1);
        snapping.current = false;
      }),
    );
  }, [index, n]);

  // After sliding onto the clones, silently snap back to the real start.
  useEffect(() => {
    if (index !== n) return;
    snapping.current = true;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setAnimate(true);
          snapping.current = false;
        }),
      );
    }, SLIDE_MS + 50);
    return () => clearTimeout(t);
  }, [index, n]);

  // Reset position when the layout switches between 1 and 2 cards.
  useEffect(() => {
    setAnimate(false);
    setIndex(0);
    const r = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(r);
  }, [perView]);

  // Auto-scroll. Using a timeout keyed on `index` restarts the timer after any manual click.
  useEffect(() => {
    if (paused || zoomed || reducedMotion) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, zoomed, reducedMotion, next]);

  // Close the zoomed picture with Esc.
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoomed(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomed]);

  const first = index % n;
  const isActive = (i: number) => (perView === 1 ? i === first : i === first || i === (first + 1) % n);

  return (
    <section id="case-studies" className="bg-white py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Case Studies</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Real Projects, Practical Solutions
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            From websites and business email to AI voice bots and workflow automation, see how we put
            technology to work for businesses.
          </p>
        </div>

        <div
          className="reveal relative mt-14"
          onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
          onPointerLeave={() => setPaused(false)}
          onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {/* Viewport */}
          <div className="-mx-3 overflow-hidden px-0 py-4">
            <div
              className={`flex items-stretch ${animate ? 'transition-transform ease-out' : ''}`}
              style={{
                transform: `translateX(-${index * (100 / perView)}%)`,
                transitionDuration: animate ? `${SLIDE_MS}ms` : '0ms',
              }}
            >
              {items.map((c, i) => {
                const isClone = i >= n;
                return (
                  <div
                    key={`${c.title}-${i}`}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / perView}%` }}
                    aria-hidden={isClone || undefined}
                  >
                    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-xl shadow-ink-900/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand-900/10">
                      <button
                        type="button"
                        onClick={() => setZoomed(c)}
                        tabIndex={isClone ? -1 : 0}
                        aria-label={`View ${c.title} larger`}
                        className="group/img relative block aspect-[16/9] w-full cursor-zoom-in overflow-hidden bg-ink-50"
                      >
                        <img
                          src={c.image}
                          alt={c.alt}
                          loading={i < 2 ? 'eager' : 'lazy'}
                          className="h-full w-full object-cover object-top transition-transform duration-700 group-hover/img:scale-105"
                        />
                        <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/70 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover/img:opacity-100">
                          <ZoomIn className="h-4 w-4" />
                        </span>
                      </button>

                      <div className="flex flex-1 flex-col p-6 sm:p-7">
                        <span className="inline-block w-fit rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand-700">
                          {c.tag}
                        </span>
                        <h3 className="mt-4 text-xl font-extrabold leading-snug tracking-tight text-ink-900">
                          {c.title}
                        </h3>
                        <p className="mt-1.5 text-xs font-semibold uppercase tracking-wider text-ink-400">
                          {c.client}
                        </p>
                        <p className="mt-4 text-sm leading-6 text-ink-500">{c.summary}</p>
                        <ul className="mt-5 space-y-2.5">
                          {c.points.map((p) => (
                            <li key={p} className="flex items-start gap-2.5 text-sm leading-snug text-ink-700">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous case studies"
            className="absolute -left-2 top-[28%] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-800 shadow-lg ring-1 ring-ink-100 transition hover:scale-105 hover:bg-brand-600 hover:text-white sm:-left-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next case studies"
            className="absolute -right-2 top-[28%] z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink-800 shadow-lg ring-1 ring-ink-100 transition hover:scale-105 hover:bg-brand-600 hover:text-white sm:-right-4"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Case study pages">
          {CASES.map((c, i) => (
            <button
              key={c.title}
              type="button"
              role="tab"
              aria-selected={isActive(i)}
              aria-label={`Show ${c.title}`}
              onClick={() => setIndex(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                isActive(i) ? 'w-8 bg-brand-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Enlarged picture */}
      {zoomed && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoomed.title}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink-950/90 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setZoomed(null)}
        >
          <button
            type="button"
            onClick={() => setZoomed(null)}
            aria-label="Close picture"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </button>
          <figure className="max-h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={zoomed.image}
              alt={zoomed.alt}
              className="max-h-[80vh] w-auto max-w-full rounded-xl bg-white object-contain shadow-2xl"
            />
            <figcaption className="mt-3 text-center text-sm font-medium text-white/80">{zoomed.title}</figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
