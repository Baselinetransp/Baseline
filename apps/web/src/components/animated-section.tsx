"use client";

import { type ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale-up"
  | "scale-down";

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  animation?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  as?: "section" | "div" | "article";
}

const animationClasses: Record<AnimationVariant, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "scale-up": {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  "scale-down": {
    initial: "opacity-0 scale-105",
    animate: "opacity-100 scale-100",
  },
};

export function AnimatedSection({
  children,
  id,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  as: Component = "section",
}: AnimatedSectionProps) {
  const { ref, isInView } = useIntersectionObserver<HTMLElement>({
    threshold,
    triggerOnce: true,
  });

  const { initial, animate } = animationClasses[animation];

  return (
    <Component
      id={id}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "transition-all ease-out",
        isInView ? animate : initial,
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
}
