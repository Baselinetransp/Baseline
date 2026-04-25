import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { router, publicProcedure, recruiterProcedure } from "../index";
import prisma, { Prisma } from "@baseline/db";
import { JobStatus, JobType, ExperienceLevel } from "@baseline/db";
import slugify from "slugify";

// ─── Input Schemas ────────────────────────────────────────────────────────────

const jobCreateSchema = z.object({
  title: z.string().min(5).max(150),
  description: z.string().min(50),
  requirements: z.string().optional(),
  benefits: z.string().optional(),
  jobType: z.nativeEnum(JobType).default(JobType.FULL_TIME),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().default("US"),
  isRemote: z.boolean().default(false),
  licenseRequired: z.array(z.string()).min(1),
  experienceLevel: z.nativeEnum(ExperienceLevel).default(ExperienceLevel.ENTRY),
  salaryMin: z.number().positive().optional(),
  salaryMax: z.number().positive().optional(),
  salaryNegotiable: z.boolean().default(false),
  endorsementsRequired: z.array(z.string()).optional(),
  startDate: z.string().datetime().optional(),
  expiresAt: z.string().datetime().optional(),
});

const jobUpdateSchema = jobCreateSchema.partial().extend({
  status: z.nativeEnum(JobStatus).optional(),
});

const jobsListSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(10),
  search: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  jobType: z.nativeEnum(JobType).optional(),
  experienceLevel: z.nativeEnum(ExperienceLevel).optional(),
  licenseClass: z.string().optional(),
  salaryMin: z.number().optional(),
  isRemote: z.boolean().optional(),
});

// ─── Router ────────────────────────────────────────────────────────────────────

