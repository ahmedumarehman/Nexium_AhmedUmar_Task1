import quotesData from "@/data/quotes.json";

export interface Quote {
  /** Stable id derived from the topic and text, safe to persist. */
  id: string;
  topic: string;
  text: string;
}

interface RawQuote {
  topic: string;
  text: string;
}

export interface TopicSummary {
  name: string;
  count: number;
}

/** Maximum number of quotes returned for one search (unchanged from the original app). */
export const MAX_RESULTS = 3;

function hashText(value: string): string {
  let hash = 5381;
  for (let i = 0; i < value.length; i += 1) {
    hash = ((hash * 33) ^ value.charCodeAt(i)) >>> 0;
  }
  return hash.toString(36);
}

const raw: RawQuote[] = quotesData;

export const ALL_QUOTES: readonly Quote[] = raw.map((q) => {
  const topic = q.topic.trim().toLowerCase();
  return { id: `${topic}-${hashText(q.text)}`, topic, text: q.text };
});

const QUOTES_BY_ID = new Map<string, Quote>(ALL_QUOTES.map((q) => [q.id, q]));

/** Topics that actually exist in the dataset, in first-seen order. */
export const TOPICS: readonly TopicSummary[] = (() => {
  const counts = new Map<string, number>();
  for (const q of ALL_QUOTES) counts.set(q.topic, (counts.get(q.topic) ?? 0) + 1);
  return Array.from(counts, ([name, count]) => ({ name, count }));
})();

export function normalizeTopic(value: string): string {
  return value.trim().toLowerCase();
}

/** Same behaviour as the original app: exact, case-insensitive topic match, first three quotes. */
export function findQuotes(rawTopic: string): Quote[] {
  const topic = normalizeTopic(rawTopic);
  if (!topic) return [];
  return ALL_QUOTES.filter((q) => q.topic === topic).slice(0, MAX_RESULTS);
}

export function getQuoteById(id: string): Quote | undefined {
  return QUOTES_BY_ID.get(id);
}

export function isKnownQuoteId(id: string): boolean {
  return QUOTES_BY_ID.has(id);
}

/** Returns the nth quote of a topic, used for the static hero preview. */
export function getQuoteByTopic(topic: string, index: number): Quote | undefined {
  return ALL_QUOTES.filter((q) => q.topic === topic)[index];
}
