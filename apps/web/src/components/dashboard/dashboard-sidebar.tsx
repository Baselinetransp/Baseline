"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Home,
  FileText,
  Search,
  Building2,
  User,
  Settings,
  HelpCircle,
  Briefcase,
  PlusCircle,
  Users,
  BarChart3,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

// Driver navigation items
const driverNavItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "My Applications", href: "/dashboard/applications" },
  { icon: Search, label: "Find Jobs", href: "/dashboard/find-jobs" },
  { icon: Building2, label: "Browse Companies", href: "/dashboard/companies" },
  { icon: User, label: "My Public Profile", href: "/dashboard/profile" },
];

// Recruiter navigation items
const recruiterNavItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "My Jobs", href: "/dashboard/jobs" },
  { icon: PlusCircle, label: "Post New Job", href: "/dashboard/jobs/new" },
  { icon: Users, label: "Applications", href: "/dashboard/recruiter/applications" },
  { icon: Building2, label: "Company Profile", href: "/dashboard/company" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
];

const settingsItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/dashboard/help" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const userRole = (session?.user as { role?: string })?.role || "DRIVER";
  const isRecruiter = userRole === "RECRUITER" || userRole === "ADMIN";

  const navigationItems = isRecruiter ? recruiterNavItems : driverNavItems;

  return (
    <aside className="w-64 bg-white border-r min-h-screen flex flex-col">
      {/* Logo */}
      <div className="p-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/baseline-logo.svg"
            alt="BaselineDrivers"
            width={160}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>

      {/* Role Badge */}
      <div className="px-6 pb-4">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
          isRecruiter
            ? "bg-blue-100 text-blue-700"
            : "bg-primary-alt/20 text-primary-alt"
        }`}>
          {isRecruiter ? "Recruiter" : "Driver"}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary-alt/10 text-primary-alt"
                    : "text-muted-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary-alt text-black text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Settings Section */}
        <div className="mt-8">
          <div className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Settings
          </div>
          <div className="space-y-1">
            {settingsItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? "bg-primary-alt/10 text-primary-alt"
                      : "text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center">
            <span className="text-sm font-semibold text-black">
              {session?.user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{session?.user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{session?.user?.email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
