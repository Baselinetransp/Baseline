import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import type { UserRole } from "@/types";

// Use authClient's inferred Session type
type Session = typeof authClient.$Infer.Session;

/**
 * Server-side session retrieval
 * Use this in Server Components and Server Actions
 *
 * Uses the same pattern as the original working code
 */
export async function getServerSession(): Promise<Session | null> {
  try {
    const session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
      },
    });

    // Return session if user exists
    if (session?.user) {
      return session as Session;
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Get session or redirect if not authenticated
 * Uses throw: true like the original working code
 */
export async function requireServerSession(): Promise<Session> {
  try {
    const session = await authClient.getSession({
      fetchOptions: {
        headers: await headers(),
        throw: true,
      },
    });

    if (!session?.user) {
      redirect("/login" as never);
    }

    return session as Session;
  } catch {
    redirect("/login" as never);
  }
}

/**
 * Get user role from session
 */
export async function getServerUserRole(): Promise<UserRole> {
  const session = await getServerSession();
  return ((session?.user as { role?: UserRole })?.role) || "DRIVER";
}
