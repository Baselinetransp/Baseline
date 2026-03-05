"use client";

import { Mail, Phone, MapPin, Link as LinkIcon, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const profile = {
    name: "Jake Gyll",
    title: "Product Designer at Twitter",
    location: "Lagos, Nigeria",
    email: "jakegyll@email.com",
    phone: "+234-812-3456-789",
    socialLinks: {
      portfolio: "https://jakegyll.com",
      linkedin: "linkedin.com/in/jakegyll",
      twitter: "@jakegyll",
      website: "jakegyll.dev",
    },
  };

  const experiences = [
    {
      company: "Twitter",
      logo: "🐦",
      position: "Product Designer",
      duration: "Jun 2022 - Present (1y 1m)",
      description:
        "Created and executed social media plans for 10 brands, managing multiple accounts and content types for 3+ months using tools like Facebook Business Manager and Hootsuite.",
    },
    {
      company: "Pinterest",
      logo: "📌",
      position: "Growth Marketing Designer",
      duration: "Jun 2019 - May 2022 (3y)",
      description:
        "Developed digital marketing strategies, managed online ad campaigns, produced/reviewed digital media for brand guidelines for 16 months across all Facebook platforms and Instagram.",
    },
  ];

  const education = [
    {
      school: "Harvard University",
      logo: "H",
      degree: "Bachelor in Communication",
      duration: "Sep 2012 - Dec 2014 (2y 4m)",
      description:
        "I am  a huge proponent of the field of web design and drafts.  I am fully equipped in modern and relevant designing stacks across AI tools and designs.",
    },
    {
      school: "University of Toronto",
      logo: "U",
      degree: "Master of Arts, Visual Communication",
      duration: "Sep 2012 - Dec 2014 (2y 4m)",
    },
  ];

  const skills = [
    "Communication",
    "Analytics",
    "Facebook Ads",
    "Social Media Planning",
    "Communication",
    "Mentoring",
    "Strategy",
  ];

  const portfolio = [
    { title: "User Interface Design 1", image: "/placeholder.png" },
    { title: "User Interface Design 2", image: "/placeholder.png" },
    { title: "User Interface Design 3", image: "/placeholder.png" },
    { title: "User Interface Design 4", image: "/placeholder.png" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-heading font-bold">My Profile</h1>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Left Sidebar - Profile Card */}
        <div>
          <div className="bg-white rounded-lg border overflow-hidden sticky top-24">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400"></div>

            {/* Profile Info */}
            <div className="px-6 pb-6">
              <div className="relative -mt-12 mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center border-4 border-white">
                  <span className="text-3xl font-semibold text-black">JG</span>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border">
                  <Edit className="h-4 w-4" />
                </button>
              </div>

              <h2 className="font-heading text-xl font-bold mb-1">{profile.name}</h2>
              <p className="text-sm text-muted-foreground mb-1">{profile.title}</p>
              <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{profile.location}</span>
              </div>

              <Link href="/dashboard/profile/edit">
                <Button variant="outline" className="w-full mb-3">
                  Edit Profile
                </Button>
              </Link>

              <Link href="/resume.pdf" download>
                <Button variant="ghost" className="w-full text-primary-alt hover:text-primary-alt hover:bg-primary-alt/10">
                  Download my resume
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="space-y-6">
          {/* Additional Details */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Additional Details</h3>
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
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{profile.location}</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Social Links</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-blue-600">{profile.socialLinks.portfolio}</span>
              </div>
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-blue-600">{profile.socialLinks.linkedin}</span>
              </div>
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-blue-600">{profile.socialLinks.twitter}</span>
              </div>
              <div className="flex items-center gap-3">
                <LinkIcon className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-blue-600">{profile.socialLinks.website}</span>
              </div>
            </div>
          </div>

          {/* About Me */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">About Me</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I am a professional HGV driver with over 10 years of experience in long-distance haulage across the UK and Europe.
              I hold a valid Class 1 license and have a clean driving record. I specialize in temperature-controlled transport
              and hazardous materials. I pride myself on punctuality, safety, and excellent customer service.
            </p>
          </div>

          {/* Experiences */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Experiences</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {experiences.map((exp, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl">{exp.logo}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{exp.position}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {exp.company} • {exp.duration}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                  </div>
                  <button className="text-primary-alt hover:text-primary-alt/80 flex-shrink-0">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-primary-alt hover:text-primary-alt hover:bg-primary-alt/10">
                Show 3 more experiences →
              </Button>
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Education</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold">{edu.logo}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">{edu.school}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      {edu.degree} • {edu.duration}
                    </p>
                    {edu.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{edu.description}</p>
                    )}
                  </div>
                  <button className="text-primary-alt hover:text-primary-alt/80 flex-shrink-0">
                    <Edit className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Skills</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-primary-alt/10 text-primary-alt rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Portfolio */}
          <div className="bg-white rounded-lg border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">Portfolio</h3>
              <button className="text-primary-alt hover:text-primary-alt/80">
                <Edit className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {portfolio.map((item, index) => (
                <div key={index} className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/10 transition-colors">
                    <span className="text-xs text-muted-foreground">{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
