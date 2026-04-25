"use client";

import { AlertCircle, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getMissingFieldLabels } from "@/hooks/use-profile-check";

const PROFILE_COMPLETE_PATH = "/dashboard/profile/complete";

interface ProfileIncompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  missingFields: string[];
}

export function ProfileIncompleteModal({
  isOpen,
  onClose,
  missingFields,
}: ProfileIncompleteModalProps) {
  if (!isOpen) return null;

  const missingLabels = getMissingFieldLabels(missingFields);

  const handleCompleteProfile = () => {
    window.location.href = PROFILE_COMPLETE_PATH;
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-md animate-in fade-in zoom-in-95">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold">Complete Your Profile</h2>
                <p className="text-sm text-muted-foreground">
                  Required to apply for jobs
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded-md transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Before you can apply for jobs, please complete the following information in your profile:
            </p>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-2">Missing information:</p>
              <ul className="space-y-2">
                {missingLabels.map((label) => (
                  <li key={label} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Later
            </Button>
            <Button
              className="flex-1 bg-primary-alt hover:bg-primary-alt/90 text-black"
              onClick={handleCompleteProfile}
            >
              Complete Profile
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
