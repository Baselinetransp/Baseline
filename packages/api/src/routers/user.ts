import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, protectedProcedure, driverProcedure, recruiterProcedure } from "../index";
import prisma from "@baseline/db";
import { ExperienceLevel } from "@baseline/db";
import fs from "node:fs/promises";
import path from "node:path";


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

// ─── Initial Profile Schema (for signup) ──────────────────────────────────────
const initialDriverProfileSchema = z.object({
  phone: z.string().min(1, "Phone number is required"),
  country: z.enum(["NG", "UK"], { message: "Country must be Nigeria or UK" }),
});

const initialRecruiterProfileSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  phone: z.string().min(1, "Phone number is required"),
  country: z.enum(["NG", "UK"], { message: "Country must be Nigeria or UK" }),
});

// ─── Profile Completion Schema ────────────────────────────────────────────────
const completeDriverProfileSchema = z.object({
  state: z.string().min(1, "State/Region is required"),
  city: z.string().optional(),
  bio: z.string().max(1000).optional(),
  experienceYears: z.number().min(0).max(60).optional(),
  experienceLevel: z.nativeEnum(ExperienceLevel).optional(),
  licenseClasses: z.array(z.string()).optional(),
  endorsements: z.array(z.string()).optional(),
  willingToRelocate: z.boolean().optional(),
  expectedSalary: z.number().positive().optional(),
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

  // Driver: Create initial profile (called after signup)
  createInitialDriverProfile: driverProcedure
    .input(initialDriverProfileSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if profile already exists
      const existing = await prisma.driverProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (existing) {
        // Update existing profile with new info
        return prisma.driverProfile.update({
          where: { userId: ctx.user.id },
          data: {
            phone: input.phone,
            country: input.country,
          },
        });
      }

      // Create new profile with minimal info
      return prisma.driverProfile.create({
        data: {
          userId: ctx.user.id,
          phone: input.phone,
          country: input.country,
          licenseClasses: JSON.stringify([]),
        },
      });
    }),

  // Recruiter: Create initial profile with company (called after signup)
  createInitialRecruiterProfile: recruiterProcedure
    .input(initialRecruiterProfileSchema)
    .mutation(async ({ ctx, input }) => {
      // Check if profile already exists
      const existing = await prisma.recruiterProfile.findUnique({
        where: { userId: ctx.user.id },
        include: { company: true },
      });

      if (existing) {
        // Update existing profile and company
        const updateData: any = {
          phone: input.phone,
        };

        // Update company if exists
        if (existing.companyId) {
          await prisma.company.update({
            where: { id: existing.companyId },
            data: {
              name: input.companyName,
              country: input.country,
            },
          });
        }

        return prisma.recruiterProfile.update({
          where: { userId: ctx.user.id },
          data: updateData,
          include: { company: true },
        });
      }

      // Create company and recruiter profile in a transaction
      const slug = input.companyName.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now();

      return prisma.$transaction(async (tx) => {
        const company = await tx.company.create({
          data: {
            name: input.companyName,
            slug,
            country: input.country,
          },
        });

        const recruiterProfile = await tx.recruiterProfile.create({
          data: {
            userId: ctx.user.id,
            phone: input.phone,
            companyId: company.id,
          },
          include: { company: true },
        });

        return recruiterProfile;
      });
    }),

  // Driver: Complete profile (add state, CV, etc.)
  completeDriverProfile: driverProcedure
    .input(completeDriverProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const existing = await prisma.driverProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!existing) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Please complete initial signup first.",
        });
      }

      const data = {
        state: input.state,
        city: input.city,
        bio: input.bio,
        experienceYears: input.experienceYears,
        experienceLevel: input.experienceLevel,
        licenseClasses: input.licenseClasses ? JSON.stringify(input.licenseClasses) : undefined,
        endorsements: input.endorsements ? JSON.stringify(input.endorsements) : undefined,
        willingToRelocate: input.willingToRelocate,
        expectedSalary: input.expectedSalary,
      };

      const profile = await prisma.driverProfile.update({
        where: { userId: ctx.user.id },
        data,
      });

      return hydrateDriver(profile);
    }),

  // Driver: Upload/update resume (with base64 file upload)
  uploadResume: driverProcedure
    .input(
      z.object({
        file: z.object({
          name: z.string(),
          data: z.string(), // Base64 encoded PDF
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const uploadDir = path.join(process.cwd(), "public", "resumes");
        await fs.mkdir(uploadDir, { recursive: true });

        const fileName = `resume-${ctx.user.id}-${Date.now()}.pdf`;
        const filePath = path.join(uploadDir, fileName);

        const base64Data = input.file.data.replace(/^data:application\/pdf;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");

        await fs.writeFile(filePath, buffer);
        const resumeUrl = `/resumes/${fileName}`;

        return prisma.driverProfile.update({
          where: { userId: ctx.user.id },
          data: { resumeUrl },
        });
      } catch (error) {
        console.error("Resume upload failed:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to upload resume.",
        });
      }
    }),

  // Driver: Check if profile is complete for job applications
  checkProfileComplete: driverProcedure.query(async ({ ctx }) => {
    const profile = await prisma.driverProfile.findUnique({
      where: { userId: ctx.user.id },
    });

    if (!profile) {
      return {
        isComplete: false,
        missingFields: ["phone", "country", "state", "resumeUrl"],
        message: "Please complete your profile to apply for jobs.",
      };
    }

    const missingFields: string[] = [];

    if (!profile.phone) missingFields.push("phone");
    if (!profile.country) missingFields.push("country");
    if (!profile.state) missingFields.push("state");
    if (!profile.resumeUrl) missingFields.push("resumeUrl");

    return {
      isComplete: missingFields.length === 0,
      missingFields,
      message: missingFields.length > 0
        ? "Please complete your profile to apply for jobs."
        : "Your profile is complete!",
      profile: hydrateDriver(profile),
    };
  }),

  // Delete account
  deleteAccount: protectedProcedure
    .input(
      z.object({
        reason: z.enum([
          "not_using",
          "found_job",
          "privacy",
          "too_many_emails",
          "not_satisfied",
          "other",
        ]),
        details: z.string().max(1000).optional(),
      })
    )
    .mutation(async ({ ctx }) => {
      const userId = ctx.user.id;

      // Use a transaction to ensure all data is deleted atomically
      await prisma.$transaction(async (tx) => {
        // First, log the deletion reason for analytics (optional - create table if needed)
        // For now, we'll just proceed with deletion

        // Delete driver-related data
        await tx.savedJob.deleteMany({ where: { userId } });

        // Get driver profile to delete applications
        const driverProfile = await tx.driverProfile.findUnique({
          where: { userId },
        });

        if (driverProfile) {
          await tx.application.deleteMany({ where: { driverId: driverProfile.id } });
        }

        await tx.driverProfile.deleteMany({ where: { userId } });

        // Delete recruiter-related data
        const recruiterProfile = await tx.recruiterProfile.findUnique({
          where: { userId },
          include: { company: true },
        });

        if (recruiterProfile) {
          // Deactivate jobs posted by this recruiter (don't delete, just close them)
          await tx.job.updateMany({
            where: { recruiterId: recruiterProfile.id },
            data: { status: "CLOSED" },
          });

          await tx.recruiterProfile.delete({ where: { userId } });

          // Note: We don't delete the company as other recruiters might be associated
        }

        // Delete sessions
        await tx.session.deleteMany({ where: { userId } });

        // Delete accounts (OAuth connections)
        await tx.account.deleteMany({ where: { userId } });

        // Finally, delete the user
        await tx.user.delete({ where: { id: userId } });
      });

      return { success: true };
    }),
});
