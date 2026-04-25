"use client";

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ScrollSnapContainerProps {
  children: ReactNode;
  className?: string;
  enabled?: boolean;
}

export function ScrollSnapContainer({
  children,
  className,
  enabled = true,
}: ScrollSnapContainerProps) {
  return (
    <div
      className={cn(
        enabled && "md:snap-none snap-y snap-mandatory",
        "scroll-smooth",
        className
      )}
    >
      {children}
    </div>
  );
}
