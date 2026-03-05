import Link from "next/link";
import { MapPin, Briefcase, DollarSign, Clock, Share2, Bookmark, CheckCircle } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function JobDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  // Sample job data - would come from API
  const job = {
    id: params.id,
    title: "Truck Driver",
    company: "Stripe",
    location: "Manchester, UK",
    type: "Full-Time",
    salary: "£32,000 - £38,000",
    posted: "Posted 2 days ago",
    jobType: "Full-Time",
    categories: ["Driving", "Transport"],
    skills: ["Class 2 License", "HGV", "Long Distance"],
    description:
      "We're looking for an experienced truck driver to join our logistics team. As a key member, you'll be responsible for safely transporting goods across the UK while maintaining our high standards of service.",
    responsibilities: [
      "Coordinate with transportation teams to ensure accurate and timely goods delivery",
      "Conduct pre-trip and post-trip vehicle inspections",
      "Maintain accurate logs of driving hours and vehicle maintenance",
      "Follow all traffic laws and company safety procedures",
      "Load and unload cargo using proper techniques",
      "Communicate delivery schedules with dispatch and customers",
    ],
    whoYouAre: [
      "Valid UK Class 2 HGV license with clean driving record",
      "Minimum 3 years of professional truck driving experience",
      "Excellent knowledge of UK roads and traffic regulations",
      "Strong time management and organizational skills",
      "Ability to work independently with minimal supervision",
      "Flexible schedule including early mornings and weekends",
    ],
    niceToHaves: [
      "ADR certification",
      "Experience with refrigerated transport",
      "Digital tachograph training",
    ],
    perks: [
      {
        icon: "💰",
        title: "Competitive Salary",
        description: "We offer industry-leading pay rates with annual reviews.",
      },
      {
        icon: "🏥",
        title: "Health Insurance",
        description: "Comprehensive health coverage for you and your family.",
      },
      {
        icon: "📅",
        title: "Paid Time Off",
        description: "25 days holiday plus bank holidays and sick leave.",
      },
      {
        icon: "🎓",
        title: "Training & Development",
        description: "Ongoing professional development and certification support.",
      },
      {
        icon: "🚗",
        title: "Company Vehicle",
        description: "Modern, well-maintained fleet vehicles.",
      },
      {
        icon: "💼",
        title: "Pension Benefits",
        description: "Employer contribution pension scheme.",
      },
    ],
    companyAbout:
      "Stripe is a leading logistics company specializing in nationwide transport solutions. We've been operating for over 15 years, building a reputation for reliability and excellence in the UK transport industry.",
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-[1fr_350px] gap-8">
            {/* Main Content */}
            <div>
              {/* Job Header */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      S
                    </div>
                    <div className="flex-1">
                      <h1 className="font-heading text-3xl font-bold mb-2">{job.title}</h1>
                      <div className="flex flex-wrap items-center gap-3 text-muted-foreground">
                        <span>{job.company}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <Button className="w-full bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold" size="lg">
                    Apply Now
                  </Button>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-bold mb-4">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </CardContent>
              </Card>

              {/* Responsibilities */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-bold mb-4">Responsibilities</h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-alt flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Who You Are */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-bold mb-4">Who You Are</h2>
                  <ul className="space-y-3">
                    {job.whoYouAre.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-primary-alt flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Nice-To-Haves */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-bold mb-4">Nice-To-Haves</h2>
                  <ul className="space-y-3">
                    {job.niceToHaves.map((item, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Perks & Benefits */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-bold mb-6">Perks & Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {job.perks.map((perk, i) => (
                      <div key={i} className="flex gap-4">
                        <div className="text-3xl">{perk.icon}</div>
                        <div>
                          <h3 className="font-semibold mb-1">{perk.title}</h3>
                          <p className="text-sm text-muted-foreground">{perk.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* About Company */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded flex items-center justify-center text-white text-xl font-bold">
                      S
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl font-bold">{job.company}</h2>
                      <Link href="#" className="text-primary text-sm hover:underline">
                        Read more about {job.company}
                      </Link>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-6">{job.companyAbout}</p>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-video bg-muted rounded-lg" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div>
              <Card className="sticky top-24">
                <CardContent className="pt-6">
                  <h3 className="font-heading text-lg font-bold mb-4">About this role</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date Posted</p>
                      <p className="font-medium">{job.posted}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Job Type</p>
                      <p className="font-medium">{job.jobType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Salary</p>
                      <p className="font-medium">{job.salary}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {job.categories.map((cat) => (
                          <span key={cat} className="px-2 py-1 bg-accent rounded text-sm">
                            {cat}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <span key={skill} className="px-2 py-1 bg-muted rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Share this job</h4>
                    <Button variant="outline" className="w-full mb-3">
                      <Share2 className="h-4 w-4 mr-2" />
                      Copy Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Similar Jobs */}
          <div className="mt-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading text-3xl font-bold">Similar Jobs</h2>
              <Link href="/jobs" className="text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg mb-4" />
                    <h3 className="font-semibold mb-2">Delivery Driver</h3>
                    <p className="text-sm text-muted-foreground mb-4">Amazon • London</p>
                    <div className="flex gap-2">
                      <span className="px-2 py-1 bg-accent rounded text-xs">Full-Time</span>
                      <span className="px-2 py-1 bg-accent rounded text-xs">Van</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
