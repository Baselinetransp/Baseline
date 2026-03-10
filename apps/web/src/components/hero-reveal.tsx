"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HeroRevealProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const BASE_DELAY = 100;
const STAGGER_DELAY = 200;

export function HeroReveal({ children, index, className }: HeroRevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, BASE_DELAY + index * STAGGER_DELAY);

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
        className
      )}
    >
      {children}
    </div>
  );
}
