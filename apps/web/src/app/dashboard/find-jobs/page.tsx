"use client";

import { useState } from "react";
import { Search, MapPin, ChevronDown, SlidersHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const jobs = [
  {
    id: 1,
    title: "Social Media Assistant",
    company: "Nomad",
    logo: "N",
    location: "Paris, France",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 2,
    title: "Brand Designer",
    company: "Dropbox",
    logo: "D",
    location: "San Francisco, USA",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 2,
    capacity: 10,
  },
  {
    id: 3,
    title: "Interactive Developer",
    company: "Terraform",
    logo: "T",
    location: "Hamburg, Germany",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 8,
    capacity: 12,
  },
  {
    id: 4,
    title: "Email Marketing",
    company: "Revolut",
    logo: "R",
    location: "Madrid, Spain",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 0,
    capacity: 10,
  },
  {
    id: 5,
    title: "Lead Engineer",
    company: "Canva",
    logo: "C",
    location: "Ankara, Turkey",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 6,
    title: "Product Designer",
    company: "ClassPass",
    logo: "C",
    location: "Berlin, Germany",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
  {
    id: 7,
    title: "Customer Manager",
    company: "Pitch",
    logo: "P",
    location: "Berlin, Germany",
    type: "Full-Time",
    tags: ["Marketing", "Design"],
    applied: 5,
    capacity: 10,
  },
];

export default function FindJobsPage() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mobile Search Section */}
      <div className="md:hidden space-y-4 mb-6">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Job title or keyword" className="pl-9 bg-white" />
        </div>

        {/* Location */}
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <div className="flex items-center justify-between pl-9 pr-3 py-2.5 border rounded-md bg-white">
            <span className="text-sm">Florence, Italy</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        {/* Search Button */}
        <Button className="w-full bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
          Search my job
        </Button>

        {/* Popular Tags */}
        <p className="text-sm text-muted-foreground">
          Popular: UI Designer, UX Researcher, Android, Admin
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
              <Input placeholder="Job title or keyword" className="pl-9" />
            </div>
          </div>

          {/* Location - Desktop Only */}
          <div className="bg-white rounded-lg border p-4 hidden md:block">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Florence, Italy" className="pl-9" />
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
              <p className="text-sm text-muted-foreground">Showing 73 results</p>
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
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg border p-4 md:p-6">
                <div className="flex gap-3 md:gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      job.id % 3 === 0
                        ? "bg-gradient-to-br from-green-400 to-cyan-500"
                        : job.id % 2 === 0
                        ? "bg-gradient-to-br from-blue-400 to-purple-500"
                        : "bg-gradient-to-br from-green-400 to-emerald-500"
                    }`}
                  >
                    <span className="text-white font-semibold text-lg">{job.logo}</span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base md:text-lg mb-1">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {job.company} • {job.location}
                    </p>

                    {/* Tags */}
                    <div className="flex items-center gap-2 flex-wrap mb-3">
                      <span className="px-3 py-1 border border-primary-alt text-primary-alt rounded-full text-xs font-medium">
                        {job.type}
                      </span>
                      {job.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 border border-primary-alt text-primary-alt rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Apply Button */}
                    <Button className="w-full bg-primary-alt/10 hover:bg-primary-alt/20 text-primary-alt font-medium border-0">
                      Apply
                    </Button>

                    {/* Capacity */}
                    <p className="text-xs text-muted-foreground mt-2">
                      {job.applied} applied of {job.capacity} capacity
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-1 mt-6 py-4">
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 rounded flex items-center justify-center ${
                  page === 1 ? "bg-primary-alt text-black font-medium" : "hover:bg-muted"
                }`}
              >
                {page}
              </button>
            ))}
            <span className="text-muted-foreground px-1">...</span>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
              33
            </button>
            <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
