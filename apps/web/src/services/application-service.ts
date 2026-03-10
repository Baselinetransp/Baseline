import { trpc } from "@/utils/trpc";
import type {
  Application,
  ApplicationStatus,
  DashboardStats,
  Interview,
} from "@/types";

/**
 * Server-side application fetching utilities
 * Use these in Server Components for initial data loading
 */

/**
 * Get user's applications with optional status filter
 */
export async function getMyApplications(filters?: {
  status?: ApplicationStatus;
  page?: number;
  limit?: number;
}): Promise<{ applications: Application[]; total: number }> {
  try {
    const result = await trpc.application.getMyApplications.query({
      status: filters?.status,
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,
    });
    return result as { applications: Application[]; total: number };
  } catch (error) {
    console.error("Failed to fetch applications:", error);
    return { applications: [], total: 0 };
  }
}

/**
 * Get a single application by ID
 */
export async function getApplicationById(
  id: string
): Promise<Application | null> {
  try {
    const application = await trpc.application.getById.query({ id });
    return application as Application | null;
  } catch (error) {
    console.error("Failed to fetch application:", error);
    return null;
  }
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  try {
    const stats = await trpc.application.getStats.query();
    return stats as DashboardStats;
  } catch (error) {
    console.error("Failed to fetch dashboard stats:", error);
    return {
      totalJobsApplied: 0,
      inReview: 0,
      interviewing: 0,
      offered: 0,
      declined: 0,
    };
  }
}

/**
 * Get recent applications for dashboard
 */
export async function getRecentApplications(
  limit: number = 5
): Promise<Application[]> {
  try {
    const result = await trpc.application.getMyApplications.query({
      page: 1,
      limit,
    });
    return (result as { applications: Application[] }).applications;
  } catch (error) {
    console.error("Failed to fetch recent applications:", error);
    return [];
  }
}

/**
 * Get upcoming interviews
 */
export async function getUpcomingInterviews(): Promise<Interview[]> {
  try {
    const interviews = await trpc.application.getUpcomingInterviews.query();
    return interviews as Interview[];
  } catch (error) {
    console.error("Failed to fetch upcoming interviews:", error);
    return [];
  }
}

/**
 * Get applications for a job (recruiter view)
 */
export async function getJobApplications(
  jobId: string,
  filters?: { status?: ApplicationStatus; page?: number; limit?: number }
): Promise<{ applications: Application[]; total: number }> {
  try {
    const result = await trpc.application.getByJob.query({
      jobId,
      status: filters?.status,
      page: filters?.page ?? 1,
      limit: filters?.limit ?? 10,
    });
    return result as { applications: Application[]; total: number };
  } catch (error) {
    console.error("Failed to fetch job applications:", error);
    return { applications: [], total: 0 };
  }
}

/**
 * Get application counts by status
 */
export async function getApplicationCounts(): Promise<
  Record<ApplicationStatus, number>
> {
  try {
    const counts = await trpc.application.getCounts.query();
    return counts as Record<ApplicationStatus, number>;
  } catch (error) {
    console.error("Failed to fetch application counts:", error);
    return {
      PENDING: 0,
      IN_REVIEW: 0,
      INTERVIEWING: 0,
      OFFERED: 0,
      DECLINED: 0,
      WITHDRAWN: 0,
    };
  }
}
