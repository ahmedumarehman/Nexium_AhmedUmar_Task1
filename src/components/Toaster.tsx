"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { CheckIcon, CloseIcon } from "@/components/icons";
import type { Toast } from "@/hooks/useToast";

/**
 * Visual toast rendered in the browser top layer (popover) so it stays visible
 * above the favorites dialog. A separate always-mounted live region announces
 * the message to assistive technology.
 */
export default function Toaster({ toast }: { toast: Toast | null }) {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = popoverRef.current;
    if (!el || typeof el.showPopover !== "function") return;
    try {
      const isOpen = el.matches(":popover-open");
      if (!toast) {
        if (isOpen) el.hidePopover();
        return;
      }
      // Re-open on every new toast so it is promoted above any dialog opened since.
      if (isOpen) el.hidePopover();
      el.showPopover();
    } catch {
      // popover unsupported or in an unexpected state: the toast is simply not shown
    }
  }, [toast]);

  return (
    <>
      <div role="status" aria-live="polite" className="sr-only">
        {toast?.message}
      </div>
      <div
        ref={popoverRef}
        popover="manual"
        aria-hidden="true"
        className="fixed inset-auto bottom-6 left-1/2 m-0 w-max max-w-[calc(100vw-2rem)] -translate-x-1/2 overflow-visible border-0 bg-transparent p-0"
      >
        {toast && (
          <div
            key={toast.id}
            className={cn(
              "flex items-center gap-2.5 rounded-full border px-5 py-3 text-sm font-medium shadow-2xl motion-safe:animate-toast",
              toast.tone === "error"
                ? "border-rose-300/40 bg-rose-950 text-rose-100"
                : "border-white/15 bg-ink-800 text-ink-50",
            )}
          >
            {toast.tone === "error" ? (
              <CloseIcon className="size-4 text-rose-300" />
            ) : (
              <CheckIcon className="size-4 text-violet-300" />
            )}
            {toast.message}
          </div>
        )}
      </div>
    </>
  );
}
