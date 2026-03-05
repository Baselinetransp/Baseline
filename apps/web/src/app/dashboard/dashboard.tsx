"use client";

import { Calendar, FileText, BriefcaseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function Dashboard({ session }: { session: typeof authClient.$Infer.Session }) {
  const stats = {
    totalJobsApplied: 45,
    jobsAppliedStatus: {
      inReview: 22,
      declined: 8,
      onProgress: 15,
    },
    upcomingInterviews: 3,
  };

  const recentApplications = [
    {
      id: 1,
      company: "Social Media Assistant",
      position: "HGV Class 1 Driver",
      dateApplied: "24 July 2021",
      status: "In Review",
    },
    {
      id: 2,
      company: "Social Media Assistant",
      position: "Van Delivery Driver",
      dateApplied: "24 July 2021",
      status: "In Review",
    },
    {
      id: 3,
      company: "Social Media Assistant",
      position: "Courier Driver",
      dateApplied: "24 July 2021",
      status: "Declined",
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      date: "Today, 28 November",
      time: "11:30 - 12:00 (30 Minutes)",
      position: "Job Interview",
      company: "DHL Supply Chain",
      companyLogo: "D",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">
            Good morning, {session?.user?.name || "User"}
          </h1>
          <p className="text-muted-foreground">
            Here is your job applications status from July 19 - July 25.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Jul 19 - Jul 25</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Total Jobs Applied */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Jobs Applied</p>
              <p className="text-4xl font-bold">{stats.totalJobsApplied}</p>
            </div>
            <div className="w-12 h-12 bg-primary-alt/10 rounded-lg flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary-alt" />
            </div>
          </div>
        </div>

        {/* Jobs Applied Status */}
        <div className="bg-white rounded-lg border p-6">
          <p className="text-sm text-muted-foreground mb-4">Jobs Applied Status</p>
          <div className="flex items-center gap-6">
            {/* Donut Chart Placeholder */}
            <div className="relative w-24 h-24 flex-shrink-0">
              <svg viewBox="0 0 100 100" className="transform -rotate-90">
                {/* In Review - 22 out of 45 ≈ 48.9% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#FDC212"
                  strokeWidth="20"
                  strokeDasharray="125.6 251.2"
                />
                {/* On Progress - 15 out of 45 ≈ 33.3% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#9333EA"
                  strokeWidth="20"
                  strokeDasharray="83.7 251.2"
                  strokeDashoffset="-125.6"
                />
                {/* Declined - 8 out of 45 ≈ 17.8% */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="20"
                  strokeDasharray="44.9 251.2"
                  strokeDashoffset="-209.3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-semibold">45</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FDC212]"></div>
                <span className="text-muted-foreground">In review ({stats.jobsAppliedStatus.inReview})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <span className="text-muted-foreground">Declined ({stats.jobsAppliedStatus.declined})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                <span className="text-muted-foreground">On progress ({stats.jobsAppliedStatus.onProgress})</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Upcoming Interviews</p>
              <p className="text-4xl font-bold">{stats.upcomingInterviews}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {upcomingInterviews.length > 0 && `Today, ${upcomingInterviews[0].time.split(" - ")[0]}`}
          </p>
        </div>
      </div>

      {/* Recent Applications History */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Recent Applications History</h2>
          <Link href="/dashboard/applications">
            <Button variant="link" className="text-primary-alt hover:text-primary-alt/80">
              View all applications history →
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
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
                        <span className="text-white font-semibold text-sm">N</span>
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
      </div>

      {/* Upcoming Interviews Widget */}
      <div className="bg-white rounded-lg border">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Upcoming Interviews</h2>
          <p className="text-sm text-muted-foreground mt-1">Today, 28 November</p>
        </div>
        <div className="p-6">
          {upcomingInterviews.map((interview) => (
            <div key={interview.id} className="flex gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-alt">28</div>
                <div className="text-xs text-muted-foreground">November</div>
              </div>
              <div className="flex-1 border rounded-lg p-4 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-semibold">{interview.companyLogo}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold mb-1">{interview.position}</p>
                  <p className="text-sm text-muted-foreground">{interview.company}</p>
                  <p className="text-xs text-muted-foreground mt-1">{interview.time}</p>
                </div>
                <Link href={`/dashboard/interviews/${interview.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
