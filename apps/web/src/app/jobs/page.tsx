"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, SlidersHorizontal, Grid, List } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import JobCard from "@/components/job-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function JobsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  // Sample job data - Driver/Transportation related
  const allJobs = [
    {
      id: "1",
      title: "HGV Class 1 Driver",
      company: "DHL Supply Chain",
      location: "London, UK",
      type: "Full-Time",
      salary: "£35,000 - £42,000",
      tags: ["HGV License", "Long Distance"],
      posted: "2 days ago",
    },
    {
      id: "2",
      title: "Van Delivery Driver",
      company: "Amazon Logistics",
      location: "Manchester, UK",
      type: "Full-Time",
      salary: "£28,000 - £32,000",
      tags: ["Van License", "Local Delivery"],
      posted: "3 days ago",
    },
    {
      id: "3",
      title: "Courier Driver",
      company: "DPD UK",
      location: "Birmingham, UK",
      type: "Full-Time",
      salary: "£26,000 - £30,000",
      tags: ["Driving", "Customer Service"],
      posted: "1 week ago",
    },
    {
      id: "4",
      title: "Truck Driver",
      company: "Dangote Transport",
      location: "Lagos, Nigeria",
      type: "Full-Time",
      salary: "₦180,000 - ₦250,000",
      tags: ["Heavy Goods", "Interstate"],
      posted: "2 days ago",
    },
    {
      id: "5",
      title: "Dispatch Rider",
      company: "Jumia Logistics",
      location: "Abuja, Nigeria",
      type: "Full-Time",
      salary: "£85,000 - £120,000",
      tags: ["Motorcycle", "Last Mile"],
      posted: "3 days ago",
    },
    {
      id: "6",
      title: "Bus Driver",
      company: "First Bus",
      location: "Leeds, UK",
      type: "Full-Time",
      salary: "£25,000 - £30,000",
      tags: ["PCV License", "Passenger Transport"],
      posted: "1 week ago",
    },
    {
      id: "7",
      title: "Forklift Driver",
      company: "Tesco Distribution",
      location: "Bristol, UK",
      type: "Full-Time",
      salary: "£24,000 - £28,000",
      tags: ["Forklift License", "Warehouse"],
      posted: "2 weeks ago",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-muted/20">
        {/* Header Section */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="text-center mb-8">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-3">
                Find your <span className="text-primary-alt">dream job</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Find your next Professional career
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-4xl mx-auto mb-4">
              <div className="bg-white border rounded-lg p-4 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="flex items-center gap-2 flex-1 w-full">
                    <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input
                      placeholder="Job title or keyword"
                      className="border-0 focus-visible:ring-0 px-0 flex-1"
                    />
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-border flex-shrink-0" />
                  <div className="flex items-center gap-2 flex-1 w-full">
                    <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <Input
                      placeholder="Location"
                      className="border-0 focus-visible:ring-0 px-0 flex-1"
                    />
                  </div>
                  <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black flex-shrink-0 w-full sm:w-auto">
                    Search
                  </Button>
                </div>
              </div>
            </div>

            {/* Popular Keywords */}
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Popular:</span> HGV Driver, Van Driver, Delivery Driver, Courier, Truck Driver, Dispatch Rider
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Filters - Hidden on mobile, shown on desktop */}
            <aside className="hidden lg:block space-y-6">
              {/* Type of Employment */}
              <div>
                <h3 className="font-semibold mb-4">Type of Employment</h3>
                <div className="space-y-3">
                  {["Full-Time (45)", "Part-Time (12)", "Contract (8)", "Temporary (5)"].map((type) => (
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
              <div>
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-3">
                  {[
                    "HGV Driving (24)",
                    "Van Driving (18)",
                    "Courier Services (15)",
                    "Bus & Coach (12)",
                    "Forklift Operations (10)",
                    "Logistics (8)",
                    "Warehouse (7)",
                    "Transport Management (6)",
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

              {/* Experience Level */}
              <div>
                <h3 className="font-semibold mb-4">Experience Level</h3>
                <div className="space-y-3">
                  {["Entry Level (15)", "Experienced (32)", "Senior Driver (18)", "Supervisor (5)"].map(
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
              <div>
                <h3 className="font-semibold mb-4">Salary Range</h3>
                <div className="space-y-3">
                  {[
                    "£20,000 - £25,000 (8)",
                    "£25,000 - £30,000 (15)",
                    "£30,000 - £40,000 (22)",
                    "£40,000+ (10)",
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
            </aside>

            {/* Job Listings */}
            <div>
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-2xl font-bold">All Jobs</h2>
                  <span className="hidden sm:inline text-muted-foreground">Showing {allJobs.length} results</span>
                </div>
                <div className="hidden md:flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <select className="text-sm border rounded-md px-3 py-1.5 bg-white">
                    <option>Most relevant</option>
                    <option>Latest</option>
                    <option>Salary (High to Low)</option>
                    <option>Salary (Low to High)</option>
                  </select>
                  <div className="flex border rounded-md">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-muted" : ""}`}
                    >
                      <Grid className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-muted" : ""}`}
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Job Cards - Always list view on mobile, toggleable on desktop */}
              <div className={viewMode === "grid" ? "hidden md:grid md:grid-cols-2 gap-6" : "space-y-4"}>
                {allJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
              {viewMode === "grid" && (
                <div className="md:hidden space-y-4">
                  {allJobs.map((job) => (
                    <JobCard key={job.id} {...job} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8">
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
                <span className="hidden sm:inline text-muted-foreground">...</span>
                <button className="hidden sm:flex w-8 h-8 rounded items-center justify-center hover:bg-muted">
                  33
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
