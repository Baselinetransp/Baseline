"use client";

import { useState } from "react";
import { Calendar, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

const statusTabs = [
  { label: "All", count: 45 },
  { label: "In Review", count: 34 },
  { label: "Interviewing", count: 18 },
  { label: "Assessment", count: 5 },
  { label: "Offered", count: 2 },
  { label: "Hired", count: 1 },
];

const applications = [
  {
    id: 1,
    company: "Nomad",
    logo: "N",
    role: "HGV Class 1 Driver",
    dateApplied: "24 July 2021",
    status: "In Review",
  },
  {
    id: 2,
    company: "Udacity",
    logo: "U",
    role: "Van Delivery Driver",
    dateApplied: "20 July 2021",
    status: "In Review",
  },
  {
    id: 3,
    company: "Packer",
    logo: "P",
    role: "Courier Driver",
    dateApplied: "16 July 2021",
    status: "In Review",
  },
  {
    id: 4,
    company: "Divvy",
    logo: "D",
    role: "Truck Driver",
    dateApplied: "14 July 2021",
    status: "Interviewing",
  },
  {
    id: 5,
    company: "DigitalOcean",
    logo: "D",
    role: "Bus Driver",
    dateApplied: "10 July 2021",
    status: "In Review",
  },
];

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const [showNewFeature, setShowNewFeature] = useState(true);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Review":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "Interviewing":
        return "bg-purple-50 text-purple-700 border border-purple-200";
      case "Declined":
        return "bg-red-50 text-red-700 border border-red-200";
      case "Offered":
        return "bg-green-50 text-green-700 border border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">My Applications</h1>
          <p className="text-xl font-semibold mb-1">Keep it up, Jake</p>
          <p className="text-muted-foreground">
            Here is job applications status from July 19 - July 25.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-white">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">Jul 19 - Jul 25</span>
        </div>
      </div>

      {/* New Feature Banner */}
      {showNewFeature && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-white"
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
          <div className="flex-1">
            <h3 className="font-semibold text-primary-alt mb-1">New Feature</h3>
            <p className="text-sm text-muted-foreground">
              You can request a follow-up 7 days after applying for a job if the application status is in review.
              Only one follow-up is allowed per job.
            </p>
          </div>
          <button
            onClick={() => setShowNewFeature(false)}
            className="p-1 hover:bg-blue-100 rounded transition-colors"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Status Tabs */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <div className="flex border-b overflow-x-auto">
          {statusTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.label
                  ? "border-primary-alt text-primary-alt"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Applications Table */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Applications History</h2>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="pl-9 w-64" />
              </div>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">#</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Company Name</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Roles</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Date Applied</th>
                  <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                  <th className="text-right p-4 font-medium text-sm text-muted-foreground"></th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app, index) => (
                  <tr key={app.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-4 text-muted-foreground">{index + 1}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-semibold text-sm">{app.logo}</span>
                        </div>
                        <span className="font-medium">{app.company}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground">{app.role}</td>
                    <td className="p-4 text-muted-foreground">{app.dateApplied}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-muted-foreground hover:text-foreground">
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-1 mt-6">
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
              &larr;
            </button>
            {[1, 2, 3, 4, 5].map((page, i) => (
              <button
                key={i}
                className={`w-8 h-8 rounded flex items-center justify-center ${
                  page === 1 ? "bg-primary-alt text-black font-medium" : "hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-muted-foreground">...</span>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
              33
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
