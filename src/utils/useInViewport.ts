import { useEffect, useState, type RefObject } from 'react';

/**
 * True once the element has scrolled into view, and stays true.
 *
 * Deliberately measured with getBoundingClientRect on scroll/resize plus a
 * slow poll, rather than IntersectionObserver: this drives a text reveal that
 * renders *nothing* until it fires, so a missed notification would leave the
 * headline permanently blank. The poll also covers the case where the element
 * is already in view at mount.
 */
export function useInViewport(ref: RefObject<HTMLElement>, offset = 120): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return;

    const check = () => {
      const el = ref.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      const visible =
        rect.top < window.innerHeight - offset && rect.bottom > offset;
      if (visible) setInView(true);
      return visible;
    };

    if (check()) return;

    const poll = setInterval(check, 250);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      clearInterval(poll);
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [ref, offset, inView]);

  return inView;
}
