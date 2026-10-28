import { ALL_QUOTES, TOPICS } from "@/lib/quotes";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8">
      <div className="flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-ink-300 sm:flex-row sm:items-center sm:justify-between">
        <p>
          {ALL_QUOTES.length} quotes across {TOPICS.length} topics.
        </p>
        <p>Saved quotes live in your browser and never leave your device.</p>
      </div>
    </footer>
  );
}
