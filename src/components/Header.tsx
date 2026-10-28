import { Button } from "@/components/ui/button";
import { BookmarkIcon } from "@/components/icons";

interface HeaderProps {
  savedCount: number;
  onOpenSaved: () => void;
}

export default function Header({ savedCount, onOpenSaved }: HeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 pt-6 sm:px-8 sm:pt-8">
      <a
        href="#top"
        className="flex items-center gap-3 whitespace-nowrap rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-300"
      >
        <span
          aria-hidden="true"
          className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#5a4be6] to-[#3b6fe8] shadow-lg shadow-indigo-900/40"
        >
          <span className="quote-glyph translate-y-[0.2em] text-[2rem] text-cream">“</span>
        </span>
        <span className="font-display text-xl tracking-tight text-ink-50">Quote Generator</span>
      </a>

      <Button
        type="button"
        variant="outline"
        onClick={onOpenSaved}
        aria-haspopup="dialog"
        className="h-11 rounded-full border-white/15 bg-white/[0.04] px-5 text-sm text-ink-50 ring-offset-ink-950 hover:bg-white/10 hover:text-white"
      >
        <BookmarkIcon className="size-[18px]" filled={savedCount > 0} />
        Saved
        <span
          aria-label={`${savedCount} saved ${savedCount === 1 ? "quote" : "quotes"}`}
          className="ml-0.5 grid min-w-6 place-items-center rounded-full bg-violet-500/25 px-1.5 text-xs font-semibold tabular-nums text-violet-100"
        >
          {savedCount}
        </span>
      </Button>
    </header>
  );
}
