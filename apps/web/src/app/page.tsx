import Link from "next/link";
import Image from "next/image";
import { Search, MapPin, Truck, Package, Users, Building2, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JobCard from "@/components/job-card";
import CategoryCard from "@/components/category-card";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function HomePage() {
  // Sample data - will be replaced with actual API calls
  const categories = [
    { icon: Truck, title: "Van Driver", openPositions: 324, href: "/jobs?category=van-driver" },
    { icon: Package, title: "Logistics Driver", openPositions: 86, href: "/jobs?category=logistics" },
    { icon: Users, title: "Delivery Driver", openPositions: 245, href: "/jobs?category=delivery" },
    { icon: Building2, title: "Business", openPositions: 436, href: "/jobs?category=business" },
    { icon: Users, title: "Human Resource", openPositions: 142, href: "/jobs?category=hr" },
    { icon: Wrench, title: "Maintenance", openPositions: 72, href: "/jobs?category=maintenance" },
  ];

  const featuredJobs = [
    {
      id: "1",
      title: "Truck Driver",
      company: "Stripe",
      location: "Manchester, UK",
      type: "Full-Time",
      salary: "£32,000 - £38,000",
      tags: ["Class 2", "Night Shifts", "HGV"],
      posted: "2 days ago",
    },
    {
      id: "2",
      title: "Delivery Driver",
      company: "Amazon",
      location: "London, UK",
      type: "Full-Time",
      salary: "£28,000 - £32,000",
      tags: ["Van Driver", "Day Shifts"],
      posted: "1 day ago",
    },
    {
      id: "3",
      title: "Logistics Coordinator",
      company: "DHL",
      location: "Birmingham, UK",
      type: "Full-Time",
      salary: "£25,000 - £30,000",
      tags: ["Planning", "Coordination"],
      posted: "3 days ago",
    },
    {
      id: "4",
      title: "Courier Driver",
      company: "DPD",
      location: "Leeds, UK",
      type: "Part-Time",
      salary: "£24,000 - £28,000",
      tags: ["Flexible", "Van Provided"],
      posted: "5 days ago",
    },
  ];

  const latestJobs = [
    {
      id: "5",
      title: "Heavy Truck Driver",
      company: "Dangote Transport",
      location: "Lagos, Nigeria",
      type: "Full-Time",
      salary: "₦150,000 - ₦250,000",
      tags: ["HGV License", "Long Distance"],
      posted: "1 hour ago",
    },
    {
      id: "6",
      title: "Dispatch Rider",
      company: "Jumia Logistics",
      location: "Abuja, Nigeria",
      type: "Full-Time",
      salary: "₦80,000 - ₦120,000",
      tags: ["Motorcycle", "Last Mile"],
      posted: "3 hours ago",
    },
    {
      id: "7",
      title: "Van Driver",
      company: "Max.ng",
      location: "Port Harcourt, Nigeria",
      type: "Part-Time",
      salary: "₦100,000 - ₦180,000",
      tags: ["Van License", "Flexible Hours"],
      posted: "5 hours ago",
    },
    {
      id: "8",
      title: "Tanker Driver",
      company: "NNPC Logistics",
      location: "Warri, Nigeria",
      type: "Full-Time",
      salary: "₦200,000 - ₦300,000",
      tags: ["Tanker License", "Hazmat Certified"],
      posted: "1 day ago",
    },
  ];

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-white to-accent/30 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Left Content */}
              <div>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  Discover
                  <br />
                  more than
                  <br />
                  <span className="text-primary-alt">5000+ Jobs</span>
                </h1>
                <p className="text-muted-foreground text-lg mb-8 max-w-lg">
                  Great platform for the job seeker that passionate about driving and logistics. Find your dream job easier.
                </p>

                {/* Search Box */}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 flex-1">
                      <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <Input
                        placeholder="Job title or keyword"
                        className="border-0 focus-visible:ring-0 px-0 flex-1"
                      />
                    </div>
                    <div className="w-px h-8 bg-border flex-shrink-0" />
                    <div className="flex items-center gap-2 flex-1">
                      <MapPin className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      <Input
                        placeholder="Florence, Italy"
                        className="border-0 focus-visible:ring-0 px-0 flex-1"
                      />
                    </div>
                    <Button size="lg" className="bg-primary-alt hover:bg-primary-alt/90 text-black flex-shrink-0">
                      Search Job
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  Popular: Van Driver, Delivery, Logistics, HGV Driver
                </p>
              </div>

              {/* Right Image */}
              <div className="hidden lg:block -mt-4">
                <div className="relative">
                  <Image
                    src="/images/graphic-5.svg"
                    alt="Transport Hub Illustration"
                    width={500}
                    height={500}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advertisement Section */}
        <section className="py-12 border-b bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-muted-foreground text-center mb-8">
              Companies we helped grow
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
              {[
                { name: "Ad Space 1", width: 120, height: 60 },
                { name: "Ad Space 2", width: 120, height: 60 },
                { name: "Ad Space 3", width: 120, height: 60 },
                { name: "Ad Space 4", width: 120, height: 60 },
                { name: "Ad Space 5", width: 120, height: 60 },
              ].map((ad, index) => (
                <div
                  key={`ad-${index}`}
                  className="flex items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg hover:border-primary-alt/50 transition-colors"
                  style={{ width: `${ad.width}px`, height: `${ad.height}px` }}
                >
                  <span className="text-xs text-muted-foreground/50">{ad.name}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground/50 mt-6">
              Advertisement space available
            </p>
          </div>
        </section>

        {/* Explore by Category */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl font-bold">
                Explore by <span className="text-primary-alt">category</span>
              </h2>
              <Link
                href="/jobs"
                className="text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.title} {...category} />
              ))}
            </div>
          </div>
        </section>

        {/* Start Posting Jobs CTA */}
        <section className="relative bg-primary-alt/40 py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h2 className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight">
                  Start posting jobs today
                </h2>
                <p className="text-foreground/70 text-xl mb-8">
                  Start posting jobs for only $10.
                </p>
                <Link href="/signup">
                  <Button size="lg" className="bg-primary-alt hover:bg-primary-alt/90 text-black font-semibold px-8 py-6 text-lg">
                    Sign Up For Free
                  </Button>
                </Link>
              </div>

              {/* Right Dashboard Preview */}
              <div className="hidden lg:block relative">
                <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px]">
                  <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-2">
                    <div className="flex items-center gap-2 mb-6">
                      <div className="w-8 h-8 bg-blue-600 rounded-full" />
                      <span className="font-semibold">BaselineDrivers</span>
                    </div>
                    <div className="bg-accent/50 rounded-lg p-6 mb-4">
                      <p className="text-sm text-muted-foreground mb-2">Good morning, Maria</p>
                      <p className="text-xs text-muted-foreground">Here's what's happening with your job listings from July 19 - July 25</p>
                      <div className="mt-4">
                        <p className="text-sm font-semibold mb-1">Company Visitors</p>
                        <p className="text-4xl font-bold">21,457</p>
                        <p className="text-xs text-muted-foreground">Visitors from July 19 - July 25</p>
                      </div>
                      <div className="mt-4 h-32 bg-white/50 rounded-lg flex items-end gap-2 p-4">
                        {[30, 50, 40, 35, 45, 95, 60].map((height, i) => (
                          <div
                            key={i}
                            className={`flex-1 rounded-t ${i === 5 ? 'bg-blue-600' : 'bg-gray-300'}`}
                            style={{ height: `${height}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Jobs */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl font-bold">
                Featured <span className="text-primary">jobs</span>
              </h2>
              <Link
                href="/jobs"
                className="text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {featuredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </section>

        {/* Latest Jobs */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-heading text-3xl font-bold">
                Latest <span className="text-primary-alt">jobs open</span>
              </h2>
              <Link
                href="/jobs"
                className="text-primary hover:underline flex items-center gap-1"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {latestJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
