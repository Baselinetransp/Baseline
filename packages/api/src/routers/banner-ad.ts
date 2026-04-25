import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, publicProcedure } from "../index";
import prisma from "@baseline/db";
import { BannerAdStatus } from "@baseline/db";

// ─── Pricing Configuration ────────────────────────────────────────────────────

const PRICING = {
  basic: { GBP: 25, NGN: 25000 },
  standard: { GBP: 50, NGN: 50000 },
  premium: { GBP: 100, NGN: 100000 },
} as const;

const INDUSTRIES = [
  "Logistics & Transportation",
  "Delivery Services",
  "Trucking",
  "Moving & Storage",
  "Courier Services",
  "Fleet Management",
  "Automotive",
  "E-commerce",
  "Retail",
  "Manufacturing",
  "Construction",
  "Food & Beverage",
  "Healthcare",
  "Other",
] as const;

const PLACEMENTS = [
  { value: "homepage-partners", label: "Homepage - Partners Section" },
  { value: "homepage-featured", label: "Homepage - Featured Area" },
  { value: "jobs-sidebar", label: "Jobs Page - Sidebar" },
  { value: "jobs-top", label: "Jobs Page - Top Banner" },
] as const;

const BUDGET_RANGES = [
  "Under £100 / ₦100,000",
  "£100 - £500 / ₦100,000 - ₦500,000",
  "£500 - £1,000 / ₦500,000 - ₦1,000,000",
  "Over £1,000 / ₦1,000,000+",
] as const;

// ─── Input Schemas ────────────────────────────────────────────────────────────

const createSubmissionSchema = z.object({
  // Package Selection
  packageTier: z.enum(["basic", "standard", "premium"]),
  durationWeeks: z.number().min(1).max(4),
  currency: z.enum(["GBP", "NGN"]),

  // Company Info
  companyName: z.string().min(2).max(100),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  companyWebsite: z.string().url().optional().or(z.literal("")),
  industry: z.string().optional(),

  // Campaign Details
  bannerImageUrl: z.string().url(),
  targetAudience: z.string().optional(),
  preferredPlacement: z.string().optional(),
  campaignGoals: z.string().optional(),
  budgetRange: z.string().optional(),

  // Terms
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// ─── Router ────────────────────────────────────────────────────────────────────

export const bannerAdRouter = router({
  /**
   * Get pricing configuration (public)
   */
  getPricing: publicProcedure.query(() => {
    return {
      packages: [
        {
          tier: "basic",
          name: "Basic",
          features: ["1 banner slot", "Standard placement", "Basic analytics"],
          pricing: PRICING.basic,
        },
        {
          tier: "standard",
          name: "Standard",
          features: [
            "2 banner slots",
            "Priority placement",
            "Detailed analytics",
            "Email support",
          ],
          pricing: PRICING.standard,
        },
        {
          tier: "premium",
          name: "Premium",
          features: [
            "5 banner slots",
            "Top placement",
            "Featured badge",
            "Advanced analytics",
            "Priority support",
            "Social media promotion",
          ],
          pricing: PRICING.premium,
        },
      ],
      industries: INDUSTRIES,
      placements: PLACEMENTS,
      budgetRanges: BUDGET_RANGES,
      durations: [
        { weeks: 1, label: "1 Week" },
        { weeks: 2, label: "2 Weeks" },
        { weeks: 3, label: "3 Weeks" },
        { weeks: 4, label: "4 Weeks" },
      ],
    };
  }),

  /**
   * Create a new banner ad submission (requires auth)
   */
  createSubmission: protectedProcedure
    .input(createSubmissionSchema)
    .mutation(async ({ ctx, input }) => {
      const { termsAccepted, ...data } = input;

      // Calculate total amount
      const pricePerWeek =
        PRICING[data.packageTier][data.currency as keyof (typeof PRICING)["basic"]];
      const totalAmount = pricePerWeek * data.durationWeeks;

      const submission = await prisma.bannerAdSubmission.create({
        data: {
          userId: ctx.user.id,
          companyName: data.companyName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone || null,
          companyWebsite: data.companyWebsite || null,
          industry: data.industry || null,
          bannerImageUrl: data.bannerImageUrl,
          targetAudience: data.targetAudience || null,
          preferredPlacement: data.preferredPlacement || null,
          campaignGoals: data.campaignGoals || null,
          budgetRange: data.budgetRange || null,
          durationWeeks: data.durationWeeks,
          packageTier: data.packageTier,
          totalAmount: totalAmount,
          currency: data.currency,
          status: BannerAdStatus.PENDING,
          termsAcceptedAt: new Date(),
        },
      });

      return {
        submissionId: submission.id,
        totalAmount,
        currency: data.currency,
      };
    }),

  /**
   * Get user's banner ad submissions
   */
  getMySubmissions: protectedProcedure.query(async ({ ctx }) => {
    return prisma.bannerAdSubmission.findMany({
      where: { userId: ctx.user.id },
      orderBy: { createdAt: "desc" },
    });
  }),

  /**
   * Get a specific submission by ID
   */
  getSubmission: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const submission = await prisma.bannerAdSubmission.findUnique({
        where: { id: input.id },
      });

      if (!submission) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Submission not found" });
      }

      // Only allow users to view their own submissions (unless admin)
      if (submission.userId !== ctx.user.id && ctx.user.role !== "ADMIN") {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" });
      }

      return submission;
    }),

  /**
   * Update payment status (called after successful payment)
   */
  updatePaymentStatus: protectedProcedure
    .input(
      z.object({
        submissionId: z.string(),
        paymentProvider: z.enum(["stripe", "paystack"]),
        paymentId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const submission = await prisma.bannerAdSubmission.findUnique({
        where: { id: input.submissionId },
      });

      if (!submission) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Submission not found" });
      }

      if (submission.userId !== ctx.user.id) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Access denied" });
      }

      // Calculate start and end dates
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + submission.durationWeeks * 7);

      return prisma.bannerAdSubmission.update({
        where: { id: input.submissionId },
        data: {
          paymentProvider: input.paymentProvider,
          paymentId: input.paymentId,
          paidAt: new Date(),
          status: BannerAdStatus.PAID,
          startDate,
          endDate,
        },
      });
    }),
});
