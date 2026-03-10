"use client";

import { SectionIndicators } from "./section-indicators";
import { ScrollSnapContainer } from "./scroll-snap-container";
import type { ReactNode } from "react";

interface HomePageClientProps {
  children: ReactNode;
}

export function HomePageClient({ children }: HomePageClientProps) {
  return (
    <>
      <SectionIndicators />
      <ScrollSnapContainer>{children}</ScrollSnapContainer>
    </>
  );
}
