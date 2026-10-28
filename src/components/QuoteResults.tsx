import type { RefObject } from "react";
import QuoteCard from "@/components/QuoteCard";
import TopicChips from "@/components/TopicChips";
import { Button } from "@/components/ui/button";
import { TOPICS, type Quote } from "@/lib/quotes";
import { cn } from "@/lib/utils";

export type SearchStatus = "idle" | "loading" | "success" | "empty" | "error";

interface QuoteResultsProps {
  status: SearchStatus;
  topic: string | null;
  quotes: readonly Quote[];
  headingRef: RefObject<HTMLHeadingElement | null>;
  isFavorite: (id: string) => boolean;
  onToggleFavorite: (quote: Quote) => void;
  onCopy: (quote: Quote) => Promise<boolean>;
  onSelectTopic: (topic: string) => void;
  onRetry: () => void;
}

function featuredSpan(count: number): string {
  if (count === 1) return "md:col-span-2 lg:col-span-5";
  if (count === 2) return "md:col-span-2 lg:col-span-3";
  return "md:col-span-2 lg:col-span-3 lg:row-span-2";
}

function SkeletonGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{ animationDelay: `${i * 160}ms` }}
          className={cn(
            "rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-7 motion-safe:animate-shimmer sm:p-10",
            i === 0 ? featuredSpan(3) : "lg:col-span-2",
          )}
        >
          <div className="h-10 w-10 rounded-full bg-white/10" />
          <div className="mt-6 space-y-3">
            <div className="h-4 w-11/12 rounded-full bg-white/10" />
            <div className="h-4 w-full rounded-full bg-white/10" />
            <div className={cn("h-4 rounded-full bg-white/10", i === 0 ? "w-2/3" : "w-1/2")} />
          </div>
          <div className="mt-8 h-8 w-24 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export default function QuoteResults({
  status,
  topic,
  quotes,
  headingRef,
  isFavorite,
  onToggleFavorite,
  onCopy,
  onSelectTopic,
  onRetry,
}: QuoteResultsProps) {
  if (status === "idle") return null;

  const topicLabel = topic ?? "";

  return (
    <section
      id="results"
      aria-labelledby="results-heading"
      aria-busy={status === "loading"}
      className="mx-auto w-full max-w-6xl scroll-mt-6 px-5 pb-24 sm:px-8"
    >
      <div className="mb-8 flex flex-col gap-2 border-t border-white/10 pt-10">
        <h2
          id="results-heading"
          ref={headingRef}
          tabIndex={-1}
          className="font-display text-3xl tracking-tight text-ink-50 outline-none sm:text-4xl"
        >
          {status === "loading" && <>Finding quotes on {topicLabel}</>}
          {status === "success" && (
            <>
              {quotes.length === 1 ? "A line" : "Lines"} on{" "}
              <span className="capitalize">{topicLabel}</span>
            </>
          )}
          {status === "empty" && <>Nothing here yet</>}
          {status === "error" && <>That didn’t work</>}
        </h2>
        {status === "success" && (
          <p className="text-ink-300">Copy a line to share it, or save it to your collection.</p>
        )}
      </div>

      {status === "loading" && (
        <>
          <p role="status" className="sr-only">
            Finding quotes on {topicLabel}
          </p>
          <SkeletonGrid />
        </>
      )}

      {status === "success" && (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {quotes.map((quote, i) => (
            <QuoteCard
              key={quote.id}
              quote={quote}
              index={i}
              variant={i === 0 ? "featured" : "compact"}
              isFavorite={isFavorite(quote.id)}
              onToggleFavorite={onToggleFavorite}
              onCopy={onCopy}
              className={i === 0 ? featuredSpan(quotes.length) : "lg:col-span-2"}
            />
          ))}
        </div>
      )}

      {status === "empty" && (
        <div className="rounded-[1.75rem] border border-dashed border-white/20 bg-white/[0.03] px-6 py-12 text-center sm:px-12 sm:py-16">
          <span aria-hidden="true" className="quote-glyph block text-[4.5rem] text-violet-300">
            “
          </span>
          <p className="mx-auto mt-6 max-w-lg font-display text-2xl text-ink-50 sm:text-3xl">
            We don’t have quotes on “{topicLabel}” yet.
          </p>
          <p className="mx-auto mt-3 max-w-md text-ink-300">
            Try one of the topics below. Each one opens a handful of lines.
          </p>
          <TopicChips
            topics={TOPICS}
            activeTopic={null}
            onSelect={onSelectTopic}
            label="Available topics"
            className="mt-8 justify-center"
          />
        </div>
      )}

      {status === "error" && (
        <div className="rounded-[1.75rem] border border-rose-300/30 bg-rose-950/30 px-6 py-12 text-center sm:py-16">
          <p className="mx-auto max-w-md font-display text-2xl text-ink-50">
            Something went wrong while finding quotes.
          </p>
          <p className="mx-auto mt-3 max-w-md text-ink-300">Nothing was lost. Give it another try.</p>
          <Button
            type="button"
            onClick={onRetry}
            className="mt-7 h-12 rounded-full bg-cream px-7 text-base font-semibold text-ink-900 ring-offset-ink-950 hover:bg-cream-200"
          >
            Try again
          </Button>
        </div>
      )}
    </section>
  );
}
