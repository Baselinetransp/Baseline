"use client";

import { useMemo } from "react";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "partners", label: "Partners" },
  { id: "categories", label: "Categories" },
  { id: "cta", label: "Post Jobs" },
  { id: "featured", label: "Featured" },
  { id: "latest", label: "Latest" },
] as const;

export function SectionIndicators() {
  const sectionsList = useMemo(() => [...SECTIONS], []);
  const { activeSection, scrollToSection } = useActiveSection(sectionsList);

  return (
    <nav
      className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      aria-label="Page sections"
    >
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollToSection(id)}
          className={cn(
            "group relative w-3 h-3 rounded-full transition-all duration-300",
            "hover:scale-125 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
            activeSection === id
              ? "bg-primary-alt scale-125"
              : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
          )}
          aria-label={`Navigate to ${label}`}
          aria-current={activeSection === id ? "true" : undefined}
        >
          <span
            className={cn(
              "absolute right-6 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-medium",
              "bg-foreground text-background rounded whitespace-nowrap",
              "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100",
              "transition-all duration-200 pointer-events-none"
            )}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
