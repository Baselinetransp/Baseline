"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { trpc } from "@/utils/trpc";

export interface ProfileCheckResult {
  isComplete: boolean;
  isLoading: boolean;
  missingFields: string[];
  checkAndRedirect: () => boolean;
}

const PROFILE_COMPLETE_PATH = "/dashboard/profile/complete";

/**
 * Hook to check if driver profile is complete.
 * Returns a function that checks completeness and redirects to profile completion page if not complete.
 */
export function useProfileCheck(): ProfileCheckResult {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    trpc.users.checkProfileComplete.queryOptions()
  );

  const checkAndRedirect = (): boolean => {
    if (isLoading) return false;

    if (!data?.isComplete) {
      window.location.href = PROFILE_COMPLETE_PATH;
      return false;
    }

    return true;
  };

  return {
    isComplete: data?.isComplete ?? false,
    isLoading,
    missingFields: data?.missingFields ?? [],
    checkAndRedirect,
  };
}

/**
 * Get human-readable labels for missing profile fields
 */
export function getMissingFieldLabels(missingFields: string[]): string[] {
  const labels: Record<string, string> = {
    phone: "Phone Number",
    country: "Country",
    state: "State/Region",
    resumeUrl: "CV/Resume",
  };

  return missingFields.map((field) => labels[field] || field);
}
