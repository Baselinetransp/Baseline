"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Calendar,
  Package,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { trpc } from "@/utils/trpc";
import { authClient } from "@/lib/auth-client";

const STATUS_CONFIG = {
  PENDING: {
    label: "Pending Payment",
    color: "text-yellow-600 bg-yellow-50 border-yellow-200",
    icon: Clock,
  },
  PAID: {
    label: "Under Review",
    color: "text-blue-600 bg-blue-50 border-blue-200",
    icon: AlertCircle,
  },
  APPROVED: {
    label: "Live",
    color: "text-green-600 bg-green-50 border-green-200",
    icon: CheckCircle,
  },
  REJECTED: {
    label: "Rejected",
    color: "text-red-600 bg-red-50 border-red-200",
    icon: XCircle,
  },
  EXPIRED: {
    label: "Expired",
    color: "text-gray-600 bg-gray-50 border-gray-200",
    icon: Clock,
  },
};

const PACKAGE_LABELS = {
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
};

export default function AdvertiserDashboardPage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();

  const { data: submissions, isLoading } = useQuery(
    trpc.bannerAd.getMySubmissions.queryOptions()
  );

  // Redirect if not logged in
  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      router.push("/login?redirect=/advertise/dashboard");
    }
  }, [session, sessionLoading, router]);

  const formatDate = (date: string | Date | null) => {
    if (!date) return "—";
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatCurrency = (amount: number | string, currency: string) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    if (currency === "GBP") {
      return `£${num.toLocaleString()}`;
    }
    return `₦${num.toLocaleString()}`;
  };

  if (sessionLoading || isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
        <Footer />
      </>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-muted/30 py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-2"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Home
              </Link>
              <h1 className="text-2xl md:text-3xl font-heading font-bold">
                My Advertisements
              </h1>
              <p className="text-muted-foreground mt-1">
                View and manage your banner ad campaigns
              </p>
            </div>
            <Link href="/advertise">
              <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black">
                <Plus className="h-4 w-4 mr-2" />
                New Advertisement
              </Button>
            </Link>
          </div>

          {/* Submissions List */}
          {submissions && submissions.length > 0 ? (
            <div className="space-y-4">
              {submissions.map((submission) => {
                const statusConfig =
                  STATUS_CONFIG[submission.status as keyof typeof STATUS_CONFIG];
                const StatusIcon = statusConfig.icon;

                return (
                  <div
                    key={submission.id}
                    className="bg-white rounded-lg border p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Left: Company & Package Info */}
                      <div className="flex-1">
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg border ${statusConfig.color}`}
                          >
                            <StatusIcon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {submission.companyName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {submission.contactEmail}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1.5">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {PACKAGE_LABELS[
                                submission.packageTier as keyof typeof PACKAGE_LABELS
                              ] || submission.packageTier}{" "}
                              Package
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>
                              {submission.durationWeeks} week
                              {submission.durationWeeks > 1 ? "s" : ""}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Status & Amount */}
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${statusConfig.color}`}
                        >
                          <StatusIcon className="h-3.5 w-3.5" />
                          {statusConfig.label}
                        </span>
                        <span className="text-lg font-bold">
                          {formatCurrency(
                            submission.totalAmount,
                            submission.currency
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Dates Row */}
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">Submitted:</span>{" "}
                        {formatDate(submission.createdAt)}
                      </div>
                      {submission.paidAt && (
                        <div>
                          <span className="font-medium">Paid:</span>{" "}
                          {formatDate(submission.paidAt)}
                        </div>
                      )}
                      {submission.startDate && (
                        <div>
                          <span className="font-medium">Campaign Start:</span>{" "}
                          {formatDate(submission.startDate)}
                        </div>
                      )}
                      {submission.endDate && (
                        <div>
                          <span className="font-medium">Campaign End:</span>{" "}
                          {formatDate(submission.endDate)}
                        </div>
                      )}
                    </div>

                    {/* Action for pending payment */}
                    {submission.status === "PENDING" && (
                      <div className="mt-4 pt-4 border-t">
                        <Link
                          href={`/api/payments/${submission.currency === "GBP" ? "stripe" : "paystack"}/checkout?submissionId=${submission.id}&amount=${submission.totalAmount}&currency=${submission.currency}`}
                        >
                          <Button
                            size="sm"
                            className="bg-primary-alt hover:bg-primary-alt/90 text-black"
                          >
                            Complete Payment
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-lg border p-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Advertisements Yet</h2>
              <p className="text-muted-foreground mb-6">
                You haven't submitted any advertisement campaigns yet. Get started
                by creating your first ad!
              </p>
              <Link href="/advertise">
                <Button className="bg-primary-alt hover:bg-primary-alt/90 text-black">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Ad
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
