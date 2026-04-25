"use client";

import { Search, MapPin, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const companies = [
  {
    id: 1,
    name: "DHL Supply Chain",
    logo: "D",
    location: "London, UK",
    openJobs: 12,
    description: "Leading logistics and supply chain company providing transport solutions across the UK and Europe.",
  },
  {
    id: 2,
    name: "Amazon Logistics",
    logo: "A",
    location: "Manchester, UK",
    openJobs: 8,
    description: "Global e-commerce and logistics company offering delivery and transportation opportunities.",
  },
  {
    id: 3,
    name: "Dangote Transport",
    logo: "D",
    location: "Lagos, Nigeria",
    openJobs: 15,
    description: "Nigeria's largest transport and logistics provider with operations across West Africa.",
  },
  {
    id: 4,
    name: "First Bus",
    logo: "F",
    location: "Leeds, UK",
    openJobs: 6,
    description: "Leading bus operator providing passenger transport services across major UK cities.",
  },
  {
    id: 5,
    name: "DPD UK",
    logo: "D",
    location: "Birmingham, UK",
    openJobs: 10,
    description: "International parcel delivery service specializing in courier and express delivery.",
  },
  {
    id: 6,
    name: "Jumia Logistics",
    logo: "J",
    location: "Abuja, Nigeria",
    openJobs: 7,
    description: "E-commerce logistics platform offering last-mile delivery across Nigeria.",
  },
];

export default function CompaniesPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold mb-2">Browse Companies</h1>
        <p className="text-muted-foreground">
          Discover companies hiring drivers and explore their opportunities
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border p-4">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search companies..." className="pl-9" />
          </div>
          <div className="relative flex-1">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Location" className="pl-9" />
          </div>
          <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
            Search
          </Button>
        </div>
      </div>

      {/* Company Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-4 mb-4">
              <div
                className={`w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  company.id % 3 === 0
                    ? "bg-gradient-to-br from-green-400 to-cyan-500"
                    : company.id % 2 === 0
                    ? "bg-gradient-to-br from-blue-400 to-purple-500"
                    : "bg-gradient-to-br from-orange-400 to-pink-500"
                }`}
              >
                <span className="text-white font-semibold text-2xl">{company.logo}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg mb-1">{company.name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{company.location}</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Building2 className="h-3.5 w-3.5 text-primary-alt" />
                  <span className="font-medium text-primary-alt">{company.openJobs} open positions</span>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{company.description}</p>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                View Profile
              </Button>
              <Button className="flex-1 bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
                View Jobs
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-1 pt-4">
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
          10
        </button>
        <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-muted">
          &rarr;
        </button>
      </div>
    </div>
  );
}
