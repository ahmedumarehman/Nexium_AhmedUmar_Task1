"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getQuoteById, isKnownQuoteId, type Quote } from "@/lib/quotes";

const STORAGE_KEY = "quote-generator:favorites:v1";

/** Returns localStorage only when it is a working Storage object (browser only). */
function getStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    const storage = window.localStorage;
    if (
      storage &&
      typeof storage.getItem === "function" &&
      typeof storage.setItem === "function"
    ) {
      return storage;
    }
  } catch {
    // access can throw (privacy mode, blocked storage)
  }
  return null;
}

function readIds(): string[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    const stored = storage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];
    const unique = new Set<string>();
    for (const value of parsed) {
      if (typeof value === "string" && isKnownQuoteId(value)) unique.add(value);
    }
    return Array.from(unique);
  } catch {
    return [];
  }
}

function writeIds(ids: string[]): void {
  const storage = getStorage();
  if (!storage || typeof storage.setItem !== "function") return;
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {
    // quota or privacy errors: favorites still work for this session
  }
}

export interface FavoritesApi {
  ids: readonly string[];
  quotes: readonly Quote[];
  isFavorite: (id: string) => boolean;
  /** Returns true when the quote was added, false when it was removed. */
  toggle: (id: string) => boolean;
}

/**
 * Favorites persisted in localStorage. Storage is read only inside an effect,
 * so server rendering and the first client render both start empty and match.
 */
export function useFavorites(): FavoritesApi {
  const [ids, setIds] = useState<string[]>([]);
  const idsRef = useRef<string[]>([]);

  useEffect(() => {
    const load = () => {
      const next = readIds();
      idsRef.current = next;
      setIds(next);
    };
    load();

    const onStorage = (event: StorageEvent) => {
      if (event.key === null || event.key === STORAGE_KEY) load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((id: string) => {
    const current = idsRef.current;
    const added = !current.includes(id);
    const next = added ? [id, ...current] : current.filter((value) => value !== id);
    idsRef.current = next;
    setIds(next);
    writeIds(next);
    return added;
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const quotes = useMemo(
    () => ids.map((id) => getQuoteById(id)).filter((q): q is Quote => q !== undefined),
    [ids],
  );

  return { ids, quotes, isFavorite, toggle };
}
