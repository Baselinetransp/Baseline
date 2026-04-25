"use client";

import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowRight, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { trpc } from "@/utils/trpc";
import { getMissingFieldLabels } from "@/hooks/use-profile-check";

const PROFILE_COMPLETE_PATH = "/dashboard/profile/complete";

export function ProfileCompletionBanner() {
  const [isDismissed, setIsDismissed] = useState(false);

  const { data: user } = useQuery(trpc.users.me.queryOptions());
  const { data: profileCheck, isLoading } = useQuery(
    trpc.users.checkProfileComplete.queryOptions()
  );

  // Only show for drivers
  if (user?.role !== "DRIVER") return null;

  // Don't show if loading, dismissed, or profile is complete
  if (isLoading || isDismissed || profileCheck?.isComplete) return null;

  const missingFields = profileCheck?.missingFields ?? [];
  const missingLabels = getMissingFieldLabels(missingFields);

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 relative">
      <button
        onClick={() => setIsDismissed(true)}
        className="absolute top-3 right-3 p-1 hover:bg-amber-100 rounded-md transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4 text-amber-600" />
      </button>

      <div className="flex items-start gap-3 pr-8">
        <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium text-amber-800 mb-1">
            Complete your profile to apply for jobs
          </h3>
          <p className="text-sm text-amber-700 mb-3">
            You're missing: {missingLabels.join(", ")}
          </p>
          <a href={PROFILE_COMPLETE_PATH}>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              Complete Profile
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
