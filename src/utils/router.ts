import { useEffect, useState } from 'react';

export type Route = 'home' | 'apps';

function currentRoute(): Route {
  return window.location.hash.replace(/^#\/?/, '') === 'apps' ? 'apps' : 'home';
}

/**
 * Minimal hash-based routing. Hash routes need no server rewrite rules, so
 * the site keeps working as a plain static deploy on any host.
 */
export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(currentRoute);

  useEffect(() => {
    const onChange = () => setRoute(currentRoute());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

export function navigate(route: Route) {
  window.location.hash = route === 'apps' ? '#/apps' : '';
  window.scrollTo({ top: 0, behavior: 'auto' });
}
