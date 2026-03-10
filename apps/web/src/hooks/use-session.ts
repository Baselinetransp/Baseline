"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/types";

/**
 * Wrapper hook around better-auth's useSession
 * Provides consistent session access with type safety
 */
export function useSession() {
  const { data: session, isPending, error } = authClient.useSession();

  const user = session?.user;
  const isAuthenticated = !!user;
  const userRole = (user as { role?: UserRole } | undefined)?.role || "DRIVER";

  return {
    session,
    user,
    userRole,
    isAuthenticated,
    isLoading: isPending,
    error,
  };
}

/**
 * Hook for handling sign out with redirect
 */
export function useSignOut() {
  const router = useRouter();

  const signOut = useCallback(
    async (redirectTo: string = "/login") => {
      try {
        await authClient.signOut();
        router.push(redirectTo as never);
        router.refresh();
      } catch (error) {
        console.error("Sign out failed:", error);
        throw error;
      }
    },
    [router]
  );

  return { signOut };
}

/**
 * Hook for checking if user is authenticated
 * Redirects to login if not authenticated
 */
export function useRequireAuth(redirectTo: string = "/login") {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useSession();

  if (!isLoading && !isAuthenticated) {
    router.push(redirectTo as never);
  }

  return { isAuthenticated, isLoading };
}
