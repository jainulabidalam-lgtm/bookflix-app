export function getTrigrams(str: string): Set<string> {
  const trigrams = new Set<string>();
  const s = "  " + str.toLowerCase() + "  ";
  for (let i = 0; i < s.length - 2; i++) {
    trigrams.add(s.substring(i, i + 3));
  }
  return trigrams;
}

export function trigramSimilarity(s1: string, s2: string): number {
  if (!s1 || !s2) return 0;
  const t1 = getTrigrams(s1);
  const t2 = getTrigrams(s2);
  let intersections = 0;
  for (let t of t1) {
    if (t2.has(t)) intersections++;
  }
  return intersections / Math.max(t1.size, t2.size);
}

const similarityCache = new Map<string, number>();

export function trigramMatch<T>(query: string, items: T[], getter: (item: T) => string): T[] {
  if (!query) return items;
  const q = query.toLowerCase();
  
  return items
    .map(item => {
        const text = getter(item).toLowerCase();
        const cacheKey = `${q}|${text}`;
        if (similarityCache.has(cacheKey)) return { item, score: similarityCache.get(cacheKey)! };
        
        const score = trigramSimilarity(q, text);
        similarityCache.set(cacheKey, score);
        if (similarityCache.size > 1000) similarityCache.clear(); // Simple LRU-ish
        return { item, score };
    })
    .filter(x => x.score > 0.05 || getter(x.item).toLowerCase().includes(q))
    .sort((a, b) => b.score - a.score)
    .map(x => x.item);
}

export function trigramMatchBooks<T extends { title: string }>(query: string, items: T[]): T[] {
  return trigramMatch(query, items, (item) => item.title);
}
