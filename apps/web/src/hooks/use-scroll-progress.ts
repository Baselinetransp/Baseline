"use client";

import { useEffect, useState } from "react";

interface UseScrollProgressReturn {
  scrollY: number;
  scrollProgress: number;
}

export function useScrollProgress(): UseScrollProgressReturn {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          setScrollY(currentScrollY);
          setScrollProgress(documentHeight > 0 ? currentScrollY / documentHeight : 0);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { scrollY, scrollProgress };
}
