import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { authClient } from "@/lib/auth-client";

import Dashboard from "./dashboard";
import RecruiterDashboard from "./recruiter-dashboard";

export default async function DashboardPage() {
  const { data: session, error } = await authClient.getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (error || !session?.user) {
    redirect("/login");
  }

  const userRole = (session.user as { role?: string })?.role || "DRIVER";
  const isRecruiter = userRole === "RECRUITER" || userRole === "ADMIN";

  if (isRecruiter) {
    return <RecruiterDashboard session={session} />;
  }

  return <Dashboard session={session} />;
}
