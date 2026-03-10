"use client";

import { useMemo } from "react";
import { useSession } from "./use-session";
import type { UserRole } from "@/types";

/**
 * Hook for role-based access control
 * Provides utilities for checking user roles and permissions
 */
export function useUserRole() {
  const { userRole, isLoading, isAuthenticated } = useSession();

  const permissions = useMemo(() => {
    const isDriver = userRole === "DRIVER";
    const isRecruiter = userRole === "RECRUITER";
    const isAdmin = userRole === "ADMIN";

    return {
      role: userRole as UserRole,
      isDriver,
      isRecruiter,
      isAdmin,
      // Recruiters and admins can manage jobs
      canManageJobs: isRecruiter || isAdmin,
      // Drivers can apply to jobs
      canApplyToJobs: isDriver,
      // Recruiters and admins can view applications
      canViewApplications: isRecruiter || isAdmin,
      // Only admins can manage users
      canManageUsers: isAdmin,
      // Check for any of the specified roles
      hasRole: (...roles: UserRole[]) => roles.includes(userRole as UserRole),
    };
  }, [userRole]);

  return {
    ...permissions,
    isLoading,
    isAuthenticated,
  };
}

/**
 * Hook for conditional rendering based on role
 */
export function useRoleGuard(allowedRoles: UserRole[]) {
  const { role, isLoading, isAuthenticated } = useUserRole();

  const isAllowed = allowedRoles.includes(role);

  return {
    isAllowed,
    isLoading,
    isAuthenticated,
    role,
  };
}
