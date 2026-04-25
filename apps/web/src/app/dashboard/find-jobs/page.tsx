"use client";

import { useState } from "react";
import { Search, MapPin, ChevronDown, SlidersHorizontal, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { trpc } from "@/utils/trpc";

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full-Time",
  PART_TIME: "Part-Time",
  CONTRACT: "Contract",
  TEMPORARY: "Temporary",
  SEASONAL: "Seasonal",
};

export default function FindJobsPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobType, setJobType] = useState<string | undefined>(undefined);

  const { data: jobsData, isLoading } = useQuery(
    trpc.job.search.queryOptions({
      query: searchQuery || undefined,
      location: locationQuery || undefined,
      type: jobType as "FULL_TIME" | "PART_TIME" | "CONTRACT" | "FREELANCE" | undefined,
      page: currentPage,
      limit: 10,
    })
  );

  const jobs = jobsData?.jobs ?? [];
  const pagination = jobsData?.pagination;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mobile Search Section */}
      <div className="md:hidden space-y-4 mb-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Job title or keyword"
            className="pl-9 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="City or state"
            className="pl-9 bg-white"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
          />
        </div>

        {/* Search Button */}
        <Button
          className="w-full bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold"
          onClick={() => setCurrentPage(1)}
        >
          Search Jobs
        </Button>

        {/* Popular Tags */}
        <p className="text-sm text-muted-foreground">
          Popular: HGV Driver, Delivery Driver, Bus Driver
        </p>

        {/* More Filters Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowFilters(!showFilters)}
        >
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          More Filters
        </Button>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:block mb-6">
        <h1 className="text-3xl font-heading font-bold">Find Jobs</h1>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Sidebar - Filters (Hidden on mobile unless showFilters) */}
        <div className={`space-y-6 ${showFilters ? "block" : "hidden"} md:block`}>
          {/* Search - Desktop Only */}
          <div className="bg-white rounded-lg border p-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Job title or keyword"
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Location - Desktop Only */}
          <div className="bg-white rounded-lg border p-4 hidden md:block">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="City or state"
                className="pl-9"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Type of Employment */}
          <div className="bg-white rounded-lg border">
            <button className="w-full p-4 flex items-center justify-between font-medium">
              <span>Type of Employment</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="px-4 pb-4 space-y-3">
              {["Full-Time (3)", "Part-Time (5)", "Remote (2)", "Internship (24)", "Contract (3)"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox id={type} />
                  <Label htmlFor={type} className="text-sm cursor-pointer">
                    {type}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-lg border">
            <button className="w-full p-4 flex items-center justify-between font-medium">
              <span>Categories</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="px-4 pb-4 space-y-3">
              {[
                "Design (24)",
                "Sales (3)",
                "Marketing (3)",
                "Business (3)",
                "Human Resource (6)",
                "Finance (4)",
                "Engineering (4)",
                "Technology (5)",
              ].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox id={category} />
                  <Label htmlFor={category} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Job Level */}
          <div className="bg-white rounded-lg border">
            <button className="w-full p-4 flex items-center justify-between font-medium">
              <span>Job Level</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="px-4 pb-4 space-y-3">
              {["Entry Level (57)", "Mid Level (3)", "Senior Level (5)", "Director (12)", "VP or Above (8)"].map(
                (level) => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox id={level} />
                    <Label htmlFor={level} className="text-sm cursor-pointer">
                      {level}
                    </Label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Salary Range */}
          <div className="bg-white rounded-lg border">
            <button className="w-full p-4 flex items-center justify-between font-medium">
              <span>Salary Range</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="px-4 pb-4 space-y-3">
              {[
                "$700 - $1000 (4)",
                "$1000 - $1500 (6)",
                "$1500 - $2000 (10)",
                "$3000 or above (4)",
              ].map((range) => (
                <div key={range} className="flex items-center space-x-2">
                  <Checkbox id={range} />
                  <Label htmlFor={range} className="text-sm cursor-pointer">
                    {range}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Close filters button on mobile */}
          <div className="md:hidden">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowFilters(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>

        {/* Right Content - Job Listings */}
        <div className={showFilters ? "hidden md:block" : "block"}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-semibold text-lg">All Jobs</h2>
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Loading..." : `Showing ${pagination?.total ?? 0} results`}
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Sort by:</span>
              <select className="text-sm border rounded-md px-3 py-1.5 bg-white">
                <option>Most relevant</option>
                <option>Latest</option>
                <option>Salary (High to Low)</option>
              </select>
            </div>
            {/* Mobile Sort */}
            <div className="md:hidden flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Most relevant</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Job Cards */}
          <div className="space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-alt" />
              </div>
            ) : jobs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No jobs found. Try adjusting your search.</p>
              </div>
            ) : (
              jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg border p-4 md:p-6">
                  <div className="flex gap-3 md:gap-4">
                    {job.company?.logoUrl ? (
                      <img
                        src={job.company.logoUrl}
                        alt={job.company.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-green-400 to-emerald-500">
                        <span className="text-white font-semibold text-lg">
                          {job.company?.name?.charAt(0) || "J"}
                        </span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-base md:text-lg mb-1">{job.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {job.company?.name || "Company"} • {job.city || "Remote"}{job.state ? `, ${job.state}` : ""}
                      </p>

                      {/* Tags */}
                      <div className="flex items-center gap-2 flex-wrap mb-3">
                        <span className="px-3 py-1 border border-primary-alt text-primary-alt rounded-full text-xs font-medium">
                          {JOB_TYPE_LABELS[job.jobType] || job.jobType}
                        </span>
                        {job.isRemote && (
                          <span className="px-3 py-1 border border-primary-alt text-primary-alt rounded-full text-xs font-medium">
                            Remote
                          </span>
                        )}
                        {job.experienceLevel && (
                          <span className="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-xs font-medium">
                            {job.experienceLevel}
                          </span>
                        )}
                      </div>

                      {/* Salary */}
                      {(job.salaryMin || job.salaryMax) && (
                        <p className="text-sm text-muted-foreground mb-3">
                          {job.salaryMin && job.salaryMax
                            ? `£${job.salaryMin.toLocaleString()} - £${job.salaryMax.toLocaleString()}`
                            : job.salaryMin
                            ? `From £${job.salaryMin.toLocaleString()}`
                            : `Up to £${job.salaryMax?.toLocaleString()}`}
                          {job.salaryNegotiable && " (Negotiable)"}
                        </p>
                      )}

                      {/* Apply Button */}
                      <Link href={`/jobs/${job.slug}`}>
                        <Button className="w-full bg-primary-alt/10 hover:bg-primary-alt/20 text-primary-alt font-medium border-0">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center gap-1 mt-6 py-4">
              <button
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      page === currentPage ? "bg-primary-alt text-black font-medium" : "hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
              {pagination.totalPages > 5 && (
                <>
                  <span className="text-muted-foreground px-1">...</span>
                  <button
                    onClick={() => setCurrentPage(pagination.totalPages)}
                    className={`w-8 h-8 rounded flex items-center justify-center ${
                      currentPage === pagination.totalPages ? "bg-primary-alt text-black font-medium" : "hover:bg-muted"
                    }`}
                  >
                    {pagination.totalPages}
                  </button>
                </>
              )}
              <button
                className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted disabled:opacity-50"
                onClick={() => setCurrentPage((p) => Math.min(pagination.totalPages, p + 1))}
                disabled={currentPage === pagination.totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
