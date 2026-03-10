"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ParallaxBackgroundProps {
  children?: ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export function ParallaxBackground({
  children,
  className,
  speed = 0.3,
  direction = "up",
}: ParallaxBackgroundProps) {
  const { scrollY } = useScrollProgress();

  const translateY = direction === "up" ? -scrollY * speed : scrollY * speed;

  return (
    <div
      className={cn("will-change-transform", className)}
      style={{
        transform: `translateY(${translateY}px)`,
      }}
    >
      {children}
    </div>
  );
}
