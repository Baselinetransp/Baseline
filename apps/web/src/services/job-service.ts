import { trpc } from "@/utils/trpc";
import type { Job, JobFilters, JobSearchResult } from "@/types";

/**
 * Server-side job fetching utilities
 * Use these in Server Components for initial data loading
 */

/**
 * Search jobs with filters
 */
export async function searchJobs(filters?: JobFilters): Promise<JobSearchResult> {
  try {
    const result = await trpc.job.search.query({
      search: filters?.search,
      location: filters?.location,
      type: filters?.type,
      experienceLevel: filters?.experienceLevel,
      salaryMin: filters?.salaryMin,
      salaryMax: filters?.salaryMax,
      isRemote: filters?.isRemote,
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,
    });
    return result as JobSearchResult;
  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    return { jobs: [], total: 0, page: 1, totalPages: 0 };
  }
}

/**
 * Get a single job by ID
 */
export async function getJobById(id: string): Promise<Job | null> {
  try {
    const job = await trpc.job.getById.query({ id });
    return job as Job | null;
  } catch (error) {
    console.error("Failed to fetch job:", error);
    return null;
  }
}

/**
 * Get featured jobs for homepage
 */
export async function getFeaturedJobs(limit: number = 6): Promise<Job[]> {
  try {
    const jobs = await trpc.job.getFeatured.query({ limit });
    return jobs as Job[];
  } catch (error) {
    console.error("Failed to fetch featured jobs:", error);
    return [];
  }
}

/**
 * Get jobs posted by a recruiter
 */
export async function getRecruiterJobs(recruiterId: string): Promise<Job[]> {
  try {
    const jobs = await trpc.job.getByRecruiter.query({ recruiterId });
    return jobs as Job[];
  } catch (error) {
    console.error("Failed to fetch recruiter jobs:", error);
    return [];
  }
}

/**
 * Get job categories/types with counts
 */
export async function getJobCategories(): Promise<
  { type: string; count: number }[]
> {
  try {
    const categories = await trpc.job.getCategories.query();
    return categories as { type: string; count: number }[];
  } catch (error) {
    console.error("Failed to fetch job categories:", error);
    return [];
  }
}
