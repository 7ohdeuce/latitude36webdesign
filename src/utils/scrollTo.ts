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
