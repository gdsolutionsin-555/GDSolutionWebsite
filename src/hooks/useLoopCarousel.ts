import { useCallback, useEffect, useRef, useState } from 'react';

interface Options {
  count: number;
  perView: number;
  autoplayMs: number;
  slideMs: number;
  paused: boolean;
}

/**
 * Infinite, one-card-at-a-time carousel logic.
 * Render `count + perView` items (the first `perView` cloned at the end) and
 * translate the track by `index * (100 / perView)` percent.
 */
export function useLoopCarousel({ count, perView, autoplayMs, slideMs, paused }: Options) {
  const loop = count > perView;
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const snapping = useRef(false);

  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const next = useCallback(() => {
    if (!loop || snapping.current) return;
    setIndex((i) => (i >= count ? i : i + 1));
  }, [loop, count]);

  const prev = useCallback(() => {
    if (!loop || snapping.current) return;
    if (index > 0) {
      setIndex(index - 1);
      return;
    }
    snapping.current = true;
    setAnimate(false);
    setIndex(count);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        setAnimate(true);
        setIndex(count - 1);
        snapping.current = false;
      }),
    );
  }, [loop, index, count]);

  const goTo = useCallback((i: number) => {
    if (!snapping.current) setIndex(i);
  }, []);

  // After sliding onto the clones, silently snap back to the real start.
  useEffect(() => {
    if (!loop || index !== count) return;
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
    }, slideMs + 50);
    return () => clearTimeout(t);
  }, [loop, index, count, slideMs]);

  // Reset when the number of visible cards or reviews changes.
  useEffect(() => {
    setAnimate(false);
    setIndex(0);
    const r = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(r);
  }, [perView, count]);

  // Auto-scroll; keyed on `index` so manual clicks restart the timer.
  useEffect(() => {
    if (!loop || paused || reducedMotion) return;
    const t = setTimeout(next, autoplayMs);
    return () => clearTimeout(t);
  }, [loop, index, paused, reducedMotion, next, autoplayMs]);

  return { loop, index, animate, next, prev, goTo };
}
