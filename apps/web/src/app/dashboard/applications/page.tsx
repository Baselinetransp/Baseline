"use client";

import { useState } from "react";
import { Calendar, Search, SlidersHorizontal, X, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks";
// TODO: Uncomment when API routes are implemented
// import { useApplications } from "@/hooks";
import { APPLICATION_STATUS_CONFIG } from "@/types";
import type { ApplicationStatus, ApplicationWithJob } from "@/types";

// Mock data - will be replaced when API is implemented
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
  {
    id: "4",
    jobId: "4",
    userId: "1",
    status: "INTERVIEWING",
    appliedAt: new Date("2021-07-24"),
    updatedAt: new Date("2021-07-24"),
    job: {
      id: "4",
      title: "Social Media Assistant",
      description: "",
      company: "Divvy",
      companyLogo: "D",
      location: "San Francisco, USA",
      type: "FULL_TIME",
      experienceLevel: "MID",
      isRemote: false,
      postedAt: new Date(),
      recruiterId: "1",
    },
  },
  {
    id: "5",
    jobId: "5",
    userId: "1",
    status: "IN_REVIEW",
    appliedAt: new Date("2021-07-24"),
    updatedAt: new Date("2021-07-24"),
    job: {
      id: "5",
      title: "Social Media Assistant",
      description: "",
      company: "Digital Ocean",
      companyLogo: "D",
      location: "Remote",
      type: "FULL_TIME",
      experienceLevel: "ENTRY",
      isRemote: true,
      postedAt: new Date(),
      recruiterId: "1",
    },
  },
];

// Status tabs with their filter values
const STATUS_TABS: { label: string; value: ApplicationStatus | "ALL" }[] = [
  { label: "All", value: "ALL" },
  { label: "In Review", value: "IN_REVIEW" },
  { label: "Interviewing", value: "INTERVIEWING" },
];

export default function ApplicationsPage() {
  const { user } = useSession();
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "ALL">("ALL");
  const [showNewFeature, setShowNewFeature] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // TODO: Uncomment when API is implemented
  // const { data, isLoading } = useApplications({
  //   status: activeTab === "ALL" ? undefined : activeTab,
  //   page: currentPage,
  //   limit: 10,
  // });

  // Using mock data until API is ready
  const applications = MOCK_APPLICATIONS;

  // Filter applications based on active tab
  const filteredApplications = applications.filter((app) => {
    if (activeTab !== "ALL" && app.status !== activeTab) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        app.job?.company?.toLowerCase().includes(query) ||
        app.job?.title?.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // Count applications by status
  const statusCounts = applications.reduce(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      acc.ALL = (acc.ALL || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const getStatusStyle = (status: ApplicationStatus) => {
    const config = APPLICATION_STATUS_CONFIG[status];
    return config?.color || "bg-gray-50 text-gray-700 border-gray-200";
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    const config = APPLICATION_STATUS_CONFIG[status];
    return config?.label || status;
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const userName = user?.name?.split(" ")[0] || "there";

  return (
    <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1">
            Keep it up, {userName}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Here is your job applications status.
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

      {/* New Feature Banner */}
      {showNewFeature && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-5 h-5 md:w-6 md:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-primary-alt mb-1 text-sm md:text-base">New Feature</h3>
            <p className="text-xs md:text-sm text-muted-foreground">
              You can request a follow-up 7 days after applying for a job if the application status
              is in review. Only one follow-up is allowed per job.
            </p>
          </div>
          <button
            onClick={() => setShowNewFeature(false)}
            className="p-1 hover:bg-blue-100 rounded transition-colors flex-shrink-0"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Status Tabs */}
      <div className="flex border-b overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 md:px-6 py-3 md:py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.value
                ? "border-primary-alt text-primary-alt"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label} ({statusCounts[tab.value] || 0})
          </button>
        ))}
      </div>

      {/* Applications Section */}
      <div className="bg-white rounded-lg border overflow-hidden">
        {/* Search Header */}
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base md:text-lg font-semibold">Applications History</h2>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company or role..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile: Card Layout */}
        <div className="md:hidden divide-y">
          {filteredApplications.map((app) => (
            <div key={app.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">
                      {app.job?.companyLogo || app.job?.company?.[0] || "?"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm">{app.job?.company}</p>
                    <p className="text-sm text-muted-foreground">{app.job?.title}</p>
                  </div>
                </div>
                <button className="p-1 flex-shrink-0">
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
          {filteredApplications.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No applications found
            </div>
          )}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">#</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                  Company Name
                </th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Roles</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">
                  Date Applied
                </th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-sm text-muted-foreground"></th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((app, index) => (
                <tr key={app.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-4 text-muted-foreground">{index + 1}</td>
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
                  <td className="p-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredApplications.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-1 p-4 md:p-6 border-t">
          <button
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded flex items-center justify-center ${
                page === currentPage ? "bg-primary-alt text-black font-medium" : "hover:bg-muted"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="text-muted-foreground px-1">...</span>
          <button
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted"
            onClick={() => setCurrentPage(33)}
          >
            33
          </button>
          <button
            className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted"
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
