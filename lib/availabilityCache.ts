const CACHE_TTL_MS = 60_000;
const store = new Map<string, { at: number; data: string[] }>();

export function getCache(key: string): string[] | null {
  const entry = store.get(key);
  if (entry && Date.now() - entry.at < CACHE_TTL_MS) return entry.data;
  return null;
}

export function setCache(key: string, data: string[]) {
  store.set(key, { at: Date.now(), data });
}

export function clearCache() {
  store.clear();
}
