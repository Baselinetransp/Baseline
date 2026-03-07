"use client";

import { useState, useEffect } from "react";
import { Calendar, ChevronRight, Eye, Users, Briefcase, TrendingUp, PlusCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

interface Job {
  id: string;
  title: string;
  city: string;
  country: string;
  status: string;
  applicationsCount: number;
  viewCount: number;
  createdAt: string;
}

interface Application {
  id: string;
  jobTitle: string;
  driverName: string;
  driverAvatar: string;
  status: string;
  appliedAt: string;
}

// Mock data
const stats = {
  activeJobs: 5,
  totalApplications: 89,
  totalViews: 2456,
  hiredThisMonth: 3,
};

const recentJobs: Job[] = [
  {
    id: "1",
    title: "HGV Class 1 Driver",
    city: "London",
    country: "UK",
    status: "PUBLISHED",
    applicationsCount: 24,
    viewCount: 156,
    createdAt: "2026-02-15",
  },
  {
    id: "2",
    title: "Van Driver - Delivery",
    city: "Manchester",
    country: "UK",
    status: "PUBLISHED",
    applicationsCount: 12,
    viewCount: 89,
    createdAt: "2026-02-20",
  },
];

const recentApplications: Application[] = [
  {
    id: "1",
    jobTitle: "HGV Class 1 Driver",
    driverName: "John Smith",
    driverAvatar: "JS",
    status: "PENDING",
    appliedAt: "2026-03-05",
  },
  {
    id: "2",
    jobTitle: "HGV Class 1 Driver",
    driverName: "Sarah Johnson",
    driverAvatar: "SJ",
    status: "SHORTLISTED",
    appliedAt: "2026-03-04",
  },
  {
    id: "3",
    jobTitle: "Van Driver - Delivery",
    driverName: "Michael Brown",
    driverAvatar: "MB",
    status: "UNDER_REVIEW",
    appliedAt: "2026-03-03",
  },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-gray-100 text-gray-700",
  UNDER_REVIEW: "bg-blue-100 text-blue-700",
  SHORTLISTED: "bg-amber-100 text-amber-700",
  INTERVIEW_SCHEDULED: "bg-purple-100 text-purple-700",
  OFFERED: "bg-green-100 text-green-700",
};

// Format date consistently to avoid hydration mismatch
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export default function RecruiterDashboard({ session }: { session: typeof authClient.$Infer.Session }) {
  const [greeting, setGreeting] = useState("Welcome");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1 md:mb-2">
            {greeting}, {session?.user?.name?.split(" ")[0] || "Recruiter"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Here's an overview of your recruitment activity
          </p>
        </div>
        <Link href="/dashboard/jobs/new">
          <Button className="bg-primary-alt text-black hover:bg-primary-alt/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        <div className="bg-white rounded-lg border p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Jobs</p>
              <p className="text-3xl md:text-4xl font-bold">{stats.activeJobs}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Applications</p>
              <p className="text-3xl md:text-4xl font-bold">{stats.totalApplications}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Views</p>
              <p className="text-3xl md:text-4xl font-bold">{stats.totalViews.toLocaleString()}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-50 rounded-lg flex items-center justify-center">
              <Eye className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Hired This Month</p>
              <p className="text-3xl md:text-4xl font-bold">{stats.hiredThisMonth}</p>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-alt/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-primary-alt" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Jobs */}
        <div className="bg-white rounded-lg border">
          <div className="p-5 md:p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Active Jobs</h2>
            <Link href="/dashboard/jobs">
              <Button variant="link" className="text-primary-alt hover:text-primary-alt/80 p-0">
                View all →
              </Button>
            </Link>
          </div>
          <div className="divide-y">
            {recentJobs.map((job) => (
              <div key={job.id} className="p-4 md:p-5 hover:bg-muted/20 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{job.title}</h3>
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {job.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {job.city}, {job.country}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(job.createdAt)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1 text-sm">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    <strong>{job.viewCount}</strong> views
                  </span>
                  <span className="flex items-center gap-1 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <strong>{job.applicationsCount}</strong> applications
                  </span>
                </div>
              </div>
            ))}
          </div>
          {recentJobs.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground mb-4">No active jobs yet</p>
              <Link href="/dashboard/jobs/new">
                <Button className="bg-primary-alt text-black hover:bg-primary-alt/90">
                  Post Your First Job
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Recent Applications */}
        <div className="bg-white rounded-lg border">
          <div className="p-5 md:p-6 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Recent Applications</h2>
            <Link href="/dashboard/recruiter/applications">
              <Button variant="link" className="text-primary-alt hover:text-primary-alt/80 p-0">
                View all →
              </Button>
            </Link>
          </div>
          <div className="divide-y">
            {recentApplications.map((app) => (
              <div key={app.id} className="p-4 md:p-5 hover:bg-muted/20 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-black">{app.driverAvatar}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="font-semibold truncate">{app.driverName}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0 ${statusColors[app.status]}`}>
                        {app.status.replace("_", " ")}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">Applied for: {app.jobTitle}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" />
                      {formatDate(app.appliedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {recentApplications.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-muted-foreground">No applications yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border p-5 md:p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/dashboard/jobs/new" className="p-4 border rounded-lg hover:bg-muted/30 transition-colors text-center">
            <PlusCircle className="h-6 w-6 mx-auto mb-2 text-primary-alt" />
            <p className="text-sm font-medium">Post New Job</p>
          </Link>
          <Link href="/dashboard/recruiter/applications" className="p-4 border rounded-lg hover:bg-muted/30 transition-colors text-center">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium">Review Applications</p>
          </Link>
          <Link href="/dashboard/analytics" className="p-4 border rounded-lg hover:bg-muted/30 transition-colors text-center">
            <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-medium">View Analytics</p>
          </Link>
          <Link href="/dashboard/company" className="p-4 border rounded-lg hover:bg-muted/30 transition-colors text-center">
            <Briefcase className="h-6 w-6 mx-auto mb-2 text-purple-600" />
            <p className="text-sm font-medium">Company Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
