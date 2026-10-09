import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, PenLine, Star } from 'lucide-react';
import { useLoopCarousel } from '@/hooks/useLoopCarousel';

type Review = {
  author: string;
  authorUrl: string;
  photo: string;
  rating: number;
  text: string;
  when: string;
};

type ReviewsData = {
  rating: number;
  total: number;
  mapsUrl: string;
  writeReviewUrl: string;
  reviews: Review[];
};

const AUTOPLAY_MS = 2000; // auto-scroll every 2 seconds
const SLIDE_MS = 600;

function GoogleG({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function Stars({ value, size = 'h-4 w-4' }: { value: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={size}
          style={{ color: i <= Math.round(value) ? '#FBBC04' : '#e2e8f0', fill: 'currentColor' }}
        />
      ))}
    </span>
  );
}

function Avatar({ name, photo }: { name: string; photo: string }) {
  const [failed, setFailed] = useState(false);
  if (photo && !failed) {
    return (
      <img
        src={photo}
        alt=""
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={() => setFailed(true)}
        className="h-11 w-11 rounded-full object-cover ring-1 ring-ink-100"
      />
    );
  }
  return (
    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700">
      {name.trim().charAt(0).toUpperCase() || 'G'}
    </span>
  );
}

function usePerView() {
  const get = () =>
    typeof window === 'undefined'
      ? 1
      : window.matchMedia('(min-width: 1024px)').matches
        ? 3
        : window.matchMedia('(min-width: 640px)').matches
          ? 2
          : 1;
  const [perView, setPerView] = useState(get);
  useEffect(() => {
    const queries = [window.matchMedia('(min-width: 1024px)'), window.matchMedia('(min-width: 640px)')];
    const update = () => setPerView(get());
    queries.forEach((q) => q.addEventListener('change', update));
    return () => queries.forEach((q) => q.removeEventListener('change', update));
  }, []);
  return perView;
}

export default function Testimonials() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [data, setData] = useState<ReviewsData | null>(null);
  const [paused, setPaused] = useState(false);
  const perView = usePerView();

  useEffect(() => {
    let cancelled = false;
    fetch('/api/reviews')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: ReviewsData) => {
        if (cancelled) return;
        if (!d.reviews?.length) throw new Error('no reviews');
        setData(d);
        setStatus('ready');
      })
      .catch((e) => {
        if (cancelled) return;
        console.warn('Google reviews unavailable:', e);
        setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const reviews = data?.reviews ?? [];
  const count = reviews.length;
  const { loop, index, animate, next, prev, goTo } = useLoopCarousel({
    count,
    perView,
    autoplayMs: AUTOPLAY_MS,
    slideMs: SLIDE_MS,
    paused,
  });

  // If Google reviews can't be loaded, show nothing rather than fake content.
  if (status === 'error') return null;

  const items = loop ? [...reviews, ...reviews.slice(0, perView)] : reviews;
  const first = count ? index % count : 0;
  const isActive = (i: number) => Array.from({ length: perView }, (_, k) => (first + k) % count).includes(i);

  return (
    <section id="testimonials" className="bg-ink-50/50 py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Testimonials</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mt-4 text-lg text-ink-500">Real reviews from our clients on Google Maps.</p>

          {data && (
            <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <div className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm ring-1 ring-ink-100">
                <GoogleG className="h-6 w-6" />
                <span className="text-2xl font-extrabold text-ink-900">{data.rating.toFixed(1)}</span>
                <Stars value={data.rating} size="h-5 w-5" />
                <span className="text-sm text-ink-500">
                  {data.total} review{data.total === 1 ? '' : 's'} on Google Maps
                </span>
              </div>
              <div className="flex gap-3">
                {data.mapsUrl && (
                  <a
                    href={data.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                  >
                    See all reviews <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                <a
                  href={data.writeReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
                >
                  Leave a review <PenLine className="h-4 w-4" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Loading skeleton */}
        {status === 'loading' && (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-60 animate-pulse rounded-2xl border border-ink-100 bg-white" />
            ))}
          </div>
        )}

        {status === 'ready' && (
          <div
            className="relative mt-14"
            onPointerEnter={(e) => e.pointerType === 'mouse' && setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            onFocus={(e) => e.target.matches(':focus-visible') && setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="-mx-3 overflow-hidden py-3">
              <div
                className={`flex items-stretch ${animate ? 'transition-transform ease-out' : ''}`}
                style={{
                  transform: `translateX(-${index * (100 / perView)}%)`,
                  transitionDuration: animate ? `${SLIDE_MS}ms` : '0ms',
                }}
              >
                {items.map((r, i) => (
                  <div
                    key={`${r.author}-${i}`}
                    className="flex-shrink-0 px-3"
                    style={{ width: `${100 / perView}%` }}
                    aria-hidden={i >= count || undefined}
                  >
                    <article className="flex h-full flex-col rounded-2xl border border-ink-100 bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink-900/10">
                      <div className="flex items-center justify-between">
                        <Stars value={r.rating} />
                        <GoogleG className="h-5 w-5" />
                      </div>
                      <p className="mt-4 line-clamp-6 flex-1 text-sm leading-relaxed text-ink-600">{r.text}</p>
                      <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
                        <Avatar name={r.author} photo={r.photo} />
                        <div className="min-w-0">
                          {r.authorUrl ? (
                            <a
                              href={r.authorUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              tabIndex={i >= count ? -1 : 0}
                              className="block truncate text-sm font-bold text-ink-800 hover:text-brand-600"
                            >
                              {r.author}
                            </a>
                          ) : (
                            <p className="truncate text-sm font-bold text-ink-800">{r.author}</p>
                          )}
                          <p className="text-xs text-ink-400">{r.when} on Google</p>
                        </div>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {loop && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous reviews"
                  className="absolute -left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-800 shadow-lg ring-1 ring-ink-100 transition hover:scale-105 hover:bg-brand-600 hover:text-white sm:-left-4"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next reviews"
                  className="absolute -right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-800 shadow-lg ring-1 ring-ink-100 transition hover:scale-105 hover:bg-brand-600 hover:text-white sm:-right-4"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>
        )}

        {status === 'ready' && loop && (
          <div className="mt-6 flex justify-center gap-2">
            {reviews.map((r, i) => (
              <button
                key={`${r.author}-${i}`}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show review ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  isActive(i) ? 'w-8 bg-brand-500' : 'w-2.5 bg-ink-200 hover:bg-ink-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
