import { initTRPC, TRPCError } from "@trpc/server";
import type { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

/**
 * Basic Protected Procedure
 * Ensures the user is logged in.
 */
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
      user: ctx.session.user,
    },
  });
});

/**
 * Recruiter Only Procedure
 */
export const recruiterProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "RECRUITER" && ctx.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Only recruiters can perform this action.",
    });
  }
  return next({ ctx });
});

/**
 * Driver Only Procedure
 */
export const driverProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "DRIVER" && ctx.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Only drivers can perform this action.",
    });
  }
  return next({ ctx });
});

/**
 * Admin Only Procedure
 */
export const adminProcedure = protectedProcedure.use(({ ctx, next }) => {
  if (ctx.user.role !== "ADMIN") {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "Admin privileges required.",
    });
  }
  return next({ ctx });
});