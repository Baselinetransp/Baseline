import type { Job } from "./job";

export type ApplicationStatus =
  | "PENDING"
  | "IN_REVIEW"
  | "INTERVIEWING"
  | "OFFERED"
  | "DECLINED"
  | "WITHDRAWN";

export interface Application {
  id: string;
  jobId: string;
  userId: string;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
  coverLetter?: string;
  resumeUrl?: string;
  notes?: string;
  job?: Job;
}

export interface ApplicationWithJob extends Application {
  job: Job;
}

export interface Interview {
  id: string;
  applicationId: string;
  scheduledAt: Date;
  duration: number; // in minutes
  type: "PHONE" | "VIDEO" | "IN_PERSON";
  location?: string;
  meetingLink?: string;
  interviewerName?: string;
  interviewerRole?: string;
  notes?: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED" | "RESCHEDULED";
}

export interface DashboardStats {
  totalJobsApplied: number;
  inReview: number;
  interviewing: number;
  offered: number;
  declined: number;
}

export const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string }
> = {
  PENDING: {
    label: "Pending",
    color: "bg-gray-50 text-gray-700 border-gray-200",
  },
  IN_REVIEW: {
    label: "In Review",
    color: "bg-amber-50 text-amber-700 border-amber-200",
  },
  INTERVIEWING: {
    label: "Interviewing",
    color: "bg-purple-50 text-purple-700 border-purple-200",
  },
  OFFERED: {
    label: "Offered",
    color: "bg-green-50 text-green-700 border-green-200",
  },
  DECLINED: {
    label: "Declined",
    color: "bg-red-50 text-red-700 border-red-200",
  },
  WITHDRAWN: {
    label: "Withdrawn",
    color: "bg-slate-50 text-slate-700 border-slate-200",
  },
};
