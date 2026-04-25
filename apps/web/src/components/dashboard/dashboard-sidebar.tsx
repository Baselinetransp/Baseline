"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
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
  LogOut,
} from "lucide-react";
import { useSession, useUserRole, useSignOut } from "@/hooks";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

// Driver navigation items
const driverNavItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "My Applications", href: "/dashboard/applications" },
  { icon: Search, label: "Find Jobs", href: "/dashboard/find-jobs" },
  { icon: Building2, label: "Browse Companies", href: "/dashboard/companies" },
  { icon: User, label: "My Public Profile", href: "/dashboard/profile" },
];

// Recruiter navigation items
const recruiterNavItems: NavItem[] = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: Briefcase, label: "My Jobs", href: "/dashboard/jobs" },
  { icon: PlusCircle, label: "Post New Job", href: "/dashboard/jobs/new" },
  { icon: Users, label: "Applications", href: "/dashboard/recruiter/applications" },
  { icon: BarChart3, label: "Analytics", href: "/dashboard/analytics" },
];

const settingsItems: NavItem[] = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help Center", href: "/dashboard/help" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useSession();
  const { isRecruiter, role } = useUserRole();
  const { signOut } = useSignOut();

  const navigationItems = isRecruiter ? recruiterNavItems : driverNavItems;

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const getRoleBadge = () => {
    if (role === "ADMIN") return { label: "Admin", className: "bg-purple-100 text-purple-700" };
    if (isRecruiter) return { label: "Recruiter", className: "bg-blue-100 text-blue-700" };
    return { label: "Driver", className: "bg-primary-alt/20 text-primary-alt" };
  };

  const roleBadge = getRoleBadge();

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
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${roleBadge.className}`}
        >
          {roleBadge.label}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4">
        <div className="space-y-1">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href as never}
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
                  href={item.href as never}
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

            {/* Logout Button */}
            <button
              onClick={() => signOut()}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-muted-foreground hover:bg-red-50 hover:text-red-600 w-full"
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-alt to-primary-alt/60 flex items-center justify-center">
            <span className="text-sm font-semibold text-black">{getInitials(user?.name)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm truncate">{user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email || ""}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
