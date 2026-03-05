import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { auth } from "@baseline/auth";
import { fromNodeHeaders } from "better-auth/node";

/**
 * We extract the inner User type to ensure tRPC knows 
 * exactly what properties exist (like role).
 */
export async function createContext(opts: CreateExpressContextOptions) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(opts.req.headers),
  });

  return {
    req: opts.req,
    res: opts.res,
    session, // Contains session.user and session.session
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;