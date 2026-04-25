"use client";

import { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Pause,
  Play,
  Users,
  MapPin,
  Calendar,
  Briefcase,
  Loader2,
} from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trpc, queryClient } from "@/utils/trpc";

type JobStatus = "DRAFT" | "PUBLISHED" | "PAUSED" | "CLOSED" | "FILLED";

const statusColors: Record<JobStatus, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PUBLISHED: "bg-green-100 text-green-700",
  PAUSED: "bg-amber-100 text-amber-700",
  CLOSED: "bg-red-100 text-red-700",
  FILLED: "bg-blue-100 text-blue-700",
};

const jobTypeLabels: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  CONTRACT: "Contract",
  TEMPORARY: "Temporary",
  SEASONAL: "Seasonal",
};

export default function MyJobsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Fetch recruiter's jobs
  const { data: jobsData, isLoading, error } = useQuery(
    trpc.job.myJobs.queryOptions(
      statusFilter !== "ALL" ? { status: statusFilter as JobStatus } : undefined
    )
  );

  const jobs = jobsData ?? [];

  // Update job mutation
  const updateJobMutation = useMutation(
    trpc.job.update.mutationOptions({
      onSuccess: () => {
        toast.success("Job updated successfully");
        queryClient.invalidateQueries({ queryKey: [["job", "myJobs"]] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update job");
      },
    })
  );

  // Delete job mutation
  const deleteJobMutation = useMutation(
    trpc.job.delete.mutationOptions({
      onSuccess: () => {
        toast.success("Job deleted successfully");
        queryClient.invalidateQueries({ queryKey: [["job", "myJobs"]] });
      },
      onError: (error) => {
        toast.error(error.message || "Failed to delete job");
      },
    })
  );

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleStatusChange = (jobId: string, newStatus: JobStatus) => {
    updateJobMutation.mutate({ id: jobId, data: { status: newStatus } });
    setOpenDropdown(null);
  };

  const handleDelete = (jobId: string) => {
    if (confirm("Are you sure you want to delete this job? This action cannot be undone.")) {
      deleteJobMutation.mutate({ id: jobId });
    }
    setOpenDropdown(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary-alt" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        Failed to load jobs. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">My Jobs</h1>
          <p className="text-muted-foreground mt-1">Manage your job listings</p>
        </div>
        <Link href="/dashboard/jobs/new">
          <Button className="bg-primary-alt text-black hover:bg-primary-alt/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Jobs</p>
          <p className="text-2xl font-bold">{jobs.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {jobs.filter((j) => j.status === "PUBLISHED").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Applications</p>
          <p className="text-2xl font-bold">
            {jobs.reduce((sum, j) => sum + (j._count?.applications ?? 0), 0)}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total Views</p>
          <p className="text-2xl font-bold">
            {jobs.reduce((sum, j) => sum + (j.viewCount ?? 0), 0)}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[150px]"
          >
            <option value="ALL">All Status</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="PAUSED">Paused</option>
            <option value="CLOSED">Closed</option>
            <option value="FILLED">Filled</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      {filteredJobs.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your filters"
              : "Get started by posting your first job"}
          </p>
          {!searchQuery && statusFilter === "ALL" && (
            <Link href="/dashboard/jobs/new">
              <Button className="bg-primary-alt text-black hover:bg-primary-alt/90">
                <PlusCircle className="h-4 w-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <div key={job.id} className="bg-white rounded-lg border p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between md:justify-start gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{job.title}</h3>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.city}, {job.country}
                    </span>
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      {jobTypeLabels[job.jobType]}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Posted {new Date(job.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>

                  <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>{job.viewCount ?? 0}</strong> views
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>{job._count?.applications ?? 0}</strong> applications
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link href={`/dashboard/jobs/${job.id}/applications`}>
                    <Button variant="outline" size="sm">
                      <Users className="h-4 w-4 mr-1" />
                      Applications
                    </Button>
                  </Link>
                  <Link href={`/dashboard/jobs/${job.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>

                  {/* More Actions Dropdown */}
                  <div className="relative">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setOpenDropdown(openDropdown === job.id ? null : job.id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>

                    {openDropdown === job.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg border shadow-lg z-10">
                        <div className="py-1">
                          <Link
                            href={`/jobs/${job.id}`}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50"
                          >
                            <Eye className="h-4 w-4" />
                            View Public Page
                          </Link>
                          {job.status === "PUBLISHED" ? (
                            <button
                              onClick={() => handleStatusChange(job.id, "PAUSED")}
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50 w-full text-left"
                            >
                              <Pause className="h-4 w-4" />
                              Pause Listing
                            </button>
                          ) : job.status === "PAUSED" ? (
                            <button
                              onClick={() => handleStatusChange(job.id, "PUBLISHED")}
                              className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50 w-full text-left"
                            >
                              <Play className="h-4 w-4" />
                              Resume Listing
                            </button>
                          ) : null}
                          <button
                            onClick={() => handleStatusChange(job.id, "FILLED")}
                            className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted/50 w-full text-left"
                          >
                            <Users className="h-4 w-4" />
                            Mark as Filled
                          </button>
                          <hr className="my-1" />
                          <button
                            onClick={() => handleDelete(job.id)}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Job
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
