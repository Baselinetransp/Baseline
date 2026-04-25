"use client";

import { useEffect, useRef, useState } from "react";

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  enabled?: boolean;
}

interface UseIntersectionObserverReturn<T extends HTMLElement> {
  ref: React.RefObject<T | null>;
  isInView: boolean;
  entry: IntersectionObserverEntry | null;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): UseIntersectionObserverReturn<T> {
  const {
    threshold = 0.1,
    rootMargin = "0px",
    triggerOnce = true,
    enabled = true,
  } = options;

  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    if (triggerOnce && hasTriggered.current) return;

    const observer = new IntersectionObserver(
      ([observerEntry]) => {
        setEntry(observerEntry);
        if (observerEntry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            hasTriggered.current = true;
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin, triggerOnce, enabled]);

  return { ref, isInView, entry };
}
