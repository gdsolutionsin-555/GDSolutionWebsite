import { useEffect, useState, useCallback } from 'react';
import { Brain, Code, Server, Cctv, ArrowLeft, ArrowRight } from 'lucide-react';

type Slide = {
  image: string;
  alt: string;
  title: string;
  caption: string;
  icon: typeof Brain;
};

const SLIDES: Slide[] = [
  {
    image: 'https://images.pexels.com/photos/17483870/pexels-photo-17483870.png?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Abstract digital neural network visualization',
    title: 'AI Solutions',
    caption: 'Intelligent automation and data-driven insights for your business.',
    icon: Brain,
  },
  {
    image: 'https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Colorful code on a computer screen',
    title: 'Web Development',
    caption: 'Modern, responsive websites built with clean, scalable code.',
    icon: Code,
  },
  {
    image: 'https://images.pexels.com/photos/37730212/pexels-photo-37730212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Server racks in a data center',
    title: 'IT Services',
    caption: 'Reliable infrastructure, networking and cloud solutions.',
    icon: Server,
  },
  {
    image: 'https://images.pexels.com/photos/96612/pexels-photo-96612.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    alt: 'Outdoor security cameras on a pole',
    title: 'CCTV Installation',
    caption: 'Professional surveillance systems to keep your premises secure.',
    icon: Cctv,
  },
];

const AUTOPLAY_MS = 4500;

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goTo = (i: number) => setCurrent(i);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="reveal mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            What We Do
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl lg:text-5xl">
            Digital, IT & Security Solutions Under One Roof
          </h2>
          <p className="mt-4 text-lg text-ink-500">
            From AI-powered tools to CCTV installations, we deliver technology that moves your
            business forward.
          </p>
        </div>

        <div
          className="reveal relative mt-14 overflow-hidden rounded-3xl border border-ink-100 shadow-2xl shadow-ink-900/10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track */}
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {SLIDES.map((slide, i) => (
              <div key={i} className="relative w-full flex-shrink-0">
                <div className="relative aspect-[16/10] sm:aspect-[16/8] lg:aspect-[21/8]">
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="h-full w-full object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-ink-950/85 via-ink-950/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/60 to-transparent" />

                  {/* Slide content */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="container-px mx-auto max-w-7xl">
                      <div className="max-w-md">
                        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/90 text-white backdrop-blur-sm shadow-lg">
                          <slide.icon className="h-6 w-6" />
                        </span>
                        <h3 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
                          {slide.title}
                        </h3>
                        <p className="mt-3 text-sm leading-relaxed text-ink-200 sm:text-base">
                          {slide.caption}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-105"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition-all duration-300 hover:bg-white/30 hover:scale-105"
          >
            <ArrowRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-8 bg-brand-400'
                    : 'w-2.5 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-white/10">
            <div
              key={current}
              className="h-full bg-brand-500"
              style={{
                animation: paused ? 'none' : `progressBar ${AUTOPLAY_MS}ms linear forwards`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