export const jobsRouter = router({
  /**
   * Public: List jobs with full filtering and pagination
   */
  list: publicProcedure.input(jobsListSchema).query(async ({ input }) => {
    const { page, limit, search, city, state, jobType, experienceLevel, salaryMin, isRemote } =
      input;
    const skip = (page - 1) * limit;

    const where = {
      status: JobStatus.PUBLISHED,
      ...(search && {
        OR: [
          { title: { contains: search } },
          { description: { contains: search } },
          { city: { contains: search } },
        ],
      }),
      ...(city && { city: { contains: city } }),
      ...(state && { state }),
      ...(jobType && { jobType }),
      ...(experienceLevel && { experienceLevel }),
      ...(isRemote !== undefined && { isRemote }),
      ...(salaryMin && { salaryMin: { gte: salaryMin } }),
    };

    const [jobs, total] = await prisma.$transaction([
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          company: { select: { name: true, logoUrl: true, slug: true } },
          _count: { select: { applications: true } },
        },
      }),
      prisma.job.count({ where }),
    ]);

    return {
      jobs,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    };
  }),

  /**
   * Public: Get job details and increment view count
   */
  bySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ input }) => {
    const job = await prisma.job.findUnique({
      where: { slug: input.slug },
      include: {
        company: true,
        recruiter: {
          select: { title: true, user: { select: { name: true, image: true } } },
        },
        _count: { select: { applications: true } },
      },
    });

    if (!job || job.status !== JobStatus.PUBLISHED) {
      throw new TRPCError({ code: "NOT_FOUND", message: "Job not found." });
    }

    await prisma.job.update({
      where: { id: job.id },
      data: { viewCount: { increment: 1 } },
    });

    return job;
  }),

  /**
   * Recruiter: Create a new job post
   */
  create: recruiterProcedure.input(jobCreateSchema).mutation(async ({ ctx, input }) => {
    // Auto-create recruiter profile if it doesn't exist
    let recruiterProfile = await prisma.recruiterProfile.findUnique({
      where: { userId: ctx.user.id },
    });

    if (!recruiterProfile) {
      recruiterProfile = await prisma.recruiterProfile.create({
        data: { userId: ctx.user.id },
      });
    }

    const baseSlug = slugify(input.title, { lower: true, strict: true });
    const slug = `${baseSlug}-${Date.now()}`;

    return prisma.job.create({
      data: {
        ...input,
        slug,
        status: JobStatus.DRAFT,
        recruiterId: recruiterProfile.id,
        companyId: recruiterProfile.companyId ?? undefined,
        licenseRequired: JSON.stringify(input.licenseRequired),
        endorsementsRequired: input.endorsementsRequired
          ? JSON.stringify(input.endorsementsRequired)
          : undefined,
      },
    });
  }),

  /**
   * Recruiter: Update job details (handles JSON array parsing)
   */
  update: recruiterProcedure
    .input(z.object({ id: z.string(), data: jobUpdateSchema }))
    .mutation(async ({ ctx, input }) => {
      const job = await prisma.job.findUnique({
        where: { id: input.id },
        include: { recruiter: true },
      });

      if (!job) throw new TRPCError({ code: "NOT_FOUND" });
      if (job.recruiter.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      const updateData = { ...input.data };
      if (input.data.licenseRequired) {
        (updateData as any).licenseRequired = JSON.stringify(input.data.licenseRequired);
      }
      if (input.data.endorsementsRequired) {
        (updateData as any).endorsementsRequired = JSON.stringify(input.data.endorsementsRequired);
      }

      return prisma.job.update({
        where: { id: input.id },
        data: updateData,
      });
    }),

  /**
   * Recruiter: Remove job
   */
  delete: recruiterProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const job = await prisma.job.findUnique({
        where: { id: input.id },
        include: { recruiter: true },
      });

      if (!job) throw new TRPCError({ code: "NOT_FOUND" });
      if (job.recruiter.userId !== ctx.user.id) throw new TRPCError({ code: "FORBIDDEN" });

      return prisma.job.delete({ where: { id: input.id } });
    }),

  /**
   * Recruiter: Get history of own job postings
   */
  myJobs: recruiterProcedure
    .input(z.object({ status: z.nativeEnum(JobStatus).optional() }).optional())
    .query(async ({ ctx, input }) => {
      const recruiterProfile = await prisma.recruiterProfile.findUnique({
        where: { userId: ctx.user.id },
      });

      // Return empty array if no profile exists yet (new recruiter)
      if (!recruiterProfile) return [];

      return prisma.job.findMany({
        where: {
          recruiterId: recruiterProfile.id,
          ...(input?.status && { status: input.status }),
        },
        orderBy: { createdAt: "desc" },
        include: {
          _count: { select: { applications: true } },
          company: { select: { name: true, logoUrl: true } },
        },
      });
    }),

  /**
   * Job: search a new job post
   */

  search: publicProcedure
    .input(
      z.object({
        query: z.string().optional(),
        location: z.string().optional(),
        type: z.enum(["FULL_TIME", "PART_TIME", "CONTRACT", "FREELANCE"]).optional(),
        minSalary: z.number().optional(),
        page: z.number().min(1).default(1),
        limit: z.number().min(1).max(50).default(10),
      }),
    )
    .query(async ({ input }) => {
      const skip = (input.page - 1) * input.limit;

      // Build dynamic filter object
      const where: Prisma.JobWhereInput = {
        status: "PUBLISHED",
        AND: [
          input.query
            ? {
                OR: [
                  { title: { contains: input.query, mode: "insensitive" } },
                  { description: { contains: input.query, mode: "insensitive" } },
                  {
                    company: {
                      name: { contains: input.query, mode: "insensitive" },
                    },
                  },
                ],
              }
            : {},
          input.location
            ? {
                OR: [
                  { city: { contains: input.location, mode: "insensitive" } },
                  { state: { contains: input.location, mode: "insensitive" } },
                ],
              }
            : {},
          input.type ? { type: input.type } : {},
          input.minSalary ? { salaryMax: { gte: input.minSalary } } : {},
        ].filter((condition) => Object.keys(condition).length > 0), // Clean up empty objects
      };

      const [jobs, total] = await prisma.$transaction([
        prisma.job.findMany({
          where,
          include: {
            company: {
              select: { name: true, logoUrl: true, city: true, state: true },
            },
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: input.limit,
        }),
        prisma.job.count({ where }),
      ]);

      return {
        jobs,
        pagination: {
          total,
          totalPages: Math.ceil(total / input.limit),
          currentPage: input.page,
        },
      };
    }),
});
