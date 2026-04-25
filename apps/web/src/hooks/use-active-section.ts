"use client";

import { useEffect, useState, useCallback } from "react";

interface Section {
  id: string;
  label: string;
}

interface UseActiveSectionReturn {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export function useActiveSection(sections: Section[]): UseActiveSectionReturn {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    if (typeof window === "undefined" || sections.length === 0) return;

    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            setActiveSection(id);
          }
        },
        { threshold: 0.5, rootMargin: "-10% 0px -10% 0px" }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, [sections]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return { activeSection, scrollToSection };
}
