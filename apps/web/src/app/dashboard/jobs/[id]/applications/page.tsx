"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Eye,
  Mail,
  FileText,
  Calendar,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  ChevronDown,
  Users,
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
  driver: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    location: string;
    experience: string;
    licenses: string[];
  };
  status: ApplicationStatus;
  appliedAt: string;
  resumeUrl: string | null;
  coverLetter: string | null;
}

// Mock job data
const mockJob = {
  id: "1",
  title: "HGV Class 1 Driver",
  city: "London",
  country: "UK",
  status: "PUBLISHED",
};

// Mock applications for this job
const mockApplications: Application[] = [
  {
    id: "1",
    driver: {
      id: "d1",
      name: "John Smith",
      email: "john.smith@email.com",
      avatar: "JS",
      location: "London, UK",
      experience: "5 years",
      licenses: ["CE", "C"],
    },
    status: "PENDING",
    appliedAt: "2026-03-05T10:30:00Z",
    resumeUrl: "/resumes/john-smith.pdf",
    coverLetter: "I am excited to apply for this position. With over 5 years of experience driving HGV vehicles across the UK, I believe I would be an excellent fit for your team.",
  },
  {
    id: "2",
    driver: {
      id: "d2",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "SJ",
      location: "Manchester, UK",
      experience: "8 years",
      licenses: ["CE", "C", "C1"],
    },
    status: "SHORTLISTED",
    appliedAt: "2026-03-04T14:20:00Z",
    resumeUrl: "/resumes/sarah-johnson.pdf",
    coverLetter: null,
  },
  {
    id: "3",
    driver: {
      id: "d4",
      name: "Emma Wilson",
      email: "emma.w@email.com",
      avatar: "EW",
      location: "Leeds, UK",
      experience: "6 years",
      licenses: ["CE"],
    },
    status: "INTERVIEW_SCHEDULED",
    appliedAt: "2026-03-02T16:45:00Z",
    resumeUrl: "/resumes/emma-wilson.pdf",
    coverLetter: "I believe my skills align perfectly with the requirements for this position.",
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

export default function JobApplicationsPage() {
  const params = useParams();
  const jobId = params.id as string;

  const [applications] = useState<Application[]>(mockApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.driver.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (applicationId: string, newStatus: ApplicationStatus) => {
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
        <Link
          href="/dashboard/jobs"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to My Jobs
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">
              Applications for {mockJob.title}
            </h1>
            <p className="text-muted-foreground mt-1">
              {mockJob.city}, {mockJob.country}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-semibold">{applications.length} applicants</span>
          </div>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3 mb-8">
        {[
          { status: "PENDING", label: "Pending" },
          { status: "UNDER_REVIEW", label: "Reviewing" },
          { status: "SHORTLISTED", label: "Shortlisted" },
          { status: "INTERVIEW_SCHEDULED", label: "Interview" },
          { status: "OFFERED", label: "Offered" },
          { status: "ACCEPTED", label: "Hired" },
        ].map((stage) => {
          const count = applications.filter((a) => a.status === stage.status).length;
          const config = statusConfig[stage.status as ApplicationStatus];
          return (
            <button
              key={stage.status}
              onClick={() => setStatusFilter(statusFilter === stage.status ? "ALL" : stage.status)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                statusFilter === stage.status
                  ? "border-primary-alt bg-primary-alt/10"
                  : "bg-white hover:bg-muted/50"
              }`}
            >
              <p className="text-2xl font-bold">{count}</p>
              <p className="text-xs text-muted-foreground">{stage.label}</p>
            </button>
          );
        })}
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Applications List */}
      {filteredApplications.length === 0 ? (
        <div className="bg-white rounded-lg border p-12 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No applications found</h3>
          <p className="text-muted-foreground">
            {searchQuery || statusFilter !== "ALL"
              ? "Try adjusting your filters"
              : "Applications will appear here when drivers apply"}
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
                <div className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-black">{app.driver.avatar}</span>
                      </div>

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
                            {formatDate(app.appliedAt)}
                          </span>
                        </div>
                        <div className="flex gap-1 mt-2">
                          {app.driver.licenses.map((license) => (
                            <span
                              key={license}
                              className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs font-medium"
                            >
                              {license}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

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

                {isExpanded && (
                  <div className="border-t bg-muted/20 p-5 md:p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Cover Letter</h4>
                        {app.coverLetter ? (
                          <p className="text-sm text-muted-foreground">{app.coverLetter}</p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">No cover letter provided</p>
                        )}
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Update Status</h4>
                        <div className="flex flex-wrap gap-2">
                          {app.status === "PENDING" && (
                            <>
                              <Button size="sm" variant="outline" onClick={() => handleStatusChange(app.id, "UNDER_REVIEW")}>
                                <Eye className="h-4 w-4 mr-1" />
                                Review
                              </Button>
                              <Button size="sm" variant="outline" className="text-amber-600" onClick={() => handleStatusChange(app.id, "SHORTLISTED")}>
                                <Star className="h-4 w-4 mr-1" />
                                Shortlist
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleStatusChange(app.id, "REJECTED")}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === "UNDER_REVIEW" && (
                            <>
                              <Button size="sm" variant="outline" className="text-amber-600" onClick={() => handleStatusChange(app.id, "SHORTLISTED")}>
                                <Star className="h-4 w-4 mr-1" />
                                Shortlist
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleStatusChange(app.id, "REJECTED")}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === "SHORTLISTED" && (
                            <>
                              <Button size="sm" variant="outline" className="text-purple-600" onClick={() => handleStatusChange(app.id, "INTERVIEW_SCHEDULED")}>
                                <Calendar className="h-4 w-4 mr-1" />
                                Schedule Interview
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleStatusChange(app.id, "REJECTED")}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                          {app.status === "INTERVIEW_SCHEDULED" && (
                            <>
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusChange(app.id, "OFFERED")}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Make Offer
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleStatusChange(app.id, "REJECTED")}>
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
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
