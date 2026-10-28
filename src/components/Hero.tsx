import type { ReactNode } from "react";
import HeroPreview from "@/components/HeroPreview";

export default function Hero({ children }: { children: ReactNode }) {
  return (
    <section
      id="top"
      className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 pb-16 pt-14 sm:px-8 sm:pt-20 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 lg:pb-24 lg:pt-24"
    >
      <div className="min-w-0">
        <h1 className="font-display text-[clamp(2.6rem,7.4vw,4.9rem)] font-normal leading-[1.03] tracking-[-0.025em] text-balance text-ink-50">
          Find the Words That Move You.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-300 sm:text-xl">
          Pick a topic and get a few lines worth keeping. Copy one to share it, or save it to a
          collection that stays in your browser.
        </p>
        <div className="mt-10 max-w-2xl">{children}</div>
      </div>
      <HeroPreview />
    </section>
  );
}
