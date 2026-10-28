import type { TopicSummary } from "@/lib/quotes";
import { cn } from "@/lib/utils";

interface TopicChipsProps {
  topics: readonly TopicSummary[];
  activeTopic: string | null;
  onSelect: (topic: string) => void;
  label?: string;
  className?: string;
}

export default function TopicChips({
  topics,
  activeTopic,
  onSelect,
  label = "Popular topics",
  className,
}: TopicChipsProps) {
  return (
    <div role="group" aria-label={label} className={cn("flex flex-wrap items-center gap-2.5", className)}>
      <span aria-hidden="true" className="mr-1 text-sm text-ink-300">
        {label}
      </span>
      {topics.map((topic) => {
        const isActive = topic.name === activeTopic;
        return (
          <button
            key={topic.name}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(topic.name)}
            className={cn(
              "inline-flex min-h-11 items-center rounded-full border px-5 text-[0.95rem] font-medium capitalize",
              "outline-none transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950",
              "active:scale-[0.97]",
              isActive
                ? "border-transparent bg-cream text-ink-900"
                : "border-white/15 bg-white/[0.04] text-ink-100 hover:border-violet-300/60 hover:bg-violet-400/15",
            )}
          >
            {topic.name}
          </button>
        );
      })}
    </div>
  );
}
