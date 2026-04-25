"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  Upload,
  Building2,
  CreditCard,
  FileText,
  Package,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { trpc, trpcClient } from "@/utils/trpc";
import { authClient } from "@/lib/auth-client";

type PackageTier = "basic" | "standard" | "premium";
type Currency = "GBP" | "NGN";

interface FormData {
  // Step 1
  packageTier: PackageTier;
  durationWeeks: number;
  currency: Currency;
  // Step 2
  termsAccepted: boolean;
  // Step 3
  companyName: string;
  contactEmail: string;
  contactPhone: string;
  companyWebsite: string;
  industry: string;
  bannerImageUrl: string;
  targetAudience: string;
  preferredPlacement: string;
  campaignGoals: string;
  budgetRange: string;
}

const STEPS = [
  { id: 1, title: "Select Package", icon: Package },
  { id: 2, title: "Terms & Conditions", icon: FileText },
  { id: 3, title: "Application", icon: Building2 },
  { id: 4, title: "Payment", icon: CreditCard },
];

export default function AdvertisePage() {
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = authClient.useSession();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    packageTier: "standard",
    durationWeeks: 1,
    currency: "GBP",
    termsAccepted: false,
    companyName: "",
    contactEmail: "",
    contactPhone: "",
    companyWebsite: "",
    industry: "",
    bannerImageUrl: "",
    targetAudience: "",
    preferredPlacement: "",
    campaignGoals: "",
    budgetRange: "",
  });

  // Pre-fill email from session
  useEffect(() => {
    if (session?.user?.email && !formData.contactEmail) {
      setFormData((prev) => ({ ...prev, contactEmail: session.user.email }));
    }
  }, [session, formData.contactEmail]);

  // Fetch pricing data
  const { data: pricingData } = useQuery(trpc.bannerAd.getPricing.queryOptions());

  // Create submission mutation
  const createSubmission = useMutation(
    trpc.bannerAd.createSubmission.mutationOptions({
      onSuccess: (data) => {
        // Redirect to payment
        if (formData.currency === "GBP") {
          // Stripe checkout
          window.location.href = `/api/payments/stripe/checkout?submissionId=${data.submissionId}&amount=${data.totalAmount}&currency=${data.currency}`;
        } else {
          // Paystack checkout
          window.location.href = `/api/payments/paystack/checkout?submissionId=${data.submissionId}&amount=${data.totalAmount}&currency=${data.currency}`;
        }
      },
      onError: (error) => {
        toast.error(error.message || "Failed to submit. Please try again.");
      },
    })
  );

  // Redirect if not logged in
  useEffect(() => {
    if (!sessionLoading && !session?.user) {
      toast.error("Please log in to submit an advertisement inquiry.");
      router.push("/login?redirect=/advertise");
    }
  }, [session, sessionLoading, router]);

  const calculateTotal = () => {
    if (!pricingData) return 0;
    const pkg = pricingData.packages.find((p) => p.tier === formData.packageTier);
    if (!pkg) return 0;
    return pkg.pricing[formData.currency] * formData.durationWeeks;
  };

  const formatCurrency = (amount: number) => {
    if (formData.currency === "GBP") {
      return `£${amount.toLocaleString()}`;
    }
    return `₦${amount.toLocaleString()}`;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!formData.termsAccepted) {
        toast.error("Please accept the terms and conditions to continue.");
        return;
      }
      setCurrentStep(3);
    } else if (currentStep === 3) {
      // Validate form
      if (!formData.companyName.trim()) {
        toast.error("Company name is required.");
        return;
      }
      if (!formData.contactEmail.trim()) {
        toast.error("Contact email is required.");
        return;
      }
      if (!formData.bannerImageUrl.trim()) {
        toast.error("Banner image URL is required.");
        return;
      }
      setCurrentStep(4);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    createSubmission.mutate({
      packageTier: formData.packageTier,
      durationWeeks: formData.durationWeeks,
      currency: formData.currency,
      companyName: formData.companyName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone || undefined,
      companyWebsite: formData.companyWebsite || undefined,
      industry: formData.industry || undefined,
      bannerImageUrl: formData.bannerImageUrl,
      targetAudience: formData.targetAudience || undefined,
      preferredPlacement: formData.preferredPlacement || undefined,
      campaignGoals: formData.campaignGoals || undefined,
      budgetRange: formData.budgetRange || undefined,
      termsAccepted: formData.termsAccepted,
    });
  };

  if (sessionLoading) {
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Home
            </Link>
            <h1 className="text-2xl md:text-3xl font-heading font-bold">
              Advertise With Us
            </h1>
            <p className="text-muted-foreground mt-1">
              Reach thousands of drivers and recruiters with your banner ad
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                      currentStep >= step.id
                        ? "bg-primary-alt border-primary-alt text-black"
                        : "border-muted-foreground/30 text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <step.icon className="h-5 w-5" />
                    )}
                  </div>
                  <span
                    className={`ml-2 text-sm font-medium hidden sm:block ${
                      currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step.title}
                  </span>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`w-12 md:w-24 h-0.5 mx-2 md:mx-4 ${
                        currentStep > step.id ? "bg-primary-alt" : "bg-muted-foreground/30"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="bg-white rounded-lg border p-6 md:p-8">
            {/* Step 1: Package Selection */}
            {currentStep === 1 && pricingData && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Select Your Package</h2>
                  <p className="text-muted-foreground text-sm">
                    Choose the package that best fits your advertising needs
                  </p>
                </div>

                {/* Currency Toggle */}
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Currency:</span>
                  <div className="flex gap-2 p-1 bg-muted rounded-lg">
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, currency: "GBP" }))}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        formData.currency === "GBP"
                          ? "bg-white shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      GBP (£)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, currency: "NGN" }))}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                        formData.currency === "NGN"
                          ? "bg-white shadow-sm text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      NGN (₦)
                    </button>
                  </div>
                </div>

                {/* Package Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                  {pricingData.packages.map((pkg) => (
                    <div
                      key={pkg.tier}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          packageTier: pkg.tier as PackageTier,
                        }))
                      }
                      className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.packageTier === pkg.tier
                          ? "border-primary-alt bg-primary-alt/5"
                          : "border-muted hover:border-muted-foreground/50"
                      }`}
                    >
                      <h3 className="text-lg font-semibold mb-2">{pkg.name}</h3>
                      <p className="text-2xl font-bold mb-4">
                        {formatCurrency(pkg.pricing[formData.currency])}
                        <span className="text-sm font-normal text-muted-foreground">
                          /week
                        </span>
                      </p>
                      <ul className="space-y-2">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Duration Selection */}
                <div>
                  <Label className="mb-3 block">Duration</Label>
                  <div className="flex flex-wrap gap-3">
                    {pricingData.durations.map((duration) => (
                      <button
                        key={duration.weeks}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            durationWeeks: duration.weeks,
                          }))
                        }
                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-all ${
                          formData.durationWeeks === duration.weeks
                            ? "border-primary-alt bg-primary-alt/10 text-primary-alt"
                            : "border-muted hover:border-muted-foreground/50"
                        }`}
                      >
                        {duration.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="text-2xl font-bold text-primary-alt">
                      {formatCurrency(calculateTotal())}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formData.packageTier.charAt(0).toUpperCase() +
                      formData.packageTier.slice(1)}{" "}
                    package for {formData.durationWeeks} week
                    {formData.durationWeeks > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            )}

            {/* Step 2: Terms & Conditions */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Terms & Conditions</h2>
                  <p className="text-muted-foreground text-sm">
                    Please read and accept our advertising terms
                  </p>
                </div>

                <div className="max-h-96 overflow-y-auto p-4 bg-muted/30 rounded-lg border text-sm space-y-4">
                  <h3 className="font-semibold">1. Advertising Guidelines</h3>
                  <p>
                    All banner advertisements must comply with our content guidelines. We
                    reserve the right to reject or remove any advertisement that violates
                    these guidelines or is deemed inappropriate.
                  </p>

                  <h3 className="font-semibold">2. Payment Terms</h3>
                  <p>
                    Payment is required upfront before your advertisement goes live. All
                    payments are non-refundable once the campaign has started.
                  </p>

                  <h3 className="font-semibold">3. Campaign Duration</h3>
                  <p>
                    Campaigns run for the selected duration starting from the approval
                    date. Extensions can be purchased separately.
                  </p>

                  <h3 className="font-semibold">4. Content Requirements</h3>
                  <p>
                    Banner images must be high-quality and meet our size requirements.
                    Content must be relevant to the driving and logistics industry.
                  </p>

                  <h3 className="font-semibold">5. Review Process</h3>
                  <p>
                    All advertisements are subject to review before going live. This
                    process typically takes 1-2 business days.
                  </p>

                  <h3 className="font-semibold">6. Liability</h3>
                  <p>
                    Baseline Drivers is not responsible for the performance of your
                    advertisement. We do not guarantee specific click-through rates or
                    conversions.
                  </p>

                  <h3 className="font-semibold">7. Modifications</h3>
                  <p>
                    We reserve the right to modify these terms at any time. Continued use
                    of our advertising services constitutes acceptance of any changes.
                  </p>
                </div>

                <div className="flex items-start space-x-3 p-4 bg-primary-alt/10 rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={formData.termsAccepted}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        termsAccepted: checked === true,
                      }))
                    }
                    className="mt-1"
                  />
                  <Label htmlFor="terms" className="cursor-pointer leading-relaxed">
                    I have read and agree to the Terms & Conditions for advertising on
                    Baseline Drivers. I understand that my advertisement will be reviewed
                    before going live.
                  </Label>
                </div>
              </div>
            )}

            {/* Step 3: Application Form */}
            {currentStep === 3 && pricingData && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Application Details</h2>
                  <p className="text-muted-foreground text-sm">
                    Tell us about your company and campaign
                  </p>
                </div>

                {/* Company Information */}
                <div className="space-y-4">
                  <h3 className="font-medium text-muted-foreground">
                    Company Information
                  </h3>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            companyName: e.target.value,
                          }))
                        }
                        placeholder="Your company name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            contactEmail: e.target.value,
                          }))
                        }
                        placeholder="email@company.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactPhone">Phone Number</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            contactPhone: e.target.value,
                          }))
                        }
                        placeholder="+44 123 456 7890"
                      />
                    </div>

                    <div>
                      <Label htmlFor="companyWebsite">Company Website</Label>
                      <Input
                        id="companyWebsite"
                        type="url"
                        value={formData.companyWebsite}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            companyWebsite: e.target.value,
                          }))
                        }
                        placeholder="https://www.company.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <select
                        id="industry"
                        value={formData.industry}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            industry: e.target.value,
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Select industry...</option>
                        {pricingData.industries.map((industry) => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="budgetRange">Budget Range</Label>
                      <select
                        id="budgetRange"
                        value={formData.budgetRange}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            budgetRange: e.target.value,
                          }))
                        }
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="">Select budget range...</option>
                        {pricingData.budgetRanges.map((range) => (
                          <option key={range} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Campaign Details */}
                <div className="space-y-4">
                  <h3 className="font-medium text-muted-foreground">Campaign Details</h3>

                  <div>
                    <Label htmlFor="bannerImageUrl">Banner Image URL *</Label>
                    <div className="flex gap-2">
                      <Input
                        id="bannerImageUrl"
                        type="url"
                        value={formData.bannerImageUrl}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            bannerImageUrl: e.target.value,
                          }))
                        }
                        placeholder="https://example.com/banner.png"
                        className="flex-1"
                        required
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Provide a direct URL to your banner image (recommended size: 728x90
                      or 300x250)
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="preferredPlacement">Preferred Placement</Label>
                    <select
                      id="preferredPlacement"
                      value={formData.preferredPlacement}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          preferredPlacement: e.target.value,
                        }))
                      }
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">Select placement...</option>
                      {pricingData.placements.map((placement) => (
                        <option key={placement.value} value={placement.value}>
                          {placement.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Textarea
                      id="targetAudience"
                      value={formData.targetAudience}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          targetAudience: e.target.value,
                        }))
                      }
                      placeholder="Describe your target audience (e.g., HGV drivers in the UK, fleet managers, etc.)"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="campaignGoals">Campaign Goals</Label>
                    <Textarea
                      id="campaignGoals"
                      value={formData.campaignGoals}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          campaignGoals: e.target.value,
                        }))
                      }
                      placeholder="What do you hope to achieve with this campaign? (e.g., brand awareness, lead generation, etc.)"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Payment Summary */}
            {currentStep === 4 && pricingData && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Review & Pay</h2>
                  <p className="text-muted-foreground text-sm">
                    Review your order and proceed to payment
                  </p>
                </div>

                {/* Order Summary */}
                <div className="space-y-4 p-6 bg-muted/30 rounded-lg">
                  <h3 className="font-semibold">Order Summary</h3>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Package:</span>
                      <span className="font-medium">
                        {formData.packageTier.charAt(0).toUpperCase() +
                          formData.packageTier.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">
                        {formData.durationWeeks} week
                        {formData.durationWeeks > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Company:</span>
                      <span className="font-medium">{formData.companyName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Contact:</span>
                      <span className="font-medium">{formData.contactEmail}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg">
                      <span className="font-semibold">Total:</span>
                      <span className="font-bold text-primary-alt">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    {formData.currency === "GBP" ? (
                      <>
                        You will be redirected to <strong>Stripe</strong> to complete
                        your payment securely with card.
                      </>
                    ) : (
                      <>
                        You will be redirected to <strong>Paystack</strong> to complete
                        your payment securely.
                      </>
                    )}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={createSubmission.isPending}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="bg-primary-alt hover:bg-primary-alt/90 text-black"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={createSubmission.isPending}
                  className="bg-primary-alt hover:bg-primary-alt/90 text-black"
                >
                  {createSubmission.isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Payment
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
