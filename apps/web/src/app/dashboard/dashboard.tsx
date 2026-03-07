"use client";

import { Calendar, FileText, ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Dashboard({ session }: { session: typeof authClient.$Infer.Session }) {
  const stats = {
    totalJobsApplied: 45,
    jobsAppliedStatus: {
      unsuitable: 60,
      interviewed: 40,
    },
  };

  const recentApplications = [
    {
      id: 1,
      company: "Nomad",
      logo: "N",
      position: "Social Media Assistant",
      location: "Paris, France",
      type: "Full-Time",
      dateApplied: "24 July 2021",
      status: "In Review",
    },
    {
      id: 2,
      company: "Udacity",
      logo: "U",
      position: "Social Media Assistant",
      location: "New York, USA",
      dateApplied: "23 July 2021",
      status: "In Review",
    },
    {
      id: 3,
      company: "Packer",
      logo: "P",
      position: "Social Media Assistant",
      location: "Paris, France",
      type: "Full-Time",
      dateApplied: "24 July 2021",
      status: "In Review",
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      name: "Joe Bartmann",
      role: "HR Manager at Divvy",
      time: "9:30 AM",
      avatar: "JB",
      bgColor: "from-orange-300 to-orange-400",
    },
    {
      id: 2,
      name: "Zack Carlos",
      role: "Fresh Graduated",
      time: "1:30 PM",
      avatar: "ZC",
      bgColor: "from-amber-300 to-amber-400",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold mb-1 md:mb-2">
            Good morning, {session?.user?.name?.split(" ")[0] || "Jake"}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Here is what's happening with your job search applications from July 19 - July 25.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white w-full md:w-auto">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm flex-1">Jul 19 - Jul 25</span>
          <ChevronRight className="h-4 w-4 text-muted-foreground md:hidden" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Total Jobs Applied - Card 1 */}
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

        {/* Total Jobs Applied - Card 2 */}
        <div className="bg-white rounded-lg border p-5 md:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Jobs Applied</p>
              <p className="text-4xl md:text-5xl font-bold">{stats.totalJobsApplied}</p>
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
                {/* Unsuitable - 60% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth="16"
                  strokeDasharray="150.8 251.2"
                />
                {/* Interviewed - 40% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#FDC212"
                  strokeWidth="16"
                  strokeDasharray="100.5 251.2"
                  strokeDashoffset="-150.8"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                <span className="font-semibold">{stats.jobsAppliedStatus.unsuitable}%</span>
                <span className="text-muted-foreground">Unsuitable</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-alt"></div>
                <span className="font-semibold">{stats.jobsAppliedStatus.interviewed}%</span>
                <span className="text-muted-foreground">Interviewed</span>
              </div>
            </div>
          </div>
          <Link href="/dashboard/applications" className="text-sm text-primary-alt hover:underline mt-4 inline-flex items-center gap-1">
            View All Applications <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Upcoming Interviews */}
      <div className="bg-white rounded-lg border p-5 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden md:inline">Today, 26 November</span>
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
          <span className="font-semibold text-foreground">Today,</span> 26 November
        </p>

        {/* Mobile: Horizontal scroll cards */}
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-4">
          {upcomingInterviews.map((interview) => (
            <div
              key={interview.id}
              className="flex-shrink-0 w-40 md:w-auto bg-muted/30 rounded-lg p-4"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${interview.bgColor} flex items-center justify-center mb-3 mx-auto`}>
                <span className="text-sm font-semibold text-white">{interview.avatar}</span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-sm mb-0.5">{interview.name}</p>
                <p className="text-xs text-muted-foreground mb-2">{interview.role}</p>
                <p className="text-xs text-muted-foreground">{interview.time}</p>
              </div>
            </div>
          ))}
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
                    <span className="text-white font-semibold text-sm">{app.logo}</span>
                  </div>
                  <div>
                    <p className="font-semibold">{app.position}</p>
                    <p className="text-sm text-muted-foreground">
                      {app.company} • {app.location} • {app.type || "Full-Time"}
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
                  <p className="text-sm">{app.dateApplied}</p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                    app.status === "In Review"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-red-50 text-red-700 border border-red-200"
                  }`}
                >
                  {app.status}
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
                        <span className="text-white font-semibold text-sm">{app.logo}</span>
                      </div>
                      <span className="font-medium">{app.company}</span>
                    </div>
                  </td>
                  <td className="p-4 text-muted-foreground">{app.position}</td>
                  <td className="p-4 text-muted-foreground">{app.dateApplied}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                        app.status === "In Review"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {app.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: View All Link */}
        <div className="md:hidden p-4 border-t">
          <Link href="/dashboard/applications" className="text-sm text-primary-alt hover:underline flex items-center justify-center gap-1">
            View all applications history <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
