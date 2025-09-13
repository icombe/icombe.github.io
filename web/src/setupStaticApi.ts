// Rewrites /api/* requests to static JSON under `${BASE_URL}data/*` so the app
// works on GitHub Pages without a backend.

function withBase(p: string) {
  const base = (import.meta as any).env?.BASE_URL || '/';
  return p.startsWith('/') ? base.replace(/\/$/, '') + p : base + p;
}

// Map API routes -> static files (supports both with and without trailing slash)
const routeMap = new Map<string, string>([
  ['/api/experience', withBase('data/experience.json')],
  ['/api/projects',   withBase('data/projects.json')],
  ['/api/games',      withBase('data/games.json')],
]);

const originalFetch = window.fetch.bind(window);

function matchStatic(pathname: string): string | null {
  // Normalize: drop any trailing slash for matching
  const p = pathname.replace(/\/+$/, '');
  for (const [apiBase, staticUrl] of routeMap) {
    const a = apiBase.replace(/\/+$/, '');
    if (p === a) return staticUrl;
  }
  return null;
}

window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
  try {
    const urlStr =
      typeof input === 'string' || input instanceof URL ? String(input) : (input as Request).url;
    const u = new URL(urlStr, window.location.href);
    const replacement = matchStatic(u.pathname);
    if (replacement) {
      const nextInit = { ...(init || {}), method: 'GET' }; // static files are GET-only
      return originalFetch(replacement, nextInit);
    }
  } catch {
    // ignore and fall through
  }
  return originalFetch(input as any, init as any);
};