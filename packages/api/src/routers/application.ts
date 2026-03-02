import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, driverProcedure, recruiterProcedure } from "../index";
import prisma from "@baseline/db";
import { ApplicationStatus } from "@baseline/db";


export const applicationsRouter = router({
  // ─── Driver Actions ──────────────────────────────────────────────────────────

  submit: driverProcedure
    .input(
      z.object({
        jobId: z.string(),
        coverLetter: z.string().max(3000).optional(),
        resumeUrl: z.string().url().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!driverProfile) {
        throw new TRPCError({ 
          code: "NOT_FOUND", 
          message: "Please complete your driver profile before applying." 
        });
      }

      // Check if job exists and is actually published
      const job = await prisma.job.findUnique({ where: { id: input.jobId } });
      if (!job || job.status !== "PUBLISHED") {
        throw new TRPCError({ 
          code: "BAD_REQUEST", 
          message: "This job is no longer accepting applications." 
        });
      }

      // Prisma's unique constraint handles the 'already applied' check, 
      // but we wrap it in a try/catch for a clean user message.
      try {
        return await prisma.application.create({
          data: {
            jobId: input.jobId,
            driverId: driverProfile.id,
            coverLetter: input.coverLetter,
            resumeUrl: input.resumeUrl || driverProfile.resumeUrl,
          },
          include: { 
            job: { 
              select: { 
                title: true, 
                company: { select: { name: true } } 
              } 
            } 
          },
        });
      } catch (error) {
        throw new TRPCError({ 
          code: "CONFLICT", 
          message: "You have already applied to this position." 
        });
      }
    }),

  myApplications: driverProcedure
    .input(z.object({ status: z.nativeEnum(ApplicationStatus).optional() }).optional())
    .query(async ({ ctx, input }) => {
      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!driverProfile) return [];

      return prisma.application.findMany({
        where: {
          driverId: driverProfile.id,
          ...(input?.status && { status: input.status }),
        },
        orderBy: { appliedAt: "desc" },
        include: {
          job: {
            include: {
              company: { select: { name: true, logoUrl: true, city: true, state: true } },
            },
          },
        },
      });
    }),

  withdraw: driverProcedure
    .input(z.object({ applicationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const driverProfile = await prisma.driverProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!driverProfile) throw new TRPCError({ code: "NOT_FOUND" });

      const application = await prisma.application.findFirst({
        where: { id: input.applicationId, driverId: driverProfile.id },
      });

      if (!application) throw new TRPCError({ code: "NOT_FOUND" });
      
      // Safety check: Don't allow withdrawal if already rejected/accepted to keep history clean
      if (application.status === "ACCEPTED" || application.status === "REJECTED") {
        throw new TRPCError({ 
          code: "BAD_REQUEST", 
          message: "Status finalized. Cannot withdraw." 
        });
      }

      return prisma.application.update({
        where: { id: input.applicationId },
        data: { status: "WITHDRAWN" },
      });
    }),

  // ─── Recruiter Actions ───────────────────────────────────────────────────────

  forJob: recruiterProcedure
    .input(
      z.object({
        jobId: z.string(),
        status: z.nativeEnum(ApplicationStatus).optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(20),
      }),
    )
    .query(async ({ ctx, input }) => {
      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!recruiterProfile) throw new TRPCError({ code: "NOT_FOUND" });

      // Verify ownership before showing any details
      const job = await prisma.job.findFirst({
        where: { id: input.jobId, recruiterId: recruiterProfile.id },
      });

      if (!job) throw new TRPCError({ code: "FORBIDDEN", message: "Not authorized to view these applications." });

      const skip = (input.page - 1) * input.limit;
      const where = {
        jobId: input.jobId,
        ...(input.status && { status: input.status }),
      };

      const [applications, total] = await prisma.$transaction([
        prisma.application.findMany({
          where,
          skip,
          take: input.limit,
          orderBy: { appliedAt: "desc" },
          include: {
            driver: {
              include: {
                user: { select: { name: true, email: true, image: true } },
              },
            },
          },
        }),
        prisma.application.count({ where }),
      ]);

      return { applications, total, totalPages: Math.ceil(total / input.limit) };
    }),

  updateStatus: recruiterProcedure
    .input(
      z.object({
        applicationId: z.string(),
        status: z.nativeEnum(ApplicationStatus),
        notes: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      if (!recruiterProfile) throw new TRPCError({ code: "NOT_FOUND" });

      // Ensure the recruiter owns the job this application is for
      const application = await prisma.application.findFirst({
        where: {
          id: input.applicationId,
          job: { recruiterId: recruiterProfile.id },
        },
      });

      if (!application) throw new TRPCError({ code: "NOT_FOUND" });

      return prisma.application.update({
        where: { id: input.applicationId },
        data: { 
          status: input.status, 
          notes: input.notes 
        },
      });
    }),
});