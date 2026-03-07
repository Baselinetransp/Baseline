"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  ChevronDown,
  Eye,
  Mail,
  FileText,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type ApplicationStatus =
  | "PENDING"
  | "UNDER_REVIEW"
  | "SHORTLISTED"
  | "INTERVIEW_SCHEDULED"
  | "OFFERED"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  driver: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    location: string;
    experience: string;
  };
  status: ApplicationStatus;
  appliedAt: string;
  resumeUrl: string | null;
  coverLetter: string | null;
}

// Mock data
const mockApplications: Application[] = [
  {
    id: "1",
    jobId: "1",
    jobTitle: "HGV Class 1 Driver",
    driver: {
      id: "d1",
      name: "John Smith",
      email: "john.smith@email.com",
      avatar: "JS",
      location: "London, UK",
      experience: "5 years",
    },
    status: "PENDING",
    appliedAt: "2026-03-05T10:30:00Z",
    resumeUrl: "/resumes/john-smith.pdf",
    coverLetter: "I am excited to apply for this position...",
  },
  {
    id: "2",
    jobId: "1",
    jobTitle: "HGV Class 1 Driver",
    driver: {
      id: "d2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "SJ",
      location: "Manchester, UK",
      experience: "8 years",
    },
    status: "SHORTLISTED",
    appliedAt: "2026-03-04T14:20:00Z",
    resumeUrl: "/resumes/sarah-johnson.pdf",
    coverLetter: null,
  },
  {
    id: "3",
    jobId: "2",
    jobTitle: "Van Driver - Delivery",
    driver: {
      id: "d3",
      name: "Michael Brown",
      email: "m.brown@email.com",
      avatar: "MB",
      location: "Birmingham, UK",
      experience: "3 years",
    },
    status: "UNDER_REVIEW",
    appliedAt: "2026-03-03T09:15:00Z",
    resumeUrl: "/resumes/michael-brown.pdf",
    coverLetter: "With my experience in delivery driving...",
  },
  {
    id: "4",
    jobId: "1",
    jobTitle: "HGV Class 1 Driver",
    driver: {
      id: "d4",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      avatar: "EW",
      location: "Leeds, UK",
      experience: "6 years",
    },
    status: "INTERVIEW_SCHEDULED",
    appliedAt: "2026-03-02T16:45:00Z",
    resumeUrl: "/resumes/emma-wilson.pdf",
    coverLetter: "I believe my skills align perfectly...",
  },
  {
    id: "5",
    jobId: "2",
    jobTitle: "Van Driver - Delivery",
    driver: {
      id: "d5",
      name: "David Lee",
      email: "d.lee@email.com",
      avatar: "DL",
      location: "Liverpool, UK",
      experience: "2 years",
    },
    status: "REJECTED",
    appliedAt: "2026-03-01T11:00:00Z",
    resumeUrl: null,
    coverLetter: null,
  },
];

const statusConfig: Record<ApplicationStatus, { label: string; color: string; icon: typeof Clock }> = {
  PENDING: { label: "Pending", color: "bg-gray-100 text-gray-700", icon: Clock },
  UNDER_REVIEW: { label: "Under Review", color: "bg-blue-100 text-blue-700", icon: Eye },
  SHORTLISTED: { label: "Shortlisted", color: "bg-amber-100 text-amber-700", icon: Star },
  INTERVIEW_SCHEDULED: { label: "Interview", color: "bg-purple-100 text-purple-700", icon: Calendar },
  OFFERED: { label: "Offered", color: "bg-green-100 text-green-700", icon: CheckCircle },
  ACCEPTED: { label: "Accepted", color: "bg-green-200 text-green-800", icon: CheckCircle },
  REJECTED: { label: "Rejected", color: "bg-red-100 text-red-700", icon: XCircle },
  WITHDRAWN: { label: "Withdrawn", color: "bg-gray-200 text-gray-600", icon: XCircle },
};

