"use client";

import { Calendar, FileText, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { APPLICATION_STATUS_CONFIG } from "@/types";
import type { Session, DashboardStats, ApplicationWithJob, Interview } from "@/types";
import { authClient } from "@/lib/auth-client";

// Mock data - will be replaced when API is implemented
const MOCK_STATS: DashboardStats = {
  totalJobsApplied: 45,
  inReview: 34,
  interviewing: 18,
  offered: 5,
  declined: 3,
};

const MOCK_APPLICATIONS: ApplicationWithJob[] = [
  {
    id: "1",
    jobId: "1",
    userId: "1",
    status: "IN_REVIEW",
    appliedAt: new Date("2021-07-24"),
    updatedAt: new Date("2021-07-24"),
    job: {
      id: "1",
      title: "Social Media Assistant",
      description: "",
      company: "Nomad",
      companyLogo: "N",
      location: "Paris, France",
      type: "FULL_TIME",
      experienceLevel: "ENTRY",
      isRemote: false,
      postedAt: new Date(),
      recruiterId: "1",
    },
  },
  {
    id: "2",
    jobId: "2",
    userId: "1",
    status: "IN_REVIEW",
    appliedAt: new Date("2021-07-23"),
    updatedAt: new Date("2021-07-23"),
    job: {
      id: "2",
      title: "Social Media Assistant",
      description: "",
      company: "Udacity",
      companyLogo: "U",
      location: "New York, USA",
      type: "FULL_TIME",
      experienceLevel: "ENTRY",
      isRemote: false,
      postedAt: new Date(),
      recruiterId: "1",
    },
  },
  {
    id: "3",
    jobId: "3",
    userId: "1",
    status: "IN_REVIEW",
    appliedAt: new Date("2021-07-24"),
    updatedAt: new Date("2021-07-24"),
    job: {
      id: "3",
      title: "Social Media Assistant",
      description: "",
      company: "Packer",
      companyLogo: "P",
      location: "Paris, France",
      type: "FULL_TIME",
      experienceLevel: "ENTRY",
      isRemote: false,
      postedAt: new Date(),
      recruiterId: "1",
    },
  },
];

const MOCK_INTERVIEWS: Interview[] = [
  {
    id: "1",
    applicationId: "1",
    scheduledAt: new Date(),
    duration: 30,
    type: "VIDEO",
    interviewerName: "Joe Bartmann",
    interviewerRole: "HR Manager at Divvy",
    status: "SCHEDULED",
  },
  {
    id: "2",
    applicationId: "2",
    scheduledAt: new Date(),
    duration: 45,
    type: "VIDEO",
    interviewerName: "Zack Carlos",
    interviewerRole: "Hiring Manager",
    status: "SCHEDULED",
  },
];

interface DashboardProps {
  session: typeof authClient.$Infer.Session;
}

export default function Dashboard({ session }: DashboardProps) {
  // TODO: Uncomment when API routes are implemented
  // import { useDashboardStats, useApplications, useUpcomingInterviews } from "@/hooks";
  // const { data: statsData, isLoading: statsLoading } = useDashboardStats();
  // const { data: applicationsData, isLoading: applicationsLoading } = useApplications({ limit: 3 });
  // const { data: interviewsData, isLoading: interviewsLoading } = useUpcomingInterviews();

  // Using mock data until API is ready
  const stats = MOCK_STATS;
  const recentApplications = MOCK_APPLICATIONS;
  const upcomingInterviews = MOCK_INTERVIEWS;

  // Calculate percentages for the donut chart
  const total = stats.totalJobsApplied || 1;
  const interviewedPercent = Math.round((stats.interviewing / total) * 100);
  const otherPercent = 100 - interviewedPercent;

  // Helper to get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      "from-orange-300 to-orange-400",
      "from-amber-300 to-amber-400",
      "from-blue-300 to-blue-400",
      "from-green-300 to-green-400",
    ];
    return colors[index % colors.length];
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status: string) => {
    const config = APPLICATION_STATUS_CONFIG[status as keyof typeof APPLICATION_STATUS_CONFIG];
    return config?.color || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getStatusLabel = (status: string) => {
    const config = APPLICATION_STATUS_CONFIG[status as keyof typeof APPLICATION_STATUS_CONFIG];
    return config?.label || status;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1 md:mb-2">
            Good morning, {session?.user?.name?.split(" ")[0] || "there"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Here is what's happening with your job search applications.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white w-full md:w-auto">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm flex-1">
            {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })} -{" "}
            {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground md:hidden" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Total Jobs Applied */}
        <div className="bg-white rounded-lg border p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Jobs Applied</p>
              <p className="text-4xl md:text-5xl font-bold">{stats.totalJobsApplied}</p>
            </div>
            <div className="w-12 h-12 bg-primary-alt/10 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-alt" />
            </div>
          </div>
        </div>

        {/* In Review */}
        <div className="bg-white rounded-lg border p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">In Review</p>
              <p className="text-4xl md:text-5xl font-bold">{stats.inReview}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Jobs Applied Status - Donut Chart */}
        <div className="bg-white rounded-lg border p-5 md:p-6">
          <p className="text-sm text-muted-foreground mb-4">Jobs Applied Status</p>
          <div className="flex items-center gap-6">
            {/* Donut Chart */}
            <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="16"
                  strokeDasharray={`${(otherPercent / 100) * 251.2} 251.2`}
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#FDC212"
                  strokeWidth="16"
                  strokeDasharray={`${(interviewedPercent / 100) * 251.2} 251.2`}
                  strokeDashoffset={`-${(otherPercent / 100) * 251.2}`}
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                <span className="font-semibold">{otherPercent}%</span>
                <span className="text-muted-foreground">Other</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-alt"></div>
                <span className="font-semibold">{interviewedPercent}%</span>
                <span className="text-muted-foreground">Interviewed</span>
              </div>
            </div>
          </div>
          <Link
            href="/dashboard/applications"
            className="text-sm text-primary-alt hover:underline mt-4 inline-flex items-center gap-1"
          >
            View All Applications <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="bg-white rounded-lg border p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline">
              Today, {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long" })}
            </span>
            <div className="flex gap-1">
              <button className="p-1.5 hover:bg-muted rounded">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button className="p-1.5 hover:bg-muted rounded">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 md:hidden">
          <span className="font-semibold text-foreground">Today,</span>{" "}
          {new Date().toLocaleDateString("en-US", { day: "numeric", month: "long" })}
        </p>

        {/* Mobile: Horizontal scroll cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4">
          {upcomingInterviews.length > 0 ? (
            upcomingInterviews.map((interview, index) => (
              <div
                key={interview.id}
                className="flex-shrink-0 w-40 md:w-auto bg-muted/30 rounded-lg p-4"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarColor(index)} flex items-center justify-center mb-3 mx-auto`}
                >
                  <span className="text-sm font-semibold text-white">
                    {getInitials(interview.interviewerName || "NA")}
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-sm mb-0.5">{interview.interviewerName}</p>
                  <p className="text-xs text-muted-foreground mb-2">{interview.interviewerRole}</p>
                  <p className="text-xs text-muted-foreground">{formatTime(interview.scheduledAt)}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming interviews</p>
          )}
        </div>
      </div>

      {/* Recent Applications History */}
      <div className="bg-white rounded-lg border">
        <div className="p-5 md:p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Applications History</h2>
          <Link href="/dashboard/applications" className="hidden md:inline-flex">
            <Button variant="link" className="text-primary-alt hover:text-primary-alt/80 p-0">
              View all applications history →
            </Button>
          </Link>
        </div>

        {/* Mobile: Card Layout */}
        <div className="md:hidden divide-y">
          {recentApplications.map((app) => (
            <div key={app.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {app.job?.companyLogo || app.job?.company?.[0] || "?"}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{app.job?.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.job?.company} • {app.job?.location}
                    </p>
                  </div>
                </div>
                <button className="p-1">
                  <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Date Applied</p>
                  <p className="text-sm">{formatDate(app.appliedAt)}</p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(app.status)}`}
                >
                  {getStatusLabel(app.status)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Company Name</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Roles</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Date Applied</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentApplications.map((app) => (
                <tr key={app.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {app.job?.companyLogo || app.job?.company?.[0] || "?"}
                        </span>
                      </div>
                      <span className="font-medium">{app.job?.company}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{app.job?.title}</td>
                  <td className="p-4 text-muted-foreground">{formatDate(app.appliedAt)}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(app.status)}`}
                    >
                      {getStatusLabel(app.status)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: View All Link */}
        <div className="md:hidden p-4 border-t">
          <Link
            href="/dashboard/applications"
            className="text-sm text-primary-alt hover:underline flex items-center justify-center gap-1"
          >
            View all applications history <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
