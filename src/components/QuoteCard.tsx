"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { BookmarkIcon, CheckIcon, CopyIcon } from "@/components/icons";
import type { Quote } from "@/lib/quotes";
import { cn } from "@/lib/utils";

export type QuoteCardVariant = "featured" | "compact" | "saved";

interface QuoteCardProps {
  quote: Quote;
  variant?: QuoteCardVariant;
  isFavorite: boolean;
  onToggleFavorite: (quote: Quote) => void;
  onCopy: (quote: Quote) => Promise<boolean>;
  /** Position in the list, used to stagger the entrance animation. */
  index?: number;
  className?: string;
}

const textSize: Record<QuoteCardVariant, string> = {
  featured: "text-[1.65rem] leading-[1.25] sm:text-4xl sm:leading-[1.2] lg:text-[2.65rem]",
  compact: "text-xl leading-snug sm:text-[1.6rem] sm:leading-snug",
  saved: "text-lg leading-snug",
};

const padding: Record<QuoteCardVariant, string> = {
  featured: "p-7 sm:p-12",
  compact: "p-6 sm:p-8",
  saved: "p-5",
};

const glyphSize: Record<QuoteCardVariant, string> = {
  featured: "text-[6.5rem]",
  compact: "text-[4.5rem]",
  saved: "text-[3.5rem]",
};

const iconButton =
  "size-11 rounded-full text-ink-700 ring-offset-cream hover:bg-ink-900/10 hover:text-ink-900 focus-visible:ring-violet-600 [&_svg]:size-5";

export default function QuoteCard({
  quote,
  variant = "compact",
  isFavorite,
  onToggleFavorite,
  onCopy,
  index = 0,
  className,
}: QuoteCardProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const handleCopy = async () => {
    const ok = await onCopy(quote);
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article
      style={{ animationDelay: `${index * 110}ms` }}
      className={cn(
        "group relative flex min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-cream text-ink-900 ring-1 ring-black/5",
        "shadow-[0_28px_60px_-34px_rgba(0,0,0,0.9)]",
        "motion-safe:animate-rise motion-safe:transition-[transform,box-shadow] motion-safe:duration-300",
        "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_36px_70px_-32px_rgba(70,60,200,0.55)]",
        padding[variant],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("quote-glyph block text-violet-600", glyphSize[variant])}
      >
        “
      </span>

      <blockquote className="mt-4 min-w-0 flex-1">
        <p className={cn("font-display break-words text-pretty text-ink-900", textSize[variant])}>
          {quote.text}
        </p>
      </blockquote>

      <div
        className={cn(
          "mt-7 flex items-center justify-between gap-3 border-t border-ink-900/10 pt-4",
          variant === "featured" && "sm:mt-10",
        )}
      >
        <span className="inline-flex min-w-0 items-center gap-2 rounded-full bg-violet-600/10 px-3.5 py-1.5 text-sm font-medium capitalize text-violet-900">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-violet-600" />
          <span className="truncate">{quote.topic}</span>
        </span>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleCopy}
            aria-label={copied ? "Quote copied" : "Copy quote"}
            title="Copy quote"
            className={iconButton}
          >
            {copied ? <CheckIcon className="text-emerald-700" /> : <CopyIcon />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onToggleFavorite(quote)}
            aria-pressed={isFavorite}
            aria-label="Save quote"
            title={isFavorite ? "Remove from saved" : "Save quote"}
            className={cn(iconButton, isFavorite && "text-violet-700")}
          >
            <BookmarkIcon filled={isFavorite} />
          </Button>
        </div>
      </div>
    </article>
  );
}
