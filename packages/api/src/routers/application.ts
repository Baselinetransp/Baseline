import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, driverProcedure, recruiterProcedure, protectedProcedure } from "../index";
import prisma from "@baseline/db";
import { ApplicationStatus } from "@baseline/db";
import fs from "node:fs/promises";
import path from "node:path";

export const applicationsRouter = router({
  // ─── Driver Actions ──────────────────────────────────────────────────────────

  submit: driverProcedure
    .input(
      z.object({
        jobId: z.string(),
        coverLetter: z.string().max(3000).optional(),
        file: z.object({
          name: z.string(),
          data: z.string(), // Base64
        }).optional(),
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

      // Check for required profile fields
      const missingFields: string[] = [];
      if (!driverProfile.phone) missingFields.push("phone number");
      if (!driverProfile.country) missingFields.push("country");
      if (!driverProfile.state) missingFields.push("state/region");

      if (missingFields.length > 0) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `Please complete your profile. Missing: ${missingFields.join(", ")}.`,
        });
      }

      const job = await prisma.job.findUnique({ where: { id: input.jobId } });
      if (!job || job.status !== "PUBLISHED") {
        throw new TRPCError({ 
          code: "BAD_REQUEST", 
          message: "This job is no longer accepting applications." 
        });
      }

      let finalResumeUrl: string | undefined = input.resumeUrl;

      if (input.file) {
        try {
          const uploadDir = path.join(process.cwd(), "public", "resumes");
          await fs.mkdir(uploadDir, { recursive: true });

          const fileName = `resume-${ctx.user.id}-${Date.now()}.pdf`;
          const filePath = path.join(uploadDir, fileName);
          
          const base64Data = input.file.data.replace(/^data:application\/pdf;base64,/, "");
          const buffer = Buffer.from(base64Data, "base64");

          await fs.writeFile(filePath, buffer);
          finalResumeUrl = `/resumes/${fileName}`;

          await prisma.driverProfile.update({
            where: { userId: ctx.user.id },
            data: { resumeUrl: finalResumeUrl }
          });
        } catch (error) {
          console.error("Resume upload failed:", error);
          throw new TRPCError({ 
            code: "INTERNAL_SERVER_ERROR", 
            message: "Failed to save the uploaded resume." 
          });
        }
      }

      if (!finalResumeUrl) {
        finalResumeUrl = driverProfile.resumeUrl ?? undefined;
      }

      if (!finalResumeUrl) {
        throw new TRPCError({ 
          code: "BAD_REQUEST", 
          message: "A resume is required to apply." 
        });
      }

      try {
        return await prisma.application.create({
          data: {
            jobId: input.jobId,
            driverId: driverProfile.id,
            coverLetter: input.coverLetter,
            resumeUrl: finalResumeUrl,
            status: ApplicationStatus.PENDING,
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

      const job = await prisma.job.findFirst({
        where: { id: input.jobId, recruiterId: recruiterProfile?.id },
      });

      if (!job) throw new TRPCError({ code: "FORBIDDEN" });

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
              include: { user: { select: { name: true, email: true, image: true } } },
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

      const application = await prisma.application.findFirst({
        where: {
          id: input.applicationId,
          job: { recruiterId: recruiterProfile?.id },
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

  // ─── Protected Security Action ───────────────────────────────────────────────

  getResume: protectedProcedure
    .input(z.object({ applicationId: z.string() }))
    .query(async ({ ctx, input }) => {
      const application = await prisma.application.findUnique({
        where: { id: input.applicationId },
        include: { 
          job: { select: { recruiterId: true } },
          driver: { select: { userId: true } }
        },
      });

      if (!application) throw new TRPCError({ code: "NOT_FOUND" });

      const isOwner = application.driver.userId === ctx.user.id;
      const recruiterProfile = await prisma.recruiterProfile.findUnique({ where: { userId: ctx.user.id } });
      const isRecruiter = application.job.recruiterId === recruiterProfile?.id;

      if (!isOwner && !isRecruiter) {
        throw new TRPCError({ code: "FORBIDDEN", message: "Unauthorized." });
      }

      const relativePath = application.resumeUrl;
      if (!relativePath) {
        throw new TRPCError({ code: "NOT_FOUND", message: "No resume URL found." });
      }

      try {
        const filePath = path.join(process.cwd(), "public", relativePath);
        const fileBuffer = await fs.readFile(filePath);

        return {
          base64: fileBuffer.toString("base64"),
          fileName: path.basename(filePath),
        };
      } catch (error) {
        console.error("File Read Error:", error);
        throw new TRPCError({ code: "NOT_FOUND", message: "Resume file missing." });
      }
    }),
});