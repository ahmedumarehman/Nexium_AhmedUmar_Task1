"use client";

import { useEffect, useRef } from "react";
import QuoteCard from "@/components/QuoteCard";
import { Button } from "@/components/ui/button";
import { CloseIcon } from "@/components/icons";
import type { Quote } from "@/lib/quotes";

interface FavoritesDrawerProps {
  open: boolean;
  quotes: readonly Quote[];
  onClose: () => void;
  onToggleFavorite: (quote: Quote) => void;
  onCopy: (quote: Quote) => Promise<boolean>;
}

/** Uses the native <dialog> element for focus trapping, Escape handling and an inert background. */
export default function FavoritesDrawer({
  open,
  quotes,
  onClose,
  onToggleFavorite,
  onCopy,
}: FavoritesDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="saved-heading"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      className="drawer fixed inset-y-0 right-0 left-auto m-0 h-dvh max-h-none w-full max-w-md border-0 border-l border-white/10 bg-ink-900 p-0 text-ink-50 backdrop:bg-ink-950/70 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-6">
        <div>
          <h2 id="saved-heading" className="font-display text-3xl tracking-tight">
            Saved quotes
          </h2>
          <p className="mt-1 text-sm text-ink-300">
            {quotes.length === 0
              ? "Nothing saved yet."
              : `${quotes.length} ${quotes.length === 1 ? "quote" : "quotes"}, kept in this browser.`}
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onClose}
          aria-label="Close saved quotes"
          className="size-11 shrink-0 rounded-full text-ink-100 ring-offset-ink-900 hover:bg-white/10 hover:text-white"
        >
          <CloseIcon className="size-5" />
        </Button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 py-6">
        {quotes.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-white/20 px-6 py-12 text-center">
            <span aria-hidden="true" className="quote-glyph block text-[4rem] text-violet-300">
              “
            </span>
            <p className="mt-6 font-display text-xl text-ink-50">Your collection is empty.</p>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-300">
              Use the bookmark on any quote to keep it here.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {quotes.map((quote) => (
              <li key={quote.id}>
                <QuoteCard
                  quote={quote}
                  variant="saved"
                  isFavorite
                  onToggleFavorite={onToggleFavorite}
                  onCopy={onCopy}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </dialog>
  );
}