export default function RecruiterApplicationsPage() {
  const [applications] = useState<Application[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [jobFilter, setJobFilter] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Get unique jobs for filter
  const uniqueJobs = Array.from(new Set(applications.map((a) => a.jobTitle)));

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.driver.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    const matchesJob = jobFilter === "ALL" || app.jobTitle === jobFilter;
    return matchesSearch && matchesStatus && matchesJob;
  });

  const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
    // TODO: Implement API call
    console.log(`Change application ${applicationId} to ${newStatus}`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-heading font-bold">Applications</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage applications across all your job listings
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-2xl font-bold">{applications.length}</p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="text-2xl font-bold text-gray-600">
            {applications.filter((a) => a.status === "PENDING").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Shortlisted</p>
          <p className="text-2xl font-bold text-amber-600">
            {applications.filter((a) => a.status === "SHORTLISTED").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Interviews</p>
          <p className="text-2xl font-bold text-purple-600">
            {applications.filter((a) => a.status === "INTERVIEW_SCHEDULED").length}
          </p>
        </div>
        <div className="bg-white rounded-lg border p-4">
          <p className="text-sm text-muted-foreground">Offered</p>
          <p className="text-2xl font-bold text-green-600">
            {applications.filter((a) => a.status === "OFFERED" || a.status === "ACCEPTED").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[180px]"
          >
            <option value="ALL">All Jobs</option>
            {uniqueJobs.map((job) => (
              <option key={job} value={job}>
                {job}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm min-w-[150px]"
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="UNDER_REVIEW">Under Review</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="INTERVIEW_SCHEDULED">Interview</option>
            <option value="OFFERED">Offered</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No applications found</h3>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== "ALL" || jobFilter !== "ALL"
              ? "Try adjusting your filters"
              : "Applications will appear here when drivers apply to your jobs"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => {
            const statusInfo = statusConfig[app.status];
            const StatusIcon = statusInfo.icon;
            const isExpanded = expandedId === app.id;

            return (
              <div key={app.id} className="bg-white rounded-lg border overflow-hidden">
                {/* Main Row */}
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-black">
                          {app.driver.avatar}
                        </span>
                      </div>

                      {/* Info */}
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{app.driver.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex items-center gap-1 ${statusInfo.color}`}>
                            <StatusIcon className="h-3 w-3" />
                            {statusInfo.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{app.driver.email}</p>
                        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3.5 w-3.5" />
                            {app.driver.location}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {app.driver.experience} exp
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            Applied {formatDate(app.appliedAt)}
                          </span>
                        </div>
                        <p className="text-sm text-primary-alt mt-2">
                          Applied for: <Link href={`/dashboard/jobs/${app.jobId}`} className="hover:underline font-medium">{app.jobTitle}</Link>
                        </p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-16 md:ml-0">
                      {app.resumeUrl && (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1 rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-3"
                        >
                          <FileText className="h-4 w-4" />
                          Resume
                        </a>
                      )}
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4 mr-1" />
                        Contact
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setExpandedId(isExpanded ? null : app.id)}
                      >
                        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Expanded Section */}
                {isExpanded && (
                  <div className="border-t bg-muted/20 p-5 md:p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Cover Letter */}
                      <div>
                        <h4 className="font-medium mb-2">Cover Letter</h4>
                        {app.coverLetter ? (
                          <p className="text-sm text-muted-foreground">{app.coverLetter}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No cover letter provided</p>
                        )}
                      </div>

                      {/* Status Actions */}
                      <div>
                        <h4 className="font-medium mb-3">Update Status</h4>
                        <div className="flex flex-wrap gap-2">
                          {app.status === "PENDING" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleStatusChange(app.id, "UNDER_REVIEW")}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleStatusChange(app.id, "REJECTED")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === "UNDER_REVIEW" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-amber-600 hover:text-amber-700"
                                onClick={() => handleStatusChange(app.id, "SHORTLISTED")}
                              >
                                <Star className="h-4 w-4 mr-1" />
                                Shortlist
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleStatusChange(app.id, "REJECTED")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === "SHORTLISTED" && (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-purple-600 hover:text-purple-700"
                                onClick={() => handleStatusChange(app.id, "INTERVIEW_SCHEDULED")}
                              >
                                <Calendar className="h-4 w-4 mr-1" />
                                Schedule Interview
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleStatusChange(app.id, "REJECTED")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === "INTERVIEW_SCHEDULED" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700 text-white"
                                onClick={() => handleStatusChange(app.id, "OFFERED")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Make Offer
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleStatusChange(app.id, "REJECTED")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {(app.status === "REJECTED" || app.status === "WITHDRAWN") && (
                            <p className="text-sm text-muted-foreground">
                              This application has been {app.status.toLowerCase()}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
