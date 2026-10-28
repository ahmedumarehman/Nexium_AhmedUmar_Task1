"use client";

import type { RefObject } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, SpinnerIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

interface SearchFormProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  error: string | null;
  inputRef: RefObject<HTMLInputElement | null>;
}

export default function SearchForm({
  value,
  onChange,
  onSubmit,
  isLoading,
  error,
  inputRef,
}: SearchFormProps) {
  return (
    <form
      role="search"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="topic" className="sr-only">
        Topic
      </label>
      <div
        className={cn(
          "flex flex-col gap-2 rounded-[1.5rem] border bg-white/[0.05] p-2 backdrop-blur-sm sm:flex-row sm:items-center",
          "focus-within:ring-4 focus-within:ring-violet-400/25",
          error
            ? "border-rose-400/70 focus-within:border-rose-300"
            : "border-white/15 focus-within:border-violet-300/70",
        )}
      >
        <div className="relative min-w-0 flex-1">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-300" />
          <Input
            id="topic"
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Type a topic, like courage or dreams"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "topic-error" : undefined}
            className="h-14 rounded-xl border-0 bg-transparent pl-12 pr-4 text-lg text-ink-50 shadow-none backdrop-blur-none placeholder:text-ink-300/80 focus:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:text-lg"
          />
        </div>
        <Button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="h-14 rounded-2xl bg-gradient-to-r from-[#5a4be6] to-[#3b6fe8] px-8 text-base font-semibold text-white shadow-lg shadow-indigo-950/50 ring-offset-ink-950 hover:from-[#6a5cf0] hover:to-[#4a7ef2] disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <SpinnerIcon className="size-5 animate-spin motion-reduce:animate-none" />
              Searching
            </>
          ) : (
            "Find quotes"
          )}
        </Button>
      </div>
      {error && (
        <p id="topic-error" role="alert" className="mt-3 px-2 text-sm font-medium text-rose-300">
          {error}
        </p>
      )}
    </form>
  );
}
