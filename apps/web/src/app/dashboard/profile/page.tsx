"use client";

import { Mail, Phone, MapPin, Edit, Award, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const profile = {
    name: "Jake Gyll",
    title: "HGV Driver",
    company: "Swift Logistics",
    location: "Manchester, UK",
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    licenseType: "Category C+E",
    yearsExperience: "8 years",
    openForOpportunities: true,
  };

  const aboutMe = `Experienced HGV driver with 8 years in long-haul and regional transport. Clean driving record, CPC qualified, and ADR certified. Reliable and punctual with strong knowledge of UK and European routes.`;

  const experiences = [
    {
      company: "Swift Logistics",
      logo: "🚛",
      position: "HGV Class 1 Driver",
      duration: "Mar 2020 - Present",
      type: "Full-Time",
      description:
        "Long-haul deliveries across UK and Europe. Responsible for vehicle checks, load security, and timely deliveries.",
    },
    {
      company: "Express Freight",
      logo: "📦",
      position: "HGV Class 2 Driver",
      duration: "Jan 2016 - Feb 2020",
      type: "Full-Time",
      description:
        "Regional distribution for retail clients. Multi-drop deliveries with excellent customer service record.",
    },
  ];

  const certifications = [
    { name: "Driver CPC", issuer: "DVSA", year: "2023" },
    { name: "ADR Certificate", issuer: "SQA", year: "2022" },
    { name: "Digital Tachograph Card", issuer: "DVLA", year: "2024" },
  ];

  return (
    <div className="max-w-4xl mx-auto overflow-hidden">
      {/* Mobile Profile Header */}
      <div className="md:hidden">
        {/* Profile Card */}
        <div className="bg-white rounded-lg border overflow-hidden mb-6">
          {/* Banner */}
          <div className="h-20 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 relative">
            <div className="absolute -bottom-10 left-4">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-4 border-white">
                <span className="text-2xl font-semibold text-white">JG</span>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="pt-12 px-4 pb-4">
            <h1 className="font-heading text-xl font-bold">{profile.name}</h1>
            <p className="text-sm text-muted-foreground mb-1">
              {profile.title} at {profile.company}
            </p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
              <MapPin className="h-3.5 w-3.5" />
              <span>{profile.location}</span>
            </div>

            {profile.openForOpportunities && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs font-medium text-green-700">OPEN FOR OPPORTUNITIES</span>
              </div>
            )}

            <Button className="w-full bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block mb-6">
        <h1 className="text-3xl font-heading font-bold">My Profile</h1>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Sidebar - Profile Card (Desktop Only) */}
        <div className="hidden md:block">
          <div className="bg-white rounded-lg border overflow-hidden sticky top-24">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"></div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-semibold text-white">JG</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border">
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              <h2 className="font-heading text-xl font-bold mb-1">{profile.name}</h2>
              <p className="text-sm text-muted-foreground mb-1">
                {profile.title} at {profile.company}
              </p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>

              {profile.openForOpportunities && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full mb-4">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-green-700">OPEN FOR OPPORTUNITIES</span>
                </div>
              )}

              <Link href="/dashboard/profile/edit">
                <Button variant="outline" className="w-full mb-3">
                  Edit Profile
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-4 md:space-y-6">
          {/* About Me */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">About Me</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {aboutMe}
            </p>
          </div>

          {/* Experiences */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Experiences</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="flex gap-3 md:gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl md:text-2xl">{exp.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base mb-0.5">{exp.position}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">
                      {exp.company} • {exp.type}
                    </p>
                    <p className="text-xs text-muted-foreground mb-2">{exp.duration}</p>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Certifications</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-3 pb-3 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm">{cert.name}</h4>
                    <p className="text-xs text-muted-foreground">{cert.issuer} • {cert.year}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & License Details */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Contact & License Details</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.licenseType}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
