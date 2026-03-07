"use client";

import { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Briefcase,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

interface StatCard {
  label: string;
  value: string | number;
  change: number;
  changeLabel: string;
  icon: typeof BarChart3;
  color: string;
}

interface JobPerformance {
  id: string;
  title: string;
  views: number;
  applications: number;
  conversionRate: number;
  status: string;
}

// Mock analytics data
const stats: StatCard[] = [
  {
    label: "Total Job Views",
    value: "2,456",
    change: 12.5,
    changeLabel: "vs last month",
    icon: Eye,
    color: "text-blue-600",
  },
  {
    label: "Total Applications",
    value: "89",
    change: 8.2,
    changeLabel: "vs last month",
    icon: Users,
    color: "text-green-600",
  },
  {
    label: "Active Jobs",
    value: "5",
    change: -1,
    changeLabel: "vs last month",
    icon: Briefcase,
    color: "text-purple-600",
  },
  {
    label: "Avg. Time to Hire",
    value: "12 days",
    change: -15,
    changeLabel: "vs last month",
    icon: Calendar,
    color: "text-amber-600",
  },
];

const jobPerformance: JobPerformance[] = [
  {
    id: "1",
    title: "HGV Class 1 Driver",
    views: 856,
    applications: 24,
    conversionRate: 2.8,
    status: "PUBLISHED",
  },
  {
    id: "2",
    title: "Van Driver - Delivery",
    views: 542,
    applications: 18,
    conversionRate: 3.3,
    status: "PUBLISHED",
  },
  {
    id: "3",
    title: "Long Haul Truck Driver",
    views: 324,
    applications: 12,
    conversionRate: 3.7,
    status: "PUBLISHED",
  },
  {
    id: "4",
    title: "Local Delivery Driver",
    views: 289,
    applications: 8,
    conversionRate: 2.8,
    status: "PAUSED",
  },
];

const weeklyData = [
  { day: "Mon", views: 120, applications: 5 },
  { day: "Tue", views: 145, applications: 8 },
  { day: "Wed", views: 98, applications: 3 },
  { day: "Thu", views: 167, applications: 12 },
  { day: "Fri", views: 189, applications: 9 },
  { day: "Sat", views: 78, applications: 2 },
  { day: "Sun", views: 45, applications: 1 },
];

const applicationsByStatus = [
  { status: "Pending", count: 15, color: "bg-gray-400" },
  { status: "Under Review", count: 22, color: "bg-blue-500" },
  { status: "Shortlisted", count: 18, color: "bg-amber-500" },
  { status: "Interview", count: 12, color: "bg-purple-500" },
  { status: "Offered", count: 8, color: "bg-green-500" },
  { status: "Hired", count: 5, color: "bg-green-700" },
  { status: "Rejected", count: 9, color: "bg-red-500" },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30");

  const maxViews = Math.max(...weeklyData.map((d) => d.views));
  const totalApplications = applicationsByStatus.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">Analytics</h1>
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              Track your recruitment performance
            </p>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-white px-3 py-2 text-sm w-full md:w-auto md:min-w-[150px]"
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last year</option>
          </select>
        </div>
      </div>

      {/* Stats Grid - 2x2 on mobile, 4 columns on desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const isPositive = stat.change > 0;

          return (
            <div key={stat.label} className="bg-white rounded-lg border p-4 md:p-5">
              <div className="flex items-start justify-between mb-2 md:mb-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-muted/50">
                  <Icon className={`h-4 w-4 md:h-5 md:w-5 ${stat.color}`} />
                </div>
                <div className={`flex items-center gap-0.5 text-xs md:text-sm ${
                  isPositive ? "text-green-600" : "text-red-600"
                }`}>
                  {isPositive ? (
                    <ArrowUpRight className="h-3 w-3 md:h-4 md:w-4" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <p className="text-xl md:text-2xl font-bold mb-0.5">{stat.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground line-clamp-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Charts Section - Stack on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg border p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Weekly Activity</h2>
          <div className="flex gap-4 md:gap-6 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-primary-alt"></div>
              <span className="text-xs md:text-sm text-muted-foreground">Views</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-blue-500"></div>
              <span className="text-xs md:text-sm text-muted-foreground">Applications</span>
            </div>
          </div>
          <div className="flex items-end justify-between gap-1 md:gap-2 h-36 md:h-48">
            {weeklyData.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1 md:gap-2">
                <div className="w-full flex flex-col items-center gap-0.5 md:gap-1 flex-1 justify-end">
                  <div
                    className="w-full max-w-[20px] md:max-w-[30px] bg-primary-alt/80 rounded-t"
                    style={{ height: `${(day.views / maxViews) * 100}%` }}
                  ></div>
                  <div
                    className="w-full max-w-[20px] md:max-w-[30px] bg-blue-500 rounded-t"
                    style={{ height: `${(day.applications / maxViews) * 100 * 10}%` }}
                  ></div>
                </div>
                <span className="text-[10px] md:text-xs text-muted-foreground">{day.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Application Pipeline */}
        <div className="bg-white rounded-lg border p-4 md:p-6">
          <h2 className="text-base md:text-lg font-semibold mb-4 md:mb-6">Application Pipeline</h2>
          <div className="space-y-3 md:space-y-4">
            {applicationsByStatus.map((item) => (
              <div key={item.status}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs md:text-sm">{item.status}</span>
                  <span className="text-xs md:text-sm font-medium">{item.count}</span>
                </div>
                <div className="h-1.5 md:h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all`}
                    style={{ width: `${(item.count / totalApplications) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-xs md:text-sm text-muted-foreground">Total Applications</span>
              <span className="text-base md:text-lg font-bold">{totalApplications}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Job Performance */}
      <div className="bg-white rounded-lg border">
        <div className="p-4 md:p-6 border-b flex items-center justify-between">
          <div>
            <h2 className="text-base md:text-lg font-semibold">Job Performance</h2>
            <p className="text-xs md:text-sm text-muted-foreground mt-0.5 md:mt-1">
              How your job listings are performing
            </p>
          </div>
          <Link href="/dashboard/jobs" className="text-xs md:text-sm text-primary-alt hover:underline flex items-center gap-1">
            View all <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
          </Link>
        </div>

        {/* Mobile: Card Layout */}
        <div className="md:hidden divide-y">
          {jobPerformance.map((job) => (
            <div key={job.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-medium text-sm">{job.title}</h3>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  job.status === "PUBLISHED"
                    ? "bg-green-100 text-green-700"
                    : "bg-amber-100 text-amber-700"
                }`}>
                  {job.status}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-muted/30 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Eye className="h-3 w-3" />
                  </div>
                  <p className="text-sm font-semibold">{job.views.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">Views</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Users className="h-3 w-3" />
                  </div>
                  <p className="text-sm font-semibold">{job.applications}</p>
                  <p className="text-[10px] text-muted-foreground">Applied</p>
                </div>
                <div className="bg-muted/30 rounded-lg p-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <TrendingUp className="h-3 w-3" />
                  </div>
                  <p className={`text-sm font-semibold ${
                    job.conversionRate >= 3 ? "text-green-600" : ""
                  }`}>{job.conversionRate}%</p>
                  <p className="text-[10px] text-muted-foreground">Conv.</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/30">
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Job Title</th>
                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                <th className="text-right p-4 font-medium text-sm text-muted-foreground">Views</th>
                <th className="text-right p-4 font-medium text-sm text-muted-foreground">Applications</th>
                <th className="text-right p-4 font-medium text-sm text-muted-foreground">Conversion</th>
              </tr>
            </thead>
            <tbody>
              {jobPerformance.map((job) => (
                <tr key={job.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-4">
                    <span className="font-medium">{job.title}</span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      job.status === "PUBLISHED"
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      {job.views.toLocaleString()}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      {job.applications}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-medium ${
                      job.conversionRate >= 3 ? "text-green-600" : "text-muted-foreground"
                    }`}>
                      {job.conversionRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
