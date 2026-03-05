import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, driverProcedure, recruiterProcedure } from "../index";
import prisma from "@baseline/db";
import { ExperienceLevel } from "@baseline/db";


// ─── Utilities ────────────────────────────────────────────────────────────────
const hydrateDriver = (profile: any) => {
  if (!profile) return null;
  return {
    ...profile,
    licenseClasses: profile.licenseClasses ? (JSON.parse(profile.licenseClasses as string) as string[]) : [],
    endorsements: profile.endorsements ? (JSON.parse(profile.endorsements as string) as string[]) : [],
  };
};

// ─── Driver Profile Schemas ────────────────────────────────────────────────────
const driverProfileSchema = z.object({
  phone: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default("US"),
  zipCode: z.string().optional(),
  bio: z.string().max(1000).optional(),
  resumeUrl: z.string().url().optional(),
  avatarUrl: z.string().url().optional(),
  experienceYears: z.number().min(0).max(60),
  experienceLevel: z.nativeEnum(ExperienceLevel),
  licenseClasses: z.array(z.string()).min(1),
  endorsements: z.array(z.string()).optional(),
  willingToRelocate: z.boolean().default(false),
  availableFrom: z.string().datetime().optional(),
  expectedSalary: z.number().positive().optional(),
  isProfilePublic: z.boolean().default(true),
});

// ─── Recruiter Profile Schemas ─────────────────────────────────────────────────
const recruiterProfileSchema = z.object({
  phone: z.string().optional(),
  title: z.string().optional(),
});

const companySchema = z.object({
  name: z.string().min(2).max(200),
  website: z.string().url().optional(),
  description: z.string().max(2000).optional(),
  industry: z.string().optional(),
  size: z.enum(["1-10", "11-50", "51-200", "201-500", "500+"]).optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default("US"),
  logoUrl: z.string().url().optional(),
});

export const usersRouter = router({
  // Get current user's full profile
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await prisma.user.findUnique({
      where: { id: ctx.user.id },
      include: {
        driverProfile: true,
        recruiterProfile: { include: { company: true } },
      },
    });

    if (!user) throw new TRPCError({ code: "NOT_FOUND" });

    // Return user with hydrated driver profile if it exists
    return {
      ...user,
      driverProfile: hydrateDriver(user.driverProfile),
    };
  }),

  // Driver: upsert profile
  upsertDriverProfile: driverProcedure
    .input(driverProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const data = {
        ...input,
        userId: ctx.user.id,
        licenseClasses: JSON.stringify(input.licenseClasses),
        endorsements: input.endorsements ? JSON.stringify(input.endorsements) : undefined,
      };

      const profile = await prisma.driverProfile.upsert({
        where: { userId: ctx.user.id },
        update: data,
        create: data,
      });

      return hydrateDriver(profile);
    }),

  // Recruiter: upsert profile
  upsertRecruiterProfile: recruiterProcedure
    .input(recruiterProfileSchema)
    .mutation(async ({ ctx, input }) => {
      return prisma.recruiterProfile.upsert({
        where: { userId: ctx.user.id },
        update: input,
        create: { ...input, userId: ctx.user.id },
      });
    }),

  // Recruiter: create/update company
  upsertCompany: recruiterProcedure
    .input(companySchema)
    .mutation(async ({ ctx, input }) => {
      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!recruiterProfile) throw new TRPCError({ code: "NOT_FOUND" });

      if (recruiterProfile.companyId) {
        return prisma.company.update({
          where: { id: recruiterProfile.companyId },
          data: input,
        });
      } else {
        const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();
        
        // We use a transaction to ensure both records update or neither do
        return prisma.$transaction(async (tx) => {
          const company = await tx.company.create({ data: { ...input, slug } });
          await tx.recruiterProfile.update({
            where: { userId: ctx.user.id },
            data: { companyId: company.id },
          });
          return company;
        });
      }
    }),

  // Save / unsave a job (driver)
  toggleSaveJob: driverProcedure
    .input(z.object({ jobId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existing = await prisma.savedJob.findUnique({
        where: { jobId_userId: { jobId: input.jobId, userId: ctx.user.id } },
      });

      if (existing) {
        await prisma.savedJob.delete({ where: { id: existing.id } });
        return { saved: false };
      } else {
        await prisma.savedJob.create({ data: { jobId: input.jobId, userId: ctx.user.id } });
        return { saved: true };
      }
    }),

  // Get saved jobs (driver)
  savedJobs: driverProcedure.query(async ({ ctx }) => {
    return prisma.savedJob.findMany({
      where: { userId: ctx.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        job: {
          include: { 
            company: { select: { name: true, logoUrl: true, city: true, state: true } } 
          },
        },
      },
    });
  }),
});
