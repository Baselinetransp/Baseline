"use client";

import { Mail, Phone, MapPin, Globe, Edit, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfilePage() {
  const profile = {
    name: "Jake Gyll",
    title: "Product Designer",
    company: "Twitter",
    location: "Manchester, UK",
    email: "jakegyll@email.com",
    phone: "+44 1245 572 135",
    languages: "English, French",
    openForOpportunities: true,
  };

  const aboutMe = `I'm a product designer + filmmaker currently working remotely at Twitter from beautiful Manchester, United Kingdom. I'm passionate about designing digital products that have a positive impact on the world.

For 10 years, I've specialized in interface, experience & interaction design as well as working in user research and product strategy for product agencies, big tech companies & start-ups.`;

  const experiences = [
    {
      company: "Twitter",
      logo: "🐦",
      position: "Product Designer",
      duration: "Jun 2019 - Present (1y 1m)",
      type: "Full-Time",
      description:
        "Created and executed social media plan for 10 brands utilizing multiple features and content types to increase brand outreach, engagement, and leads.",
    },
    {
      company: "GoDaddy",
      logo: "🌐",
      position: "Growth Marketing Designer",
      duration: "Jun 2011 - May 2019 (8y)",
      type: "Full-Time",
      description:
        "Developed digital marketing strategies, activation plans, proposals, contests and promotions for client media brand.",
    },
  ];

  const education = [
    {
      school: "Harvard University",
      logo: "H",
      degree: "Postgraduate degree, Applied Psychology",
      duration: "2010 - 2012",
      description:
        "As an Applied Psychologist in the field of Consumer and Society, I am specialized in creating business opportunities through observation, understanding, and interpretation.",
    },
    {
      school: "University of Toronto",
      logo: "U",
      degree: "Bachelor of Arts, Visual Communication",
      duration: "2005 - 2010",
    },
  ];

  const activities = [
    { platform: "Facebook", url: "facebook.com/jakegyll" },
    { platform: "Pinterest", url: "pinterest.com/jakegyll" },
  ];

  const portfolios = [
    { title: "Clinically - clinic & health care website", color: "bg-orange-100" },
    { title: "Flavor - food delivery mobile app", color: "bg-green-100" },
  ];

  return (
    <div className="max-w-4xl mx-auto">
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
              <Button variant="ghost" className="w-full text-primary-alt hover:text-primary-alt hover:bg-primary-alt/10 text-sm">
                Show 2 more experiences <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Education</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-3 md:gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-lg md:text-xl font-bold text-red-600">{edu.logo}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm md:text-base mb-0.5">{edu.school}</h4>
                    <p className="text-xs md:text-sm text-muted-foreground mb-1">{edu.degree}</p>
                    <p className="text-xs text-muted-foreground mb-2">{edu.duration}</p>
                    {edu.description && (
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-primary-alt hover:text-primary-alt hover:bg-primary-alt/10 text-sm">
                Show 2 more educations <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Activities */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Activities</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-blue-600">{activity.url}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Portfolios */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Portfolios</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {portfolios.map((item, index) => (
                <div key={index} className={`aspect-video ${item.color} rounded-lg overflow-hidden relative group`}>
                  <div className="absolute inset-0 flex items-end p-3">
                    <span className="text-xs font-medium text-foreground/80">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Additional Details</h3>
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
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.languages}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg border p-4 md:p-6">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h3 className="font-semibold text-base md:text-lg">Social Links</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-blue-600">instagram.com/jakegyll</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-blue-600">twitter.com/jakegyll</span>
              </div>
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-blue-600">jakegyll.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
