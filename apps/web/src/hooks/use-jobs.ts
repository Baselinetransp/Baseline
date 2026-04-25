"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { trpc } from "@/utils/trpc";
import type { JobFilters } from "@/types";

/**
 * Hook for searching/listing jobs
 */
export function useJobs(filters?: JobFilters) {
  return useQuery(
    trpc.job.search.queryOptions({
      search: filters?.search,
      location: filters?.location,
      type: filters?.type,
      experienceLevel: filters?.experienceLevel,
      salaryMin: filters?.salaryMin,
      salaryMax: filters?.salaryMax,
      isRemote: filters?.isRemote,
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,
    })
  );
}

/**
 * Hook for fetching a single job by ID
 */
export function useJob(jobId: string) {
  return useQuery(trpc.job.getById.queryOptions({ id: jobId }));
}

/**
 * Hook for fetching featured/recommended jobs
 */
export function useFeaturedJobs(limit: number = 6) {
  return useQuery(trpc.job.getFeatured.queryOptions({ limit }));
}

/**
 * Hook for fetching jobs posted by the current recruiter
 */
export function useMyPostedJobs(filters?: { page?: number; limit?: number }) {
  return useQuery(
    trpc.job.getMyPostedJobs.queryOptions({
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,
    })
  );
}

/**
 * Hook for creating a new job posting (recruiters)
 */
export function useCreateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      location: string;
      type: string;
      experienceLevel: string;
      salaryMin?: number;
      salaryMax?: number;
      isRemote?: boolean;
      requirements?: string[];
      benefits?: string[];
    }) => {
      const result = await trpc.job.create.mutate(data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });
}

/**
 * Hook for updating a job posting
 */
export function useUpdateJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { id: string; [key: string]: unknown }) => {
      const result = await trpc.job.update.mutate(data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });
}

/**
 * Hook for deleting a job posting
 */
export function useDeleteJob() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (jobId: string) => {
      const result = await trpc.job.delete.mutate({ id: jobId });
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["job"] });
    },
  });
}
