"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SearchForm from "@/components/SearchForm";
import TopicChips from "@/components/TopicChips";
import QuoteResults, { type SearchStatus } from "@/components/QuoteResults";
import FavoritesDrawer from "@/components/FavoritesDrawer";
import Toaster from "@/components/Toaster";
import Footer from "@/components/Footer";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/useToast";
import { copyText } from "@/lib/clipboard";
import { TOPICS, findQuotes, normalizeTopic, type Quote } from "@/lib/quotes";

/** Short pause kept from the original app so the loading state is visible. */
const SEARCH_DELAY_MS = 800;

export default function QuoteApp() {
  const [topic, setTopic] = useState("");
  const [activeTopic, setActiveTopic] = useState<string | null>(null);
  const [status, setStatus] = useState<SearchStatus>("idle");
  const [results, setResults] = useState<Quote[]>([]);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [savedOpen, setSavedOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timerRef = useRef<number | undefined>(undefined);
  const lastStatusRef = useRef<SearchStatus>("idle");

  const favorites = useFavorites();
  const { toast, show } = useToast();

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll the results into view when a search starts, and move focus to the
  // heading when it finishes so keyboard and screen-reader users land there.
  useEffect(() => {
    const previous = lastStatusRef.current;
    lastStatusRef.current = status;
    if (status === "loading" && previous !== "loading") {
      document
        .getElementById("results")
        ?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "start" });
    }
    if (previous === "loading" && status !== "loading") {
      headingRef.current?.focus({ preventScroll: true });
    }
  }, [status]);

  const runSearch = useCallback(
    (rawTopic: string) => {
      const normalized = normalizeTopic(rawTopic);
      if (!normalized) {
        setValidationError("Enter a topic to search, like courage or dreams.");
        inputRef.current?.focus();
        return;
      }
      setValidationError(null);
      setActiveTopic(normalized);
      setStatus("loading");
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        try {
          const found = findQuotes(normalized);
          setResults(found);
          setStatus(found.length > 0 ? "success" : "empty");
        } catch {
          setResults([]);
          setStatus("error");
        }
      }, SEARCH_DELAY_MS);
    },
    [],
  );

  const handleSelectTopic = useCallback(
    (name: string) => {
      setTopic(name);
      runSearch(name);
    },
    [runSearch],
  );

  const handleCopy = useCallback(
    async (quote: Quote) => {
      const ok = await copyText(quote.text);
      show(
        ok ? "Quote copied to clipboard" : "Couldn’t copy. Select the text and copy it manually.",
        ok ? "success" : "error",
      );
      return ok;
    },
    [show],
  );

  const handleToggleFavorite = useCallback(
    (quote: Quote) => {
      const added = favorites.toggle(quote.id);
      show(added ? "Saved to your collection" : "Removed from saved", "info");
    },
    [favorites, show],
  );

  const closeSaved = useCallback(() => setSavedOpen(false), []);

  return (
    <>
      <div aria-hidden="true" className="atmosphere pointer-events-none fixed inset-0 -z-20" />
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 -z-10" />

      <div className="min-h-dvh overflow-x-clip">
        <Header savedCount={favorites.ids.length} onOpenSaved={() => setSavedOpen(true)} />

        <main>
          <Hero>
            <SearchForm
              value={topic}
              onChange={(value) => {
                setTopic(value);
                if (validationError) setValidationError(null);
              }}
              onSubmit={() => runSearch(topic)}
              isLoading={status === "loading"}
              error={validationError}
              inputRef={inputRef}
            />
            <TopicChips
              topics={TOPICS}
              activeTopic={activeTopic}
              onSelect={handleSelectTopic}
              className="mt-6"
            />
          </Hero>

          <QuoteResults
            status={status}
            topic={activeTopic}
            quotes={results}
            headingRef={headingRef}
            isFavorite={favorites.isFavorite}
            onToggleFavorite={handleToggleFavorite}
            onCopy={handleCopy}
            onSelectTopic={handleSelectTopic}
            onRetry={() => runSearch(activeTopic ?? topic)}
          />
        </main>

        <Footer />
      </div>

      <FavoritesDrawer
        open={savedOpen}
        quotes={favorites.quotes}
        onClose={closeSaved}
        onToggleFavorite={handleToggleFavorite}
        onCopy={handleCopy}
      />
      <Toaster toast={toast} />
    </>
  );
}
