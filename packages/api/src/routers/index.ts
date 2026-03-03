import { protectedProcedure, publicProcedure, router } from "../index";
import { todoRouter } from "./todo";
import { applicationsRouter } from "./application";
import { jobsRouter } from "./job";


export const appRouter = router({
  healthCheck: publicProcedure.query(() => {
    return "OK";
  }),
  privateData: protectedProcedure.query(({ ctx }) => {
    return {
      message: "This is private",
      user: ctx.session.user,
    };
  }),
  todo: todoRouter,
  applications: applicationsRouter,
  job: jobsRouter

});
export type AppRouter = typeof appRouter;
