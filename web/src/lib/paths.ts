export function withBase(p?: string | null): string | undefined {
  if (!p) return undefined;
  if (/^https?:\/\//i.test(p)) return p;
  const base = (import.meta as any).env?.BASE_URL || '/';
  return p.startsWith('/') ? base.replace(/\/$/, '') + p : base + p;
}