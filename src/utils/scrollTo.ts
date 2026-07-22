export function scrollToId(id: string) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const el = document.getElementById(id);
  if (!el) return;

  const targetTop = () => el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: targetTop(), behavior: 'smooth' });

  // On a first visit, media loading during the animation can shift where the
  // scroll lands — re-correct once after the scroll settles.
  const settle = () => {
    if (Math.abs(window.scrollY - targetTop()) > 4) {
      window.scrollTo({ top: targetTop(), behavior: 'smooth' });
    }
  };
  if ('onscrollend' in window) {
    window.addEventListener('scrollend', settle, { once: true });
  } else {
    setTimeout(settle, 1200);
  }
}

/**
 * Scroll to a section that may not be in the DOM yet — used when jumping
 * from another page, where the target only exists after the landing page
 * mounts. Polls briefly, then gives up rather than scrolling somewhere wrong.
 */
export function scrollToIdWhenReady(id: string, timeoutMs = 2000) {
  const deadline = Date.now() + timeoutMs;

  // Timer-based rather than requestAnimationFrame: rAF is paused in tabs the
  // browser isn't painting, which would strand the jump.
  const attempt = () => {
    if (document.getElementById(id)) {
      scrollToId(id);
    } else if (Date.now() < deadline) {
      setTimeout(attempt, 16);
    }
  };
  attempt();
}
