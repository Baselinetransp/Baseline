"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import type { ApplicationStatus, DashboardStats } from "@/types";

/**
 * Hook for fetching user's applications
 */
export function useApplications(filters?: {
  status?: ApplicationStatus;
  page?: number;
  limit?: number;
}) {
  return useQuery(
    trpc.application.getMyApplications.queryOptions({
      status: filters?.status,
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,
    })
  );
}

/**
 * Hook for fetching a single application
 */
export function useApplication(applicationId: string) {
  return useQuery(
    trpc.application.getById.queryOptions({ id: applicationId })
  );
}

/**
 * Hook for fetching dashboard statistics
 */
export function useDashboardStats() {
  return useQuery(trpc.application.getStats.queryOptions());
}

/**
 * Hook for applying to a job
 */
export function useApplyToJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      jobId: string;
      coverLetter?: string;
      resumeUrl?: string;
    }) => {
      const result = await trpc.application.apply.mutate(data);
      return result;
    },
    onSuccess: () => {
      // Invalidate applications list to refetch
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
  });
}

/**
 * Hook for withdrawing an application
 */
export function useWithdrawApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (applicationId: string) => {
      const result = await trpc.application.withdraw.mutate({
        id: applicationId,
      });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application"] });
    },
  });
}

/**
 * Hook for fetching upcoming interviews
 */
export function useUpcomingInterviews() {
  return useQuery(trpc.application.getUpcomingInterviews.queryOptions());
}
