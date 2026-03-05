"use client";

import { useState } from "react";
import { Search, MapPin, Briefcase, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const jobs = [
  {
    id: 1,
    title: "HGV Class 1 Driver",
    company: "DHL Supply Chain",
    logo: "D",
    location: "London, UK",
    type: "Full-Time",
    salary: "£35,000 - £42,000",
    tags: ["HGV License", "Long Distance"],
    posted: "2 hours ago",
  },
  {
    id: 2,
    title: "Van Delivery Driver",
    company: "Amazon Logistics",
    logo: "A",
    location: "Manchester, UK",
    type: "Part-Time",
    salary: "£28,000 - £32,000",
    tags: ["Van License", "Local"],
    posted: "5 hours ago",
  },
  {
    id: 3,
    title: "Courier Driver",
    company: "DPD UK",
    logo: "D",
    location: "Birmingham, UK",
    type: "Full-Time",
    salary: "£26,000 - £30,000",
    tags: ["Driving", "Customer Service"],
    posted: "1 day ago",
  },
  {
    id: 4,
    title: "Truck Driver",
    company: "Dangote Transport",
    logo: "D",
    location: "Lagos, Nigeria",
    type: "Full-Time",
    salary: "₦180,000 - ₦250,000",
    tags: ["Heavy Goods", "Interstate"],
    posted: "1 day ago",
  },
  {
    id: 5,
    title: "Bus Driver",
    company: "First Bus",
    logo: "F",
    location: "Leeds, UK",
    type: "Full-Time",
    salary: "£25,000 - £30,000",
    tags: ["PCV License", "Passenger"],
    posted: "2 days ago",
  },
  {
    id: 6,
    title: "Dispatch Rider",
    company: "Jumia Logistics",
    logo: "J",
    location: "Abuja, Nigeria",
    type: "Contract",
    salary: "₦85,000 - ₦120,000",
    tags: ["Motorcycle", "Last Mile"],
    posted: "3 days ago",
  },
];

export default function FindJobsPage() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold">Find Jobs</h1>
      </div>

      <div className="grid lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Sidebar - Filters */}
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-lg border p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Job title or keyword" className="pl-9" />
            </div>
          </div>

          {/* Location */}
          <div className="bg-white rounded-lg border p-4">
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
                "HGV Driving (20)",
                "Van Driving (18)",
                "Courier Services (15)",
                "Bus & Coach (12)",
                "Forklift Operations (10)",
                "Logistics (170)",
                "Transport Management (50)",
                "Warehouse (45)",
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
                "£700 - £1000 (4)",
                "£100 - £1500 (6)",
                "£1500 - £2000 (10)",
                "£3000 or above (4)",
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
        </div>

        {/* Right Content - Job Listings */}
        <div>
          <div className="bg-white rounded-lg border">
            {/* Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">All Jobs</h2>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select className="text-sm border rounded-md px-3 py-1.5 bg-white">
                    <option>Most relevant</option>
                    <option>Latest</option>
                    <option>Salary (High to Low)</option>
                    <option>Salary (Low to High)</option>
                  </select>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Showing {jobs.length} results</p>
            </div>

            {/* Job Cards */}
            <div className="divide-y">
              {jobs.map((job) => (
                <div key={job.id} className="p-6 hover:bg-muted/20 transition-colors">
                  <div className="flex gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        job.id % 3 === 0
                          ? "bg-gradient-to-br from-green-400 to-cyan-500"
                          : job.id % 2 === 0
                          ? "bg-gradient-to-br from-blue-400 to-purple-500"
                          : "bg-gradient-to-br from-orange-400 to-pink-500"
                      }`}
                    >
                      <span className="text-white font-semibold text-lg">{job.logo}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{job.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            <span>{job.company}</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {job.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3.5 w-3.5" />
                              {job.type}
                            </span>
                          </div>
                        </div>
                        <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold flex-shrink-0">
                          Apply
                        </Button>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        {job.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-primary-alt/10 text-primary-alt rounded text-xs font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 border-t flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{job.posted}</span>
                        <span className="font-semibold text-green-600">{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="p-6 border-t flex justify-center items-center gap-1">
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
    </div>
  );
}
