"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { trpc, trpcClient } from "@/utils/trpc";

export default function AdvertiseSuccessPage() {
  const searchParams = useSearchParams();
  const submissionId = searchParams.get("submissionId");
  const provider = searchParams.get("provider");
  const sessionId = searchParams.get("session_id");
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  const updatePayment = useMutation(
    trpc.bannerAd.updatePaymentStatus.mutationOptions({
      onSuccess: () => {
        setStatus("success");
      },
      onError: () => {
        setStatus("error");
      },
    })
  );

  useEffect(() => {
    if (submissionId && provider) {
      const paymentId = sessionId || reference || `${provider}_${Date.now()}`;
      updatePayment.mutate({
        submissionId,
        paymentProvider: provider as "stripe" | "paystack",
        paymentId,
      });
    } else {
      setStatus("error");
    }
  }, [submissionId, provider, sessionId, reference]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-muted/30 flex items-center justify-center py-12">
        <div className="max-w-md mx-auto px-4 text-center">
          {status === "loading" && (
            <div className="bg-white rounded-lg border p-8 space-y-4">
              <Loader2 className="h-16 w-16 text-primary-alt animate-spin mx-auto" />
              <h1 className="text-xl font-semibold">Processing Payment...</h1>
              <p className="text-muted-foreground">
                Please wait while we confirm your payment.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="bg-white rounded-lg border p-8 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold">Payment Successful!</h1>
              <p className="text-muted-foreground">
                Thank you for your advertisement submission. Our team will review
                your banner and contact you within 1-2 business days.
              </p>
              <div className="pt-4 space-y-3">
                <Link href="/advertise/dashboard">
                  <Button className="w-full bg-primary-alt hover:bg-primary-alt/90 text-black">
                    View My Advertisements
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="bg-white rounded-lg border p-8 space-y-4">
              <XCircle className="h-16 w-16 text-red-500 mx-auto" />
              <h1 className="text-2xl font-bold">Something Went Wrong</h1>
              <p className="text-muted-foreground">
                We couldn't confirm your payment. If you believe this is an error,
                please contact our support team.
              </p>
              <div className="pt-4 space-y-3">
                <Link href="/advertise">
                  <Button className="w-full bg-primary-alt hover:bg-primary-alt/90 text-black">
                    Try Again
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Support
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
