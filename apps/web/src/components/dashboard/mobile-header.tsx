"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, Home, Bell, X } from "lucide-react";
import {
  Home as HomeIcon,
  MessageSquare,
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
  { icon: HomeIcon, label: "Dashboard", href: "/dashboard" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: 1 },
  { icon: FileText, label: "My Applications", href: "/dashboard/applications" },
  { icon: Search, label: "Find Jobs", href: "/dashboard/find-jobs" },
  { icon: Building2, label: "Browse Companies", href: "/dashboard/companies" },
  { icon: User, label: "My Public Profile", href: "/dashboard/profile" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/dashboard/help" },
];

// Recruiter navigation items
const recruiterNavItems = [
  { icon: HomeIcon, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "My Jobs", href: "/dashboard/jobs" },
  { icon: PlusCircle, label: "Post New Job", href: "/dashboard/jobs/new" },
  { icon: Users, label: "Applications", href: "/dashboard/recruiter/applications" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: 1 },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/dashboard/help" },
];

export default function MobileHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = authClient.useSession();

  const userRole = (session?.user as { role?: string })?.role || "DRIVER";
  const isRecruiter = userRole === "RECRUITER" || userRole === "ADMIN";
  const navigationItems = isRecruiter ? recruiterNavItems : driverNavItems;

  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/dashboard/applications") return "My Applications";
    if (pathname === "/dashboard/find-jobs") return "Find Jobs";
    if (pathname === "/dashboard/profile") return "My Profile";
    if (pathname === "/dashboard/settings") return "Settings";
    if (pathname === "/dashboard/messages") return "Messages";
    if (pathname === "/dashboard/companies") return "Companies";
    if (pathname === "/dashboard/help") return "Help";
    if (pathname === "/dashboard/jobs") return "My Jobs";
    if (pathname === "/dashboard/jobs/new") return "Post New Job";
    if (pathname === "/dashboard/recruiter/applications") return "Applications";
    if (pathname === "/dashboard/analytics") return "Analytics";
    if (pathname.startsWith("/dashboard/jobs/") && pathname.includes("/applications")) return "Job Applications";
    return "Dashboard";
  };

  return (
    <>
      <header className="md:hidden bg-white border-b sticky top-0 z-50">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 -ml-2 hover:bg-muted rounded-lg"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="font-heading text-xl font-bold">{getPageTitle()}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="p-2 hover:bg-muted rounded-lg">
              <Home className="h-5 w-5 text-muted-foreground" />
            </Link>
            <button className="p-2 hover:bg-muted rounded-lg relative">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <Link href="/" className="flex items-center">
                <Image
                  src="/images/baseline-logo.svg"
                  alt="BaselineDrivers"
                  width={140}
                  height={35}
                  className="h-9 w-auto"
                />
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Role Badge */}
            <div className="px-4 py-3 border-b">
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                isRecruiter
                  ? "bg-blue-100 text-blue-700"
                  : "bg-primary-alt/20 text-primary-alt"
              }`}>
                {isRecruiter ? "Recruiter" : "Driver"}
              </span>
            </div>

            <nav className="p-3 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)" }}>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));
                const Icon = item.icon;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${
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
            </nav>
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
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
          </div>
        </div>
      )}
    </>
  );
}
