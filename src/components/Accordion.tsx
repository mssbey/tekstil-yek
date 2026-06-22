"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type Item = { title: string; content: ReactNode };

export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={it.title}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between py-4 text-left group"
            >
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {it.title}
              </span>
              <ChevronDown
                className={`w-4 h-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180 text-primary" : ""}`}
              />
            </button>
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden">
                <div className="text-sm text-muted-foreground leading-relaxed">{it.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
