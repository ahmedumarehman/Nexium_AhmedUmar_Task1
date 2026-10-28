import { getQuoteByTopic } from "@/lib/quotes";
import { cn } from "@/lib/utils";

/** Decorative stack built from real dataset quotes. Static, so it renders identically on server and client. */
const CARDS = [
  { topic: "motivation", index: 2, tone: "glass", pos: "left-0 top-0 w-[78%]", from: "-9deg", to: "-6deg", delay: "0ms" },
  { topic: "courage", index: 2, tone: "paper", pos: "right-0 top-[8rem] w-[80%]", from: "6deg", to: "3.5deg", delay: "120ms" },
  { topic: "success", index: 3, tone: "front", pos: "left-[4%] top-[16rem] w-[84%]", from: "-3deg", to: "-1.5deg", delay: "240ms" },
] as const;

export default function HeroPreview() {
  return (
    <div aria-hidden="true" className="relative mx-auto hidden h-[28rem] w-full max-w-md lg:block">
      {CARDS.map((card) => {
        const quote = getQuoteByTopic(card.topic, card.index);
        if (!quote) return null;
        return (
          <div
            key={quote.id}
            style={
              {
                "--from-rotate": card.from,
                "--to-rotate": card.to,
                transform: `rotate(${card.to})`,
                animationDelay: card.delay,
              } as React.CSSProperties
            }
            className={cn(
              "absolute rounded-[1.6rem] p-6 motion-safe:animate-settle",
              card.pos,
              card.tone === "glass" &&
                "border border-white/15 bg-white/[0.06] text-ink-100 backdrop-blur-sm",
              card.tone === "paper" &&
                "bg-cream-200 text-ink-900 shadow-[0_30px_50px_-30px_rgba(0,0,0,0.9)]",
              card.tone === "front" &&
                "bg-cream text-ink-900 shadow-[0_40px_70px_-30px_rgba(0,0,0,0.95)] ring-1 ring-black/5",
            )}
          >
            <span
              className={cn(
                "quote-glyph block text-[3.25rem]",
                card.tone === "glass" ? "text-violet-300" : "text-violet-600",
              )}
            >
              “
            </span>
            <p className="mt-4 font-display text-[1.35rem] leading-snug text-balance">{quote.text}</p>
            {card.tone === "front" && (
              <p className="mt-4 text-sm font-medium capitalize opacity-70">{quote.topic}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
